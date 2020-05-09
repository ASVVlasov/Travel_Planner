import React from 'react'
import styles from './Calendar.module.scss'
import './Calendar.css'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import 'moment/locale/ru'

export default class Calendar extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         startDate: null,
         endDate: null,
         amountOfDays: 0,
      }
   }
   chengeAmountOfDays = (startDate, endDate) => {
      this.setState({ startDate, endDate })

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
                  this.chengeAmountOfDays(startDate, endDate)
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
