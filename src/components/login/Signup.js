import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Grid, TextField, Button, Typography,ButtonGroup } from '@material-ui/core';
import {backEndProURL} from '../../api/ApiData'
import {useDispatch, useSelector} from 'react-redux'

import {handleSignUp} from '../../actions/users'


const Signup = () => {

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages)

    const [signUp, setSignUp ] =useState({userName: '', userEmail: '', password: ''})
    const [error, setError] = useState(null)

    useEffect(() => {
        
        setError(messages.error)
    }, [messages])

    const handleSignUp1 = () =>{
        dispatch(handleSignUp(signUp.userName, signUp.userEmail, signUp.password))
    }


    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography style={{margin:"10px"}} color="primary">Sign Up</Typography>
            <TextField label="UserName" value={signUp.userName} onChange={(e)=>setSignUp({...signUp, userName: e.target.value})} style={{margin:"10px"}} color="primary" type="text" variant="outlined" placeholder="UserName"/>
            <TextField label="Email" value={signUp.userEmail} onChange={(e)=>setSignUp({...signUp, userEmail: e.target.value})} style={{margin:"10px"}} color="primary" type="email" variant="outlined" placeholder="Email"/>
            <TextField label="Password" value={signUp.password} onChange={(e)=>setSignUp({...signUp, password: e.target.value})} style={{margin:"10px"}} color="primary" type="password" variant="outlined" placeholder="Password"/>
            {
                error && <Typography color="secondary">{error}</Typography>
            }
            <ButtonGroup>
                <Button color="primary" variant="outlined" onClick={handleSignUp1}>SignUp</Button>
                <Button color="primary" variant="outlined">
                    <Link style={{textDecoration:"none"}} to="/">Back</Link>
                </Button>
            </ButtonGroup>
            <Button style={{margin:"10px"}} type="a" href={`${backEndProURL}/connect/google`} color="primary" variant="outlined">Google</Button>

        </Grid>
    )
}

export default Signup
