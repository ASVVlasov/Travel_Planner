import React from 'react';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import styles from './TransportAddForm.module.scss';

class TransportAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
    
    )
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransportAddForm);
