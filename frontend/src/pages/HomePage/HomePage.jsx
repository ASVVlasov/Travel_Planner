import React from 'react'
import { Route } from 'react-router-dom'

import styles from './HomePage.module.scss'
import Slider from '../../components/Slider/Slider.jsx'
import { ReactComponent as LogoIcon } from '../../assets/images/icons/logo.svg'
import Registration from '../../components/Registartion/Registration.jsx'

export default class HomePage extends React.Component {
   render() {
      const { match } = this.props
      return (
         <div className={styles['page-wrapper']}>
            <div className={styles['left-wrapper']}>
               <LogoIcon className={styles['icon']} />
               <Slider />
            </div>
            <Route path={match.path} component={Registration} />
         </div>
      )
   }
}
