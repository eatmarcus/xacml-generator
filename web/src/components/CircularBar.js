import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class CircularBar extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CircularProgress
          className={classes.progress}
        />
      </div>
    );
  }
}

CircularBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularBar);