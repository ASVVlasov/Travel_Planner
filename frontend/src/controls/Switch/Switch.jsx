import React from 'react'
import styles from './switch.module.scss'

export default class Switch extends React.Component {
    render() {
        return (
            <label className={styles["footer-travel-page-switch__label"]}>
                <div className={styles["footer-travel-page-switch__toggle"]}>
                    <input className={styles["footer-travel-page-switch__toggle-state"]} type="checkbox" name="check" value="check" />
                    <div className={styles["footer-travel-page-switch__toggle-inner"]}>
                    <div className={styles["footer-travel-page-switch__indicator"]}></div>
                    </div>
                    <div className={styles["footer-travel-page-switch__active-bg"]}></div>
                </div>
                <div className={styles["footer-travel-page-switch__label-text"]}>то, что относится ко мне</div>
            </label>
        )
    }
}