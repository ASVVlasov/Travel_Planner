import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Swiper from 'react-id-swiper'
import 'swiper/swiper.scss'

export default class BoardSlider extends Component {
   static propTypes = {
      slides: PropTypes.array.isRequired,
   }

   render() {
      const params = {
         slidesPerView: 3,
         spaceBetween: 25,
         freeMode: true,
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
         shouldSwiperUpdate: true,
         children: this.props.slides,
      }

      return <Swiper { ...params }/>
   }
}