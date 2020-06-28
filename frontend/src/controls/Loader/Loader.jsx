import React from 'react'
import PropTypes from 'prop-types'
import styles from './Loader.module.scss'

export default class Loader extends React.Component {
   static propTypes = {
      type: PropTypes.oneOf(['big', 'smallDark', 'smallLight']),
      inlineStyles: PropTypes.object,
   }
   render() {
      const { type, inlineStyles } = this.props
      return (
         <div
            className={type === 'big' ? styles.bg_big : styles[`bg_${type}`]}
            style={inlineStyles}
         >
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
