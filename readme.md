# Url = http://localhost:5000/

* Springboot 2.3.3.RELEASE
* Angular
* React
* Mongodb
* JWT
* Cors mapping to http://localhost:3000 or

### NOTE
- This code is not complete. There are error that you need to manually fix after running CrudeGenerator.

### Initialize MongoDB
[Go To MongoDB ReadMe](sara-data/readme.md)

### Initialize React
* For testing in local machine URL_BASE should be localhost:5000. This is when using nodejs server.
* For deployment in remote server heroku URL_BASE should be blank.

```
/sara/react/src/api/Utils.js

	export const URL_BASE = 'http://localhost:5000';
```

### React Installation

```
cd /sara/react/
npm install
```


### Maven Commands
```sh
cls && mvn clean install -P build-react -DskipTests
cls && mvn spring-boot:run -P build-react -DskipTests


maven profiles
	build-react
	build-angular
```

### Start Client Server
```
ng serve -o
```

### GIT
```
…or create a new repository on the command line
echo "# appgen-angularreact-crud-nosql" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin https://github.com/s2iwi2s/appgen-angularreact-crud-nosql.git
git push -u origin master
                
…or push an existing repository from the command line
git remote add origin https://github.com/s2iwi2s/appgen-angularreact-crud-nosql.git
git branch -M master
git push -u origin master
```
