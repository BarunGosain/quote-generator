const quoteText = document.getElementById("quote-text");
const quoteAuther = document.getElementById("quote-auther");
const qouteTwitterBtn = document.getElementById("quote-twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQoutes = [];

function newQuote(){;
    const quote = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
    quoteText.textContent = quote.text;
    if(quote.text.length > 50){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }

    if(!quote.author){
        quoteAuther.textContent = 'Unknown';
    }else{
        quoteAuther.textContent = quote.author;
    }
}

async function getQuotes(){
    const apiUrl = "https://type.fit/api/quotes";

    try{
        const response = await fetch(apiUrl);
        apiQoutes = await response.json();
        newQuote();
    }
    catch(error){

    }
}

function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuther.textContent}`;
    window.open(tweetUrl,'_blank');

}

qouteTwitterBtn.addEventListener('click', tweetQuote);

newQuoteBtn.addEventListener('click', newQuote);

getQuotes();