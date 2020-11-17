import React from 'react';
import { useStateValue } from '../StateProvider';


function Deaths() {
    const [{ basket }, dispatch] = useStateValue();

    return (
        <div>
            New deaths attributed to COVID-19	
        </div>
    )
}

export default Deaths;
