<template>
  <div v-if="visible" class="overlay" @click.self="emit('close')">
    <div class="dialog">
      <h2>Контакт</h2>
      <div class="fields">
        <div class="field">
          <span class="field-label">Телефон</span>
          <span class="field-value">{{ record?.phone }}</span>
        </div>
        <div class="field">
          <span class="field-label">Имя</span>
          <span class="field-value">{{ record?.name }}</span>
        </div>
        <div v-if="record?.surname" class="field">
          <span class="field-label">Фамилия</span>
          <span class="field-value">{{ record?.surname }}</span>
        </div>
        <div v-if="record?.secondName" class="field">
          <span class="field-label">Отчество</span>
          <span class="field-value">{{ record?.secondName }}</span>
        </div>
        <div v-if="record?.email" class="field">
          <span class="field-label">Email</span>
          <span class="field-value">{{ record?.email }}</span>
        </div>
        <div v-if="record?.description" class="field">
          <span class="field-label">Описание</span>
          <span class="field-value">{{ record?.description }}</span>
        </div>
      </div>
      <div class="dialog-actions">
        <button class="btn btn-secondary" @click="emit('close')">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PhoneBookRecord } from '@/types';

defineProps<{
  visible: boolean;
  record: PhoneBookRecord | null;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: #fff;
  padding: 28px;
  border-radius: 10px;
  min-width: 380px;
  max-width: 480px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
}

h2 {
  margin: 0 0 18px;
  font-size: 20px;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.field-label {
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field-value {
  font-size: 16px;
  color: #333;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-secondary {
  background: #3498db;
  color: #fff;
}

.btn-secondary:hover {
  background: #2980b9;
}
</style>
