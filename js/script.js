/* ==========================================
   EMPOWER BITS - Premium JavaScript
   Advanced interactions and animations
   ========================================== */

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initNavbar();
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    initStatsCounter();
    initTerminalQA();
});


/* ---------- Page Loader ---------- */
function initLoader() {
    const loader = document.getElementById('loader');

    // Hide loader after animation completes
    setTimeout(function() {
        loader.classList.add('hidden');

        // Enable scrolling
        document.body.style.overflow = 'visible';

        // Trigger initial animations
        triggerHeroAnimations();
    }, 1500);

    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';
}

function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .reveal-up');
    heroElements.forEach(function(element, index) {
        setTimeout(function() {
            element.classList.add('visible');
        }, index * 100);
    });
}


/* ---------- Navbar ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}


/* ---------- Mobile Navigation ---------- */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}


/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up');

    // Skip hero elements (they're handled by loader)
    const nonHeroReveals = Array.from(reveals).filter(function(el) {
        return !el.closest('.hero');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Stagger animation for multiple elements
                const parent = entry.target.parentElement;
                const siblings = parent.querySelectorAll('.reveal-up');
                const index = Array.from(siblings).indexOf(entry.target);

                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    nonHeroReveals.forEach(function(element) {
        observer.observe(element);
    });
}


/* ---------- Stats Counter ---------- */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (animated) return;

        stats.forEach(function(stat) {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(target * easeOutQuart);

                stat.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            }

            requestAnimationFrame(updateCount);
        });

        animated = true;
    }

    // Observe stats section
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(heroStats);
}


/* ---------- Magnetic Buttons ---------- */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    // Only on desktop
    if (window.innerWidth <= 1024) return;

    magneticElements.forEach(function(element) {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
        });

        element.addEventListener('mouseleave', function() {
            element.style.transform = 'translate(0, 0)';
        });
    });
}


function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '1rem 2rem',
        borderRadius: '12px',
        fontSize: '0.9375rem',
        fontWeight: '500',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease forwards',
        background: type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: '#fff',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
    });

    document.body.appendChild(notification);

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = '@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
        document.head.appendChild(style);
    }

    // Auto remove
    setTimeout(function() {
        notification.style.animation = 'slideInRight 0.3s ease reverse forwards';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 4000);
}




