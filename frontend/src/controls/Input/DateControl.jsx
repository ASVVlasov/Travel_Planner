import { Component } from 'react'
import PropTypes from 'prop-types'
import React from 'react'
import DatePicker from 'react-datepicker/es'
import styles from './Input.module.scss'
//import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
registerLocale('ru', ru)

export default class DateControl extends Component {
   static propTypes = {
      value: PropTypes.any.isRequired,
      onChange: PropTypes.func.isRequired,
      showTimeSelect: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
   }
   state = {
      selectedValue: this.props.value,
   }

   changeDate = (date) => {
      this.setState({ selectedValue: date })
      this.props.onChange({ name: this.props.name, value: date })
   }

   render() {
      const dateFormat = this.props.showTimeSelect
         ? 'dd.MM.yyyy HH:mm'
         : 'dd.MM.yyyy'
      return (
         <DatePicker
            className={styles.control__input}
            locale="ru"
            selected={this.state.selectedValue}
            onChange={this.changeDate}
            showTimeSelect={this.props.showTimeSelect}
            timeFormat="HH:mm"
            timeIntervals={5}
            timeCaption="Время"
            dateFormat={dateFormat}
            shouldCloseOnSelect={false}
         />
      )
   }
}
