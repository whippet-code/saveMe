# SaveMe App

## Description

This is a simple app that allows you to save recommendations for initially books I wanted to read. Includes a search function to find book details via an api and option to save them to your list.

Future dev to include other media plus links to websites and simple text notes.

## API used

[Google Books API](https://developers.google.com/books/docs/v1/using)
This may require OAuth 2.0 set up to use? Will be fun adding google login to this app.
API / OAuth not required for search function.

### Current todo state

- remove functions into helper file via JS modules.
- import functions into index.js

Final step link to firebase DB to save the list. (live updates)

- create firebase DB
- link in app
- edit functions to utilise DB
  - currently only adding / removing from DOM (no other storage used)
- edit render function to be called via FB changes

#### Lessons learnt

Adding event listeners to dynamically created content requires an amount of planning. The element must be in the DOM before you can add a listener. USe event bubbling, or check out using different handler functions.
