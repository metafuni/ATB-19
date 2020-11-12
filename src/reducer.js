export const initialState = {
    basket: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_COUNTRY':
            return {
                ...state,
                basket: [action.location]
            };
            break;
        default:
            return state;
    };
};

export default reducer;