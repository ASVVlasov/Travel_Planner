import React, { createRef } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeTravel } from '../../redux/travel/operations'

import styles from './HeaderTitle.module.scss'
import { ReactComponent as EditBtnSVG } from '../../assets/images/icons/pencil.svg'

export class HeaderTitle extends React.Component {
   static propTypes = {
      travel: PropTypes.object.isRequired,
      changeTravel: PropTypes.func.isRequired,
   }
   constructor(props) {
      super(props)
      this.state = {
         value: '',
         inputSize: '',
         isInEditMode: false,
      }
   }

   headerInput = createRef()

   onFocusInput = (input) => {
      input.focus()
   }
   offFocusInput = (input) => {
      input.blur()
   }

   handleKeyUp = (evt, value) => {
      if (evt.keyCode === 13) {
         this.updateComponentValue(value)
         this.offFocusInput(this.headerInput.current)
      }
   }

   updateComponentValue = (newValue) => {
      const travel = { ...this.props.travel }
      travel.title = newValue
      this.props.changeTravel(travel)
   }

   handleChange = (event) => {
      this.setState({
         value: event.target.value,
         isInEditMode: true,
      })

      if (event.target.value.length >= 29) {
         this.setState({
            inputSize: event.target.value.length + 2,
         })
      } else {
         this.setState({
            inputSize: event.target.value.length + 1,
         })
      }
   }

   render() {
      const title =
         this.props.travel.title.length <= 80
            ? this.props.travel.title
            : this.props.travel.title.substring(0, 77) + '...'
      let inputSize = 5
      if (title) {
         inputSize = this.state.inputSize || title.length
      }
      return (
         <div className={styles.headerTitle}>
            <input
               className={styles.headerTitle__input}
               type="text"
               value={this.state.isInEditMode ? this.state.value : title}
               ref={this.headerInput}
               maxLength="80"
               size={inputSize > 5 ? inputSize : 5}
               onKeyUp={(e) => this.handleKeyUp(e, e.target.value)}
               onChange={(e) => this.handleChange(e)}
               onBlur={(e) => this.updateComponentValue(e.target.value)}
            ></input>

            <div className={styles.headerTitle__editIcon}>
               <EditBtnSVG
                  onClick={() => this.onFocusInput(this.headerInput.current)}
               />
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ travelReducer }) => ({
   travel: travelReducer.travel,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ changeTravel }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTitle)
