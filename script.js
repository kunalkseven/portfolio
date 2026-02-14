/* ========================================
   KUNAL KUMAR — PORTFOLIO INTERACTIONS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ===== SCROLL ANIMATIONS (Intersection Observer) =====
  const animateItems = document.querySelectorAll('.animate-item');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  animateItems.forEach(item => observer.observe(item));

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar shadow on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility
    if (scrollY > 400) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }

    // Active nav link highlighting
    updateActiveNavLink();
  });

  // Scroll to top
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== ACTIVE NAV LINK =====
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ===== MOBILE NAVIGATION =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);

  function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileNav);
  overlay.addEventListener('click', toggleMobileNav);

  // Close mobile nav when clicking a link
  navLinks.querySelectorAll('.nav-link, .nav-resume-btn').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleMobileNav();
      }
    });
  });

  // ===== EXPERIENCE TABS =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update active tab button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active tab panel
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetTab) {
          panel.classList.add('active');
        }
      });
    });
  });

  // ===== TYPING EFFECT FOR HERO TAGLINE =====
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const originalText = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    tagline.style.transform = 'none';

    // Create cursor
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    tagline.appendChild(cursor);

    let charIndex = 0;
    const typeSpeed = 60;

    function typeWriter() {
      if (charIndex < originalText.length) {
        tagline.insertBefore(
          document.createTextNode(originalText.charAt(charIndex)),
          cursor
        );
        charIndex++;
        setTimeout(typeWriter, typeSpeed);
      } else {
        // Remove cursor after a delay
        setTimeout(() => {
          cursor.style.animation = 'blink 1s step-end infinite';
        }, 500);
      }
    }

    // Start typing after hero section is visible
    setTimeout(typeWriter, 800);
  }

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== CODE BACKGROUND ANIMATION =====
  createCodeBackground();

  // ===== PROJECT CARD TILT EFFECT =====
  const projectCards = document.querySelectorAll('.project-card-inner');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ===== SKILL TAG RIPPLE EFFECT =====
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-2px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// ===== CODE BACKGROUND LINES =====
function createCodeBackground() {
  const bgContainer = document.createElement('div');
  bgContainer.classList.add('bg-code-lines');
  document.body.prepend(bgContainer);

  const codeSnippets = [
    'const app = express();',
    'import React from "react";',
    'function handleClick() {',
    'const [state, setState] = useState();',
    'export default App;',
    'useEffect(() => {}, []);',
    'return <Component />;',
    'async function fetchData() {',
    'npm install react-router',
    'git commit -m "feat: add new feature"',
    'const router = useRouter();',
    'interface Props { }',
    'dispatch(updateAction());',
    'console.log("Hello World");',
    'border-radius: 8px;',
    'display: flex;',
    'animation: fadeIn 0.3s ease;',
    'await api.get("/users");',
  ];

  for (let i = 0; i < 15; i++) {
    const span = document.createElement('span');
    span.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDelay = `${Math.random() * 20}s`;
    span.style.animationDuration = `${15 + Math.random() * 15}s`;
    span.style.fontSize = `${0.6 + Math.random() * 0.3}rem`;
    bgContainer.appendChild(span);
  }
}
