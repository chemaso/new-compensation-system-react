//eslint-disable

import isEmpty from 'lodash/isEmpty'

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const useErrorValidator = (formValues, required) => {
    return {
        validator: () => {
            let errorsObject = {}
            required.map((item) => {
              const str = formValues[item]
              if (item === 'password') {
                if (isEmpty(str)) {
                  errorsObject = {
                    ...errorsObject,
                    [item]: 'Password is required.'
                  }
                  return ''
                }
                if (str.length < 8) {
                  errorsObject = {
                    ...errorsObject,
                    [item]: 'Password must have at least 8 characters.'
                  }
                  return null
                }
              }
              if (item === 'email') {
                const validMail = validateEmail(str)
                if (isEmpty(str)) {
                  errorsObject = {
                    ...errorsObject,
                    [item]: 'Email is required.'
                  }
                  return null
                }
                if (!validMail) {
                  errorsObject = {
                    ...errorsObject,
                    [item]: 'The Email format is not correct.'
                  }
                  return null
                }
              }
              if (item === 'firstName') {
                if (isEmpty(str)) {
                  errorsObject = {
                    ...errorsObject,
                    [item]: 'First Name is required.'
                  }
                }
              }
              if (item === 'lastName') {
                if (isEmpty(str)) {
                  errorsObject = {
                    ...errorsObject,
                    [item]: 'Last Name is required.'
                  }
                }
              }
              return null
            })
            return errorsObject
          }
    }
}