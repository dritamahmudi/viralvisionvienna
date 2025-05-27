AOS.init({
  duration: 1200, // Zeit in Millisekunden (hier: 1,2 Sekunden)
  once: true // Animationen werden jedes Mal ausgeloest, wenn das Element gescrollt wird
});
console.log('AOS initialisiert!');

// Wenn der Button sichtbar wird, Animation starten:// Prueft, ob das Element die Klasse "aos-zoom-btn" hat
document.addEventListener('aos:in', function(event) {
  console.log('AOS IN ausgeloest fuer:', event.detail);
  
  if (event.detail.classList.contains('aos-zoom-btn')) {
    event.detail.classList.add('zoom-loop');
     console.log('zoom-loop hinzugefuegt:', event.detail);
  }
});
// Wenn der Button nicht mehr sichtbar ist, Animation entfernen:
document.addEventListener('aos:out', function(event) {
    console.log('AOS OUT ausgeloest fuer:', event.detail);
  if (event.detail.classList.contains('aos-zoom-btn')) {
    event.detail.classList.remove('zoom-loop');
    console.log('zoom-loop entfernt:', event.detail);
  }
});
