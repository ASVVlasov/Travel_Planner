import React from 'react'
import styles from './footer.module.scss'
import Switch from '../../controls/Switch/Switch.jsx'

export default class Footer extends React.Component {
   constructor() {
      super()
      this.state = {
         paid: '30000 Р',
         toPay: '110000 Р',
         totalBudget: '140000 Р',
         checked: false,
      }
   }
   render() {
      return (
         <footer className={styles.footer}>
            <div className={styles.footer__switch}>
               <Switch
                  labelText="то, что относится ко мне"
                  checked={this.state.checked}
                  onChange={(value) => this.setState({ checked: value })}
               />
            </div>
            <div className={styles.footer__paymentInfo}>
               <div className={styles.footer__paid}>
                  <div className={styles.footer__paidValue}>
                     {this.state.paid}
                  </div>
                  <div className={styles.footer__paidDescription}>Оплачено</div>
               </div>
               <div className={styles.footer__toPay}>
                  <div className={styles.footer__toPayValue}>
                     {this.state.toPay}
                  </div>
                  <div className={styles.footer__toPayDescription}>
                     К оплате
                  </div>
               </div>
               <div className={styles.footer__totalBudget}>
                  <div className={styles.footer__totalBudgetValue}>
                     {this.state.totalBudget}
                  </div>
                  <div className={styles.footer__totalBudgetDescription}>
                     Общий бюджет
                  </div>
               </div>
            </div>
         </footer>
      )
   }
}
