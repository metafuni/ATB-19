import React, { useEffect } from 'react';
import Globe from '../flags/world.svg';
import { useStateValue } from '../StateProvider';

import Cases from './Cases';
import Deaths from './Deaths';
import Loading from './Loading';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '5rem 2rem',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container: {
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    containerLeft: {
        display: 'flex',
        alignItems: 'center'
    }
}));

function Home() {
    const [{ basket, countryBasket }, dispatch] = useStateValue();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Container className={classes.container}>
                        <Container className={classes.containerLeft}>
                            {countryBasket[0].flag ? 
                                (<img src={countryBasket[0].flag} width="auto" height="60" alt="world" style={{ marginRight: "1.5rem" }} />) : 
                                (<img src={Globe} width="60" height="60" alt="world" style={{ marginRight: "1.5rem", borderRadius: '50%' }} />)
                            }
                            {countryBasket.length && countryBasket[0].name}
                        </Container>
                            <Typography style={{textAlign: 'right'}}>
                                latest COVID-19 data<br></br> per 14/11/2020
                            </Typography>
                    </Container>
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Cases />
                    </Paper>                    
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Deaths />
                    </Paper>
                </Grid>
            </Grid>
            {/* <Loading /> */}
        </div>
    )
}

export default Home;
