$(document).ready(function() {
    // 1. Smooth scroll for navigation
    $('.nav-links a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    });

    // 2. Fade-in effect for cards as you scroll down
    $(window).on('scroll', function() {
        $('.value-card').each(function() {
            var object_top = $(this).offset().top;
            var window_bottom = $(window).scrollTop() + $(window).height();

            // Trigger when the card is slightly visible
            if (window_bottom > object_top + 50) {
                $(this).animate({'opacity': '1'}, 600);
            }
        });
    });

    // Run trigger once on load
    $(window).trigger('scroll');
});