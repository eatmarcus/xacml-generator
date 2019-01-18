package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlAccessorType(XmlAccessType.FIELD)
public class AttributeDesignator {
    @XmlAttribute(name="AttributeId")
    private String attributeId;
    @XmlAttribute(name="Category")
    private String category;
    @XmlAttribute(name="DataType")
    private String dataType;
    @XmlAttribute(name="MustBePresent")
    private String mustBePresent;
}
