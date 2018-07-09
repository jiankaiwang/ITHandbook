# IT Handbook



隨著科技生態圈的整併與建立，IT, CT 與 IoT 已變得密不可分，整合式解決方案儼然成為主流，大至 AI 決策系統 \(如交通流量、無人機\)，小如智慧環境 \(如智慧家庭\) 等都是其中範疇，在此 handbook 中，嘗試模擬不同的情境，實作出整合式解決方案中必須克服的許多問題與技術。



Since 2005, the integration of information technology, communication technology, and internet of things becomes more popular. Leading companies are building their own top-to-down, upstream-to-downstream ecosystems. The integrated solutions are adopted and deployed more and more, from smart home to smart city (AI, drone, traffic system, etc.) . In the handbook, we try to implement several integrated ecosystems to address different issues and record the process or know-how. Please enjoy it.



* Handbook Link
  * Github (main): https://github.com/jiankaiwang/ITHandbook.git
  * Gitbook (update no more): https://jiankaiwang.gitbooks.io/itsys/content/



## Content



The following are topics in the handbook, from backend to frontend, from center to distributed architecture, from sql to non-sql database, from full-virtualization to container, from server to mobile, and ones like network, linux system, etc. We try to record any aspects of issues, problems, and so on, while deploying or developing IT/IoT/CT systems.



* Version Control / Continous Integration
    * [Git](git/README.md) : the distributed version control tool
    * [Jenkins](jenkins/README.md) : the continuous integration or further continuous deployment tool
    * [Travis-CI](travis-ci/README.md) : one of the best CI tools, which is integrated with Github
* Web / Data Server Template
    * [CKAN](ckan/README.md) : python-based open data template, including both UI-sided and Server-sided
    * [Drupal](drupal/README.md) : PHP-based web server, mainly used in web page development
* Data Science
    * [R Architecture](r_architecture/README.md) : R script is mainly used in statistics and machine learning fields and here we build a data science analyzing platform for the multiple users
    * [Python Architecture](python_architecture/README.md) : Python is a general purpose programming language. In data science, it is mainly used in mathematics, machine learning, and artificial intelligence fields and here we build a data science analyzing platform for the multiple users
* Big Data
    * [Hadoop Architecture](hadoop/README.md) : hadoop is an famous heterogeneous big data platform, here we introduce its components, e.g. HDFS and MapReduce, etc.
    * SDACK:  SDACK is the latest big data integration solution, use [Cassandra](cassandra/README.md) to construct distributed databases, use [Kafka](kafka/README.md) to handle real-time data streaming, use Akka to construct distributed applications, use [Spark](spark/README.md) as the entry to analyze the above, and use [Docker](docker/README.md) to quickly deploy services.
* Public Cloud Computing 
    * [Azure](azure/README.md) : its graphic operating interface provides user quickly and simply deploy services on the cloud
    * GCP : its user customized operating provide with more flexible settings and can meet user's any requirement
    * ~~[OpenShift](openshift/README.md)~~ : it is completely designed for the developers but it lacks the integration among revisions so that the chapter updates no more
* Cloud Computing Architecture
    * [OpenStack](openstack/README.md) : it provides with a good solution to build a cloud computing platform
* Information Security
    * [Let's Encrypt](letsencrypt/README.md) : It is a free, automated, and open Certificate Authority. It provides users with quickly and simple operations to secure the webpage connection.
    * [OpenSSL](openssl/README.md) : it provides developers with multiple libraries to secure the connections among each others in the application
    * [Webgoat](webgoat/README.md) : the famous OWASP project, it also provides developers with lessons to learn information security issues
* Network
    * [DHCP](dhcp/README.md) : configurate the DHCP network
    * [FTP](ftp/README.md) : configurate the FTP communication
    * [Nginx](nginx/README.md) (Engine X) : the lightweight, high performance load balancer, and reverse proxy web server
    * [Socat](socat/README.md) : an advanced and multiple purpose networking tool, e.g. TCP port forward, external socksify, security testing, etc.
    * [Squid](squid/README.md) : a networking tool used in firewall, web proxy, speeding internet access, or VPN, etc.
* Database
    * [TSQL](tsql/README.md) (SQL Server) : a database server highly supported in Microsoft environment, e.g. Windows, C#, Azure, etc.
    * [MySQL](mysql/README.md) : the famous cross platform database server highly used in Liunx (LAMP)
    * [PostgreSQL](postgresql/README.md) : the object-RDBMS database server supporting function, indexing, trigger, MVCC, and multiple datatypes, etc.
    * [MongoDB](mongodb/README.md) : the document-based NoSQL database server
    * [Cassandra](cassandra/README.md) : the distributed database server which supports like-SQL commands
    * [Redis](redis/README.md) : the in-memory database server mainly used in web session, media storage, etc.
    * [Firebase](firebase/README.md) : the famous just-in-time database server supporting developers to quickly deploy their services on the cloud DB
* Search Engine
    * [Solr](solr/README.md) : the famous centralized search engine
* Virtualization
    * [VirtualBox](virtualbox/README.md) : the famous full-virtualization tool
* Container / Management
    * [Docker](docker/README.md) : the famous container platform
    * [Kubernetes](kubernetes/readme.md) : one of the best container managment tool
* Data Sync 
    * [Owncloud](owncloud/readme.md) : the famous cloud collaboration platform, like dropbox, etc.
* Operation System Management and Configuration
    * [Windows](windows/README.md) : setting services or troubleshooting
    * [Linux](linux/README.md) : setting services or troubleshooting
* GIS / GPS
    * [Open Source Routing Machine, OSRM](gis_gps/osrm-backend.md) : the routing machine on openstreetmap
* Mobile
    * Android Studio : android IDE
    * React Native : the framework for both android or iOS
* Data Streaming
    *  [Kafka](kafka/README.md) : it handles real-time data streaming
* Remote Procedure Call

    * [Google RPC](grpc/README.md) : a powerful tool to create a server with Protobuf files



