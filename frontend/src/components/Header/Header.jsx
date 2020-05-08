import React from 'react'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

import styles from './Header.module.scss'
import { ReactComponent as BackBtnSVG } from '../../assets/images/icons/arrow.svg'
import { ReactComponent as EditBtnSVG } from '../../assets/images/icons/pencil.svg'
import { ReactComponent as UserProfileSVG } from '../../assets/images/icons/avatar.svg'

import HeaderTitle from '../../controls/HeaderTitle/HeaderTitle'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
    <header className={styles.header}>
      <div className={styles["back-btn"]}>
        <BackBtnSVG />
      </div>
      <div className={styles["trip-data"]}>
        <div className={styles["trip-data__item"]}>
          <div className={styles["trip-data__title-text"]}>
            <HeaderTitle/>
          </div>
        </div>
        <div className={styles["trip-data__item"]}>
          <div className={styles["trip-data__period-text"]}>
            24 июня, ПТ – 10 июля, ВС  |  14 дней
          </div>
            <EditBtnSVG className={styles["trip-data__edit-btn"]} />
        </div>
      </div>

      <div className={styles['travellers']}>
        <div className={styles['travellers-item']}></div>
        <div className={styles['travellers-item']}></div>
        <div className={styles['travellers-item']}></div>
        <div className={styles['travellers-item']}></div>
        <div className={styles['travellers-else']}>+2</div>
      </div>
      <div className={styles["user-profile"]}>
        <UserProfileSVG />
      </div>
    </header>
    )
  }
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
