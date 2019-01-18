import React, { Component, Fragment } from 'react';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { saveConditions } from '../redux/actions/conditionactions';
import StepsBar from './StepsBar';
import CircularBar from './CircularBar';

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
  avSection: {
    paddingBottom: theme.spacing.unit * 2
  }
});

class AddConditions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conditions: [],
      open: false,
      progress: false,
    }
  }

  componentDidMount() {
    let endpoint = "http://localhost:8080/listOfPredicateConstants";
    axios.get(endpoint, { crossdomain: true }, { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(result => this.setState({ listOfPredicateConstants: result.data }));

    if (this.props.condition.conditions.length === 0) {
      let conditionsArray = [];
      this.props.rule.rules.forEach(() => {
        conditionsArray.push(
          {
            functionApplyWrapId: 'urn:oasis:names:tc:xacml:1.0:function:or',
            functionApplyId: 'urn:oasis:names:tc:xacml:1.0:function:all-of-any',
            functionId: 'urn:oasis:names:tc:xacml:1.0:function:string-equal',
            predicateConstant: { id: "4", category: "urn:oasis:names:tc:xacml:3.0:attribute-category:resource", datatype: "http://www.w3.org/2001/XMLSchema#string", mustbepresent: "false", attributeid: "urn:oasis:names:tc:xacml:1.0:resource:field-id" },
            attributeValue: [
              {
                dataType: 'http://www.w3.org/2001/XMLSchema#string',
                value: ''
              }
            ]
          })
      });
      this.setState({ conditions: conditionsArray })
    } else {
      this.setState({ conditions: this.props.condition.conditions })
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (index, event) => {
    let newConditions = Array.from(this.state.conditions);
    newConditions[index][event.target.id] = event.target.value;
    this.setState({ conditions: newConditions })
  }

  handlePCChange = (index, event) => {
    let newConditions = Array.from(this.state.conditions);
    newConditions[index]['predicateConstant'] = JSON.parse(event.target.value);
    this.setState({ conditions: newConditions })
  }

  handleSave = () => {
    this.props.saveConditions(this.state.conditions);
    this.setState({ progress: true }, () => {
      let request = {
        policySet: this.props.policySet.policySet,
        policies: this.props.policy.policies,
        rules: this.props.rule.rules,
        conditions: this.props.condition.conditions
      }

      let endpoint = "http://localhost:8080/addPolicySet";
      axios.post(endpoint, { data: request }, { crossdomain: true }, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then((result) => {
          if (result.status === 200) {
            this.props.history.push('/download');
          } else {
            this.setState({ progress: false })
            alert(result.data);
          }
        })
    });


  }

  handleAVChange = (index, avIndex, event) => {
    let newConditions = Array.from(this.state.conditions);
    newConditions[index]['attributeValue'][avIndex][event.target.id] = event.target.value;
    this.setState({ conditions: newConditions })
  }

  addAttributeValue = (index, event) => {
    let newAttributeValue = {
      dataType: 'http://www.w3.org/2001/XMLSchema#string',
      value: ''
    }
    let newConditions = Array.from(this.state.conditions);
    newConditions[index]['attributeValue'].push(newAttributeValue);
    this.setState({ conditions: newConditions })
  }

  render() {
    const { classes } = this.props;
    const isLoading = this.state.progress;
    return (
      <div className="App">
        <StepsBar activeStep={3} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {isLoading ? (
            <CircularBar />
          ) : (
              <Fragment>
                <DialogTitle id="alert-dialog-title">{"Confirm save to database?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do note that you are saving into an in-memory database. Once you reboot the server, your new ACL will be gone.
                    To persist your data, please add it into the data.sql under src/main/resources/. Thank you.
            </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="secondary">
                    Cancel
            </Button>
                  <Button onClick={this.handleSave} color="primary" autoFocus>
                    Submit
            </Button>
                </DialogActions>
              </Fragment>
            )
          }
        </Dialog>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h1" align="left">
            Conditions
            <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClickOpen}>
              Submit
            </Button>
            <Button href="#/addRules" className={classes.button}>
              Back
            </Button>
          </Typography>
        </Paper>
        {this.state.conditions.map((object, index) =>
          <Paper className={classes.paper} key={index}>
            <Typography variant="h6" component="h1" align="left">
              Condition for Rule {index + 1}
            </Typography>
            <Grid container spacing={24} className={classes.grid} direction="row" justify="center" alignItems="flex-start">
              <Grid item xs={4}>
                <TextField
                  id="functionApplyWrapId"
                  label="Apply FunctionId (Wrapper)"
                  fullWidth
                  className={classes.textField}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.conditions[index]['functionApplyWrapId']}
                  onChange={this.handleChange.bind(this, index)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="functionApplyId"
                  label="Apply FunctionId"
                  fullWidth
                  className={classes.textField}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.conditions[index]['functionApplyId']}
                  onChange={this.handleChange.bind(this, index)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="functionId"
                  label="Function FunctionId"
                  fullWidth
                  className={classes.textField}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.conditions[index]['functionId']}
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
                    this.state.conditions[index]['predicateConstant'] && <Select
                      input={<Input name="predicateConstant" id="predicateConstant" />}
                      fullWidth
                      style={{ fontSize: '0.7rem' }}
                      value={JSON.stringify(this.state.conditions[index]['predicateConstant'])}
                      onChange={this.handlePCChange.bind(this, index)}
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
            <Grid>
              <Button href="" className={classes.button} onClick={this.addAttributeValue.bind(this, index)} color="primary">
                Add AttributeValue
              </Button>
            </Grid>
            {this.state.conditions[index]['attributeValue'].map((object, avIndex) =>
              <div className={classes.avSection} key={avIndex}>
                <Typography variant="subheading" align="left">
                  AttributeValue {avIndex + 1}
                </Typography>
                <Grid key={avIndex} container spacing={24} className={classes.grid} direction="row" justify="center" alignItems="flex-start">
                  <Grid item xs={6}>
                    <TextField
                      id="dataType"
                      label="DataType"
                      fullWidth
                      className={classes.textField}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.conditions[index]['attributeValue'][avIndex]['dataType']}
                      onChange={this.handleAVChange.bind(this, index, avIndex)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="value"
                      label="Value"
                      fullWidth
                      className={classes.textField}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.conditions[index]['attributeValue'][avIndex]['value']}
                      onChange={this.handleAVChange.bind(this, index, avIndex)}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>
        )}
      </div>
    );
  }
}

AddConditions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    saveConditions: (conditions) => dispatch(saveConditions(conditions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddConditions));
