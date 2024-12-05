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

    document.getElementById('alumni-cards').addEventListener('click', (event) => {
        const alumniCard = event.target.closest('.alumni-card');
        if (alumniCard) {
            // Redirect to a static alumni profile page
            window.location.href = '/alum-prof';
        }
    });
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

});


// Sample alumni data with photos and roles


const alumniData = [
    { name: "Anitha S", designation: "Software Engineer", photo: "https://via.placeholder.com/100" },
    { name: "Jane Smith", designation: "Product Manager", photo: "https://via.placeholder.com/100" },
    { name: "John Doe", designation: "Software Engineer", photo: "https://via.placeholder.com/100" },
    { name: "Jane Smith", designation: "Product Manager", photo: "https://via.placeholder.com/100" },
    { name: "John Doe", designation: "Software Engineer", photo: "https://via.placeholder.com/100" },
    { name: "Jane Smith", designation: "Product Manager", photo: "https://via.placeholder.com/100" },
    { name: "John Doe", designation: "Software Engineer", photo: "https://via.placeholder.com/100" },
    { name: "Jane Smith", designation: "Product Manager", photo: "https://via.placeholder.com/100" },
    { name: "Alice Johnson", designation: "Data Scientist", photo: "https://via.placeholder.com/100" },
    { name: "Alice Johnson", designation: "Data Scientist", photo: "https://via.placeholder.com/100" },
    { name: "Alice Johnson", designation: "Data Scientist", photo: "https://via.placeholder.com/100" },
    { name: "Alice Johnson", designation: "Data Scientist", photo: "https://via.placeholder.com/100" },
    { name: "Alice Johnson", designation: "Data Scientist", photo: "https://via.placeholder.com/100" },
    { name: "Bob Lee", designation: "UX Designer", photo: "https://via.placeholder.com/100" },
    { name: "Bob Lee", designation: "UX Designer", photo: "https://via.placeholder.com/100" },
    { name: "Bob Lee", designation: "UX Designer", photo: "https://via.placeholder.com/100" },
    { name: "Bob Lee", designation: "UX Designer", photo: "https://via.placeholder.com/100" },
    { name: "Bob Lee", designation: "UX Designer", photo: "https://via.placeholder.com/100" },
    { name: "Chris Green", designation: "Backend Developer", photo: "https://via.placeholder.com/100" },
    { name: "Chris Green", designation: "Backend Developer", photo: "https://via.placeholder.com/100" },
    { name: "Chris Green", designation: "Backend Developer", photo: "https://via.placeholder.com/100" },
    { name: "Chris Green", designation: "Backend Developer", photo: "https://via.placeholder.com/100" },
    { name: "Chris Green", designation: "Backend Developer", photo: "https://via.placeholder.com/100" }
  ];
  



  // Function to load alumni data based on the selected role
  function loadAlumni(role = "all") {
    const alumniCards = document.getElementById('alumni-cards');
    alumniCards.innerHTML = "";  // Clear existing cards
  
    // Filter alumni by role if selected
    const filteredAlumni = role === "all" ? alumniData : alumniData.filter(alumni => alumni.designation === role);
  
    filteredAlumni.forEach(alumni => {
      const alumniCard = document.createElement('div');
      alumniCard.classList.add('alumni-card');
  
      const photo = document.createElement('img');
      photo.classList.add('alumni-photo');
      photo.src = alumni.photo;
      photo.alt = `${alumni.name}'s photo`;
  
      const name = document.createElement('div');
      name.classList.add('alumni-name');
      name.textContent = alumni.name;
  
      const designation = document.createElement('div');
      designation.classList.add('alumni-designation');
      designation.textContent = alumni.designation;
  
      alumniCard.appendChild(photo);
      alumniCard.appendChild(name);
      alumniCard.appendChild(designation);
      alumniCards.appendChild(alumniCard);
    });
  }
  
  // Load all alumni on page load
  window.onload = () => {
    loadAlumni();
  
    // Add event listener to filter dropdown
    const roleFilter = document.getElementById('role-filter');
    roleFilter.addEventListener('change', (event) => {
      loadAlumni(event.target.value);
    });

    alumni-cards.addEventListener("click", function() {
        // Redirect to a new page with the alumni id (you can use name or another unique identifier here)
        window.location.href = `/alum-prof`;
    });
  };
  
  