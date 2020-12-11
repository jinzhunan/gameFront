import React,{useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Grid, TextField, Button, Typography,ButtonGroup } from '@material-ui/core';
import {backEndProURL} from '../api/ApiData'


const Reset = () => {

    const [password, setPassword] =useState('')
    const [message, setMessage] = useState('')

    const handleResetPassword = async (e) =>{
        const currentCode = window.location.href.split('code=')[1]
        try {
            const newData = await axios.post(`${backEndProURL}/auth/reset-password`, {
                "password": password,
                "passwordConfirmation": password,
                "code": currentCode
              });
              console.log(newData)
              // set localstorage
              newData && localStorage.setItem('jwt', newData.data.jwt)
              newData && localStorage.setItem('userName', newData.data.user.username)
              newData && localStorage.setItem('userRole', newData.data.user.role.name)
              newData && localStorage.setItem('userId', newData.data.user.id)
      
              setMessage('password already changed')
        } catch (error) {
            setMessage(error.response.data.message[0].messages[0].message)
        }

      }
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography style={{margin:"10px"}} color="primary">Forget Password</Typography>
            <TextField label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{margin:"10px"}} color="primary" type="password" variant="outlined" placeholder="Password"/>
            {
                message && <Typography  style={{color:'green', margin: '5px'}}>{message}</Typography>
            }
            <ButtonGroup>
                <Button onClick={handleResetPassword} color="primary" variant="outlined">New Password</Button>
                <Button color="primary" variant="outlined">
                    <Link to="/signin" style={{textDecoration: 'none'}}>back</Link>
                </Button>
            </ButtonGroup>

        </Grid>
    )
}

export default Reset
