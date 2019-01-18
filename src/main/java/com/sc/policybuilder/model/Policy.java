package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;

@Data
@XmlRootElement(name = "Policy")
@XmlAccessorType(XmlAccessType.FIELD)
public class Policy {

    @XmlAttribute(name="PolicyId")
    private String policyId;
    @XmlAttribute(name="Version")
    private String version;
    @XmlAttribute(name="RuleCombiningAlgId")
    private String ruleCombiningAlgId;
    @XmlElement(name="Description")
    private String description;
    @XmlElement(name="Target")
    private Target target;
    @XmlElement(name="Rule")
    private ArrayList<Rules> rule;
}
