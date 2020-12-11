import React,{useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Grid, TextField, Button, Typography,ButtonGroup } from '@material-ui/core';
import {backEndProURL, frontEndProURL} from '../api/ApiData'



const Signup = () => {

    const [signUp, setSignUp ] =useState({userName: '', userEmail: '', password: ''})
    const [error, setError] = useState(null)

    const handleSignUp = async (e) =>{
        e.preventDefault()
        try {
            const {data} = await axios.post(`${backEndProURL}/auth/local/register`, {
                username: signUp.userName,
                email: signUp.userEmail,
                password: signUp.password
            });

            // set localstorage
            data && localStorage.setItem('jwt', data.jwt)
            data && localStorage.setItem('userName', data.user.username)
            data && localStorage.setItem('userRole', data.user.role.name)
            data && localStorage.setItem('userId', data.user.id)
            
            window.location.href = frontEndProURL
        } catch (error) {
            console.log(error.response.data.message)
            // setError(error.response.data.message)
            setError(error.response.data.message[0].messages[0].message)
        }

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
                <Button color="primary" variant="outlined" onClick={handleSignUp}>SignUp</Button>
                <Button color="primary" variant="outlined">
                    <Link style={{textDecoration:"none"}} to="/">Back</Link>
                </Button>
            </ButtonGroup>
            <Button style={{margin:"10px"}} type="a" href={`${backEndProURL}/connect/google`} color="primary" variant="outlined">Google</Button>

        </Grid>
    )
}

export default Signup
