import React from 'react'
import PropTypes from 'prop-types'
import styles from './Calendar.module.scss'
import './Calendar.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getTravelDate } from '../../redux/actions/header.actions'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import 'moment/locale/ru'

export class Calendar extends React.Component {
   static propTypes = {
      getTravelDate: PropTypes.func.isRequired,
   }
   constructor(props) {
      super(props)
      this.state = {
         startDate: null,
         endDate: null,
         amountOfDays: 0,
      }
   }
   componentWillMount = () => {
      this.props.getTravelDate() //action
      let convertedBeginDate = moment(this.props.beginDate)
      let convertedEndDate = moment(this.props.endDate)

      this.setDateCalendar(convertedBeginDate, convertedEndDate)
      this.chengeAmountOfDays(convertedBeginDate, convertedEndDate)
   }

   setDateCalendar = (startDate, endDate) => {
      this.setState({ startDate, endDate })
      this.chengeAmountOfDays(startDate, endDate)
   }

   chengeAmountOfDays = (startDate, endDate) => {
      let countDays = 0
      for (let i = startDate; i <= endDate; i = i + 24 * 60 * 60 * 1000) {
         countDays++
      }
      this.setState({
         amountOfDays: countDays,
      })
   }
   render() {
      return (
         <div className={styles.calendar}>
            <DateRangePicker
               startDate={this.state.startDate} // momentPropTypes.momentObj or null,
               startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
               endDate={this.state.endDate} // momentPropTypes.momentObj or null,
               endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
               onDatesChange={({ startDate, endDate }) =>
                  this.setDateCalendar(startDate, endDate)
               } //this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
               focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
               onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
               displayFormat="DD.MM.YYYY"
               startDatePlaceholderText="дд.мм.гггг"
               endDatePlaceholderText="дд.мм.гггг"
            />
            <div className={styles.calendar__amountOfDays}>
               | {this.state.amountOfDays} дней
            </div>
         </div>
      )
   }
}
const mapStateToProps = ({ headerReducer }) => ({
   travelId: headerReducer.travelId, // TODO delete after real ID appear in route
   beginDate: headerReducer.beginDate,
   endDate: headerReducer.endDate,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getTravelDate }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
