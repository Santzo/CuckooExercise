import { NEW_POST, POST_UPDATED } from '../actions/actionTypes'

const init = false;
export default (state = init, action) => {
    switch (action.type) {
        case NEW_POST:
            return true;
        case POST_UPDATED:
            return false;
        default:
            return state;
    }
}