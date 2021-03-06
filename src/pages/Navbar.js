import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Logo from '../Group 529.png'
import SideNav from './Sidenav';
import FullScreenDialog from '../containers/login'
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className="color-appbar" position="static">
        <Toolbar >
          <Typography variant="h6" className={classes.title}>
            <Link to="/">
            <img src={Logo} alt="logo" className='main-logo'/>
            </Link>
          </Typography>
          <FullScreenDialog/>
          <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu" id='dropdown'>
            <SideNav/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar