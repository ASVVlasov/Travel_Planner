import React from 'react'
import PropTypes from 'prop-types'
import styles from './Loader.module.scss'

export default class Loader extends React.Component {
   static propTypes = {
      type: PropTypes.oneOf(['big', 'small']),
   }
   render() {
      const type = this.props.type
      return (
         <div className={type === 'small' ? styles.bg_small : styles.bg_big}>
            <div
               className={
                  type === 'small' ? styles.loader_small : styles.loader_big
               }
            >
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
            </div>
         </div>
      )
   }
}
