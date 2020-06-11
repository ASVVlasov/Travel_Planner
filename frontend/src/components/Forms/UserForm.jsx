import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import styles from './UserForm.module.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
   updateUserInfo,
   uploadAvatar,
   deleteAvatar,
} from '../../redux/user/operations'

import ModalBase from '../../controls/ModalBase/ModalBase'
import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import { ReactComponent as EditIcon } from '../../assets/images/icons/pencil.svg'
import { ReactComponent as AddIcon } from '../../assets/images/icons/plus.svg'
import InputControl from '../../controls/Input/InputControl'
import Button from '../../controls/Button/Button'

class UserForm extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      user: PropTypes.object.isRequired,
   }

   state = {
      email: '',
      nickName: '',
      name: '',
      surname: '',
   }

   //TODO remove
   FILE_URL = window.location.port
      ? 'http://localhost:3300/user/avatar/'
      : window.location.origin + '/user/avatar/'

   avatarInput = createRef()

   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }

   uploadAvatarHandler = (e) => {
      const file = new FormData()
      file.append('files', e.target.files[0])

      this.props.uploadAvatar(file)
      e.target.value = null
   }

   saveHandler = async () => {
      await this.props.updateUserInfo(this.state)
      this.props.onClose()
   }

   componentDidMount() {
      this.setState({ ...this.props.user })
   }

   render() {
      const { onClose, avatar, deleteAvatar } = this.props
      const { email, nickName, name, surname } = this.state

      return (
         <ModalBase>
            <div className={styles.form}>
               <span
                  className={styles.form__title}
                  children="Редактирование профиля"
               />
               <CloseIcon
                  className={`${styles.icon} ${styles.icon__close}`}
                  onClick={onClose}
               />

               <div className={styles.form__inputs}>
                  <div className={styles.form__inputs_column}>
                     <InputControl
                        type="text"
                        value={nickName}
                        label="Никнейм"
                        hintLabel="не может быть пустым"
                        styles={styles.input__nickName}
                        name="nickName"
                        onChange={this.handleChange}
                     />
                     <InputControl
                        type="text"
                        value={email}
                        label="Почта"
                        name="email"
                        disabled
                     />
                  </div>

                  <div className={styles.form__avatar}>
                     <div
                        className={styles.avatar}
                        onClick={() => this.avatarInput.current.click()}
                     >
                        {!avatar ? (
                           <AddIcon
                              className={`${styles.icon} ${styles.icon__upload}`}
                           />
                        ) : (
                           <>
                              <img src={this.FILE_URL + avatar} alt="" />
                              <div className={styles.avatar__hover}>
                                 <EditIcon
                                    className={`${styles.icon} ${styles.icon__upload} ${styles.icon__upload_edit}`}
                                 />
                              </div>
                           </>
                        )}
                        <input
                           style={{ display: 'none' }}
                           type="file"
                           ref={this.avatarInput}
                           onChange={(e) => this.uploadAvatarHandler(e)}
                        />
                     </div>
                     {avatar && (
                        <span
                           onClick={() => deleteAvatar()}
                           children="удалить аватар"
                        />
                     )}
                  </div>
               </div>

               <div className={styles.form__inputs}>
                  <InputControl
                     type="text"
                     value={name}
                     label="Имя"
                     styles={styles.input__name}
                     name="name"
                     onChange={this.handleChange}
                  />
                  <InputControl
                     type="text"
                     value={surname}
                     label="Фамилия"
                     styles={styles.input__name}
                     name="surname"
                     onChange={this.handleChange}
                  />
               </div>

               <div className={styles.form__actions}>
                  <Button type="cancel" text="Закрыть" onClick={onClose} />
                  <Button
                     text="Сохранить"
                     ml={20}
                     onClick={this.saveHandler}
                     disabled={!this.state.nickName}
                  />
               </div>
            </div>
         </ModalBase>
      )
   }
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ updateUserInfo, uploadAvatar, deleteAvatar }, dispatch)

export default connect(null, mapDispatchToProps)(UserForm)
