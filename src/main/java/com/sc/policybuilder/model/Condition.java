package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlRootElement(name="Condition")
@XmlAccessorType(XmlAccessType.FIELD)
public class Condition {
    @XmlElement(name="Apply")
    private ApplyWrapper applyWrapper;
}
