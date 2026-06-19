import { useState, useCallback } from 'react';
import type { PhoneBookRecord } from '../types';
import * as api from '../api/phoneBook';

export function usePhoneBookRecord() {
  const [record, setRecord] = useState<PhoneBookRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async (id: number) => {
    setLoading(true);
    setError('');
    try {
      setRecord(await api.fetchOne(id));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const save = useCallback(async (data: PhoneBookRecord) => {
    setLoading(true);
    setError('');
    try {
      if (data.id) {
        setRecord(await api.updateRecord(data));
      } else {
        setRecord(await api.createRecord(data));
      }
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { record, loading, error, load, save };
}
