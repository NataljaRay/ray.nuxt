<template>
  <div class="news-card">
      <div class="news-card__head">
        <img class="news-card__image"
             :src="`/images/news/${item.img}.png`"
             :alt="item.title || ''">
      </div>
      <div class="news-card__body">
        <div class="news-card__title">{{item.title}}</div>
        <div class="news-card__description">{{item.description}}</div>
        <div class="news-card__date"><i>{{item.date}}</i></div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "NewsCard",
        props: ['item']
    }
</script>

<style scoped>

</style>