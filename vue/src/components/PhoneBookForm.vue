<template>
  <form class="phone-form" @submit.prevent="submit">
    <div class="field">
      <label>Телефон *</label>
      <input v-model="form.phone" required @input="maskPhone" />
    </div>
    <div class="field">
      <label>Имя *</label>
      <input v-model="form.name" required />
    </div>
    <div class="field">
      <label>Фамилия</label>
      <input v-model="form.surname" />
    </div>
    <div class="field">
      <label>Отчество</label>
      <input v-model="form.secondName" />
    </div>
    <div class="field">
      <label>Email</label>
      <input v-model="form.email" type="email" />
    </div>
    <div class="field">
      <label>Описание</label>
      <textarea v-model="form.description" rows="3"></textarea>
    </div>
    <div class="form-actions">
      <button type="submit" :disabled="!isFormEnable" class="btn">{{ record?.id ? 'Сохранить' : 'Создать' }}</button>
      <button type="button" class="btn btn-secondary" @click="emit('cancel')">Отмена</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import type { PhoneBookRecord, PhoneBookFormData } from '@/types';

const props = defineProps<{
  record: PhoneBookRecord | null;
}>();

const emit = defineEmits<{
  save: [data: PhoneBookRecord];
  cancel: [];
}>();

const form = reactive<PhoneBookFormData>({
  phone: '',
  name: '',
  surname: '',
  secondName: '',
  email: '',
  description: '',
});

const isFormEnable = computed((): boolean => {
  return !!form.phone.trim() && !!form.name.trim();
});

watch(
  () => props.record,
  (r) => {
    if (r) {
      form.phone = r.phone;
      form.name = r.name;
      form.surname = r.surname || '';
      form.secondName = r.secondName || '';
      form.email = r.email || '';
      form.description = r.description || '';
    }
  },
  { immediate: true },
);

const maskPhone = (e: Event) => {
  const input = e.target as HTMLInputElement;
  input.value = input.value.replace(/[^\d+]/g, '');
  form.phone = input.value;
};

const submit = () => {
  const payload: PhoneBookRecord = { ...form };

  if (props.record?.id) payload.id = props.record.id;

  emit('save', payload);
};
</script>

<style scoped>
.phone-form {
  max-width: 480px;
}

.field {
  margin-bottom: 12px;
}

.field label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14px;
}

.field input,
.field textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.btn {
  padding: 8px 20px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn:hover {
  background: #2980b9;
}

.btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #95a5a6;
}

.btn-secondary:hover {
  background: #7f8c8d;
}
</style>
