import { useState, useCallback } from 'react';
import type { PhoneBookRecord } from '../types';
import * as api from '../api/phoneBook';

export function usePhoneBook() {
  const [records, setRecords] = useState<PhoneBookRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadAll = useCallback(async (ids?: number[]) => {
    setLoading(true);
    setError('');

    try {
      setRecords(await api.fetchAll(ids));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    await api.deleteRecord(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const removeMany = useCallback(async (ids: number[]) => {
    await api.deleteRecords(ids);
    setRecords((prev) => prev.filter((r) => r.id && !ids.includes(r.id)));
  }, []);

  return { records, loading, error, loadAll, remove, removeMany };
}
