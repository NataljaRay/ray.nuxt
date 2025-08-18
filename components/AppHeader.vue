<template>
  <header class="header">
    <div class="header__inner container">
      <NuxtLink class="logo" to="/">Natalja Ray</NuxtLink>

<!--      <dialog-->
<!--              class="header__overlay-menu-dialog"-->
<!--              data-js-overlay-menu-dialog=""-->
<!--      >-->
<!--        dialog-->
<!--        <AppNav />-->
<!--      </dialog>-->

      <AppNav />

<!--      <button class="burger-button visible-menu" type="button" aria-label="" title=""-->
<!--              :aria-expanded="open ? 'true' : 'false'"-->
<!--              aria-controls="primary-menu"-->
<!--              @click="open = !open">-->
<!--        <svg class="burger-button__svg" width="30" height="30" viewBox="0 0 100 100">-->
<!--          <path class="burger-button__line burger-button__line&#45;&#45;1"-->
<!--                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>-->
<!--          <path class="burger-button__line burger-button__line&#45;&#45;2" d="M 20,50 H 80"/>-->
<!--          <path class="burger-button__line burger-button__line&#45;&#45;3"-->
<!--                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>-->
<!--        </svg>-->
<!--      </button>-->
    </div>
  </header>
</template>

<script>
  // import '@/assets/scss/components/header.scss';
  // import '@/assets/scss/components/burger-button.scss';
    import AppNav from '@/components/AppNav.vue'
    export default {
        name: 'AppHeader',
        components: { AppNav },
        data: () =>  ({
            // open: false,
        })
    }
</script>

<style scoped>
  /*.site-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 16px;border-bottom:1px solid rgba(0,0,0,.1)}*/
  /*.logo{font-weight:700;text-decoration:none}*/
</style>
