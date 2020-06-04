import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import styles from './Slider.module.scss'

export default class Slider extends Component {
   render() {
      const params = {
         containerClass: styles.container,
         wrapperClass: styles.wrapper,
         slideClass: styles.slide,
         navigation: {
            prevEl: '.' + styles.button__prev,
            nextEl: '.' + styles.button__next,
         },
         pagination: {
            el: '.' + styles.pagination,
            type: 'bullets',
            bulletClass: styles.pagination__bullet,
            bulletActiveClass: styles.pagination__bullet_active,
            clickable: true,
         },
         keyboard: {
            enabled: true,
            onlyInViewport: false,
         },
         loop: true,
      }
      return (
         <Swiper {...params}>
            <div className={styles.slide}>
               <div className={styles.slide__textContainer}>
                  <p className={styles.slide__text_main}>
                     Запланируйте поездку:
                  </p>
                  <p className={styles.slide__text_secondary}>
                     для себя или вместе с друзьями
                  </p>
               </div>
               <div className={styles.slide__image_1}></div>
            </div>
            <div className={styles.slide}>
               <div className={styles.slide__textContainer}>
                  <p className={styles.slide__text_main}>
                     Соберите все документы в одном месте:
                  </p>
                  <p className={styles.slide__text_secondary}>
                     билеты и бронирования всегда будут под рукой
                  </p>
               </div>
               <div className={styles.slide__image_2}></div>
            </div>
            <div className={styles.slide}>
               <div className={styles.slide__textContainer}>
                  <p className={styles.slide__text_main}>
                     В поездке останется наслаждаться
                  </p>
                  <p className={styles.slide__text_main}>
                     новыми впечатлениями
                  </p>
               </div>
               <div className={styles.slide__image_3}></div>
            </div>
         </Swiper>
      )
   }
}
