<template>
  <header class="header">
    <div class="header__inner container">
      <NuxtLink class="header__logo logo" to="/" aria-label="Home" @click="closeMenu">Natalja Ray</NuxtLink>

      <dialog class="header__overlay-menu-dialog" :open="open">
<!--        <AppNav :open="open" />-->
        <AppNav v-model:open="open" />
        <social-links class="header__actions"/>

        <div class="header__actions">
          <Button class="header__button"
                  href="/book#buy-book"
                  label="Купить книгу"
                  color="brown"
                  @click="closeMenu"
          />
        </div>
      </dialog>

      <button class="header__burger-button visible-menu burger-button" type="button"
              :aria-label="titleOpenMenu"
              :title="titleOpenMenu"
              :class="open ? 'is-active' : ''"
              :aria-expanded="open ? 'true' : 'false'"
              aria-controls="primary-menu"
              @click="toggleMenu"
      >
        <svg class="burger-button__svg" width="30" height="30" viewBox="0 0 100 100">
          <path class="burger-button__line burger-button__line--1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>
          <path class="burger-button__line burger-button__line--2" d="M 20,50 H 80"/>
          <path class="burger-button__line burger-button__line--3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>
        </svg>
      </button>

    </div>
  </header>
</template>

<script setup>
    import { ref } from 'vue'
    import { useHead } from '#imports'
    import Button from '@/components/common/Button.vue'
    import AppNav from '@/components/AppNav.vue'
    import SocialLinks from './blocks/SocialLinks'

    const open = ref(false)
    const titleOpenMenu = 'Open menu'

    const toggleMenu = () => { open.value = !open.value }
    const closeMenu = () => { open.value = false }

    // Реактивный класс на <body>
    useHead(() => ({
        bodyAttrs: {
            class: { 'no-scroll': open.value }
        }
    }))

    // Закрываем меню при смене маршрута (на случай навигации не через клик по пункту)
    const route = useRoute()
    watch(() => route.fullPath, () => { open.value = false })

    // const closeMenu = () => {
    //     open.value = false
    // }
    //
    // // ЕДИНСТВЕННЫЙ реактивный head-запрос.
    // // Класс будет добавляться/убираться автоматически при изменении open.
    // useHead(() => ({
    //     bodyAttrs: {
    //         class: { 'no-scroll': open.value }
    //     }
    // }))
</script>
<!--<script>-->

<!--    import Button from '@/components/common/Button.vue'-->
<!--    import AppNav from '@/components/AppNav.vue'-->
<!--    import SocialLinks from "./blocks/SocialLinks";-->

<!--    export default {-->
<!--        name: 'AppHeader',-->
<!--        components: {SocialLinks, AppNav, Button },-->
<!--        data: () =>  ({-->
<!--            open: false,-->
<!--            titleOpenMenu: 'Open menu',-->
<!--        }),-->
<!--        -->
<!--        // watch: {-->
<!--        //     open(value) {-->
<!--        //         useHead({-->
<!--        //             bodyAttrs: {-->
<!--        //                 class: value ? 'no-scroll' : 'test'-->
<!--        //             }-->
<!--        //         })-->
<!--        //     }-->
<!--        // }-->
<!--    }-->
<!--</script>-->
<style>
  .no-scroll {
    overflow: hidden;
  }
</style>
<style scoped>

  /*.site-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 16px;border-bottom:1px solid rgba(0,0,0,.1)}*/
  /*.logo{font-weight:700;text-decoration:none}*/
</style>
