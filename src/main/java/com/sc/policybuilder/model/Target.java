package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlRootElement(name = "Target")
@XmlAccessorType(XmlAccessType.FIELD)
public class Target {

    @XmlElement(name = "AnyOf")
    private AnyOf anyOf;

}
