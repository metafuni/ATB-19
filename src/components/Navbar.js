import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldVirus } from '@fortawesome/free-solid-svg-icons'

import { makeStyles } from '@material-ui/core/styles';

import Search from './Search';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        top: 0
    },
    toolbar: {
        minHeight: 75,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'flex',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        color: '#14274e'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0'
    },
    link: {
        color: '#394867',
        textDecoration: 'none',
    }
}));


const Navbar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.title} variant="h6" noWrap>
                    <FontAwesomeIcon icon={faShieldVirus} size="xs" style={{marginRight: '.2rem', color: '#0f3dd3cb'}} />ATB-19
                        <small style={{ marginLeft: '10px', color: '#9ba4b4' }}>Coronavirus Data App</small>
                    </Typography>
                    <Container className={classes.container}>
                        <Container fluid>
                            <Link to="/" className={classes.link}>
                                <Button color="inherit" className={classes.info}>home</Button>
                            </Link>
                            <Link to="/datamap" className={classes.link}>
                                <Button color="inherit" className={classes.info}>datamap</Button>
                            </Link>
                            <Link to="/info" className={classes.link}>
                                <Button color="inherit" className={classes.info}>info</Button>
                            </Link>
                        </Container>
                        <Search />
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;
