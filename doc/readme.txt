-------------------------------------------------
This file is created by Hu Rixin, 2014-07-29
-------------------------------------------------
Introduction:
This project aims to provide a GTFS editing platform for public transit agencies or developers.
It has been available online: http://gtfseditor-irmagtfs.rhcloud.com/login.jsp 

OpenShift Deploy:
https://openshift.redhat.com
username: irmarealtime@gmail.com
password: irmapavia
remote PostgreSQL:
   Root User: adminerpuzkh
   Root Password: CUGEF3QwSqEI
   Database Name: gtfseditor
   Connection URL: postgresql://$OPENSHIFT_POSTGRESQL_DB_HOST:$OPENSHIFT_POSTGRESQL_DB_PORT

To connect to a service running on OpenShift, use the local address

Service    Local               OpenShift
---------- -------------- ---- ------------------
java       127.0.0.1:8080  =>  127.13.54.129:8080
postgresql 127.0.0.1:5433  =>  127.13.54.130:5432

ssh 53c7e172500446a3510002b8@gtfseditor-irmagtfs.rhcloud.com

Configuration:
0. restore the DB backup file (IRMA_RT_EDIT.backup) to PostgreSQL 9.3 with pgAdmin
1. configure the JPA configuration file under META-INF: persistence.xml
2. import the project into eclipse for JavaEE developers