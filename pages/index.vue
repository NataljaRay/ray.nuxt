<template>
  <section class="section section--1 section--dark">
    <div class="section__inner container">
      <div class="section__col">
        <h2 class="section__title">Автор Историй</h2>
        <p class="section__text">
          Я — Natalja Ray, автор и композитор. Пишу книги, в которых живёт музыка, и музыку, в которой звучат истории. Мои проекты объединяют слово и звук, чтобы передать то, что не укладывается в одно измерение.
        </p>
        <div class="section__button-container">
          <Button class="section__button"
                  href="/about"
                  label="Моя биография"
          />
        </div>
      </div>
      <div class="section__col">
        <div class="section--1__image-wrapper">
          <img class="section__image" src="/public/images/natalja_ray.png">
        </div>
      </div>
    </div>

  </section>

  <section class="section section--2">
    <div class="section__inner container">
      <div class="section__col">
        <h2 class="section__title">Проект «В свете софитов»</h2>
        <p class="section__text">
          Психологическая драма о взрослении, сцене и тенях внутри. Каждый её эпизод сопровождается авторским саундтреком. Это не просто книга. Это история, которую можно слушать.
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
                  href="/book"
                  label="Купить книгу"
                  color="brown"
          />
        </div>
      </div>
      <div class="section__col">
        <div class="section--2__image-wrapper">
          <img class="section__image" src="/public/images/book.png">
        </div>
      </div>
    </div>

  </section>

  <section class="section section--3 section--dark">
    <div class="section__inner container">
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
        </div>
      </div>
      <div class="section__col">
        <div class="section__widget">
<!--          <iframe frameborder="0" allow="clipboard-write" style="border:none;width:463px;height:556px;" width="463" height="556" src="https://music.yandex.ru/iframe/playlist/nray92v/1023">Слушайте <a href="https://music.yandex.ru/playlists/43beb942-db1c-959c-8878-0af47a682ef7?utm_source=web&utm_medium=copy_link">Софиты. Книга 1</a> — <a href="https://music.yandex.ru/users/nray92v">Наталья М.</a> на Яндекс Музыке</iframe>-->
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
    import Button from '@/components/common/Button.vue'

    definePageMeta({
        seo: {
            title: 'Natalja Ray',
            description: 'Личный сайт Natalja Ray',
            image: '/og-main.jpg' // из public/
            // noindex: true
        }
    });
</script>
