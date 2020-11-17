import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Datamap from './components/Datamap';
import Info from './components/Info';
import Home from './components/Home';
import Search from './components/Search';
import jsonData from './owid-covid-data.json';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import Particles from 'react-particles-js';
import './app.css';

import '../node_modules/react-vis/dist/style.css';
import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";

import { useStateValue } from './StateProvider';

function App() {

    const [content, setContent] = useState("");
    const [{ basket }, dispatch] = useStateValue();

    const changeCountry = (location) => {
        dispatch({
            type: 'SET_COUNTRY',
            location
        });
    };

    useEffect(() => {
        // fetch('https://covid.ourworldindata.org/data/owid-covid-data.json').then(res => res.json()).then((data) => {
        //     changeCountry(data);
        // });
        // fetch(jsonData).then(res => res.text()).then(data => changeCountry(data));
        changeCountry(jsonData);
    }, []);

    useEffect(() => {console.log(basket)}, [basket]);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Particles id="particles-js"
                    style={{ zIndex: '-100', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%' }}
                    params={{
                        particles: {
                            number: {
                                value: 200,
                                density: {
                                    enable: true,
                                    value_area: 1000
                                }
                            },
                            color: {
                                value: '#14274e'
                            },
                            opacity: {
                                value: 0.5,
                                anim: {
                                    enable: true
                                }
                            },
                            size: {
                                value: 3,
                                random: true,
                                anim: {
                                    enable: true,
                                    speed: 3
                                }
                            },
                            line_linked: {
                                enable: false,
                            },
                            move: {
                                speed: 0.2
                            }
                        },
                        interactivity: {
                            detect_on: 'canvas',
                            events: {
                                onhover: {
                                    enable: true,
                                    mode: 'grab'
                                }
                            },
                            modes: {
                                grab: {
                                    distance: 170,
                                    line_linked: {
                                        opacity: .6,
                                        color: '#14274e'
                                    }
                                }
                            }
                        }
                    }}
                />
                <div className="app">
                    <Navbar />
                    {/* <Search /> */}
                </div>

                <Switch>
                    <Route path="/datamap">
                        <Datamap />
                    </Route>
                    <Route path="/info">
                        <Info />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

export default App;
