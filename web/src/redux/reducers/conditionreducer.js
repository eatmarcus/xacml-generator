import { SAVE_CONDITIONS } from '../actions/conditionactions'

const initialState = {
    conditions: []
}

const condition = (state = initialState, action) => {
    switch(action.type){
        case SAVE_CONDITIONS:
            return Object.assign({}, state, {
                conditions: action.newConditions
            })    
        default:
            return state;
    }
}

export default condition;