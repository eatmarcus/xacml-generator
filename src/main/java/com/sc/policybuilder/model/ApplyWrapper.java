package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlRootElement(name="Apply")
@XmlAccessorType(XmlAccessType.FIELD)
public class ApplyWrapper {

    @XmlAttribute(name="FunctionId")
    private String functionId;
    @XmlElement(name="Apply")
    private ApplyDefault applyDefault;
    @XmlElement(name="Apply")
    private Apply apply;
}
