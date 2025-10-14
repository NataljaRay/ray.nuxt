// ~/composables/usePlayerManager.js
import { ref } from 'vue'

const registry = new Map()          // id -> { play: fn, stop: fn }
const current = ref(null)           // текущий id

export function usePlayerManager() {
    function register(id, controls) {
        if (!id) throw new Error('usePlayerManager.register: id required')
        registry.set(id, controls || {})
    }

    function unregister(id) {
        if (!id) return
        if (current.value === id) {
            stopCurrentSync() // синхронный стоп при удалении
            current.value = null
        }
        registry.delete(id)
    }

    // синхронная попытка остановить текущий (без ожидания promise)
    function stopCurrentSync() {
        const id = current.value
        if (!id) return
        const c = registry.get(id)
        try { c?.stop?.() } catch (e) { console.warn('stopCurrentSync error', e) }
    }

    // Асинхронно запросить воспроизведение: сначала остановим старый, затем вызовем play нового
    async function requestPlay(id) {
        if (!id) return
        if (current.value === id) {
            // уже играется — можно перезапустить или игнорировать
            return
        }

        const prev = current.value
        if (prev) {
            const prevControls = registry.get(prev)
            try {
                // если stop возвращает promise — дождёмся, иначе вызываем синхронно
                const r = prevControls?.stop?.()
                if (r instanceof Promise) await r
            } catch (e) {
                console.warn('Error stopping previous player', e)
            }
            // краткая задержка для безопасности (iframe reloads)
            await new Promise(resolve => setTimeout(resolve, 50))
        }

        const controls = registry.get(id)
        if (!controls) {
            console.warn('usePlayerManager: no controls for', id)
            current.value = null
            return
        }

        current.value = id
        try {
            const r = controls.play?.()
            if (r instanceof Promise) await r
        } catch (e) {
            console.error('play failed', e)
            // откат current
            if (current.value === id) current.value = null
        }
    }

    function stopCurrent() {
        const id = current.value
        if (!id) return
        const c = registry.get(id)
        try { c?.stop?.() } catch (e) { console.warn(e) }
        current.value = null
    }

    return { register, unregister, requestPlay, stopCurrent, current }
}



// // ~/composables/usePlayerManager.js
// import { ref } from 'vue'
//
// // Module-level singletons -> все импорты получают один менеджер
// const registry = Object.create(null) // { id: { play: fn, stop: fn } }
// const current = ref(null)
//
// export function usePlayerManager() {
//     function register(id, controls) {
//         if (!id) throw new Error('register: id required')
//         registry[id] = controls || {}
//     }
//
//     function unregister(id) {
//         if (!id) return
//         if (current.value === id) stopCurrent()
//         delete registry[id]
//     }
//
//     async function requestPlay(id) {
//         if (!id) return
//         // if same id requested and already current, ignore or restart
//         if (current.value === id) {
//             // optionally restart: registry[id]?.stop?.(); await registry[id]?.play?.()
//             return
//         }
//         // stop previous
//         if (current.value && registry[current.value]?.stop) {
//             try { registry[current.value].stop() } catch (e) { console.warn(e) }
//         }
//         // set current
//         current.value = id
//         // start new
//         try {
//             await registry[id]?.play?.()
//         } catch (e) {
//             // если play() завершился ошибкой — сбросим current
//             console.error('play failed', e)
//             if (current.value === id) current.value = null
//         }
//     }
//
//     function stopCurrent() {
//         const id = current.value
//         if (!id) return
//         try { registry[id]?.stop?.() } catch (e) { console.warn(e) }
//         current.value = null
//     }
//
//     return { register, unregister, requestPlay, stopCurrent, current }
// }
