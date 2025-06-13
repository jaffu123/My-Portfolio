document.addEventListener('DOMContentLoaded', () => {
    // Select all sections that have an 'id' attribute
    const sections = document.querySelectorAll('section[id]');
    // Select all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    // Select the mobile menu button and the mobile menu itself
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    // Select the icon inside the mobile menu button
    const mobileMenuIcon = mobileMenuButton.querySelector('i');

    // --- Mobile Menu Functionality ---
    // Toggle mobile menu visibility and icon when the button is clicked
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Toggle the hamburger/close icon
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenuIcon.classList.remove('fa-xmark');
            mobileMenuIcon.classList.add('fa-bars');
        } else {
            mobileMenuIcon.classList.remove('fa-bars');
            mobileMenuIcon.classList.add('fa-xmark');
        }
    });
    
    // Hide mobile menu and reset icon when a link inside it is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.classList.remove('fa-xmark');
            mobileMenuIcon.classList.add('fa-bars');
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    // Add click event listener to all anchor links that start with '#'
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href'); // Get the href attribute of the clicked link

            // If the href is just '#', scroll to the very top of the page
            if (href === '#') {
                e.preventDefault(); // Prevent default jump behavior
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
                return; // Exit the function
            }
            
            // If the href points to an existing section on the page
            const targetElement = document.querySelector(href);
            if (href.length > 1 && targetElement) {
                e.preventDefault(); // Prevent default jump behavior
                // Smooth scroll to the target section
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Active Navigation Link Highlighting (using IntersectionObserver) ---

    // Define the offset (rootMargin) for when a section is considered "active"
    // -100px from the bottom means the intersection will trigger when the top of the section is 100px from the top of the viewport.
    const SECTION_OFFSET = '-100px'; 

    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Check if the section is currently intersecting (visible)
            if (entry.isIntersecting) {
                // Remove 'active' class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Get the ID of the intersecting section
                const currentSectionId = entry.target.getAttribute('id');
                // Find the corresponding navigation link and add the 'active' class
                const correspondingLink = document.querySelector(`.nav-link[href*="#${currentSectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: SECTION_OFFSET // Apply the offset
    });

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initial highlighting on page load (in case a section is already in view)
    // This is handled by the IntersectionObserver itself triggering for initially visible sections.
    // If you need an explicit initial highlight, you could manually call a function here
    // or rely on the observer's initial callback.
});
