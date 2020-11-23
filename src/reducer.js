export const initialState = {
    basket: [],
    countryBasket: [{
        name: 'World'
    }]
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_COUNTRY':
            return {
                ...state,
                basket: [action.location]
            };
            break;
        case 'SET_COUNTRY_BASKET':
            return {
                ...state,
                countryBasket: [action.countryLocation]
            }
        default:
            return state;
    };
};

export default reducer;