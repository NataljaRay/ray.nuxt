<template>
<!--  album-min.vue-->
        <div class="album">

          <div class="album__image-wrapper">
            <img :src="imgUrl(album.cover)"
                 :alt="album.title"
                 :title="album.title || ''"
                 width="342" height="342" loading="lazy" decoding="async"
            >
          </div>

          <div class="album__info-wrapper">
            <div class="h4 album__title">{{album.altTitle}}</div>

            <ul class="album__info">
              <li class="album__info-item">
                Дата релиза: <span>{{album.info.releaseDate}}</span>
              </li>
              <li class="album__info-item">
                Лейбл: <span>{{album.info.label}}</span>
              </li>
              <li class="album__info-item">
                Формат: <span>{{album.info.type}}</span>
              </li>
            </ul>
            <Button class="button--link"
                    target="_blank"
                    :href="album.info.releasePage"
                    label="Перейти на страницу релиза"
            />

            <div class="player__note">Слушать на музыкальных площадках: </div>
            <div class="album__streamings">
              <Streamings :streamings="album.streamings" />
            </div>
          </div>
        </div>

</template>

<script setup>
    import Streamings from '@/components/blocks/Streamings.vue'
    import Button from '@/components/common/Button.vue'

    import { withBase } from 'ufo'

    const imgUrl = (key) => withBase(`/images/albums/${key}`, baseURL)

    const { public: { baseURL, siteUrl } } = useRuntimeConfig();

    const props = defineProps({
        album:      { type: Object, default: null },
    })

</script>

<style scoped>

</style>