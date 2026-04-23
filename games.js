
const gameList = document.getElementById('game-list');
const searchInput = document.getElementById('searchInput');

async function searchGames(query) {
   
    const searchTerm = query !== undefined ? query : searchInput.value.trim();
    
      gameList.innerHTML = '<div class="spinner-border text-light" role="status"></div>';

    try {
     
        const url = searchTerm === '' 
            ? 'https://www.cheapshark.com/api/1.0/deals?pageSize=12' 
            : `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(searchTerm)}`;

        const response = await fetch(url);
        const data = await response.json();

     
        gameList.innerHTML = '';

      
        if (!data || data.length === 0) {
            gameList.innerHTML = '<h3 class="text-white text-center w-100">No games found. Try searching for something else!</h3>';
            return;
        }

        data.forEach(game => {
           
            const title = game.external || game.title || "Unknown Title";
            const price = game.cheapest || game.salePrice || "N/A";
            const thumb = game.thumb || "https://via.placeholder.com/300x250?text=No+Image";
            const dealID = game.cheapestDealID || game.dealID;

         
            const cardHtml = `
                <div class="card" style="width: 18rem; position: relative;">
                    <img src="${thumb}" class="card-img-top" alt="${title}">
                    
                    <div class="hover-buy">
                        <a href="https://www.cheapshark.com/redirect?dealID=${dealID}" target="_blank" class="btn btn-warning fw-bold">BUY ON EPIC</a>
                    </div>

                    <div class="card-body">
                        <h6 class="card-title text-truncate" title="${title}">${title}</h6>
                        <p class="text-success fw-bold mb-1">$${price}</p>
                        <button class="btn btn-sm btn-primary w-100">Add to Cart</button>
                    </div>
                </div>
            `;
            
            gameList.innerHTML += cardHtml;
        });

           const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.onmouseenter = () => {
                const overlay = card.querySelector('.hover-buy');
                if(overlay) overlay.style.opacity = '1';
            };
            card.onmouseleave = () => {
                const overlay = card.querySelector('.hover-buy');
                if(overlay) overlay.style.opacity = '0';
            };
        });

    } catch (error) {
        console.error("API Error:", error);
        gameList.innerHTML = '<h3 class="text-white text-center w-100">Failed to load games. Check your internet connection.</h3>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    searchGames('');
});
function handleUserGreeting() {
     let userName = prompt("Welcome to GamesHub! Please enter your username:");
    
       if (!userName || userName.trim() === '') {
        userName = "GAMER";
    }
    
    const topNavbar = document.querySelector('.navbar.bg-light .container-fluid');

     if (topNavbar) {
        const welcomeMessage = document.createElement('span');
        
         welcomeMessage.className = 'navbar-text fw-bold ms-auto'; 
        welcomeMessage.style.color = '#07640e';
        welcomeMessage.style.fontSize = '1.1rem';
        welcomeMessage.style.letterSpacing = '1px';
        
          welcomeMessage.innerText = `WELCOME ${userName.toUpperCase()}`;
        topNavbar.appendChild(welcomeMessage);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    handleUserGreeting();
});