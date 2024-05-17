# Quote Generator API Documentation
The Quote Generator API provides endpoints for retrieving random quotes, adding new quotes, and listing all available quotes. It is designed to be simple and easy to use for developers integrating inspirational quotes into their applications.

## Get Random Quote
**Request Format:** `/random-quote`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a random quote from the available collection.

**Example Request:** GET `/random-quote`

**Example Response:**

```json
{
  "text": "You must be the change you wish to see in the world.",
  "author": "Mahatma Gandhi"
}
```

**Error Handling:**
If there is an internal server error, the API will return a 500 status code with an error message.


## Add New Quote
**Request Format:** `/add-quote`

**Request Type:** POST

**Returned Data Format**: Plain Text

**Description:** Adds a new quote to the database. Requires quote text and author name.

**Example Request:** 
```json
{
  "text": "Finally",
  "author": "Nur"
}
```

**Example Response:**
Quote added: "Finally" by Nur

**Error Handling:**
If there is an internal server error, the API will return a 500 status code with an error message.


## List All Quotes
**Request Format:** `/all-quotes`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Retrieves all quotes stored in the system.

**Example Request:** GET /all-quotes

**Example Response:**

```json
{
  {
    "text": "You must be the change you wish to see in the world.",
    "author": "Mahatma Gandhi"
  },
  {
    "text": "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    "author": "Mother Teresa"
  },
  {
    "text": "The only thing we have to fear is fear itself.",
    "author": "Franklin D. Roosevelt"
  },
  {
    "text": "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
    "author": "Martin Luther King Jr."
  },
  {
    "text": "Do one thing every day that scares you.",
    "author": "Eleanor Roosevelt"
  },
  {
    "text": "Well done is better than well said.",
    "author": "Benjamin Franklin"
  },
  {
    "text": "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
    "author": "Helen Keller"
  },
  {
    "text": "It is during our darkest moments that we must focus to see the light.",
    "author": "Aristotle"
  },
  {
    "text": "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "author": "Ralph Waldo Emerson"
  },
  {
    "text": "Be yourself; everyone else is already taken.",
    "author": "Oscar Wilde"
  }
}
```

**Error Handling:**
If there is an internal server error, the API will return a 500 status code with an error message.