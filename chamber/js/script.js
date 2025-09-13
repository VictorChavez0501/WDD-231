document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastEl = document.getElementById('lastModified');
  if (lastEl) lastEl.textContent = `Last Updated: ${document.lastModified}`;

  // load members
  loadMembers().catch(err => console.error('Error loading members:', err));

  // view toggle buttons
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
    card.className = 'member-card';

    const img = document.createElement('img');
    img.src = `images/${member.image || 'placeholder.png'}`;
    img.alt = `${member.name} logo`;
    img.className = 'logo';

    const info = document.createElement('div');
    info.className = 'info';

    const h3 = document.createElement('h3');
    h3.textContent = member.name;

    const addr = document.createElement('p');
    addr.textContent = member.address || '';

    const phone = document.createElement('p');
    phone.textContent = member.phone || '';

    const web = document.createElement('p');
    if (member.website) {
      const a = document.createElement('a');
      a.href = member.website;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Visit Website';
      web.appendChild(a);
    }

    // membership badge
    const badge = document.createElement('span');
    badge.className = 'badge level-' + (member.membership || 1);
    if (member.membership == 3) badge.textContent = 'Gold Member';
    else if (member.membership == 2) badge.textContent = 'Silver Member';
    else badge.textContent = 'Member';

    info.appendChild(h3);
    info.appendChild(addr);
    info.appendChild(phone);
    info.appendChild(web);
    info.appendChild(badge);

    card.appendChild(img);
    card.appendChild(info);

    container.appendChild(card);
  });
}
