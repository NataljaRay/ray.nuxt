<template>
  <nav class="app-nav" aria-label="Основная навигация">
    <button
            class="nav-toggle"
            :aria-expanded="open ? 'true' : 'false'"
            aria-controls="primary-menu"
            @click="open = !open"
    >
      Меню
    </button>

    <ul id="primary-menu" class="nav-list" :class="{ open }">
      <li><NuxtLink to="/" exact-active-class="is-exact-active">Главная</NuxtLink></li>
      <li><NuxtLink to="/about" active-class="is-active">Обо мне</NuxtLink></li>
      <li><NuxtLink to="/soundtracks" active-class="is-active">Саундтреки</NuxtLink></li>
      <li><NuxtLink to="/contacts" active-class="is-active">Контакты</NuxtLink></li>
    </ul>
  </nav>
</template>

<script>
    export default { name: 'AppNav', data: () => ({ open: false }) }
</script>

<style scoped>
  .app-nav{display:flex;align-items:center;gap:16px}
  .nav-toggle{display:none}
  .nav-list{display:flex;gap:16px;list-style:none;margin:0;padding:0}
  /*.is-active{ text-decoration: underline; }*/
  .is-exact-active, .is-active { font-weight:700 }
  @media (max-width:640px){
    .nav-toggle{display:inline-flex}
    .nav-list{display:none;flex-direction:column;gap:8px}
    .nav-list.open{display:flex}
  }
</style>
