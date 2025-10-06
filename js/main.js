import { personalInfo, socialLinks } from './personalInfo.js';
import { projects } from './projects.js';
import { skills } from './skills.js';
import { timeline } from './timeline.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadPersonalInfo();
    loadSkills();
    loadProjects();
    loadTimeline();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initScrollTop();
});

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

function loadPersonalInfo() {
    document.getElementById('heroName').textContent = personalInfo.name;
    document.getElementById('heroBio').textContent = personalInfo.bio;
    document.getElementById('footerName').textContent = personalInfo.name;

    const profileImage = document.getElementById('profileImage');
    profileImage.src = `/assets/${personalInfo.image}`;
    profileImage.alt = personalInfo.name;

    typeText(personalInfo.title, 'typingText');

    const socialLinksContainer = document.getElementById('socialLinks');
    const contactSocial = document.getElementById('contactSocial');
    const footerSocial = document.getElementById('footerSocial');

    socialLinks.forEach(link => {
        const icon = getIconClass(link.icon);
        const socialLink = createSocialLink(link.url, icon, link.name);
        socialLinksContainer.appendChild(socialLink.cloneNode(true));
        contactSocial.appendChild(socialLink.cloneNode(true));
        footerSocial.appendChild(socialLink.cloneNode(true));
    });

    document.getElementById('contactEmail').textContent = personalInfo.email;
    document.getElementById('contactPhone').textContent = personalInfo.phone;
    document.getElementById('contactLocation').textContent = personalInfo.location;

    const downloadButtons = [document.getElementById('downloadCV'), document.getElementById('downloadCVHero')];
    downloadButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                if (personalInfo.website !== '#') {
                    window.open(personalInfo.website, '_blank');
                } else {
                    alert('CV non disponible pour le moment');
                }
            });
        }
    });
}

function typeText(text, elementId) {
    const element = document.getElementById(elementId);
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    type();
}

function createSocialLink(url, iconClass, name) {
    const link = document.createElement('a');
    link.href = url.includes('@') ? `mailto:${url}` : url;
    link.className = 'social-link';
    link.target = url.includes('@') ? '_self' : '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', name);

    const icon = document.createElement('i');
    icon.className = iconClass;
    link.appendChild(icon);

    return link;
}

function getIconClass(iconName) {
    const iconMap = {
        'FaGithub': 'fab fa-github',
        'FaLinkedin': 'fab fa-linkedin',
        'FaTwitter': 'fab fa-twitter',
        'FaEnvelope': 'fas fa-envelope',
        'FaGlobe': 'fas fa-globe'
    };
    return iconMap[iconName] || 'fas fa-link';
}

function loadSkills() {
    const container = document.getElementById('skillsContainer');

    const categoryNames = {
        programming: 'Langages de Programmation',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Outils'
    };

    Object.entries(skills).forEach(([category, skillsList]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';

        const title = document.createElement('h3');
        title.textContent = categoryNames[category] || category;
        categoryDiv.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'skills-grid';

        skillsList.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';

            const header = document.createElement('div');
            header.className = 'skill-header';

            const name = document.createElement('span');
            name.className = 'skill-name';
            name.textContent = skill.name;

            const level = document.createElement('span');
            level.className = 'skill-level';
            level.textContent = `${skill.level}%`;

            header.appendChild(name);
            header.appendChild(level);

            const barContainer = document.createElement('div');
            barContainer.className = 'skill-bar';

            const progress = document.createElement('div');
            progress.className = 'skill-progress';
            progress.dataset.level = skill.level;

            barContainer.appendChild(progress);
            skillItem.appendChild(header);
            skillItem.appendChild(barContainer);
            grid.appendChild(skillItem);
        });

        categoryDiv.appendChild(grid);
        container.appendChild(categoryDiv);
    });
}

function loadProjects() {
    const grid = document.getElementById('projectsGrid');

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.transitionDelay = `${index * 0.1}s`;

        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.title;
        img.className = 'project-image';
        img.onerror = () => {
            img.src = 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600';
        };

        const content = document.createElement('div');
        content.className = 'project-content';

        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = project.title;

        const description = document.createElement('p');
        description.className = 'project-description';
        description.textContent = project.description;

        const tags = document.createElement('div');
        tags.className = 'project-tags';
        project.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'project-tag';
            tagSpan.textContent = tag;
            tags.appendChild(tagSpan);
        });

        const links = document.createElement('div');
        links.className = 'project-links';

        if (project.githubUrl) {
            const githubLink = document.createElement('a');
            githubLink.href = project.githubUrl;
            githubLink.className = 'project-link';
            githubLink.target = '_blank';
            githubLink.rel = 'noopener noreferrer';
            githubLink.innerHTML = '<i class="fab fa-github"></i> GitHub';
            links.appendChild(githubLink);
        }

        if (project.liveUrl) {
            const liveLink = document.createElement('a');
            liveLink.href = project.liveUrl;
            liveLink.className = 'project-link';
            liveLink.target = '_blank';
            liveLink.rel = 'noopener noreferrer';
            liveLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Démo';
            links.appendChild(liveLink);
        }

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(tags);
        content.appendChild(links);

        card.appendChild(img);
        card.appendChild(content);
        grid.appendChild(card);
    });
}

function loadTimeline() {
    const container = document.getElementById('timelineContainer');

    timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.transitionDelay = `${index * 0.2}s`;

        const icon = document.createElement('div');
        icon.className = 'timeline-icon';
        icon.innerHTML = `<i class="fas fa-graduation-cap"></i>`;

        const content = document.createElement('div');
        content.className = 'timeline-content';

        const period = document.createElement('div');
        period.className = 'timeline-period';
        period.textContent = item.period;

        const title = document.createElement('h3');
        title.className = 'timeline-title';
        title.textContent = item.title;

        const institution = document.createElement('div');
        institution.className = 'timeline-institution';
        institution.textContent = item.institution;

        const location = document.createElement('div');
        location.className = 'timeline-location';
        location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${item.location}`;

        const description = document.createElement('p');
        description.className = 'timeline-description';
        description.textContent = item.description;

        content.appendChild(period);
        content.appendChild(title);
        content.appendChild(institution);
        content.appendChild(location);
        content.appendChild(description);

        timelineItem.appendChild(icon);
        timelineItem.appendChild(content);
        container.appendChild(timelineItem);
    });
}

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px var(--shadow-lg)';
        } else {
            navbar.style.boxShadow = '0 2px 10px var(--shadow)';
        }

        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const level = bar.dataset.level;
                        setTimeout(() => {
                            bar.style.width = `${level}%`;
                        }, 200);
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-form').forEach(el => {
        observer.observe(el);
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:${personalInfo.email}?subject=Message de ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${email}`;
        window.location.href = mailtoLink;

        form.reset();
    });
}

function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
