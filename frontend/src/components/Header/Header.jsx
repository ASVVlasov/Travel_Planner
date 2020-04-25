import React from 'react';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import styles from './Header.module.scss';
import { ReactComponent as BackBtnSVG } from './images/back-btn.svg';
import { ReactComponent as EditBtnSVG } from './images/edit-pencil.svg';
import { ReactComponent as UserProfileSVG } from './images/user-profile.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles["header-row"]}>
          <div className={styles["back-btn"]}>
              <BackBtnSVG />
          </div>
          <div className={styles["trip-data"]}>
            <div className={styles["trip-data__item"]}>
              <div className={styles["trip-data__title-text"]}>
                Евротур’2020
              </div>
              <div className={styles["trip-data__edit-btn"]}>
                <EditBtnSVG />
              </div>
            </div>
            <div className={styles["trip-data__item"]}>
              <div className={styles["trip-data__period-text"]}>
                24 июня, ПТ – 10 июля, ВС  |  14 дней
              </div>
              <div className={styles["trip-data__edit-btn"]}>
                <EditBtnSVG />
              </div>
            </div>
          </div>

          <div className={styles["travellers"]}>
            <div className={styles["travellers-item"]}>
              <img src="" alt="user-pic" />
            </div>
            <div className={styles["travellers-item"]}>
              <img src="" alt="user-pic" />
            </div>
            <div className={styles["travellers-item"]}>
              <img src="" alt="user-pic" />
            </div>
            <div className={styles["travellers-item"]}>
              <img src="" alt="user-pic" />
            </div>
            <div className={styles["travellers-else"]}>
              <span>+2</span>
            </div>
          </div>
          
          <div className={styles["user-profile"]}>
            <UserProfileSVG />
          </div>

        </div>
      </div>  
    </header>
    )
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
