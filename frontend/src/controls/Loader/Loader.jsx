import React from 'react'
import PropTypes from 'prop-types'
import styles from './Loader.module.scss'

export default class Loader extends React.Component {
   static propTypes = {
      type: PropTypes.oneOf(['big', 'smallDark', 'smallLight']),
   }
   render() {
      const type = this.props.type
      return (
         <div className={type === 'big' ? styles.bg_big : styles[`bg_${type}`]}>
            <div
               className={
                  type === 'big' ? styles.loader_big : styles[`loader_${type}`]
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
