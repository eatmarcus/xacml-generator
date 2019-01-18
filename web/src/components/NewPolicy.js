import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { savePolicySet } from '../redux/actions/policysetactions';
import StepsBar from './StepsBar';

const styles = theme => ({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      textAlign: 'left',
  },
  root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    paper: {
      margin: `${theme.spacing.unit}px auto`,
      padding: theme.spacing.unit * 2
    },
    button: {
      margin: theme.spacing.unit,
    },
});

class NewPolicy extends Component {
  constructor(props){
    super(props)
    this.state = {
      policySet: {
        xmlns: 'urn:oasis:names:tc:xacml:3.0:core:schema:wd-17',
        policyset_id: '',
        version: '1.0',
        policycombiningalgid: 'urn:oasis:names:tc:xacml:3.0:policy-combining-algorithm:deny-unless-permit',
        description: ''
      }
    }
  }

  componentDidMount(){
    this.setState({ policySet: this.props.policySet })
  }

  handleChange = name => event => {
    let policySet = Object.assign({}, this.state.policySet);
    policySet[name] = event.target.value;
    this.setState({policySet});
  };

  save = () => {
    this.props.savePolicySet(this.state.policySet);
    this.props.history.push('/addPolicy');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <StepsBar activeStep={0} />
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h1" align="left">
              Policy Set
            </Typography>
            <Grid container spacing={24} direction="row" justify="center" alignItems="flex-start">
              <Grid item xs={3}>
                <TextField
                  id="policyset-xmlns"
                  label="xmlns"
                  fullWidth
                  className={classes.textField}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.policySet.xmlns}
                  onChange={this.handleChange('xmlns')}  
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                      id="policyset-id"
                      label="PolicySetId"
                      fullWidth
                      placeholder="e.g. 'CCMS-SamplePolicy'"
                      className={classes.textField}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.policySet.policyset_id}
                      onChange={this.handleChange('policyset_id')}
                  />
              </Grid>
              <Grid item xs={1}>
                <TextField
                      id="policyset-version"
                      label="Version"
                      fullWidth
                      className={classes.textField}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.policySet.version}
                      onChange={this.handleChange('version')}
                  />
              </Grid>
              <Grid item xs={3}>
                <TextField
                      id="policyset-policycombiningalgid"
                      label="PolicyCombiningAlgId"
                      fullWidth
                      className={classes.textField}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.policySet.policycombiningalgid}
                      onChange={this.handleChange('policycombiningalgid')}
                  />
              </Grid>
              <Grid item xs={2}>
                <TextField
                      id="policyset-description"
                      label="Description"
                      fullWidth
                      className={classes.textField}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }} 
                      value={this.state.policySet.description}
                      onChange={this.handleChange('description')}
                  />
              </Grid>
            </Grid>
            <Button variant="outlined" color="primary" className={classes.button} onClick={this.save}>
                Save and proceed
            </Button>
          </Paper>
      </div>
    );
  }
}

NewPolicy.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return state.policySet;
};

const mapDispatchToProps = dispatch => {
  return {
    savePolicySet: (policySet) => dispatch(savePolicySet(policySet))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewPolicy));
