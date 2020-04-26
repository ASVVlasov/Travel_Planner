import React from 'react'
import styles from './switch.module.scss'

export default class Switch extends React.Component {
    render() {
        return (
            <label className={styles.switch__label}>
                <div className={styles.switch__toggle}>
                    <input className={styles.switch__toggleState} type="checkbox" name="check" value="check" />
                    <div className={styles.switch__toggleInner}>
                    <div className={styles.switch__indicator}></div>
                    </div>
                    <div className={styles.switch__activeBg}></div>
                </div>
                <div className={styles.switch__labelText}>то, что относится ко мне</div>
            </label>
        )
    }
}