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
import _ from 'lodash';


export default class Header extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    headerOpen: PropTypes.bool
  }
  state = {
    myNwChecked: true,
    myKdNwChecked: false,
    stanceChecked: false,
    myNw: 200,
    myKdNw: 5000,
    provLow: 0.85,
    provHigh: 1.10,
    kdLow: 0.50,
    kdHigh: 0.90,
    includeStances: Array(1).fill(0)
  }

  setMyNwChecked = event => {
    this.setState({ myNwChecked: event.target.checked }, this.sendFilterInfo);
  }

  setStanceChecked = event => {
    this.setState({ stanceChecked: event.target.checked }, this.sendFilterInfo);
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
    this.props.actions
      .setFilterInfo({ ...this.state });
  };

  setCollapseHeader = () => {
    const { headerOpen, actions } = this.props;
    actions.setHeaderOpen(!headerOpen);
  }

  onStanceChecked = event => {
    const currentList = this.state.includeStances;
    const value = parseInt(event.target.value, 10);
    if (event.target.checked) {
      currentList.push(value);
    } else {
      _.remove(currentList, val => val === value);
    }
    this.setState({ includeStances: currentList }, this.sendFilterInfo);
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect className="application-header">
          <span onClick={this.setCollapseHeader} className="filter-collapse">
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
                    My NW (k)
                </Checkbox>
              </ControlLabel>
              </Col>
              <Col xs={3} lg={2}>
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
                      KD NW (k)
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

            <Row className="stance-row">
              <FormGroup>
                <Col xs={1}>
                  <ControlLabel>
                    <Checkbox
                      checked={this.state.stanceChecked}
                      onChange={this.setStanceChecked} >
                        Stance
                    </Checkbox>
                  </ControlLabel>
                </Col>
                <Col xs={1}>
                    <Checkbox
                      disabled={!this.state.stanceChecked}
                      value={0}
                      checked={_.indexOf(this.state.includeStances, 0) > -1}
                      onChange={this.onStanceChecked} >
                        Normal
                    </Checkbox>
                </Col>
                <Col xs={1}>
                    <Checkbox
                      disabled={!this.state.stanceChecked}
                      value={1}
                      checked={_.indexOf(this.state.includeStances, 1) > -1}
                      onChange={this.onStanceChecked} >
                        Fort
                    </Checkbox>
                </Col>
                <Col xs={1}>
                    <Checkbox
                      disabled={!this.state.stanceChecked}
                      value={2}
                      checked={_.indexOf(this.state.includeStances, 2) > -1}
                      onChange={this.onStanceChecked} >
                        War
                    </Checkbox>
                </Col>
                <Col xs={1}>
                    <Checkbox
                      disabled={!this.state.stanceChecked}
                      value={3}
                      checked={_.indexOf(this.state.includeStances, 3) > -1}
                      onChange={this.onStanceChecked} >
                        Aggressive
                    </Checkbox>
                </Col>
              </FormGroup>
            </Row>
        </div>
          </Collapse>
      </Navbar>
    );
  }
}
