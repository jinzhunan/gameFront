
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

    const [myfiles1, setMyfiles1] = useState(null)
    const [typeOfFiles, setTypeOfFiles] = useState(null)

    const [checkedImg, setCheckedImg] = useState(props.loading.type === 'image');
    const [checkedVid, setCheckedVid] = useState(props.loading.type === 'video');
    const [checkedAudio, setCheckedAudio] = useState(props.loading.type === 'audio');

    const [deleteLoading, setDeleteLoading] = useState(false)
    const [editLoading, setEditLoading] = useState(false)

    // useEffect(()=>{


    // },[props.loading])

    useEffect(()=>{
        getData()
        if(props.loading.loading===true){

        }else{
            getData()
            console.log(props.loading.type)
            props.loading.type === 'image' && setCheckedImg(true)
            props.loading.type === 'audio' && setCheckedAudio(true)
            props.loading.type === 'video' && setCheckedVid(true)

        }
    },[])

    useEffect(()=>{
        console.log('typeOfFiles')
        console.log(typeOfFiles)
        setTimeout(()=>{
            setTypeOfFiles(typeOfFiles)
        },1000)
    },[typeOfFiles,setTypeOfFiles])

    useEffect(()=>{
        if(deleteLoading===false){
            getData()
        }
        if(editLoading===false){
            getData()
            console.log('editing3')
        }
    },[deleteLoading,editLoading])


    useEffect(()=>{
        if(props.loading.loading === true){
            setEditLoading(true)
            console.log('editing1')
        }else{
            setEditLoading(false)
            console.log('editing2')
        }
    },[props.loading.loading])


    useEffect(()=>{
        if(checkedImg && myfiles1){
            const fetchData = async ()=>{

                const dataImg = myfiles1.map((item)=> item.cover.mime.includes('image') ? item : undefined)
                    .filter((item2)=> item2 !== undefined)
                setTypeOfFiles(dataImg)
                console.log(dataImg)
                props.setLoading({loading: false, type: 'image'})
            }
            fetchData()
        }
        if(checkedVid && myfiles1){
            const fetchData = async ()=>{

                const dataVid = myfiles1.map((item)=> item.cover.mime.includes('video') ? item : undefined)
                    .filter((item2)=> item2 !== undefined)
                    setTypeOfFiles(dataVid)

                props.setLoading({loading: false, type: 'video'})
                console.log(dataVid)
            }
            fetchData()
        }
        if(checkedAudio && myfiles1){
            const fetchData = async ()=>{

                const dataAud = myfiles1.map((item)=> item.cover.mime.includes('audio') ? item : undefined)
                    .filter((item2)=> item2 !== undefined)
                    setTypeOfFiles(dataAud)

                props.setLoading({loading: false, type: 'audio'})

            }
            fetchData()
        }
    },[checkedImg,checkedVid,checkedAudio,myfiles1,setMyfiles1])
    


    const getData = async () =>{
        const {data} = await axios.get(`${backEndProURL}/memory-games`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        console.log('getting data')
        setMyfiles1(data)
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
            deleteLoading && <CircularProgress />
        }
        {
            editLoading && <CircularProgress />
        }
        
        {
            props.loading.loading ? null : (
            <Grid container spacing={2}>
                {
                    typeOfFiles ? typeOfFiles.map((item)=>
                    
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
                            
                                        
                                            try {
                                                window.scrollTo(0,0)
                                                setDeleteLoading(true)
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
                                                props.setLoading({loading:false, type: props.loading.type})
                                                setDeleteLoading(false)
                                            } catch (error) {
                                                setDeleteLoading(false)
                                            }
                                            

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
                                            console.log('123')
                                            props.setEditPost(oldpost.data)

                                            console.log(window.innerWidth)
                                            if(window.innerWidth > 600){
                                                window.scrollTo(0,0)
                                            }else{
                                                window.scrollTo(0,10000)
                                            }
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
