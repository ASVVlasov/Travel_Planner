import React from 'react'
import styles from './Sidebar.module.scss'

import { ReactComponent as TransportBtnSVG } from './images/transportBtn.svg';
import { ReactComponent as AccomodationBtnSVG } from './images/accomodationBtn.svg';
import { ReactComponent as EntertainmentBtnSVG } from './images/entertainmentBtn.svg';
import { ReactComponent as ToDoBtnSVG } from './images/toDoBtn.svg';

export default class Sidebar extends React.Component {
    render() {
        return (
            <div className={styles.sidebar}>
                <div><TransportBtnSVG /></div>
                <div><AccomodationBtnSVG /></div>
                <div><EntertainmentBtnSVG /></div>
                <div><ToDoBtnSVG /></div>
            </div>
        )
    }
}