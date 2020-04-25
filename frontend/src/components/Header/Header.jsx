import React from 'react';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
    <header className="header">
        This is header!
    </header>
    )
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
