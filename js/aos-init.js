on: { init() {
        console.log('AOS.init initialized');
      },
    }

AOS.init({
  duration: 1200, // Zeit in Millisekunden (hier: 1,2 Sekunden)
  once: false // Animationen werden jedes Mal ausgelöst, wenn das Element gescrollt wird
});

// Wenn der Button sichtbar wird, Animation starten:// Prüft, ob das Element die Klasse "aos-zoom-btn" hat
document.addEventListener('aos:in', function(event) {
  console.log('AOS IN ausgelöst für:', event.detail);
  
  if (event.detail.classList.contains('aos-zoom-btn')) {
    event.detail.classList.add('zoom-loop');
     console.log('zoom-loop hinzugefügt:', event.detail);
  }
});
// Wenn der Button nicht mehr sichtbar ist, Animation entfernen:
document.addEventListener('aos:out', function(event) {
    console.log('AOS OUT ausgelöst für:', event.detail);
  if (event.detail.classList.contains('aos-zoom-btn')) {
    event.detail.classList.remove('zoom-loop');
    console.log('zoom-loop entfernt:', event.detail);
  }
});
