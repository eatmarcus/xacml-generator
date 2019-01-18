/*
 * action types
 */

export const SAVE_CONDITIONS = 'SAVE_CONDITIONS'

/*
 * action creators
 */


export function saveConditions(newConditions){
  return { type: SAVE_CONDITIONS, newConditions }
}