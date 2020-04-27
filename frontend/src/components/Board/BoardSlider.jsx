import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Swiper from 'react-id-swiper'
import 'swiper/swiper.scss'
import './BoardSlider.scss'

export default class BoardSlider extends Component {
   static propTypes = {
      slides: PropTypes.array.isRequired,
   }

   render() {
      const params = {
         shouldSwiperUpdate: true,
         watchOverflow: true,
         slidesPerView: 'auto',
         spaceBetween: 25,
         slidesOffsetBefore: 120,
         slidesOffsetAfter: 120,
         navigation: {
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev',
         },
         keyboard: {
            enabled: true,
            onlyInViewport: false,
         },
         children: this.props.slides,
      }

      return <Swiper { ...params }/>
   }
}