delete from policyset;
delete from policy;
delete from rules;
delete from rules_predicate;
delete from predicate_constant;
delete from policy_predicate;
delete from rules_condition;
delete from predicate_value_condition;

insert into policyset values (1, 'urn:oasis:names:tc:xacml:3.0:core:schema:wd-17', 'CCMS-SamplePolicy', '1.0', 'urn:oasis:names:tc:xacml:3.0:policy-combining-algorithm:deny-unless-permit', 'CCMS-PolicySet');
insert into policyset values (2, 'urn:oasis:names:tc:xacml:3.0:core:schema:wd-17', 'CCMS-SamplePolicy', '1.0', 'urn:oasis:names:tc:xacml:3.0:policy-combining-algorithm:deny-unless-permit', 'CCMS-PolicySet');
insert into policyset values (3, 'urn:oasis:names:tc:xacml:3.0:core:schema:wd-17', 'RLS-SamplePolicy', '1.0', 'urn:oasis:names:tc:xacml:3.0:policy-combining-algorithm:deny-unless-permit', 'RLS-PolicySet');

insert into policy values (1, 'CCMS-GET', '1.0', 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit', 'Policy for CCMS Insurance Resource', 1);
insert into policy values (2, 'CCMS-GET-ADMIN', '1.0', 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit', 'Policy for CCMS Insurance Resource', 2);
insert into policy values (3, 'CCMS-GET-MAKER', '1.0', 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit', 'Policy for CCMS Insurance Resource', 2);
insert into policy values (4, 'CCMS-PATCH-ADMIN', '1.0', 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit', 'Policy for CCMS Insurance Resource', 2);
insert into policy values (5, 'CCMS-PATCH-MAKER', '1.0', 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit', 'Policy for CCMS Insurance Resource', 2);
insert into policy values (6, 'INST-GET-IBANK-CUST', '1.0', 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit', 'Policy for RLS Instruction Resource', 3);
insert into policy values (7, 'INST-GET-IVR-CUST', '1.0', 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit', 'Policy for RLS Instruction Resource', 3);
insert into policy values (8, 'INST-GET-CEMS-BACKOFFICE', '1.0', 'urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit', 'Policy for RLS Instruction Resource', 3);


insert into policy_predicate values (1, 1, 2, '^/hgn/api/v1/profiles$', 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match');
insert into policy_predicate values (2, 2, 2, '^/hgn/api/v1/profiles$', 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match');
insert into policy_predicate values (3, 3, 2, '^/hgn/api/v1/profiles$', 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match');
insert into policy_predicate values (4, 4, 2, '^/hgn/api/v1/profiles$', 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match');
insert into policy_predicate values (5, 5, 2, '^/hgn/api/v1/profiles$', 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match');
insert into policy_predicate values (6, 6, 2, '^/instructions$', 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match');
insert into policy_predicate values (7, 7, 2, '^/instructions$', 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match');
insert into policy_predicate values (8, 8, 2, '^/instructions$', 'urn:oasis:names:tc:xacml:1.0:function:string-regexp-match');


insert into rules values (1, 'read_only_attributes', 'Permit', 'Validate the attributes if has read only', 1);
insert into rules values (2, 'read_only_attributes', 'Permit', 'Validate the attributes if has read only', 2);
insert into rules values (3, 'read_only_attributes', 'Permit', 'Validate the attributes if has read only', 3);
insert into rules values (4, 'read_only_attributes', 'Permit', 'Validate the attributes if has read only', 4);
insert into rules values (5, 'read_only_attributes', 'Permit', 'Validate the attributes if has read only', 5);
insert into rules values (6, 'IB-Customer-Rules', 'Permit', 'Validate rules for IB Customers', 6);
insert into rules values (7, 'IVR-Customer-Rules', 'Permit', 'Validate rules for IVR Customers', 7);
insert into rules values (8, 'CEMS-Customer-Rules', 'Permit', 'Validate rules for CEMS Back Office', 8);


insert into rules_predicate values (1, 1, 1, 'GET', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (2, 1, 3, 'IBR', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (3, 2, 1, 'GET', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (4, 2, 6, 'ADMIN', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (5, 3, 1, 'GET', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (6, 3, 6, 'MAKER', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (7, 4, 1, 'PATCH', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (8, 4, 6, 'ADMIN', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (9, 5, 1, 'PATCH', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (10, 5, 6, 'MAKER', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (11, 6, 1, 'GET', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (12, 6, 6, 'Customer', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (13, 6, 7, 'IBanking', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (14, 7, 1, 'GET', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (15, 7, 6, 'Customer', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (16, 7, 7, 'IVR', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (17, 8, 1, 'GET', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (18, 8, 6, 'BackOffice', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');
insert into rules_predicate values (19, 8, 7, 'CEMS', 'urn:oasis:names:tc:xacml:1.0:function:string-equal');


insert into rules_condition values (1, 1, 'urn:oasis:names:tc:xacml:1.0:function:or' ,'urn:oasis:names:tc:xacml:1.0:function:all-of-any', 'urn:oasis:names:tc:xacml:1.0:function:string-equal', 4);
insert into rules_condition values (2, 2, 'urn:oasis:names:tc:xacml:1.0:function:or' ,'urn:oasis:names:tc:xacml:1.0:function:all-of-any', 'urn:oasis:names:tc:xacml:1.0:function:string-equal', 4);
insert into rules_condition values (3, 3, 'urn:oasis:names:tc:xacml:1.0:function:or' ,'urn:oasis:names:tc:xacml:1.0:function:all-of-any', 'urn:oasis:names:tc:xacml:1.0:function:string-equal', 4);
insert into rules_condition values (4, 4, 'urn:oasis:names:tc:xacml:1.0:function:or' ,'urn:oasis:names:tc:xacml:1.0:function:all-of-any', 'urn:oasis:names:tc:xacml:1.0:function:string-equal', 4);
insert into rules_condition values (5, 5, 'urn:oasis:names:tc:xacml:1.0:function:or' ,'urn:oasis:names:tc:xacml:1.0:function:all-of-any', 'urn:oasis:names:tc:xacml:1.0:function:string-equal', 4);
insert into rules_condition values (6, 7, 'urn:oasis:names:tc:xacml:1.0:function:or' ,'urn:oasis:names:tc:xacml:1.0:function:all-of-any', 'urn:oasis:names:tc:xacml:1.0:function:string-equal', 4);
insert into rules_condition values (7, 8, 'urn:oasis:names:tc:xacml:1.0:function:or' ,'urn:oasis:names:tc:xacml:1.0:function:all-of-any', 'urn:oasis:names:tc:xacml:1.0:function:string-equal', 4);


insert into predicate_value_condition values (1, 1, 'http://www.w3.org/2001/XMLSchema#string', 'orderccy');
insert into predicate_value_condition values (2, 1, 'http://www.w3.org/2001/XMLSchema#string', 'orderstatus');
insert into predicate_value_condition values (3, 2, 'http://www.w3.org/2001/XMLSchema#string', 'id');
insert into predicate_value_condition values (4, 2, 'http://www.w3.org/2001/XMLSchema#string', 'name');
insert into predicate_value_condition values (5, 2, 'http://www.w3.org/2001/XMLSchema#string', 'gender');
insert into predicate_value_condition values (6, 3, 'http://www.w3.org/2001/XMLSchema#string', 'name');
insert into predicate_value_condition values (7, 4, 'http://www.w3.org/2001/XMLSchema#string', 'name');
insert into predicate_value_condition values (8, 4, 'http://www.w3.org/2001/XMLSchema#string', 'gender');
insert into predicate_value_condition values (9, 5, 'http://www.w3.org/2001/XMLSchema#string', 'gender');
insert into predicate_value_condition values (10, 6, 'http://www.w3.org/2001/XMLSchema#string', 'id');
insert into predicate_value_condition values (11, 6, 'http://www.w3.org/2001/XMLSchema#string', 'effDate');
insert into predicate_value_condition values (12, 6, 'http://www.w3.org/2001/XMLSchema#string', 'tranDate');
insert into predicate_value_condition values (13, 6, 'http://www.w3.org/2001/XMLSchema#string', 'tranType');
insert into predicate_value_condition values (14, 6, 'http://www.w3.org/2001/XMLSchema#string', 'branchCode');
insert into predicate_value_condition values (15, 6, 'http://www.w3.org/2001/XMLSchema#string', 'tranNumber');
insert into predicate_value_condition values (16, 6, 'http://www.w3.org/2001/XMLSchema#string', 'revSeq');
insert into predicate_value_condition values (17, 6, 'http://www.w3.org/2001/XMLSchema#string', 'rev');
insert into predicate_value_condition values (18, 6, 'http://www.w3.org/2001/XMLSchema#string', 'dbCrInd');
insert into predicate_value_condition values (19, 6, 'http://www.w3.org/2001/XMLSchema#string', 'tranAmt');
insert into predicate_value_condition values (20, 7, 'http://www.w3.org/2001/XMLSchema#string', 'runningBal');
insert into predicate_value_condition values (21, 7, 'http://www.w3.org/2001/XMLSchema#string', 'id');
insert into predicate_value_condition values (22, 7, 'http://www.w3.org/2001/XMLSchema#string', 'effDate');
insert into predicate_value_condition values (23, 7, 'http://www.w3.org/2001/XMLSchema#string', 'tranDate');
insert into predicate_value_condition values (24, 7, 'http://www.w3.org/2001/XMLSchema#string', 'tranType');
insert into predicate_value_condition values (25, 7, 'http://www.w3.org/2001/XMLSchema#string', 'branchCode');


insert into predicate_constant values(1, 'urn:oasis:names:tc:xacml:3.0:attribute-category:action', 'http://www.w3.org/2001/XMLSchema#string', 'true', 'urn:oasis:names:tc:xacml:1.0:action:action-id');
insert into predicate_constant values(2, 'urn:oasis:names:tc:xacml:3.0:attribute-category:resource', 'http://www.w3.org/2001/XMLSchema#string', 'true', 'urn:oasis:names:tc:xacml:2.0:resource:scope');
insert into predicate_constant values(3, 'urn:oasis:names:tc:xacml:1.0:subject-category:access-subject', 'http://www.w3.org/2001/XMLSchema#string', 'true', 'urn:oasis:names:tc:xacml:1.0:subject:subject-id');
insert into predicate_constant values(4, 'urn:oasis:names:tc:xacml:3.0:attribute-category:resource', 'http://www.w3.org/2001/XMLSchema#string', 'false', 'urn:oasis:names:tc:xacml:1.0:resource:field-id');
insert into predicate_constant values(5, 'urn:oasis:names:tc:xacml:3.0:subject-category:access-subject', 'http://www.w3.org/2001/XMLSchema#string', 'true', 'urn:oasis:names:tc:xacml:2.0:subject:role');
insert into predicate_constant values(6, 'urn:oasis:names:tc:xacml:1.0:subject-category:access-subject', 'http://www.w3.org/2001/XMLSchema#string', 'true', 'urn:oasis:names:tc:xacml:2.0:subject:role');
insert into predicate_constant values(7, 'urn:oasis:names:tc:xacml:1.0:subject-category:recipient-subject', 'http://www.w3.org/2001/XMLSchema#string', 'true', 'urn:oasis:names:tc:xacml:1.0:subject:subject-id');
