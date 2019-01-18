
<html><head><p align="center"><font size="3">
ACL GENERATOR</font></p><head><html>

Requirements :

        1.  Spring Boot
        
Usage :

        1. Clone the Git repo
        
        2. Compile and Run the Springboot App
            - this will automatically create a DB instance in your project root folder "acldb"
            - automatically create the schema and bootstrap the data (see schema.sql and data.sql in src/main/resources/)
            - in your console, there will be a Scanner asking you to "Enter a Policy ID". Do not enter anything 
            if you have not yet inserted anything into the DB
        
        3. Go to localhost:8080/h2-console or for some users, enter 'your-ip':8080/h2-console
            - you should see a h2-console login page
            - change JDBC Url to 'jdbc:h2:file:./acldb'  <-- this is to access the generated db instance from your file system.
            - you should be able to see the tables and data
        
        4. Insert your new Policy information into the DB using SQL scripts. *Note: you may do so either via the h2-console or by
            writing the scripts in data.sql in src/main/resources as aforementioned*
            - To aid you in your insertion, insert in this order 
                **PolicySet -> Policy -> Policy_Predicate -> Rules -> Rules_Predicate -> Rules_Condition -> Predicate_Value_Condition**
            - See the Entity Relation Diagram to have a better idea of the key mapping and refer to the example.xml to see what 
              each column represents
        
        5. Now that the PolicySet is in the DB, you may:
            1. go back to the console in runtime and enter the PolicySet ID (primary key).
                **OR**
            2. go to localhost:8080 or 'your-ip':8080 and you will see a simple HTML form. Enter the PolicySet there for it to be
            downloaded via the web browser.

ER Diagram:

![ER Diagram](./ERdiagram.png)        
        
Support:
   
        Ong, Marcus Jiong Kai <Marcusjiongkai.Ong@sc.com>;


