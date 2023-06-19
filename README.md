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
![Screenshot from 2023-06-19 17-41-52](https://github.com/singwithaashish/pomotodo/assets/52033403/973f2a00-b4d4-45d5-a457-5024f0a2d31a)
![Screenshot from 2023-06-19 17-46-04](https://github.com/singwithaashish/pomotodo/assets/52033403/cb5c9333-3c5b-4f7b-ab15-78977784e0be)
![Screenshot from 2023-06-19 17-46-31](https://github.com/singwithaashish/pomotodo/assets/52033403/8dcd8a5c-e45c-463f-95c4-7d14307d04ee)
![Screenshot from 2023-06-19 17-47-37](https://github.com/singwithaashish/pomotodo/assets/52033403/14516378-6874-46d6-922a-2ce0a2dfb295)
![Screen Shot 2023-06-19 at 17 43 25](https://github.com/singwithaashish/pomotodo/assets/52033403/31382c55-e013-4219-b67c-c7d0d309ec0a)
![Screen Shot 2023-06-19 at 17 43 30](https://github.com/singwithaashish/pomotodo/assets/52033403/146a8dd5-3384-4311-9ef4-4c725c3c1a95)
![Screen Shot 2023-06-19 at 17 43 41](https://github.com/singwithaashish/pomotodo/assets/52033403/8f6dd101-aad0-417f-bed9-f344e4863f84)
![Screen Shot 2023-06-19 at 17 43 58](https://github.com/singwithaashish/pomotodo/assets/52033403/c6871f9f-496d-47cd-99d5-08922ca0dbe4)
![Screen Shot 2023-06-19 at 17 44 15](https://github.com/singwithaashish/pomotodo/assets/52033403/1b94426a-9717-4b36-bed6-fed100a2deaa)



## Tech Stack
- Next.js
- TypeScript
- GraphQL
- Grommet
- Auth0
- Apollo
- Prisma
- PostgreSQL
- Supabase


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







