import React from 'react'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

import styles from './TravelPage.module.scss'
import Header from '../../components/Header/Header'
import Board from '../../components/Board/Board'
import Footer from '../../components/Footer/Footer'
import Sidebar from '../../components/Sidebar/Sidebar'

class TravelPage extends React.Component {
   render() {
      return (
         <div className={styles.travelPage}>
            <Header />
            <div className={styles.travelPage__boardWrap}>
               <Board />
            </div>
            <div className={styles.travelPage__footerWrap}>
               <Footer />
            </div>
            <div className={styles.travelPage__sidebarWrap}>
               <Sidebar />
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({}) => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TravelPage)
