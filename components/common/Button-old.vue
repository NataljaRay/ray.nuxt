<template>
  <component
      :is="tag"
      v-bind="mergedProps"
      :class="classes"
      :title="title"
      :aria-label="title"
  >
    <CommonIcon
            v-if="iconName && iconPosition === 'before'"
            class="button__icon"
            :name="iconName"
    />

    <span v-if="!isLabelHidden" class="button__label">{{ label }}</span>
    <slot/>

    <CommonIcon
            v-if="iconName && iconPosition === 'after'"
            class="button__icon"
            :name="iconName"
    />
  </component>
</template>
<script setup>
    import { computed, resolveComponent, useAttrs } from 'vue'
    import CommonIcon from '@/components/common/Icon.vue'
    defineOptions({
        name: 'Button'
    })

    const props = defineProps({
        className: String,
        customClass: String,
        type: { type: String, default: 'button' },
        href: String,
        target: String,
        mode: { type: String, default: '' },
        color: { type: String, default: '' },
        label: String,
        isLabelHidden: { type: Boolean, default: false },
        iconName: String,
        iconPosition: { type: String, default: 'before' }
    })

    const attrs = useAttrs()

    const isLink = computed(() => !!props.href)
    const isInternal = computed(() => !!props.href && /^\/(?!\/)/.test(props.href))

    const tag = computed(() => {
        if (!isLink.value) return 'button'
        return isInternal.value ? resolveComponent('NuxtLink') : 'a'
    })

    const baseTagProps = computed(() => {
        if (!isLink.value) return { type: props.type }
        if (isInternal.value) return { to: props.href }
        return {
            href: props.href,
            target: props.target,
            rel: props.target === '_blank' ? 'noopener noreferrer' : undefined
        }
    })

    // один объект для v-bind (объединяем attrs и наши tagProps)
    // чтобы не дублировать то, что мы задаём явно ниже, выкинем из $attrs class/title/aria-label
    const mergedProps = computed(() => {
        const { class: _class, title: _title, 'aria-label': _aria, ...rest } = attrs
        return { ...rest, ...baseTagProps.value }
    })

    const title = computed(() => (props.isLabelHidden ? props.label : undefined))

    const classes = computed(() => ([
        props.className,
        'button',
        props.mode && `button--${props.mode}`,
        props.color && `button--${props.color}`,
        props.customClass
    ].filter(Boolean)))
</script>
<style src="@/assets/scss/components/button.scss" lang="scss"></style>
<style scoped>

</style>