/*
 * action types
 */

export const SAVE_RULES = 'SAVE_RULES'

/*
 * action creators
 */


export function saveRules(newRules){
  return { type: SAVE_RULES, newRules }
}