<template>
  <!-- 1) Кнопка -->
  <button
          v-if="!isLink"
          v-bind="attrsFiltered"
          :type="type"
          :class="[classes, externalClass]"
          :title="titleAttr"
          :aria-label="computedAriaLabel"
  >
    <CommonIcon
            v-if="iconName && iconPosition === 'before'"
            class="button__icon"
            :name="iconName"
            aria-hidden="true"
            focusable="false"
    />
    <span v-if="showVisibleLabel" class="button__label">{{ label }}</span>
    <slot />
    <span v-if="srText" class="sr-only">{{ srText }}</span>
    <CommonIcon
            v-if="iconName && iconPosition === 'after'"
            class="button__icon"
            :name="iconName"
            aria-hidden="true"
            focusable="false"
    />
  </button>

  <!-- 2) Внутренняя ссылка -->
  <NuxtLink
          v-else-if="isInternal"
          v-bind="attrsFiltered"
          :to="href"
          :class="[classes, externalClass]"
          :title="titleAttr"
          :aria-label="computedAriaLabel"
  >
    <CommonIcon
            v-if="iconName && iconPosition === 'before'"
            class="button__icon"
            :name="iconName"
            aria-hidden="true"
            focusable="false"
    />
    <span v-if="showVisibleLabel" class="button__label">{{ label }}</span>
    <slot />
    <span v-if="srText" class="sr-only">{{ srText }}</span>
    <CommonIcon
            v-if="iconName && iconPosition === 'after'"
            class="button__icon"
            :name="iconName"
            aria-hidden="true"
            focusable="false"
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
          :title="titleAttr"
          :aria-label="computedAriaLabel"
  >
    <CommonIcon
            v-if="iconName && iconPosition === 'before'"
            class="button__icon"
            :name="iconName"
            aria-hidden="true"
            focusable="false"
    />
    <span v-if="showVisibleLabel" class="button__label">{{ label }}</span>
    <slot />
    <span v-if="srText" class="sr-only">{{ srText }}</span>
    <CommonIcon
            v-if="iconName && iconPosition === 'after'"
            class="button__icon"
            :name="iconName"
            aria-hidden="true"
            focusable="false"
    />
  </a>
</template>

<script setup>
    import { computed, useAttrs } from 'vue'
    import CommonIcon from '@/components/common/Icon.vue'

    defineOptions({ name: 'Button', inheritAttrs: false })

    const props = defineProps({
        className: String,
        customClass: String,
        type: { type: String, default: 'button' }, // только для <button>
        href: String,
        target: String,
        mode: { type: String, default: '' },
        color: { type: String, default: '' },
        label: String,                // видимая метка (если не скрыта)
        isLabelHidden: { type: Boolean, default: false },
        iconName: String,
        iconPosition: { type: String, default: 'before' },
        ariaLabel: String             // НОВОЕ: доступное имя для «иконка-только»
    })

    const attrs = useAttrs()

    const isLink = computed(() => !!props.href)
    const isInternal = computed(() => !!props.href && /^\/(?!\/)/.test(props.href))
    const externalClass = computed(() => attrs.class)

    // запрещаем перезапись критичных атрибутов снаружи
    const attrsFiltered = computed(() => {
        const { class: _c, title: _t, to: _to, href: _href, rel: _rel, target: _target, type: _type, 'aria-label': _a, ...rest } = attrs
        return rest
    })

    const classes = computed(() => ([
        props.className,
        'button',
        props.mode && `button--${props.mode}`,
        props.color && `button--${props.color}`,
        props.customClass,
    ].filter(Boolean)))

    // Есть ли видимая текстовая метка
    const showVisibleLabel = computed(() => !!props.label && !props.isLabelHidden)

    // sr-only текст (внутри ссылки/кнопки)
    const srText = computed(() => {
        // если скрываем label — используем его как скрытый текст
        if (props.label && props.isLabelHidden) return props.label
        // если метки нет, но передали ariaLabel — используем её
        if (!props.label && props.ariaLabel) return props.ariaLabel
        return ''
    })

    // aria-label на корневом элементе:
    // - если есть видимая метка — НЕ задаём (чтобы не перекрывать доступное имя)
    // - иначе используем ariaLabel или скрываемый label
    const computedAriaLabel = computed(() => {
        if (showVisibleLabel.value) return undefined
        return props.ariaLabel || (props.isLabelHidden ? props.label : undefined)
    })

    // title показывает подсказку, но НЕ является доступным именем — оставим необязательным
    const titleAttr = computed(() => undefined)

    const linkRel = computed(() => (props.target === '_blank' ? 'noopener noreferrer' : undefined))
</script>

<style src="@/assets/scss/components/button.scss" lang="scss"></style>
