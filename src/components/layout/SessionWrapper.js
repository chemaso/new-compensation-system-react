import React, { useEffect, useState, useContext } from 'react';
import { get, isEmpty } from 'lodash'
import { useHistory } from "react-router-dom";
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from '../../hooks/user'
import {setExpiredSession} from '../../actions/account'
import ExpirationModal from '../common/ExpiratonModal'
import { PersistorContext } from '../../context/persistorContext'

export const SessionWrapper = ({ children }) => {
    const [counter, setCounter] = useState(time)
    const history = useHistory()
    const { purge } = useContext(PersistorContext)
    console.log(purge, history)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    let user = useSelector(state => get(state, 'account.user', '{}'))
    const isAuth = !isEmpty(user)
    const { decrypt } = useAccount()
    if (isAuth) {
      user = decrypt(user)
    }

    useEffect(() => {
        const current = moment()
        const expiresIn = (moment(user.expires).diff(current, 'seconds') - 60) * 1000 
        //const isExpired = moment(user.expires).unix() < current.unix()
        if (!isEmpty(user)) {
            setTimeout(() => setOpen(true), expiresIn)
        }
    }, [user])

    const current = moment()
    const time = moment(user.expires).diff(current, 'seconds')

    useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter])
    return (
        <ExpirationModal time={time} open={open} handleModal={setOpen} />
    )
}
