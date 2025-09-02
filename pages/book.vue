<template>
  <section class="section section--about-book">
    <div class="section__inner grid-2 grid-2--to-1 container">
      <div class="section__col">
        <p class="section__text section__text--underlined">
          <strong>«В свете софитов»</strong> — это психологическая драма с музыкальным ритмом и разбитым пульсом. История молодой девушки, чьё взросление проходит под светом сцены и в глубокой тени внутри. Вопросы, которые она себе задаёт, знакомы каждому, кто пытался быть услышанным: «Кто я?», «Зачем я здесь?» и «Что делать, если в самый важный момент голос исчезает?»
        </p>
      </div>
      <div class="section__col">
        <div class="section--about-book__image-wrapper">
          <img class="section__image" src="/public/images/book_md.png" alt="Книга">
        </div>
      </div>
    </div>
  </section>

  <section class="section section--review section--rose">
    <div class="section__inner section__inner--center container">
      <p class="section__text section__text--blockquote">
        <span>
          Эта книга — о цене таланта, о свете, который обжигает и о том, как одиноко бывает в центре внимания. Возможно, прочитав её, вы по-новому взглянете на тех, кто выходит на сцену, чтобы спрятаться… или наконец найти себя.
        </span>
      </p>
      <p class="section__text section__text--author">
        София Светлова <br>
        <span>книжный обозреватель</span>
      </p>
    </div>
  </section>

  <section class="section section--music-book">
    <div class="section__inner container">
      <h2 class="section__title section__title--inner">
        Это не просто книга, это история, которую можно<br>
        пережить на разных уровнях восприятия
      </h2>
    </div>
    <div class="section__inner grid-2 grid-2--to-1 grid-2--hide-2d container" style="margin-bottom: 62px">
      <div class="section__col">
        <div class="section__text section__text--inner">
          <p>
            Книга <strong>«В свете софитов»</strong> — это не просто роман, а мультимедийное погружение в мир музыки, эмоций и внутренних переживаний. Её уникальность — в <strong>саундтреках</strong>, подобранных специально для этой истории.
          </p>
          <p>
            Некоторые главы сопровождаются <strong>тематической композицией</strong>, которая усиливает атмосферу. В кульминационные моменты музыка сливается с текстом, создавая эффект "кино в голове".
          </p>
          <p>
            <strong>QR-коды</strong> в тексте помогут перейти к треку в момент чтения.
          </p>
          <p>
            Музыка раскрывает то, что слова не могут передать, книга становится <strong>интерактивной</strong> — читатель не просто наблюдает за историей, а слышит её. И после прочтения остаётся "эхо" — саундтрек можно слушать отдельно, возвращаясь к эмоциям книги.
          </p>
          <p>
            Особенно интересно это будет для ценителей музыки и экспериментальных форматов.
          </p>
        </div>
      </div>
      <div class="section__col">
        <div class="section--music-book__image-wrapper">
          <img class="section__image" src="@/assets/images/music-book.png" alt="Книга">
        </div>
      </div>
    </div>
    <div class="section__inner container">
      <h3 class="section__title h5">Приобрести книгу:</h3>
      <div class="section__button-container button-image-container">
        <Button class="section__button button--image"
                href="/book"
        >
          <img src="@/assets/images/buy-book/litres_logo.png"
               alt="Купить на Литрес" title="Купить на Литрес">
        </Button>
        <Button class="section__button button--image"
                href="/book"
        >
          <img src="@/assets/images/buy-book/ozon_logo.png"
               alt="Купить на Ozon" title="Купить на Ozon">
        </Button>
        <Button class="section__button button--image"
                href="/soundtracks"
                label="Скачать"
                icon-name="download"
                icon-position="after"
                mode="transparent"
        />
      </div>
    </div>
    <div class="section__inner container">
      <div class="section__button-container button-tile-container">
        <Button class="section__button button--tile"
                href="/soundtracks"
                label="Саундтреки к книге"
                icon-name="piano"
        />
        <Button class="section__button button--tile"
                href="/music"
                label="Музыкальный альбом"
                icon-name="record"
                color="brown"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
    import Button from '@/components/common/Button.vue'

    definePageMeta({
        seo: {
            title: 'Natalja Ray | О книге',
            description: 'О книге «В свете софитов»',
            image: '/og-about.jpg' // из public/
            // noindex: true
        }
    });
</script>

<style scoped>

</style>