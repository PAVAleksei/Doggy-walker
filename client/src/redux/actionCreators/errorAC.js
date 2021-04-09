import { SET_ERROR } from '../types/errorTypes'

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error
  }
}
