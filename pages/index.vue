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
          <Button class="section__button"
                  href="/about"
                  label="Моя биография"
          />
          <Button class="section__button"
                  target="_blank"
                  href="https://band.link/nataljaray"
                  label="Слушать музыку"
          />
        </div>
      </div>
      <div class="section__col">
        <div class="section--about__image-wrapper" style="display: flex">
<!--          <img class="section__image" src="/public/images/natalja_ray.png" alt="Natalja Ray">-->
          <img class="section__image" src="/public/images/natalja_ray_new.png" alt="Natalja Ray" width="460">
<!--          <img class="section__image" src="/public/images/natalja_ray_new_sm.png" alt="Natalja Ray">-->
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
                  href="/book"
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
                  target="_blank"
                  href="https://band.link/nataljaray"
                  label="Слушать музыку"
          />
        </div>
      </div>
      <div class="section__col">
        <div class="section__widget">
<!--          <iframe class="section__iframe" frameborder="0" allow="clipboard-write" style="border:none;width:465px;height:556px;"-->
<!--                  height="556" src="https://music.yandex.ru/iframe/album/37825294">Слушайте <a-->
<!--                  href="https://music.yandex.ru/album/37825294?utm_source=web&utm_medium=copy_link">Neurotic-->
<!--            Love</a> — <a href="https://music.yandex.ru/artist/21974129">Natalja Ray</a> на Яндекс Музыке-->
<!--          </iframe>-->
          <YandexMusicWidget
                  album-id="37825294"
                  :width="'100%'"
                  :height="556"
                  title="Yandex Music album"
          />
<!--          <YandexMusicWidget-->
<!--                  album-id="37825294"-->
<!--                  :width="465"-->
<!--                  :height="556"-->
<!--                  title="Yandex Music album"-->
<!--          />-->
<!--          <div class="section__iframe-cover">-->
<!--            <img  src="https://avatars.yandex.net/get-music-content/14651289/2f8cef7b.a.37825294-1/400x400"-->
<!--                 width="120" height="120" alt="Neurotic Love">-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </section>


  <section class="section section--music section--dark" style="display: none">
    <div class="section__inner grid-2 container">
      <div class="section__col">
        <h2 class="section__title">Музыка Natalja Ray</h2>
        <p class="section__text">
          От инди до альтернативного рока — моя музыка рождена из эмоций. Это звуковые пьесы, которые продолжают книги или живут собственной историей.
        </p>
        <div class="section__button-container">
          <Button class="section__button"
                  target="_blank"
                  href="https://band.link/nataljaray"
                  label="Слушать музыку"
          />
          <!--          <Button class="section__button"-->
          <!--                  href="/music"-->
          <!--                  label="Слушать музыку"-->
          <!--          />-->
        </div>
      </div>
      <div class="section__col">
        <div class="section--music__image-wrapper">
          <img class="section__image" src="/public/images/natalja_ray_avatar.jpg" alt="Natalja Ray">
        </div>
        <!--        <div class="section__widget">-->
        <!--          <iframe frameborder="0" allow="clipboard-write" style="border:none;width:463px;height:556px;" width="463" height="556" src="https://music.yandex.ru/iframe/playlist/nray92v/1023">Слушайте <a href="https://music.yandex.ru/playlists/43beb942-db1c-959c-8878-0af47a682ef7?utm_source=web&utm_medium=copy_link">Софиты. Книга 1</a> — <a href="https://music.yandex.ru/users/nray92v">Наталья М.</a> на Яндекс Музыке</iframe>-->
        <!--        </div>-->
      </div>
    </div>
  </section>

  <section class="section section--music section--red" style="display: none">
    <div class="section__inner grid-2 container">
      <div class="section__col">
        <h2 class="section__title">Музыка Natalja Ray</h2>
        <p class="section__text">
          От инди до альтернативного рока — моя музыка рождена из эмоций. Это звуковые пьесы, которые продолжают книги или живут собственной историей.
        </p>
        <div class="section__button-container">
          <Button class="section__button"
                  target="_blank"
                  href="https://band.link/nataljaray"
                  label="Слушать музыку"
                  color="brown-light"
          />
        </div>
      </div>
      <div class="section__col">
        <div class="section--music__image-wrapper">
          <img class="section__image" src="/public/images/natalja_ray_avatar.jpg" alt="Natalja Ray">
        </div>
        <!--        <div class="section__widget">-->
        <!--          <iframe frameborder="0" allow="clipboard-write" style="border:none;width:463px;height:556px;" width="463" height="556" src="https://music.yandex.ru/iframe/playlist/nray92v/1023">Слушайте <a href="https://music.yandex.ru/playlists/43beb942-db1c-959c-8878-0af47a682ef7?utm_source=web&utm_medium=copy_link">Софиты. Книга 1</a> — <a href="https://music.yandex.ru/users/nray92v">Наталья М.</a> на Яндекс Музыке</iframe>-->
        <!--        </div>-->
      </div>
    </div>
  </section>

  <section class="section section--dark section--news" style="display: none">
    <div class="section__wrapper">
      <div class="section__inner container">
        <h2 class="section__title section__title--white">Новости</h2>
        <div class="news">
          <div class="news__item" v-for="item in news" :key="item.img">
            <NewsCard :item="item"/>
          </div>
        </div>
        <div class="section__button-container">
          <Button class="section__button"
                  href="/news"
                  label="Все новости"
                  color="brown-light"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
    import Hero from "../components/sections/Hero.vue";
    import Button from '@/components/common/Button.vue'
    import NewsCard from "@/components/blocks/NewsCard.vue";
    import YandexMusicWidget from '@/components/widgets/YandexMusicWidget.vue'

    definePageMeta({
        seo: {
            title: 'Natalja Ray',
            description: 'Личный сайт Natalja Ray',
            image: '/og-main.jpg' // из public/
            // noindex: true
        }
    });

    // const test = ref(true)
    const news = [
        {
            img: 'book_sm',
            title: 'Выход бумажной версии книги анонсирован на сентябрь!',
            description: 'Книга “В свете софитов” выйдет в физическом виде силами издательства “Книжный дом” 15 сентября!\n' +
                'Твердый переплёт, качественная бумага - то, что нужно для глубокого погружения в роматическую историю с многогранными персонажами...',
            date: '10 июня, 2025',
        },
        {
            img: 'tired_cover_preview',
            title: 'Новый сингл “I’m Tired” уже в сети!',
            description: '"Я устала бояться совершить ошибку" - с таких слов начинается трек. Он рассказывает об осознании, которое ведет к переменам - открыться новому, перестать подчиняться своим страхам.',
            date: '25 апреля, 2025',
        },
        {
            img: 'bim_radio_preview',
            title: 'Интервью и презентация на БИМ-радио',
            description: 'Презентация нового трека “Не пытайся”\n' +
                'и интервью Натальи уже завтра на БИМ-радио Казань 102.8 FM в 16:20! ',
            date: '26 мая, 2024',
        },
        // {
        //     img: '',
        //     title: '',
        //     description: '',
        //     date: '',
        // },
    ]
</script>
