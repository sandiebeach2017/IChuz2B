export const layout = (title: string, content: string, activePage: string = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Compassionate Consulting</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'Lato', sans-serif; }
    .font-playfair { font-family: 'Playfair Display', serif; }
    .gradient-hero { background: linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 50%, #4a9eda 100%); }
    .gradient-care { background: linear-gradient(135deg, #1a3a5c 0%, #16697a 100%); }
    .gradient-career { background: linear-gradient(135deg, #2d3561 0%, #c05c7e 100%); }
    .gradient-self { background: linear-gradient(135deg, #134e4a 0%, #0f766e 100%); }
    .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .nav-link { transition: color 0.2s ease, border-bottom-color 0.2s ease; }
    .tab-active { border-bottom: 3px solid #2d6a9f; color: #2d6a9f; font-weight: 700; }
    .tab-btn { transition: all 0.2s ease; cursor: pointer; }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .pill-tag { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
    .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
    .accordion-content.open { max-height: 2000px; }
    .med-row:nth-child(even) { background: #f8fafc; }
    .schedule-card { border-left: 4px solid; }
    .schedule-morning { border-color: #f59e0b; }
    .schedule-afternoon { border-color: #3b82f6; }
    .schedule-evening { border-color: #8b5cf6; }
    .modal { display: none; position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,0.6); }
    .modal.open { display: flex; align-items: center; justify-content: center; }
    @media (max-width: 768px) {
      .mobile-menu { display: none; }
      .mobile-menu.open { display: block; }
    }
    .hero-wave { position: absolute; bottom: -2px; left: 0; width: 100%; }
    .scroll-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .scroll-reveal.visible { opacity: 1; transform: translateY(0); }
    .sticky-nav { position: sticky; top: 0; z-index: 100; }
    .progress-bar { height: 3px; background: linear-gradient(90deg, #2d6a9f, #4a9eda); }
    .comparison-added { background: #dcfce7; }
    .comparison-removed { background: #fee2e2; }
    .comparison-same { background: #f1f5f9; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800">

  <!-- Progress bar -->
  <div id="progress-bar" class="progress-bar fixed top-0 left-0 z-[200] w-0" style="transition: width 0.1s;"></div>

  <!-- Navigation -->
  <nav class="sticky-nav bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-bold text-lg">CC</div>
          <div>
            <span class="font-playfair font-bold text-gray-800 text-lg leading-tight block">Compassionate</span>
            <span class="text-xs text-blue-600 font-semibold tracking-wide uppercase">Consulting</span>
          </div>
        </a>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center space-x-1">
          <a href="/" class="nav-link px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-blue-700 hover:bg-blue-50 ${activePage === 'home' ? 'text-blue-700 bg-blue-50' : ''}">
            <i class="fas fa-home mr-1"></i> Home
          </a>
          <a href="/caregiving" class="nav-link px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-teal-700 hover:bg-teal-50 ${activePage === 'caregiving' ? 'text-teal-700 bg-teal-50' : ''}">
            <i class="fas fa-heart mr-1"></i> Caregiving
          </a>
          <a href="/career" class="nav-link px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-purple-700 hover:bg-purple-50 ${activePage === 'career' ? 'text-purple-700 bg-purple-50' : ''}">
            <i class="fas fa-briefcase mr-1"></i> Career Pivoting
          </a>
          <a href="/selfcare" class="nav-link px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 ${activePage === 'selfcare' ? 'text-emerald-700 bg-emerald-50' : ''}">
            <i class="fas fa-spa mr-1"></i> Self-Care
          </a>
          <a href="/media" class="nav-link px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 ${activePage === 'media' ? 'text-red-600 bg-red-50' : ''}">
            <i class="fab fa-youtube mr-1"></i> Media
          </a>
          <a href="#contact" class="ml-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors">
            <i class="fas fa-envelope mr-1"></i> Contact
          </a>
        </div>

        <!-- Mobile menu button -->
        <button id="mobile-btn" class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>

      <!-- Mobile nav -->
      <div id="mobile-menu" class="mobile-menu md:hidden pb-4">
        <div class="flex flex-col space-y-1 border-t pt-3">
          <a href="/" class="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"><i class="fas fa-home mr-2 w-4"></i>Home</a>
          <a href="/caregiving" class="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"><i class="fas fa-heart mr-2 w-4 text-teal-600"></i>Caregiving</a>
          <a href="/career" class="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"><i class="fas fa-briefcase mr-2 w-4 text-purple-600"></i>Career Pivoting</a>
          <a href="/selfcare" class="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"><i class="fas fa-spa mr-2 w-4 text-emerald-600"></i>Self-Care</a>
          <a href="/media" class="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"><i class="fab fa-youtube mr-2 w-4 text-red-600"></i>Media</a>
          <a href="#contact" class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg text-center mt-2">Contact</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main content -->
  <main>
    ${content}
  </main>

  <!-- Footer -->
  <footer id="contact" class="bg-gray-900 text-gray-300 mt-20">
    <div class="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div class="md:col-span-2">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-bold">CC</div>
          <div>
            <span class="font-playfair font-bold text-white text-lg block">Compassionate Consulting</span>
            <span class="text-xs text-blue-400 tracking-wide uppercase">Caregiving · Career · Self-Care</span>
          </div>
        </div>
        <p class="text-gray-400 text-sm leading-relaxed mb-5">Empowering you with knowledge, tools, and community support across life's most important transitions — caregiving, career changes, and personal wellness.</p>
        <div class="flex space-x-4">
          <a href="#" class="w-9 h-9 rounded-full bg-gray-700 hover:bg-red-600 flex items-center justify-center transition-colors" aria-label="YouTube"><i class="fab fa-youtube text-sm"></i></a>
          <a href="#" class="w-9 h-9 rounded-full bg-gray-700 hover:bg-pink-600 flex items-center justify-center transition-colors" aria-label="Instagram"><i class="fab fa-instagram text-sm"></i></a>
          <a href="#" class="w-9 h-9 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors" aria-label="LinkedIn"><i class="fab fa-linkedin-in text-sm"></i></a>
          <a href="#" class="w-9 h-9 rounded-full bg-gray-700 hover:bg-sky-500 flex items-center justify-center transition-colors" aria-label="Facebook"><i class="fab fa-facebook-f text-sm"></i></a>
        </div>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="/caregiving" class="hover:text-teal-400 transition-colors"><i class="fas fa-chevron-right text-xs mr-1 text-teal-500"></i>Caregiving</a></li>
          <li><a href="/career" class="hover:text-purple-400 transition-colors"><i class="fas fa-chevron-right text-xs mr-1 text-purple-500"></i>Career Pivoting</a></li>
          <li><a href="/selfcare" class="hover:text-emerald-400 transition-colors"><i class="fas fa-chevron-right text-xs mr-1 text-emerald-500"></i>Self-Care</a></li>
          <li><a href="/media" class="hover:text-red-400 transition-colors"><i class="fas fa-chevron-right text-xs mr-1 text-red-500"></i>Videos & Media</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
        <div class="space-y-3 text-sm">
          <p class="flex items-center gap-2"><i class="fas fa-envelope text-blue-400 w-4"></i><a href="mailto:hello@compassionateconsulting.com" class="hover:text-white transition-colors">hello@compassionateconsulting.com</a></p>
          <p class="flex items-center gap-2"><i class="fab fa-linkedin text-blue-400 w-4"></i><a href="#" class="hover:text-white transition-colors">LinkedIn Articles</a></p>
          <p class="flex items-center gap-2"><i class="fab fa-youtube text-red-400 w-4"></i><a href="#" class="hover:text-white transition-colors">YouTube Channel</a></p>
        </div>
        <div class="mt-5 p-3 bg-gray-800 rounded-lg text-xs text-gray-500">
          <i class="fas fa-shield-alt text-yellow-500 mr-1"></i>
          <strong class="text-gray-400">Disclaimer:</strong> Content is for informational purposes only. Always consult qualified medical, legal, or financial professionals for advice.
        </div>
      </div>
    </div>
    <div class="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
      © ${new Date().getFullYear()} Compassionate Consulting. All rights reserved. | Built with care for caregivers.
    </div>
  </footer>

  <script>
    // Mobile menu toggle
    document.getElementById('mobile-btn')?.addEventListener('click', () => {
      document.getElementById('mobile-menu')?.classList.toggle('open');
    });

    // Reading progress bar
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      document.getElementById('progress-bar').style.width = scrolled + '%';
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // Accordion
    document.querySelectorAll('.accordion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.acc-icon');
        content.classList.toggle('open');
        if (icon) icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : '';
      });
    });
  </script>
</body>
</html>`
