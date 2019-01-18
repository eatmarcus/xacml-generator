package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlAccessorType(XmlAccessType.FIELD)
public class Function {

    @XmlAttribute(name="FunctionId")
    private String functionId;

}
