import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { Route } from 'react-router-dom'
import { getTravel } from '../../redux/travel/operations'

import styles from './HomePage.module.scss'
import Slider from '../../components/Slider/Slider.jsx'

class HomePage extends React.Component {
   static propTypes = {
      getTravel: PropTypes.func.isRequired,
      travel: PropTypes.object.isRequired,
   }

   componentDidMount() {}
   render() {
      return (
         <div className={styles.wrapper}>
            <Slider />
            <div className={styles.homePage__registration}>b</div>
         </div>
      )
   }
}
const mapStateToProps = ({ travelReducer }) => ({
   travel: travelReducer.travel,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getTravel }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
