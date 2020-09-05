import React, { useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import omit from 'lodash/omit'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import { useErrorValidator } from '../hooks/externalAccountValidations'
import SignUpForm from '../components/account/SignUpForm'
import ExternalAccountWrapper from '../components/account/ExternalAccountWrapper'
import { setLoggedUp } from '../actions/account'

const SignUpPage = ({ getLogedUp, history }) => {
  const [formValues, setFormValues] = useState({})

  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFormChange = (e) => {
    setFormValues({
      ...omit(formValues, [e.target.name]),
      [e.target.name]: e.target.value,
    })
  }
  const required = ['firstName', 'lastName', 'email', 'password']
  const { validator } = useErrorValidator(formValues, required)
  const handleSubmit = () => {
    const errorValues = validator()
    setErrors(errorValues)
    if (isEmpty(errorValues)) {
      setLoading(true)
      getLogedUp(formValues, history)
        .then(() => setLoading(false))

    }
  }
  return (
    <ExternalAccountWrapper title='Welcome to SICE' >
      <SignUpForm
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
    getLogedUp: setLoggedUp
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)