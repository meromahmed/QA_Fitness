function filter(cat, btn) {
    // 1. UI: Set active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 2. Logic: Show/Hide cards and reset flips
    document.querySelectorAll('.feature-card').forEach(card => {
        card.classList.remove('flipped'); // Reset flip when filtering
        
        if (cat === 'all' || card.dataset.cat === cat) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function toggleFlip(card) {
    card.classList.toggle('flipped');
}

// 3. Smooth Scrolling for Nav Links
    $('.nav-links a[href^="#"], .footer-nav a[href^="#"], .footer-home-trigger').on('click', function(e) {
        e.preventDefault();
        
        // If clicking 'Home' or footer home trigger, go to top
        if ($(this).attr('href') === "#" || $(this).hasClass('footer-home-trigger')) {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return;
        }

        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });