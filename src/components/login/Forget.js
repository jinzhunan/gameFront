import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Grid, TextField, Button, Typography,ButtonGroup } from '@material-ui/core';
import {handleSendEmail} from '../../actions/users'
import {useDispatch, useSelector} from 'react-redux'

const Forget = () => {

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages)

    const [email, setEmail ] =useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        
        setMessage(messages)
    }, [messages])

    const handleSendEmail1 =  () =>{
         dispatch(handleSendEmail(email))

    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography style={{margin:"10px"}} color="primary">Forget Password</Typography>
            <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{margin:"10px"}} color="primary" type="email" variant="outlined" placeholder="Email"/>
            {
                message !== null && message.error ? <Typography  style={{color:'red', margin: '5px'}}>{message.error}</Typography>: null
            }
            {
                message !== null && message.message ? <Typography  style={{color:'green', margin: '5px'}}>{message.message}</Typography>: null
            }
            <ButtonGroup>
                <Button onClick={handleSendEmail1} color="primary" variant="outlined">Send Email</Button>
                <Button color="primary" variant="outlined">
                    <Link to="/" style={{textDecoration: 'none'}}>back</Link>
                </Button>
            </ButtonGroup>

        </Grid>
    )
}

export default Forget
