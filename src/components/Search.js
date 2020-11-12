import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import '../search.css';

import TextField from '@material-ui/core/TextField';

import { useStateValue } from '../StateProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function Search() {
    const classes = useStyles();

    const [country, setCountry] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    
    const [{ basket }, dispatch] = useStateValue();

    return (
        <div className="search">
            <form className={classes.root} noValidate autoComplete="off">
                <Autosuggest
                    inputProps={{
                        placeholder: "Search Country...",
                        autoComplete: "off",
                        name: "country",
                        id: "country",
                        value: country,
                        onChange: (e, { newValue }) => {
                            setCountry(newValue);
                        }
                    }}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={async ({ value }) => {
                        if (!value) {
                            setSuggestions([]);
                            return;
                        }
                        try {
                            const result = await Axios(`https://restcountries.eu/rest/v2/name/${value}`);
                            setSuggestions(result.data);
                        } catch (e) {
                            setSuggestions([]);
                        }
                    }}
                    onSuggestionsClearRequested={() => {
                        setSuggestions([]);
                    }}
                    onSuggestionSelected={(event, { suggestion, method }) => {
                        if (method === 'enter' || method === 'click') {
                            // changeCountry(suggestion);
                        }
                        setCountry(suggestion.name);
                    }}
                    getSuggestionValue={suggestion => suggestion.name}
                    renderSuggestion={suggestion => <div>{suggestion.name}</div>}
                />
            </form>
        </div>
    )
}

export default Search;
