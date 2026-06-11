import { PhoneBookType } from '../types';
import { db } from '../utils';

export class MultiPhoneBookModel {
  public phoneBooks: Array<PhoneBookType> = [];

  constructor(props?: Array<PhoneBookType>) {
    this.set(props);
  }

  /**
   * Метод установки списка контактов
   * @param props - список контактов
   */
  set(props?: Array<PhoneBookType>): void {
    this.phoneBooks = props || [];
  }

  /**
   * Метод-геттер для списка контактов
   * @returns - Список контактов
   */
  get(): Array<PhoneBookType> {
    return this.phoneBooks;
  }

  /**
   * Метод чтения нескольких или всех записей
   * @param ids - массив id которые нужно получить
   * @returns - true если всё хорошо, иначе false
   */
  async read(ids: Array<number>): Promise<boolean> {
    try {
      let result;

      if (Array.isArray(ids) && ids.length > 0) {
        const query = 'SELECT * FROM phone_book WHERE id = ANY($1)';    
        result = await db.query(query, [ids]);
      } else {
        const query = 'SELECT * FROM phone_book';
        result = await db.query(query);
      }

      if (result && Array.isArray(result.rows) && result.rows.length > 0) {
        this.set(result.rows.map((row) => {
          return {
            id: Number(row.id || 0),
            phone: row.phone,
            name: row.name,
            surname: row.surname,
            secondName: row.second_name,
            email: row.email,
            description: row.description,
          };
        }));
      }

      return true;
    } catch(err: unknown) {
      console.warn('Multi read:', err);
    }

    return false;
  }

  /**
   * Метод удаления нескольких или всех записей
   * @param ids - массив id которые нужно получить
   * @returns - true если всё хорошо, иначе false
   */
  async delete(ids: Array<number>): Promise<boolean> {
    try {
      let result;

      if (Array.isArray(ids) && ids.length > 0) {
        const query = 'DELETE FROM phone_book WHERE id = ANY($1)';    
        result = await db.query(query, [ids]);
      } else {
        const query = 'DELETE FROM phone_book';
        result = await db.query(query);
      }

      return !!result.rowCount && result.rowCount > 0;
    } catch(err: unknown) {
      console.warn('Multi read:', err);
    }

    return false;
  }
}