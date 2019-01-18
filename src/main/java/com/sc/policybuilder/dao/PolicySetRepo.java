package com.sc.policybuilder.dao;

import com.sc.policybuilder.model.Policy;
import com.sc.policybuilder.model.PolicySet;
import com.sc.policybuilder.model.Target;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import com.google.gson.*;

import java.util.ArrayList;

@Repository
public class PolicySetRepo {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    PolicyRepo pRepo;

    public PolicySet getPolicySetById(int id){
        String stmt = "select * from policyset where id=" + id;
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        PolicySet ps = new PolicySet();
        Target t = new Target();
        ps.setTarget(t);
        while(rs.next()){
            ps.setXmlns(rs.getString(2));
            ps.setPolicySetId(rs.getString(3));
            ps.setVersion(rs.getString(4));
            ps.setPolicyCombiningAlgId(rs.getString(5));
            ps.setDescription(rs.getString(6));
        }
        ArrayList<Policy> pList = pRepo.getPolicyListById(id);
        ps.setPolicy(pList);
        return ps;
    }

    public ArrayList<Integer> getListOfPolicyId(){
        String stmt = "select id from policyset";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        ArrayList<Integer> result = new ArrayList<Integer>();
        while(rs.next()){
            result.add(Integer.parseInt(rs.getString(1)));
        }
        return result;
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

    public void addPolicySet(JsonObject policySet){
        int lastId = getLastIdOfPolicySet();
        int newId = lastId + 1;
        String stmt = "insert into policyset values (" + newId + ", '" + policySet.get("xmlns").getAsString() + "', '" + policySet.get("policyset_id").getAsString() 
        + "', '" + policySet.get("version").getAsString() + "', '" + policySet.get("policycombiningalgid").getAsString() + "', '" + policySet.get("description").getAsString() + "')";

        jdbcTemplate.execute(stmt);
    }
}
