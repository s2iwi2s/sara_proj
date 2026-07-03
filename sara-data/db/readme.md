### Load json files using MongoDB Compass
* 01_home.json
* 01_role.json
* 02_authorized_url.json
* 03_end_user.json
* 04_address.json
* 05_code_groups.json
* 06_my_case.json
* 07_part_item.json
* 08_serial_item.json

MongoDB Compass

```
mongodb+srv://learn:g389BDSRANliLC1f@cluster0.5qocd.mongodb.net/learn
```

Spring boot:

```
application.properties:
	spring.data.mongodb.uri=mongodb+srv://learn:g389BDSRANliLC1f@cluster0.5qocd.mongodb.net/learn?retryWrites=true&w=majority
	spring.data.mongodb.database=learn
```


MongoDB u/p

```
test/test
learn:g389BDSRANliLC1f
```

mongodump mongodb+srv://learn:s5icpWvaBLbptujR@awscluster0.fvz4qbq.mongodb.net/sis?appName=AWSCluster0
mongorestore mongodb+srv://learn:s5icpWvaBLbptujR@awscluster0.fvz4qbq.mongodb.net/sis?appName=AWSCluster0 --dir dump/sis