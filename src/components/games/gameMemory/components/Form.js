import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, ButtonGroup, Box, Input } from '@material-ui/core';
import {useDropzone} from 'react-dropzone'
import * as id3 from 'id3js';
import axios from 'axios'
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import lightBlue from '@material-ui/core/colors/lightBlue';
import {backEndProURL} from '../../../../api/ApiData'
  

const Form = (props) => {

  const [postData, setPostData] = useState({new: true ,id: '', title: '',creator: '',content: '', userfile: [], loading: false});
  const [formLoading, setFormLoading ] = useState(false)

  const {getRootProps, getInputProps} =  useDropzone({
    // accept: `${fileType}/*`,
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
        setPostData({ ...postData, userfile: acceptedFiles})

    }, 
  });


  useEffect(()=>{
    props.setLoading(formLoading)
  },[formLoading])

  useEffect(()=>{
      if(props.editPost){
        setPostData({new: false, title: props.editPost.title, creator: props.editPost.creator, content: props.editPost.content, id: props.editPost.id})
      }
  },[props.editPost])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(postData.new === true){
        let formData = new FormData();
        formData.append('creator', postData.creator)
        formData.append('content', postData.content)
        formData.append('title', postData.userfile[0].name)
        formData.append('cover',postData.userfile[0])

        if(!postData.userfile[1] && postData.userfile[0].type.includes('audio')){
            await id3.fromFile(postData.userfile[0]).then((tags)=>{
                if(tags.images[0] !== undefined){
                    var arrayBuffer = new Uint8Array(tags.images[0].data)
                    var blob = new Blob([arrayBuffer], { type: "image/jpeg" } )
                    const fileName = postData.userfile[0].name
                    function blobToFile(blob, fileName){       
                        return new File([blob], fileName, { lastModified: new Date().getTime(), type: blob.type })
                    }
  
                    formData.append('cover2',blobToFile(blob, fileName) )         
                }
            })
        }

        // NEW POST
            setFormLoading(true)
            try {
                await axios.post(`${backEndProURL}/memory-games`,formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                setFormLoading(false)

            } catch (error) {
                console.log(error.response)
                setFormLoading(false)

            }

    }else{
            // UPDATE POST
            let formData = new FormData();
            formData.append('title', postData.title)
            formData.append('creator', postData.creator)
            formData.append('content', postData.content)
            setFormLoading(true)
            try {
                await axios.put(`${backEndProURL}/memory-games/${postData.id}`,formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                setFormLoading(false)
            } catch (error) {
                console.log(error)
                setFormLoading(false)

            }
            setPostData({ new:true, title:'', creator: '', content: '', id:'' })
    }


  };
  

  return (
    <>
    <form style={{backgroundColor:grey[50], borderRadius: '5px', padding: '10px'}} id="myForm" align="center" name="myForm" encType="multipart/form-data" onSubmit={handleSubmit}>

    <Typography  variant="h6">{ postData.new ? 'CREATE' : 'UPDATE'}</Typography>
    
    {postData.new ? null : <TextField 
            fullWidth
            label="Title" 
            placeholder="The Title" 
            variant="outlined" 
            style={{marginBottom:"5px", marginTop: "5px"}} 
            value={postData.title}
            onChange={(e)=>{setPostData({...postData, title: e.target.value })}}
            />}

    <TextField 
            fullWidth
            label="Creator" 
            placeholder="who is this" 
            variant="outlined" 
            style={{marginBottom:"5px", marginTop: "5px"}} 
            value={postData.creator}
            onChange={(e)=>{setPostData({...postData, creator: e.target.value })}}
            />
    <TextField
            style={{marginBottom:"5px", marginTop: "5px"}} 
            id="standard-textarea"
            label="Content"
            placeholder="write some memories"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={postData.content}
            onChange={(e)=>{setPostData({...postData, content: e.target.value })}}
        />

    {postData.new ? <>
            <ButtonGroup fullWidth>
                <Button style={{fontSize: "12px"}} 
                    onClick={()=> {
                    setPostData({...postData, userfile:[]})}} 
                    variant="contained" 
                    style={{color: red[50], backgroundColor: red[500]}} >IMAGE</Button>
                <Button style={{fontSize: "12px"}} 
                    onClick={()=> {
                    setPostData({...postData, userfile:[]})}} 
                    variant="contained" 
                    style={{color: grey[500], backgroundColor: grey[50]}} >VIDEO</Button>
                <Button style={{fontSize: "12px"}} 
                    onClick={()=> {
                    setPostData({...postData, userfile:[]})}} 
                    variant="contained" 
                    style={{color: lightBlue[500], backgroundColor: lightBlue[50]}} >AUDIO</Button>
            </ButtonGroup>

            <Typography  color="primary" variant="h5" align="center">file type: <span style={{color:red[400]}}>doesn't matter</span></Typography>

            <Box border={1} style={{borderRadius: "5px", borderColor: grey[400]}}>
                <section  >
                <div  {...getRootProps()}>
                    <input {...getInputProps()} />

                    <Typography style={{padding: 16}}  variant="body1" >Drag 'n' drop single file, or click to select single file</Typography>

                </div>
                <aside >

                    {postData.userfile !==undefined ? postData.userfile.map(file => (
            
                            <div key={file.id}>{file.name}</div>

                    )): <div></div>
                    }
                </aside>
                
                </section>     
            </Box>
            </> : null}
        
            {postData.new ? 
                <Button type="submit" variant="contained" type="submit">Submit</Button> : 
                    <ButtonGroup fullWidth variant="contained" >
                        <Button type="submit" style={{fontSize:'11px' , backgroundColor: lightBlue[300]}}>Submit</Button>
                        <Button onClick={()=>{setPostData({...postData, title:'', creator: '', content: ''})}} style={{fontSize:'11px', backgroundColor: red[300]}}>Clear</Button>
                        <Button onClick={()=>{setPostData({ new:true, title:'', creator: '', content: '', id:'' })}} style={{fontSize:'11px', backgroundColor: grey[300]}}>New</Button>
                    </ButtonGroup>
                }
    
    </form>

    </>
  );
};

export default Form;
