import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { XYPlot, VerticalBarSeries, LineSeries, XAxis, YAxis, LabelSeries } from 'react-vis';

function Cases() {
    const [{ basket, countryBasket }, dispatch] = useStateValue();

    const [dailyIncrease, setDailyIncrease] = useState();
    const [dailyDifference, setDailyDifference] = useState();
    const [weekFigure, setWeekFigure] = useState();
    const [weekDifference, setWeekDifference] = useState();
    const [weekIncrease, setWeekIncrease] = useState();
    const [countryCode, setCountryCode] = useState();
    const [data, setData] = useState([]);

    let dataArray = [];

    const calcDailyIncrease = () => {
        if (countryCode && basket[0][countryCode].data.length >= 2) {
            let today = basket[0][countryCode].data[basket[0][countryCode].data.length - 1].new_cases;
            let yesterday = basket[0][countryCode].data[basket[0][countryCode].data.length - 2].new_cases;
            let difference = today - yesterday;
            setDailyDifference(difference);
            let percentage = (difference / today) * 100;
            setDailyIncrease(percentage.toFixed(2));
        } else {
            setDailyDifference('-');
            setDailyIncrease('-');
        };
    };

    const calcWeeklyNumber = () => {
        if (countryCode && basket[0][countryCode].data.length >= 7) {
            let weekArray = [];
            for (let i = 1; i < 8; i++) {
                weekArray.push(basket[0][countryCode].data[basket[0][countryCode].data.length - i].new_cases);
            };
            let weeknum = weekArray.reduce((a, b) => a + b, 0)
            setWeekFigure(weeknum);
            calcWeeklyIncrease(weeknum);
        } else {
            setWeekFigure('-');
        };
    };

    const calcWeeklyIncrease = (weeknum) => {
        if (countryCode && basket[0][countryCode].data.length >= 14) {
            let lastweekArray = [];
            for (let i = 8; i < 15; i++) {
                lastweekArray.push(basket[0][countryCode].data[basket[0][countryCode].data.length - i].new_cases);
            };
            let lastweekNumber = lastweekArray.reduce((a, b) => a + b, 0);
            setWeekDifference(weeknum - lastweekNumber);
            let percentage = ((weeknum - lastweekNumber) / weeknum) * 100;
            setWeekIncrease(percentage.toFixed(2));
        } else {
            setWeekDifference('-');
            setWeekIncrease('-');
        };
    };

    const calcData = () => {
        for (let i = 0; i < basket[0][countryCode].data.length; i++) {
            dataArray.push({ x: i, y: basket[0][countryCode].data[i].new_cases });
        };
        setData(dataArray);
        console.log(data)
    };

    useEffect(() => {
        setCountryCode(countryBasket[0].alpha3Code);
        if (basket.length) {
            calcDailyIncrease();
            calcWeeklyNumber();
        };
    });

    useEffect(() => {
        if (basket.length) {
            calcData();
        };
    }, [countryCode]);

    return (
        <div>
            {data.length && 
            <XYPlot height={290} width={650}>
                <VerticalBarSeries data={data} color="#9ba4b4" style={{ opacity: .8 }} />
                <LineSeries data={data} color="#0f3dd3cb" curve={'curveMonotoneX'} style={{ strokeWidth: 2 }} />
                <XAxis />
                <YAxis />
                <LabelSeries animation allowOffsetToBeReversed data={data} />
            </XYPlot>}
            {/* New confirmed cases of COVID-19
            ATB-19
            <br></br>
            <h3>today: {basket.length && countryCode && basket[0][countryCode].data[basket[0][countryCode].data.length - 1].new_cases}</h3>
            <h3 style={dailyDifference > 0 ? 
                { background: 'rgba(204,226,216,1)', color: 'rgba(0,90,48,1)' } : 
                { background: 'rgba(246,215,210,1)', color: 'rgba(148,37,20,1)' }}>
                    {dailyDifference > 0 ? 
                        <FontAwesomeIcon icon={faArrowUp} style={{ color: '#636a6d', marginRight: '.2rem', transform: 'scale(.8)' }} /> : 
                        <FontAwesomeIcon icon={faArrowUp} style={{ color: '#636a6d', marginRight: '.2rem', transform: 'scale(.8) rotate(-180deg)' }} />}
                    {dailyDifference} ({dailyIncrease}%)
            </h3>

            <span>daily number of new people tested positive reported on {basket.length && countryCode && basket[0][countryCode].data[basket[0][countryCode].data.length - 1].date}</span><br></br>
            <h3>last 7 days: {weekFigure}</h3>
            <h3 style={weekDifference > 0 ? 
                { background: 'rgba(204,226,216,1)', color: 'rgba(0,90,48,1)' } : 
                { background: 'rgba(246,215,210,1)', color: 'rgba(148,37,20,1)' }}>
                    {weekDifference > 0 ? 
                        <FontAwesomeIcon icon={faArrowUp} style={{ color: '#636a6d', marginRight: '.2rem', transform: 'scale(.8)' }} /> : 
                        <FontAwesomeIcon icon={faArrowUp} style={{ color: '#636a6d', marginRight: '.2rem', transform: 'scale(.8) rotate(-180deg)' }} />}
                    {weekDifference} ({weekIncrease}%)
            </h3>

            <h3>total: {basket.length && countryCode && basket[0][countryCode].data[basket[0][countryCode].data.length - 1].total_cases}</h3>
            <span>cumulative total number of people tested positive reported up to {basket.length && countryCode && basket[0][countryCode].data[basket[0][countryCode].data.length - 1].date}</span> */}
        </div>
    )
}

export default Cases;
