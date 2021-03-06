import React from 'react'
import styles from './footer.module.scss'
import Switch from '../../controls/Switch/Switch.jsx'
import FeedbackForm from '../Forms/FeedbackForm'
import { ReactComponent as Tune } from '../../assets/images/icons/tune.svg'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBudget } from '../../redux/travel/operations'
import { setUserFilter } from '../../redux/board/actions'
import classNames from 'classnames'

class Footer extends React.Component {
   static propTypes = {
      travelId: PropTypes.string,
      userId: PropTypes.string,
      summary: PropTypes.object.isRequired,
      getBudget: PropTypes.func.isRequired,
      setUserFilter: PropTypes.func.isRequired,
   }
   constructor(props) {
      super(props)
      this.state = {
         filter: false,
         isModalOpen: false,
         feedbackHintShown: false,
      }
      document.addEventListener('click', this.handleClick, false)
   }

   openModal = () => {
      this.setState({ isModalOpen: true })
   }

   closeModal = () => {
      this.setState({ isModalOpen: false })
   }

   handleClick = (e) => {
      const feedbackHint = document.getElementById('feedbackHint')
      const budgetTune = document.getElementById('budgetTune')
      const path = e.path || (e.composedPath && e.composedPath())

      if (!path.includes(feedbackHint)) {
         this.setState({ feedbackHintShown: false })
      }
      if (path.includes(budgetTune)) {
         this.setState({ feedbackHintShown: true })
      }
   }

   changeFilter = (value) => {
      if (value) {
         this.props.setUserFilter(this.props.userId)
      } else {
         this.props.setUserFilter('')
      }
      this.setState({ filter: value })
   }

   splitNumber = (number) => {
      if (number) {
         return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      }
      return '0'
   }

   render() {
      return (
         <footer className={styles.footer}>
            <div className={styles.footer__switch}>
               <Switch
                  labelText="то, что относится ко мне"
                  checked={this.state.filter}
                  onChange={(value) => {
                     this.changeFilter(value)
                  }}
               />
            </div>
            <div className={styles.footer__rightSide}>
               <div className={styles.footer__paymentInfo}>
                  <div className={styles.footer__paid}>
                     <div className={styles.footer__description_medium}>
                        {this.splitNumber(this.props.summary.paid)} Р
                     </div>
                     <div className={styles.footer__description_small}>
                        оплачено
                     </div>
                  </div>
                  <div className={styles.footer__toPay}>
                     <div className={styles.footer__description_medium}>
                        {this.splitNumber(this.props.summary.toPay)} Р
                     </div>
                     <div className={styles.footer__description_small}>
                        к оплате
                     </div>
                  </div>
                  <div className={styles.footer__totalBudget}>
                     <div className={styles.footer__description_large}>
                        {this.splitNumber(this.props.summary.budget)} Р
                     </div>
                     <div className={styles.footer__description_small}>
                        общий бюджет
                     </div>
                  </div>
               </div>
               <Tune className={styles.footer__settingsBtn} id="budgetTune" />
            </div>
            <div
               className={classNames(
                  styles.footer__feedback,
                  this.state.feedbackHintShown && styles.footer__feedback_show
               )}
               id="feedbackHint"
            >
               <p className={styles.footer__text}>
                  Здесь будет подробный расчет бюджета
                  <br />
                  Самое время&nbsp;
                  <span onClick={this.openModal}>отправить пожелания</span>
                  <br />
                  по функционалу
               </p>
            </div>
            {this.state.isModalOpen && (
               <FeedbackForm onClose={this.closeModal} />
            )}
         </footer>
      )
   }
}
const mapStateToProps = ({ travelReducer, userReducer }) => ({
   summary: travelReducer.budget,
   userId: userReducer.user._id,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getBudget, setUserFilter }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
