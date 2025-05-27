document.addEventListener('DOMContentLoaded', function() {
   // 2. swiper-sliders
  new Swiper('.swiper-sliders', {
    loop: true,
    slidesPerView: 1,
    effect: 'fade', // Optional: Fade-Transition
    fadeEffect: { crossFade: true },
    navigation: {
      nextEl: '.swiper-sliders .swiper-button-next',
      prevEl: '.swiper-sliders .swiper-button-prev'
    },
    autoplay: { delay: 5000 },

   on: { init() {
        console.log('swiper-sliders initialized');
      },
    },
  });

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
        console.log('swiper-clients initialized');
      },
    },
  });  

 
});
