<template>
  <nav class="header__menu" aria-label="Main navigation">
    <ul id="primary-menu" class="header__menu-list" :class="{ open }">
      <li class="header__menu-item" v-for="item in menuItems" :key="item.label">
        <NuxtLink :to="item.href" class="header__menu-link" exact-active-class="is-active" @click="closeMenu">{{item.label}}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script setup>
    const { open } = defineProps({ open: Boolean })
    const emit = defineEmits(['update:open'])
    const closeMenu = () => emit('update:open', false)

    const menuItems = [
        { label: 'Главная', href: '/' },
        // { label: 'Обо мне', href: '/about' },
        { label: 'О книге', href: '/book' },
        { label: 'Саундтреки', href: '/soundtracks' },
        { label: 'Музыка', href: '/music' },
        // { label: 'Новости', href: '/news' },
        { label: 'Контакты', href: '#contacts' },
    ]
</script>

<style scoped>

</style>
