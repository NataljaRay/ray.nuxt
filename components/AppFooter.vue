<template>
  <footer class="footer" id="contacts">
    <div class="footer__inner container">
      <div class="h1 footer__title">Связь со мной</div>
      <p class="footer__text">
        Хочешь задать вопрос, оставить отзыв или предложить сотрудничество?<br/>
        Напиши мне!
      </p>
<!--      <SocialLinks class="footer__links" customClass="button&#45;&#45;transparent-white"/>-->
      <social-links class="footer__links" :button-custom-class="'button--transparent-white'"/>
      <Button class="footer__button"
              href="mailto:nray92v@gmail.com"
              label="Написать на почту"
      />
      <p class="footer__copyright">© {{ year === 2025 ? year : '2025 - ' + year}} Natalja Ray</p>
    </div>
  </footer>
</template>

<script setup>
    import Button from '@/components/common/Button.vue'
    import SocialLinks from '@/components/blocks/SocialLinks.vue'

    const year = useState('year', () => new Date().getFullYear());
</script>

<style scoped>

</style>