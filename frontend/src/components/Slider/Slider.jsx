import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import 'swiper/swiper.scss'
import './Slider.module.scss'
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
         //  autoplay: {
         //     delay: 2500,
         //     disableOnInteraction: true,
         //  },
      }
      return (
         <Swiper {...params}>
            <div className={styles['slide']}>
               <div className={styles['text']}>
                  <p>Запланируйте поездку:</p>
                  <p>для себя или вместе с друзьями</p>
               </div>
               <div className={styles['image1']}></div>
            </div>
            <div className={styles['slide']}>
               <div className={styles['text']}>
                  <p>Соберите все документы в одном месте:</p>
                  <p>билеты и бронирования всегда будут под рукой</p>
               </div>
               <div className={styles['image2']}></div>
            </div>
            <div className={styles['slide']}>
               <div className={styles['text']}>
                  <p>В поездке останется наслаждаться</p>
                  <p>новыми впечатлениями</p>
               </div>
               <div className={styles['image3']}></div>
            </div>
         </Swiper>
      )
   }
}
