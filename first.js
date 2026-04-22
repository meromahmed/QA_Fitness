$(document).ready(function() {
    
    // 1. Mobile Toggle
    $('.mobile-menu-toggle').on('click', function() {
        $('.nav-links').slideToggle();
    });

    // 2. Clock
    function updateClock() {
        const now = new Date();
        $('#live-clock').html(now.toLocaleDateString() + " | <strong>" + now.toLocaleTimeString() + "</strong>");
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 3. BMI
    $('#calculate-bmi').on('click', function() {
        let w = parseFloat($('#weight').val());
        let h = parseFloat($('#height').val()) / 100;
        if (w > 0 && h > 0) {
            let bmi = (w / (h * h)).toFixed(1);
            $('#bmi-result').html("Result: <strong>" + bmi + "</strong>").css('color', '#d4ff00');
        }
    });

    // 4. Smooth Scroll (Fixed so Plan Buttons still work)
    $('.nav-links a[href^="#"], .footer-nav a[href^="#"], .footer-home-trigger').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            let target = $(this.hash);
            $('html, body').animate({ scrollTop: target.offset().top - 80 }, 800);
            if($(window).width() < 992) $('.nav-links').hide();
        } else {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 800);
        }
    });

    // 5. Scroll Reveal
    $(window).on('scroll', function() {
        $('.facility-card, .plan-card, .testimonial-card').each(function() {
            if ($(window).scrollTop() + $(window).height() > $(this).offset().top + 100) {
                $(this).addClass('reveal-visible');
            }
        });
    }).scroll();

    // 6. Map
    const map = L.map('map').setView([51.5226, -0.1115], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([51.5226, -0.1115]).addTo(map).bindPopup('QA Fitness');
});