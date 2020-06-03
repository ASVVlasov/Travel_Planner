import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import styles from './Slider.module.scss'

export default class Slider extends Component {
   render() {
      const params = {
         containerClass: styles['container'],
         wrapperClass: styles['wrapper'],
         slideClass: styles.slide,
         navigation: {
            prevEl: '.' + styles['button-prev'],
            nextEl: '.' + styles['button-next'],
         },
         pagination: {
            el: '.' + styles['pagination'],
            type: 'bullets',
            bulletClass: styles['bullet'],
            bulletActiveClass: styles['bullet_active'],
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
            <div className={styles['slide']}>
               <div className={styles['text-container']}>
                  <p className={styles['text-main']}>Запланируйте поездку:</p>
                  <p className={styles['text-secondary']}>
                     для себя или вместе с друзьями
                  </p>
               </div>
               <div className={styles['image1']}></div>
            </div>
            <div className={styles['slide']}>
               <div className={styles['text-container']}>
                  <p className={styles['text-main']}>
                     Соберите все документы в одном месте:
                  </p>
                  <p className={styles['text-secondary']}>
                     билеты и бронирования всегда будут под рукой
                  </p>
               </div>
               <div className={styles['image2']}></div>
            </div>
            <div className={styles['slide']}>
               <div className={styles['text-container']}>
                  <p className={styles['text-main']}>
                     В поездке останется наслаждаться
                  </p>
                  <p className={styles['text-main']}>новыми впечатлениями</p>
               </div>
               <div className={styles['image3']}></div>
            </div>
         </Swiper>
      )
   }
}
