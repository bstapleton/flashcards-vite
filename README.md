# Flashcard front-end built in React using Vite

Usual build and run stuff applies here: `npm install` to get the dependencies.

For now, you'll need to create a `.env.local` file with an entry for `VITE_API_URL`. The API URL in this instance is however you have your flashcards API configured, f.ex http://localhost

You'll also need to add an entry for `VITE_API_KEY` which is the API key you have configured from setting up your local API.

## TODO
- Actual auth
  - Login - works but it's not pretty
  - Log out
- Finish scorecard UI
- Error handling
- Tests