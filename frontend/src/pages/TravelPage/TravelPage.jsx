import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { Route } from 'react-router-dom'
import { getTravel, getBudget } from '../../redux/travel/operations'

import styles from './TravelPage.module.scss'
import Header from '../../components/Header/Header'
import Board from '../../components/Board/Board'
import Footer from '../../components/Footer/Footer'
import Sidebar from '../../components/Sidebar/Sidebar'
import Loader from '../../controls/Loader/Loader'

class TravelPage extends React.Component {
   static propTypes = {
      getTravel: PropTypes.func.isRequired,
      travel: PropTypes.object.isRequired,
   }

   isPropsReceived = (object) => Object.keys(object).length

   componentDidMount() {
      this.props.getTravel(this.props.match.params.travelId)
      this.props.getBudget(this.props.match.params.travelId)
   }

   render() {
      const {
         match: { path },
         travel,
      } = this.props
      return (
         <>
            {this.isPropsReceived(travel) ? (
               <div className={styles.travelPage}>
                  <Header users={travel.users} />
                  <Route path={`${path}/:board/:tab`} component={Board} />
                  <Footer travelId={travel._id} />
                  <div className={styles.travelPage__sidebarWrap}>
                     <Route path={path} component={Sidebar} />
                  </div>
               </div>
            ) : (
               <Loader />
            )}
         </>
      )
   }
}

const mapStateToProps = ({ travelReducer }) => ({
   travel: travelReducer.travel,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getTravel, getBudget }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TravelPage)
