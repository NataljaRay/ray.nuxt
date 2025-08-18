<template>
  <header class="site-header">
    <NuxtLink class="logo" to="/">Natalja Ray</NuxtLink>
    <AppNav />
  </header>
</template>

<script>
    import AppNav from '@/components/AppNav.vue'
    export default { name: 'AppHeader', components: { AppNav } }
</script>

<style scoped>
  .site-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 16px;border-bottom:1px solid rgba(0,0,0,.1)}
  /*.logo{font-weight:700;text-decoration:none}*/
</style>
