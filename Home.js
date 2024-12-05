window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const signUpLink = document.getElementById('signup-link');
        const loginLink = document.getElementById('login-link');
        
        // Handle Sign Up link click
        if (signUpLink) {
            signUpLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default anchor behavior
                window.location.href = '/stud-signup'; // Navigate to the sign-up page
            });
        }
    
        // Handle Login link click
        if (loginLink) {
            loginLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default anchor behavior
                window.location.href = '/stud-signup'; // Navigate to the login page (change this if needed)
            });
        }
    });
    
    
});
