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
import * as utoActions from '../store/utoActions';
import LeftPanel from '../components/LeftPanel';
import * as filters from '../utils/filters';

export class ProvinceFinder extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    provinces: PropTypes.array,
    kingdoms: PropTypes.array,
    filterInfo: PropTypes.object
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
        header: 'Location',
        accessor: 'location'
      },
      {
        header: 'Race',
        accessor: 'race',
        render: data => Race[data.row.race]
      },
      {
        header: 'NW/a',
        accessor: 'nwa',
        render: data => data.row.nwa.toFixed(2)
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
        header: 'Kingdom Nw',
        accessor: 'kingdomNetworth',
        render: data => data.row.kingdomNetworth.toLocaleString()
      }
    ];

    let data = provinces;
    const { filterInfo } = this.props;
    const {
      myNwChecked,
      myKdNwChecked,
      myNw,
      myKdNw,
      provLow,
      provHigh,
      kdLow,
      kdHigh
    } = filterInfo;

    if (myNwChecked) {
      data = filters.myNetworthRange(data, myNw, provLow, provHigh);
    }

    if (myKdNwChecked) {
      data = filters.myKdNetworthRange(data, myKdNw, kdLow, kdHigh);
    }

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
            <LeftPanel actions={this.props.actions} />
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
    actions: bindActionCreators({ ...utoActions }, dispatch)
  }
);

const mapStateToProps = state => (
  {
    provinces: state.utoReducer.provinces,
    kingdoms: state.utoReducer.kingdoms,
    filterInfo: state.utoReducer.filterInfo
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProvinceFinder);
