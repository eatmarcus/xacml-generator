package com.sc.policybuilder;

import com.sc.policybuilder.controller.AclController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.Scanner;

@SpringBootApplication
public class PolicybuilderApplication {

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(PolicybuilderApplication.class, args);

        AclController controller = (AclController) ctx.getBean("aclController");
        // Scanner reader = new Scanner(System.in);
        // try{
        //     System.out.print("Enter Policy ID: ");
        //     int id = reader.nextInt();
        //     System.out.print("Pick a file name (e.g acl.xml): ");
        //     String fileName = reader.next();
        //     controller.generatePolicyXML(id, fileName);
        // }finally{
        //     System.out.println("Policy file generated in policy folder (in project root).");
        //     reader.close();
        // }
    }

}
