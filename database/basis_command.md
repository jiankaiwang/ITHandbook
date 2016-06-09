# Basis Command

<script type="text/javascript" src="../js/general.js"></script>

###Download, install, activate and set MySQL service activated after boot
---

| Linux(CentOS 6 x86_64) | Windows 7 |
| -- | -- |
| # yum install mysql<br># /etc/init.d/mysqld restart<br># chkconfig --level 15 mysqld on | Installer from MySQL official website.<br> Click the installer to install MySQL server. |

###Show the users, Create user accessing MySQL server and delete user from it
---

If the following message showed after using root as a database user for a service or application, for example, joomla web-service. 

```Bash
ERROR 1045(28000) : Access denied for user 'root@localhost' (using password: NO) 
```

You could simply use the following command to access the MySQL service:

```Bash
# mysql -u root -p
```

Show all users accessing MySQL servers:

```Sql
# method.1
mysql > desc mysql.user;

# method.2
mysql > select Host, User from mysql.user;
```
* The command, desc, was used to show columns(properties of each entry) of the table.
* The table, mysql.user, maintains all users which can access the MySQL server.
* The basic command of MySQL is "select (columns) from (tables) where (property_1) and (property_2) ;".

Create a user which can access MySQL server:

```Sql
mysql > create user 'test01'@'localhost' identified by 'test01';
mysql > grant select,insert,update on test.* to 'test01'@'localhost';
```

The basic format of create user of MySQL is

```Sql
mysql > create user '<username>'@'<Host>' identified by '<Password>';
```
* The pair, '(content)', is used for surrounding the content.
* Host could be localhost or other location special for one user.

The basic format of setting the privilege of user within MySQL is

```Sql
mysql > grant OPTIONS on TARGETS to USERS;
```

The command to set the user who has highest privilege to all tables of all databases is:

```Sql
mysql > grant all on *.* to 'test01'@'localhost';
```

The OPTIONS means the action which be token as the following:

```Sql
SELECT, INSERT, UPDATE, DELETE, CREATE, DROP
```

Delete the user which can access MySQL server:

```Sql
mysql > drop user 'test01'@'localhost';
```

The basic format of deleting the user which can access MySQL server is:

```Sql
mysql > drop user '<username>'@'Host';
```

###Show databases of MySQL server, Create and Delete a database in MySQL server
---

The command to show the total databases within the MySQL Server:

```Sql
mysql > show databases;
```

Create a database, named temp, within the MySQL server:

```Sql
mysql > create database temp;
```

Delete a database, named temp, from the MySQL server:

```Sql
mysql > drop database temp;
```

Use a database, named temp, for further accessing data, operating data within it:

```Sql
mysql > use temp;
```

Show the tables from the database named temp:

```Sql
mysql > show tables from temp;
```

###Show tables from database, Create and delete a table from a database
---

Show the tables from a database:

```Sql
mysql > show tables from temp;
```

The basic format showing the tables from the database is: ** show tables from 'database name'; **.

Create a table within the database named temp:

```Sql
mysql > use temp;
mysql > create table t1 (
        -> id INT NOT NULL AUTO_INCREMENT,
        -> name VARCHAR(75),
        -> breed VARCHAR(75),
        -> description TEXT,
        -> PRIMARY KEY(id)
        -> );
```

The basic format to create a table within the database is:
* mysql > create table 'table name' (definition);
* The definitions are consist of several pairs containing column name and its data type(size), e.g. id INT.
* The primary key is the smallest subset to represent each entry different in the table. It is unique from entries.

Show the index information of the table:

```Sql
mysql > show index from t1;
```

Show the columns (properties) of the tables; (there are several commands showing the similar result)

```Sql
mysql > desc t1;
mysql > show columns from t1;
mysql > describe t1;
```
* Basic format to show the columns of the table is: ** desc 'tablename' **;

Delete the table from the database;

```Sql
mysql > drop table t1;
```

Alter the setting of the table defined before:

```Sql
#Rename the table:
mysql > alter table t1 rename t2;

#Re-define the data type of the column:
mysql > alter table t2 name TEXT;

#Change the column with its data type:
mysql > alter table t2 change name sign VARCHAR(75);

#Add a new column named 'place' into the table:
mysql > alter table t2 add place VARCHAR(100);

#Remove a column named 'place' from the table:
mysql > alter table t2 drop column place;

#Add a column as a index:
mysql > alter table t2 add index(place);
```

Optimize the table into the best status:

```Sql
mysql > optimize table t2;
```

###Insert, delete, update entries into the database
---

Insert a entry into the table:

```Sql
mysql > insert into t1(sign,breed) values("dog","dog");
```

Show entries within the table:

```Sql
mysql > select id,breed from t1 where sign="dog";
```

The basic format of searching the data is: 

```Sql
select (columns or * for all) from (table) where (conditions);
```

Update a entry within the table:

```Sql
mysql > update t1 set breed="newDog" where id=1 and sign="dog";
```

The basic format of updating the data is:

```Sql
update (table) set column=(new value) where (conditions);
```

Replace a entry from the table:

```Sql
mysql > replace into t1(id,sign,breed) values("1","aDog","aDog");
```

* If there is the same primary key matching, this new setting would be replaced with the entry within the table.

* If there is no matching, this new setting would be added into the table as the same action with insert command.

Delete a entry from the table:

```Sql
mysql > delete from t1 where id="3" and sign="abc";
```

The basic format of updating the data is: 

```Sql
delete from (table) where (conditions);
```

###Other commands
---

The executing environment:

```Sql
mysql > show status;
```

The MySQL environment and setting:

```Sql
mysql > show variables;
```

The status of user accessing MySQL server:

```Sql
mysql > show processlist;
```

To change the root password of mysql(or mariadb): ( -p'xxx' is connecting )

```Bash
$ mysqladmin -u root -p'oldpassword' password 'newpass'
```











