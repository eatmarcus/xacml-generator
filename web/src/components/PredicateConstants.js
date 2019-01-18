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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

class PredicateConstants extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: "",
      dataType: "",
      attributeId: "",
      mustBePresent: "true"
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handlePresent = (event) => {
    this.setState({ mustBePresent: [event.target.value] })
  }

  addPC = () => {
    let request = {
      category: this.state.category,
      dataType: this.state.dataType,
      attributeId: this.state.attributeId,
      mustBePresent: this.state.mustBePresent
    }
    console.log(request);
    let endpoint = 'http://localhost:8080/addPredicateConstant'
    axios.post(endpoint, { data: request }, { crossdomain: true }, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then((result) => {
          this.props.history.goBack();
        })
  } 

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h1" align="left">
            Update Predicate Constants (aka AttributeDesignator)
            <Button variant="outlined" color="primary" className={classes.button} onClick={this.addPC}>
              Add
            </Button>
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container spacing={24} className={classes.grid} direction="row" justify="center" alignItems="flex-start">
            <Grid item xs={4}>
              <TextField
                id="category"
                label="Category"
                fullWidth
                placeholder="e.g. 'urn:oasis:names:tc:xacml:3.0:subject-category:access-subject'"
                className={classes.textField}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.category}
                onChange={this.handleChange.bind(this)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="dataType"
                label="DataType"
                fullWidth
                className={classes.textField}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.dataType}
                onChange={this.handleChange.bind(this)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="attributeId"
                label="AttributeId"
                fullWidth
                placeholder="e.g. 'urn:oasis:names:tc:xacml:2.0:subject:role'"
                className={classes.textField}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.attributeId}
                onChange={this.handleChange.bind(this)}
              />
            </Grid>
            <Grid container spacing={24} className={classes.grid} direction="row" justify="center" alignItems="flex-start">
              <Grid item xs={2}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="mustBePresent">MustBePresent</InputLabel>
                  <Select
                    fullWidth
                    inputProps={{
                      name: 'MustBePresent',
                      id: 'mustBePresent'
                    }}
                    value={this.state.mustBePresent}
                    onChange={this.handlePresent.bind(this)}
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

PredicateConstants.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PredicateConstants));
