import React from 'react'

import { ReactComponent as LogoIcon } from '../../assets/images/icons/logo.svg'
import styles from './Logotype.module.scss'
export default class Logotype extends React.Component {
   render() {
      return (
         <div className={styles.wrapper}>
            <LogoIcon className={styles.icon} />
            <div className={styles.logotype}>TravelPlanner</div>
         </div>
      )
   }
}
