create table IF NOT EXISTS policyset
(
  id integer not null,
  xmlns varchar(255) default 'urn:oasis:names:tc:xacml:3.0:core:schema:wd-17',
  policyset_id varchar(255) default 'CCMS-SamplePolicy',
  version varchar(20) default '1.0',
  policycombiningalgid varchar(255) default 'urn:oasis:names:tc:xacml:3.0:policy-combining-algorithm:deny-unless-permit',
  description varchar(255) default 'CCMS-PolicySet',
  primary key(id)
);

create table IF NOT EXISTS policy
(
  id integer not null,
  policy_id varchar(255),
  version varchar(20),
  rulecombiningalgid varchar(255),
  description varchar(255),
  ps_id integer,
  primary key(id)
);

create table IF NOT EXISTS policy_predicate
(
  id integer not null,
  policy_id integer,
  predicate_id integer,
  predicate_value varchar(255),
  match_id varchar(255),
  primary key(id)
);

create table IF NOT EXISTS rules
(
   id integer not null,
   rule_id varchar(255),
   effect varchar(255),
   description varchar(255),
   policy_id integer,
   primary key(id)
);

create table IF NOT EXISTS rules_predicate
(
  id integer not null,
  rule_id integer,
  predicate_id integer,
  predicate_value varchar(255),
  match_id varchar(255),
  primary key(id)
);

create table IF NOT EXISTS rules_condition
(
  id integer not null,
  rule_id integer,
  function_apply_wrap_id varchar(255),
  function_apply_id varchar(255),
  function_id varchar(255),
  predicate_id integer,
  primary key(id)
);

create table IF NOT EXISTS predicate_value_condition
(
  id integer not null,
  rules_condition_id integer,
  datatype varchar(255),
  value varchar(255),
  primary key(id)
);

create table IF NOT EXISTS predicate_constant
(
  id integer not null,
  category varchar(255),
  datatype varchar(255),
  mustbepresent varchar(5),
  attribute_id varchar(255),
  primary key(id)
);