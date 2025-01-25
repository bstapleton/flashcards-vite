# Flashcard front-end built in React using Vite

Usual build and run stuff applies here: `npm install` to get the dependencies.

For now, you'll need to create a `.env.local` file with an entry for both `VITE_API_URL` and `VITE_API_BEARER` until I get the auth stuff working.

You'll also need to add an entry for `VITE_API_KEY` which is the API key you have configured from setting up your local API

The API URL in this instance is however you have your flashcards API configured, f.ex http://localhost

The bearer is whatever bearer token the API gives you when you successfully authenticate

## TODO
- Actual auth
  - Login
  - Log out
- Finish scorecard UI
- Error handling
- Tests