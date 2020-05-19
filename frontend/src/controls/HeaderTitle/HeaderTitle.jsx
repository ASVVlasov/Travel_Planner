import React from 'react'
import PropTypes from 'prop-types'
import styles from './HeaderTitle.module.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeTravelTitle } from '../../redux/travel/operations'

import { ReactComponent as EditBtnSVG } from '../../assets/images/icons/pencil.svg'

export class HeaderTitle extends React.Component {
   static propTypes = {
      travelId: PropTypes.string,
      title: PropTypes.string,
   }
   constructor(props) {
      super(props)
      this.state = {
         value: '',
         isInEditMode: false,
         inputSize: '',
      }
   }

   changeEditMode = () => {
      this.setState({
         isInEditMode: !this.state.isInEditMode,
      })
   }
   updateComponentValue = () => {
      const { travelId } = this.props
      this.props.changeTravelTitle({
         _id: travelId,
         title: this.refs.theTextInput.value,
      })
      this.setState({
         isInEditMode: false,
         value: this.refs.theTextInput.value,
      })
   }
   handleKeyUp = (evt) => {
      if (evt.keyCode === 13) {
         this.updateComponentValue()
      }
   }
   inputChange = (evt) => {
      this.setState({
         value: this.refs.theTextInput.value,
      })
      if (evt.target.value.length >= 29) {
         this.setState({
            inputSize: evt.target.value.length + 3,
         })
      } else {
         this.setState({
            inputSize: evt.target.value.length + 2,
         })
      }
   }

   componentDidMount = () => {
      this.setState({
         value: this.props.title,
         inputSize: this.props.title.length,
      })
   }

   renderEditView = () => {
      const { title } = this.props
      const inputSize = title.length
      return (
         <div
            className={styles.headerTitle_EditView}
            onKeyUp={this.handleKeyUp}
         >
            <input
               className={styles.headerTitle__input}
               type="text"
               value={this.state.value || title}
               ref="theTextInput"
               onBlur={this.updateComponentValue}
               onKeyUp={this.handleKeyUp}
               autoFocus
               maxLength="30"
               size={inputSize > 5 ? inputSize : 5}
               onChange={this.inputChange}
            ></input>
            <div className={styles.headerTitle__editIcon}>
               <EditBtnSVG />
            </div>
         </div>
      )
   }
   renderDefauitView = () => {
      const { title } = this.props

      return (
         <div
            className={styles.headerTitle_DefauitView}
            onClick={this.changeEditMode}
         >
            <div className={styles.headerTitle__value}>
               {this.state.value || title}
            </div>
            <div className={styles.headerTitle__editIcon}>
               <EditBtnSVG />
            </div>
         </div>
      )
   }
   render() {
      return this.state.isInEditMode
         ? this.renderEditView()
         : this.renderDefauitView()
   }
}

const mapStateToProps = ({ travelReducer }) => ({
   travelId: travelReducer.travelId,
   title: travelReducer.title,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ changeTravelTitle }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTitle)
