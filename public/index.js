/**
 * Main IIFE (Immediately Invoked Function Expression) to encapsulate and execute script upon window load.
 */
"use strict";
(function() {
  /**
   * Sets up event listeners when the window loads.
   */
  window.addEventListener("load", init);

  /**
   * Initializes the page by setting up event listeners and default view settings.
   */
  function init() {
    id("start-btn").addEventListener("click", () => switchView("quotes-view"));
    id("get-random-quote-btn").addEventListener("click", fetchRandomQuote);
    id("toggle-add-quote-btn").addEventListener("click", () => toggleView("add-quote-form"));
    id("submit-quote-btn").addEventListener("click", addQuote);
    id("view-all-quotes-btn").addEventListener("click", fetchAllQuotes);

    switchView("intro-view");
    id("add-quote-form").style.display = 'none';
  }

  /**
   * Switches the visible section to the specified view.
   * @param {string} viewId - The ID of the view to display.
   */
  function switchView(viewId) {
    let views = document.querySelectorAll(".view");
    views.forEach(view => view.style.display = 'none');
    id(viewId).style.display = 'block';
  }

  /**
   * Toggles the visibility of a specified form.
   * @param {string} formId - The ID of the form to toggle.
   */
  function toggleView(formId) {
    let form = id(formId);
    form.style.display = (form.style.display === 'none' ? 'block' : 'none');
  }

  /**
   * Fetches a random quote from the server and updates the display.
   */
  function fetchRandomQuote() {
    fetch('/random-quote')
      .then(statusCheck)
      .then(res => res.json())
      .then(quote => displayQuote(`${quote.text} - ${quote.author}`))
      .catch(handleError);
  }

  /**
   * Collects data from form, sends it to the server, and handles the response.
   */
  function addQuote() {
    const quoteText = id("new-quote").value;
    const authorText = id("quote-author").value;
    if (!quoteText.trim() || !authorText.trim()) {
      displayError("Please enter both the quote and the author.");
      return;
    }

    const quote = { text: quoteText, author: authorText };
    fetch('/add-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote)
    })
    .then(statusCheck)
    .then(() => {
      displayQuote(`Quote added: "${quoteText}" by ${authorText}`);
      id("new-quote").value = "";
      id("quote-author").value = "";
      toggleView("add-quote-form");
    })
    .catch(handleError);
  }

  /**
   * Fetches all quotes from the server and displays them.
   */
  function fetchAllQuotes() {
    fetch('/all-quotes')
      .then(statusCheck)
      .then(res => res.json())
      .then(quotes => {
        let allQuotes = quotes.map(quote => `<p>${quote.text} - ${quote.author}</p>`).join("");
        displayQuote(allQuotes);
      })
      .catch(handleError);
  }

  /**
   * Displays a quote in the designated container with distinct HTML formatting.
   * @param {string} message - The message or quote to display, can be HTML.
   */
  function displayQuote(message) {
    const container = id("quote-container");
    container.innerHTML = ''; // Clear previous content
    const quoteElement = document.createElement('div');
    quoteElement.innerHTML = message;
    container.appendChild(quoteElement);
  }

  /**
   * Handles network or server errors by displaying a custom message on the page.
   * @param {Error} error - The error that occurred during fetch operations.
   */
  function handleError(error) {
    displayError("An error occurred: " + error.message);
  }

  /**
   * Displays errors specifically formatted to indicate problems.
   * @param {string} message - The error message to display.
   */
  function displayError(message) {
    id("quote-container").innerHTML = `<p class="error">${message}</p>`;
  }

  /**
   * Validates the fetch response and ensures it is OK to process.
   * @param {Object} res - The fetch response to check.
   * @returns {Object} - Validated fetch response.
   * @throws {Error} If the response is not OK.
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Helper function to select an element by ID.
   * @param {string} name - Element ID.
   * @returns {Element} - DOM element associated with the given ID.
   */
  function id(name) {
    return document.getElementById(name);
  }
})();