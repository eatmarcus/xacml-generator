/*
 * action types
 */

export const ADD_POLICY = 'ADD_POLICY'
export const SAVE_POLICIES = 'SAVE_POLICIES'
export const REMOVE_POLICY = 'REMOVE_POLICY'

/*
 * action creators
 */

export function addPolicy(newPolicy) {
  return { type: ADD_POLICY, newPolicy }
}

export function savePolicies(policies){
    return { type: SAVE_POLICIES, policies}
}

export function removePolicy(index) {
  return { type: REMOVE_POLICY , index }
}