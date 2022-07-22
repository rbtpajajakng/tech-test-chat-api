## How to run
1. Clone this repo
2. Run npm install
3. Run sql/bootstrap.sql to create the nessecary table
4. Rename .env-example to .env and change the database configuration there
5. Run npx prisma generate
6. Run npm start to start the code in port 3103

## Api Lists
### Send message to another user
Endpoint: `POST api/message/send`  
Body:
```
{
  "senderId": number,
  "receiverId": number,
  "content": string
}
```
### List all conversations user have
Endpoint `GET api/conversation/list`  
Query `userId=number`