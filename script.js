const apiKey = '2a8b6c9b8f914adf9c1b6331144f0d90';  
const newsUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&category=`;

let bookmarks = [];

async function fetchNews(category) {
    try {
        const response = await fetch(`${newsUrl}${category}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched news data:', data); 
        
        
        if (data && Array.isArray(data.articles)) {
            displayNews(data.articles);
        } else {
            console.error('No articles found or data is not an array');
        }
    } catch (error) {
        alert('Error fetching news: ' + error);
    }
}

async function searchNews() {
    const query = document.getElementById('searchInput').value;
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched search data:', data); 
        
        if (data && Array.isArray(data.articles)) {
            displayNews(data.articles);
        } else {
            console.error('No articles found or data is not an array');
        }
    } catch (error) {
        alert('Error searching for news: ' + error);
    }
}

function displayNews(articles) {
    const newsSection = document.getElementById('newsSection');
    newsSection.innerHTML = ''; 

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <img src="${article.urlToImage || ''}" alt="News image">
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available'}</p>
            <button onclick="bookmarkArticle('${article.title}', '${article.url}', '${article.urlToImage || ''}')">Bookmark</button>
        `;
        newsSection.appendChild(newsCard);
    });
}

function bookmarkArticle(title, url, image) {
    if (bookmarks.some(article => article.url === url)) {
        alert('Article already bookmarked!');
        return;
    }

    bookmarks.push({ title, url, image });
    displayBookmarkedArticles();
}

function displayBookmarkedArticles() {
    const bookmarkedSection = document.getElementById('bookmarked-section');
    bookmarkedSection.innerHTML = '';  

    bookmarks.forEach(article => {
        const bookmarkCard = document.createElement('div');
        bookmarkCard.className = 'news-card bookmarked-card';
        bookmarkCard.innerHTML = `
            <img src="${article.image}" alt="Bookmark image">
            <h3>${article.title}</h3>
            <a href="${article.url}" target="_blank">Read More</a>
            <button onclick="removeBookmark('${article.url}')">Remove Bookmark</button>
        `;
        bookmarkedSection.appendChild(bookmarkCard);
    });
}

function removeBookmark(url) {
    bookmarks = bookmarks.filter(article => article.url !== url);
    displayBookmarkedArticles();
}