/* ---------- Chat Q&A ---------- */
function initTerminalQA() {
    var chatWindow = document.getElementById('chatQA');
    if (!chatWindow) return;

    var chatBody = document.getElementById('chatBody');
    var buttons = chatWindow.querySelectorAll('.chat-q-btn');
    var chatInput = document.getElementById('chatInput');
    var chatSendBtn = document.getElementById('chatSendBtn');
    var isTyping = false;

    var qaData = [
        {
            keywords: ['service', 'offer', 'do you do', 'what do you', 'help with'],
            answer: 'We build custom web applications, mobile apps, AI-powered solutions, and stunning UI/UX designs. From concept to deployment, we handle it all.'
        },
        {
            keywords: ['tech', 'stack', 'technology', 'framework', 'language', 'tools', 'react', 'node'],
            answer: 'React, Next.js, Node.js, Python, PostgreSQL, AWS, and more. We pick the best tools for each project to ensure performance and scalability.'
        },
        {
            keywords: ['process', 'approach', 'how do you work', 'workflow', 'steps', 'methodology'],
            answer: 'We follow a 4-step approach: Strategy, Design, Develop, and Launch. Each phase includes close collaboration and iterative feedback.'
        },
        {
            keywords: ['why', 'choose', 'different', 'better', 'special', 'unique', 'stand out'],
            answer: '6+ years of experience, 50+ projects delivered, and 98% client satisfaction. We treat every project as our own and deliver nothing less than excellence.'
        },
        {
            keywords: ['long', 'time', 'duration', 'timeline', 'deadline', 'fast', 'quick', 'weeks', 'months'],
            answer: 'Timelines vary by scope. A typical website takes 4-6 weeks, while complex apps may take 3-6 months. We always provide a clear timeline before starting.'
        },
        {
            keywords: ['support', 'after', 'launch', 'maintain', 'maintenance', 'update', 'post', 'ongoing'],
            answer: 'Absolutely! We provide ongoing maintenance, performance monitoring, and feature updates. Our team is available 24/7 to keep your product running smoothly.'
        },
        {
            keywords: ['price', 'cost', 'budget', 'charge', 'rate', 'expensive', 'cheap', 'affordable', 'pay', 'money', 'quote'],
            answer: 'Our pricing depends on project scope and complexity. We offer competitive rates and flexible packages. Reach out through our contact form for a free quote!'
        },
        {
            keywords: ['contact', 'reach', 'email', 'call', 'phone', 'touch', 'talk', 'meet', 'discuss'],
            answer: 'You can reach us at contact@empowerbits.com or use the contact form on this page. We typically respond within 24 hours!'
        },
        {
            keywords: ['team', 'people', 'who', 'size', 'members', 'developer', 'designer', 'employee'],
            answer: 'We are a tight-knit team of skilled developers, designers, and strategists. Everyone brings deep expertise and a passion for building great digital products.'
        },
        {
            keywords: ['hire', 'hiring', 'career', 'job', 'work with you', 'join', 'position', 'opening', 'apply'],
            answer: 'We are always looking for talented people! Check out our Careers page for open positions. We offer remote-first work, flexible hours, and a great team culture.'
        },
        {
            keywords: ['hello', 'hi', 'hey', 'greet', 'good morning', 'good evening', 'sup', 'yo'],
            answer: 'Hey there! Great to have you here. Feel free to ask anything about our services, process, or team. We are happy to help!'
        }
    ];

    var defaultAnswer = "That's a great question! We'd love to discuss it in detail. Please reach out via our contact form or email us at contact@empowerbits.com and we'll get back to you shortly.";

    // Predefined button questions mapped to qaData indexes
    var buttonMap = [0, 1, 2, 3, 4, 5];

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addMessage(text, type) {
        var msg = document.createElement('div');
        msg.className = 'chat-message ' + type;
        var avatarHTML = type === 'reply' ? '<div class="chat-msg-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>' : '';
        msg.innerHTML = avatarHTML + '<div class="chat-bubble">' + text + '</div>';
        chatBody.appendChild(msg);
        scrollToBottom();
        return msg;
    }

    function showTypingDots() {
        var msg = document.createElement('div');
        msg.className = 'chat-message reply';
        msg.id = 'typingIndicator';
        msg.innerHTML = '<div class="chat-msg-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><div class="chat-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
        chatBody.appendChild(msg);
        scrollToBottom();
    }

    function removeTypingDots() {
        var indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    function setLocked(locked) {
        isTyping = locked;
        buttons.forEach(function(btn) { btn.disabled = locked; });
        if (chatInput) chatInput.disabled = locked;
        if (chatSendBtn) chatSendBtn.disabled = locked;
    }

    function findAnswer(text) {
        var lower = text.toLowerCase();
        for (var i = 0; i < qaData.length; i++) {
            for (var j = 0; j < qaData[i].keywords.length; j++) {
                if (lower.indexOf(qaData[i].keywords[j]) !== -1) {
                    return qaData[i].answer;
                }
            }
        }
        return defaultAnswer;
    }

    function sendReply(questionText, answer) {
        if (isTyping) return;
        setLocked(true);

        addMessage(questionText, 'sent');

        setTimeout(function() {
            showTypingDots();
            setTimeout(function() {
                removeTypingDots();
                addMessage(answer, 'reply');
                setLocked(false);
            }, 1200);
        }, 400);
    }

    // Predefined button clicks
    buttons.forEach(function(btn, i) {
        btn.addEventListener('click', function() {
            var idx = buttonMap[i];
            sendReply(btn.textContent, qaData[idx].answer);
        });
    });

    // Text input handling
    function handleUserInput() {
        var text = chatInput.value.trim();
        if (!text || isTyping) return;

        chatInput.value = '';
        var answer = findAnswer(text);
        sendReply(text, answer);
    }

    if (chatInput) {
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleUserInput();
            }
        });
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', function() {
            handleUserInput();
        });
    }
}


