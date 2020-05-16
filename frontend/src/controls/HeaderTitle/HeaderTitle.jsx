import React from 'react'
import PropTypes from 'prop-types'
import styles from './HeaderTitle.module.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getTravelTitle } from '../../redux/actions/header.actions'

import { ReactComponent as EditBtnSVG } from '../../assets/images/icons/pencil.svg'

export class HeaderTitle extends React.Component {
   static propTypes = {
      getTravelTitle: PropTypes.func.isRequired,
   }
   constructor(props) {
      super(props)
      this.state = {
         value: '',
         isInEditMode: false,
         inputSize: '',
      }
   }

   componentWillMount = () => {
      const { travelId } = this.props
      this.props.getTravelTitle(travelId) //action
      this.setState({
         value: this.props.title,
         inputSize: this.state.value.length,
      })
   }
   changeEditMode = () => {
      this.setState({
         isInEditMode: !this.state.isInEditMode,
      })
   }
   updateComponentValue = () => {
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
   inputChangeSize = (evt) => {
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

   renderEditView = () => {
      return (
         <div
            className={styles.headerTitle_EditView}
            onKeyUp={this.handleKeyUp}
         >
            <input
               className={styles.headerTitle__input}
               type="text"
               defaultValue={this.state.value}
               ref="theTextInput"
               onBlur={this.updateComponentValue}
               onKeyUp={this.handleKeyUp}
               autoFocus
               maxLength="30"
               size={this.state.inputSize > 5 ? this.state.inputSize : 5}
               onChange={this.inputChangeSize}
            ></input>
            <div className={styles.headerTitle__editIcon}>
               <EditBtnSVG />
            </div>
         </div>
      )
   }
   renderDefauitView = () => {
      return (
         <div
            className={styles.headerTitle_DefauitView}
            onClick={this.changeEditMode}
         >
            <div className={styles.headerTitle__value}>{this.state.value}</div>
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

const mapStateToProps = ({ headerReducer }) => ({
   travelId: headerReducer.travelId, // TODO delete after real ID appear in route
   title: headerReducer.title,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getTravelTitle }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTitle)
