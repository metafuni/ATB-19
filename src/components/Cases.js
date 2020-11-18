import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider';


function Cases() {
    const [{ basket }, dispatch] = useStateValue();

    const [dailyIncrease, setDailyIncrease] = useState();
    const [dailyDifference, setDailyDifference] = useState();
    const [weekFigure, setWeekFigure] = useState();
    const [weekDifference, setWeekDifference] = useState();
    const [weekIncrease, setWeekIncrease] = useState();

    const calcDailyIncrease = () => {
        let today = basket[0].OWID_WRL.data[basket[0].OWID_WRL.data.length - 1].new_cases;
        let yesterday = basket[0].OWID_WRL.data[basket[0].OWID_WRL.data.length - 2].new_cases;
        let difference = today - yesterday;
        setDailyDifference(difference);
        let percentage = (difference / today) * 100;
        setDailyIncrease(percentage.toFixed(2));
    };

    const calcWeeklyNumber = () => {
        let weekArray = [];
        for (let i = 1; i < 8; i++) {
            weekArray.push(basket[0].OWID_WRL.data[basket[0].OWID_WRL.data.length - i].new_cases);
        };
        let weeknum = weekArray.reduce((a, b) => a + b, 0)

        setWeekFigure(weeknum);
        calcWeeklyIncrease(weeknum);
    };

    const calcWeeklyIncrease = (weeknum) => {
        // let today = basket[0].OWID_WRL.data[basket[0].OWID_WRL.data.length - 1].new_cases;
        // let yesterday = basket[0].OWID_WRL.data[basket[0].OWID_WRL.data.length - 2].new_cases;
        // let difference = today - yesterday;
        // setDailyDifference(difference);
        // let percentage = (difference / today) * 100;
        // setDailyIncrease(percentage.toFixed(2));

        let lastweekArray = [];
        for (let i = 8; i < 15; i++) {
            lastweekArray.push(basket[0].OWID_WRL.data[basket[0].OWID_WRL.data.length - i].new_cases);
        };
        let lastweekNumber = lastweekArray.reduce((a, b) => a + b, 0);
        console.log(weeknum)

        setWeekDifference(weeknum - lastweekNumber);
        let percentage = ((weeknum - lastweekNumber)/weeknum) * 100;
        setWeekIncrease(percentage.toFixed(2));
    };


    useEffect(() => {
        if (basket.length) {
            calcDailyIncrease();
            calcWeeklyNumber();
        };
    }, [basket]);

    return (
        <div>
            New confirmed cases of COVID-19
            <br></br>
            <h3>today: {basket.length && basket[0].OWID_WRL.data[basket[0].OWID_WRL.data.length - 1].new_cases}</h3>
            <h3>difference: {dailyDifference} ({dailyIncrease}%)</h3>

            <span>daily number of new people tested positive reported on {basket.length && basket[0].OWID_WRL.data[basket[0].OWID_WRL.data.length - 1].date}</span><br></br>
            <h3>last 7 days: {weekFigure}</h3>
            <h3>difference: {weekDifference} ({weekIncrease}%)</h3>

            <h3>total: {basket.length && basket[0].OWID_WRL.data[basket[0].OWID_WRL.data.length - 1].total_cases}</h3>
            <span>cumulative total number of people tested positive reported up to {basket.length && basket[0].OWID_WRL.data[basket[0].OWID_WRL.data.length - 1].date}</span>
        </div>
    )
}

export default Cases;
