import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import moment from 'moment';

import { Grid, TextField, Button, Typography,ButtonGroup } from '@material-ui/core';
import {backEndProURL} from '../api/ApiData'


const Profile = () => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>{

        getUser()
    },[])

    const getUser = async ()=>{
        try {
            const {data} = await axios.get(`${backEndProURL}/users/me`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
              }
            })
            console.log(data)
            setUser(data)
        } catch (error) {
            console.log(error)
            setError(error.response.data.message[0].messages[0].message)

        }
    }
    
    async function handleUpdateLevel(roleId) {
        try {
            await axios.put(`${backEndProURL}/users/${user.id}`,{
                "role": roleId
            },{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                  }
                })
            getUser()
        } catch (error) {
            setError(error.response.data.message[0].messages[0].message)
        }
    }

    const handleUpdateUser = async () =>{
        try {
            await axios.put(`${backEndProURL}/users/${user.id}`,{
                "username": user.username,
                "email": user.email
                },{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                  }
                })
            getUser()
        } catch (error) {
            setError(error.response.data.message[0].messages[0].message)
        }
    }
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography style={{margin:"10px"}} color="primary">Profile</Typography>
            {
                user && <>
                    <TextField label="username" value={user.username} onChange={(e)=>setUser({...user, username: e.target.value})} style={{margin:"10px"}} color="primary" type="text" variant="outlined" placeholder="UserName"/>
                    <TextField label="email" value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})} style={{margin:"10px"}} color="primary" type="email" variant="outlined" placeholder="Email"/>
                    <ButtonGroup color="primary" variant="contained">
                        <Button onClick={() => handleUpdateLevel('5fcf9251157b680017117804')}>Level 1</Button>
                        <Button onClick={() => handleUpdateLevel('5fcf9292157b680017117857')}>Level 2</Button>
                        <Button onClick={() => handleUpdateLevel('5fd2ab2f508269d1a7a8c17b')}>Level 3</Button>
                    </ButtonGroup>

                    <Typography color="secondary" variant="body1" style={{margin:'10px'}}>I am {user.role.name}</Typography>
                    <Typography color="secondary" variant="body2" style={{margin:'10px'}}>description: {user.role.name}</Typography>
                    <Typography color="primary" variant="body2" style={{margin:'10px'}}>provider: {user.provider}</Typography>
                    <Typography color="primary" variant="body2">createdAt: {moment(user.createdAt).format('YYYY/MM/DD hh:mm:ss') }</Typography>
                    <Typography color="primary" variant="body2">updatedAt: {moment(user.updatedAt).format('YYYY/MM/DD hh:mm:ss') }</Typography>

                </>
            }
            {
                error && <Typography color="secondary">{error}</Typography>
            }
            <ButtonGroup style={{margin:'10px'}}>
                <Button color="primary" variant="outlined" onClick={handleUpdateUser}>Confirm</Button>
                <Button color="primary" variant="outlined">
                    <Link style={{textDecoration:"none"}} to="/">Back</Link>
                </Button>
            </ButtonGroup>

        </Grid>
    )
}

export default Profile
