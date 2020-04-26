import React from 'react'
import styles from './footer.module.scss'
import Switch from '../../controls/Switch/Switch.jsx'

export default class Footer extends React.Component {
    constructor() {
        super()
        this.state = {
            paid: '30000',
            toPay: '110000',
            totalBudget: '140000',
        }
    }
    render() {
        return (
            <footer className={styles["footer"]}>
                <Switch/>
                <div className={styles["footer__payment-info"]}>
                    <div className={styles["footer__paid"]}>
                        <div className={styles["footer__paid-value"]}>{ this.state.paid }</div>
                        <div className={styles["footer__paid-description"]}>Оплачено</div>
                    </div>
                    <div className={styles["footer__to-pay"]}>
                        <div className={styles["footer__to-pay-value"]}>{ this.state.toPay }</div>
                        <div className={styles["footer__to-pay-description"]}>К оплате</div>
                    </div>
                    <div className={styles["footer__total-budget"]}>
                        <div className={styles["footer__total-budget-value"]}>{ this.state.totalBudget }</div>
                        <div className={styles["footer__total-budget-description"]}>Общий бюджет</div>
                    </div>
                </div>
            </footer>
        )
    }
}