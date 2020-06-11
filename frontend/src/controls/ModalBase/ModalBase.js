import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from './ModalBase.module.scss'

const modalRoot = document.getElementById('modal-root')

export default class ModalBase extends React.Component {
   static propTypes = {
      toClose: PropTypes.func,
   }

   el = document.createElement('div')
   bgClass = styles.background.toString()

   handleEvent(e) {
      if (e.target.classList.value === this.bgClass && this.props.toClose) {
         this.props.toClose()
      }
   }

   componentDidMount() {
      this.el.classList.add(this.bgClass)
      this.el.addEventListener('click', (e) => this.handleEvent(e))
      modalRoot.appendChild(this.el)
   }
   componentWillUnmount() {
      modalRoot.removeChild(this.el)
   }
   render() {
      return ReactDOM.createPortal(this.props.children, this.el)
   }
}
