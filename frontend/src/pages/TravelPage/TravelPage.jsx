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
import Alert from '../../controls/Alert/Alert'

class TravelPage extends React.Component {
   static propTypes = {
      getTravel: PropTypes.func.isRequired,
      travel: PropTypes.object.isRequired,
   }

   componentDidMount() {
      this.props.getTravel(this.props.match.params.travelId)
      this.props.getBudget(this.props.match.params.travelId)
   }

   render() {
      const {
         match: { path },
         travel,
         isTravelLoading,
         boardError,
         cardError,
         travelError,
         budgetError,
      } = this.props
      return (
         <>
            {!isTravelLoading ? (
               <div className={styles.travelPage}>
                  <Header users={travel.users} />
                  <Route path={`${path}/:board/:tab`} component={Board} />
                  <Footer travelId={travel._id} />
                  <div className={styles.travelPage__sidebarWrap}>
                     <Route path={path} component={Sidebar} />
                  </div>
               </div>
            ) : (
               <Loader type="big" />
            )}
            {boardError && boardError.type && (
               <Alert {...boardError} errName="boardError" />
            )}
            {cardError && cardError.type && (
               <Alert {...cardError} errName="cardError" />
            )}
            {travelError && travelError.type && (
               <Alert {...travelError} errName="travelError" />
            )}
            {budgetError && budgetError.type && (
               <Alert {...budgetError} errName="budgetError" />
            )}
         </>
      )
   }
}

const mapStateToProps = ({ travelReducer, fetchReducer }) => ({
   travel: travelReducer.travel,
   isTravelLoading: travelReducer.isTravelLoading,
   boardError: fetchReducer.boardError,
   cardError: fetchReducer.cardError,
   travelError: fetchReducer.travelError,
   budgetError: fetchReducer.budgetError,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getTravel, getBudget }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TravelPage)
