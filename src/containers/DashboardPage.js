import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setLogOut } from '../actions/account'
import MasterLayout from '../components/layout/MasterLayout'

const DashboardPage = ({ children, logOut, ...rest }) => {
  return (
    <MasterLayout 
      render={
        ({ user }) => <p>Render Props {user.name}</p>} 
       />
  );
}

const mapStateToProps = (state) => ({
  account: state.account,
})


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logOut: setLogOut
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)