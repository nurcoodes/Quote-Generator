/**
 * Name: Nur Ahmed
 * Date: 5/16/2024
 * CSE 154 AD
 * TA: Allan Tran and Max Beard
 * This is the server-side application for the quote generator project.
 * The application supports the following operations:
 * - Retrieving a random quote
 * - Adding a new quote with both text and author
 * - Retrieving all quotes stored in the system
 * This server uses Express.js and handles JSON data stored in a file named 'quotes.json'
 * Quote source https://blog.hubspot.com/sales/famous-quotes
 */
"use strict";

const express = require('express');
const fs = require('fs').promises;
const app = express();
app.use(express.json());
const QUOTES_FILE = 'quotes.json';

app.get('/random-quote', async (req, res) => {
  try {
    let data = await fs.readFile(QUOTES_FILE, 'utf8');
    let quotes = JSON.parse(data).quotes;
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(randomQuote);
  } catch (error) {
    res.status(500).send('Error retrieving quotes');
  }
});

app.post('/add-quote', async (req, res) => {
  const newQuote = req.body;
  try {
    let data = await fs.readFile(QUOTES_FILE, 'utf8');
    let quotesObj = JSON.parse(data);
    quotesObj.quotes.push(newQuote);
    await fs.writeFile(QUOTES_FILE, JSON.stringify(quotesObj, null, 2));
    res.status(201).send('Quote added');
  } catch (error) {
    res.status(500).send('Error saving the quote');
  }
});

app.get('/all-quotes', async (req, res) => {
  try {
    let data = await fs.readFile(QUOTES_FILE, 'utf8');
    res.json(JSON.parse(data).quotes);
  } catch (error) {
    res.status(500).send('Error retrieving all quotes');
  }
});

app.use(express.static("public"));
const PORT = process.env.PORT || 3000;
app.listen(PORT)