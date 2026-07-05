const entry = document.getElementById('entry');
const intro = document.getElementById('introAudio');
const enterMusic = document.getElementById('enterMusic');
const enterSilent = document.getElementById('enterSilent');
const muteBtn = document.getElementById('muteBtn');
const allAudios = [...document.querySelectorAll('audio')];
function enter(play){ entry.classList.add('hidden'); if(play){ intro.volume=.45; intro.play().catch(()=>{}); muteBtn.textContent='▮▮'; } }
enterMusic.addEventListener('click',()=>enter(true));
enterSilent.addEventListener('click',()=>enter(false));
muteBtn.addEventListener('click',()=>{ if(intro.paused){ intro.play().catch(()=>{}); muteBtn.textContent='▮▮'; } else { intro.pause(); muteBtn.textContent='▶'; }});
allAudios.forEach(a=>a.addEventListener('play',()=>{ allAudios.forEach(b=>{if(b!==a)b.pause()}); if(a!==intro) intro.pause(); }));
