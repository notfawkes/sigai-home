import React from 'react';
import PropTypes from 'prop-types';

class CubeErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Cube rendering failed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="cube-error">Unable to load 3D content</div>;
    }

    return this.props.children;
  }
}

CubeErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default CubeErrorBoundary;