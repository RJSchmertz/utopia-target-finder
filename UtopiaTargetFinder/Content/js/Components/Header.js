import React, { PropTypes } from 'react';
import {
  Navbar,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Collapse
} from 'react-bootstrap';


export default class Header extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    headerOpen: PropTypes.bool
  }
  state = {
    myNwChecked: true,
    myKdNwChecked: false,
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

  setMyNw = event => {
    this.setState({ myNw: event.target.value }, this.sendFilterInfo);
  }

  setMyKdNw = event => {
    this.setState({ myKdNw: event.target.value }, this.sendFilterInfo);
  }

  setProvLow = event => {
    this.setState({ provLow: event.target.value }, this.sendFilterInfo);
  }

  setProvHigh = event => {
    this.setState({ provHigh: event.target.value }, this.sendFilterInfo);
  }

  setMyKdNwChecked = event => {
    this.setState({ myKdNwChecked: event.target.checked }, this.sendFilterInfo);
  }

  setKdLow = event => {
    this.setState({ kdLow: event.target.value }, this.sendFilterInfo);
  }

  setKdHigh = event => {
    this.setState({ kdHigh: event.target.value }, this.sendFilterInfo);
  }

  sendFilterInfo = () => {
    const {
      myNwChecked,
      myKdNwChecked,
      myNw,
      myKdNw,
      provLow,
      provHigh,
      kdLow,
      kdHigh
    } = this.state;

    this.props.actions
      .setFilterInfo(myNwChecked, myKdNwChecked, myNw, myKdNw, provLow,
        provHigh, kdLow, kdHigh);
  };

  setCollapseHeader = () => {
    const { headerOpen, actions } = this.props;
    actions.setHeaderOpen(!headerOpen);
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect className="application-header">
          <span
            onClick={this.setCollapseHeader} >
            <span className="glyphicon glyphicon-menu-down" /> Filters
          </span>
          <Collapse in={this.props.headerOpen}>
        <div>
            <Row>
            <FormGroup>
              <Col xs={1}>
              <ControlLabel>
                <Checkbox
                  checked={this.state.myNwChecked}
                  onChange={this.setMyNwChecked} >
                    My NW
                </Checkbox>
              </ControlLabel>
              </Col>
              <Col xs={3}>
              <FormControl
                disabled={!this.state.myNwChecked}
                bsSize="sm"
                type="number"
                value={this.state.myNw}
                onChange={this.setMyNw} />
              </Col>
              <Col xs={1}>
                <ControlLabel>Low:</ControlLabel>
              </Col>
              <Col xs={3}>
                <FormControl
                  disabled={!this.state.myNwChecked}
                  bsSize="sm"
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={this.state.provLow}
                  onChange={this.setProvLow} />
              </Col>
              <Col xs={1}>
                <ControlLabel>High: </ControlLabel>
              </Col>
              <Col xs={3}>
                <FormControl
                  disabled={!this.state.myNwChecked}
                  bsSize="sm"
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={this.state.provHigh}
                  onChange={this.setProvHigh} />
              </Col>
            </FormGroup>
            </Row>

            <Row>
            <FormGroup>
              <Col xs={1}>
              <ControlLabel>
                <Checkbox
                  checked={this.state.myKdNwChecked}
                  onChange={this.setMyKdNwChecked} >
                    KD NW
                </Checkbox>
              </ControlLabel>
              </Col>
              <Col xs={3}>
              <FormControl
                disabled={!this.state.myKdNwChecked}
                bsSize="sm"
                type="number"
                value={this.state.myKdNw}
                onChange={this.setMyKdNw} />
              </Col>
              <Col xs={1}>
                <ControlLabel>Low: </ControlLabel>
              </Col>
              <Col xs={3}>
                <FormControl
                  disabled={!this.state.myKdNwChecked}
                  bsSize="sm"
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={this.state.kdLow}
                  onChange={this.setKdLow} />
              </Col>
              <Col xs={1}>
                <ControlLabel>High: </ControlLabel>
              </Col>
              <Col xs={3}>
                <FormControl
                  disabled={!this.state.myKdNwChecked}
                  bsSize="sm"
                  min={0}
                  max={1}
                  step={0.01}
                  type="number"
                  value={this.state.kdHigh}
                  onChange={this.setKdHigh} />
              </Col>
            </FormGroup>
            </Row>
        </div>
          </Collapse>
      </Navbar>
    );
  }
}
