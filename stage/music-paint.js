document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.music-section');
  const grid = document.querySelector('.music-list-container');
  if (!section || !grid) return;
  const cards = [...grid.querySelectorAll('.music-card')];
  const canvas = document.createElement('div');
  canvas.className = 'paint-canvas';
  canvas.setAttribute('aria-hidden','true');
  section.insertBefore(canvas, section.firstChild);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = [[218,220,226],[221,221,232],[231,218,225],[251,164,190],[255,210,115],[139,208,247],[141,219,183],[185,157,241],[255,153,192],[250,143,170],[250,200,106],[118,214,211],[172,144,241]];
  const done = new Set();
  const paint = (card, index) => {
    if (done.has(card)) return;
    done.add(card);
    const c = colors[index % colors.length];
    const rgb = c.join(',');
    const rect = card.getBoundingClientRect();
    const sec = section.getBoundingClientRect();
    const x = rect.left - sec.left + rect.width * (index % 2 ? .65 : .35);
    const y = rect.top - sec.top + rect.height * .52;
    const size = Math.min(750,Math.max(360,rect.width * 1.85));
    // Three irregular overlapping blooms create a softer watercolor edge.
    for(let j=0;j<3;j++){
      const spot=document.createElement('span');
      spot.className='paint-spot';
      spot.style.setProperty('--rgb',rgb);
      spot.style.setProperty('--x',`${x+(j-1)*size*.14}px`);
      spot.style.setProperty('--y',`${y+(j-1)*size*.08}px`);
      spot.style.setProperty('--size',`${size*(j===0?1:.75)}px`);
      spot.style.setProperty('--rotation',`${(j-1)*19}deg`);
      canvas.appendChild(spot);
      requestAnimationFrame(()=>requestAnimationFrame(()=>spot.classList.add('bloom')));
    }
    card.classList.add('painted');
    if (!reduced && index>=9){
      for(let k=0;k<13;k++){
        const dot=document.createElement('span');dot.className='paint-particle';
        dot.style.setProperty('--rgb',rgb);
        dot.style.setProperty('--x',`${x}px`);dot.style.setProperty('--y',`${y}px`);
        dot.style.setProperty('--d',`${3+Math.random()*7}px`);
        dot.style.setProperty('--dx',`${(Math.random()-.5)*420}px`);
        dot.style.setProperty('--dy',`${(Math.random()-.5)*300}px`);
        canvas.appendChild(dot);dot.addEventListener('animationend',()=>dot.remove(),{once:true});
      }
    }
  };
  if (!('IntersectionObserver' in window) || reduced){
    cards.forEach((card,i)=>paint(card,i));return;
  }
  // Cards sharing a desktop row trigger together, but start 180ms apart.
  const observer=new IntersectionObserver(entries=>{
    const incoming=entries.filter(e=>e.isIntersecting).map(e=>cards.indexOf(e.target)).sort((a,b)=>a-b);
    incoming.forEach((index,order)=>{
      observer.unobserve(cards[index]);
      window.setTimeout(()=>paint(cards[index],index),Math.min(order,6)*180);
    });
  },{rootMargin:'0px 0px -8% 0px',threshold:.12});
  cards.forEach(card=>observer.observe(card));
});
