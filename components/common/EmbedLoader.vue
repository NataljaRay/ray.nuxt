<template>
  <div
          v-if="show"
          class="embed-loader"
          :style="{
      '--loader-bg': bg,
      '--loader-size': size + 'px',
      '--loader-thick': thick + 'px',
      '--loader-color': color
    }"
  >
    <span class="spinner" />
    <p v-if="hint" class="hint">{{ hint }}</p>
  </div>
</template>

<script setup>
    const props = defineProps({
        show: { type: Boolean, default: false },
        /** Текст-подсказка под спиннером (опционально) */
        hint: { type: String, default: '' },
        /** Цвет подложки */
        bg: { type: String, default: 'rgba(255,255,255,1)' },
        /** Размер спиннера в px */
        size: { type: Number, default: 28 },
        /** Толщина линии */
        thick: { type: Number, default: 3 },
        /** Цвет активной дуги */
        color: { type: String, default: '#111' }
    })
</script>

<style scoped>
  .embed-loader{
    position:absolute; inset:0;
    display:flex; flex-direction:column;
    justify-content:center; align-items:center;
    background:var(--loader-bg);
    /*opacity: .7;*/
  }
  .spinner{
    width:var(--loader-size); height:var(--loader-size);
    border:var(--loader-thick) solid #ccc;
    border-top-color:var(--loader-color);
    border-radius:50%;
    animation:spin .8s linear infinite;
  }
  .hint{ margin-top:8px; font-size:.85rem; opacity:.75 }
  @keyframes spin{ to{ transform:rotate(360deg) } }
</style>
