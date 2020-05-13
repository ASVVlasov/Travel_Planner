import React from 'react'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { Route } from 'react-router-dom'

import styles from './TravelPage.module.scss'
import Header from '../../components/Header/Header'
import Board from '../../components/Board/Board'
import Footer from '../../components/Footer/Footer'
import Sidebar from '../../components/Sidebar/Sidebar'

class TravelPage extends React.Component {
   render() {
      const { path } = this.props.match
      return (
         <div className={styles.travelPage}>
            <Header />
            <Route path={`${path}/:board/:tab`} component={Board} />
            <Footer />
            <div className={styles.travelPage__sidebarWrap}>
               <Route path={path} component={Sidebar} />
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({}) => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TravelPage)
