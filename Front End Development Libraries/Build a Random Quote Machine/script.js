document.addEventListener('DOMContentLoaded', function() {
  const quoteBox = document.getElementById('quote-box');
  const quoteText = document.getElementById('text');
  const quoteAuthor = document.getElementById('author');
  const newQuoteBtn = document.getElementById('new-quote');
  const tweetQuoteBtn = document.getElementById('tweet-quote');

  // Fallback quotes in case API fails
  const fallbackQuotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" }
  ];

  // Fetch random quote from API
  async function fetchRandomQuote() {
    quoteText.innerHTML = '<i class="fas fa-quote-left"></i> Loading...';
    quoteAuthor.textContent = '';
    
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      
      displayQuote({
        text: data.content,
        author: data.author || 'Unknown'
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
      // Use fallback quotes if API fails
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      displayQuote(randomQuote);
    }
  }

  // Display the quote
  function displayQuote(quote) {
    quoteText.innerHTML = `<i class="fas fa-quote-left"></i> ${quote.text}`;
    quoteAuthor.textContent = `- ${quote.author}`;
    
    // Update tweet button
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote.text}" - ${quote.author}`
    )}`;
    tweetQuoteBtn.setAttribute('href', tweetUrl);
  }

  // Event listeners
  newQuoteBtn.addEventListener('click', fetchRandomQuote);
  
  // Load first quote
  fetchRandomQuote();
});