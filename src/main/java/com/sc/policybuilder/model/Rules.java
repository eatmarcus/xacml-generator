package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlRootElement(name = "Rule")
@XmlAccessorType(XmlAccessType.FIELD)
public class Rules {

    @XmlAttribute(name="RuleId")
    private String ruleId;
    @XmlAttribute(name="Effect")
    private String effect;
    @XmlElement(name="Description")
    private String description;
    @XmlElement(name="Target")
    private Target target;
    @XmlElement(name="Condition")
    private Condition condition;
}
