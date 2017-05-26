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
    headerOpen: PropTypes.bool,
    raceTypes: PropTypes.object,
    stanceTypes: PropTypes.object
  }
  state = {
    myNwChecked: true,
    myKdNwChecked: false,
    stanceChecked: false,
    raceChecked: false,
    myNw: 200,
    myKdNw: 5000,
    provLow: 0.85,
    provHigh: 1.10,
    kdLow: 0.50,
    kdHigh: 0.90,
    includeStances: Array(1).fill(0),
    includeRaces: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  }

  setInputValue = event => {
    let value;
    if (event.target.type === 'number') value = event.target.value;
    if (event.target.type === 'checkbox') value = event.target.checked;

    this.setState({ [event.target.name]: value }, this.sendFilterInfo);
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

  onRaceChecked = event => {
    const currentList = this.state.includeRaces;
    const value = parseInt(event.target.value, 10);
    if (event.target.checked) {
      currentList.push(value);
    } else {
      _.remove(currentList, val => val === value);
    }
    this.setState({ includeRaces: currentList }, this.sendFilterInfo);
  }

  getStanceRow = () => {
    const { stanceTypes } = this.props;
    const stanceCheckBoxes =
      _.map(stanceTypes, (intValue, name) =>
        (
          <Col key={`${name}${intValue}`} xs={1}>
            <Checkbox
              disabled={!this.state.stanceChecked}
              value={intValue}
              checked={_.indexOf(this.state.includeStances, intValue) > -1}
              onChange={this.onStanceChecked} >
                {name}
            </Checkbox>
          </Col>
        )
      );

    return (
      <Row className="stance-row">
        <FormGroup>
          <Col xs={1}>
            <ControlLabel>
              <Checkbox
                name="stanceChecked"
                checked={this.state.stanceChecked}
                onChange={this.setInputValue} >
                  Stance
              </Checkbox>
            </ControlLabel>
          </Col>
          {stanceCheckBoxes}
        </FormGroup>
      </Row>
    );
  }

  getRaceRow = () => {
    const { raceTypes } = this.props;
    const raceCheckBoxes =
      _.map(raceTypes, (intValue, name) =>
        (
          <Col key={`${name}${intValue}`} xs={1}>
            <Checkbox
              disabled={!this.state.raceChecked}
              value={intValue}
              checked={_.indexOf(this.state.includeRaces, intValue) > -1}
              onChange={this.onRaceChecked} >
                {name}
            </Checkbox>
          </Col>
        )
      );

    return (
      <Row>
        <FormGroup>
          <Col xs={1}>
            <ControlLabel>
              <Checkbox
                name="raceChecked"
                checked={this.state.raceChecked}
                onChange={this.setInputValue} >
                  Race
              </Checkbox>
            </ControlLabel>
          </Col>
          {raceCheckBoxes}
        </FormGroup>
      </Row>
      );
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect className="application-header">
          <span onClick={this.setCollapseHeader} className="filter-collapse">
            <span className="glyphicon glyphicon-menu-down" /> Filters
          </span>
          <Collapse in={this.props.headerOpen}>
        <div>
            {/* MY Networth */}
            <Row>
            <FormGroup>
              <Col xs={1}>
              <ControlLabel>
                <Checkbox
                  name="myNwChecked"
                  checked={this.state.myNwChecked}
                  onChange={this.setInputValue} >
                    My NW (k)
                </Checkbox>
              </ControlLabel>
              </Col>
              <Col xs={3} lg={2}>
                <FormControl
                  disabled={!this.state.myNwChecked}
                  bsSize="sm"
                  type="number"
                  name="myNw"
                  value={this.state.myNw}
                  onChange={this.setInputValue} />
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
                  name="provLow"
                  value={this.state.provLow}
                  onChange={this.setInputValue} />
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
                  max={1.3}
                  step={0.01}
                  name="provHigh"
                  value={this.state.provHigh}
                  onChange={this.setInputValue} />
              </Col>
            </FormGroup>
            </Row>

            {/* Kingdom Networth */}
            <Row>
              <FormGroup>
                <Col xs={1}>
                <ControlLabel>
                  <Checkbox
                    name="myKdNwChecked"
                    checked={this.state.myKdNwChecked}
                    onChange={this.setInputValue} >
                      KD NW (k)
                  </Checkbox>
                </ControlLabel>
                </Col>
                <Col xs={3}>
                  <FormControl
                    disabled={!this.state.myKdNwChecked}
                    bsSize="sm"
                    type="number"
                    name="myKdNw"
                    value={this.state.myKdNw}
                    onChange={this.setInputValue} />
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
                    name="kdLow"
                    value={this.state.kdLow}
                    onChange={this.setInputValue} />
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
                    name="kdHigh"
                    value={this.state.kdHigh}
                    onChange={this.setInputValue} />
                </Col>
              </FormGroup>
            </Row>
            {this.getStanceRow()}
            {this.getRaceRow()}
        </div>
          </Collapse>
      </Navbar>
    );
  }
}
