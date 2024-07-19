// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle the navigation menu on mobile
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');

mobileMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
});
