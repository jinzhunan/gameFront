import { SET_MESSAGE, CLEAR_MESSAGE } from '../constants/actionTypes';

export default (messages = {}, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      console.log(action.payload)
      return action.payload;
    case CLEAR_MESSAGE:
      return {};

    default:
      return messages;
  }
};

