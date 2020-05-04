import React from 'react';

import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Route } from 'react-router-dom';

import styles from './TravelPage.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';

import TravelPageRouter from '../../router/TravelPageRouter';


class TravelPage extends React.Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className={styles.travelPage}>
        <Header />
        <Route path={path} component={TravelPageRouter} />
        <Footer />
        <div className={styles.travelPage__sidebarWrap}>
          <Sidebar />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ }) => ({ });
const mapDispatchToProps = (dispatch) => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TravelPage);
