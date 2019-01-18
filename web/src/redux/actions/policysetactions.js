/*
 * action types
 */

export const SAVE_POLICYSET = 'SAVE_POLICYSET'


/*
 * action creators
 */

export function savePolicySet(policySet) {
  return { type: SAVE_POLICYSET, policySet }
}