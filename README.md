# Clinic
This is small project for user registration and login with joi and jwt.

### .ENV file 
node_developemt=development

user=root

database=clinic

password=''

seckret_key='ankulwebdeveloper

### Database information for localhost

### Database name: clinic

CREATE TABLE `users` (
  `id` int(90) NOT NULL,
  `email` varchar(200) NOT NULL,
  `fullname` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` enum('1','2','3') NOT NULL DEFAULT '1',
  `profile_img` varchar(200) DEFAULT NULL,
  `login_time` varchar(200) DEFAULT NULL,
  `register_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



### Developer
### Ankul Panwar (webdevloper)
