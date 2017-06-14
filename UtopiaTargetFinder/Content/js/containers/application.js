import React from 'react';
import PropTypes from 'prop-types';

const Application = ({ children }) =>
  (
    <div>
      {children}
    </div>
  );
Application.propTypes = {
  children: PropTypes.object.isRequired
};

export default Application;
