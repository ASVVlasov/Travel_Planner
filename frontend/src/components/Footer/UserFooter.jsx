import React from 'react'
import PropTypes from 'prop-types'
import styles from './UserFooter.module.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setHistoryFilter } from '../../redux/board/actions'

import Switch from '../../controls/Switch/Switch.jsx'
import FeedbackForm from '../Forms/FeedbackForm'
import { withRouter } from 'react-router-dom'

class UserFooter extends React.Component {
   static propTypes = {
      filter: PropTypes.bool,
      setHistoryFilter: PropTypes.func.isRequired,
   }
   state = {
      isModalOpen: false,
   }

   openModal = () => {
      this.setState({ isModalOpen: true })
   }

   closeModal = () => {
      this.setState({ isModalOpen: false })
   }

   render() {
      return (
         <footer className={styles.footer}>
            <div className={styles.footer__linkList}>
               <span className={styles.footer__link} onClick={this.openModal}>
                  Оставить отзыв или предложение
               </span>
               {/* <span className={styles.footer__link}>Поддержать проект</span> */}
            </div>
            {this.state.isModalOpen && (
               <FeedbackForm onClose={this.closeModal} />
            )}
            {this.props.match.params.tab === 'travels' && (
               <Switch
                  labelText="показать историю"
                  checked={this.props.filter}
                  onChange={(value) => {
                     this.props.setHistoryFilter(value)
                  }}
               />
            )}
         </footer>
      )
   }
}
const mapStateToProps = ({ boardReducer }) => ({
   filter: boardReducer.historyFilter,
})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ setHistoryFilter }, dispatch)

export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(UserFooter)
)
