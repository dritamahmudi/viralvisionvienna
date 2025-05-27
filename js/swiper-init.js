document.addEventListener('DOMContentLoaded', function() {
 new Swiper('.swiper-clients', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-clients .swiper-pagination', // WICHTIG: Spezifischer Selektor
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    on: {
      init() {
        console.log('Clients slider initialized');
      },
    },
  });  

  // 2. NEUER Slider (z.B. für Testimonials/Produkte)
  new Swiper('.swiper-sliders', {
    loop: true,
    slidesPerView: 1,
    effect: 'fade', // Optional: Fade-Transition
    fadeEffect: { crossFade: true },
    navigation: {
      nextEl: '.swiper-sliders .swiper-button-next',
      prevEl: '.swiper-sliders .swiper-button-prev'
    },
    autoplay: { delay: 5000 }
  });

});
