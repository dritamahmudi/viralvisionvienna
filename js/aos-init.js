AOS.init({
  duration: 1200, // Zeit in Millisekunden (hier: 1,2 Sekunden)
  once: false // Animationen werden jedes Mal ausgelöst, wenn das Element gescrollt wird
});

// Wenn der Button sichtbar wird, Animation starten:
document.addEventListener('aos:in', function(event) {
  if (event.detail.id === 'sendForm' || event.detail.classList.contains('sendForm')) {
    event.detail.classList.add('zoom-loop');
  }
});

// Wenn der Button nicht mehr sichtbar ist, Animation entfernen:
document.addEventListener('aos:out', function(event) {
  if (event.detail.id === 'sendForm' || event.detail.classList.contains('sendForm')) {
    event.detail.classList.remove('zoom-loop');
  }
});
