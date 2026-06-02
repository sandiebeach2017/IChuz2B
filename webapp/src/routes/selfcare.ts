import type { Context } from 'hono'
import { layout } from '../layout'

export const selfcarePage = (c: Context) => {
  const content = `
  <!-- Hero -->
  <section class="gradient-self text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 50% 50%, white 1px, transparent 1px); background-size: 35px 35px;"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="flex items-center gap-2 mb-4">
        <a href="/" class="text-emerald-200 hover:text-white text-sm">Home</a>
        <i class="fas fa-chevron-right text-xs text-emerald-300"></i>
        <span class="text-white text-sm font-semibold">Self-Care</span>
      </div>
      <div class="max-w-3xl">
        <span class="pill-tag bg-emerald-500/40 text-emerald-100 mb-4">Self-Care & Wellness</span>
        <h1 class="font-playfair text-5xl font-bold mb-4">Take Care of<br/><span class="text-yellow-300">The Caregiver</span> — You</h1>
        <p class="text-emerald-100 text-xl leading-relaxed">You cannot pour from an empty cup. Investing in your own well-being isn't selfish — it's the most sustainable thing you can do for yourself and everyone who depends on you.</p>
      </div>
    </div>
    <svg class="hero-wave" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#f9fafb"/>
    </svg>
  </section>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

    <!-- Burnout Check -->
    <section class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
          <i class="fas fa-battery-quarter text-red-500 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Caregiver Burnout Check</h2>
          <p class="text-gray-500 text-sm">Take 2 minutes to check in on yourself</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <p class="text-gray-600 mb-2 text-sm">Answer honestly — this is just for you. Rate how often you experience each of the following:</p>
        <p class="text-xs text-gray-400 mb-6">1 = Never &nbsp;·&nbsp; 2 = Rarely &nbsp;·&nbsp; 3 = Sometimes &nbsp;·&nbsp; 4 = Often &nbsp;·&nbsp; 5 = Almost Always</p>
        
        <div id="burnout-questions" class="space-y-4">
          ${[
            'I feel emotionally exhausted and drained.',
            'I feel resentment or irritability toward the person I care for.',
            'I have trouble sleeping or feel tired even after sleeping.',
            'I have neglected my own medical or dental appointments.',
            'I feel isolated or disconnected from friends and family.',
            'I feel like I have lost my own sense of identity.',
            'I feel anxious or worried most of the time.',
            'I have little or no time for activities I used to enjoy.',
            'I feel like I can never do enough, no matter how hard I try.',
            'I have been using food, alcohol, or screens to cope with stress.'
          ].map((q, i) => `
            <div class="p-4 bg-gray-50 rounded-xl">
              <div class="text-sm font-medium text-gray-700 mb-3"><span class="text-red-400 font-bold mr-2">${i + 1}.</span>${q}</div>
              <div class="flex gap-2">
                ${[1,2,3,4,5].map(v => `
                  <label class="cursor-pointer flex-1 max-w-[52px]">
                    <input type="radio" name="b${i}" value="${v}" class="sr-only burnout-radio" />
                    <span class="burnout-label block text-center py-2 rounded-lg border-2 border-gray-200 text-sm font-bold text-gray-500 hover:border-red-400 hover:text-red-600 transition-all">${v}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <button onclick="calcBurnout()" class="mt-6 px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors">
          <i class="fas fa-heart-pulse mr-2"></i>Check My Burnout Level
        </button>

        <div id="burnout-result" class="hidden mt-8 p-6 rounded-2xl border-2">
          <div class="flex items-start gap-4">
            <div id="burnout-icon" class="text-4xl flex-shrink-0"></div>
            <div>
              <h3 id="burnout-level" class="font-playfair text-2xl font-bold mb-2"></h3>
              <p id="burnout-desc" class="text-gray-600 text-sm leading-relaxed mb-4"></p>
              <div id="burnout-actions" class="space-y-2"></div>
            </div>
          </div>
          <button onclick="resetBurnout()" class="mt-4 text-sm text-gray-400 hover:text-gray-600">Retake Check-In</button>
        </div>
      </div>
    </section>

    <!-- Daily Wellness Wheel -->
    <section class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <i class="fas fa-circle-notch text-emerald-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">The Wellness Wheel</h2>
          <p class="text-gray-500 text-sm">8 dimensions of well-being — click each for tips and resources</p>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${[
          { icon: 'fa-heart-pulse', label: 'Physical', color: 'bg-red-50 border-red-200 text-red-600', hover: 'hover:bg-red-100',
            tips: ['Schedule and keep your own doctor appointments', 'Aim for 30 min of movement 5x per week', 'Prioritize sleep — 7-9 hours matters enormously', 'Stay hydrated: aim for 8 glasses of water daily'] },
          { icon: 'fa-brain', label: 'Mental', color: 'bg-purple-50 border-purple-200 text-purple-600', hover: 'hover:bg-purple-100',
            tips: ['See a therapist who specializes in caregiver stress', 'Journal for 5 minutes each morning', 'Limit doom-scrolling and news consumption', 'Practice "good enough" — release perfectionism'] },
          { icon: 'fa-users', label: 'Social', color: 'bg-blue-50 border-blue-200 text-blue-600', hover: 'hover:bg-blue-100',
            tips: ['Maintain at least one non-caregiving relationship', 'Join a caregiver support group', 'Schedule regular "just to chat" calls', 'Don\'t cancel plans — protect your social time'] },
          { icon: 'fa-seedling', label: 'Spiritual', color: 'bg-green-50 border-green-200 text-green-600', hover: 'hover:bg-green-100',
            tips: ['Connect with whatever gives you meaning and purpose', 'Practice daily gratitude — write 3 things', 'Spend time in nature, even 10 minutes helps', 'Attend services, meditation, or mindfulness groups'] },
          { icon: 'fa-dollar-sign', label: 'Financial', color: 'bg-yellow-50 border-yellow-200 text-yellow-700', hover: 'hover:bg-yellow-100',
            tips: ['Understand all available financial assistance programs', 'Consult a financial advisor who knows elder care', 'Keep a caregiving expense log for taxes', 'Know your legal rights as a paid family caregiver'] },
          { icon: 'fa-infinity', label: 'Emotional', color: 'bg-pink-50 border-pink-200 text-pink-600', hover: 'hover:bg-pink-100',
            tips: ['Name and acknowledge your emotions without judgment', 'Allow yourself to grieve losses (role, relationship, freedom)', 'Practice the HALT technique: Hungry, Angry, Lonely, Tired', 'Celebrate small wins — you are doing hard things'] },
          { icon: 'fa-puzzle-piece', label: 'Intellectual', color: 'bg-indigo-50 border-indigo-200 text-indigo-600', hover: 'hover:bg-indigo-100',
            tips: ['Read something unrelated to caregiving each week', 'Take an online course in something you enjoy', 'Do puzzles, games, or creative projects', 'Stay curious — learn one new thing each day'] },
          { icon: 'fa-briefcase', label: 'Occupational', color: 'bg-teal-50 border-teal-200 text-teal-600', hover: 'hover:bg-teal-100',
            tips: ['Advocate for FMLA and flexible work arrangements', 'Have an honest conversation with your employer', 'Keep professional development alive, even slowly', 'Know that caregiving builds extraordinary leadership skills'] }
        ].map((w, i) => `
          <div class="wellness-card card-hover ${w.color} ${w.hover} border rounded-2xl p-5 text-center cursor-pointer transition-all" onclick="toggleWellness(${i})">
            <i class="fas ${w.icon} text-3xl mb-3 block"></i>
            <h4 class="font-bold text-gray-800 mb-1">${w.label}</h4>
            <i class="fas fa-chevron-down text-xs opacity-50 wellness-chevron-${i} transition-transform"></i>
            <div id="wellness-tips-${i}" class="hidden mt-4 text-left">
              <ul class="space-y-2">
                ${w.tips.map(t => `<li class="flex items-start gap-2 text-xs text-gray-700"><i class="fas fa-check-circle text-emerald-500 mt-0.5 flex-shrink-0"></i>${t}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Self-Care Articles -->
    <section class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
          <i class="fas fa-book-open text-teal-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Self-Care Articles</h2>
          <p class="text-gray-500 text-sm">From the LinkedIn collection — coming soon as videos</p>
        </div>
      </div>

      <div class="space-y-4">
        ${[
          {
            title: 'The Caregiver\'s Bill of Rights',
            summary: 'You have the right to take care of yourself. The right to seek help from others. The right to maintain parts of your own life that don\'t include the person you care for. Read, post, and repeat.',
            icon: 'fa-scroll', time: '4 min read',
            content: 'A caregiver has the right to: 1) Seek help without feelings of guilt. 2) Maintain facets of my own life that do not include the person I care for. 3) Get angry, be depressed, and express other difficult feelings occasionally. 4) Reject attempts — whether by the care receiver or others — to manipulate me through guilt, anger, or depression. 5) Receive consideration, affection, forgiveness, and acceptance for what I do for my loved one. 6) Take pride in what I am accomplishing and to applaud the courage it has sometimes taken to meet the needs of my loved one. 7) Protect my individuality and my right to make a life for myself that will sustain me as the care of my loved one needs may increase.'
          },
          {
            title: '5-Minute Self-Care Practices for the Busiest Caregivers',
            summary: 'You don\'t need a spa day — you need 5 minutes. Here are evidence-based micro-practices that can genuinely shift your nervous system when you\'re running on empty.',
            icon: 'fa-stopwatch', time: '5 min read',
            content: '1) Box Breathing (4-7-8): Inhale 4 seconds, hold 7, exhale 8. Repeat 3 times. 2) The 5-4-3-2-1 Grounding Technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. 3) A 5-minute walk outside — the combination of movement and nature lowers cortisol faster than almost anything else. 4) Text one person who makes you feel good: "Thinking of you." The reciprocal connection activates oxytocin. 5) Write one thing you\'re grateful for — not just think it, but physically write it.'
          },
          {
            title: 'Setting Boundaries Without Guilt: A Guide for Caregivers',
            summary: 'Saying no is not abandonment. Protecting your time and energy is what makes long-term caregiving possible. This article gives you the exact language to use.',
            icon: 'fa-shield-alt', time: '7 min read',
            content: 'The hardest part of caregiving is not the physical demands — it\'s the invisible weight of everyone\'s expectations. Setting limits means: knowing what you can and cannot do, communicating those boundaries clearly and kindly, and holding them consistently. Scripts that help: "I can help with X, but not Y right now." "I need to schedule that in advance — can we look at next week?" "I\'m not able to do that today, but here is who can help." Remember: a boundary is not a rejection. It\'s a road map for how to treat each other sustainably.'
          },
          {
            title: 'How to Ask for (and Accept) Help: A Guide for Independent Caregivers',
            summary: 'Many of us were raised to be self-sufficient — which makes asking for help feel like failure. It isn\'t. Here\'s how to get specific about what you need and how to say yes when it\'s offered.',
            icon: 'fa-hands-helping', time: '6 min read',
            content: 'The myth of the lone caregiver is dangerous. Research consistently shows that caregivers with social support have lower rates of depression, better health outcomes, and provide higher quality care. The problem: most people are bad at asking for help because they use vague requests ("I could use some help") instead of specific ones ("Could you bring dinner on Tuesdays for the next month?"). The most effective requests are: Specific in what you need. Time-bound — not open-ended. Low-stakes for the helper to say no. Use the "GIFT" method: Give specific Invitations For Tasks.'
          }
        ].map((a, i) => `
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <button class="accordion-btn w-full text-left px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="fas ${a.icon} text-emerald-600"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i>${a.time}</span>
                    <span class="pill-tag bg-emerald-100 text-emerald-700 text-xs">Self-Care</span>
                  </div>
                  <span class="font-playfair font-bold text-gray-900 text-lg">${a.title}</span>
                  <p class="text-gray-500 text-sm mt-1">${a.summary}</p>
                </div>
              </div>
              <i class="fas fa-chevron-down text-gray-400 flex-shrink-0 ml-4 acc-icon transition-transform"></i>
            </button>
            <div class="accordion-content">
              <div class="px-6 pb-6 pt-2 border-t border-gray-50">
                <p class="text-gray-700 text-sm leading-relaxed">${a.content}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Daily Practice Builder -->
    <section class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
          <i class="fas fa-sun text-yellow-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Build Your Daily Self-Care Routine</h2>
          <p class="text-gray-500 text-sm">Pick what resonates — small steps build lasting habits</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          ${[
            {
              time: 'Morning Rituals (5–15 min)', icon: 'fa-sun', color: 'text-yellow-500',
              practices: ['5-minute gratitude journal', 'Hydrate before caffeine', 'Stretch or gentle yoga', '3 deep breaths before getting up', 'Set 1 intention for the day']
            },
            {
              time: 'Midday Reset (2–5 min)', icon: 'fa-pause-circle', color: 'text-blue-500',
              practices: ['Step outside for air', 'Eat lunch away from the caregiving space', 'Call or text a supportive friend', 'Do a body scan — where are you tense?', 'Drink a full glass of water']
            },
            {
              time: 'Evening Wind-Down (10–20 min)', icon: 'fa-moon', color: 'text-purple-500',
              practices: ['Write down 1 win from the day', 'No screens 30 min before bed', 'Take a warm shower or bath', 'Read for pleasure (non-caregiving)', 'Do a "brain dump" to clear worries']
            }
          ].map(t => `
            <div class="bg-gray-50 rounded-xl p-5">
              <div class="flex items-center gap-2 mb-4">
                <i class="fas ${t.icon} ${t.color} text-xl"></i>
                <h4 class="font-bold text-gray-700 text-sm">${t.time}</h4>
              </div>
              <div class="space-y-2" id="practices-container">
                ${t.practices.map((p, i) => `
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" class="w-4 h-4 rounded accent-emerald-500 routine-check" />
                    <span class="text-sm text-gray-600 group-hover:text-gray-800">${p}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="border-t border-gray-100 pt-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span class="text-sm text-gray-600"><strong id="routine-count" class="text-emerald-600 text-xl">0</strong> practices selected</span>
            <p id="routine-msg" class="text-xs text-gray-400 mt-0.5">Select 3–5 practices to start your sustainable routine</p>
          </div>
          <button onclick="saveRoutine()" class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-sm transition-colors">
            <i class="fas fa-save mr-2"></i>Save My Routine
          </button>
        </div>
        <div id="routine-saved" class="hidden mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800">
          <i class="fas fa-check-circle mr-2"></i><strong>Your routine has been noted!</strong> Consider writing it on a sticky note and putting it somewhere visible. Consistency is more important than perfection.
        </div>
      </div>
    </section>

    <!-- Resources & Support -->
    <section class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
          <i class="fas fa-heart text-pink-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Self-Care Resources</h2>
          <p class="text-gray-500 text-sm">Trusted tools to support your wellness journey</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${[
          { title: 'Headspace (Meditation)', url: 'https://www.headspace.com/', icon: 'fa-spa', desc: 'Guided meditation and mindfulness for stress', color: 'bg-orange-50 border-orange-200' },
          { title: 'Calm App', url: 'https://www.calm.com/', icon: 'fa-cloud', desc: 'Sleep, meditation, and relaxation', color: 'bg-blue-50 border-blue-200' },
          { title: 'NAMI (Mental Health)', url: 'https://www.nami.org/', icon: 'fa-brain', desc: 'National Alliance on Mental Illness helpline & resources', color: 'bg-purple-50 border-purple-200' },
          { title: 'Insight Timer (Free)', url: 'https://insighttimer.com/', icon: 'fa-clock', desc: 'Free guided meditations from teachers worldwide', color: 'bg-green-50 border-green-200' },
          { title: 'Crisis Text Line', url: 'https://www.crisistextline.org/', icon: 'fa-comment-medical', desc: 'Text HOME to 741741 — free, confidential support', color: 'bg-red-50 border-red-200' },
          { title: 'Well & Good Wellness', url: 'https://www.wellandgood.com/', icon: 'fa-leaf', desc: 'Evidence-backed wellness articles and advice', color: 'bg-teal-50 border-teal-200' }
        ].map(r => `
          <a href="${r.url}" target="_blank" rel="noopener" class="card-hover flex items-start gap-4 p-5 bg-white rounded-xl border ${r.color} shadow-sm group">
            <div class="w-10 h-10 rounded-lg ${r.color} flex items-center justify-center flex-shrink-0">
              <i class="fas ${r.icon} text-emerald-600"></i>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800 group-hover:text-emerald-700 text-sm transition-colors">${r.title}</h4>
              <p class="text-gray-500 text-xs mt-0.5">${r.desc}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </section>

  </div>

  <script>
    // Wellness wheel toggle
    function toggleWellness(i) {
      const tips = document.getElementById('wellness-tips-' + i);
      const chevron = document.querySelector('.wellness-chevron-' + i);
      const isOpen = !tips.classList.contains('hidden');
      // Close all
      for (let j = 0; j < 8; j++) {
        document.getElementById('wellness-tips-' + j)?.classList.add('hidden');
        document.querySelector('.wellness-chevron-' + j)?.style.setProperty('transform', '');
      }
      if (!isOpen) {
        tips.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    }

    // Routine checker
    document.querySelectorAll('.routine-check').forEach(cb => {
      cb.addEventListener('change', () => {
        const count = document.querySelectorAll('.routine-check:checked').length;
        document.getElementById('routine-count').textContent = count;
        const msg = count === 0 ? 'Select 3–5 practices to start your sustainable routine'
          : count < 3 ? 'Good start! Add ' + (3 - count) + ' more for a balanced routine'
          : count <= 5 ? '✓ Great balance! This is a sustainable routine'
          : 'Consider starting with fewer — consistency beats quantity';
        document.getElementById('routine-msg').textContent = msg;
      });
    });

    function saveRoutine() {
      document.getElementById('routine-saved').classList.remove('hidden');
      setTimeout(() => document.getElementById('routine-saved').classList.add('hidden'), 5000);
    }

    // Burnout assessment
    function calcBurnout() {
      let total = 0, count = 0;
      for (let i = 0; i < 10; i++) {
        const sel = document.querySelector('input[name="b' + i + '"]:checked');
        if (sel) { total += parseInt(sel.value); count++; }
      }
      if (count < 10) { alert('Please answer all 10 questions.'); return; }
      const avg = total / 10;
      let level, desc, icon, style, actions;
      if (avg >= 4) {
        level = 'High Burnout — Immediate Action Needed';
        desc = 'Your responses indicate significant caregiver burnout. This is serious and requires immediate attention. Please reach out to a mental health professional, a trusted friend, or a caregiver hotline today. You are not alone, and getting help is the most courageous thing you can do right now.';
        icon = '🆘';
        style = 'bg-red-50 border-red-300';
        actions = '<a href="tel:9881" class="block text-sm font-bold text-red-700 bg-red-100 rounded-lg px-4 py-2 hover:bg-red-200">📞 Call/Text 988 — Mental Health Crisis Line</a><a href="tel:18552273640" class="block text-sm font-bold text-red-700 bg-red-100 rounded-lg px-4 py-2 hover:bg-red-200 mt-2">📞 1-855-227-3640 — Caregiver Action Network</a>';
      } else if (avg >= 3) {
        level = 'Moderate Burnout — Take Action Soon';
        desc = 'You are showing clear signs of burnout and compassion fatigue. It\'s time to make some changes before this progresses. Consider reaching out for respite care, speaking to a therapist, and having an honest conversation with your support network about what you need.';
        icon = '⚠️';
        style = 'bg-orange-50 border-orange-300';
        actions = '<a href="/caregiving#support" class="block text-sm font-bold text-orange-700 bg-orange-100 rounded-lg px-4 py-2 hover:bg-orange-200">Find Caregiver Support Resources</a><a href="#" class="block text-sm font-bold text-orange-700 bg-orange-100 rounded-lg px-4 py-2 hover:bg-orange-200 mt-2">Read: Setting Boundaries Without Guilt</a>';
      } else if (avg >= 2) {
        level = 'Early Signs of Stress — Be Proactive';
        desc = 'You\'re managing, but there are clear stress signals worth addressing before they compound. This is the ideal time to build sustainable habits, strengthen your support network, and invest in your own well-being proactively.';
        icon = '🌤️';
        style = 'bg-yellow-50 border-yellow-300';
        actions = '<a href="#" onclick="scrollToSection(\'wellness\')" class="block text-sm font-bold text-yellow-700 bg-yellow-100 rounded-lg px-4 py-2 hover:bg-yellow-200">Build Your Daily Wellness Routine</a>';
      } else {
        level = 'You\'re Doing Well — Keep It Up!';
        desc = 'Your responses suggest you have strong coping mechanisms and a relatively balanced caregiving situation right now. Continue nurturing the habits and relationships that are sustaining you, and stay vigilant — caregiving stress can build gradually.';
        icon = '✨';
        style = 'bg-green-50 border-green-300';
        actions = '<a href="#" class="block text-sm font-bold text-green-700 bg-green-100 rounded-lg px-4 py-2 hover:bg-green-200">Explore Self-Care Practices to Maintain Balance</a>';
      }
      const resultEl = document.getElementById('burnout-result');
      resultEl.className = 'mt-8 p-6 rounded-2xl border-2 ' + style;
      document.getElementById('burnout-icon').textContent = icon;
      document.getElementById('burnout-level').textContent = level;
      document.getElementById('burnout-desc').textContent = desc;
      document.getElementById('burnout-actions').innerHTML = actions;
      resultEl.classList.remove('hidden');
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function resetBurnout() {
      document.querySelectorAll('.burnout-radio').forEach(r => r.checked = false);
      document.querySelectorAll('.burnout-label').forEach(l => {
        l.classList.remove('bg-red-500','text-white','border-red-500');
        l.classList.add('border-gray-200','text-gray-500');
      });
      document.getElementById('burnout-result').classList.add('hidden');
    }

    document.querySelectorAll('.burnout-radio').forEach(radio => {
      radio.addEventListener('change', function() {
        const name = this.name;
        document.querySelectorAll('input[name="' + name + '"] + span').forEach(span => {
          span.classList.remove('bg-red-500','text-white','border-red-500');
          span.classList.add('border-gray-200','text-gray-500');
        });
        this.nextElementSibling.classList.add('bg-red-500','text-white','border-red-500');
        this.nextElementSibling.classList.remove('border-gray-200','text-gray-500');
      });
    });
  </script>
  `

  return c.html(layout('Self-Care', content, 'selfcare'))
}
