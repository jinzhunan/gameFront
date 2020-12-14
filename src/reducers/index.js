import { combineReducers } from 'redux';

import users from './users';
import messages from './messages';

export const reducers = combineReducers({ users, messages });
