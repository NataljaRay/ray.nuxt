<template>
  <div>
    <section class="section section--music-page section--universal"
             :class="isClient && isDesktop ? 'desktop' : 'mobile'">
      <div class="section__inner container">
        <p class="section__text">
          Моя музыка рождается из состояний, ощущений и сцен. Здесь вы найдёте как саундтреки к книгам, так и независимые композиции — истории, которые звучат изнутри.
        </p>
      </div>
    </section>

    <div class="music-block">
      <template v-if="isMobile || isTablet">
          <section class="section section--album section--album-min">
            <div class="section__inner grid-2 grid-2--mirrow grid-2--to-1 container">
              <div class="section__col"
                   v-for="album in albums" :key="album.title">
                <AlbumMin :album="album" :compressed="false"/>
              </div>
            </div>
          </section>
      </template>
      <template v-else>
        <Album v-for="album in albums" :key="album.title" :album="album"/>
      </template>
    </div>
    <section class="section section--socials section--universal section--rose">
      <div class="section__inner section__inner--center container">
        <p class="header__logo logo" aria-label="Home">Natalja Ray</p>
        <p class="player__note">
          в соцсетях
        </p>
        <div class="section__actions">
          <Button class="section__button button--social"
                  href="https://vk.com/nataljaray"
                  target="_blank"
                  isLabelHidden
                  label="Паблик вконтакте"
                  icon-name="vk"
                  mode="transparent"
          />
          <Button class="section__button button--social"
                  href="https://t.me/nataljaray_music"
                  target="_blank"
                  isLabelHidden
                  label="Телеграм канал"
                  icon-name="tg"
                  mode="transparent"
          />
<!--          <Button class="section__button button&#45;&#45;social"-->
<!--                  href="https://www.youtube.com/@nataljaray"-->
<!--                  target="_blank"-->
<!--                  isLabelHidden-->
<!--                  label="YouTube канал"-->
<!--                  icon-name="ytSm"-->
<!--                  mode="transparent"-->
<!--          />-->

          <Transition name="expand-width">
            <div v-if="moreLinks" class="section__actions overflow-hidden">
              <Button class="section__button button--social"
                      href="https://www.youtube.com/@nataljaray"
                      target="_blank"
                      isLabelHidden
                      label="YouTube канал"
                      icon-name="ytSm"
                      mode="transparent"
                      style="margin-inline: 2px;"
              />
              <Button class="section__button button--social"
                      href="https://www.instagram.com/natalja_ray/"
                      target="_blank"
                      isLabelHidden
                      label="Instagram"
                      icon-name="inst"
                      mode="transparent"
              />
              <Button class="section__button button--social"
                      href="https://www.facebook.com/natalja.ray/"
                      target="_blank"
                      isLabelHidden
                      label="Facebook"
                      icon-name="fb"
                      mode="transparent"
              />
            </div>
          </Transition>

          <Button class="section__button button--social"
                  isLabelHidden
                  :label="moreLinks ? 'Скрыть ссылки' : 'Больше ссылок'"
                  :title="moreLinks ? 'Скрыть ссылки' : 'Больше ссылок'"
                  icon-name="link"
                  mode="transparent"
                  @click="showMoreLinks"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
    import {computed, onMounted, ref} from "vue";

    definePageMeta({
        seo: {
            title: 'Natalja Ray | Музыка',
            description: 'Музыка Natalja Ray',
            image: '/NataljaRay.jpg' // из public/
            // noindex: true
        }
    });

    import Button from '@/components/common/Button.vue'
    import Album from '@/components/sections/Album.vue'
    import AlbumMin from '@/components/blocks/AlbumMin.vue'
    import { getMusicAlbums } from '@/data/music'

    const moreLinks = ref(false);
    const showMoreLinks = () => {
        moreLinks.value = !moreLinks.value
    }

    const isClient = ref(false)

    onMounted(() => {
        isClient.value = true
    })

    // mpbile check
    const device = useDevice()

    const isMobile = computed(() => device.value.isMobile)
    const isTablet = computed(() => device.value.isTablet)
    const isDesktop = computed(() => device.value.isDesktop)

    const albums = getMusicAlbums()
</script>

<style scoped>
  /* Transition для плавного изменения ширины */
  .expand-width-enter-active,
  .expand-width-leave-active {
    transition: all 0.5s ease;
  }

  .expand-width-enter-from,
  .expand-width-leave-to {
    max-width: 0;
    /*opacity: 0;*/
  }

  .expand-width-enter-to,
  .expand-width-leave-from {
    max-width: 300px; /* ширина в раскрытом состоянии */
    /*opacity: 1;*/
  }

  .overflow-hidden {
    overflow: hidden;
    display: inline-flex;
  }
</style>