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


/* Contacto profesional accesible: el envío se confirma en el cliente de correo. */
(() => {
  const dialog = document.getElementById('contactDialog');
  const trigger = document.getElementById('openContact');
  const closer = document.getElementById('closeContact');
  const form = document.getElementById('professionalContactForm');
  if (!dialog || !trigger || !closer || !form) return;
  trigger.addEventListener('click', () => { if (!dialog.open) dialog.showModal(); });
  closer.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => trigger.focus());
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const type = String(data.get('type') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !type || !message) return;
    const subject = 'Web MK MAIK | ' + type + ' | ' + name;
    const body = 'Nombre: ' + name + '\nEmail: ' + email + '\nTipo de consulta: ' + type + '\n\nMensaje:\n' + message + '\n';
    window.location.href = 'mailto:info.artista@mkmaik.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
