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


/* Móvil: botones compactos accesibles para reproducir las cuatro canciones. */
(() => {
  const section = document.getElementById('musica');
  if (!section) return;
  const cards = [...section.querySelectorAll('.playlist-four .track')];
  if (!cards.length || cards.some(card => !card.querySelector('audio') || !card.querySelector('.mobile-track-play'))) return;
  function sync() {
    cards.forEach(card => {
      const audio = card.querySelector('audio');
      const button = card.querySelector('.mobile-track-play');
      const playing = !audio.paused && !audio.ended;
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', (playing ? 'Pausar ' : 'Reproducir ') + (card.querySelector('h3')?.textContent?.trim() || 'canción'));
      button.querySelector('.mobile-play-icon').textContent = playing ? 'Ⅱ' : '▶';
      button.querySelector('.mobile-play-label').textContent = playing ? 'Pausar' : 'Escuchar';
    });
  }
  cards.forEach(card => {
    const audio = card.querySelector('audio');
    const button = card.querySelector('.mobile-track-play');
    button.addEventListener('click', () => {
      if (audio.paused) audio.play().catch(() => { sync(); });
      else audio.pause();
    });
    ['play', 'pause', 'ended'].forEach(name => audio.addEventListener(name, sync));
  });
  section.classList.add('mobile-discography-ready');
  sync();
})();
