(()=>{
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero=document.querySelector('.hero');
if(!hero)return;
const stage=document.createElement('div');stage.className='cinema-stage';stage.innerHTML='<canvas aria-hidden="true"></canvas><div class="cinema-vignette"></div>';hero.prepend(stage);
const canvas=stage.querySelector('canvas'),ctx=canvas.getContext('2d');if(!ctx)return;
let w=0,h=0,dpr=1,raf=0,active=true;
const particles=Array.from({length:115},(_,i)=>({x:Math.random(),y:Math.random(),r:Math.random()*1.7+.4,phase:Math.random()*6.28,speed:.3+Math.random()*.8}));
function resize(){const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=r.width;h=r.height;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
function render(t){if(!active)return;ctx.clearRect(0,0,w,h);const time=t*.001;const cx=w*(w<900?.55:.74),cy=h*.49,R=Math.min(w*.25,h*.38);
const glow=ctx.createRadialGradient(cx,cy,R*.1,cx,cy,R*1.65);glow.addColorStop(0,'rgba(37,160,255,.19)');glow.addColorStop(1,'rgba(0,10,40,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
for(let ring=0;ring<4;ring++){ctx.beginPath();ctx.ellipse(cx,cy,R*(1.12+ring*.19),R*(.36+ring*.11),-.4+ring*.36+time*(ring%2?-.055:.05),0,Math.PI*2);ctx.strokeStyle='rgba(85,196,255,'+(.24-ring*.04)+')';ctx.lineWidth=1;ctx.stroke()}
const sphere=ctx.createRadialGradient(cx-R*.33,cy-R*.45,R*.06,cx,cy,R);sphere.addColorStop(0,'rgba(140,225,255,.34)');sphere.addColorStop(.4,'rgba(25,112,197,.27)');sphere.addColorStop(1,'rgba(2,27,67,.08)');ctx.fillStyle=sphere;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fill();
for(let lat=-4;lat<=4;lat++){const yy=lat/5;ctx.beginPath();ctx.ellipse(cx,cy+yy*R*.85,R*Math.sqrt(1-yy*yy),R*.14*Math.sqrt(1-yy*yy),0,0,Math.PI*2);ctx.strokeStyle='rgba(101,199,255,.18)';ctx.stroke()}
for(let lon=0;lon<13;lon++){let angle=lon*Math.PI/13+time*.13;ctx.beginPath();ctx.ellipse(cx,cy,R*Math.abs(Math.cos(angle)),R,0,0,Math.PI*2);ctx.strokeStyle='rgba(87,188,255,.12)';ctx.stroke()}
particles.forEach((p,i)=>{const x=p.x*w+Math.sin(time*p.speed+p.phase)*17,y=p.y*h+Math.cos(time*p.speed+p.phase)*12;ctx.beginPath();ctx.arc(x,y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(160,228,255,'+(.3+.35*Math.sin(time+p.phase)**2)+')';ctx.fill();if(i%9===0){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(cx+(x-cx)*.4,cy+(y-cy)*.4);ctx.strokeStyle='rgba(82,184,255,.055)';ctx.stroke()}});if(!reduced)raf=requestAnimationFrame(render)}
resize();window.addEventListener('resize',resize,{passive:true});if(reduced)render(0);else raf=requestAnimationFrame(render);
document.addEventListener('visibilitychange',()=>{active=!document.hidden;if(active&&!reduced)raf=requestAnimationFrame(render);else cancelAnimationFrame(raf)});
const cta=document.querySelector('.hero .cta-row');if(!cta)return;
const btn=document.createElement('button');btn.className='film-open';btn.type='button';btn.innerHTML='<span class="play-icon">▶</span> Watch the ESNEXUS film';cta.append(btn);
const modal=document.createElement('div');modal.className='film-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','ESNEXUS cinematic presentation');
modal.innerHTML='<div class="film-shell"><canvas aria-hidden="true"></canvas><button class="film-close" type="button" aria-label="Close film">✕ Close</button><div class="film-copy"><p>ESNEXUS / SYSTEM INTELLIGENCE</p><h2>Intelligence for complex systems.</h2></div><div class="film-note">INTERACTIVE MOTION FILM · 30 SECONDS</div><div class="film-progress"></div></div>';document.body.append(modal);
const filmCanvas=modal.querySelector('canvas'),fctx=filmCanvas.getContext('2d'),copy=modal.querySelector('.film-copy h2'),progress=modal.querySelector('.film-progress');
let filmRaf=0,start=0,previous=null;const scenes=[['Intelligence for complex systems.','SYSTEMS / INTELLIGENCE'],['Everything is connected.','01 / UNDERSTAND'],['See the unseen risk.','02 / SECURE'],['Build what comes next.','03 / EVOLVE'],['ESNEXUS','INTELLIGENCE IN MOTION']];
function close(){modal.classList.remove('open');document.body.style.overflow='';cancelAnimationFrame(filmRaf);btn.focus()}
function filmFrame(now){if(!modal.classList.contains('open'))return;const elapsed=(now-start)/1000;if(elapsed>=30){close();return}const r=filmCanvas.getBoundingClientRect(),fw=r.width,fh=r.height;const scale=Math.min(devicePixelRatio||1,2);if(filmCanvas.width!==Math.round(fw*scale)){filmCanvas.width=Math.round(fw*scale);filmCanvas.height=Math.round(fh*scale)}fctx.setTransform(scale,0,0,scale,0,0);fctx.clearRect(0,0,fw,fh);
const phase=elapsed/30,centerX=fw*.5,centerY=fh*.5;const g=fctx.createRadialGradient(centerX,centerY,0,centerX,centerY,fw*.7);g.addColorStop(0,'#0d528c');g.addColorStop(.55,'#05274d');g.addColorStop(1,'#020916');fctx.fillStyle=g;fctx.fillRect(0,0,fw,fh);
for(let i=0;i<100;i++){const a=i*2.399+elapsed*.12,rad=(i/100)*Math.min(fw,fh)*.8+Math.sin(elapsed+i)*12;const x=centerX+Math.cos(a)*rad,y=centerY+Math.sin(a)*rad*.63;fctx.fillStyle='rgba(132,222,255,'+(.15+.6*(1-i/100))+')';fctx.beginPath();fctx.arc(x,y,1+i%3*.65,0,Math.PI*2);fctx.fill()}
for(let j=0;j<6;j++){fctx.save();fctx.translate(centerX,centerY);fctx.rotate(elapsed*(j%2?-.12:.1)+j);fctx.beginPath();fctx.ellipse(0,0,fw*(.17+j*.04),fh*(.12+j*.026),0,0,Math.PI*2);fctx.strokeStyle='rgba(120,215,255,'+(.33-j*.04)+')';fctx.stroke();fctx.restore()}
const index=Math.min(4,Math.floor(elapsed/6));if(index!==previous){previous=index;copy.textContent=scenes[index][0];modal.querySelector('.film-copy p').textContent=scenes[index][1];copy.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,fill:'both'})}progress.style.width=phase*100+'%';filmRaf=requestAnimationFrame(filmFrame)}
btn.addEventListener('click',()=>{modal.classList.add('open');document.body.style.overflow='hidden';previous=null;start=performance.now();modal.querySelector('.film-close').focus();filmRaf=requestAnimationFrame(filmFrame)});
modal.querySelector('.film-close').addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))close()});
})();