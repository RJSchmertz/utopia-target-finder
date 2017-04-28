import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Navbar, Nav, NavItem, Row, Col
} from 'react-bootstrap';
import request from 'superagent';
import _ from 'lodash';

export class ProvinceFinder extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  state = {
    provinces: [],
    kingdoms: []
  }

  componentDidMount() {
    request
      .get('/Home/GetData')
      .set('Accept', 'application/json')
      .end((err, resp) => {
        if (err) console.log(err);
        const provinces = resp.body.provinces;
        const kingdoms = resp.body.kingdoms;
        console.log(provinces);
        console.log(kingdoms);
        this.setState({ provinces, kingdoms });
      });
  }

  provinceToTable = () => {
    const { provinces } = this.state;
    if (!provinces.length) return null;
    const rows = [];
    const firstProv = provinces[0];
    const header = _.map(firstProv, (value, name) => (<th>{name.toString()}</th>));
    rows.push(header);
    provinces.forEach(province => {
      const tds = _.map(province, (value, name) => (<td>{value.toString()}</td>));

      rows.push(<tr>{tds}</tr>);
    });
    return rows;
  }

  render() {
    return (
      <div>
      <Navbar inverse collapseOnSelect className="application-header">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Utopia-Target-Finder</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} active href="#">Province Finder</NavItem>
          <NavItem eventKey={2} href="#">Kingdom Finder</NavItem>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container-fluid">
        <Row>
          <Col xs={3} className="left-panel">
            <div className="side-panel-header">
              Province
            </div>
            <div>
            </div>
          </Col>
          <Col xs={6} className="col-xs-push-3" style={{ padding: '15px' }}>
            <table>
              {this.provinceToTable()}
            </table>
          </Col>
        </Row>
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({}, dispatch)
  }
);

const mapStateToProps = state => (
  {
    dispatch: state.dispatch
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProvinceFinder);
