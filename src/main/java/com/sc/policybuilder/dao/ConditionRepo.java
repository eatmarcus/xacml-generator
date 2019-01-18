package com.sc.policybuilder.dao;

import com.sc.policybuilder.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class ConditionRepo {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public Condition getConditionById(int id){
        Condition condition = new Condition();

        String stmt = "select * from rules_condition where rule_id=" + id;
        SqlRowSet rs = jdbcTemplate.queryForRowSet(stmt);
        while(rs.next()){
            ApplyWrapper aw = new ApplyWrapper();
            aw.setFunctionId(rs.getString(3));

            //Add default Apply into Apply Wrapper
            ApplyDefault ad = new ApplyDefault();
            ad.setFunctionId("urn:oasis:names:tc:xacml:3.0:function:any-of");
            Function f = new Function();
            f.setFunctionId("urn:oasis:names:tc:xacml:1.0:function:string-regexp-match");
            ad.setFunction(f);
            AttributeValue av = new AttributeValue();
            av.setDataType("http://www.w3.org/2001/XMLSchema#string");
            av.setValue("^$");
            ad.setAttributeValue(av);
            AttributeDesignator attributeDesignator = new AttributeDesignator();
            attributeDesignator.setCategory("urn:oasis:names:tc:xacml:3.0:attribute-category:resource");
            attributeDesignator.setAttributeId("urn:oasis:names:tc:xacml:1.0:resource:field-id");
            attributeDesignator.setDataType("http://www.w3.org/2001/XMLSchema#string");
            attributeDesignator.setMustBePresent("false");
            ad.setAttributeDesignator(attributeDesignator);
            aw.setApplyDefault(ad);

            //create Apply
            Apply apply = new Apply();
            apply.setFunctionId(rs.getString(4));
            //create Function and add into Apply
            Function f2 = new Function();
            f2.setFunctionId(rs.getString(5));
            apply.setFunction(f2);
            //create AttributeDesignator and add to Apply
            AttributeDesignator ad2 = new AttributeDesignator();
            int predicateKey = rs.getInt(6);
            String stmt2 = "select * from predicate_constant where id=" + predicateKey;
            SqlRowSet rs2 = jdbcTemplate.queryForRowSet(stmt2);
            while(rs2.next()){
                ad2.setCategory(rs2.getString(2));
                ad2.setDataType(rs2.getString(3));
                ad2.setMustBePresent(rs2.getString(4));
                ad2.setAttributeId(rs2.getString(5));
            }
            apply.setAttributeDesignator(ad2);

            //create ApplyAV and add to Apply
            ApplyAV applyAV = new ApplyAV();
            ArrayList<AttributeValue> attributeValueArrayList = new ArrayList<>();
            String stmt3 = "select * from predicate_value_condition where rules_condition_id=" + rs.getInt(1);
            SqlRowSet rs3 = jdbcTemplate.queryForRowSet(stmt3);
            while(rs3.next()){
                AttributeValue avTemp = new AttributeValue();
                avTemp.setValue(rs3.getString(4));
                avTemp.setDataType(rs3.getString(3));
                attributeValueArrayList.add(avTemp);
            }
            applyAV.setAttributeValueArrayList(attributeValueArrayList);
            applyAV.setFunctionId("urn:oasis:names:tc:xacml:1.0:function:string-bag");
            apply.setApplyAV(applyAV);

            //add Apply to AW
            aw.setApply(apply);
            condition.setApplyWrapper(aw);
        }
        return condition;
    }
}
