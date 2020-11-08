import React, { useEffect, useState, useContext } from 'react';
import { get, isEmpty, isNil } from 'lodash'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from '../../hooks/user'
import { setExpiredSession, setRefreshToken, setAlreadyExpired } from '../../actions/account'
import ExpirationModal from '../common/ExpiratonModal'
import { PersistorContext } from '../../context/persistorContext'
import {
  useHistory,
} from "react-router-dom";

export const SessionWrapper = () => {
  const [counter, setCounter] = useState('')
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    let user = useSelector(state => get(state, 'account.user', '{}'))
    const isAuth = !isEmpty(user)
    const { decrypt } = useAccount()
    if (isAuth) {
      user = decrypt(user)
    }

    const { purge } = useContext(PersistorContext)
    useEffect(() => {
        const current = moment()

        // If is null the expires will be far enought to not show the modal
        
        const expiresValue = isNil(user.expires) ? moment().endOf('year').format() : user.expires

        const expiresIn = (moment(expiresValue).diff(current, 'seconds') - 60) * 1000 
        const isExpired = moment(expiresValue).unix() <= current.unix()

        // Set the initial count down value
        if (counter === '') {
          setCounter(moment(expiresValue).diff(current, 'seconds')) 
        }

        // Set expiration modal

        if (!isNil(user.id) && !open) {
            setTimeout(() => setOpen(true), expiresIn)
        }

        // Purge session an return to login

        if (open && isExpired) {
          dispatch(setAlreadyExpired(purge, history, setOpen))
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
      if (open && counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter, open])
    const handleModal = (value) => {
      if (value === 'out') {
        dispatch(setExpiredSession(purge, user, setOpen))
      }
      if (value === 'continue') {
        dispatch(setRefreshToken(user, setOpen))
      }
    }
    return (
        <ExpirationModal time={counter} open={open} handleModal={handleModal} />
    )
}
