package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlRootElement(name = "Apply")
@XmlAccessorType(XmlAccessType.FIELD)
public class Apply {

    @XmlAttribute(name="FunctionId")
    private String functionId;
    @XmlElement(name="Function")
    private Function function;
    @XmlElement(name="AttributeDesignator")
    private AttributeDesignator attributeDesignator;
    @XmlElement(name="Apply")
    private ApplyAV applyAV;

}
