import React,{useState,useEffect} from 'react'
import './style.css'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToApp from '@material-ui/icons/ExitToApp';

import axios from 'axios'
import {Link }from 'react-router-dom'
import {backEndProURL} from '../api/ApiData'


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '50%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },

  }));

const IndexHome = () => {

  const [jwt, setJwt] = useState(localStorage.getItem('jwt'))
  const [user, setUser] = useState({name: localStorage.getItem('userName'), role: localStorage.getItem('userRole'), id: localStorage.getItem('userId')})
  const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
     
      getJwt()

    }, [])

    const getJwt = async () =>{

      const currentJwt = window.location.href.split('id_token=')[1]
      // signIn with Google
      if(currentJwt){
        try {
          var userData1 =  await axios.get(`${backEndProURL}/auth/google/callback?id_token=${currentJwt}`)
          console.log(userData1)

          // set localstorage
          userData1 && localStorage.setItem('jwt', userData1.data.jwt)
          userData1 && localStorage.setItem('userName', userData1.data.user.username)
          userData1 && localStorage.setItem('userRole', userData1.data.user.role.name)
          userData1 && localStorage.setItem('userId', userData1.data.user.id)

          // set new data
          setJwt(localStorage.getItem('jwt'))
          setUser({name: localStorage.getItem('userName'), role: localStorage.getItem('userRole'), id: localStorage.getItem('userId')})
          
          userData1 && setIsLogin(true)
        } catch (error) {
          console.log(error)
        }
      }
      if(localStorage.getItem('jwt')){

        const jwt = localStorage.getItem('jwt')
        // set new data
        setJwt(jwt)
        try {
          const {data} = await axios.get(`${backEndProURL}/users/me`,{
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          })
          data && localStorage.setItem('userName', data.username)
          data && localStorage.setItem('userRole', data.role.name)
          data && localStorage.setItem('userId', data.id)

          setUser({name: localStorage.getItem('userName'), role: localStorage.getItem('userRole'), id: localStorage.getItem('userId')})

          setIsLogin(true)

        } catch (error) {
          console.log(error)
        }
                    
      }else{
        // setIsLogin(false)
      }


      console.log(user)
    }

    const handleLogout = async () =>{
      localStorage.clear()
      setIsLogin(false)

    }

    const classes = useStyles();
   


  

          return (
            <div className={classes.grow}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography className={classes.title} variant="h6" noWrap>
                    Game Fun
                  </Typography>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    {
                      user && <>
                              {/* <Typography style={{color:'white', textDecoration: 'none', paddingTop: '9px', paddingRight: '7px'}} variant="h6" noWrap>{user.role}</Typography> */}
                              </>
                    }


                    {
                      isLogin ? <>
                                <IconButton onClick={handleLogout} color="inherit">
                                  <ExitToApp />
                                </IconButton>
                                <Link to="/profile">
                                  <IconButton edge="end" style={{color:'white'}}>
                                    <AccountCircle />
                                  </IconButton>
                                </Link>
                                </> : 
                                <Typography component={Link} to="/signin" style={{color:'white', textDecoration: 'none', cursor: 'pointer', paddingTop: '5px', paddingLeft: '7px'}} variant="h6" noWrap>
                                  Sign in
                                </Typography>
                    }

                  </div>

                </Toolbar>
              </AppBar>
              <Link to='/about'>Game1: Tetris</Link>
            </div>
        
    )
}

export default IndexHome
