import React, { useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import omit from 'lodash/omit'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { useErrorValidator } from '../hooks/externalAccountValidations'
import PasswordRecovery from '../components/account/PasswordRecovery'
import ExternalAccountWrapper from '../components/account/ExternalAccountWrapper'
import { setPasswordRecovery } from '../actions/account'
import Helmet from '../components/common/Helmet'

const PasswordRecoveryPage = ({ getPasswordRecovery, history }) => {
  const [formValues, setFormValues] = useState({})

  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFormChange = (e) => {
    setFormValues({
      ...omit(formValues, [e.target.name]),
      [e.target.name]: e.target.value,
    })
  }
  const required = ['email']
  const { validator } = useErrorValidator(formValues, required)
  const handleSubmit = () => {
    const errorValues = validator()
    setErrors(errorValues)
    if (isEmpty(errorValues)) {
      setLoading(true)
      getPasswordRecovery(formValues, history)
        .then(() => setLoading(false))

    }
  }
  return (
    <ExternalAccountWrapper title='Welcome to SICE' >
      <Helmet title="Reset Password" />
      <PasswordRecovery
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        errors={errors}
        formValues={formValues}
        loading={loading} />
    </ExternalAccountWrapper>
  );
}

const mapStateToProps = (state) => ({
  newUser: get(state, 'account.newUser.success', ''),
})


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getPasswordRecovery: setPasswordRecovery
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecoveryPage)