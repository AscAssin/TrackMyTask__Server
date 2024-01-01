# TrackMyTask__Sever
# Routes
Authentication:
- Login: /auth/login
- Register: /auth/register

Task:
- Create: /task/add
- Select all: /task/dashboard
- Select one: /task/dashboard/:id
- Delete: /task/delete/:id
- Update: /task/update/:id

User:
- Get all: /api/user/
- Get one: /api/user/:id
- Delete: /api/user/:id