package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;

@Data
@XmlRootElement(name="Apply")
@XmlAccessorType(XmlAccessType.FIELD)
public class ApplyAV {
    @XmlAttribute(name="FunctionId")
    private String functionId;
    @XmlElement(name="AttributeValue")
    private ArrayList<AttributeValue> attributeValueArrayList;
}
