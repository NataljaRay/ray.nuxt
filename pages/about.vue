<template>
  <section>
    <h1>Обо мне</h1>
<!--    <div>-->
<!--      <p>test: {{ test }}</p>-->
<!--      <p>count: {{ count }} → double: {{ double }}</p>-->
<!--      <button @click="inc">+</button>-->
<!--    </div>-->
  </section>
</template>

<script setup>
    definePageMeta({
        seo: {
            title: 'Natalja Ray | Обо мне',
            description: 'Музыка как голос. Книга как исповедь',
            image: '/NataljaRay.jpg' // из public/
            // noindex: true
        }
    });

    import { ref, computed, onMounted } from 'vue'

    const test = ref(true)         // data()
    const count = ref(0)

    const double = computed(() =>  // computed
        count.value * 2
    )

    function inc() {               // methods
        count.value++
    }

    onMounted(() => {              // mounted
        // console.log('mounted')
    })

    // defineOptions({
    //     test: true
    // })
</script>
<!--<script>-->
<!--    export default {-->
<!--        name: 'AboutPage',-->
<!--        head () {-->
<!--            return {-->
<!--                title: 'Обо мне — Ray',-->
<!--                meta: [{ hid: 'description', name: 'description', content: 'Описание обо мне' }]-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->
