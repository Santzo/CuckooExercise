import { NEW_POST, POST_UPDATED } from './actionTypes';

export const postUpdated = () => dispatch => {
    dispatch({ type: POST_UPDATED });
}
