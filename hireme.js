
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission interaction
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for trying to contact me. Unfortunately, your request has not been submitted because this function is still under construction.');
    this.reset();
});

