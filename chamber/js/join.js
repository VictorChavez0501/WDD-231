
document.querySelectorAll('.card').forEach(c=>{
  setTimeout(()=>c.classList.add('animate'),100);
});

const modal=document.getElementById('modal');
const modalTitle=document.getElementById('modal-title');
const modalBody=document.getElementById('modal-body');
const closeModal=document.getElementById('closeModal');

document.querySelectorAll('.show-modal').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const level=btn.closest('.card').dataset.level;
    modalTitle.textContent=level.toUpperCase()+" Benefits";
    modalBody.textContent={
      gold:"Gold includes featured listing, spotlight ads, and top placement.",
      silver:"Silver includes prominent listing and social media mentions.",
      bronze:"Bronze includes standard listing and newsletter mention.",
      np:"Non-Profit includes free or reduced cost listing."
    }[level];
    modal.style.display='flex';
  });
});
closeModal.addEventListener('click',()=>modal.style.display='none');
modal.addEventListener('click',e=>{if(e.target===modal)modal.style.display='none';});
