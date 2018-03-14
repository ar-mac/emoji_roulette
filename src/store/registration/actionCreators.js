import * as types from './types';
import { saveRegistrationStatus } from '../../utils/localStorage';

export const login = () => dispatch => {
  saveRegistrationStatus(true)  
  dispatch({type: types.LOGIN})
};

export const logout = () => dispatch => {
  saveRegistrationStatus(false)
  dispatch({type: types.LOGOUT})
};
