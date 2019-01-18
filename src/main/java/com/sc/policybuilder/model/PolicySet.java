package com.sc.policybuilder.model;

import lombok.Data;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;

@Data
@XmlRootElement(name="PolicySet")
@XmlAccessorType(XmlAccessType.FIELD)
public class PolicySet {

    @XmlAttribute
    private String xmlns;
    @XmlAttribute(name="PolicySetId")
    private String policySetId;
    @XmlAttribute(name="Version")
    private String version;
    @XmlAttribute(name="PolicyCombiningAlgId")
    private String policyCombiningAlgId;
    @XmlElement(name="Description")
    private String description;
    @XmlElement(name="Target")
    private Target target;
    @XmlElement(name = "Policy")
    private ArrayList<Policy> policy;
}
