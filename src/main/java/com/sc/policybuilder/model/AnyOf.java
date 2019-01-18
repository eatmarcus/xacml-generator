package com.sc.policybuilder.model;

import lombok.Data;
import javax.xml.bind.annotation.*;

@Data
@XmlRootElement(name = "AnyOf")
@XmlAccessorType(XmlAccessType.FIELD)
public class AnyOf {

    @XmlElement(name="AllOf")
    private AllOf allOf;
}
