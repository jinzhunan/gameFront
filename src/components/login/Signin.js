import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Grid, TextField, Button, Typography,ButtonGroup } from '@material-ui/core';
import {backEndProURL} from '../../api/ApiData'
import {useDispatch, useSelector} from 'react-redux'

import {handleLocalLogIn} from '../../actions/users'


const Signin = () => {

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages)

    const [logInUser, setLogInUser ] =useState({userEmail: '', password: ''})
    const [error, setError] = useState(null)

    useEffect(() => {
        
        setError(messages.error)
    }, [messages])

    const handleLocalLogIn1 = () =>{
        dispatch(handleLocalLogIn(logInUser.userEmail, logInUser.password))
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography style={{margin:"10px"}} color="primary">Sign In</Typography>
            <TextField label="Email" value={logInUser.userEmail} onChange={(e)=>setLogInUser({...logInUser, userEmail: e.target.value})} style={{margin:"10px"}} color="primary" type="email" variant="outlined" placeholder="Email"/>
            <TextField label="Password" value={logInUser.password} onChange={(e)=>setLogInUser({...logInUser, password: e.target.value})} style={{margin:"10px"}} color="primary" type="password" variant="outlined" placeholder="Password"/>
            {
                error && <Typography color="secondary">{error}</Typography>
            }
            <ButtonGroup>
                <Button onClick={handleLocalLogIn1} color="primary" variant="outlined">SignIn</Button>
                <Button color="primary" variant="outlined">
                    <Link to="/signup" style={{textDecoration: 'none'}}>SignUp</Link>
                </Button>
            </ButtonGroup>
            <ButtonGroup style={{margin:'10px'}}>
                <Button type="a" href={`${backEndProURL}/connect/google`} color="primary" variant="outlined">Google</Button>
                <Button color="primary" variant="outlined">
                    <Link to="/" style={{textDecoration: 'none'}}>Back</Link>
                </Button>
            </ButtonGroup>
            <Link to="/forgetpassword" style={{cursor:"pointer", marginTop:"10px"}}>forget password?</Link>

        </Grid>
    )
}

export default Signin
