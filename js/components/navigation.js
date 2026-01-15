/* ============================================
   GOOD DOG SPA - Navigation Component
   ============================================ */

class Navigation {
    constructor() {
        this.header = document.querySelector('.header');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.mobileMenuClose = document.querySelector('.mobile-menu-close');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        this.isMenuOpen = false;
        this.lastScrollY = 0;
        this.scrollThreshold = 100;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.handleScroll();
        this.setActiveLink();
    }
    
    bindEvents() {
        // Mobile menu toggle
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', () => this.closeMobileMenu());
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
                this.closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Dropdown toggles
        this.dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => this.handleDropdown(e));
        });
        
        // Scroll handler
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Smooth scroll for anchor links
        this.navLinks.forEach(link => {
            if (link.getAttribute('href')?.startsWith('#')) {
                link.addEventListener('click', (e) => this.handleAnchorClick(e));
            }
        });
    }
    
    toggleMobileMenu() {
        this.isMenuOpen ? this.closeMobileMenu() : this.openMobileMenu();
    }
    
    openMobileMenu() {
        this.isMenuOpen = true;
        this.mobileMenu?.classList.add('active');
        this.mobileMenuBtn?.classList.add('active');
        this.mobileMenuBtn?.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');
        
        // Focus first menu item for accessibility
        const firstLink = this.mobileMenu?.querySelector('a');
        firstLink?.focus();
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileMenu?.classList.remove('active');
        this.mobileMenuBtn?.classList.remove('active');
        this.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
    }
    
    handleDropdown(e) {
        e.preventDefault();
        const dropdown = e.currentTarget.closest('.dropdown');
        const isExpanded = dropdown?.classList.contains('active');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown.active').forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
        });
        
        // Toggle current dropdown
        dropdown?.classList.toggle('active', !isExpanded);
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for header styling
        if (this.header) {
            if (currentScrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll (optional - uncomment if desired)
            // if (currentScrollY > this.lastScrollY && currentScrollY > this.scrollThreshold) {
            //     this.header.classList.add('hidden');
            // } else {
            //     this.header.classList.remove('hidden');
            // }
        }
        
        this.lastScrollY = currentScrollY;
    }
    
    handleResize() {
        // Close mobile menu on desktop resize
        if (window.innerWidth >= 1024 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }
    
    handleAnchorClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (this.isMenuOpen) {
                this.closeMobileMenu();
            }
            
            // Calculate offset for fixed header
            const headerHeight = this.header?.offsetHeight || 80;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jump
            history.pushState(null, '', href);
        }
    }
    
    setActiveLink() {
        const currentPath = window.location.pathname;
        
        this.navLinks.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            
            // Check if current page matches link
            if (linkPath === currentPath || 
                (currentPath === '/' && linkPath === '/index.html') ||
                (currentPath === '/index.html' && linkPath === '/')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}
