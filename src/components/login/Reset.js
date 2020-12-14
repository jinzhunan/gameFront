import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Grid, TextField, Button, Typography,ButtonGroup } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'

import {handleResetPassword} from '../../actions/users'

const Reset = () => {

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages)

    const [password, setPassword] =useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        setMessage(messages.error)
    }, [messages])

    const handleResetPassword1 = () =>{
        dispatch(handleResetPassword(password))
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography style={{margin:"10px"}} color="primary">Forget Password</Typography>
            <TextField label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{margin:"10px"}} color="primary" type="password" variant="outlined" placeholder="Password"/>
            {
                message && <Typography  style={{color:'red', margin: '5px'}}>{message}</Typography>
            }
            <ButtonGroup>
                <Button onClick={handleResetPassword1} color="primary" variant="outlined">New Password</Button>
                <Button color="primary" variant="outlined">
                    <Link to="/signin" style={{textDecoration: 'none'}}>back</Link>
                </Button>
            </ButtonGroup>

        </Grid>
    )
}

export default Reset
