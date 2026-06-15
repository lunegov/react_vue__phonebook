<template>
  <div class="page">
    <h1>{{ id ? 'Редактировать запись' : 'Новая запись' }}</h1>
    <p v-if="loading">Загрузка...</p>
    <PhoneBookForm v-else :record="record" @save="handleSave" @cancel="handleCancel" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePhoneBookRecord } from '@/composables/usePhoneBook';
import PhoneBookForm from '@/components/PhoneBookForm.vue';
import type { PhoneBookRecord } from '@/types';

const route = useRoute();
const router = useRouter();
const { record, loading, load, save } = usePhoneBookRecord();

const id = route.params.id ? Number(route.params.id) : null;

onMounted(async () => {
  if (id) await load(id);
});

const handleSave = async (data: PhoneBookRecord) => {
  await save(data);
  router.push('/');
};

const handleCancel = () => {
  router.push('/');
};
</script>
