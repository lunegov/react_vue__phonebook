import axios from 'axios';
import type { PhoneBookRecord } from '../types';

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

export const fetchAll = async (ids?: number[]): Promise<PhoneBookRecord[]> => {
  const params = ids?.length ? { ids: ids.join(',') } : undefined;
  return await http.get('/multi_phone_book', { params });
};

export const fetchOne = async (id: number): Promise<PhoneBookRecord> =>
  await http.get(`/phone_book/${id}`);

export const createRecord = async (data: Omit<PhoneBookRecord, 'id'>): Promise<PhoneBookRecord> =>
  await http.post('/phone_book', data);

export const updateRecord = async (data: PhoneBookRecord): Promise<PhoneBookRecord> =>
  await http.patch('/phone_book', data);

export const deleteRecord = async (id: number): Promise<void> => {
  await http.delete(`/phone_book/${id}`);
}

export const deleteRecords = async (ids: number[]): Promise<void> => {
  const params = ids.length ? { ids: ids.join(',') } : undefined;
  await http.delete('/multi_phone_book', { params });
};
