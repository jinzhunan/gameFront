import { SET_MESSAGE, CLEAR_MESSAGE } from '../constants/actionTypes';

export const setMessage = (message) => async (dispatch) => {

    dispatch({ type: SET_MESSAGE, payload: message });
};

export const clearMessage = () => async (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_MESSAGE});
    }, 4000);

};
