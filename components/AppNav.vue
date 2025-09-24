<template>
  <nav class="header__menu" aria-label="Main navigation">
<!--    <button-->
<!--            class="nav-toggle header__burger-button visible-menu"-->
<!--            :aria-expanded="open ? 'true' : 'false'"-->
<!--            aria-controls="primary-menu"-->
<!--            @click="open = !open"-->
<!--    >-->
<!--      Меню-->
<!--    </button>-->

<!--    <button class="nav-toggle burger-button visible-menu" type="button" aria-label="" title=""-->
<!--            :aria-expanded="open ? 'true' : 'false'"-->
<!--            aria-controls="primary-menu"-->
<!--            @click="open = !open">-->
<!--      <svg class="burger-button__svg" width="30" height="30" viewBox="0 0 100 100">-->
<!--        <path class="burger-button__line burger-button__line&#45;&#45;1"-->
<!--              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>-->
<!--        <path class="burger-button__line burger-button__line&#45;&#45;2" d="M 20,50 H 80"/>-->
<!--        <path class="burger-button__line burger-button__line&#45;&#45;3"-->
<!--              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>-->
<!--      </svg>-->
<!--    </button>-->

    <ul id="primary-menu" class="header__menu-list" :class="{ open }">
      <li class="header__menu-item" v-for="item in menuItems" :key="item.label">
<!--        <NuxtLink :to="item.href" class="header__menu-link" exact-active-class="is-exact-active">{{item.label}}</NuxtLink>-->
        <NuxtLink :to="item.href" class="header__menu-link" exact-active-class="is-active" @click="closeMenu">{{item.label}}</NuxtLink>
      </li>


<!--      <li><NuxtLink to="/" exact-active-class="is-exact-active">Главная</NuxtLink></li>-->
<!--      <li><NuxtLink to="/about" active-class="is-active">Обо мне</NuxtLink></li>-->
<!--      <li><NuxtLink to="/soundtracks" active-class="is-active">Саундтреки</NuxtLink></li>-->
<!--      <li><NuxtLink to="/contacts" active-class="is-active">Контакты</NuxtLink></li>-->
    </ul>
  </nav>
</template>
<script setup>
    // const props = defineProps({ open: Boolean })
    const { open } = defineProps({ open: Boolean })
    const emit = defineEmits(['update:open'])
    const closeMenu = () => emit('update:open', false)

    const menuItems = [
        { label: 'Главная', href: '/' },
        { label: 'Обо мне', href: '/about' },
        { label: 'О книге', href: '/book' },
        { label: 'Саундтреки', href: '/soundtracks' },
        { label: 'Музыка', href: '/music' },
        { label: 'Новости', href: '/news' },
        { label: 'Контакты', href: '#contacts' },
    ]
</script>
<!--<script>-->
<!--    export default {-->
<!--        name: 'AppNav',-->
<!--        // props: ['open'],-->
<!--        props: { open: Boolean },-->
<!--        emits: ['update:open'],-->
<!--        data: () => (-->
<!--            {-->
<!--                // open: false,-->
<!--                menuItems: [-->
<!--                    {label: 'Главная', href: '/'},-->
<!--                    {label: 'Обо мне', href: '/about'},-->
<!--                    {label: 'О книге', href: '/book'},-->
<!--                    {label: 'Саундтреки', href: '/soundtracks'},-->
<!--                    {label: 'Музыка', href: '/music'},-->
<!--                    {label: 'Новости', href: '/news'},-->
<!--                    {label: 'Контакты', href: '#contacts'},-->
<!--                ],-->
<!--            }-->
<!--        ),-->
<!--        methods: {-->
<!--            closeMenu() {-->
<!--                this.$emit('update:open', false)-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<style scoped>
  /*.app-nav{display:flex;align-items:center;gap:16px}*/
  /*.nav-toggle{display:none}*/
  /*.nav-list{display:flex;gap:16px;list-style:none;margin:0;padding:0}*/
  /*!*.is-active{ text-decoration: underline; }*!*/
  /*!*.is-exact-active, .is-active { font-weight:700 }*!*/
  /*.is-exact-active, .is-active { color: var(--color-red) }*/
  /*@media (max-width:640px){*/
  /*  .nav-toggle{display:inline-flex}*/
  /*  .nav-list{display:none;flex-direction:column;gap:8px}*/
  /*  .nav-list.open{display:flex}*/
  /*}*/
</style>
