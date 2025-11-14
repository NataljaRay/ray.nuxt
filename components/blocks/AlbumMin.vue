<template>
        <div class="album">
          <div class="album__image-wrapper" v-if="album.cover">
<!--            <ClientOnly>-->
              <img :src="(isMobile || isTablet) && props.compressed ? imgUrlSm(album.cover) : imgUrl(album.cover)"
                   :alt="album.title"
                   :title="album.title || ''"
                   width="342" height="342" decoding="async"
                   fetchpriority="high"
              >
<!--              </ClientOnly>-->
          </div>

          <div class="album__info-wrapper">
            <div class="h4 album__title" v-if="album.altTitle">{{album.altTitle}}</div>

            <ul class="album__info" v-if="album.info">
              <li class="album__info-item" v-if="album.info.releaseDate">
                Дата релиза: <span>{{album.info.releaseDate}}</span>
              </li>
              <li class="album__info-item" v-if="album.info.label">
                Лейбл: <span>{{album.info.label}}</span>
              </li>
              <li class="album__info-item" v-if="album.info.type">
                Формат: <span>{{album.info.type}}</span>
              </li>
            </ul>
<!--            <Button class="button&#45;&#45;link"-->
<!--                    target="_blank"-->
<!--                    :href="album.info.releasePage"-->
<!--                    label="Перейти на страницу релиза"-->
<!--            />-->

            <div class="custom-track" v-if="album.soon">

              <div class="player__note" style="text-align: center">{{album.soon}}</div>

              <template v-if="album.anchor == 'what-is-your-plan'">
                <div class="custom-track__title">Демо:</div>
                <audio controls>
                  <source src="/audio/Natalja_Ray_Kakov_tvoi_plan_demo.mp3" type="audio/mpeg">
                  Ваш браузер не поддерживает элемент audio.
                </audio>
              </template>

<!--              <template v-if="album.anchor == 'break-it-all'">-->
<!--                <div class="custom-track__title">Превью:</div>-->
<!--                <audio controls>-->
<!--                  <source src="/audio/Natalja_Ray_Break_It_All_01_01.mp3" type="audio/mpeg">-->
<!--                  Ваш браузер не поддерживает элемент audio.-->
<!--                </audio>-->
<!--              </template>-->

<!--              <template v-if="album.anchor == 'dlya-nas'">-->
<!--                <div class="custom-track__title">Превью:</div>-->
<!--                <audio controls>-->
<!--                  <source src="/audio/Natalja_Ray_Dlya_nas_0_56.mp3" type="audio/mpeg">-->
<!--                  Ваш браузер не поддерживает элемент audio.-->
<!--                </audio>-->
<!--              </template>-->

            </div>

<!--            <div class="player__note" v-if="album.soon" style="text-align: center">{{album.soon}}</div>-->
            <div class="player__note" v-if="album.streamings">Слушать на музыкальных площадках: </div>
            <div class="album__streamings" v-if="album.streamings">
              <Streamings :streamings="album.streamings" />
            </div>
          </div>
        </div>

</template>

<script setup>
    import Streamings from '@/components/blocks/Streamings.vue'
    import Button from '@/components/common/Button.vue'

    import { withBase } from 'ufo'
    import {computed} from "vue";

    const imgUrl = (key) => withBase(`/images/albums/${key}`, baseURL)
    const imgUrlSm = (key) => withBase(`/images/albums/compressed/${key}`, baseURL)

    // mobile check
    const device = useDevice()

    const isMobile = computed(() => device.value.isMobile)
    const isTablet = computed(() => device.value.isTablet)
    const isDesktop = computed(() => device.value.isDesktop)

    const { public: { baseURL, siteUrl } } = useRuntimeConfig();

    const props = defineProps({
        album:      { type: Object, default: null },
        compressed: { type: Boolean, default: false },
    })

</script>

<style scoped>

</style>