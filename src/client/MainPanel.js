import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { update } from './actionCreators';
import Panel from './Panel';


const mapStateToProps = (state /*, ownProps */ ) => {
  return {
    values: state
  }
}

const mapDispatchToProps = (dispatch /*, ownProps */ ) => {
  return {
    onClick: () => {
      dispatch(update())
    }
  }
}

const MainPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel)

export default MainPanel
