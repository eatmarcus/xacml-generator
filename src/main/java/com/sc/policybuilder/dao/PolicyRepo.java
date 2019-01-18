package com.sc.policybuilder.dao;

import com.google.gson.JsonArray;
import com.sc.policybuilder.model.Policy;
import com.sc.policybuilder.model.Rules;
import com.sc.policybuilder.model.Target;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.lang.Thread;

@Repository
public class PolicyRepo {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    TargetRepo tRepo;

    @Autowired
    RulesRepo rRepo;

    public ArrayList<Policy> getPolicyListById(int id) {
        String stmt = "select * from policy where ps_id=" + id;
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);

        ArrayList<Policy> pList = new ArrayList<Policy>();
        while (rs.next()) {
            // find the first target that this policy has
            int predicateId = rs.getInt(1);
            Target t = tRepo.getTargetByPredicateId(predicateId);

            Policy p = new Policy();
            p.setTarget(t);
            p.setPolicyId(rs.getString(2));
            p.setVersion(rs.getString(3));
            p.setRuleCombiningAlgId(rs.getString(4));
            p.setDescription(rs.getString(5));

            ArrayList<Rules> rList = rRepo.getListOfRulesById(rs.getInt(1));
            p.setRule(rList);
            pList.add(p);
        }
        return pList;
    }

    public Integer getLastIdOfPolicySet(){
        String stmt = "select id from policyset";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        int lastId = 0;
        while(rs.next()){
            lastId = rs.getInt(1);
        }
        return lastId;
    }

    public Integer getLastIdOfPolicy(){
        String stmt = "select id from policy";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        int lastId = 0;
        while(rs.next()){
            lastId = rs.getInt(1);
        }
        return lastId + 1;
    }

    public Integer getLastIdOfPolicyPredicate(){
        String stmt = "select id from policy_predicate";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        int lastId = 0;
        while(rs.next()){
            lastId = rs.getInt(1);
        }
        return lastId + 1;
    }

    public Integer getLastIdOfRules(){
        String stmt = "select id from rules";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        int lastId = 0;
        while(rs.next()){
            lastId = rs.getInt(1);
        }
        return lastId + 1;
    }
    
    public Integer getLastIdOfPredicateConstant(){
        String stmt = "select id from predicate_constant";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        int lastId = 0;
        while(rs.next()){
            lastId = rs.getInt(1);
        }
        return lastId + 1;
    }

    public void addPredicateConstant(JsonObject request){
        JsonObject predicateConstant = request.get("data").getAsJsonObject();
        String stmt = "insert into predicate_constant values (" + getLastIdOfPredicateConstant() + ", '" + predicateConstant.get("category").getAsString() + "', '" + predicateConstant.get("dataType").getAsString()
         + "', '" + predicateConstant.get("mustBePresent").getAsString() + "', '" + predicateConstant.get("attributeId").getAsString() + "')";

         jdbcTemplate.execute(stmt);
    }

    public Integer getLastIdOfRulesPredicate(){
        String stmt = "select id from rules_predicate";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        int lastId = 0;
        while(rs.next()){
            lastId = rs.getInt(1);
        }
        return lastId + 1;
    }

    public Integer getLastIdOfRulesCondition(){
        String stmt = "select id from rules_condition";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        int lastId = 0;
        while(rs.next()){
            lastId = rs.getInt(1);
        }
        return lastId + 1;
    }

    public Integer getLastIdOfCondValue(){
        String stmt = "select id from predicate_value_condition";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        int lastId = 0;
        while(rs.next()){
            lastId = rs.getInt(1);
        }
        return lastId + 1;
    }

    public void addPolicies(JsonArray policies, JsonArray rules, JsonArray conditions) {
        Iterator<JsonElement> itr = policies.iterator();
        int policySetId = getLastIdOfPolicySet();
        int ruleIndex = 0;
        while (itr.hasNext()) {
            JsonElement element = itr.next();
            JsonObject obj = element.getAsJsonObject();
            int policyId = getLastIdOfPolicy();
            int policyPredicateId = getLastIdOfPolicyPredicate();
            int ruleId = getLastIdOfRules();
            int conditionId = getLastIdOfRulesCondition();

            String stmt = "insert into policy values (" + policyId + ", '" + obj.get("policyId").getAsString() 
                + "', '" + obj.get("version").getAsString() + "', '" + obj.get("ruleCombiningAlgId").getAsString() + "', '"
                + obj.get("description").getAsString() + "', " + policySetId + ")";

            // jdbcTemplate.execute(stmt);

            JsonObject predicate = obj.get("predicateConstant").getAsJsonObject();
            String stmt2 = "insert into policy_predicate values (" + policyPredicateId + ", " + policyId + ", " + predicate.get("id").getAsInt()
            + ", '" + obj.get("attributeValue").getAsString() + "', '" + obj.get("matchId").getAsString() + "')";
            
            // jdbcTemplate.execute(stmt2);
            
            JsonObject ruleObj = rules.get(ruleIndex).getAsJsonObject();
            String stmt3 = "insert into rules values (" + ruleId + ", '" + ruleObj.get("ruleId").getAsString() 
            + "', '" + ruleObj.get("ruleEffect").getAsString() + "', '" + ruleObj.get("description").getAsString() + "', " + policyId + ")";
            
            // jdbcTemplate.execute(stmt3);

            String[] sqlArray = {stmt, stmt2, stmt3};

            jdbcTemplate.batchUpdate(sqlArray);

            JsonArray matchArray = ruleObj.get("match").getAsJsonArray();
            Iterator<JsonElement> matchItr = matchArray.iterator();
            while(matchItr.hasNext()){
                JsonObject matchObj = matchItr.next().getAsJsonObject();
                int matchId = getLastIdOfRulesPredicate();
                JsonObject matchPredicate = matchObj.get("predicateConstant").getAsJsonObject();
                
                String matchStmt = "insert into rules_predicate values (" + matchId + ", " + ruleId + ", " + matchPredicate.get("id").getAsInt() + ", '"
                + matchObj.get("predicateValue").getAsString() + "', '" + matchObj.get("matchId").getAsString() + "')";
                
                jdbcTemplate.execute(matchStmt);
            }
            Thread t = Thread.currentThread();
            try{
                t.sleep(2000);
            }catch(Exception e){
                e.printStackTrace();
            }
            System.out.println(ruleIndex);
            System.out.println(conditions);
            JsonObject conditionObj = conditions.get(ruleIndex).getAsJsonObject();
            JsonObject conditionPredicate = conditionObj.get("predicateConstant").getAsJsonObject();
            String stmt4 = "insert into rules_condition values (" + conditionId + ", " + ruleId + ", '" + conditionObj.get("functionApplyWrapId").getAsString()
            + "', '" + conditionObj.get("functionApplyId").getAsString() + "', '" + conditionObj.get("functionId").getAsString() + "', "
            + conditionPredicate.get("id").getAsInt() + ")";

            jdbcTemplate.execute(stmt4);

            JsonArray condValueArray = conditionObj.get("attributeValue").getAsJsonArray();
            Iterator<JsonElement> condValueItr = condValueArray.iterator();
            while(condValueItr.hasNext()){
                JsonObject condValueObj = condValueItr.next().getAsJsonObject();
                int condValueId = getLastIdOfCondValue();
                
                String condValueStmt = "insert into predicate_value_condition values (" + condValueId + ", " + conditionId + ", '" + condValueObj.get("dataType").getAsString()
                + "', '" + condValueObj.get("value").getAsString() + "')";
                jdbcTemplate.execute(condValueStmt);
            }
            ruleIndex++;
        }
    }

}
