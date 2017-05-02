import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Navbar, Nav, NavItem, Row, Col
} from 'react-bootstrap';
// import _ from 'lodash';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Race, Honor } from '../constants';
import * as actions from '../store/actions';
import LeftPanel from '../components/LeftPanel';
import * as filters from '../utils/filters';

export class ProvinceFinder extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    provinces: PropTypes.array,
    kingdoms: PropTypes.array
  }

  componentDidMount() {
    this.props.actions.getUtopiaData();
  }

  provinceToTable = () => {
    const { provinces } = this.props;
    if (!provinces.length) return null;

    const columns = [
      {
        header: 'Name',
        accessor: 'name',
        minWidth: 200
      },
      {
        header: 'Race',
        accessor: 'race',
        render: data => Race[data.row.race]
      },
      {
        header: 'NW/a',
        render: data => (data.row.networth / data.row.land).toFixed(2)
      },
      {
        header: 'Land',
        accessor: 'land',
        render: data => data.row.land.toLocaleString()
      },
      {
        header: 'Networth',
        accessor: 'networth',
        render: data => data.row.networth.toLocaleString()
      },
      {
        header: 'Honor',
        accessor: 'honor',
        render: data => Honor[data.row.honor]
      },
      {
        header: 'Location',
        accessor: 'location'
      },
      {
        header: 'Kingdom Nw',
        accessor: 'kingdomNetworth',
        render: data => data.row.kingdomNetworth.toLocaleString()
      }
    ];

    const data = filters.myNetworthRange(provinces, 500000, 90, 110);

    return (<ReactTable data={data} columns={columns} />);
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
            <LeftPanel actions={actions} />
          </Col>
          <Col xs={9} className="col-xs-push-3 main-panel">
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
    actions: bindActionCreators({ ...actions }, dispatch)
  }
);

const mapStateToProps = state => (
  {
    provinces: state.reducer.provinces,
    kingdoms: state.reducer.kingdoms
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProvinceFinder);
