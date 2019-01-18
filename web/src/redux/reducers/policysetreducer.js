import { SAVE_POLICYSET } from '../actions/policysetactions'

const initialState = {
    policySet: {
        xmlns: 'urn:oasis:names:tc:xacml:3.0:core:schema:wd-17',
        policyset_id: '',
        version: '1.0',
        policycombiningalgid: 'urn:oasis:names:tc:xacml:3.0:policy-combining-algorithm:deny-unless-permit',
        description: ''
    }
}

const policySet = (state = initialState, action) => {
    switch(action.type){
        case SAVE_POLICYSET:
            return Object.assign({}, state, {
                policySet: action.policySet
            });
        default:
            return state;
    }
}

export default policySet;