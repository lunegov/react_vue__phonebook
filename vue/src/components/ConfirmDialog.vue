<template>
  <div v-if="visible" class="overlay" @click.self="emit('cancel')">
    <div class="dialog">
      <p>{{ message }}</p>
      <div class="dialog-actions">
        <button class="btn btn-danger" @click="emit('confirm')">Да</button>
        <button class="btn btn-secondary" @click="emit('cancel')">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean;
  message: string;
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
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
  padding: 24px;
  border-radius: 8px;
  min-width: 300px;
}

.dialog p {
  margin: 0 0 16px;
  font-size: 16px;
}

.dialog-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-danger {
  background: #e74c3c;
  color: #fff;
}

.btn-danger:hover {
  background: #c0392b;
}

.btn-secondary {
  background: #95a5a6;
  color: #fff;
}

.btn-secondary:hover {
  background: #7f8c8d;
}
</style>
