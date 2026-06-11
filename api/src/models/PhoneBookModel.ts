import { db } from '../utils/';
import { type PhoneBookType, PhoneBookValidationEnum } from '../types';

export class PhoneBookModel {
  public id?: number = 0;
  public phone: string = '';
  public name: string = '';
  public surname?: string = '';
  public secondName?: string = '';
  public email?: string = '';
  public description?: string = '';

  constructor(props?: PhoneBookType) {
    this.set(props);
  }

  /** Ставим значения
   * @param props - Объект который ставим в значения модели
   */
  set(props?: PhoneBookType): void {
    this.id = props?.id ?? 0;
    this.phone = props?.phone ?? '';
    this.name = props?.name ?? ''
    this.surname = props?.surname ?? '';
    this.secondName = props?.secondName ?? '';
    this.email = props?.email ?? '';
    this.description = props?.description ?? '';
  }

  /**
   * Метод-геттер который возвращает значения модели
   */
  get(): PhoneBookType {
    return {
      id: this.id,
      phone: this.phone,
      name: this.name,
      surname: this.surname,
      secondName: this.secondName,
      email: this.email,
      description: this.description,
    };
  }

  /**
   * Метод проверяет валидацию
   * @param type - Что валидируем
   * @returns - true/false проверки
   */
  isValid(type: PhoneBookValidationEnum): boolean {
    switch (type) {
      case PhoneBookValidationEnum.CREATE:
        return this.phone.trim().length > 0 && this.name.trim().length > 0;
      case PhoneBookValidationEnum.READ:
      case PhoneBookValidationEnum.DELETE:
        return !!this.id;
      case PhoneBookValidationEnum.UPDATE:
        return !!this.id && this.phone.trim().length > 0 && this.name.trim().length > 0;
      case PhoneBookValidationEnum.LIST:
        return true;
      default:
        return false;
    }
  }

  /**
   * Метод создания записи из текущей модели
   * @returns возвращает true если всё создано иначе false
   */
  async create(): Promise<boolean> {
    try {
      const result = await db.query(
        'INSERT INTO phone_book (phone, name, surname, second_name, email, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [this.phone, this.name, this.surname, this.secondName, this.email, this.description]
      );
      
      if (result.rows.length) {
        this.set({
          id: Number(result.rows[0].id),
          phone: result.rows[0].phone,
          name: result.rows[0].name,
          surname: result.rows[0].surname,
          secondName: result.rows[0].second_name,
          email: result.rows[0].email,
          description: result.rows[0].description,
        });
      }

      return true;
    } catch (err: unknown) {
      console.warn('create:', err);
    }

    return false;
  }

  /**
   * Метод обновления записи
   * @returns 
   */
  async update(): Promise<boolean> {
    try {
      const result = await db.query(
        `UPDATE phone_book SET 
            phone = $1,
            name = $2,
            surname = $3,
            second_name = $4,
            email = $5,
            description = $6
          WHERE id = $7 RETURNING *`,
        [this.phone, this.name, this.surname, this.secondName, this.email, this.description, this.id]
      );
      
      if (result.rows.length) {
        this.set({
          id: Number(result.rows[0].id),
          phone: result.rows[0].phone,
          name: result.rows[0].name,
          surname: result.rows[0].surname,
          secondName: result.rows[0].second_name,
          email: result.rows[0].email,
          description: result.rows[0].description,
        });
      }

      return true;
    } catch (err: unknown) {
      console.warn('update:', err);
    }

    return false;
  }

  /**
   * Метод чтения одной конкретной записи
   * @param id - ИД нужной записи
   * @returns - true в случае успех, иначе false
   */
  async read(id: number): Promise<boolean> {
    try {
      const result = await db.query('SELECT * FROM phone_book WHERE id = $1 LIMIT 1', [id]);
      
      if (result.rows.length) {
        this.set({
          id: Number(result.rows[0].id),
          phone: result.rows[0].phone,
          name: result.rows[0].name,
          surname: result.rows[0].surname,
          secondName: result.rows[0].second_name,
          email: result.rows[0].email,
          description: result.rows[0].description,
        });
        return true;
      }
    } catch (err: unknown) {
      console.warn('read:', err);
    }

    return false;
  }

  /**
   * Метод удаления одной конкретной записи
   * @param id - ИД нужной записи
   * @returns - true в случае успеха, иначе false
   */
  async delete(id: number): Promise<boolean> {
    try {
      const result = await db.query('DELETE FROM phone_book WHERE id = $1', [id]);

      return typeof result.rowCount === 'number' && result.rowCount > 0;
    } catch (err: unknown) {
      console.warn('delete:', err);
    }

    return false;
  }
}