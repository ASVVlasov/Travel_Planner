import React from 'react'

import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import styles from './TravelPage.module.scss'

class TravelPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}></div>
                <div className={styles.board}></div>
                <div className={styles["side-bar"]}></div>
                <div className={styles.footer}></div>
            </div>
        )
    }
}

const mapStateToProps = ({ }) => ({ })
const mapDespatchToProps = dispatch => bindActionCreators( { }, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(TravelPage) 