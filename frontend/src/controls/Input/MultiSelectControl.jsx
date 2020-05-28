import { Component } from 'react'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Input.module.scss'
import MultiSelect from 'react-multi-select-component'

export default class MultiSelectControl extends Component {
   static propTypes = {
      value: PropTypes.any.isRequired,
      options: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      overrideStrings: PropTypes.object.isRequired,
   }

   state = {
      value: [],
   }

   onChange = (selected) => {
      this.setState({ value: selected })
      this.props.onChange({ name: this.props.name, value: selected })
   }

   componentDidMount() {
      this.setState({ value: this.props.value })
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.value !== this.props.value) {
         this.setState({ value: this.props.value })
      }
   }

   render() {
      return (
         <MultiSelect
            className={styles.multiSelect}
            options={this.props.options}
            value={this.state.value}
            onChange={this.onChange}
            labelledBy={'Select'}
            disableSearch={true}
            overrideStrings={this.props.overrideStrings}
         />
      )
   }
}
