import { SAVE_POLICIES, ADD_POLICY, REMOVE_POLICY } from '../actions/policyactions'

const initialState = {
    policies: [
        {   
            policyId: '',
            version: '1.0',
            ruleCombiningAlgId: 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit',
            description: '',
            attributeValue : '',
            matchId: 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match',
            predicateConstant: {id: "2", category: "urn:oasis:names:tc:xacml:3.0:attribute-category:resource", datatype: "http://www.w3.org/2001/XMLSchema#string", mustbepresent: "true", attributeid: "urn:oasis:names:tc:xacml:2.0:resource:scope"}
        }
    ]
}

const policy = (state = initialState, action) => {
    switch(action.type){
        case SAVE_POLICIES:
            return Object.assign({}, state, {
                policies: action.policies
            });
        case ADD_POLICY:
            return Object.assign({}, state, {
                policies: [...state.policies, action.newPolicy]
            });
        case REMOVE_POLICY:
            state.policies.splice(action.index-1, 1);
            return Object.assign({}, state, {
                policies: state.policies
            })
        default:
            return state;
    }
}

export default policy;