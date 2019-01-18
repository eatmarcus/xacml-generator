import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Highlight from 'react-highlight';
import 'highlight.js/styles/agate.css';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        textAlign: 'left',
        width: 200,
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
      paper: {
        maxWidth: 700,
        margin: `${theme.spacing.unit}px auto`,
        padding: theme.spacing.unit * 2,
      },
      button: {
        margin: theme.spacing.unit,
      },
      highlight: {
          textAlign: 'left'
      }
});


class InputForm extends React.Component {
    state = {
        policyId: '',
        xmlString: '',
        buttonLink: 'Preview',
        listOfPolicyId: []
    };

    componentDidMount(){
        let endpoint = "http://localhost:8080/listOfPolicyId";
        axios.get(endpoint, {crossdomain: true}, {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(result => this.setState({listOfPolicyId: result.data}));
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
            buttonLink: 'Preview'
        });
    };

    download = () => {
        //download for this.state.policyId
        let endpoint = "http://localhost:8080/downloadPolicyXML?id=" + this.state.policyId;
        axios.get(endpoint, { crossdomain: true }, { headers: {'Access-Control-Allow-Origin': '*'} })
            .then(result => this.setState({xmlString : result.data, buttonLink: 'Download'}));

        if (this.state.buttonLink === 'Download'){
            //Download xml
            let element = document.createElement("a");
            let file = new Blob([this.state.xmlString], {type: 'text/xml'});
            element.href = URL.createObjectURL(file);
            element.download = "acl.xml";
            element.click();
        }    
          
    };

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Paper className={classes.paper}>
                    <Grid container spacing={24} direction="row" alignItems="flex-end" justify="center">
                        <Grid item>
                            <TextField
                                id="policyIdInput"
                                label="Policy ID"
                                select
                                value={this.state.policyId}
                                onChange={this.handleChange('policyId')}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            >
                            {this.state.listOfPolicyId.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" className={classes.button} onClick={this.download}>
                                {this.state.buttonLink}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <div className={classes.highlight}>
                    {this.state.xmlString !== '' &&
                    <Highlight language="xml">
                        {this.state.xmlString}
                    </Highlight>
                }
                </div>
            </Fragment>
        );
    }
}

InputForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputForm);