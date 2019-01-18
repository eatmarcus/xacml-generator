import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textAlign: 'left'
  },
  button: {
    color: 'white',
    textDecoration: 'none'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
};

function Appbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <a href="/" className={classes.link}>
                ACL Generator
              </a>
            </Typography>  
          <NavLink to="/newPolicy" className={classes.link}><Button className={classes.button}>Create new policy</Button></NavLink>
          <NavLink to="/download" className={classes.link}><Button className={classes.button}>Download existing</Button></NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Appbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Appbar);