import React from 'react'
import styles from './footer.module.scss'
import Switch from '../../controls/Switch/Switch.jsx'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBudget } from '../../redux/travel/operations'
import { getBoardFilter } from '../../redux/board/actions'
import { withRouter } from 'react-router-dom'
import { getCards } from '../../redux/cards/actions'

class Footer extends React.Component {
   static propTypes = {
      summary: PropTypes.object.isRequired,
      getBudget: PropTypes.func.isRequired,
      getBoardFilter: PropTypes.func.isRequired,
      getCards: PropTypes.func.isRequired,
   }

   state = {
      filter: false,
   }

   componentDidMount() {
      // TODO заменить адын на реальный travelId из роута в будущем
      this.props.getBudget(1)
   }

   changeFilter = (value) => {
      if (value) {
         this.props.getBoardFilter('5eb9af4dc82bd95234d9ccd6')
      } else {
         // TODO заменить в будущем на реальную табу
         this.props.getCards('all')
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
         </footer>
      )
   }
}
const mapStateToProps = ({ travelReducer }) => ({
   summary: travelReducer.budget,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getBudget, getBoardFilter, getCards }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer))
