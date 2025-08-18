<template>
  <div>
    <a class="skip-link" href="#main">Пропустить к содержимому</a>
    <AppHeader/>
    <main id="main"><slot /></main>
    <footer class="site-footer">© {{ new Date().getFullYear() }}</footer>
  </div>
</template>

<script>
    import AppHeader from '@/components/AppHeader.vue'
    export default { components: { AppHeader } }
</script>

<style scoped>
  .skip-link{position:absolute;left:-9999px;top:-9999px}
  .skip-link:focus{left:16px;top:16px;background:#fff;padding:6px 10px;border:1px solid #000}
</style>
