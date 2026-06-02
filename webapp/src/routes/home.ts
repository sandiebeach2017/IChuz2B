import type { Context } from 'hono'
import { layout } from '../layout'

export const homePage = (c: Context) => {
  const content = `
  <!-- Hero Section -->
  <section class="relative gradient-hero text-white overflow-hidden" style="min-height: 88vh; display: flex; align-items: center;">
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px); background-size: 60px 60px;"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Consultant · Speaker · Advocate
        </div>
        <h1 class="font-playfair text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Navigating Life's<br/>
          <span class="text-yellow-300">Biggest Transitions</span><br/>
          Together
        </h1>
        <p class="text-xl text-blue-100 leading-relaxed mb-8 max-w-lg">
          Expert guidance in <strong class="text-white">Caregiving</strong>, <strong class="text-white">Career Pivoting</strong>, and <strong class="text-white">Self-Care</strong> — because you deserve support every step of the way.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="/caregiving" class="px-8 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-yellow-300 hover:text-gray-900 transition-all text-sm shadow-lg">
            <i class="fas fa-heart mr-2"></i>Explore Caregiving
          </a>
          <a href="/media" class="px-8 py-3 border-2 border-white/60 text-white font-bold rounded-full hover:bg-white/20 transition-all text-sm">
            <i class="fab fa-youtube mr-2"></i>Watch Videos
          </a>
        </div>
        <div class="mt-10 flex items-center gap-6">
          <div class="flex -space-x-2">
            ${[
              'bg-pink-400','bg-blue-400','bg-yellow-400','bg-green-400'
            ].map(c => `<div class="w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold">★</div>`).join('')}
          </div>
          <span class="text-blue-200 text-sm">Trusted by thousands of families & professionals</span>
        </div>
      </div>
      <div class="hidden lg:grid grid-cols-2 gap-4">
        ${[
          { icon: 'fa-heart', label: 'Caregiving', desc: 'Medicare, Medications & Family Care', color: 'from-teal-500/90 to-teal-700/90', href: '/caregiving' },
          { icon: 'fa-briefcase', label: 'Career Pivoting', desc: 'Find your next chapter with confidence', color: 'from-purple-500/90 to-purple-800/90', href: '/career' },
          { icon: 'fa-spa', label: 'Self-Care', desc: 'Restore your energy & well-being', color: 'from-emerald-500/90 to-emerald-700/90', href: '/selfcare' },
          { icon: 'fab fa-youtube', label: 'Media Hub', desc: 'Videos, tips & community resources', color: 'from-red-500/90 to-red-700/90', href: '/media' }
        ].map((item, i) => `
          <a href="${item.href}" class="card-hover rounded-2xl p-6 bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/20 text-white block ${i === 1 ? 'mt-6' : ''}">
            <i class="${item.icon.startsWith('fab') ? item.icon : 'fas ' + item.icon} text-3xl mb-3 opacity-90"></i>
            <h3 class="font-bold text-lg mb-1">${item.label}</h3>
            <p class="text-sm opacity-80">${item.desc}</p>
          </a>
        `).join('')}
      </div>
    </div>
    <svg class="hero-wave" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f9fafb"/>
    </svg>
  </section>

  <!-- Stats Bar -->
  <section class="bg-white border-b border-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      ${[
        { num: '3', label: 'Areas of Expertise', icon: 'fa-star', color: 'text-yellow-500' },
        { num: '10+', label: 'LinkedIn Articles', icon: 'fab fa-linkedin', color: 'text-blue-600' },
        { num: '100+', label: 'Resources Curated', icon: 'fa-book-open', color: 'text-teal-600' },
        { num: '∞', label: 'Community Support', icon: 'fa-users', color: 'text-purple-600' }
      ].map(s => `
        <div class="scroll-reveal">
          <i class="fas ${s.icon} text-2xl ${s.color} mb-2"></i>
          <div class="text-3xl font-playfair font-bold text-gray-800">${s.num}</div>
          <div class="text-sm text-gray-500 mt-1">${s.label}</div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Three Pillars -->
  <section class="py-20 max-w-7xl mx-auto px-4">
    <div class="text-center mb-14 scroll-reveal">
      <span class="pill-tag bg-blue-100 text-blue-700 mb-3">What I Do</span>
      <h2 class="font-playfair text-4xl font-bold text-gray-900 mt-2">Three Pillars of Support</h2>
      <p class="text-gray-500 mt-3 max-w-xl mx-auto">Whether you're caring for a loved one, reimagining your career, or investing in your own wellness — I'm here to help.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${[
        {
          icon: 'fa-heart', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200',
          badge: 'bg-teal-100 text-teal-700', badgeText: 'Caregiving',
          title: 'Caregiving Resources', href: '/caregiving',
          btnColor: 'bg-teal-600 hover:bg-teal-700',
          desc: 'Navigating the caregiving journey is one of life\'s most demanding roles. From Medicare plan comparisons to medication scheduling and finding community support — I\'ve got the tools to help.',
          features: ['Medicare Plan Comparator', 'Medication Schedule Builder', 'Caregiver Support Directory', 'Family Care Guides']
        },
        {
          icon: 'fa-briefcase', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200',
          badge: 'bg-purple-100 text-purple-700', badgeText: 'Career Pivoting',
          title: 'Career Transition', href: '/career',
          btnColor: 'bg-purple-600 hover:bg-purple-700',
          desc: 'A career change isn\'t a detour — it\'s a deliberate step toward your best self. Get practical frameworks, real stories, and actionable guidance to make your pivot with purpose.',
          features: ['Pivot Planning Frameworks', 'Skills Assessment Tools', 'LinkedIn Strategy Tips', 'Industry Transition Guides']
        },
        {
          icon: 'fa-spa', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-700', badgeText: 'Self-Care',
          title: 'Self-Care Practices', href: '/selfcare',
          btnColor: 'bg-emerald-600 hover:bg-emerald-700',
          desc: 'You cannot pour from an empty cup. Self-care isn\'t selfish — it\'s strategic. Discover routines, rituals, and resources to help you show up fully for yourself and everyone you love.',
          features: ['Daily Wellness Routines', 'Stress Management Tools', 'Mindfulness Resources', 'Caregiver Burnout Prevention']
        }
      ].map(p => `
        <div class="card-hover bg-white rounded-2xl border ${p.border} overflow-hidden scroll-reveal shadow-sm">
          <div class="${p.bg} px-6 pt-8 pb-6">
            <span class="pill-tag ${p.badge} mb-3">${p.badgeText}</span>
            <div class="${p.color} text-4xl mb-4"><i class="fas ${p.icon}"></i></div>
            <h3 class="font-playfair text-2xl font-bold text-gray-900 mb-2">${p.title}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">${p.desc}</p>
          </div>
          <div class="px-6 py-5">
            <ul class="space-y-2 mb-5">
              ${p.features.map(f => `<li class="flex items-center gap-2 text-sm text-gray-600"><i class="fas fa-check-circle ${p.color} flex-shrink-0"></i>${f}</li>`).join('')}
            </ul>
            <a href="${p.href}" class="${p.btnColor} text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors inline-block w-full text-center">
              Explore <i class="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Featured Articles Preview -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-end mb-10 scroll-reveal">
        <div>
          <span class="pill-tag bg-blue-100 text-blue-700 mb-2">Latest Insights</span>
          <h2 class="font-playfair text-3xl font-bold text-gray-900 mt-1">Articles & Resources</h2>
        </div>
        <a href="/media" class="text-blue-600 hover:text-blue-800 font-semibold text-sm hidden md:flex items-center gap-1">View All <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${[
          {
            category: 'Caregiving', catColor: 'text-teal-700 bg-teal-50',
            title: 'Understanding Medicare: What Every Caregiver Needs to Know',
            desc: 'Breaking down Parts A, B, C & D and how to compare plans during Open Enrollment season.',
            icon: 'fa-notes-medical', readTime: '8 min read', color: 'text-teal-600',
            href: '/caregiving'
          },
          {
            category: 'Career Pivoting', catColor: 'text-purple-700 bg-purple-50',
            title: 'The 5-Step Framework for a Fearless Career Pivot',
            desc: 'How to identify transferable skills, build your bridge, and land confidently in your next role.',
            icon: 'fa-map-signs', readTime: '6 min read', color: 'text-purple-600',
            href: '/career'
          },
          {
            category: 'Self-Care', catColor: 'text-emerald-700 bg-emerald-50',
            title: 'The Caregiver\'s Guide to Preventing Burnout',
            desc: 'Practical daily rituals that protect your energy, mental health, and long-term well-being.',
            icon: 'fa-battery-full', readTime: '5 min read', color: 'text-emerald-600',
            href: '/selfcare'
          }
        ].map(a => `
          <article class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 scroll-reveal">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="pill-tag ${a.catColor} text-xs">${a.category}</span>
                <span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i>${a.readTime}</span>
              </div>
              <i class="fas ${a.icon} text-3xl ${a.color} mb-4 block"></i>
              <h3 class="font-playfair text-xl font-bold text-gray-900 mb-3 leading-snug">${a.title}</h3>
              <p class="text-gray-500 text-sm leading-relaxed mb-5">${a.desc}</p>
              <a href="${a.href}" class="text-sm font-semibold ${a.color} hover:underline">Read Article <i class="fas fa-arrow-right text-xs ml-1"></i></a>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Media / YouTube Preview -->
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-12 scroll-reveal">
        <span class="pill-tag bg-red-100 text-red-700 mb-3">Media Hub</span>
        <h2 class="font-playfair text-3xl font-bold text-gray-900 mt-1">Watch, Learn, Grow</h2>
        <p class="text-gray-500 mt-2 max-w-md mx-auto">Subscribe to stay updated when new videos drop on YouTube and Instagram.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        ${[
          {
            title: 'Medicare Open Enrollment: Your Complete Guide',
            duration: 'Coming Soon', thumb: '🏥', channel: 'YouTube'
          },
          {
            title: 'How to Pivot Your Career Without Starting Over',
            duration: 'Coming Soon', thumb: '🚀', channel: 'YouTube'
          },
          {
            title: 'Self-Care Strategies for Family Caregivers',
            duration: 'Coming Soon', thumb: '💙', channel: 'Instagram'
          }
        ].map(v => `
          <div class="card-hover rounded-2xl overflow-hidden bg-gray-900 text-white shadow-lg scroll-reveal">
            <div class="h-44 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl relative">
              ${v.thumb}
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center hover:bg-red-500 cursor-pointer transition-colors backdrop-blur-sm">
                  <i class="fas fa-play text-white ml-1"></i>
                </div>
              </div>
              <span class="absolute top-3 right-3 text-xs bg-gray-900/80 px-2 py-1 rounded-full">${v.channel}</span>
            </div>
            <div class="p-4">
              <h4 class="font-semibold text-sm leading-snug">${v.title}</h4>
              <p class="text-gray-400 text-xs mt-2">${v.duration}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="text-center scroll-reveal">
        <a href="/media" class="inline-flex items-center gap-3 px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors">
          <i class="fab fa-youtube text-xl"></i> Visit Media Hub
        </a>
      </div>
    </div>
  </section>

  <!-- CTA / Newsletter -->
  <section class="py-20 gradient-hero text-white">
    <div class="max-w-3xl mx-auto px-4 text-center scroll-reveal">
      <i class="fas fa-envelope-open-text text-4xl text-yellow-300 mb-4"></i>
      <h2 class="font-playfair text-4xl font-bold mb-4">Stay in the Know</h2>
      <p class="text-blue-100 text-lg mb-8">Get the latest resources, articles, and video notifications delivered straight to your inbox.</p>
      <form class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onsubmit="handleSubscribe(event)">
        <input type="email" id="subscribe-email" placeholder="Your email address" required
          class="flex-1 px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm" />
        <button type="submit" class="px-7 py-3 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transition-colors text-sm whitespace-nowrap">
          Subscribe <i class="fas fa-arrow-right ml-1"></i>
        </button>
      </form>
      <p id="subscribe-msg" class="mt-3 text-sm text-yellow-200 hidden">✓ Thank you! You'll hear from us soon.</p>
      <p class="text-blue-300 text-xs mt-4">No spam. Unsubscribe anytime. Your privacy is respected.</p>
    </div>
  </section>

  <script>
    function handleSubscribe(e) {
      e.preventDefault();
      document.getElementById('subscribe-email').value = '';
      document.getElementById('subscribe-msg').classList.remove('hidden');
      setTimeout(() => document.getElementById('subscribe-msg').classList.add('hidden'), 4000);
    }
  </script>
  `

  return c.html(layout('Home', content, 'home'))
}
