import { Component } from 'react'
import PropTypes from 'prop-types'
import React from 'react'
import connect from 'react-redux/es/connect/connect'
import DatePicker from 'react-datepicker/es'
import styles from './Input.module.scss'
//import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
registerLocale('ru', ru)

export class DateControl extends Component {
   static propTypes = {
      value: PropTypes.any.isRequired,
      onChange: PropTypes.func.isRequired,
      showTimeSelect: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
   }
   state = {
      value: this.props.value,
   }

   changeDate = (date) => {
      this.setState({ value: date })
      this.props.onChange({ name: this.props.name, value: date })
   }

   componentDidMount() {
      this.setState({ value: this.props.value })
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.value !== this.props.value) {
         this.setState({ value: this.props.value })
      }
   }

   render() {
      const dateFormat = this.props.showTimeSelect
         ? 'dd.MM.yyyy HH:mm'
         : 'dd.MM.yyyy'

      let limitDates = this.props.showTimeSelect //boolean

      let startDateTravel = new Date()
      let endDateTravel = null

      if (limitDates) {
         startDateTravel = Date.parse(this.props.travel.beginDate)
         endDateTravel = Date.parse(this.props.travel.endDate)
      }

      return (
         <DatePicker
            className={styles.control__input}
            locale="ru"
            placeholderText="дд.мм.гггг"
            selected={this.state.value}
            onChange={this.changeDate}
            showTimeSelect={this.props.showTimeSelect}
            timeFormat="HH:mm"
            timeIntervals={5}
            timeCaption="Время"
            dateFormat={dateFormat}
            shouldCloseOnSelect={false}
            minDate={
               startDateTravel < new Date() ? new Date() : startDateTravel
            }
            maxDate={endDateTravel}
         />
      )
   }
}
const mapStateToProps = ({ travelReducer }) => ({
   travel: travelReducer.travel,
})
export default connect(mapStateToProps, null)(DateControl)
