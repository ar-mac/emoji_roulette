import * as types from './types';
import { saveToLocalStorage } from '../../utils/localStorage';

export const login = () => dispatch => {
  saveToLocalStorage('isRegistered', true);
  dispatch({type: types.LOGIN})
};

export const logout = () => dispatch => {
  saveToLocalStorage('isRegistered', false);
  saveToLocalStorage('draws', {});
  dispatch({type: types.LOGOUT})
};
