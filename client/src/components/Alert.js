import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Loading from "./Loading";
import Toast from './Toast';

const Alert = () =>{
    const {auth, alert} = useSelector(state => state)
    const dispatch = useDispatch();

    const close = () =>{
        dispatch({
            type:"ALERT",
            payload:{}
        })
    }

    return(
        <div>
            {alert.loading && <Loading/>}
            {alert.error && <Toast msg={{title:"Error" ,  body:alert.error}} bgColor="rgb(222, 149, 162)"
            handleShow={close} />}
            {alert.success && <Toast msg={{title:"Success", body:alert.success}} bgColor="rgb(177, 222, 149)"
            handleShow={close} />}
            
        </div>
    )
}

export default Alert;