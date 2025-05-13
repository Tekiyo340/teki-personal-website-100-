
        // Mobile navigation toggle
        const menuBtn = document.getElementById('menu-btn');
        const navMenu = document.getElementById('nav-menu');

        menuBtn.addEventListener('click', toggleMenu);
        menuBtn.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        function toggleMenu() {
            menuBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        }

        // Highlight active nav link on click
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                // If mobile menu is open, close it after selecting
                if (navMenu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });

        // Typing effect text
        const animatedText = document.querySelector('.animated-text');
        const phrases = [
            "Web Developer",
            "Front-end Developer",
            "Animation Enthusiast",
            "SEO Specialist",
            "UX/UI Lover"
        ];
        let phraseIndex = 0;
        let letterIndex = 0;
        let typingSpeed = 120;
        let deletingSpeed = 60;
        let delayBetweenPhrases = 1600;
        let isDeleting = false;

        function type() {
            const current = phraseIndex % phrases.length;
            const fullText = phrases[current];

            if (isDeleting) {
                animatedText.textContent = fullText.substring(0, letterIndex - 1);
                letterIndex--;
                if (letterIndex === 0) {
                    isDeleting = false;
                    phraseIndex++;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, deletingSpeed);
                }
            } else {
                animatedText.textContent = fullText.substring(0, letterIndex + 1);
                letterIndex++;
                if (letterIndex === fullText.length) {
                    isDeleting = true;
                    setTimeout(type, delayBetweenPhrases);
                } else {
                    setTimeout(type, typingSpeed);
                }
            }
        }
        type();

        // Testimonial slider
        const testimonialSlider = document.getElementById('testimonial-slider');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        const testimonialCount = testimonialSlider.children.length;
        let testimonialIndex = 0;

        function showTestimonial(index) {
            testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
        }

        prevBtn.addEventListener('click', () => {
            testimonialIndex = (testimonialIndex - 1 + testimonialCount) % testimonialCount;
            showTestimonial(testimonialIndex);
        });

        nextBtn.addEventListener('click', () => {
            testimonialIndex = (testimonialIndex + 1) % testimonialCount;
            showTestimonial(testimonialIndex);
        });

        // Auto-slide testimonials every 8 seconds
        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonialCount;
            showTestimonial(testimonialIndex);
        }, 8000);

        // Form validation helpers
        function showError(input, message) {
            const errorDiv = input.parentElement.querySelector('.form-error');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            input.classList.add('input-error');
        }

        function clearError(input) {
            const errorDiv = input.parentElement.querySelector('.form-error');
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
            input.classList.remove('input-error');
        }

        // Validate email format simple regex
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            const nameInput = contactForm.elements['name'];
            const emailInput = contactForm.elements['email'];
            const messageInput = contactForm.elements['message'];

            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                valid = false;
            } else {
                clearError(nameInput);
            }

            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                valid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Enter a valid email');
                valid = false;
            } else {
                clearError(emailInput);
            }

            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message cannot be empty');
                valid = false;
            } else {
                clearError(messageInput);
            }

            if (valid) {
                alert(`Thank you, ${nameInput.value.trim()}! Your message has been sent.`);
                contactForm.reset();
            }
        });

        // Login form submission
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            const usernameInput = loginForm.elements['username'];
            const passwordInput = loginForm.elements['password'];

            if (usernameInput.value.trim() === '') {
                showError(usernameInput, 'Username or Email is required');
                valid = false;
            } else {
                clearError(usernameInput);
            }

            if (passwordInput.value.trim() === '') {
                showError(passwordInput, 'Password is required');
                valid = false;
            } else {
                clearError(passwordInput);
            }

            if (valid) {
                alert(`Welcome back, ${usernameInput.value.trim()}! (Demo login)`);
                loginForm.reset();
            }
        });