import React from 'react'
import PropTypes from 'prop-types'
import styles from './Calendar.module.scss'
import './Calendar.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeTravelDate } from '../../redux/header/actions'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import 'moment/locale/ru'

export class Calendar extends React.Component {
   static propTypes = {
      beginDate: PropTypes.string,
      endDate: PropTypes.string,
   }
   constructor(props) {
      super(props)
      this.state = {
         startDate: null,
         endDate: null,
         amountOfDays: 0,
      }
   }

   setDateCalendar = (startDate, endDate) => {
      this.props.changeTravelDate(
         startDate ? startDate.toISOString() : startDate,
         endDate ? endDate.toISOString() : endDate
      )
   }

   render() {
      console.log('renderthis.propsRALENDAR', this.props)
      let convertedBeginDate = this.props.beginDate
         ? moment(this.props.beginDate)
         : this.props.beginDate

      let convertedEndDate = this.props.endDate
         ? moment(this.props.endDate)
         : this.props.endDate
      let amountOfDays = 0
      for (
         let i = convertedBeginDate;
         i <= convertedEndDate;
         i = i + 24 * 60 * 60 * 1000
      ) {
         amountOfDays++
      }

      return (
         <div className={styles.calendar}>
            <DateRangePicker
               startDate={convertedBeginDate} // momentPropTypes.momentObj or null,
               startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
               endDate={convertedEndDate} // momentPropTypes.momentObj or null,
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
               | {amountOfDays} дней
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ headerReducer }) => ({
   beginDate: headerReducer.beginDate,
   endDate: headerReducer.endDate,
})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ changeTravelDate }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
