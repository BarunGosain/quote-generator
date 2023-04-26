const quoteText = document.getElementById("quote-text");
const quoteAuther = document.getElementById("quote-auther");
const qouteTwitterBtn = document.getElementById("quote-twitter");
const newQuoteBtn = document.getElementById("new-quote");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");
const notFound = document.getElementById("not-found");

let apiQoutes = [];
let tryCount = 0;

function showLoaderSpinner(){
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function hideLoaderSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}



function newQuote(){
    showLoaderSpinner();
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

    hideLoaderSpinner();
}

async function getQuotes(){
    quoteContainer.hidden = true;
    notFound.hidden = true;
    const apiUrl = "https://type.fit/api/quotes";

    try{
        const response = await fetch(apiUrl);
        apiQoutes = await response.json();
        showLoaderSpinner();
        newQuote();
    }
    catch(error){
        if(tryCount < 10){
            console.log("tryCount : ",tryCount);
            getQuotes();
        }
        tryCount++;

        if(tryCount > 4){
            loader.hidden = true;
            quoteContainer.hidden = true;
            notFound.hidden = false;
        }
    }
}

function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuther.textContent}`;
    window.open(tweetUrl,'_blank');

}

qouteTwitterBtn.addEventListener('click', tweetQuote);

newQuoteBtn.addEventListener('click', newQuote);

getQuotes();