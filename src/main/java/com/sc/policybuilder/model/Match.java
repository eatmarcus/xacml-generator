package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlRootElement(name = "Match")
@XmlAccessorType(XmlAccessType.FIELD)
public class Match {

    @XmlAttribute(name="MatchId")
    private String matchId;
    @XmlElement(name="AttributeValue")
    private AttributeValue attributeValue;
    @XmlElement(name="AttributeDesignator")
    private AttributeDesignator attributeDesignator;
}
