import React from 'react'
// import PropTypes from 'prop-types'
import styles from './UserFooter.module.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Switch from '../../controls/Switch/Switch.jsx'
import { withRouter } from 'react-router-dom'

class UserFooter extends React.Component {
   static propTypes = {}

   state = {
      filter: false,
   }

   changeFilter = (value) => {
      if (value) {
      } else {
      }
      this.setState({ filter: value })
   }

   render() {
      return (
         <footer className={styles.footer}>
            {this.props.match.params.tab === 'travels' && (
               <Switch
                  labelText="показать историю"
                  checked={this.state.filter}
                  onChange={(value) => {
                     this.changeFilter(value)
                  }}
               />
            )}
         </footer>
      )
   }
}
const mapStateToProps = ({}) => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(UserFooter)
)
