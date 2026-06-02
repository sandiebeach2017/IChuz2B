import type { Context } from 'hono'
import { layout } from '../layout'

export const careerPage = (c: Context) => {
  const content = `
  <!-- Hero -->
  <section class="gradient-career text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 70% 30%, white 1px, transparent 1px); background-size: 50px 50px;"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="flex items-center gap-2 mb-4">
        <a href="/" class="text-purple-200 hover:text-white text-sm">Home</a>
        <i class="fas fa-chevron-right text-xs text-purple-300"></i>
        <span class="text-white text-sm font-semibold">Career Pivoting</span>
      </div>
      <div class="max-w-3xl">
        <span class="pill-tag bg-purple-500/40 text-purple-100 mb-4">Career Pivoting</span>
        <h1 class="font-playfair text-5xl font-bold mb-4">Your Career Pivot<br/><span class="text-yellow-300">Starts Here</span></h1>
        <p class="text-purple-100 text-xl leading-relaxed">A career change isn't a setback — it's a strategic move. Get the tools, frameworks, and inspiration to pivot with purpose and land confidently in your next chapter.</p>
      </div>
    </div>
    <svg class="hero-wave" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#f9fafb"/>
    </svg>
  </section>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

    <!-- Pivot Assessment -->
    <section class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
          <i class="fas fa-compass text-purple-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Are You Ready to Pivot?</h2>
          <p class="text-gray-500 text-sm">A quick self-assessment to evaluate your readiness</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div id="quiz-section">
          <p class="text-gray-600 mb-6">Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree):</p>
          <div id="quiz-questions" class="space-y-5">
            ${[
              'I feel unfulfilled or disengaged in my current role.',
              'I have skills that are not being used in my current position.',
              'I have a clear sense of what kind of work would energize me.',
              'I have some financial runway to support a transition period.',
              'I am willing to invest time in learning new skills if needed.',
              'I have a professional network I can leverage in a new field.',
              'I have done research into my target industry or role.',
              'I am comfortable with uncertainty during a transition period.'
            ].map((q, i) => `
              <div class="p-4 bg-gray-50 rounded-xl">
                <div class="text-sm font-semibold text-gray-700 mb-3"><span class="text-purple-500 font-bold mr-2">${i + 1}.</span>${q}</div>
                <div class="flex gap-2 flex-wrap">
                  ${[1,2,3,4,5].map(v => `
                    <label class="cursor-pointer">
                      <input type="radio" name="q${i}" value="${v}" class="sr-only quiz-radio" />
                      <span class="inline-flex w-10 h-10 items-center justify-center rounded-full border-2 border-gray-200 text-sm font-bold text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-all quiz-label">${v}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          <button onclick="calculatePivotScore()" class="mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-colors">
            <i class="fas fa-calculator mr-2"></i>Calculate My Readiness Score
          </button>
        </div>

        <div id="quiz-result" class="hidden text-center py-8">
          <div id="result-circle" class="w-32 h-32 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-playfair font-bold mb-6 shadow-lg"></div>
          <h3 id="result-title" class="font-playfair text-2xl font-bold mb-3"></h3>
          <p id="result-desc" class="text-gray-600 max-w-lg mx-auto mb-6"></p>
          <div id="result-actions" class="flex flex-wrap justify-center gap-3"></div>
          <button onclick="resetQuiz()" class="mt-4 text-sm text-purple-500 hover:underline">Retake Assessment</button>
        </div>
      </div>
    </section>

    <!-- 5-Step Framework -->
    <section class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <i class="fas fa-map-signs text-blue-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">The 5-Step Pivot Framework</h2>
          <p class="text-gray-500 text-sm">A proven roadmap from "I'm done" to "I'm thriving"</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        ${[
          { step: 1, icon: 'fa-search-plus', title: 'Assess', color: 'bg-blue-600', light: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700', desc: 'Honestly evaluate what\'s working, what isn\'t, and what you truly want from your career. Skills inventory, values mapping, and market research.' },
          { step: 2, icon: 'fa-lightbulb', title: 'Envision', color: 'bg-purple-600', light: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700', desc: 'Paint a clear picture of your destination. Define your ideal role, work environment, compensation, and lifestyle. Create your "career north star."' },
          { step: 3, icon: 'fa-bridge', title: 'Bridge', color: 'bg-pink-600', light: 'bg-pink-50 border-pink-200', textColor: 'text-pink-700', desc: 'Identify the gap between where you are and where you\'re going. Map your transferable skills, find skill gaps, and create a learning plan.' },
          { step: 4, icon: 'fa-network-wired', title: 'Network', color: 'bg-orange-600', light: 'bg-orange-50 border-orange-200', textColor: 'text-orange-700', desc: 'Build relationships in your target field. Conduct informational interviews, attend events, refresh your LinkedIn profile, and find mentors.' },
          { step: 5, icon: 'fa-rocket', title: 'Launch', color: 'bg-green-600', light: 'bg-green-50 border-green-200', textColor: 'text-green-700', desc: 'Execute your transition with a strategic job search, tailored applications, interview prep, and smart negotiation. Celebrate every win.' }
        ].map(s => `
          <div class="card-hover ${s.light} border rounded-2xl p-5 text-center scroll-reveal">
            <div class="w-12 h-12 rounded-full ${s.color} text-white flex items-center justify-center mx-auto mb-3">
              <i class="fas ${s.icon}"></i>
            </div>
            <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step ${s.step}</div>
            <h4 class="font-playfair font-bold text-xl ${s.textColor} mb-3">${s.title}</h4>
            <p class="text-gray-600 text-xs leading-relaxed">${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Articles Section -->
    <section class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
          <i class="fas fa-file-alt text-pink-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Career Pivot Articles</h2>
          <p class="text-gray-500 text-sm">Insights from LinkedIn — now being converted to video</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${[
          {
            title: 'You\'re Not Stuck — You\'re Just Mid-Pivot',
            category: 'Mindset', readTime: '6 min', icon: 'fa-brain',
            desc: 'That uncomfortable in-between feeling when you know you\'re leaving but haven\'t quite arrived? That\'s not failure — that\'s the pivot in action. Here\'s how to navigate the messy middle with grace.',
            tags: ['Mindset', 'Resilience', 'Transition'],
            status: 'article'
          },
          {
            title: '7 Transferable Skills That Open Doors in Any Industry',
            category: 'Skills', readTime: '8 min', icon: 'fa-toolbox',
            desc: 'Leadership, communication, data analysis, project management — discover the skills you already have that employers across every sector are desperately seeking.',
            tags: ['Skills', 'Job Search', 'Strategy'],
            status: 'article'
          },
          {
            title: 'The LinkedIn Profile Overhaul Every Career Changer Needs',
            category: 'LinkedIn Strategy', readTime: '10 min', icon: 'fab fa-linkedin',
            desc: 'Your LinkedIn profile is your first impression. Learn how to reframe your experience for your target role, craft a compelling headline, and write a summary that makes recruiters reach out to you.',
            tags: ['LinkedIn', 'Personal Brand', 'Job Search'],
            status: 'article'
          },
          {
            title: 'Informational Interviews: The Secret Weapon of Career Pivoters',
            category: 'Networking', readTime: '7 min', icon: 'fa-coffee',
            desc: '30 minutes over coffee (or Zoom) can change everything. Learn the exact script for requesting and running an informational interview that turns contacts into advocates — and sometimes, into job offers.',
            tags: ['Networking', 'Research', 'Relationships'],
            status: 'article'
          },
          {
            title: 'From Laid Off to Leveled Up: Turning Setback into Strategy',
            category: 'Resilience', readTime: '9 min', icon: 'fa-arrow-up',
            desc: 'A layoff is painful — but for many career pivoters, it\'s the unexpected catalyst for their best move yet. Here\'s a practical framework for turning job loss into your most strategic advantage.',
            tags: ['Layoff', 'Strategy', 'Recovery'],
            status: 'article'
          },
          {
            title: 'Salary Negotiation When You\'re Making a Career Change',
            category: 'Negotiation', readTime: '8 min', icon: 'fa-handshake',
            desc: 'When you\'re pivoting, you may worry about taking a pay cut. You don\'t have to. Learn how to anchor your value based on your total contribution — not just your job title — to negotiate confidently.',
            tags: ['Salary', 'Negotiation', 'Value'],
            status: 'article'
          }
        ].map(a => `
          <article class="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="pill-tag bg-purple-100 text-purple-700 text-xs">${a.category}</span>
                <div class="flex items-center gap-3">
                  <span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i>${a.readTime}</span>
                  ${a.status === 'video_coming' ? '<span class="pill-tag bg-red-100 text-red-600 text-xs"><i class="fab fa-youtube mr-1"></i>Video Coming</span>' : ''}
                </div>
              </div>
              <i class="fas ${a.icon.startsWith('fab') ? '' : ''} ${a.icon} text-3xl text-purple-300 mb-4 block"></i>
              <h3 class="font-playfair text-xl font-bold text-gray-900 mb-3 leading-snug">${a.title}</h3>
              <p class="text-gray-500 text-sm leading-relaxed mb-4">${a.desc}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                ${a.tags.map(t => `<span class="pill-tag bg-gray-100 text-gray-500 text-xs">${t}</span>`).join('')}
              </div>
              <a href="#" class="text-sm font-semibold text-purple-600 hover:underline">Read on LinkedIn <i class="fas fa-external-link-alt text-xs ml-1"></i></a>
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <!-- Tools & Resources -->
    <section class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
          <i class="fas fa-tools text-orange-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Free Tools & Resources</h2>
          <p class="text-gray-500 text-sm">Curated tools to accelerate your pivot</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${[
          { title: 'O*NET Online', desc: 'Explore 900+ occupations with skills, tasks, salary data, and outlook.', url: 'https://www.onetonline.org/', icon: 'fa-sitemap', color: 'bg-blue-50 border-blue-200 text-blue-600' },
          { title: 'LinkedIn Career Explorer', desc: 'Discover roles that match your current skills with transition pathways.', url: 'https://linkedin.com/career-advice/career-path', icon: 'fab fa-linkedin', color: 'bg-blue-50 border-blue-200 text-blue-700' },
          { title: 'My Next Move (DOL)', desc: 'Simple career exploration tool from the Dept. of Labor.', url: 'https://www.mynextmove.org/', icon: 'fa-map', color: 'bg-purple-50 border-purple-200 text-purple-600' },
          { title: 'Coursera / Coursera for Teams', desc: 'Free and paid online courses to fill skill gaps in weeks, not years.', url: 'https://www.coursera.org/', icon: 'fa-graduation-cap', color: 'bg-green-50 border-green-200 text-green-600' },
          { title: 'Glass Door Salary Explorer', desc: 'Research salary ranges in your target role and location.', url: 'https://www.glassdoor.com/Salaries/', icon: 'fa-dollar-sign', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
          { title: 'StrengthsFinder (Gallup)', desc: 'Identify your top strengths to anchor your pivot narrative.', url: 'https://www.gallup.com/cliftonstrengths/', icon: 'fa-star', color: 'bg-orange-50 border-orange-200 text-orange-600' },
          { title: 'Indeed Career Guide', desc: 'Free job search and career transition articles and tools.', url: 'https://www.indeed.com/career-advice', icon: 'fa-search', color: 'bg-teal-50 border-teal-200 text-teal-600' },
          { title: 'American Job Centers', desc: 'Free in-person and virtual career services through the govt.', url: 'https://www.careeronestop.org/LocalHelp/AmericanJobCenters/', icon: 'fa-flag-usa', color: 'bg-red-50 border-red-200 text-red-600' },
          { title: 'Pivot Method Worksheet', desc: 'Download our free 1-page career pivot planning worksheet.', url: '#', icon: 'fa-download', color: 'bg-pink-50 border-pink-200 text-pink-600' }
        ].map(r => `
          <a href="${r.url}" target="_blank" rel="noopener" class="card-hover flex items-start gap-4 p-5 bg-white rounded-xl border ${r.color.split(' ')[1]} shadow-sm transition-all group">
            <div class="w-10 h-10 rounded-lg ${r.color.split(' ')[0]} flex items-center justify-center flex-shrink-0">
              <i class="${r.icon.startsWith('fab') ? r.icon : 'fas ' + r.icon} ${r.color.split(' ')[2]}"></i>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800 group-hover:text-purple-700 text-sm transition-colors">${r.title}</h4>
              <p class="text-gray-500 text-xs mt-0.5 leading-relaxed">${r.desc}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </section>

    <!-- Pivot Success Stories CTA -->
    <section class="scroll-reveal bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-10 text-white text-center">
      <i class="fas fa-star text-yellow-300 text-3xl mb-4"></i>
      <h2 class="font-playfair text-3xl font-bold mb-3">Your Story Matters</h2>
      <p class="text-purple-100 max-w-lg mx-auto mb-6">Every successful pivot starts with one decision: the decision to begin. Whether you\'re 25 or 65, your next chapter can be your best one.</p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="/media" class="px-7 py-3 bg-white text-purple-700 font-bold rounded-full hover:bg-yellow-300 hover:text-gray-900 transition-colors text-sm">
          <i class="fab fa-youtube mr-2"></i>Watch Career Videos
        </a>
        <a href="#contact" class="px-7 py-3 border-2 border-white/60 font-bold rounded-full hover:bg-white/20 transition-colors text-sm">
          <i class="fas fa-envelope mr-2"></i>Work With Me
        </a>
      </div>
    </section>

  </div>

  <script>
    // Quiz logic
    function calculatePivotScore() {
      let total = 0, count = 0;
      for (let i = 0; i < 8; i++) {
        const sel = document.querySelector('input[name="q' + i + '"]:checked');
        if (sel) { total += parseInt(sel.value); count++; }
      }
      if (count < 8) { alert('Please answer all 8 questions.'); return; }
      const score = Math.round((total / 40) * 100);
      let title, desc, bgColor, actions;
      if (score >= 75) {
        title = 'Highly Ready to Pivot!';
        desc = 'You have strong clarity, motivation, and resources in place. The conditions for a successful pivot are excellent — now it\'s time to execute. Start building your target company list and reaching out to your network this week.';
        bgColor = 'bg-green-500';
        actions = '<a href="#" class="px-5 py-2 bg-green-600 text-white rounded-full text-sm font-bold">Download Your Pivot Plan</a>';
      } else if (score >= 50) {
        title = 'Getting Ready — Almost There';
        desc = 'You have a solid foundation but a few key areas need attention before you leap. Focus on clarifying your target role, building financial runway, and strengthening your network in the new field.';
        bgColor = 'bg-blue-500';
        actions = '<a href="#" class="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-bold">Read the 5-Step Framework</a>';
      } else {
        title = 'Still in the Discovery Phase';
        desc = 'You\'re aware something needs to change, but you may not yet have a clear direction or feel fully ready. That\'s completely okay — this is the most important phase! Focus on exploration, self-reflection, and informational interviews.';
        bgColor = 'bg-orange-500';
        actions = '<a href="#" class="px-5 py-2 bg-orange-600 text-white rounded-full text-sm font-bold">Start with Self-Discovery</a>';
      }
      document.getElementById('result-circle').className = 'w-32 h-32 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-playfair font-bold mb-6 shadow-lg ' + bgColor;
      document.getElementById('result-circle').textContent = score + '%';
      document.getElementById('result-title').textContent = title;
      document.getElementById('result-desc').textContent = desc;
      document.getElementById('result-actions').innerHTML = actions;
      document.getElementById('quiz-section').classList.add('hidden');
      document.getElementById('quiz-result').classList.remove('hidden');
    }

    function resetQuiz() {
      document.querySelectorAll('.quiz-radio').forEach(r => r.checked = false);
      document.querySelectorAll('.quiz-label').forEach(l => {
        l.classList.remove('bg-purple-500','text-white','border-purple-500');
        l.classList.add('border-gray-200','text-gray-500');
      });
      document.getElementById('quiz-result').classList.add('hidden');
      document.getElementById('quiz-section').classList.remove('hidden');
    }

    // Style selected radio buttons
    document.querySelectorAll('.quiz-radio').forEach(radio => {
      radio.addEventListener('change', function() {
        const name = this.name;
        document.querySelectorAll('input[name="' + name + '"] + span').forEach(span => {
          span.classList.remove('bg-purple-500','text-white','border-purple-500');
          span.classList.add('border-gray-200','text-gray-500');
        });
        this.nextElementSibling.classList.add('bg-purple-500','text-white','border-purple-500');
        this.nextElementSibling.classList.remove('border-gray-200','text-gray-500');
      });
    });
  </script>
  `

  return c.html(layout('Career Pivoting', content, 'career'))
}
