import axios from 'axios';
import type { PhoneBookRecord } from '@/types';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use((res) => {
  if (res.data?.success === false) {
    throw new Error(res.data.error || 'Unknown error');
  }
  return res.data.data;
});

export const fetchAll = (ids?: number[]): Promise<PhoneBookRecord[]> => {
  const params = ids?.length ? { ids: ids.join(',') } : undefined;
  return http.get('/multi_phone_book', { params });
};

export const fetchOne = (id: number): Promise<PhoneBookRecord> =>
  http.get(`/phone_book/${id}`);

export const createRecord = (data: Omit<PhoneBookRecord, 'id'>): Promise<PhoneBookRecord> =>
  http.post('/phone_book', data);

export const updateRecord = (data: PhoneBookRecord): Promise<PhoneBookRecord> =>
  http.patch('/phone_book', data);

export const deleteRecord = (id: number): Promise<null> =>
  http.delete(`/phone_book/${id}`);

export const deleteRecords = (ids: number[]): Promise<null> => {
  const params = ids.length ? { ids: ids.join(',') } : undefined;
  return http.delete('/multi_phone_book', { params });
};
