package com.sc.policybuilder.dao;

import com.sc.policybuilder.model.AllOf;
import com.sc.policybuilder.model.AnyOf;
import com.sc.policybuilder.model.Match;
import com.sc.policybuilder.model.Target;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class TargetRepo {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    MatchRepo mRepo;

    public Target getTargetByRuleId(int id){
        Target t = new Target();
        ArrayList<Match> m = mRepo.getMatchListByRuleId(id);
        AllOf allOf  = new AllOf();
        allOf.setMatchList(m);
        AnyOf anyOf = new AnyOf();
        anyOf.setAllOf(allOf);
        t.setAnyOf(anyOf);
        return t;
    }

    public Target getTargetByPredicateId(int id){
        Target t = new Target();
        ArrayList<Match> m = mRepo.getMatchListByPredicateId(id);
        AllOf allOf  = new AllOf();
        allOf.setMatchList(m);
        AnyOf anyOf = new AnyOf();
        anyOf.setAllOf(allOf);
        t.setAnyOf(anyOf);
        return t;
    }

}
