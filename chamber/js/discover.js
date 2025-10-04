
// discover.js - build the Discover page and manage last-visit messages using localStorage
async function buildPage(){
  try {
    const resp = await fetch('../data/places.json');
    if(!resp.ok) throw new Error('Failed to load places.json');
    const places = await resp.json();
    const cards = document.getElementById('cards');
    cards.innerHTML = ''; // clear

    places.forEach(place => {
      const art = document.createElement('article');
      art.className = 'card';
      art.innerHTML = `
        <h2>${place.name}</h2>
        <figure class="card-figure">
          <img src="${place.image}" loading="lazy" alt="${place.name}">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn" aria-label="Learn more about ${place.name}">Learn more</button>
      `;
      cards.appendChild(art);
    });
  } catch (err) {
    console.error(err);
    const cards = document.getElementById('cards');
    cards.textContent = 'Sorry — failed to load places.';
  }
}

// LocalStorage: last visit message
function lastVisitMessage(){
  const key = 'discover-last-visit';
  const now = Date.now();
  const sidebar = document.getElementById('visitMsg');
  const prev = localStorage.getItem(key);

  if(!prev){
    sidebar.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const prevNum = Number(prev);
    const diffMs = now - prevNum;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if(diffMs < (1000 * 60 * 60 * 24)){
      sidebar.textContent = "Back so soon! Awesome!";
    } else if(diffDays === 1){
      sidebar.textContent = "You last visited 1 day ago.";
    } else {
      sidebar.textContent = `You last visited ${diffDays} days ago.`;
    }
  }

  // store current visit
  localStorage.setItem(key, String(now));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  buildPage();
  lastVisitMessage();
});
