<template>
  <div class="page">
    <div class="header">
      <h1>Телефонная книга</h1>
      <button class="add-btn" @click="router.push('/create')" title="Новая запись">+</button>
    </div>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="records.length === 0">Записи не найдены.</p>
    <PhoneBookTable
      v-else
      :records="records"
      :loading="loading"
      @edit="(id: number) => router.push(`/edit/${id}`)"
      @delete="confirmDelete"
    />
    <ConfirmDialog
      :visible="showConfirm"
      message="Удалить эту запись?"
      @confirm="executeDelete"
      @cancel="showConfirm = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePhoneBook } from '@/composables/usePhoneBook';
import PhoneBookTable from '@/components/PhoneBookTable.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { useRouter } from 'vue-router';

const { records, loading, loadAll, remove } = usePhoneBook();
const router = useRouter();

const deleteTargetId = ref<number | null>(null);
const showConfirm = ref(false);

onMounted(() => loadAll());

const confirmDelete = (id: number) => {
  deleteTargetId.value = id;
  showConfirm.value = true;
};

const executeDelete = async () => {
  if (deleteTargetId.value !== null) {
    await remove(deleteTargetId.value);
  }
  showConfirm.value = false;
  deleteTargetId.value = null;
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #3498db;
  color: #fff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.15s;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.35);
}

.add-btn:hover {
  background: #2980b9;
  transform: scale(1.08);
}

.add-btn:active {
  transform: scale(0.95);
}
</style>
