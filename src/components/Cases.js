import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider';


function Cases() {
    const [{ basket, countryBasket }, dispatch] = useStateValue();

    const [dailyIncrease, setDailyIncrease] = useState();
    const [dailyDifference, setDailyDifference] = useState();
    const [weekFigure, setWeekFigure] = useState();
    const [weekDifference, setWeekDifference] = useState();
    const [weekIncrease, setWeekIncrease] = useState();
    const [countryCode, setCountryCode] = useState();

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

    useEffect(() => {
        setCountryCode(countryBasket[0].alpha3Code);
        if (basket.length) {
            calcDailyIncrease();
            calcWeeklyNumber();
        };
    });

    return (
        <div>
            New confirmed cases of COVID-19
            <br></br>
            <h3>today: {basket.length && countryCode && basket[0][countryCode].data[basket[0][countryCode].data.length - 1].new_cases}</h3>
            <h3>difference: {dailyDifference} ({dailyIncrease}%)</h3>

            <span>daily number of new people tested positive reported on {basket.length && countryCode && basket[0][countryCode].data[basket[0][countryCode].data.length - 1].date}</span><br></br>
            <h3>last 7 days: {weekFigure}</h3>
            <h3>difference: {weekDifference} ({weekIncrease}%)</h3>

            <h3>total: {basket.length && countryCode && basket[0][countryCode].data[basket[0][countryCode].data.length - 1].total_cases}</h3>
            <span>cumulative total number of people tested positive reported up to {basket.length && countryCode && basket[0][countryCode].data[basket[0][countryCode].data.length - 1].date}</span>
        </div>
    )
}

export default Cases;
