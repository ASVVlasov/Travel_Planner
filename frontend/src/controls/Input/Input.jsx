import styles from './Input.module.scss'
import React from 'react'
import MultiSelect from 'react-multi-select-component'

export const Input = (props) => {
   console.log(props)
   return (
      <div
         className={`${styles.control} ${props.styles} ${
            props.hidden && styles.control_hidden
         }`}
      >
         <label
            className={styles.control__label}
            htmlFor={props.name}
            children={props.label}
         />
         {props.hintLabel && (
            <label
               className={`${styles.control__label} ${styles.control__label_hintLabel}`}
               children={props.hintLabel}
            />
         )}
         {props.type === 'multiselect' && (
            <MultiSelect
               className={styles.multiSelect}
               options={props.options}
               value={props.value}
               onChange={props.onChange}
               labelledBy={'Select'}
               disableSearch={props.disableSearch}
               overrideStrings={props.overrideStrings}
            />
         )}
         {props.type !== 'multiselect' && (
            <input
               className={styles.control__input}
               type={props.type}
               name={props.name}
               placeholder={props.placeholder}
               value={props.value}
               onChange={props.onChange}
            />
         )}
      </div>
   )
}
