-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."users" add column "full_name" text
--  null;
alter table "core"."users" drop column "full_name";