import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    card: {
        maxWidth: 345,
        margin: '0 auto',
        marginTop: '15px'
    },
    media: {
        height: 140,
    },

});

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    goCreate = () => {
        this.props.history.push('/newPolicy')
    }

    goGenerate = () => {
        this.props.history.push('/download')
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                <Grid container spacing={24} className={classes.grid} direction="row" justify="center">
                    <Grid item xs={6}>
                        <Card className={classes.card} style={{float: 'right'}} onClick={this.goCreate}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/create.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Create New Policy
                            </Typography>
                                    <Typography component="p">
                                        Want to create a new Policy? Create one here!
                            </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                    <Card className={classes.card} style={{float: 'left'}} onClick={this.goGenerate}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/generate.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Generate Existing Policy
                            </Typography>
                            <Typography component="p">
                               Have an existing policy? Generate it here!
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
