import React from 'react'
import { Route } from 'react-router-dom'

import styles from './HomePage.module.scss'
import Slider from '../../components/Slider/Slider.jsx'
import { ReactComponent as Logo } from '../../assets/images/icons/logo.svg'
import Registration from '../../components/Registartion/Registration.jsx'

export default class HomePage extends React.Component {
   render() {
      const { match } = this.props
      return (
         <div className={styles.page}>
            <div className={styles.page__slider}>
               <Logo className={styles.page__logo} />
               <Slider />
            </div>
            <Route path={match.path} component={Registration} />
         </div>
      )
   }
}
