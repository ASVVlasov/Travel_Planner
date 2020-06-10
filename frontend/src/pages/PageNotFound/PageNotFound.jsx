import React from 'react'
import { history } from '../../redux/store'

import styles from './PageNotFound.module.scss'
import Button from '../../controls/Button/Button'
import { ReactComponent as Picture } from '../../assets/images/404page.svg'

export default class PageNotFound extends React.Component {
   render() {
      return (
         <div className={styles.pageNotFound}>
            <div className={styles.pageNotFound__content}>
               <div className={styles.pageNotFound__description}>
                  <p>Кажется, мы потерялись...</p>
                  <p>Такой страницы здесь нет :(</p>
                  <Button
                     type="action"
                     text="Вернуться назад"
                     onClick={history.goBack}
                  />
               </div>
            </div>
            <div className={styles.pageNotFound__picture}>
               <Picture />
            </div>
         </div>
      )
   }
}
