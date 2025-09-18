<template>
  <!-- 1) Кнопка -->
  <button
          v-if="!isLink"
          v-bind="attrsFiltered"
          :type="type"
          :class="[classes, externalClass]"
          :title="a11yTitle"
          :aria-label="a11yTitle"
  >
    <CommonIcon
            v-if="iconName && iconPosition === 'before'"
            class="button__icon"
            :name="iconName"
    />
    <span v-if="!isLabelHidden" class="button__label">{{ label }}</span>
    <slot />
    <CommonIcon
            v-if="iconName && iconPosition === 'after'"
            class="button__icon"
            :name="iconName"
    />
  </button>

  <!-- 2) Внутренняя ссылка -->
  <NuxtLink
          v-else-if="isInternal"
          v-bind="attrsFiltered"
          :to="href"
          :class="[classes, externalClass]"
          :title="a11yTitle"
          :aria-label="a11yTitle"
  >
    <CommonIcon
            v-if="iconName && iconPosition === 'before'"
            class="button__icon"
            :name="iconName"
    />
    <span v-if="!isLabelHidden" class="button__label">{{ label }}</span>
    <slot />
    <CommonIcon
            v-if="iconName && iconPosition === 'after'"
            class="button__icon"
            :name="iconName"
    />
  </NuxtLink>

  <!-- 3) Внешняя ссылка -->
  <a
          v-else
          v-bind="attrsFiltered"
          :href="href"
          :target="target"
          :rel="linkRel"
          :class="[classes, externalClass]"
          :title="a11yTitle"
          :aria-label="a11yTitle"
  >
    <CommonIcon
            v-if="iconName && iconPosition === 'before'"
            class="button__icon"
            :name="iconName"
    />
    <span v-if="!isLabelHidden" class="button__label">{{ label }}</span>
    <slot />
    <CommonIcon
            v-if="iconName && iconPosition === 'after'"
            class="button__icon"
            :name="iconName"
    />
  </a>
</template>

<script setup>
    import { computed, useAttrs } from 'vue'
    import CommonIcon from '@/components/common/Icon.vue'

    defineOptions({
        name: 'Button',
        inheritAttrs: false, // сами контролируем, что прокидывать на корневой тег
    })

    const props = defineProps({
        className: String,
        customClass: String,
        type: { type: String, default: 'button' }, // для <button>
        href: String,
        target: String,
        mode: { type: String, default: '' },
        color: { type: String, default: '' },
        label: String,
        isLabelHidden: { type: Boolean, default: false },
        iconName: String,
        iconPosition: { type: String, default: 'before' },
    })

    const attrs = useAttrs()

    const isLink = computed(() => !!props.href)
    const isInternal = computed(() => !!props.href && /^\/(?!\/)/.test(props.href))

    const externalClass = computed(() => attrs.class)

    // Не даём пользователю перезаписать class/title/aria-label/type/to/href/rel/target
    const attrsFiltered = computed(() => {
        const {
            class: _c,
            title: _t,
            to: _to,
            href: _href,
            rel: _rel,
            target: _target,
            type: _type,
            'aria-label': _a,
            ...rest
        } = attrs
        return rest
    })

    const classes = computed(() => ([
        props.className,
        'button',
        props.mode && `button--${props.mode}`,
        props.color && `button--${props.color}`,
        props.customClass,
    ].filter(Boolean)))

    const a11yTitle = computed(() => (props.isLabelHidden ? props.label : undefined))

    const linkRel = computed(() => (
        props.target === '_blank' ? 'noopener noreferrer' : undefined
    ))
</script>

<style src="@/assets/scss/components/button.scss" lang="scss"></style>
