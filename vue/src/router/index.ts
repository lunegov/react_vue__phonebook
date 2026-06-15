import { createRouter, createWebHistory } from 'vue-router';
import PhoneBookList from '@/views/PhoneBookList.vue';
import PhoneBookEdit from '@/views/PhoneBookEdit.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'list',
      component: PhoneBookList,
    },
    {
      path: '/create',
      name: 'create',
      component: PhoneBookEdit,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: PhoneBookEdit,
      props: true,
    },
  ],
});

export default router;
