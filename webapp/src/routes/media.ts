import type { Context } from 'hono'
import { layout } from '../layout'

export const mediaPage = (c: Context) => {
  const content = `
  <!-- Hero -->
  <section class="bg-gray-900 text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0" style="background: radial-gradient(ellipse at 20% 50%, rgba(220,38,38,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(59,130,246,0.2) 0%, transparent 60%);"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="flex items-center gap-2 mb-4">
        <a href="/" class="text-gray-400 hover:text-white text-sm">Home</a>
        <i class="fas fa-chevron-right text-xs text-gray-500"></i>
        <span class="text-white text-sm font-semibold">Media Hub</span>
      </div>
      <div class="max-w-3xl">
        <span class="pill-tag bg-red-600/40 text-red-300 mb-4">Videos & Media</span>
        <h1 class="font-playfair text-5xl font-bold mb-4">Media Hub<br/><span class="text-red-400">Watch, Learn, Share</span></h1>
        <p class="text-gray-300 text-xl leading-relaxed">Articles turned into videos. Real conversations. Practical tips you can use today — on Caregiving, Career Pivoting, and Self-Care.</p>
      </div>
      <!-- Social Links -->
      <div class="flex flex-wrap gap-4 mt-8">
        ${[
          { icon: 'fab fa-youtube', label: 'Subscribe on YouTube', color: 'bg-red-600 hover:bg-red-500', url: '#youtube' },
          { icon: 'fab fa-instagram', label: 'Follow on Instagram', color: 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500', url: '#instagram' },
          { icon: 'fab fa-linkedin-in', label: 'Connect on LinkedIn', color: 'bg-blue-700 hover:bg-blue-600', url: '#linkedin' },
          { icon: 'fab fa-facebook-f', label: 'Follow on Facebook', color: 'bg-blue-600 hover:bg-blue-500', url: '#facebook' }
        ].map(s => `
          <a href="${s.url}" class="${s.color} text-white px-5 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2">
            <i class="${s.icon}"></i>${s.label}
          </a>
        `).join('')}
      </div>
    </div>
  </section>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

    <!-- Filter Bar -->
    <div class="scroll-reveal">
      <div class="flex flex-wrap gap-3 items-center">
        <span class="text-sm font-semibold text-gray-600">Filter by:</span>
        ${[
          { id: 'all', label: 'All Content', color: 'bg-gray-800 text-white' },
          { id: 'caregiving', label: '❤️ Caregiving', color: 'bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700' },
          { id: 'career', label: '💼 Career', color: 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700' },
          { id: 'selfcare', label: '🌿 Self-Care', color: 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700' },
          { id: 'youtube', label: '▶ YouTube', color: 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700' },
          { id: 'instagram', label: '📸 Instagram', color: 'bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-700' }
        ].map(f => `
          <button onclick="filterMedia('${f.id}')" id="filter-${f.id}" class="filter-btn px-4 py-2 rounded-full text-sm font-semibold transition-all ${f.color}">
            ${f.label}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Featured / Pinned -->
    <section class="scroll-reveal">
      <h2 class="font-playfair text-2xl font-bold text-gray-900 mb-6"><i class="fas fa-star text-yellow-400 mr-2"></i>Featured Content</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Main featured card -->
        <div class="bg-gray-900 rounded-2xl overflow-hidden text-white shadow-xl relative group" data-category="caregiving youtube">
          <div class="h-64 bg-gradient-to-br from-teal-800 to-gray-900 flex items-center justify-center relative">
            <span class="text-7xl">🏥</span>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <a href="#" class="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center hover:bg-red-500 transition-colors">
                <i class="fas fa-play text-white text-xl ml-1"></i>
              </a>
            </div>
            <span class="absolute top-4 left-4 pill-tag bg-red-600 text-white"><i class="fab fa-youtube mr-1"></i>YouTube</span>
            <span class="absolute top-4 right-4 pill-tag bg-teal-700 text-white">Caregiving</span>
            <span class="absolute bottom-4 right-4 text-sm bg-black/50 px-2 py-1 rounded">Coming Soon</span>
          </div>
          <div class="p-6">
            <h3 class="font-playfair text-xl font-bold mb-2">Medicare Open Enrollment 2025: The Complete Walkthrough</h3>
            <p class="text-gray-400 text-sm mb-4">Everything you need to know about comparing Medicare plans, understanding what changed, and making a smart decision for yourself or your loved one.</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <i class="far fa-calendar mr-1"></i>Coming Soon
              </div>
              <a href="/caregiving" class="text-teal-400 text-sm font-semibold hover:text-teal-300">Use the Plan Comparator →</a>
            </div>
          </div>
        </div>

        <!-- Secondary featured -->
        <div class="space-y-4">
          ${[
            { emoji: '🚀', title: 'How I Pivoted From X to Y — And How You Can Too', category: 'Career', platform: 'YouTube', catId: 'career youtube', color: 'from-purple-800 to-gray-900' },
            { emoji: '💙', title: 'The Caregiver\'s Emergency Self-Care Toolkit', category: 'Self-Care', platform: 'Instagram', catId: 'selfcare instagram', color: 'from-emerald-800 to-gray-900' },
            { emoji: '💊', title: 'Managing Multiple Medications: Tips From a Family Caregiver', category: 'Caregiving', platform: 'YouTube', catId: 'caregiving youtube', color: 'from-orange-800 to-gray-900' }
          ].map(v => `
            <div class="bg-gray-900 rounded-xl overflow-hidden text-white flex group cursor-pointer hover:ring-2 hover:ring-white/20 transition-all" data-category="${v.catId}">
              <div class="w-28 h-24 bg-gradient-to-br ${v.color} flex items-center justify-center text-4xl flex-shrink-0 relative">
                ${v.emoji}
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center">
                    <i class="fas fa-play text-white text-sm ml-0.5"></i>
                  </div>
                </div>
              </div>
              <div class="p-4 flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="pill-tag bg-gray-700 text-gray-300 text-xs">${v.platform}</span>
                  <span class="pill-tag bg-gray-700 text-gray-300 text-xs">${v.category}</span>
                </div>
                <h4 class="font-semibold text-sm leading-snug">${v.title}</h4>
                <p class="text-gray-500 text-xs mt-1">Coming Soon</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Video Grid -->
    <section class="scroll-reveal">
      <h2 class="font-playfair text-2xl font-bold text-gray-900 mb-6"><i class="fab fa-youtube text-red-600 mr-2"></i>YouTube Videos</h2>
      <div id="video-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        ${[
          { emoji: '📋', title: 'Medicare Parts A, B, C & D Explained Simply', desc: 'Breaking down the alphabet soup of Medicare in plain language you can actually use.', category: 'Caregiving', platform: 'YouTube', catId: 'caregiving youtube', status: 'upcoming' },
          { emoji: '🤝', title: 'How to Talk to Aging Parents About Care Plans', desc: 'Scripts and strategies for having the conversation everyone avoids but everyone needs.', category: 'Caregiving', platform: 'YouTube', catId: 'caregiving youtube', status: 'upcoming' },
          { emoji: '📊', title: 'Transferable Skills: You Have More Than You Think', desc: 'A live audit of the top 10 skills that translate across industries.', category: 'Career', platform: 'YouTube', catId: 'career youtube', status: 'upcoming' },
          { emoji: '🗓️', title: 'Building a Job Search Strategy That Actually Works', desc: 'Stop shotgun applying. Build a targeted, strategic job search with real results.', category: 'Career', platform: 'YouTube', catId: 'career youtube', status: 'upcoming' },
          { emoji: '🧘', title: '5-Minute Self-Care for the Exhausted Caregiver', desc: 'When you have almost no time — this is what to do in the time you have.', category: 'Self-Care', platform: 'YouTube', catId: 'selfcare youtube', status: 'upcoming' },
          { emoji: '🔥', title: 'Recognizing Burnout Before It Breaks You', desc: 'The early warning signs and the immediate steps to stop the spiral.', category: 'Self-Care', platform: 'YouTube', catId: 'selfcare youtube', status: 'upcoming' }
        ].map(v => `
          <div class="media-item card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100" data-category="${v.catId}">
            <div class="h-44 bg-gray-900 flex items-center justify-center relative group cursor-pointer">
              <div class="bg-gradient-to-br from-gray-700 to-gray-900 absolute inset-0 flex items-center justify-center text-5xl">${v.emoji}</div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center hover:bg-red-500 cursor-pointer transition-colors z-10">
                  <i class="fas fa-play text-white ml-0.5"></i>
                </div>
              </div>
              <span class="absolute top-3 left-3 pill-tag bg-red-600 text-white text-xs"><i class="fab fa-youtube mr-1"></i>${v.platform}</span>
              <span class="absolute top-3 right-3 text-xs bg-black/70 text-white px-2 py-1 rounded-full">${v.status === 'upcoming' ? 'Coming Soon' : 'Watch Now'}</span>
            </div>
            <div class="p-4">
              <span class="pill-tag text-xs mb-2 inline-block ${v.category === 'Caregiving' ? 'bg-teal-100 text-teal-700' : v.category === 'Career' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}">${v.category}</span>
              <h4 class="font-playfair font-bold text-gray-900 text-base leading-snug mb-2">${v.title}</h4>
              <p class="text-gray-500 text-xs leading-relaxed">${v.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Instagram Content -->
    <section class="scroll-reveal">
      <h2 class="font-playfair text-2xl font-bold text-gray-900 mb-6"><i class="fab fa-instagram text-pink-600 mr-2"></i>Instagram Highlights</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        ${[
          { emoji: '💪', caption: 'Caregiver strength tip', category: 'caregiving instagram' },
          { emoji: '☀️', caption: 'Morning routine', category: 'selfcare instagram' },
          { emoji: '📌', caption: 'Career pivot quote', category: 'career instagram' },
          { emoji: '🫂', caption: 'Caregiver support', category: 'caregiving instagram' },
          { emoji: '🌿', caption: 'Wellness Wednesday', category: 'selfcare instagram' },
          { emoji: '💡', caption: 'Career insight', category: 'career instagram' },
          { emoji: '❤️', caption: 'Medicare tip', category: 'caregiving instagram' },
          { emoji: '🎯', caption: 'Goal setting', category: 'career instagram' },
          { emoji: '🧘', caption: 'Mindful moment', category: 'selfcare instagram' },
          { emoji: '📖', caption: 'Article preview', category: 'caregiving instagram' },
          { emoji: '🌟', caption: 'Weekly inspiration', category: 'selfcare instagram' },
          { emoji: '💼', caption: 'LinkedIn tip', category: 'career instagram' }
        ].map(p => `
          <div class="media-item aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-sm relative group" data-category="${p.category}">
            <span class="text-4xl mb-1">${p.emoji}</span>
            <span class="text-xs text-gray-600 text-center px-1 font-medium">${p.caption}</span>
            <div class="absolute inset-0 bg-gradient-to-br from-pink-500/80 to-purple-600/80 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="fab fa-instagram text-white text-2xl"></i>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="text-center mt-6">
        <a href="#" class="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full hover:from-pink-400 hover:to-purple-500 transition-all text-sm">
          <i class="fab fa-instagram"></i>Follow on Instagram
        </a>
      </div>
    </section>

    <!-- LinkedIn Articles -->
    <section class="scroll-reveal">
      <h2 class="font-playfair text-2xl font-bold text-gray-900 mb-6"><i class="fab fa-linkedin text-blue-700 mr-2"></i>LinkedIn Articles</h2>
      <div class="bg-blue-50 rounded-2xl p-8 border border-blue-200">
        <p class="text-gray-600 mb-6">These in-depth articles are published on LinkedIn and are being transformed into video content. Click any article to read the full version on LinkedIn.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${[
            { title: 'The Hidden Cost of Caregiving: What No One Talks About', category: 'Caregiving', reads: 'High engagement' },
            { title: 'Why Your Career Pivot is Already in Progress', category: 'Career', reads: 'Trending' },
            { title: 'Dear Caregiver: You Deserve a Day Off', category: 'Self-Care', reads: 'Most shared' },
            { title: 'Medicare 101: What Your Parents Need You to Know', category: 'Caregiving', reads: 'High engagement' },
            { title: 'The Pivot That Changed Everything: My Story', category: 'Career', reads: 'Popular' },
            { title: 'Saying No: The Most Loving Thing a Caregiver Can Do', category: 'Self-Care', reads: 'Trending' }
          ].map(a => `
            <a href="#" class="flex items-start gap-4 p-4 bg-white rounded-xl border border-blue-100 hover:border-blue-400 transition-all group">
              <div class="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center flex-shrink-0">
                <i class="fab fa-linkedin-in text-white"></i>
              </div>
              <div class="flex-1 min-w-0">
                <span class="pill-tag text-xs mb-1 inline-block ${a.category === 'Caregiving' ? 'bg-teal-100 text-teal-700' : a.category === 'Career' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}">${a.category}</span>
                <h4 class="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors text-sm leading-snug">${a.title}</h4>
                <span class="text-xs text-gray-400 mt-0.5 block">${a.reads}</span>
              </div>
              <i class="fas fa-external-link-alt text-gray-300 group-hover:text-blue-500 text-xs flex-shrink-0 mt-1"></i>
            </a>
          `).join('')}
        </div>
        <div class="text-center mt-6">
          <a href="#" class="inline-flex items-center gap-2 px-6 py-2 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-600 transition-colors text-sm">
            <i class="fab fa-linkedin-in"></i>View All Articles on LinkedIn
          </a>
        </div>
      </div>
    </section>

    <!-- Add Your Video / CTA for Notifications -->
    <section class="scroll-reveal bg-gray-900 rounded-3xl p-10 text-white text-center">
      <i class="fas fa-bell text-yellow-400 text-3xl mb-4"></i>
      <h2 class="font-playfair text-3xl font-bold mb-3">Never Miss a New Video</h2>
      <p class="text-gray-400 max-w-lg mx-auto mb-6">New content is coming soon! Subscribe to YouTube and turn on notifications — or enter your email below to be alerted when each new video drops.</p>
      <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4" onsubmit="handleNotify(event)">
        <input type="email" id="notify-email" placeholder="your@email.com" required
          class="flex-1 px-5 py-3 rounded-full bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm" />
        <button type="submit" class="px-6 py-3 bg-red-600 hover:bg-red-500 font-bold rounded-full text-sm transition-colors whitespace-nowrap">
          <i class="fas fa-bell mr-2"></i>Notify Me
        </button>
      </form>
      <p id="notify-msg" class="text-yellow-300 text-sm hidden">✓ You're on the list! We'll notify you when new videos drop.</p>
      <a href="#" class="mt-4 inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm">
        <i class="fab fa-youtube text-lg"></i>Subscribe on YouTube
      </a>
    </section>

  </div>

  <script>
    function filterMedia(category) {
      // Update button styles
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-gray-800','text-white');
        btn.classList.add('bg-gray-100','text-gray-700');
      });
      document.getElementById('filter-' + category)?.classList.add('bg-gray-800','text-white');
      document.getElementById('filter-' + category)?.classList.remove('bg-gray-100','text-gray-700');

      // Filter items
      document.querySelectorAll('.media-item').forEach(item => {
        const cat = item.getAttribute('data-category') || '';
        if (category === 'all' || cat.includes(category)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }

    function handleNotify(e) {
      e.preventDefault();
      document.getElementById('notify-email').value = '';
      document.getElementById('notify-msg').classList.remove('hidden');
      setTimeout(() => document.getElementById('notify-msg').classList.add('hidden'), 4000);
    }
  </script>
  `

  return c.html(layout('Media Hub', content, 'media'))
}
