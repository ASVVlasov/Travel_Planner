import React from 'react'
import ReactDOM from 'react-dom'
import styles from './ModalBase.module.scss'

const modalRoot = document.getElementById('modal-root')

export default class ModalBase extends React.Component {
   el = document.createElement('div')

   componentDidMount = () => {
      const background = styles.background.toString()
      this.el.classList.add(background)

      modalRoot.appendChild(this.el)
   }
   componentWillUnmount = () => {
      modalRoot.removeChild(this.el)
   }
   render() {
      return ReactDOM.createPortal(this.props.children, this.el)
   }
}
