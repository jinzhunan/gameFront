import React,{useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Grid, TextField, Button, Typography,ButtonGroup } from '@material-ui/core';
import {backEndProURL, frontEndProURL} from '../api/ApiData'



const Signin = () => {

    const [logInUser, setLogInUser ] =useState({userEmail: '', password: ''})
    const [error, setError] = useState(null)

    const handleLocalLogIn = async (e) =>{
        e.preventDefault()
        try {
            const {data} = await axios.post(`${backEndProURL}/auth/local`, {
            identifier: logInUser.userEmail,
            password: logInUser.password
            });

            // set localstorage
            data && localStorage.setItem('jwt', data.jwt)
            data && localStorage.setItem('userName', data.user.username)
            data && localStorage.setItem('userRole', data.user.role.name)
            data && localStorage.setItem('userId', data.user.id)
            
            window.location.href = frontEndProURL
        } catch (error) {
            setError('wrong password or email')
        }
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
                <Button onClick={handleLocalLogIn} color="primary" variant="outlined">SignIn</Button>
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
