package com.sc.policybuilder.dao;

import com.sc.policybuilder.model.Condition;
import com.sc.policybuilder.model.Rules;
import com.sc.policybuilder.model.Target;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import com.google.gson.*;
import java.util.*;

import java.util.ArrayList;

@Repository
public class RulesRepo {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    TargetRepo tRepo;

    @Autowired
    ConditionRepo cRepo;

    public ArrayList<Rules> getListOfRulesById(int id){
        ArrayList<Rules> result = new ArrayList<Rules>();

        String stmt = "select * from rules where policy_id=" + id;
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        while(rs.next()){
            Rules r = new Rules();
            r.setRuleId(rs.getString(2));
            r.setEffect(rs.getString(3));
            r.setDescription(rs.getString(4));
            //need add Target from tRepo
            Target t = tRepo.getTargetByRuleId(rs.getInt(1));
            r.setTarget(t);
            Condition c = cRepo.getConditionById(rs.getInt(1));
            r.setCondition(c);
            result.add(r);
        }
        return result;
    }

}
