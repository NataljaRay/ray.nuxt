export default {

    // scrollBehavior(to, from, savedPosition) {
    //     // если есть сохранённая позиция (назад/вперёд в браузере)
    //     if (savedPosition) {
    //         return savedPosition
    //     }
    //
    //     if (to.hash) {
    //         const el = document.querySelector(to.hash)
    //         if (el) {
    //             // вычисляем высоту шапки
    //             const header = document.querySelector('header')
    //             const offset = header ? header.offsetHeight : 40
    //
    //             // плавный скролл с учётом отступа
    //             window.scrollTo({
    //                 top: el.getBoundingClientRect().top + window.scrollY - offset,
    //                 behavior: 'smooth'
    //             })
    //         }
    //     }
    //
    //     // по умолчанию в начало
    //     return { top: 0 }
    // }

    // scrollBehavior(to, from, savedPosition) {
    //     // Назад/вперёд — восстановить позицию
    //     if (savedPosition) return { ...savedPosition, behavior: 'smooth' }
    //
    //     // Переход к якорю (#contacts)
    //     if (to.hash) {
    //         return { el: to.hash, behavior: 'smooth' }
    //     }
    //
    //     // По умолчанию — к началу
    //     return { top: 0, behavior: 'smooth' }
    // }
}

// export default {
//     scrollBehavior(to, from, savedPosition) {
//         // Назад/вперёд в браузере — восстановить позицию
//         if (savedPosition) return { ...savedPosition, behavior: 'smooth' }
//
//         // Переход к якорю (/#contacts)
//         if (to.hash) {
//             return {
//                 el: to.hash,                 // элемент по селектору
//                 behavior: 'smooth',          // плавная прокрутка
//                 offset: { top: 80 }          // отступ под фикс-хедер (поправь число)
//             }
//         }
//
//         // По умолчанию — к началу страницы
//         return { top: 0, behavior: 'smooth' }
//     }
// }