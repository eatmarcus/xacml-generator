package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlAccessorType(XmlAccessType.FIELD)
public class AttributeValue {
    @XmlAttribute(name="DataType")
    private String dataType;
    @XmlValue
    private String value;
}
