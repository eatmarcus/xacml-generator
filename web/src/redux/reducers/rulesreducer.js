import { SAVE_RULES } from '../actions/ruleactions'

const initialState = {
    rules: []
}

const rule = (state = initialState, action) => {
    switch(action.type){
        case SAVE_RULES:
            return Object.assign({}, state, {
                rules: action.newRules
            })    
        default:
            return state;
    }
}

export default rule;