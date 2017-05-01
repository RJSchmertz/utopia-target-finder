import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Navbar, Nav, NavItem, Row, Col
} from 'react-bootstrap';
import request from 'superagent';
// import _ from 'lodash';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Race } from '../constants';

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
        else {
          const provinces = resp.body.provinces;
          const kingdoms = resp.body.kingdoms;
          this.setState({ provinces, kingdoms });
        }
      });
  }

  provinceToTable = () => {
    const { provinces } = this.state;
    if (!provinces.length) return null;

    const columns = [
      {
        header: 'Honor',
        accessor: 'honor'
      },
      {
        header: 'location',
        accessor: 'location'
      },
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Race',
        accessor: 'race',
        render: data => Race[data.row.race]
      },
      {
        header: 'Land',
        accessor: 'land'
      },
      {
        header: 'Networth',
        accessor: 'networth'
      }
    ];

    return (<ReactTable data={provinces} columns={columns} />);

    // const rows = [];
    // const firstProv = provinces[0];
    // const header = _.map(firstProv, (value, name) => (<th>{name.toString()}</th>));
    // rows.push(header);
    // provinces.forEach(province => {
    //   const tds = _.map(province, (value, name) => (<td>{value.toString()}</td>));

    //   rows.push(<tr>{tds}</tr>);
    // });
    // return rows;
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
          <Col xs={9} className="col-xs-push-3" style={{ padding: '15px' }}>
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
