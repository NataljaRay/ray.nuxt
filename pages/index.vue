<template>
  <hero/>
  <section class="section section--about section--dark">
    <div class="section__inner grid-2 grid-2--to-1 grid-2--hide-2d container">
      <div class="section__col">
        <h2 class="section__title">Автор Историй</h2>
        <p class="section__text">
          Я — Natalja Ray, автор и композитор. Пишу книги, в которых живёт музыка, и музыку, в которой звучат истории. Мои проекты объединяют слово и звук, чтобы передать то, что не укладывается в одно измерение.
        </p>
        <div class="section__button-container">
<!--          <Button class="section__button"-->
<!--                  href="/about"-->
<!--                  label="Моя биография"-->
<!--          />-->
          <Button class="section__button"
                  href="/book"
                  label="О книге"
          />
          <Button class="section__button"
                  href="/music"
                  label="Слушать музыку"
          />
        </div>
      </div>
      <div class="section__col">
        <div class="section--about__image-wrapper" style="display: flex">
          <img class="section__image" src="/public/images/natalja_ray_new.png" alt="Natalja Ray" width="460">
        </div>
      </div>

    </div>

  </section>

  <section class="section section--book">
    <div class="section__inner grid-2 grid-2--to-1 container">
      <div class="section__col">
        <h2 class="section__title">Проект «В свете софитов»</h2>
        <p class="section__text">
          Психологическая драма о взрослении, сцене и тенях внутри. Некоторые её эпизоды сопровождаются саундтреками - как мировыми хитами, так и авторскими композициями. Это не просто книга. Это история, которую можно слушать.
        </p>
        <div class="section__button-container">
          <Button class="section__button"
                  href="/book"
                  label="О книге"
          />
          <Button class="section__button"
                  href="/soundtracks"
                  label="Саундтреки"
          />
        </div>
        <div class="section__button-container">
          <Button class="section__button"
                  href="/book#buy-book"
                  label="Купить книгу"
                  color="brown"
          />
        </div>
      </div>
      <div class="section__col">
        <div class="section--book__image-wrapper">
          <img class="section__image" src="/public/images/book.png" alt="Книга">
        </div>
      </div>
    </div>
  </section>

  <section class="section section--music section--dark" >
    <div class="section__inner grid-2 grid-2--to-1 container">
      <div class="section__col">
        <h2 class="section__title">Музыка Natalja Ray</h2>
        <p class="section__text">
          От инди до альтернативного рока — моя музыка рождена из эмоций. Это звуковые пьесы, которые продолжают книги или живут собственной историей.
        </p>
        <div class="section__button-container">
          <Button class="section__button"
                  href="/music"
                  label="Слушать музыку"
          />
          <Button class="section__button"
                  target="_blank"
                  href="https://band.link/nataljaray"
                  label="band.link"
                  icon-name="external-link"
                  icon-position="after"
          />
        </div>
      </div>
      <div class="section__col">
        <div class="section__widget">
          <YandexMusicWidget
                  album-id="37825294"
                  :width="'100%'"
                  :height="556"
                  title="Yandex Music album"
          />
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
    import Hero from "../components/sections/Hero.vue";
    import Button from '@/components/common/Button.vue'
    // import NewsCard from "@/components/blocks/NewsCard.vue";
    import YandexMusicWidget from '@/components/widgets/YandexMusicWidget.vue'

    definePageMeta({
        seo: {
            title: 'Natalja Ray',
            description: 'Natalja Ray. Слово. Музыка. Свет. Тень. Наталья Рэй',
            image: '/NataljaRay.jpg' // из public/
            // noindex: true
        }
    });
</script>
