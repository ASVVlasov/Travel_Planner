import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './FeedbackForm.module.scss'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { sendFeedback } from '../../redux/feedback/operations.js'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'

class FeedbackForm extends Component {
   static propTypes = {
      sendFeedback: PropTypes.func.isRequired,
      onClose: PropTypes.func.isRequired,
   }

   state = {
      comment: '',
   }

   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }

   submit = () => {
      this.props.sendFeedback({ comment: this.state.comment })
      this.props.onClose()
   }

   render() {
      const { onClose } = this.props
      const { comment } = this.state

      return (
         <ModalBase>
            <div className={styles.form}>
               <div className={styles.form__header}>
                  <span
                     className={styles.form__title}
                     children="Отзывы и предложения"
                  />
                  <CloseIcon className={styles.icon__close} onClick={onClose} />
               </div>

               <div className={styles.form__caption}>
                  Нам&nbsp;действительно&nbsp;важно&nbsp;мнение&nbsp;каждого&nbsp;пользователя&nbsp;для&nbsp;развития
                  <br />
                  проекта,&nbsp;поэтому&nbsp;мы&nbsp;прочитаем&nbsp;ваше&nbsp;сообщение&nbsp;и&nbsp;постараемся&nbsp;все&nbsp;учесть
               </div>
               <textarea
                  name="comment"
                  value={comment}
                  className={styles.form__comment}
                  placeholder="Расскажите о своем опыте использования сервиса..."
                  onChange={this.handleChange}
               />
               <div className={styles.form__actions}>
                  <Button onClick={onClose} text="Отмена" type="cancel" />
                  <Button
                     onClick={this.submit}
                     disabled={!comment}
                     text="Отправить"
                     ml={20}
                  />
               </div>
            </div>
         </ModalBase>
      )
   }
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ sendFeedback }, dispatch)

export default connect(null, mapDispatchToProps)(FeedbackForm)
