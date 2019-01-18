import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from "react-redux";
import { savePolicies, addPolicy, removePolicy } from '../redux/actions/policyactions';
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
  grid: {
    width: '100%'
  },
  formControl: {
    display: 'inherit',
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class AddPolicy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      policies: [
        {
          policyId: '',
          version: '1.0',
          ruleCombiningAlgId: 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit',
          description: '',
          attributeValue: '',
          matchId: 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match',
          predicateConstant: { id: "2", category: "urn:oasis:names:tc:xacml:3.0:attribute-category:resource", datatype: "http://www.w3.org/2001/XMLSchema#string", mustbepresent: "true", attributeid: "urn:oasis:names:tc:xacml:2.0:resource:scope" }
        }
      ],
      buttonLink: 'Save'
    }
  }

  componentDidMount() {
    let endpoint = "http://localhost:8080/listOfPredicateConstants";
    axios.get(endpoint, { crossdomain: true }, { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(result => this.setState({ listOfPredicateConstants: result.data, policies: this.props.policy.policies }));
  }

  addPolicy = () => {
    let newPolicy = {
      policyId: '',
      version: '1.0',
      ruleCombiningAlgId: 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit',
      description: '',
      attributeValue: '',
      matchId: 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match',
      predicateConstant: { id: "2", category: "urn:oasis:names:tc:xacml:3.0:attribute-category:resource", datatype: "http://www.w3.org/2001/XMLSchema#string", mustbepresent: "true", attributeid: "urn:oasis:names:tc:xacml:2.0:resource:scope" }
    }
    this.setState({ policies: [...this.state.policies, newPolicy] });
  }

  handleSave = () => {
    this.props.savePolicies(this.state.policies);
    this.props.history.push('/addRules');
  }

  handleRemove = (index) => {
    if (this.state.policies.length > 1) {
      let newPolicies = Array.from(this.state.policies);
      newPolicies.splice(index, 1);
      this.setState({ policies: newPolicies });
    }
  }

  handleChange = (index, event) => {
    let newPolicies = Array.from(this.state.policies);
    newPolicies[index][event.target.id] = event.target.value;
    this.setState({ policies: newPolicies })
  }

  handlePCChange = (index, event) => {
    let newPolicies = Array.from(this.state.policies);
    newPolicies[index]['predicateConstant'] = JSON.parse(event.target.value);
    this.setState({ policies: newPolicies })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <StepsBar activeStep={1} />
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h1" align="left">
            Policy
              <Fab size="small" color="primary" aria-label="Add" className={classes.button} onClick={this.addPolicy}>
              <AddIcon />
            </Fab>
            <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleSave}>
              Save and Proceed
            </Button>
            <Button href="#/newPolicy" className={classes.button}>
              Back
            </Button>
          </Typography>
        </Paper>
        {
          this.state.policies.map((object, index) =>
            <Paper className={classes.paper} key={index}>
              <Typography variant="h6" component="h1" align="left">
                Policy {index + 1}
              </Typography>
              <Grid container spacing={24} className={classes.grid} direction="row" justify="center" alignItems="flex-start">
                <Grid item xs={4}>
                  <TextField
                    id="policyId"
                    label="PolicyId"
                    fullWidth
                    placeholder="e.g. 'CCMS-GET'"
                    className={classes.textField}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.policies[index]['policyId']}
                    onChange={this.handleChange.bind(this, index)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="version"
                    label="Version"
                    fullWidth
                    className={classes.textField}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.policies[index]['version']}
                    onChange={this.handleChange.bind(this, index)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="ruleCombiningAlgId"
                    label="RuleCombiningAlgId"
                    fullWidth
                    className={classes.textField}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.policies[index]['ruleCombiningAlgId']}
                    onChange={this.handleChange.bind(this, index)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="description"
                    label="Description"
                    fullWidth
                    className={classes.textField}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.policies[index]['description']}
                    onChange={this.handleChange.bind(this, index)}
                  />
                </Grid>
              </Grid>
              <Typography variant="subheading" align="left">
                Policy Predicate
              </Typography>
              <Grid container spacing={24} className={classes.grid} direction="row" justify="center" alignItems="flex-start">
                <Grid item xs={6}>
                  <TextField
                    id="attributeValue"
                    label="AttributeValue"
                    fullWidth
                    placeholder="e.g. '^/hgn/api/v1/profiles$'"
                    className={classes.textField}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.policies[index]['attributeValue']}
                    onChange={this.handleChange.bind(this, index)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="matchId"
                    label="MatchId"
                    placeholder="e.g. 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match'"
                    fullWidth
                    className={classes.textField}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.policies[index]['matchId']}
                    onChange={this.handleChange.bind(this, index)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24} className={classes.grid} direction="row" justify="center" alignItems="flex-start">
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="predicateConstant">
                      AttributeDesignator (Can't find what you want? Create one <a href="#/predicateConstants">here</a>)
                    </InputLabel>
                    {
                      this.state.listOfPredicateConstants && <Select
                        input={<Input name="predicateConstant" id="predicateConstant" />}
                        fullWidth
                        style={{ fontSize: '0.7rem' }}
                        value={JSON.stringify(this.state.policies[index]['predicateConstant'])}
                        onChange={this.handlePCChange.bind(this, index)}
                        name="predicateConstant"
                      >
                        {this.state.listOfPredicateConstants.map((object, index) =>
                          <MenuItem value={JSON.stringify(this.state.listOfPredicateConstants[index])} key={index} style={{ fontSize: '0.7rem' }}>
                            {JSON.stringify(this.state.listOfPredicateConstants[index])}
                          </MenuItem>
                        )}
                      </Select>
                    }
                  </FormControl>
                </Grid>
              </Grid>
              <Button variant="outlined" color="secondary" className={classes.button} onClick={() => this.handleRemove(index)}>
                Remove
              </Button>
            </Paper>
          )
        }
      </div>
    );
  }
}

AddPolicy.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    savePolicies: (policies) => dispatch(savePolicies(policies)),
    addPolicy: (newPolicy) => dispatch(addPolicy(newPolicy)),
    removePolicy: (index) => dispatch(removePolicy(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddPolicy));
