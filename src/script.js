// Darkmode

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }
  });
}
// Projects Data - Voeg hier eenvoudig nieuwe projecten toe
const projects = [
  {
    id: 1,
    title: 'Spotify',
    description: 'Een spotify website met een persoonlijk tintje',
    category: 'Web Development',
    tags: ['JavaScript', 'CSS', 'Html'],
    image: './src/img/Spotify.png',
    link: './src/WAFS.html',
    github: null
  },
  {
    id: 2,
    title: 'Mobile App Design',
    description: 'Een gebruiksvriendelijke mobiele app voor het reserveren van een vergaderruimte.',
    category: 'App Development',
    tags: ['Figma', 'UI/UX', 'Mobile'],
    image: './src/img/Login_vergaderapp.png',
    link: './src/Vergaderzaal.html',
    github: null
  },
   {
    id: 3,
    title: 'Hackathon Project',
    description: 'Een gebruiksvriendelijke mobiele app voor het reserveren van een vergaderruimte.',
    category: 'App Development',
    tags: ['Figma', 'UI/UX', 'Mobile', 'HTML', 'CSS', 'JavaScript'],
    image: './src/img/Schreenshot_hackathon_inlogscherm.png',
    link: './src/Hackathon.html',
    github: null
  }
];

// Initialize Lucide Icons
function initIcons() {
  lucide.createIcons();
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');

  if (!mobileMenuBtn || !mobileNav || !menuIcon || !closeIcon) return;

  const mobileLinks = mobileNav.querySelectorAll('a');

  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');

    if (mobileNav.classList.contains('active')) {
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    } else {
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  });

  // Close mobile menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    });
  });
}

// Render Projects
function renderProjects(filter = 'All') {
  const projectsGrid = document.getElementById('projectsGrid');
  const noProjects = document.getElementById('noProjects');

  if (!projectsGrid || !noProjects) return;

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter(project => project.category === filter);

  if (filteredProjects.length === 0) {
    projectsGrid.innerHTML = '';
    noProjects.style.display = 'block';
    return;
  }

  noProjects.style.display = 'none';

  projectsGrid.innerHTML = filteredProjects.map(project => `
    <div class="project-card" data-link="${project.link || ''}">
      <div class="project-image-wrapper">
        <img 
          src="${project.image || 'https://via.placeholder.com/600x400?text=Project'}" 
          alt="${project.title}" 
          class="project-image"
        >
        <div class="project-category">${project.category}</div>
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          ${project.link ? `
            <a href="${project.link}" class="project-link" onclick="event.stopPropagation()">
              <i data-lucide="external-link"></i>
              <span>Bekijk project</span>
            </a>
          ` : ''}
          ${project.github ? `
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link" onclick="event.stopPropagation()">
              <i data-lucide="github"></i>
              <span>Code</span>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Re-initialize icons for newly added elements
  lucide.createIcons();

  // Klik op hele kaart
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.dataset.link;
      if (link) {
        window.location.href = link;
      }
    });
  });
}

// Filter Projects
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Filter projects
      const category = button.getAttribute('data-category');
      renderProjects(category);
    });
  });
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name')?.value || '',
      email: document.getElementById('email')?.value || '',
      message: document.getElementById('message')?.value || ''
    };

    // Hier kun je later je eigen form handling logica toevoegen
    console.log('Form submitted:', formData);
    alert('Bedankt voor je bericht! (Dit is een demo - voeg je eigen form handling toe)');

    // Reset form
    contactForm.reset();
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initIcons();
  initMobileMenu();
  renderProjects();
  initProjectFilter();
  initContactForm();
});