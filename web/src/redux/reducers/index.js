import { combineReducers } from "redux";
import policySet from "./policysetreducer";
import policy from "./policyreducer";
import rule from "./rulesreducer";
import condition from "./conditionreducer";


export default combineReducers({ policySet, policy, rule, condition });
