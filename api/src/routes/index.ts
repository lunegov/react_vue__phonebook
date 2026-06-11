import { MultiPhoneBookModel } from './../models/MultiPhoneBookModel';
import Router from 'koa-router';
import { type PhoneBookType, PhoneBookValidationEnum } from '../types';
import { PhoneBookModel } from '../models/PhoneBookModel';

const router = new Router();

// 1. Создание новой записи
router.post('/phone_book', async (ctx) => {
  const {
    phone,
    name,
    surname,
    secondName,
    email,
    description,
  } = ctx.request.body as PhoneBookType;

  const createRecord = new PhoneBookModel({
    phone,
    name,
    surname,
    secondName,
    email,
    description,
  });

  if (!createRecord.isValid(PhoneBookValidationEnum.CREATE)) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: null,
      error: 'Заполните обязательные поля',
    };

    return;
  }

  if (!await createRecord.create()) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: null,
      error: 'Ошибка создания записи',
    };

    return;
  }

  ctx.status = 201;
  ctx.body = {
    success: true,
    data: createRecord.get(),
    error: '',
  };
});

// 2. Обновление записи
router.patch('/phone_book', async (ctx) => {
  const {
    id,
    phone,
    name,
    surname,
    secondName,
    email,
    description,
  } = ctx.request.body as PhoneBookType;

  const updateRecord = new PhoneBookModel({
    id,
    phone,
    name,
    surname,
    secondName,
    email,
    description,
  });

  if (!updateRecord.isValid(PhoneBookValidationEnum.UPDATE)) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: null,
      error: 'Заполните обязательные поля',
    };

    return;
  }

  if (!await updateRecord.update()) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: null,
      error: 'Ошибка обновления записи',
    };

    return;
  }

  ctx.status = 201;
  ctx.body = {
    success: true,
    data: updateRecord.get(),
    error: '',
  };
});


// 3. Получение одной записи по id
router.get('/phone_book/:id', async (ctx) => {
  const id = Number(ctx.params.id || 0);

  if (!id) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: null,
      error: 'Неверный параметр для id в URL' };
    return;
  }

  const oneRecord = new PhoneBookModel();

  if (!await oneRecord.read(id)) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: null,
      error: `Ошибка получения записи для id=${id}`,
    };

    return;
  }

  ctx.status = 201;
  ctx.body = {
    success: true,
    data: oneRecord.get(),
    error: '',
  };
});

// 4. Удаление конкретной записи
router.delete('/phone_book/:id', async (ctx) => {
  const id = Number(ctx.params.id || 0);

  if (!id) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: null,
      error: 'Неверный параметр для id в URL' };
    return;
  }

  const deleteRecord = new PhoneBookModel();

  if (!await deleteRecord.delete(id)) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: null,
      error: `Ошибка удаления записи для id=${id}`,
    };

    return;
  }

  ctx.status = 201;
  ctx.body = {
    success: true,
    data: null,
    error: '',
  };
});

// 5. Получение всех или нескольких записей
router.get('/multi_phone_book', async (ctx) => {
  const rawIds = String(ctx.query.ids) || '';
  const records = new MultiPhoneBookModel();
  let ids: Array<number> = [];

  if (rawIds) {
    ids = rawIds.split(',').map((el: string) => Number(el)).filter((id: number) => id > 0);
  }

  if (!await records.read(ids)) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        data: null,
        error: 'Ошибка получения записей',
      };

    return;
  }

  ctx.status = 201;
  ctx.body = {
    success: true,
    data: records.get(),
    error: '',
  };
});

// 5. Получение всех или нескольких записей
router.delete('/multi_phone_book', async (ctx) => {
  const rawIds = String(ctx.query.ids) || '';
  const deleteRecords = new MultiPhoneBookModel();
  let ids: Array<number> = [];

  if (rawIds) {
    ids = rawIds.split(',').map((el: string) => Number(el)).filter((id: number) => id > 0);
  }

  if (!await deleteRecords.delete(ids)) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        data: null,
        error: 'Ошибка удаления записей',
      };

    return;
  }

  ctx.status = 201;
  ctx.body = {
    success: true,
    data: null,
    error: '',
  };
});

export default router;
