// Build discover page: fetch data, render cards, manage last-visit localStorage message
async function buildPage(){
  try{
    const resp = await fetch('../data/places.json');
    const data = await resp.json();
    const container = document.getElementById('cards');
    data.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure><img src="${item.image}" alt="${item.name}"></figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button aria-label="Learn more about ${item.name}">Learn more</button>
      `;
      container.appendChild(card);
    });
  }catch(e){
    console.error('Failed to load places.json', e);
    document.getElementById('cards').innerHTML = '<p>Failed to load content.</p>';
  }
}

function lastVisitMessage(){
  const key = 'chamber-last-visit';
  const sidebar = document.getElementById('visit-message');
  const now = Date.now();
  const prev = localStorage.getItem(key);
  if(!prev){
    sidebar.textContent = "Welcome! Let us know if you have any questions.";
  }else{
    const prevMs = Number(prev);
    const diffDays = Math.floor((now - prevMs) / (1000*60*60*24));
    if(diffDays < 1){
      sidebar.textContent = "Back so soon! Awesome!";
    }else if(diffDays === 1){
      sidebar.textContent = "You last visited 1 day ago.";
    }else{
      sidebar.textContent = `You last visited ${diffDays} days ago.`;
    }
  }
  localStorage.setItem(key, String(now));
}

document.addEventListener('DOMContentLoaded', () => {
  buildPage();
  lastVisitMessage();
});
