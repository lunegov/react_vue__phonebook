import { ref, type Ref } from 'vue';
import type { PhoneBookRecord } from '@/types';
import * as api from '@/api/phoneBook';

export function usePhoneBook() {
  const records: Ref<PhoneBookRecord[]> = ref([]);
  const loading = ref(false);
  const error = ref('');

  const loadAll = async (ids?: number[]) => {
    loading.value = true;
    error.value = '';

    try {
      records.value = await api.fetchAll(ids);
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const remove = async (id: number) => {
    await api.deleteRecord(id);
    records.value = records.value.filter((r) => r.id !== id);
  };

  const removeMany = async (ids: number[]) => {
    await api.deleteRecords(ids);
    records.value = records.value.filter((r) => r.id && !ids.includes(r.id));
  };

  return { records, loading, error, loadAll, remove, removeMany };
}

export function usePhoneBookRecord() {
  const record: Ref<PhoneBookRecord | null> = ref(null);
  const loading = ref(false);
  const error = ref('');

  const load = async (id: number) => {
    loading.value = true;
    error.value = '';
    try {
      record.value = await api.fetchOne(id);
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const save = async (data: PhoneBookRecord) => {
    loading.value = true;
    error.value = '';
    try {
      if (data.id) {
        record.value = await api.updateRecord(data);
      } else {
        record.value = await api.createRecord(data);
      }
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return { record, loading, error, load, save };
}
