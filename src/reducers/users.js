import { SET_USERS, EDIT_USERS, CLEAR_USERS } from '../constants/actionTypes';

export default (users = {jwt: localStorage.getItem('jwt')}, action) => {
  switch (action.type) {
    case CLEAR_USERS:
      return {};
    case SET_USERS:
      console.log(action.payload)
      return {...users, 
        userName: action.payload.username, 
        userRole: action.payload.role.name, 
        descriptionRole: action.payload.role.description, 
        userId: action.payload.id, 
        createdAt: action.payload.createdAt, 
        provider: action.payload.provider, 
        updatedAt: action.payload.updatedAt, 
        email: action.payload.email}
    case EDIT_USERS:
      console.log(action.payload)
      return {...users, 
        userName: action.payload.username, 
        userRole: action.payload.role.name, 
        descriptionRole: action.payload.role.description, 
        userId: action.payload.id, 
        createdAt: action.payload.createdAt, 
        provider: action.payload.provider, 
        updatedAt: action.payload.updatedAt, 
        email: action.payload.email}

    default:
      return users;
  }
};

