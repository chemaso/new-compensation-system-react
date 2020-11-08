import React, { useState } from 'react';
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import { useAccount } from '../hooks/user'
import { bindActionCreators } from 'redux'
import omit from 'lodash/omit'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { useErrorValidator } from '../hooks/externalAccountValidations'
import PasswordRecovery from '../components/account/PasswordRecovery'
import ExternalAccountWrapper from '../components/account/ExternalAccountWrapper'
import { setPasswordRecovery } from '../actions/account'
import Helmet from '../components/common/Helmet'
import { t } from '../i18n'

const PasswordRecoveryPage = ({ getPasswordRecovery, history }) => {
  const [formValues, setFormValues] = useState({})

  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  let user = useSelector(state => get(state, 'account.user', '{}'))
  const isAuth = !isEmpty(user)
  const { decrypt } = useAccount()
  if (isAuth) {
    user = decrypt(user)
  }

  const handleFormChange = (e) => {
    setFormValues({
      ...omit(formValues, [e.target.name]),
      [e.target.name]: e.target.value,
    })
  }
  const required = ['old-password', 'password', 'repeat-password']
  const { validator } = useErrorValidator(formValues, required)
  const handleSubmit = () => {
    const errorValues = validator()
    const payload = {
      username: user?.username,
      oldPassword: formValues['old-password'],
      newPassword: formValues['password'],
      confirmPassword: formValues['repeat-password'],

    }
    setErrors(errorValues)
    if (isEmpty(errorValues)) {
      setLoading(true)
      getPasswordRecovery(payload, user?.token, history)
        .then(() => setLoading(false))

    }
  }
  return (
    <ExternalAccountWrapper  title={t('login.title', "Welcome to SICE")} >
      <Helmet title={t('passwordRecovery.helmet',"Reset Password")} />
      <PasswordRecovery
        onChange={handleFormChange}
        onCancel={() => history.replace('/login')}
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