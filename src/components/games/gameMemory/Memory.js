import React, {useState,useEffect} from 'react'
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'

import Form from './components/Form'
import Posts1 from './components/Posts'
import useStyles from './styles'

const Memory = () =>{
    const classes = useStyles();


    const [loading, setLoading ] = useState({loading:false, type: 'image'})
    const [editPost, setEditPost ] = useState(null)

    useEffect(()=>{
        console.log(loading)
    },[loading])

    return(
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h4" align="center">
                    Memories
                </Typography>
                
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts1 loading={loading} setLoading={setLoading} setEditPost={setEditPost}/>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Form  editPost={editPost}  setLoading={setLoading} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default Memory