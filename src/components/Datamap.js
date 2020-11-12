import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'black'
    }
}));

function Datamap() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            Datamappiconio
        </div>
    )
}

export default Datamap;
