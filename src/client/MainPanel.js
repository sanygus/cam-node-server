import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { update, save } from './actionCreators';
import Panel from './components/Panel';


const mapStateToProps = (state /*, ownProps */ ) => {
  return {
    values: state
  }
}

const mapDispatchToProps = (dispatch /*, ownProps */ ) => {
  return {
    updateData: () => {
      dispatch(update())
    },
    saveSettngs: (type, value) => {
      dispatch(save(type, value))
    },
  }
}

const MainPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel)

export default MainPanel
