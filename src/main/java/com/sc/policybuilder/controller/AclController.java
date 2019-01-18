package com.sc.policybuilder.controller;

import com.google.gson.JsonArray;
import com.sc.policybuilder.dao.*;
import com.sc.policybuilder.model.PolicySet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import com.google.gson.*;
import java.util.ArrayList;
import javax.xml.bind.*;
import java.io.File;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;

import org.springframework.util.FileCopyUtils;

import java.io.InputStream;

@Controller
public class AclController {

    @Autowired
    PolicySetRepo psRepo;

    @Autowired
    MatchRepo matchRepo;

    @Autowired
    PolicyRepo pRepo;

    @Autowired
    RulesRepo rRepo;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/downloadPolicyXML", method = RequestMethod.GET)
    public void downloadPolicyXML(HttpServletResponse response, int id) {
        PolicySet ps = psRepo.getPolicySetById(id);

        try{

            File file = new File("acl.xml");
            JAXBContext jaxbContext = JAXBContext.newInstance(PolicySet.class);
            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

            // output pretty printed
            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            jaxbMarshaller.setProperty("com.sun.xml.bind.xmlHeaders",
                    "\n<!DOCTYPE xml>\n");
            jaxbMarshaller.marshal(ps, file);

            InputStream in = new FileInputStream(file);
            response.setContentType("application/xml");
            response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
            response.setHeader("Content-Length", String.valueOf(file.length()));
            FileCopyUtils.copy(in, response.getOutputStream());
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/listOfPolicyId", method = RequestMethod.GET)
    public @ResponseBody ArrayList<Integer> listOfPolicyId(HttpServletResponse response) {
        ArrayList<Integer> result = psRepo.getListOfPolicyId();
        response.setStatus(200);
        return result;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/listOfPredicateConstants", method = RequestMethod.GET)
    public @ResponseBody String listOfPredicateConstants(HttpServletResponse response) {
        String result = matchRepo.getPredicateConstants().toString();
        response.setStatus(200);
        return result;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/addPredicateConstants", method = RequestMethod.POST)
    public @ResponseBody String addPredicateConstants(HttpServletResponse response, @RequestBody String body) {
        response.setStatus(200);
        return "success";
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/addPolicySet", method = RequestMethod.POST, produces="application/json", consumes="application/json")
    public @ResponseBody String addPolicySet(HttpServletResponse response, @RequestBody String body) {
        JsonParser parser = new JsonParser();
        JsonObject request = (JsonObject) parser.parse(body);
        JsonObject data = request.getAsJsonObject("data");
        JsonObject policySet = data.getAsJsonObject("policySet");
        JsonArray policies = data.getAsJsonArray("policies");
        JsonArray conditions = data.getAsJsonArray("conditions");
        JsonArray rules = data.getAsJsonArray("rules");
        
        psRepo.addPolicySet(policySet);
        pRepo.addPolicies(policies, rules, conditions);
        response.setStatus(200);
        return body;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/addPredicateConstant", method = RequestMethod.POST, produces="application/json", consumes="application/json")
    public @ResponseBody String addPredicateConstant(HttpServletResponse response, @RequestBody String body) {
        JsonParser parser = new JsonParser();
        JsonObject request = (JsonObject) parser.parse(body);
        

        pRepo.addPredicateConstant(request);

        response.setStatus(200);
        return body;
    }

    public void generatePolicyXML(int id, String filename) {
        PolicySet ps = psRepo.getPolicySetById(id);

        try{

            File file = new File("./policy/"+filename);
            JAXBContext jaxbContext = JAXBContext.newInstance(PolicySet.class);
            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

            // output pretty printed
            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            jaxbMarshaller.setProperty("com.sun.xml.bind.xmlHeaders",
                    "\n<!DOCTYPE xml>\n");
            jaxbMarshaller.marshal(ps, file);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
