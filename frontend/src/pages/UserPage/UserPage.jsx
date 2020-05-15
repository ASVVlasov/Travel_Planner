import React from 'react'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

import styles from './UserPage.module.scss'

class TravelPage extends React.Component {
   render() {
      return (
         <div className={styles.userPage}>
            <div className={styles.userPage__headerWrap}></div>
            <div className={styles.userPage__boardWrap}></div>
            <div className={styles.userPage__footerWrap}></div>
         </div>
      )
   }
}

const mapStateToProps = ({}) => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TravelPage)
