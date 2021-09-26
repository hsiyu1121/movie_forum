### 1. 建立Movie資料表
``
$ npx sequelize model:generate --name Movie --attributes title:string,description:text,release_date:date,image:string,CategoryId:integer
``
### 2. 建立User資料表
``
$ npx sequelize model:generate --name User --attributes name:string,email:string,password:string,role:boolean
``
### 3. 建立Category資料表
``
$ npx sequelize model:generate --name Category --attributes name:string
``