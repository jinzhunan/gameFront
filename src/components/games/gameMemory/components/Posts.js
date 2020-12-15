import React,{useState, useEffect} from 'react'
import axios from 'axios'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import AudioIcon from '@material-ui/icons/MusicVideo';
import VideoIcon from '@material-ui/icons/PersonalVideo';
import ImageIcon from '@material-ui/icons/Image';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CircularProgress from '@material-ui/core/CircularProgress';
import red from '@material-ui/core/colors/red';
import lightBlues from '@material-ui/core/colors/lightBlue';
import grey from '@material-ui/core/colors/grey';
import moment from 'moment';
import {backEndProURL} from '../../../../api/ApiData'


import {Card, CardHeader, Avatar, CardMedia, CardContent, Typography} from '@material-ui/core'



const Posts = (props) => {

    const [myfiles, setMyfiles] = useState(null)
    const [myfiles1, setMyfiles1] = useState(null)

    const [checkedImg, setCheckedImg] = useState(true);
    const [checkedVid, setCheckedVid] = useState(false);
    const [checkedAudio, setCheckedAudio] = useState(false);

    useEffect(()=>{
        getData()

    },[])

    useEffect(()=>{
        if(checkedImg && myfiles){
            const fetchData = async ()=>{

                const dataImg = myfiles.map((item)=> item.cover.mime.includes('image') ? item : undefined)
                    .filter((item2)=> item2 !== undefined)
                setMyfiles1(dataImg)

            }
            fetchData()
        }
        if(checkedVid && myfiles){
            const fetchData = async ()=>{

                const dataVid = myfiles.map((item)=> item.cover.mime.includes('video') ? item : undefined)
                    .filter((item2)=> item2 !== undefined)
                setMyfiles1(dataVid)
                console.log(dataVid)
            }
            fetchData()
        }
        if(checkedAudio && myfiles){
            const fetchData = async ()=>{

                const dataAud = myfiles.map((item)=> item.cover.mime.includes('audio') ? item : undefined)
                    .filter((item2)=> item2 !== undefined)
                setMyfiles1(dataAud)
            }
            fetchData()
        }

    },[checkedImg,checkedVid,checkedAudio,myfiles,setMyfiles])
    
    useEffect(()=>{

        if(props.loading===true){
            setCheckedImg(false)
            setCheckedVid(false)
            setCheckedAudio(false)
        }else{
            getData()
            setCheckedImg(true)
            setCheckedVid(false)
            setCheckedAudio(false)
        }
    },[props.loading])

    const getData = async () =>{
        const {data} = await axios.get(`${backEndProURL}/memory-games`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        setMyfiles(data)
    }

    return (
        <div>
        <FormGroup style={{backgroundColor: grey[50], marginBottom: '10px', borderRadius: '5px'}} row>
            <Grid  container>
                <Grid item xs={4}>
                        <FormControlLabel 
                            control={
                                <Checkbox
                                checked={checkedImg}
                                onChange={(e)=>{
                                    setCheckedImg(true)
                                    setCheckedVid(false)
                                    setCheckedAudio(false)
                                }}
                                icon={<ImageIcon />}
                                checkedIcon={<ImageIcon/>}
                            />
                            }
                            label="Image"   
                        />
                    </Grid>
                <Grid item xs={4}>
                        <FormControlLabel 
                        control={
                            <Checkbox
                            checked={checkedVid}
                            onChange={(e)=>{
                                setCheckedVid(true)
                                setCheckedImg(false)
                                setCheckedAudio(false)
                            }}
                            icon={<VideoIcon />}
                            checkedIcon={<VideoIcon/>}
                        />
                        }
                        label="Video"   
                        />
                    </Grid>
                <Grid item xs={4}>
                        <FormControlLabel 
                        control={
                            <Checkbox
                            checked={checkedAudio}
                            onChange={(e)=>{
                                setCheckedAudio(true)
                                setCheckedVid(false)
                                setCheckedImg(false)
                            }}
                            icon={<AudioIcon />}
                            checkedIcon={<AudioIcon/>}
                        />
                        }
                        label="Audio"   
                        />
                    </Grid>
            </Grid>
        </FormGroup>
        
        {
            props.loading ? <CircularProgress /> : (
            <Grid container spacing={2}>
                {
                    myfiles1 ? myfiles1.map((item)=>
                    
                    <Grid key={item.id} item xs={12} sm={12} md={6} >
                            
                        
                        <Card >
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe">
                                {item.creator}
                                {/* {item.creator.slice(0,1)} */}
                            </Avatar>
                            }
                            action={
                                
                                <IconButton >
                                    <FavoriteIcon />
                                </IconButton>
                                
                            }
                            title={item.title}
                            // title={item.title.slice(0,10)}
                            subheader={
                                <Typography color="textSecondary" variant="body2">{moment(item.createdAt).fromNow()}</Typography>
                            }
                        />
                        {
  
                                // <img src={item.cover.previewUrl}/>
                                !item.cover2 ? 
                                <CardMedia
                                image={item.cover.previewUrl ? item.cover.previewUrl : item.cover.url}
                                style={{
                                        height: 0,
                                        paddingTop: '56.25%', // 16:9
                                }}
                                onClick={()=>{
                                    window.open(`${item.cover.url}`, '_blank')
                                }}
                                /> :
                                <CardMedia
                                image={item.cover2.url}
                                style={{
                                        height: 0,
                                        paddingTop: '56.25%', // 16:9
                                }}
                                onClick={()=>{
                                    window.open(`${item.cover.url}`, '_blank')
                                }}
                                />
                        }
                        <CardContent>
                        <><Typography component='span' onClick={async ()=>{ 
                            
                                        
                                            await axios.delete(`${backEndProURL}/memory-games/${item.id}`,{
                                                headers:{
                                                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                                                }
                                            }) 
                                            await axios.delete(`${backEndProURL}/upload/files/${item.cover.id}`,{
                                                headers:{
                                                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                                                }
                                            }) 
                                            if(item.cover2){
                                                await axios.delete(`${backEndProURL}/upload/files/${item.cover2.id}`,{
                                                    headers:{
                                                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                                                    }
                                                })
                                            }
                                            getData()
                                            setCheckedAudio(false)
                                            setCheckedVid(false)
                                            setCheckedImg(true)
                                        }}
                                        style={{
                                            color: red[500],
                                            cursor: 'pointer'
                                        }}
                                        >delete&nbsp;&nbsp;</Typography>
                                        <Typography 
                                            component="span"
                                            onClick={async()=>{
                                            const oldpost = await axios.get(`${backEndProURL}/memory-games/${item.id}`,{
                                                headers:{
                                                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                                                }
                                            })
                                            console.log('oldpost')
                                            console.log(oldpost.data)
                                            props.setEditPost(oldpost.data)
                                        }}
                                        style={{
                                            color: lightBlues[500],
                                            cursor: 'pointer',
                                            float: 'right'
                                        }}
                                        > edit</Typography></>

                            <Typography 
                                    onClick={()=>{
                                    window.open(`${item.cover.url}`, '_blank')
                                }} variant="body2" color="textSecondary" component="p">
                                creator: {item.creator}
                               <br/>
                                message: {item.content}
                                
                            </Typography> 
                        </CardContent>
        
        
                    </Card>
                    </Grid>
                    ): <div>refresh or you need raise your level</div>
                }
                </Grid> )
            
        }
        
        </div>
    )
}

export default Posts
