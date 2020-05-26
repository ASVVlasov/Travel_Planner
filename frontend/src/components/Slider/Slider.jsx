import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import 'swiper/swiper.scss'
import './Slider.module.scss'
import styles from './Slider.module.scss'
import Logotype from './Logotype.jsx'

export default class Slider extends Component {
   render() {
      const params = {
         containerClass: styles['slider-container'],
         wrapperClass: styles['slider-wrapper'],
         slideClass: styles.slide,
         navigation: {
            prevEl: '.' + styles['slider-button-prev'],
            nextEl: '.' + styles['slider-button-next'],
         },
         pagination: {
            el: '.' + styles['slider-pagination'],
            type: 'bullets',
            bulletClass: styles['slider-bullet'],
            bulletActiveClass: styles['slider-bullet_active'],
            clickable: true,
         },
         keyboard: {
            enabled: true,
            onlyInViewport: false,
         },
         autoplay: {
            delay: 2500,
            disableOnInteraction: true,
         },
      }
      return (
         <div className={styles.wrapper}>
            <Logotype />
            <Swiper {...params}>
               <div className={styles.slide}>
                  <div className={styles['slide-text']}>
                     <p>Запланируйте поездку:</p>
                     <p>для себя или вместе с друзьями</p>
                  </div>
                  <div className={styles['slide-image1']}></div>
               </div>
               <div className={styles.slide}>
                  <div className={styles['slide-text']}>
                     <p>Соберите все документы в одном месте:</p>
                     <p>билеты и бронирования всегда будут под рукой</p>
                  </div>
                  <div className={styles['slide-image2']}></div>
               </div>
               <div className={styles.slide}>
                  <div className={styles['slide-text']}>
                     <p>В поездке останется наслаждаться</p>
                     <p>новыми впечатлениями</p>
                  </div>
                  <div className={styles['slide-image3']}></div>
               </div>
            </Swiper>
         </div>
      )
   }
}
