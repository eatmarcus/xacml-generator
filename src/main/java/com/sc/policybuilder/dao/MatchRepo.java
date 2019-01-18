package com.sc.policybuilder.dao;

import com.sc.policybuilder.model.AttributeDesignator;
import com.sc.policybuilder.model.AttributeValue;
import com.sc.policybuilder.model.Match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import com.google.gson.*;

import java.util.ArrayList;

@Repository
public class MatchRepo {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public ArrayList<Match> getMatchListByRuleId(int id){
        ArrayList<Match> result = new ArrayList<Match>();

        String stmt = "select * from rules_predicate where rule_id=" + id;
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        int predicateKey;
        while(rs.next()){
            Match m = new Match();
            m.setMatchId(rs.getString(5));
            //get values from predicate_constant table
            predicateKey = rs.getInt(3);
            AttributeValue av = new AttributeValue();
            av.setValue(rs.getString(4));
            AttributeDesignator ad = new AttributeDesignator();
            stmt = "select * from predicate_constant where id=" + predicateKey;
            SqlRowSet rs2 = jdbcTemplate.queryForRowSet(stmt);
            while(rs2.next()){
                av.setDataType(rs2.getString(3));
                ad.setCategory(rs2.getString(2));
                ad.setDataType(rs2.getString(3));
                ad.setMustBePresent(rs2.getString(4));
                ad.setAttributeId(rs2.getString(5));
            }
            m.setAttributeValue(av);
            m.setAttributeDesignator(ad);
            result.add(m);
        }

        return result;
    };

    public JsonArray getPredicateConstants(){
        JsonArray jsonArray = new JsonArray();
        String stmt = "select * from predicate_constant";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        while(rs.next()){
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("id", rs.getString(1));
            jsonObject.addProperty("category", rs.getString(2));
            jsonObject.addProperty("datatype", rs.getString(3));
            jsonObject.addProperty("mustbepresent", rs.getString(4));
            jsonObject.addProperty("attributeid", rs.getString(5));
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    public ArrayList<Match> getMatchListByPredicateId(int id) {
        ArrayList<Match> result = new ArrayList<Match>();

        String stmt = "select * from policy_predicate where policy_id=" + id;
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        int predicateKey;
        while(rs.next()){
            Match m = new Match();
            m.setMatchId(rs.getString(5));
            //get values from predicate_constant table
            predicateKey = rs.getInt(3);
            AttributeValue av = new AttributeValue();
            av.setValue(rs.getString(4));
            AttributeDesignator ad = new AttributeDesignator();
            stmt = "select * from predicate_constant where id=" + predicateKey;
            SqlRowSet rs2 = jdbcTemplate.queryForRowSet(stmt);
            while(rs2.next()){
                av.setDataType(rs2.getString(3));
                ad.setCategory(rs2.getString(2));
                ad.setDataType(rs2.getString(3));
                ad.setMustBePresent(rs2.getString(4));
                ad.setAttributeId(rs2.getString(5));
            }
            m.setAttributeValue(av);
            m.setAttributeDesignator(ad);
            result.add(m);
        }

        return result;
    };

}
