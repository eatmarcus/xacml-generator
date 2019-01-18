package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlRootElement(name="Apply")
@XmlAccessorType(XmlAccessType.FIELD)
public class ApplyDefault {
    @XmlAttribute(name="FunctionId")
    private String functionId;
    @XmlElement(name="Function")
    private Function function;
    @XmlElement(name="AttributeValue")
    private AttributeValue attributeValue;
    @XmlElement(name="AttributeDesignator")
    private AttributeDesignator attributeDesignator;
}