/* ---------- Tilt Effect for Cards (Optional Enhancement) ---------- */
function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .project-card, .visual-card');

    if (window.innerWidth <= 1024) return;

    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}


/* ---------- Active Navigation Link ---------- */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// Initialize active nav link
document.addEventListener('DOMContentLoaded', initActiveNavLink);


/* ---------- Text Scramble Effect (Optional) ---------- */
class TextScramble {
    constructor(element) {
        this.element = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.element.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += '<span class="scramble">' + char + '</span>';
            } else {
                output += from;
            }
        }

        this.element.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}


/* ---------- Utility: Throttle ---------- */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}


/* ---------- Careers: Application Form ---------- */
function initApplyForm() {
    var form = document.getElementById('applyForm');
    if (!form) return;

    // === Custom Select Dropdowns ===
    var selects = form.querySelectorAll('select');
    selects.forEach(function(select) {
        var group = select.closest('.form-group');
        if (!group) return;

        var label = group.querySelector('label');
        var labelText = label ? label.textContent : '';

        // Build wrapper
        var wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';

        // Check if select already has a value
        var currentVal = select.value;
        var currentText = '';
        if (currentVal) {
            var selectedOpt = select.querySelector('option[value="' + currentVal + '"]');
            currentText = selectedOpt ? selectedOpt.textContent : '';
            wrapper.classList.add('has-value');
        }

        // Trigger button
        var trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.setAttribute('tabindex', '0');
        trigger.innerHTML =
            '<span class="select-text' + (currentText ? '' : ' placeholder') + '">' + (currentText || '') + '</span>' +
            '<svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';

        // Options panel
        var optionsPanel = document.createElement('div');
        optionsPanel.className = 'custom-select-options';

        var options = select.querySelectorAll('option');
        options.forEach(function(opt) {
            if (!opt.value || opt.disabled) return;
            var item = document.createElement('div');
            item.className = 'custom-select-option' + (opt.value === currentVal ? ' selected' : '');
            item.textContent = opt.textContent;
            item.setAttribute('data-value', opt.value);

            item.addEventListener('click', function() {
                select.value = opt.value;
                select.dispatchEvent(new Event('change'));
                trigger.querySelector('.select-text').textContent = opt.textContent;
                trigger.querySelector('.select-text').classList.remove('placeholder');
                wrapper.classList.add('has-value');
                wrapper.classList.remove('open');
                // Update selected state
                optionsPanel.querySelectorAll('.custom-select-option').forEach(function(o) {
                    o.classList.remove('selected');
                });
                item.classList.add('selected');
            });

            optionsPanel.appendChild(item);
        });

        // Toggle open
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            // Close others
            document.querySelectorAll('.custom-select-wrapper.open').forEach(function(w) {
                if (w !== wrapper) w.classList.remove('open');
            });
            wrapper.classList.toggle('open');
        });

        // Keyboard
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger.click();
            }
        });

        // Insert into DOM
        group.parentNode.insertBefore(wrapper, group);
        wrapper.appendChild(trigger);
        wrapper.appendChild(optionsPanel);
        if (label) {
            var newLabel = document.createElement('label');
            newLabel.textContent = labelText;
            wrapper.appendChild(newLabel);
        }

        // Hide original group
        group.style.display = 'none';
    });

    // Close on outside click
    document.addEventListener('click', function() {
        document.querySelectorAll('.custom-select-wrapper.open').forEach(function(w) {
            w.classList.remove('open');
        });
    });

    // === Custom File Upload Handling ===
    var fileUploadZone = document.getElementById('fileUploadZone');
    var fileInput = document.getElementById('applicantResume');
    var fileUploadContent = document.getElementById('fileUploadContent');
    var fileSelected = document.getElementById('fileSelected');
    var fileSelectedName = document.getElementById('fileSelectedName');
    var fileRemoveBtn = document.getElementById('fileRemoveBtn');

    if (fileUploadZone && fileInput) {
        fileUploadZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            fileUploadZone.classList.add('dragover');
        });

        fileUploadZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            fileUploadZone.classList.remove('dragover');
        });

        fileUploadZone.addEventListener('drop', function(e) {
            e.preventDefault();
            fileUploadZone.classList.remove('dragover');
            var files = e.dataTransfer.files;
            if (files.length > 0) {
                var file = files[0];
                if (validateFile(file)) {
                    fileInput._customFile = file;
                    showSelectedFile(file.name);
                }
            }
        });

        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                var file = fileInput.files[0];
                if (validateFile(file)) {
                    fileInput._customFile = null;
                    showSelectedFile(file.name);
                } else {
                    fileInput.value = '';
                }
            }
        });

        if (fileRemoveBtn) {
            fileRemoveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                fileInput.value = '';
                fileInput._customFile = null;
                fileUploadContent.style.display = '';
                fileSelected.style.display = 'none';
            });
        }

        function showSelectedFile(name) {
            fileSelectedName.textContent = name;
            fileUploadContent.style.display = 'none';
            fileSelected.style.display = 'flex';
        }

        function validateFile(file) {
            var allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            var maxSize = 5 * 1024 * 1024;

            if (allowedTypes.indexOf(file.type) === -1) {
                showNotification('Please upload a PDF, DOC, or DOCX file.', 'error');
                return false;
            }
            if (file.size > maxSize) {
                showNotification('File size must be under 5MB.', 'error');
                return false;
            }
            return true;
        }
    }

    // === Form Submission ===
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var formData = {
            name: getValue('applicantName'),
            email: getValue('applicantEmail'),
            phone: getValue('applicantPhone'),
            dob: getValue('applicantDOB'),
            city: getValue('applicantCity'),
            linkedin: getValue('applicantLinkedIn'),
            position: getValue('applicantPosition'),
            source: getValue('applicantSource'),
            notice: getValue('applicantNotice'),
            experience: getValue('applicantExperience'),
            company: getValue('applicantCompany'),
            jobTitle: getValue('applicantJobTitle'),
            duration: getValue('applicantDuration'),
            responsibilities: getValue('applicantResponsibilities'),
            qualification: getValue('applicantQualification'),
            institution: getValue('applicantInstitution'),
            major: getValue('applicantMajor'),
            currentSalary: getValue('applicantCurrentSalary'),
            expectedSalary: getValue('applicantExpectedSalary'),
            cover: getValue('applicantCover')
        };

        var resumeFile = null;
        if (fileInput) {
            resumeFile = fileInput._customFile || (fileInput.files.length > 0 ? fileInput.files[0] : null);
        }

        // Validation
        if (!formData.name.trim()) {
            showNotification('Please enter your full name.', 'error');
            focusField('applicantName');
            return;
        }
        if (!formData.email.trim()) {
            showNotification('Please enter your email address.', 'error');
            focusField('applicantEmail');
            return;
        }
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            focusField('applicantEmail');
            return;
        }
        if (!formData.phone.trim()) {
            showNotification('Please enter your phone number.', 'error');
            focusField('applicantPhone');
            return;
        }
        if (!formData.position) {
            showNotification('Please select a position.', 'error');
            focusField('applicantPosition');
            return;
        }
        if (!resumeFile) {
            showNotification('Please upload your CV/Resume.', 'error');
            if (fileUploadZone) fileUploadZone.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Show loading state
        var submitBtn = form.querySelector('.btn-submit');
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text">Submitting...</span>';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual endpoint)
        setTimeout(function() {
            showNotification('Application submitted successfully! We\'ll review it and get back to you soon.', 'success');
            form.reset();

            // Reset file upload UI
            if (fileUploadContent) fileUploadContent.style.display = '';
            if (fileSelected) fileSelected.style.display = 'none';
            if (fileInput) fileInput._customFile = null;

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    function getValue(id) {
        var el = document.getElementById(id);
        return el ? el.value : '';
    }

    function focusField(id) {
        var el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(function() { el.focus(); }, 400);
        }
    }
}

// Initialize apply form on DOM ready
document.addEventListener('DOMContentLoaded', initApplyForm);


/* ---------- Utility: Debounce ---------- */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}
