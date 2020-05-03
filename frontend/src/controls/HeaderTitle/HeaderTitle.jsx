import React from 'react'
import styles from './HeaderTitle.module.scss'

import { ReactComponent as EditBtnSVG } from '../../assets/images/icons/pencil.svg';

export default class HeaderTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Евротур’2020",
            isInEditMode: false
        }
        this.changeEditMode = this.changeEditMode.bind(this);
        this.updateComponentValue = this.updateComponentValue.bind(this);
        this.renderEditView = this.renderEditView.bind(this);
        this.renderDefauitView = this.renderDefauitView.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
      }
    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }
    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            value: this.refs.theTextInput.value
        })
    }
    handleKeyUp = (evt) => {
        if (evt.keyCode === 13) {
            this.updateComponentValue()
        }
    }

    renderEditView = () => {
        return(
            <div className={styles.headerTitle_EditView} onKeyUp = { this.handleKeyUp }>
                <input 
                    className={styles.headerTitle__input}
                    type="text"
                    defaultValue={this.state.value}
                    ref="theTextInput"
                    onBlur = { this.updateComponentValue }
                    onKeyUp = { this.handleKeyUp }
                    autoFocus
                    maxLength="30"
                >
                </input>
                <div className={styles.headerTitle__editIcon}><EditBtnSVG/></div>
            </div>
        ) 
    }
    renderDefauitView = () => {
        return (
            <div className={styles.headerTitle_DefauitView} onClick ={this.changeEditMode}>
                <div className={styles.headerTitle__value}>{this.state.value}</div>
                <div className={styles.headerTitle__editIcon}><EditBtnSVG/></div>
            </div>
        ) 
    }
    render() {
        return this.state.isInEditMode ?
        this.renderEditView() :
        this.renderDefauitView()
    }
}