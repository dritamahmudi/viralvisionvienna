document.addEventListener('DOMContentLoaded', function() {
new Swiper('.swiper-sliders', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-sliders .swiper-pagination', // WICHTIG: Spezifischer Selektor
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
    on: {
      init() {
        console.log('swiper-sliders initialized');
      },
    },
  });  

   
new Swiper('.swiper-services', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
      el: '.swiper-services .swiper-pagination', // WICHTIG: Spezifischer Selektor
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
    on: {
      init() {
        console.log('swiper-services initialized');
      },
    },
  });  
    
new Swiper('.swiper-teams', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
      el: '.swiper-teams .swiper-pagination', // WICHTIG: Spezifischer Selektor
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
    on: {
      init() {
        console.log('swiper-teams initialized');
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
