import React from 'react'
import PropTypes from 'prop-types'
import styles from './Calendar.module.scss'
import './Calendar.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getTravel, changeTravel } from '../../redux/travel/operations'
import { changeTravelLocal } from '../../redux/travel/actions' //TODO remove changeTravelLocal

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import 'moment/locale/ru'

import { ReactComponent as EditBtnSVG } from '../../assets/images/icons/pencil.svg'

export class Calendar extends React.Component {
   static propTypes = {
      travel: PropTypes.object.isRequired,
      changeTravel: PropTypes.func.isRequired,
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
      const travel = { ...this.props.travel }

      travel.beginDate = startDate ? startDate.toISOString() : startDate
      travel.endDate = endDate ? endDate.toISOString() : endDate

      this.props.changeTravelLocal(travel) //TODO remove changeTravelLocal
      this.props.changeTravel(travel)
      this.setState({ startDate, endDate })
   }

   componentDidMount = async () => {
      await this.props.getTravel(this.props.travel._id)
      const stringBeginDate = this.props.travel.beginDate
      const stringEndDate = this.props.travel.endDate

      this.setState({
         startDate: stringBeginDate ? moment(stringBeginDate) : stringBeginDate,
         endDate: stringEndDate ? moment(stringEndDate) : stringEndDate,
      })
   }

   render() {
      const stringBeginDate = this.props.travel.beginDate
      const stringEndDate = this.props.travel.endDate

      const convertedBeginDate = stringBeginDate
         ? moment(stringBeginDate)
         : stringBeginDate

      const convertedEndDate = stringEndDate
         ? moment(stringEndDate)
         : stringEndDate

      let amountOfDays = 0
      if (convertedBeginDate && convertedEndDate) {
         for (
            let i = convertedBeginDate;
            i <= convertedEndDate;
            i = i + 24 * 60 * 60 * 1000
         ) {
            amountOfDays++
         }
      }

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
               customInputIcon={
                  <EditBtnSVG className={styles.calendar__editIcon} />
               }
            />
            <div className={styles.calendar__amountOfDays}>
               | <span>{amountOfDays}</span> дней
            </div>
         </div>
      )
   }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getTravel, changeTravel, changeTravelLocal }, dispatch) //TODO remove changeTravelLocal

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
