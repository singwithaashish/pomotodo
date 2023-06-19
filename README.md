**PomoTodo** is a simple todo list app that uses the Pomodoro Technique to help you focus on your tasks.

## Todo
- [x] Task Management with CRUD and sorting
- [x] Pomodoro Timer with 25 minutes work and 5 minutes break (15 minutes break every 4 pomodoros)
- [x] User Authentication with Auth0
- [x] UI/UX similar to the shared dribbble design but unique in its own way
- [x] Analytics Dashboard with charts and graphs
- [ ] Custom Task Categories (working on it)
- [x] PWAs
- [x] Notifications
- [ ] Hire a pigeon to send the flash drive with the source code to lief HQ


## Screenshots
![Screenshot 2023-06-19 at 00-39-21 Create Next App](https://github.com/singwithaashish/pomotodo/assets/52033403/cb04c63b-50b0-4878-9ffe-de8de822a7f6)
![Screenshot 2023-06-19 at 00-38-49 Create Next App](https://github.com/singwithaashish/pomotodo/assets/52033403/14ad7de4-9473-4ebc-88c7-aa6ab455ee87)
![Screenshot 2023-06-19 at 00-38-37 Create Next App](https://github.com/singwithaashish/pomotodo/assets/52033403/3911f35d-174c-403b-949b-a5212438d1b4)
![Screenshot 2023-06-19 at 00-37-26 Screenshot](https://github.com/singwithaashish/pomotodo/assets/52033403/9513c5b4-f39c-434a-889a-2418523f8e22)
![Screenshot 2023-06-19 at 00-36-53 Create Next App](https://github.com/singwithaashish/pomotodo/assets/52033403/e616cacf-e7f7-4207-a135-9156c72a98cc)
![Screenshot 2023-06-19 at 00-36-37 Create Next App](https://github.com/singwithaashish/pomotodo/assets/52033403/94f9a1a6-5ddd-4a70-bfab-d732b8102806)


## Tech Stack
- Next.js
- TypeScript
- GraphQL
- Grommet
- Auth0
- Apollo
- Prisma
- PostgreSQL


## Getting Started
1. Clone the repo
2. Add this to your `.env.local` file:
```
AUTH0_SECRET='<auth secret from Auth0>'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='<issuer base url from auth0 >'
AUTH0_CLIENT_ID='<Auth0 Client Id>'
AUTH0_CLIENT_SECRET='<Auth0 Client secret>'
```
3. Add this to your `.env` file:
```
DATABASE_URL="<postgres URL>"
NODE_ENV="development"
```
4. Install dependencies
```npm install```
5. Run the development server
```npm run dev```
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.







