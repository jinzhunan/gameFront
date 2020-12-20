import React,{useState} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({


  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '80%',

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
    width: '100%',
    height: '50px',
  },
  inputInput: {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',


  },
}));

export default function Movie() {

    const [text, setText] = useState('')

  const classes = useStyles();

  return (

      <Box style={{height:'100vh', paddingTop:'60px'}} display="flex" flexDirection="column" alignItems="center" >
            <Typography style={{marginTop:'30px'}} color="secondary" variant="h6">
                Movie Search
            </Typography>
            <Typography style={{marginBottom:'10px'}} color="secondary" variant="h6">
                It is chinese website, enter chinese
            </Typography>
            <Toolbar style={{width:'100%', display:'flex', justifyContent:'center'}}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                input: classes.inputInput,
                root: classes.inputRoot
              }}
              value={text}
              onChange={(e)=> setText(e.target.value)}
            />
          </div>
          </Toolbar>
          <Button target="_blank" href={`https://www.ifvod.tv/search/${text}`} variant="contained" style={{marginTop: '20px'}}>
              search
          </Button>
      </Box>

  );
}