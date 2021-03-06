import React, { useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import { useErrorValidator } from '../hooks/externalAccountValidations'
import LoginForm from '../components/account/LoginForm'
import ExternalAccountWrapper from '../components/account/ExternalAccountWrapper'
import Helmet from '../components/common/Helmet'
import { setLoggedIn } from '../actions/account'
import { t } from '../i18n'

const LoginPage = ({ getLogin, history, match }) => {
  const [formValues, setFormValues] = useState({})
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFormChange = (e) => {
    setFormValues({
      ...omit(formValues, [e.target.name]),
      [e.target.name]: e.target.value,
    })
  }
  const required = ['userName', 'password']
  const { validator } = useErrorValidator(formValues, required)

  const handleSubmit = () => {
    const errorValues = validator()
    setErrors(errorValues)
    if (isEmpty(errorValues)) {
      setLoading(true)
      getLogin(formValues, history)
        .then((val) => 
          setLoading(false)
        )

    }
  }
  return (
    <ExternalAccountWrapper title={t('login.title', "Welcome to SICE")} >
      <Helmet title="Login" />
      <LoginForm
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        errors={errors}
        formValues={formValues}
        loading={loading} />
    </ExternalAccountWrapper>
  );
}

const mapStateToProps = (state) => ({
  account: state.account,
})


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getLogin: setLoggedIn
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)