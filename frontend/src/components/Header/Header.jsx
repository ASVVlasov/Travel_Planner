import React from 'react'
import PropTypes from 'prop-types'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { getHeader } from '../../redux/header/actions'

import styles from './Header.module.scss'
import { ReactComponent as BackBtnSVG } from '../../assets/images/icons/arrow.svg'
import { ReactComponent as EditBtnSVG } from '../../assets/images/icons/pencil.svg'
import { ReactComponent as UserProfileSVG } from '../../assets/images/icons/avatar.svg'

import HeaderTitle from '../../controls/HeaderTitle/HeaderTitle'
import Calendar from '../../controls/Calendar/Calendar'

class Header extends React.Component {
   static propTypes = {
      getHeader: PropTypes.func.isRequired,
   }
   constructor(props) {
      super(props)
      this.state = {}
   }

   componentDidMount() {
      const travelId = '5eb56d4d771522c070eb3f6f' // TODO delete after real ID appear in route
      this.props.getHeader(travelId) //action
   }
   render() {
      return (
         <header className={styles.header}>
            <div className={styles['back-btn']}>
               <BackBtnSVG />
            </div>
            <div className={styles['trip-data']}>
               <div className={styles['trip-data__item']}>
                  <div className={styles['trip-data__title-text']}>
                     <HeaderTitle />
                  </div>
               </div>
               <div className={styles['trip-data__item']}>
                  <div className={styles['trip-data__period-text']}>
                     <Calendar />
                  </div>
                  <EditBtnSVG className={styles['trip-data__edit-btn']} />
               </div>
            </div>

            <div className={styles['travellers']}>
               <div className={styles['travellers-item']}></div>
               <div className={styles['travellers-item']}></div>
               <div className={styles['travellers-item']}></div>
               <div className={styles['travellers-item']}></div>
               <div className={styles['travellers-else']}>+2</div>
            </div>
            <div className={styles['user-profile']}>
               <UserProfileSVG />
            </div>
         </header>
      )
   }
}

const mapStateToProps = ({ headerReducer }) => ({
   title: headerReducer.title,
   beginDate: headerReducer.beginDate,
   endDate: headerReducer.endDate,
})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getHeader }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
