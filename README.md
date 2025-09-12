# For mail and Database:
Use gmail app passwords (can be set in account security) and make a new file application-local.properties in resources folder and set the following properties 

spring.datasource.username=DB_USERNAME
spring.datasource.password=DB_PASSWORD
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username= your_gmail@gmail.com
spring.mail.password=YOUR_APP_PASSWORD
spring.mail.protocol=smtp
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
jwt.secret=YOUR_JWT_SECRET