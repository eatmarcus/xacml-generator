package com.sc.policybuilder.model;

import lombok.Data;
import javax.xml.bind.annotation.*;
import java.util.ArrayList;

@Data
@XmlRootElement(name = "AllOf")
@XmlAccessorType(XmlAccessType.FIELD)
public class AllOf {

    @XmlElement(name="Match")
    private ArrayList<Match> matchList;
}
