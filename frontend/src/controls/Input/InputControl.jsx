import React, { Component } from 'react'
import DateControl from './DateControl'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'
import MultiSelect from 'react-multi-select-component'
import MultiSelectControl from './MultiSelectControl'
import BaseInputControl from './BaseInputControl'

export default class InputControl extends Component {
   static propTypes = {
      type: PropTypes.oneOf([
         'datetime',
         'date',
         'text',
         'textarea',
         'multiselect',
      ]).isRequired,
      value: PropTypes.any.isRequired,
      placeholder: PropTypes.string,
      label: PropTypes.string,
      hintLabel: PropTypes.string,
      styles: PropTypes.string,
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      options: PropTypes.array,
      overrideStrings: PropTypes.object,
   }

   onChange = (target) => {
      this.props.onChange({ target })
   }

   renderControlByType = (type) => {
      switch (type) {
         case 'datetime':
         case 'date': {
            const { value } = this.props
            return (
               <DateControl
                  value={value ? new Date(value) : value}
                  onChange={this.onChange}
                  showTimeSelect={type === 'datetime'}
                  name={this.props.name}
               />
            )
         }
         case 'multiselect': {
            return (
               <MultiSelectControl
                  options={this.props.options}
                  value={this.props.value}
                  onChange={this.onChange}
                  name={this.props.name}
                  overrideStrings={this.props.overrideStrings}
               />
            )
         }
         default: {
            return (
               <BaseInputControl
                  value={this.props.value}
                  placeholder={this.props.placeholder}
                  onChange={this.onChange}
                  styles={this.props.styles}
                  name={this.props.name}
                  label={this.props.label}
                  hintLabel={this.props.hintLabel}
               />
            )
         }
      }
   }
   render() {
      const { type } = this.props
      return (
         <div
            className={`${styles.control} ${this.props.styles} ${
               this.props.hidden && styles.control_hidden
            }`}
         >
            {this.props.label && (
               <label
                  className={styles.control__label}
                  htmlFor={this.props.name}
                  children={this.props.label}
               />
            )}
            {this.props.hintLabel && (
               <label
                  className={`${styles.control__label} ${styles.control__label_hintLabel}`}
                  children={this.props.hintLabel}
               />
            )}
            {this.renderControlByType(type)}
         </div>
      )
   }
}
