import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class HelloWorld extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  render() {
    return (<div>Hello World</div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorld);
