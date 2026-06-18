<template>
  <div class="table-wrapper">
    <table v-if="!loading && records.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Телефон</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in records" :key="r.id" class="contact-row" @click="emit('view', r)">
          <td>{{ r.id }}</td>
          <td>{{ r.phone }}</td>
          <td>{{ r.name }}</td>
          <td>{{ r.surname }}</td>
          <td>{{ r.email }}</td>
          <td class="actions-cell" @click.stop>
            <div class="dropdown" ref="dropdownRefs" :data-id="r.id">
              <button class="dots-btn" @click.stop="toggleMenu(r.id!)">⋮</button>
              <div v-if="openId === r.id" class="dropdown-menu">
                <button class="dropdown-item dropdown-item_edit" @click="emit('edit', r.id!)">Редактировать</button>
                <button class="dropdown-item dropdown-item_remove" @click="emit('delete', r.id!)">Удалить</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else-if="!loading">Контакты не найдены.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { PhoneBookRecord } from '@/types';

defineProps<{
  records: PhoneBookRecord[];
  loading: boolean;
}>();

const emit = defineEmits<{
  edit: [id: number];
  delete: [id: number];
  view: [record: PhoneBookRecord];
}>();

const openId = ref<number | null>(null);

const toggleMenu = (id: number) => {
  openId.value = openId.value === id ? null : id;
};

const closeMenu = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.dropdown')) {
    openId.value = null;
  }
};

onMounted(() => document.addEventListener('click', closeMenu));
onUnmounted(() => document.removeEventListener('click', closeMenu));
</script>

<style scoped>
.table-wrapper {
  overflow: visible;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.contact-row {
  cursor: pointer;
}

.contact-row:hover {
  background: #f0f8ff;
}

th,
td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #f5f5f5;
}

.actions-cell {
  width: 60px;
  text-align: center;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dots-btn {
  background: none;
  border: none;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  color: #555;
  letter-spacing: 2px;
}

.dots-btn:hover {
  background: #e8e8e8;
  color: #000;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 10;
  min-width: 140px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  margin-top: 4px;
}

.dropdown-item {
  position: relative;
  display: block;
  width: 100%;
  padding: 14px 14px 14px 32px;
  border: none;
  background: none;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-item::before {
  content: '';
  display: block;
  position: absolute;
  z-index: 2;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
}

.dropdown-item_edit::before {
  content: '✎';
}

.dropdown-item_remove::before {
  content: '✕';
  left: 12px;
}

.dropdown-item:hover {
  background: #f0f0f0;
}

.dropdown-item_remove {
  color: #e74c3c;
}

.dropdown-item_remove:hover {
  background: #fde8e8;
}
</style>
