import React, { PropTypes } from 'react';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Collapse
} from 'react-bootstrap';


export default class ProvinceFinder extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }
  state = {
    myNwChecked: true,
    myKdNwChecked: false,
    provLow: 0.85,
    provHigh: 1.10,
    kdLow: 0.50,
    kdHigh: 0.90
  }

  setMyNwChecked = event => {
    this.setState({ myNwChecked: event.target.checked });
  }

  setProvLow = event => {
    console.log(event.target.value);
    this.setState({ provLow: event.target.value });
  }

  setProvHigh = event => {
    this.setState({ provHigh: event.target.value });
  }

  setMyKdNwChecked = event => {
    this.setState({ myKdNwChecked: event.target.checked });
  }

  setKdLow = event => {
    this.setState({ kdLow: event.target.value });
  }

  setKdHigh = event => {
    this.setState({ kdHigh: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="side-panel-header">
          Province
        </div>
        <div>
          <Checkbox
            disabled
            checked={this.state.myNwChecked}
            onChange={this.setMyNwChecked} >
              Use My Networth Range
          </Checkbox>
          <Collapse in={this.state.myNwChecked}>
          <div>
            <FormGroup>
              <ControlLabel>My Networth</ControlLabel>
              <FormControl type="number" value={1} />
            </FormGroup>
            <Row>
              <Col xs={2}>
                <ControlLabel>Low: </ControlLabel>
              </Col>
              <Col xs={4}>
                <FormControl
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={this.state.provLow}
                  onChange={this.setProvLow} />
              </Col>
              <Col xs={2}>
                <ControlLabel>High: </ControlLabel>
              </Col>
              <Col xs={4}>
                <FormControl
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={this.state.provHigh}
                  onChange={this.setProvHigh} />
              </Col>
            </Row>
            </div>
          </Collapse>
          <hr />

          <Checkbox
            checked={this.state.myKdNwChecked}
            onChange={this.setMyKdNwChecked} >
              Use Kingdom Networth Range
          </Checkbox>
          <Collapse in={this.state.myKdNwChecked}>
          <div>
            <FormGroup>
              <ControlLabel>My Kingdom's Networth</ControlLabel>
              <FormControl type="number" value={1} />
            </FormGroup>
            <Row>
              <Col xs={2}>
                <ControlLabel>Low: </ControlLabel>
              </Col>
              <Col xs={4}>
                <FormControl
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={this.state.kdLow}
                  onChange={this.setKdLow} />
              </Col>
              <Col xs={2}>
                <ControlLabel>High: </ControlLabel>
              </Col>
              <Col xs={4}>
                <FormControl
                  min={0}
                  max={1}
                  step={0.01}
                  type="number"
                  value={this.state.kdHigh}
                  onChange={this.setKdHigh} />
              </Col>
            </Row>
            </div>
          </Collapse>
          <hr />
        </div>
      </div>
    );
  }

}
