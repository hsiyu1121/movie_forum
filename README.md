# 電影評論網
### 使用 Node.js, Express, MySQL 製作而成
## [網站連結](https://agile-oasis-48648.herokuapp.com/movies) 
![畫面呈現](/movie_forum.png)

   ### 如何使用 
  * 1. 下載  `` git clone https://github.com/hsiyu1121/movie_forum.git ``
  * 2. 安裝相關的套件 
  ``  npm install ``
  * 3. 在 /config/config.json 設定好相對應的資料庫名稱
  * 4. 執行  ``
  npx sequelize db:migrate `` 建立相關的資料表
  * 5. 執行  ``
  npx sequelize db:seed
  `` 
  建立相關的種子資料
 
  > ### 範例帳戶
  > 
  |    帳號            |      密碼     |
  | :---------------: |   :---------: |
  | root@example.com  |   12345678    |
  | user1@example.com |   12345678    |
  | user2@example.com |   12345678    |
  | user3@example.com |   12345678    |
  | user4@example.com |   12345678    |
  | user5@example.com |   12345678    |


> ### 使用者故事  
#### 前台 
 
* 使用者可以註冊/登入/登出網站
* 使用者可以在瀏覽所有電影與個別電影詳細資料
* 使用者可以對電影留下評論
* 使用者可以收藏電影
* 使用者可以對喜歡的電影按讚
* 使用者可以查看最新上架的 10 筆電影
* 使用者可以查看最新的 10 筆評論
* 使用者可以使用關鍵字來搜尋電影
* 使用者可以使用排序來查找電影
* 使用者可以編輯自己的個人資料
* 使用者可以查看自己評論過、收藏過的電影
* 使用者可以追蹤其他的使用者
* 使用者可以查看自己追蹤中的使用者與正在追蹤自己的使用者

 #### 後台 

* 只有網站管理者可以登入網站後台
* 網站管理者可以在後台管理電影的基本資料
* 網站管理者可以在後台管理電影分類

#### 製作 
email: bluefish1121@yahoo.com.tw
 