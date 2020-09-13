import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setLogOut } from '../actions/account'
import MasterLayout from '../components/layout/MasterLayout'
import {DashboardSkeleton} from '../components/common/Skeletons'

const DashboardPage = ({ children, logOut, ...rest }) => {
  const items = [
    {
      title: 'Dashboard',
      route: '/',
      subcontent: []
    },
    {
      title: 'Queries',
      route: '/queries',
      subcontent: [{ title:'Management', route: '/queries/management'}, { title:'Access', route: '/queries/access'}]
    },
    {
      title: 'Users',
      route: '/users',
      subcontent: [{ title:'Users Management', route: '/users/management'}, { title:'Users Access', route: '/users/access'}]
    }
  ]
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])
  return (
    <MasterLayout 
      loading={loading}
      menuItems={items}
      render={
        ({ user }) => (
            <DashboardSkeleton items={5}/>
        )} 
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