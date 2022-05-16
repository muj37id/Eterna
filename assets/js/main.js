(function() {
    "use strict";

    /**
     * Easy selector helper function  <Porfolio> دا تابع لي الجزء بتاع 
     */
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
        return [...document.querySelectorAll(el)];
        } else {
        return document.querySelector(el);
        }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
        if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
        } else {
        selectEl.addEventListener(type, listener);
        }
    }
    };

    /**
     * Back to top button
     */
    var backToTop = document.getElementById('back-to-top');
    window.onscroll = function() {
        if (window.scrollY > 400) {
            backToTop.style.display= "block";
            } else {
                backToTop.style.display= "none";
        }
    };

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
    });

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true);

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
        e.preventDefault();

        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
            navbar.classList.remove('navbar-mobile');
            let navbarToggle = select('.mobile-nav-toggle');
            navbarToggle.classList.toggle('bi-list');
            navbarToggle.classList.toggle('bi-x');
        }
        scrollto(this.hash);
        }
    }, true);

      /**
   * Scroll with ofset on page load with hash links in the url
   */
 /*  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  }); */
    
        

    /**
     * Hero carousel indicators
     */
    let heroCarouselIndicators = select("#hero-carousel-indicators")
    let heroCarouselItems = select('#heroCarousel .carousel-item', true)

    heroCarouselItems.forEach((item, index) => {
        (index === 0) ?
        heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
        heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
    });

    /**
     * Clients Slider
     */
    new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    breakpoints: {
        320: {
        slidesPerView: 2,
        spaceBetween: 40
        },
        480: {
        slidesPerView: 3,
        spaceBetween: 60
        },
        640: {
        slidesPerView: 4,
        spaceBetween: 80
        },
        992: {
        slidesPerView: 6,
        spaceBetween: 120
        }
    }
    });

    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
        element: skilsContent,
        offset: '80%',
        handler: function(direction) {
            let progress = select('.progress .progress-bar', true);
            progress.forEach((el) => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
            });
        }
        });
    }

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function(e) {
            e.preventDefault();
            portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
            });
            this.classList.add('filter-active');

            portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
            });
        }, true);
        }

    });

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
        delay: 5000,
        disableOnInteraction: false
        },
        pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
        }
    });


})();