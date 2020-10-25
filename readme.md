# Url = http://localhost:8081/

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

### Generate Crude Components
* Before running the main class, configure CrudeGen_objects.json.
* Main class is com.angularreact.appgen.util.gen.CrudeGenerator. It will read json files CrudeGen_objects.json;
* For angular, after running the main class, you need to add the new component in 'appgen-angularreact-crud-nosql/ui/angular/src/app/app.module.ts' and 'appgen-angularreact-crud-nosql/ui/angular/src/app/app-routing.module.ts'

### Sample json Object
```
	/appgen-angularreact-crud-nosql/tmpl/CrudeGen_objects.json
	
	"OBJECTS": [{
		"NAME": "MyCases",
		"FIELDS": [
			{
				"LABEL": "Title",
				"NAME": "Title",
				"TYPE": "String",
				"MAPPING": "",
				"REQUIRED": "Y"
			},
			{
				"LABEL": "Status",
				"NAME": "Status",
				"TYPE": "CodeGroups",
				"MAPPING": "@ManyToOne",
				"CODE_GROUP": "STATUS",
				"LIST_TYPE": "STATUS",
				"REQUIRED": "Y"
			},
			{
				"LABEL": "Case Type 1",
				"NAME": "CaseType1",
				"TYPE": "CodeGroups",
				"MAPPING": "@ManyToOne",
				"CODE_GROUP": "CASE_TYPE_1",
				"LIST_TYPE": "CASE_TYPE_1",
				"REQUIRED": "Y"
			},
			{
				"LABEL": "Case Type 2",
				"NAME": "CaseType2",
				"TYPE": "CodeGroups",
				"MAPPING": "@ManyToOne",
				"CODE_GROUP": "CASE_TYPE_2",
				"LIST_TYPE": "CASE_TYPE_2",
				"REQUIRED": "Y"
			},
			{
				"LABEL": "Case Type 3",
				"NAME": "CaseType3",
				"TYPE": "CodeGroups",
				"MAPPING": "@ManyToOne",
				"CODE_GROUP": "CASE_TYPE_3",
				"LIST_TYPE": "CASE_TYPE_3",
				"REQUIRED": "Y"
			},
			{
				"LABEL": "Status Code",
				"NAME": "StatusCode",
				"TYPE": "CodeGroups",
				"MAPPING": "@ManyToOne",
				"CODE_GROUP": "STATUS_CODE",
				"LIST_TYPE": "STATUS_CODE"
			},
			{
				"LABEL": "Comments",
				"NAME": "Comments",
				"TYPE": "String",
				"MAPPING": ""
			}
		]
	}
```

### Manual fix
- Add new components in 'appgen-angularreact-crud-nosql/ui/angular/client/src/app/app.module.ts' and 'appgen-angularreact-crud-nosql/ui/angular/src/app/app-routing.module.ts'
- Fix the generated detail component. Fix null error after clicking new button from the list. This error may be the cause if you have Code Groups or List of Values

```
  details: any = {
    status: { id: '' },
    caseType1: { id: '' },
    caseType2: { id: '' },
    caseType3: { id: '' },
    statusCode: { id: '' },
  }
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
