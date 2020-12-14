import {Typography, Card,  CardContent, CardActions, Button, Grid} from '@material-ui/core';
import { Link }from 'react-router-dom'
import {useSelector} from 'react-redux'

export const GamePage = (props) => {

    const users = useSelector((state) => state.users)


    const handleLevelEntry = async () =>{

        console.log(users)
        const permission = props.content.levels.some(level => level === users.userRole)

           if(permission){
                window.location.href= props.content.href
           }else if(props.content.levels[0] === '/'){
                window.location.href= props.content.href
           }else{
                props.content.setMessage('raise your level')
           }
      }

    return(
        <Grid item xs={11} sm={7} md={5} lg={3} style={{marginTop:'10px', cursor:'pointer'}}
            onClick={handleLevelEntry}>

                <Card variant="outlined" >
                    <CardContent >
                        <Typography color="textSecondary" gutterBottom>
                        Game Zone
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {props.content.title}
                        </Typography>
                        <Typography color="textSecondary">
                            {props.content.subtitle}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {props.content.content1}
                        <br />
                            {props.content.content2}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Author: {props.content.author}</Button>
                    </CardActions>
                </Card>
   
        </Grid>
    )
}