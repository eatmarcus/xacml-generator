import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const styles = theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return ['Add Policy Set', 'Add Policies', 'Add Rules', 'Add Conditions'];
}

class StepsBar extends React.Component {
    render() {
        const { classes } = this.props;
        const steps = getSteps();

        return (
            <div className={classes.root}>
                <Stepper activeStep={this.props.activeStep} alternativeLabel>
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    }
}

StepsBar.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(StepsBar);