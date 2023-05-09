# Typescript-Node-MySQL-Backend
Backend where you can get idea about how to use Typescript with node, express.js and mysql

<h2>Instructions to Run the App</h2>

<ol>
  <li>Clone the Repository</li>
  <li>
  Make sure you have MySQL and MySQL Workbench installed, copy the code snippet, paste it in workbench and run the code in workbench this will create the tables
  </li>
 </ol>
 
 ```
create Database databasename;
use databasename;
CREATE TABLE items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    price DECIMAL(10, 2),
    description TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO items (`item_name`, `category`, `price` , `description`) values ('Box', 'df', '10', 'sdsd');

select * from items;

delete from items where item_id = 1;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

select * from users;
```
<ol start = "3">
  <li>Open the cloned repository in terminal and change directory to api {cd api}</li>
  <li>open the api folder in vs code as well {code .} </li>
  <li>In Vs code open terminal and write npm install, and press Enter </li>
  <li>write npm run dev in Vs Code terminal and press Enter, your project will start </li>
</ol>




