<template>
  <section>
    <h1>Обо мне</h1>
  </section>
</template>

<script>
    export default {
        name: 'AboutPage',
        head () {
            return {
                title: 'Обо мне — Ray',
                meta: [{ hid: 'description', name: 'description', content: 'Описание обо мне' }]
            }
        }
    }
</script>
