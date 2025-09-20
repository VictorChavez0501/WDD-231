document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastEl = document.getElementById('lastModified');
  if (lastEl) lastEl.textContent = `Last Updated: ${document.lastModified}`;

  // Cargar miembros
  loadMembers().catch(err => console.error('Error loading members:', err));

  // Botones de vista de directorio
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');
  const membersContainer = document.getElementById('members');

  if (gridBtn && listBtn && membersContainer) {
    gridBtn.addEventListener('click', () => {
      gridBtn.setAttribute('aria-pressed','true');
      listBtn.setAttribute('aria-pressed','false');
      membersContainer.className = 'grid';
    });
    listBtn.addEventListener('click', () => {
      gridBtn.setAttribute('aria-pressed','false');
      listBtn.setAttribute('aria-pressed','true');
      membersContainer.className = 'list';
    });
  }

  // Cargar clima
  loadWeather().catch(err => console.error('Error loading weather:', err));
});

async function loadMembers() {
  const res = await fetch('data/members.json');
  if (!res.ok) throw new Error('No se pudo obtener members.json');
  const members = await res.json();
  displayMembers(members);
}

function displayMembers(members) {
  const container = document.getElementById('members');
  if (!container) return;
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('member-card');

    // Clase especial según membresía
    if (member.membership === 3) card.classList.add('gold');
    if (member.membership === 2) card.classList.add('silver');
    if (member.membership === 1) card.classList.add('bronze');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h4>${member.name} <span class="membership-icon">${member.membershipIcon}</span></h4>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p>${member.description}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;
    container.appendChild(card);
  });
}


async function loadWeather() {
  const apiKey = "9c566b6183851894ec5f48c29db51fc0";
  const cityId = "3598132"; // Guatemala City
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${apiKey}`;

  // Clima actual
  const weatherRes = await fetch(weatherURL);
  if (!weatherRes.ok) throw new Error("Error al obtener el clima actual");
  const weatherData = await weatherRes.json();

  document.getElementById('temp').textContent = `${Math.round(weatherData.main.temp)}°C`;
  document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
  document.getElementById('condition').textContent = weatherData.weather[0].description;

  const icon = document.getElementById('weather-icon');
  if (icon) {
    icon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    icon.alt = weatherData.weather[0].description;
  }

  // Pronóstico 3 días
  const forecastRes = await fetch(forecastURL);
  if (!forecastRes.ok) throw new Error("Error al obtener el pronóstico");
  const forecastData = await forecastRes.json();

  const forecastContainer = document.getElementById('forecast');
  if (forecastContainer) {
    forecastContainer.innerHTML = '';
    // Filtrar para mostrar solo un dato por día (aprox. 12:00 PM)
    const daily = forecastData.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);

    daily.forEach(day => {
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const min = Math.round(day.main.temp_min);
      const max = Math.round(day.main.temp_max);
      const iconCode = day.weather[0].icon;

      const card = document.createElement('div');
      card.classList.add('forecast-day');
      card.innerHTML = `
        <p><strong>${dayName}</strong></p>
        <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${day.weather[0].description}">
        <p>${min}° / ${max}°</p>
      `;
      forecastContainer.appendChild(card);
    });
  }
}
