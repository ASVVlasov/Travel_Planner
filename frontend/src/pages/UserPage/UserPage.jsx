import React from 'react'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { Route } from 'react-router-dom'

import styles from './UserPage.module.scss'
import Header from '../../components/Header/Header'
import Board from '../../components/Board/Board'
import Footer from '../../components/Footer/Footer'

class UserPage extends React.Component {
   render() {
      const { path } = this.props.match
      return (
         <div className={styles.userPage}>
            <Header />
            <Route path={`${path}/:board/:tab`} component={Board} />
            <Footer />
         </div>
      )
   }
}

const mapStateToProps = ({}) => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
