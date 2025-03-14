document.addEventListener('DOMContentLoaded', function () {
    // Scroll to top button
    const scrollToTopButton = document.getElementById('scroll-to-top');

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    // Scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dark mode toggle
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    // Check if there's a theme stored in localStorage
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    // Switch theme function
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }

    // Event listener for theme switch
    toggleSwitch.addEventListener('change', switchTheme, false);

    // Profile image click event
    const profileImg = document.getElementById('profile-img');
    profileImg.addEventListener('click', function() {
        this.classList.toggle('rotate');
        if (this.classList.contains('rotate')) {
            this.style.transform = 'rotate(360deg)';
        } else {
            this.style.transform = 'none';
        }
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Skills animation
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        skill.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Generate PDF
    document.getElementById('download-pdf').addEventListener('click', function(e) {
        e.preventDefault();
        window.print();
    });

    // Add animation to sections when they come into view
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // Form validation for contact form (if added later)
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'contact-form') {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Vui lòng điền đầy đủ thông tin');
                return;
            }
            
            // Here you would typically send the form data to a server
            alert('Cảm ơn! Thông tin của bạn đã được gửi.');
            e.target.reset();
        }
    });

    // Initialize current year for copyright
    const currentYear = new Date().getFullYear();
    document.querySelector('footer p').innerHTML = `© ${currentYear} Ngô Anh Khoa | <a href="#" id="download-pdf" class="footer-link">Tải CV (PDF)</a> | <a href="#" class="footer-link">Liên hệ</a>`;

    // Add responsive navigation for mobile
    const createMobileNav = () => {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-nav')) {
            const mobileNav = document.createElement('div');
            mobileNav.className = 'mobile-nav';
            mobileNav.innerHTML = `
                <button class="mobile-nav-toggle">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="mobile-nav-menu">
                    <a href="#about">Giới thiệu</a>
                    <a href="#skills">Kỹ năng</a>
                    <a href="#experience">Kinh nghiệm</a>
                    <a href="#projects">Dự án</a>
                    <a href="#education">Học vấn</a>
                    <a href="#languages">Ngoại ngữ</a>
                    <a href="#certifications">Chứng chỉ</a>
                    <a href="#interests">Sở thích</a>
                </div>
            `;
            document.querySelector('.container').insertBefore(mobileNav, document.querySelector('header'));
            
            // Toggle mobile navigation
            document.querySelector('.mobile-nav-toggle').addEventListener('click', function() {
                document.querySelector('.mobile-nav-menu').classList.toggle('active');
            });
        }
    };

    // Call once on load
    createMobileNav();

    // Update on resize
    window.addEventListener('resize', createMobileNav);
});