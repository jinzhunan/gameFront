import React,{useState,useEffect} from 'react'

import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';

import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import { Link }from 'react-router-dom'
import {setUsers, clearUsers, getGoogleJwt} from '../../actions/users'



const HeaderPage = () => {

  const users = useSelector((state) => state.users)

  const [jwt, setJwt] = useState(users.jwt)
  const [user, setUser] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch();


  useEffect(()=>{
    // setUser({userId: users.userId, userName: users.userName, userRole: users.userRole})
    users.userId ? setIsLogin(true) : setIsLogin(false)
  },[users])


    useEffect(() => {
      const getJwt = async()=>{
        const googleIdToken = window.location.href.split('id_token=')[1]
        if(googleIdToken){
          dispatch(getGoogleJwt(googleIdToken))
          setIsLogin(true)
        }
        if(jwt){
          getLocalJwt()
          setIsLogin(true)
        }

        
      }
      getJwt()
      console.log(users)
    }, [])


    const getLocalJwt = () =>{
      dispatch(setUsers(jwt));
    }

    const handleLogout = async () =>{
      dispatch(clearUsers())
      setIsLogin(false)
    }


    return (
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    edge="start"
                    style={{color:'white'}}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography  variant="h6" noWrap>
                    Game Fun
                  </Typography>
                  <div style={{flexGrow: 1}}>
                    {
                      isLogin ? <div style={{float: "right"}}>
                                <IconButton onClick={handleLogout} style={{color:'white'}}>
                                  <ExitToApp />
                                </IconButton>
                                <IconButton component={Link} to="/profile" edge="end" style={{color:'white'}}>
                                  <AccountCircle />
                                </IconButton>
                                </div> : <div style={{float: "right"}}>
                                  <Typography  component={Link} to="/signin" style={{color:'white', textDecoration: 'none', cursor: 'pointer', paddingTop: '5px', paddingLeft: '7px'}} variant="h6" noWrap>
                                    Sign in
                                  </Typography>
                                </div>    
                    }
                  </div>
                </Toolbar>
              </AppBar>
    )
}

export default HeaderPage
