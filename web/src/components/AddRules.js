import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux";
import { saveRules } from '../redux/actions/ruleactions';
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
  },
  matchSection: {
    paddingBottom: theme.spacing.unit * 2
  }
});

class AddRules extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rules: []
    }
  }

  componentDidMount() {
    let endpoint = "http://localhost:8080/listOfPredicateConstants";
    axios.get(endpoint, { crossdomain: true }, { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(result => this.setState({ listOfPredicateConstants: result.data }));

    if (this.props.rule.rules.length === 0) {
      let rulesArray = [];
      this.props.policy.policies.forEach(() => {
        rulesArray.push(
          {
            ruleId: '',
            ruleEffect: 'Permit',
            description: '',
            match: [
              {
                predicateConstant: { id: "1", category: "urn:oasis:names:tc:xacml:3.0:attribute-category:action", datatype: "http://www.w3.org/2001/XMLSchema#string", mustbepresent: "true", attributeid: "urn:oasis:names:tc:xacml:1.0:action:action-id" },
                predicateValue: '',
                matchId: 'urn:oasis:names:tc:xacml:1.0:function:string-equal'
              }
            ]
          })
      });
      this.setState({ rules: rulesArray })
    } else {
      this.setState({ rules: this.props.rule.rules })
    }
  }

  addMatch = (index, event) => {
    let newMatch = {
      predicateConstant: { id: "1", category: "urn:oasis:names:tc:xacml:3.0:attribute-category:action", datatype: "http://www.w3.org/2001/XMLSchema#string", mustbepresent: "true", attributeid: "urn:oasis:names:tc:xacml:1.0:action:action-id" },
      predicateValue: '',
      matchId: 'urn:oasis:names:tc:xacml:1.0:function:string-equal',
    }
    let newRules = Array.from(this.state.rules);
    newRules[index]['match'].push(newMatch);
    this.setState({ rules: newRules })
  }

  handleChange = (index, event) => {
    let newRules = Array.from(this.state.rules);
    newRules[index][event.target.id] = event.target.value;
    this.setState({ rules: newRules })
  }

  handleSave = () => {
    this.props.saveRules(this.state.rules);
    this.props.history.push('/addConditions');
  }

  handleMatchChange = (index, matchIndex, event) => {
    let newRules = Array.from(this.state.rules);
    newRules[index]['match'][matchIndex][event.target.id] = event.target.value;
    this.setState({ rules: newRules })
  }

  handlePCChange = (index, matchIndex, event) => {
    let newRules = Array.from(this.state.rules);
    newRules[index]['match'][matchIndex]['predicateConstant'] = JSON.parse(event.target.value);
    this.setState({ rules: newRules })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <StepsBar activeStep={2} />
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h1" align="left">
            Rules
            <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleSave}>
              Save and Proceed
            </Button>
            <Button href="#/addPolicy" className={classes.button}>
              Back
            </Button>
          </Typography>
        </Paper>
        {this.state.rules.map((object, index) =>
          <Paper className={classes.paper} key={index}>
            <Typography variant="h6" component="h1" align="left">
              Rule for Policy {index + 1}
            </Typography>
            <Grid container spacing={24} className={classes.grid} direction="row" justify="center" alignItems="flex-start">
              <Grid item xs={4}>
                <TextField
                  id="ruleId"
                  label="RuleId"
                  fullWidth
                  placeholder="e.g. 'read_only_attributes'"
                  value={this.state.rules[index]['ruleId']}
                  className={classes.textField}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange.bind(this, index)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="ruleEffect"
                  label="Effect"
                  fullWidth
                  value={this.state.rules[index]['ruleEffect']}
                  className={classes.textField}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange.bind(this, index)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="description"
                  label="Description"
                  fullWidth
                  value={this.state.rules[index]['description']}
                  className={classes.textField}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange.bind(this, index)}
                />
              </Grid>
            </Grid>
            <Grid>
              <Button href="" className={classes.button} onClick={this.addMatch.bind(this, index)} color="primary">
                Add Match
              </Button>
            </Grid>
            {this.state.rules[index]['match'].map((object, matchIndex) =>
              <div key={matchIndex} className={classes.matchSection}>
                <Typography variant="subheading" align="left">
                  Match {matchIndex + 1}
                </Typography>
                <Grid container spacing={24} className={classes.grid} direction="row" justify="center" alignItems="flex-start">
                  <Grid item xs={6}>
                    <TextField
                      id="matchId"
                      label="MatchId"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.rules[index]['match'][matchIndex]['matchId']}
                      onChange={this.handleMatchChange.bind(this, index, matchIndex)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="predicateValue"
                      label="AttributeValue"
                      className={classes.textField}
                      fullWidth
                      placeholder="e.g. 'GET' or 'ADMIN' etc"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.rules[index]['match'][matchIndex]['predicateValue']}
                      onChange={this.handleMatchChange.bind(this, index, matchIndex)}
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
                        this.state.rules[index]['match'][matchIndex] && <Select
                          input={<Input name="predicateConstant" id="predicateConstant" />}
                          fullWidth
                          style={{ fontSize: '0.7rem' }}
                          value={JSON.stringify(this.state.rules[index]['match'][matchIndex]['predicateConstant'])}
                          onChange={this.handlePCChange.bind(this, index, matchIndex)}
                          name="predicateConstant"
                        >
                          {this.state.listOfPredicateConstants && this.state.listOfPredicateConstants.map((object, i) =>
                            <MenuItem value={JSON.stringify(this.state.listOfPredicateConstants[i])} key={i} style={{ fontSize: '0.7rem' }}>
                              {JSON.stringify(this.state.listOfPredicateConstants[i])}
                            </MenuItem>
                          )}
                        </Select>
                      }
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider />
              </div>
            )}
          </Paper>
        )}
      </div>
    );
  }
}

AddRules.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    saveRules: (rules) => dispatch(saveRules(rules))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddRules));
