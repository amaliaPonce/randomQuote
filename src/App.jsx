import  { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random?language=es');
      const data = await response.json();
      setQuote({ text: data.content, author: data.author });
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div id="quote-box" className="container mt-5 p-5 rounded shadow-lg text-center"
         style={{ backgroundColor: '#343a40', color: '#ffffff' }}>
      <div id="quote-content">
        <div id="text" className="h4 mb-4">
          {quote.text}
        </div>
        <div id="author" className="italic mb-4">
          - {quote.author}
        </div>
      </div>
      <div id="quote-actions" className="d-flex flex-column align-items-center">
        <button
          id="new-quote"
          onClick={fetchRandomQuote}
          className="btn btn-light mb-2"
        >
          Generar nueva frase
        </button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `"${quote.text}" - ${quote.author}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-info mt-2"
        >
          Compartir en Twitter
        </a>
      </div>
    </div>
  );
};

export default App;
