<template>
  <div>
    <Button v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            isLabelHidden
            mode="transparent"
            :icon-name="link.label"
            :class="buttonCustomClass"
            :ariaLabel="link.label"
            class="button--social"
    />
  </div>
</template>

<script>
    import Button from '@/components/common/Button.vue'

    export default {
        name: "SocialLinks",
        components: { Button },
        props: ['buttonCustomClass'],
        data: () =>  ({
            socialLinks: [
                {label: 'vk', href: 'https://vk.com/natalja_ray'},
                {label: 'tg', href: 'https://t.me/NataljaRay'},
                // {label: 'link', href: '/'},
            ]
        })
    }
</script>

<style scoped>

</style>