import React,{useState,useEffect} from 'react'
import {Typography, Grid} from '@material-ui/core';
import {frontEndProURL} from '../../api/ApiData'

import { GamePage } from './GamePage';

const BodyPage = () => {

    const [message, setMessage] = useState(null)

    useEffect(async() => {
      await setTimeout(() => {
        setMessage(null)
      }, 3000);
    }, [setMessage,message])

    return (
        <>
              <Grid container justify="center">

                <Grid item> 
                  { message && <Typography style={{fontSize:'25px', marginTop:'10px'}} color="secondary">{message}</Typography>} 
                </Grid>
              </Grid>
              

              <Grid container spacing={3} justify="center">
                
                <GamePage content={{
                  title:'Tetris',
                  subtitle:'game 1',
                  content1:'well it is a good game have fun',
                  content2:'hope you get high score',
                  author:'jinzhu',
                  href: `${frontEndProURL}/tetris`,
                  levels: ['/'],
                  setMessage
                  }}/>

                <GamePage content={{
                  title:'Memory',
                  subtitle:'game 2',
                  content1:'Share your memory to others',
                  content2:'it is interesting it need level 2 or 3',
                  author:'jinzhu',
                  href: `${frontEndProURL}/memory`,
                  levels:['level 2', 'level 3'],
                  setMessage}}/>

                <GamePage content={{
                  title:'Movie',
                  subtitle:'game 3',
                  content1:'many movies',
                  content2:'you can search moives.',
                  author:'jinzhu',
                  href: `${frontEndProURL}/movie`,
                  levels:['/'],
                  setMessage}}/>
                  
                  <GamePage content={{
                  title:'Shop',
                  subtitle:'game 4',
                  content1:'It is time to shop',
                  content2:'I am woring in it. it need level 3',
                  author:'jinzhu',
                  href: `${frontEndProURL}/shop`,
                  levels:['level 3'],
                  setMessage}}/>

              </Grid>
        </>
    )
}

export default BodyPage
