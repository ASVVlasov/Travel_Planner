import React from 'react'
import styles from './HeaderTitle.module.scss'

import { ReactComponent as EditBtnSVG } from '../../assets/images/icons/pencil.svg';
import { ReactComponent as InputBtnOkSVG } from '../../assets/images/icons/plane.svg';
import { ReactComponent as InputBtnCanselSVG } from '../../assets/images/icons/clipboard.svg';

export default class HeaderTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Евротур’2020",
            isInEditMode: false
        }
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
    renderEditView = () => {
        return(
            <div className={styles.headerTitle_EditView}>
                <input 
                    className={styles.headerTitle__input}
                    type="text"
                    defaultValue={this.state.value}
                    ref="theTextInput"
                >
                </input>
                <button onClick={this.changeEditMode} className={styles.headerTitle__BtnCansel}><InputBtnCanselSVG/></button>
                <button onClick={this.updateComponentValue} className={styles.headerTitle__BtnOk}><InputBtnOkSVG/></button>
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