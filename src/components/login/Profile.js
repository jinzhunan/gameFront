import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux'
import { Grid, TextField, Button, Typography,ButtonGroup } from '@material-ui/core';


import {setUsers, handleUpdateUser, handleUpdateLevel} from '../../actions/users'


const Profile = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users)
    const messages = useSelector((state) => state.messages)


    const [user, setUser] = useState({userName:'',email:'',userRole:'',provider:'',createdAt:'',updatedAt:''})
    const [message, setMessage] = useState(null)


    useEffect(()=>{
        if(users.jwt){
            dispatch(setUsers(users.jwt));
        }
        // console.log(users)
    },[])

    useEffect(()=>{
       setUser(users)
    },[users])

    useEffect(() => {
        console.log(messages)
        setMessage(messages.message)
    }, [messages])


    
    const handleUpdateLevel1 = (roleId)=>{
        dispatch(handleUpdateLevel(user,roleId)) 
        
    }


    const handleUpdateUser1 = () =>{
        dispatch(handleUpdateUser(user))
        setMessage('profile changed')
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography style={{margin:"10px"}} color="primary">Profile</Typography>
            {
                user.userName && <>
                    <TextField label="username" value={user.userName} onChange={(e)=>setUser({...user, userName: e.target.value})} style={{margin:"10px"}} color="primary" type="text" variant="outlined" placeholder="UserName"/>
                    <TextField label="email" disabled value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})} style={{margin:"10px"}} color="primary" type="email" variant="outlined" placeholder="Email"/>
                    {
                        message && <Typography style={{color:'green', marginBottom:'10px'}}>{message}</Typography>
                    }
     
                    <ButtonGroup color="primary" variant="contained">
                        <Button onClick={() => handleUpdateLevel1('5fcf9251157b680017117804')}>Level 1</Button>
                        <Button onClick={() => handleUpdateLevel1('5fcf9292157b680017117857')}>Level 2</Button>
                        <Button onClick={() => handleUpdateLevel1('5fd2ab2f508269d1a7a8c17b')}>Level 3</Button>
                    </ButtonGroup>

                    <Typography color="secondary" variant="body1" style={{margin:'10px'}}>I am {user.userRole}</Typography>
                    <Typography color="secondary" variant="body2" style={{margin:'10px'}}>description: {user.userRole}</Typography>
                    <Typography color="primary" variant="body2" style={{margin:'10px'}}>provider: {user.provider}</Typography>
                    <Typography color="primary" variant="body2">createdAt: {moment(user.createdAt).format('YYYY/MM/DD hh:mm:ss') }</Typography>
                    <Typography color="primary" variant="body2">updatedAt: {moment(user.updatedAt).format('YYYY/MM/DD hh:mm:ss') }</Typography>

                </>
            }
    
            <ButtonGroup style={{margin:'10px'}}>
                <Button color="primary" variant="outlined" onClick={handleUpdateUser1}>Confirm</Button>
                <Button color="primary" variant="outlined">
                    <Link style={{textDecoration:"none"}} to="/">Back</Link>
                </Button>
            </ButtonGroup>

        </Grid>
    )
}

export default Profile
