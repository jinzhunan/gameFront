import React,{useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Grid, TextField, Button, Typography,ButtonGroup } from '@material-ui/core';
import {backEndProURL} from '../api/ApiData'

const Forget = () => {

    const [email, setEmail ] =useState('')
    const [message, setMessage] = useState('')

    const handleSendEmail = async (e) =>{
        try {
            await axios.post(`${backEndProURL}/auth/forgot-password`, {
                email: email
              });
            setMessage('please check your email')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography style={{margin:"10px"}} color="primary">Forget Password</Typography>
            <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{margin:"10px"}} color="primary" type="email" variant="outlined" placeholder="Email"/>
            {
                message && <Typography  style={{color:'green', margin: '5px'}}>{message}</Typography>
            }
            <ButtonGroup>
                <Button onClick={handleSendEmail} color="primary" variant="outlined">Send Email</Button>
                <Button color="primary" variant="outlined">
                    <Link to="/" style={{textDecoration: 'none'}}>back</Link>
                </Button>
            </ButtonGroup>

        </Grid>
    )
}

export default Forget
