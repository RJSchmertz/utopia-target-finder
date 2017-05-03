import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Race, Honor } from '../constants';
import * as utoActions from '../store/utoActions';
import Header from '../components/Header';
import * as filters from '../utils/filters';

export class ProvinceFinder extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    provinces: PropTypes.array,
    kingdoms: PropTypes.array,
    headerOpen: PropTypes.bool,
    filterInfo: PropTypes.object
  }

  componentDidMount() {
    this.props.actions.getUtopiaData();
    window.onscroll = this.onBodyClick;
  }

  state = {
    myNwChecked: true,
    myKdNwChecked: false,
    collapseHeader: false,
    myNw: 200000,
    myKdNw: 5000000,
    provLow: 0.85,
    provHigh: 1.10,
    kdLow: 0.50,
    kdHigh: 0.90
  }

  setMyNwChecked = event => {
    this.setState({ myNwChecked: event.target.checked }, this.sendFilterInfo);
  }

  onBodyClick = () => {
    this.props.actions.setHeaderOpen(false);
  }

  provinceToTable = () => {
    const { provinces } = this.props;
    if (!provinces.length) return null;

    const columns = [
      {
        header: 'Name',
        accessor: 'name',
        render: data => `${data.row.name} (${data.row.location})`,
        minWidth: 200
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
        <Header actions={this.props.actions} headerOpen={this.props.headerOpen} />
        <div className="container-fluid main-panel pull-left" onClick={this.onBodyClick}>
          <Row>
            <Col>
                {this.provinceToTable()}
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
    filterInfo: state.utoReducer.filterInfo,
    headerOpen: state.utoReducer.headerOpen
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProvinceFinder);
