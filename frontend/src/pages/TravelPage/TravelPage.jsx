import React from 'react';

import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Route, Switch, Redirect } from 'react-router-dom';

import styles from './TravelPage.module.scss';
import Header from '../../components/Header/Header';
import Board from '../../components/Board/Board';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';

class TravelPage extends React.Component {
  render() {
    const { url } = this.props.match;
    return (
      <div className={styles.travelPage}>
        <Header />
        <Switch>
          <Route path={`${url}/:tab`} component={Board} />
          <Route>
            <Redirect to={`${url}/transport`} /> {/* Default tab is transport */}
          </Route>
        </Switch>
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
