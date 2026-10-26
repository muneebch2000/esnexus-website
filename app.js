
const menu=document.querySelector('.menu');
const mobile=document.querySelector('.mobile-nav');
if(menu&&mobile){menu.setAttribute('aria-expanded','false');menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window&&!reduced){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
const visual=document.querySelector('.hero-visual');
if(visual&&!reduced&&window.matchMedia('(pointer:fine)').matches){visual.addEventListener('pointermove',e=>{const r=visual.getBoundingClientRect();visual.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5).toFixed(2));visual.style.setProperty('--my',((e.clientY-r.top)/r.height-.5).toFixed(2));});visual.addEventListener('pointerleave',()=>{visual.style.setProperty('--mx','0');visual.style.setProperty('--my','0')});}
