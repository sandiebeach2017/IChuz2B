import type { Context } from 'hono'
import { layout } from '../layout'

export const caregivingPage = (c: Context) => {
  const content = `
  <!-- Page Hero -->
  <section class="gradient-care text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 30% 60%, white 1px, transparent 1px); background-size: 40px 40px;"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="flex items-center gap-2 mb-4">
        <a href="/" class="text-teal-200 hover:text-white text-sm">Home</a>
        <i class="fas fa-chevron-right text-xs text-teal-300"></i>
        <span class="text-white text-sm font-semibold">Caregiving</span>
      </div>
      <div class="max-w-3xl">
        <span class="pill-tag bg-teal-500/40 text-teal-100 mb-4">Caregiving Resources</span>
        <h1 class="font-playfair text-5xl font-bold mb-4">Your Complete<br/><span class="text-yellow-300">Caregiving Hub</span></h1>
        <p class="text-teal-100 text-xl leading-relaxed">Everything you need to care confidently — from Medicare plan comparisons to medication scheduling and connecting with the support you deserve.</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        ${[
          { icon: 'fa-shield-alt', label: 'Medicare Comparator', id: 'medicare' },
          { icon: 'fa-pills', label: 'Medication Scheduler', id: 'medication' },
          { icon: 'fa-hands-helping', label: 'Find Support', id: 'support' },
          { icon: 'fa-book-open', label: 'Care Guides', id: 'guides' }
        ].map(t => `
          <button onclick="scrollToSection('${t.id}')" class="bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl p-4 text-center transition-all border border-white/20 cursor-pointer">
            <i class="fas ${t.icon} text-2xl mb-2 text-yellow-300"></i>
            <div class="text-sm font-semibold">${t.label}</div>
          </button>
        `).join('')}
      </div>
    </div>
    <svg class="hero-wave" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#f9fafb"/>
    </svg>
  </section>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

    <!-- ============================================================
         SECTION 1: MEDICARE PLAN COMPARATOR
    ============================================================ -->
    <section id="medicare" class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
          <i class="fas fa-shield-alt text-teal-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Medicare Plan Comparator</h2>
          <p class="text-gray-500 text-sm">Compare current & upcoming year plans side-by-side</p>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <i class="fas fa-info-circle text-blue-500 mt-0.5 flex-shrink-0"></i>
        <div class="text-sm text-blue-800">
          <strong>How to use:</strong> Enter the key details of your <strong>Current Year</strong> Medicare plan and your <strong>New Year</strong> plan options below. Click <strong>Compare Plans</strong> to see a side-by-side analysis highlighting what changed, what's the same, and what to discuss with your insurance broker. Medicare guidebooks are distributed twice a year — use this tool during Open Enrollment (Oct 15 – Dec 7) to make the best decision.
        </div>
      </div>

      <!-- Medicare Tabs -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="flex border-b border-gray-200">
          <button onclick="switchMedicarTab('input')" id="mtab-input" class="tab-btn tab-active flex-1 py-4 text-sm font-semibold text-center border-b-2 border-blue-600">
            <i class="fas fa-edit mr-2"></i>Enter Plan Details
          </button>
          <button onclick="switchMedicarTab('compare')" id="mtab-compare" class="tab-btn flex-1 py-4 text-sm font-semibold text-center text-gray-500 hover:text-blue-600">
            <i class="fas fa-columns mr-2"></i>Side-by-Side Comparison
          </button>
          <button onclick="switchMedicarTab('guide')" id="mtab-guide" class="tab-btn flex-1 py-4 text-sm font-semibold text-center text-gray-500 hover:text-blue-600">
            <i class="fas fa-book mr-2"></i>Medicare Guide
          </button>
        </div>

        <!-- Input Tab -->
        <div id="mtab-content-input" class="p-6 tab-content active">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Current Year -->
            <div>
              <div class="flex items-center gap-3 mb-5">
                <span class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</span>
                <h3 class="font-bold text-gray-800 text-lg">Current Year Plan (2024)</h3>
              </div>
              <div class="space-y-4">
                ${[
                  { id: 'cy-plantype', label: 'Plan Type', type: 'select', opts: ['Original Medicare (Parts A & B)', 'Medicare Advantage (Part C)', 'Medicare Supplement (Medigap)', 'Prescription Drug Plan (Part D)'] },
                  { id: 'cy-planname', label: 'Plan / Insurance Company Name', type: 'text', ph: 'e.g., AARP MedicareComplete' },
                  { id: 'cy-premium', label: 'Monthly Premium ($)', type: 'number', ph: '0.00' },
                  { id: 'cy-deductible', label: 'Annual Deductible ($)', type: 'number', ph: '0.00' },
                  { id: 'cy-oop', label: 'Out-of-Pocket Maximum ($)', type: 'number', ph: '0.00' },
                  { id: 'cy-copay', label: 'Primary Care Copay ($)', type: 'number', ph: '0.00' },
                  { id: 'cy-specialist', label: 'Specialist Copay ($)', type: 'number', ph: '0.00' },
                  { id: 'cy-drug', label: 'Drug Coverage (Part D)?', type: 'select', opts: ['Yes - Included', 'Yes - Separate Plan', 'No'] },
                  { id: 'cy-network', label: 'Network Type', type: 'select', opts: ['HMO', 'PPO', 'PFFS', 'SNP', 'N/A'] },
                  { id: 'cy-dental', label: 'Dental Coverage', type: 'select', opts: ['Included', 'Not Included', 'Extra Cost'] },
                  { id: 'cy-vision', label: 'Vision Coverage', type: 'select', opts: ['Included', 'Not Included', 'Extra Cost'] },
                  { id: 'cy-star', label: 'Star Rating (1-5)', type: 'number', ph: '4.5' },
                  { id: 'cy-notes', label: 'Other Notes', type: 'textarea', ph: 'Any additional coverage details...' }
                ].map(f => `
                  <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">${f.label}</label>
                    ${f.type === 'select' ? `
                      <select id="${f.id}" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none">
                        ${f.opts!.map(o => `<option>${o}</option>`).join('')}
                      </select>
                    ` : f.type === 'textarea' ? `
                      <textarea id="${f.id}" rows="2" placeholder="${f.ph}" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none"></textarea>
                    ` : `
                      <input type="${f.type}" id="${f.id}" placeholder="${f.ph || ''}" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none" />
                    `}
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- New Year -->
            <div>
              <div class="flex items-center gap-3 mb-5">
                <span class="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">2</span>
                <h3 class="font-bold text-gray-800 text-lg">New Year Plan (2025)</h3>
              </div>
              <div class="space-y-4">
                ${[
                  { id: 'ny-plantype', label: 'Plan Type', type: 'select', opts: ['Original Medicare (Parts A & B)', 'Medicare Advantage (Part C)', 'Medicare Supplement (Medigap)', 'Prescription Drug Plan (Part D)'] },
                  { id: 'ny-planname', label: 'Plan / Insurance Company Name', type: 'text', ph: 'e.g., Humana Gold Plus' },
                  { id: 'ny-premium', label: 'Monthly Premium ($)', type: 'number', ph: '0.00' },
                  { id: 'ny-deductible', label: 'Annual Deductible ($)', type: 'number', ph: '0.00' },
                  { id: 'ny-oop', label: 'Out-of-Pocket Maximum ($)', type: 'number', ph: '0.00' },
                  { id: 'ny-copay', label: 'Primary Care Copay ($)', type: 'number', ph: '0.00' },
                  { id: 'ny-specialist', label: 'Specialist Copay ($)', type: 'number', ph: '0.00' },
                  { id: 'ny-drug', label: 'Drug Coverage (Part D)?', type: 'select', opts: ['Yes - Included', 'Yes - Separate Plan', 'No'] },
                  { id: 'ny-network', label: 'Network Type', type: 'select', opts: ['HMO', 'PPO', 'PFFS', 'SNP', 'N/A'] },
                  { id: 'ny-dental', label: 'Dental Coverage', type: 'select', opts: ['Included', 'Not Included', 'Extra Cost'] },
                  { id: 'ny-vision', label: 'Vision Coverage', type: 'select', opts: ['Included', 'Not Included', 'Extra Cost'] },
                  { id: 'ny-star', label: 'Star Rating (1-5)', type: 'number', ph: '4.5' },
                  { id: 'ny-notes', label: 'Other Notes', type: 'textarea', ph: 'Any additional coverage details...' }
                ].map(f => `
                  <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">${f.label}</label>
                    ${f.type === 'select' ? `
                      <select id="${f.id}" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-300 focus:outline-none">
                        ${f.opts!.map(o => `<option>${o}</option>`).join('')}
                      </select>
                    ` : f.type === 'textarea' ? `
                      <textarea id="${f.id}" rows="2" placeholder="${f.ph}" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-300 focus:outline-none resize-none"></textarea>
                    ` : `
                      <input type="${f.type}" id="${f.id}" placeholder="${f.ph || ''}" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-300 focus:outline-none" />
                    `}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="mt-8 flex flex-col sm:flex-row gap-3">
            <button onclick="comparePlans()" class="flex-1 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full transition-colors">
              <i class="fas fa-search mr-2"></i>Compare Plans
            </button>
            <button onclick="clearMedicare()" class="px-6 py-3 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 font-semibold text-sm">
              <i class="fas fa-redo mr-2"></i>Clear All
            </button>
          </div>
        </div>

        <!-- Compare Tab -->
        <div id="mtab-content-compare" class="p-6 tab-content">
          <div id="compare-placeholder" class="text-center py-12 text-gray-400">
            <i class="fas fa-columns text-5xl mb-4 block text-gray-200"></i>
            <p class="text-lg font-semibold text-gray-400">Fill in plan details and click "Compare Plans"</p>
            <p class="text-sm mt-1">Your side-by-side comparison will appear here</p>
          </div>
          <div id="compare-results" class="hidden">
            <div id="compare-table-container"></div>
            <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p class="text-sm text-yellow-800"><i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i><strong>Important:</strong> This comparison is for informational purposes only. Always review the Summary of Benefits and contact your insurance broker or call 1-800-MEDICARE (1-800-633-4227) before making a final decision.</p>
            </div>
            <div class="mt-4 flex flex-wrap gap-3">
              <div class="flex items-center gap-2 text-xs"><span class="w-4 h-4 rounded bg-green-100 border border-green-300"></span>Improved / Lower cost</div>
              <div class="flex items-center gap-2 text-xs"><span class="w-4 h-4 rounded bg-red-100 border border-red-300"></span>Increased / Higher cost</div>
              <div class="flex items-center gap-2 text-xs"><span class="w-4 h-4 rounded bg-gray-100 border border-gray-200"></span>No change</div>
            </div>
          </div>
        </div>

        <!-- Guide Tab -->
        <div id="mtab-content-guide" class="p-6 tab-content">
          <h3 class="font-playfair text-xl font-bold mb-6 text-gray-900">Medicare Quick Reference Guide</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            ${[
              { part: 'Part A', name: 'Hospital Insurance', icon: 'fa-hospital', color: 'border-blue-400 bg-blue-50', icolor: 'text-blue-600', desc: 'Covers inpatient hospital stays, skilled nursing facility care, hospice care, and some home health care. Most people don\'t pay a premium for Part A.' },
              { part: 'Part B', name: 'Medical Insurance', icon: 'fa-stethoscope', color: 'border-green-400 bg-green-50', icolor: 'text-green-600', desc: 'Covers certain doctors\' services, outpatient care, medical supplies, and preventive services. Standard monthly premium in 2024 is $174.70.' },
              { part: 'Part C', name: 'Medicare Advantage', icon: 'fa-shield-alt', color: 'border-purple-400 bg-purple-50', icolor: 'text-purple-600', desc: 'An alternative to Original Medicare offered by private companies. Often includes Part D coverage plus extras like dental, vision, and hearing.' },
              { part: 'Part D', name: 'Drug Coverage', icon: 'fa-pills', color: 'border-orange-400 bg-orange-50', icolor: 'text-orange-600', desc: 'Prescription drug coverage. Plans vary widely — compare formularies carefully for your specific medications before enrolling.' }
            ].map(p => `
              <div class="border-l-4 ${p.color} rounded-r-xl p-5">
                <div class="flex items-center gap-3 mb-2">
                  <i class="fas ${p.icon} ${p.icolor} text-xl"></i>
                  <div>
                    <span class="font-bold text-gray-900">Medicare ${p.part}</span>
                    <span class="text-gray-500 text-sm ml-2">— ${p.name}</span>
                  </div>
                </div>
                <p class="text-sm text-gray-600">${p.desc}</p>
              </div>
            `).join('')}
          </div>

          <h4 class="font-bold text-gray-800 mb-4">Key Enrollment Periods</h4>
          <div class="space-y-3 mb-8">
            ${[
              { period: 'Initial Enrollment Period (IEP)', dates: '7-month window around your 65th birthday', icon: 'fa-birthday-cake', color: 'text-blue-600' },
              { period: 'Annual Enrollment Period (AEP / Open Enrollment)', dates: 'October 15 – December 7 each year', icon: 'fa-calendar-alt', color: 'text-green-600' },
              { period: 'Medicare Advantage OEP', dates: 'January 1 – March 31 each year', icon: 'fa-calendar-check', color: 'text-purple-600' },
              { period: 'Special Enrollment Period (SEP)', dates: 'Triggered by qualifying life events', icon: 'fa-star', color: 'text-orange-600' }
            ].map(ep => `
              <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <i class="fas ${ep.icon} ${ep.color} text-lg mt-0.5 flex-shrink-0"></i>
                <div>
                  <div class="font-semibold text-gray-800 text-sm">${ep.period}</div>
                  <div class="text-gray-500 text-xs mt-0.5">${ep.dates}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="bg-teal-50 rounded-xl p-5 border border-teal-200">
            <h4 class="font-bold text-teal-800 mb-3"><i class="fas fa-external-link-alt mr-2"></i>Official Medicare Resources</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${[
                { label: 'Medicare.gov — Official Plan Finder', url: 'https://www.medicare.gov/plan-compare/', icon: 'fa-search' },
                { label: 'Download Medicare & You Handbook', url: 'https://www.medicare.gov/publications/10050-medicare-and-you.pdf', icon: 'fa-download' },
                { label: 'State Health Insurance Assistance (SHIP)', url: 'https://www.shiphelp.org/', icon: 'fa-phone' },
                { label: 'BenefitsCheckUp — Savings Programs', url: 'https://www.benefitscheckup.org/', icon: 'fa-dollar-sign' }
              ].map(r => `
                <a href="${r.url}" target="_blank" rel="noopener" class="flex items-center gap-3 p-3 bg-white rounded-lg border border-teal-200 hover:border-teal-400 transition-colors text-sm">
                  <i class="fas ${r.icon} text-teal-600 w-4"></i>
                  <span class="text-gray-700 font-medium">${r.label}</span>
                  <i class="fas fa-external-link-alt text-xs text-gray-400 ml-auto"></i>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 2: MEDICATION SCHEDULER
    ============================================================ -->
    <section id="medication" class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
          <i class="fas fa-pills text-orange-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Medication Schedule Builder</h2>
          <p class="text-gray-500 text-sm">Build your medication list and get suggested daily schedules</p>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="bg-amber-50 border border-amber-300 rounded-xl p-5 mb-6 flex items-start gap-3">
        <i class="fas fa-exclamation-triangle text-amber-500 text-xl mt-0.5 flex-shrink-0"></i>
        <div>
          <strong class="text-amber-800 block mb-1">Medical Disclaimer</strong>
          <p class="text-sm text-amber-700">This tool is designed to <strong>help you organize your medications and create a conversation starter</strong> with your healthcare team. It is <strong>not medical advice</strong>. Always review your complete medication list with your pharmacist or physician before making any changes to how or when you take your medications. Drug interactions shown are general guidance only.</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Add Medication Form -->
        <div class="p-6 border-b border-gray-100">
          <h3 class="font-bold text-gray-800 mb-5"><i class="fas fa-plus-circle text-orange-500 mr-2"></i>Add a Medication</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="lg:col-span-1">
              <label class="block text-xs font-semibold text-gray-600 mb-1">Medication Name *</label>
              <input type="text" id="med-name" placeholder="e.g., Lisinopril" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Dosage *</label>
              <input type="text" id="med-dosage" placeholder="e.g., 10mg" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Frequency *</label>
              <select id="med-frequency" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none">
                <option value="once_daily">Once Daily</option>
                <option value="twice_daily">Twice Daily</option>
                <option value="three_daily">Three Times Daily</option>
                <option value="four_daily">Four Times Daily</option>
                <option value="every_other">Every Other Day</option>
                <option value="weekly">Once Weekly</option>
                <option value="as_needed">As Needed (PRN)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Take With Food?</label>
              <select id="med-food" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none">
                <option value="no_pref">No Preference</option>
                <option value="with_food">With Food</option>
                <option value="without_food">Without Food</option>
                <option value="empty_stomach">Empty Stomach</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Category</label>
              <select id="med-category" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none">
                <option>Heart / Blood Pressure</option>
                <option>Diabetes</option>
                <option>Cholesterol</option>
                <option>Blood Thinner</option>
                <option>Pain Relief</option>
                <option>Thyroid</option>
                <option>Mental Health</option>
                <option>Respiratory</option>
                <option>Vitamin / Supplement</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Prescribing Doctor</label>
              <input type="text" id="med-doctor" placeholder="Dr. Smith" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none" />
            </div>
            <div class="sm:col-span-2 lg:col-span-2">
              <label class="block text-xs font-semibold text-gray-600 mb-1">Special Instructions</label>
              <input type="text" id="med-notes" placeholder="e.g., Avoid grapefruit, take 30min before eating" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none" />
            </div>
          </div>
          <button onclick="addMedication()" class="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors text-sm">
            <i class="fas fa-plus mr-2"></i>Add to List
          </button>
        </div>

        <!-- Medication List -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-gray-800"><i class="fas fa-list text-orange-500 mr-2"></i>My Medication List</h3>
            <span id="med-count" class="pill-tag bg-orange-100 text-orange-700">0 medications</span>
          </div>
          <div id="med-list-empty" class="text-center py-8 text-gray-400">
            <i class="fas fa-prescription-bottle-alt text-5xl mb-3 block text-gray-200"></i>
            <p>No medications added yet. Fill in the form above to get started.</p>
          </div>
          <div id="med-table-wrapper" class="hidden">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-xs font-semibold text-gray-500 border-b border-gray-100">
                  <th class="pb-3 pr-4">Medication</th>
                  <th class="pb-3 pr-4">Dosage</th>
                  <th class="pb-3 pr-4">Frequency</th>
                  <th class="pb-3 pr-4">Food</th>
                  <th class="pb-3 pr-4">Category</th>
                  <th class="pb-3 pr-4">Doctor</th>
                  <th class="pb-3">Action</th>
                </tr>
              </thead>
              <tbody id="med-table-body"></tbody>
            </table>
          </div>
        </div>

        <!-- Generate Schedule -->
        <div class="p-6">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 class="font-bold text-gray-800"><i class="fas fa-clock text-orange-500 mr-2"></i>Suggested Daily Schedules</h3>
            <button onclick="generateSchedules()" id="gen-schedule-btn" class="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full transition-colors text-sm disabled:opacity-50" disabled>
              <i class="fas fa-magic mr-2"></i>Generate 3 Schedules
            </button>
          </div>

          <div id="schedule-placeholder" class="text-center py-8 text-gray-400">
            <i class="fas fa-calendar-alt text-5xl mb-3 block text-gray-200"></i>
            <p>Add at least 1 medication and click "Generate 3 Schedules"</p>
          </div>

          <div id="schedules-container" class="hidden space-y-6">
            <div id="schedule-output"></div>
            <div class="bg-red-50 border border-red-200 rounded-xl p-4">
              <p class="text-sm text-red-800 font-medium"><i class="fas fa-user-md text-red-500 mr-2"></i><strong>Use these schedules as a starting point for a conversation with your pharmacist or doctor.</strong> This tool does not account for all drug interactions, individual health conditions, or medical history. This is <em>not</em> a substitute for professional medical advice.</p>
            </div>
            <div class="flex flex-wrap gap-3 mt-4">
              <button onclick="window.print()" class="px-5 py-2 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 text-sm font-semibold">
                <i class="fas fa-print mr-2"></i>Print Schedule
              </button>
              <button onclick="exportSchedule()" class="px-5 py-2 border border-teal-300 text-teal-600 rounded-full hover:bg-teal-50 text-sm font-semibold">
                <i class="fas fa-download mr-2"></i>Save as Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 3: CAREGIVER SUPPORT
    ============================================================ -->
    <section id="support" class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
          <i class="fas fa-hands-helping text-pink-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Find Caregiver Support</h2>
          <p class="text-gray-500 text-sm">You don't have to do this alone — help is available</p>
        </div>
      </div>

      <div class="bg-pink-50 border border-pink-200 rounded-xl p-5 mb-8 flex items-start gap-4">
        <i class="fas fa-heart text-pink-500 text-2xl mt-0.5 flex-shrink-0"></i>
        <div>
          <strong class="text-pink-800 block mb-1">You matter too.</strong>
          <p class="text-sm text-pink-700">Caregiving is one of the most selfless acts a person can do — and one of the most exhausting. Asking for help is a sign of strength, not weakness. Below are trusted resources to help you find the support you need, when you need it.</p>
        </div>
      </div>

      <!-- Crisis / Urgent -->
      <div class="bg-red-600 rounded-2xl p-6 mb-8 text-white">
        <h3 class="font-bold text-xl mb-4"><i class="fas fa-phone-alt mr-2 text-yellow-300"></i>Immediate Help & Crisis Lines</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${[
            { name: '988 Suicide & Crisis Lifeline', num: 'Call or Text 988', desc: 'Free, confidential mental health crisis support 24/7', icon: 'fa-phone' },
            { name: 'Caregiver Action Network Hotline', num: '1-855-227-3640', desc: 'Peer support and caregiver advocacy', icon: 'fa-headset' },
            { name: 'ELDERCARE Locator', num: '1-800-677-1116', desc: 'Connects to local support services for older adults', icon: 'fa-map-marker-alt' }
          ].map(cr => `
            <div class="bg-white/15 rounded-xl p-4">
              <i class="fas ${cr.icon} text-yellow-300 text-xl mb-2"></i>
              <div class="font-bold text-sm">${cr.name}</div>
              <div class="text-yellow-200 font-semibold text-sm mt-1">${cr.num}</div>
              <div class="text-red-100 text-xs mt-1">${cr.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Support Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          {
            title: 'National Caregiver Organizations',
            icon: 'fa-building', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200',
            resources: [
              { name: 'AARP Caregiver Resource Center', url: 'https://www.aarp.org/caregiving/', desc: 'Guides, tools, and community for family caregivers' },
              { name: 'Family Caregiver Alliance', url: 'https://www.caregiver.org/', desc: 'Education, research, and policy advocacy' },
              { name: 'Caregiver Action Network', url: 'https://www.caregiveraction.org/', desc: 'Support for all types of family caregivers' },
              { name: 'National Alliance for Caregiving', url: 'https://www.caregiving.org/', desc: 'Research and policy for caregiving issues' }
            ]
          },
          {
            title: 'Respite Care & Time Off',
            icon: 'fa-home', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200',
            resources: [
              { name: 'ARCH National Respite Network', url: 'https://archrespite.org/', desc: 'Find local respite care services' },
              { name: 'VA Caregiver Support Program', url: 'https://www.caregiver.va.gov/', desc: 'For veteran caregivers — stipends & services' },
              { name: 'Adult Day Service Locator', url: 'https://www.nadsa.org/consumers/get-started/', desc: 'Find adult day care programs near you' },
              { name: 'Meals on Wheels America', url: 'https://www.mealsonwheelsamerica.org/', desc: 'Nutrition support to help care at home' }
            ]
          },
          {
            title: 'Mental Health & Burnout',
            icon: 'fa-brain', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200',
            resources: [
              { name: 'Psychology Today Therapist Finder', url: 'https://www.psychologytoday.com/us/therapists', desc: 'Find therapists who specialize in caregiver stress' },
              { name: 'Well Spouse Association', url: 'https://www.wellspouse.org/', desc: 'Support for spousal caregivers' },
              { name: 'Caregiver Support Groups (AARP)', url: 'https://local.aarp.org/aarp-programs/', desc: 'Online & in-person peer groups' },
              { name: 'Mental Health America', url: 'https://mhanational.org/', desc: 'Tools and screeners for caregiver mental wellness' }
            ]
          },
          {
            title: 'Financial Assistance',
            icon: 'fa-dollar-sign', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200',
            resources: [
              { name: 'Benefits.gov', url: 'https://www.benefits.gov/', desc: 'Federal benefit eligibility checker' },
              { name: 'Medicaid Caregiver Programs', url: 'https://www.medicaid.gov/medicaid/home-community-based-services/', desc: 'Home and community-based care options' },
              { name: 'Social Security Disability (SSDI)', url: 'https://www.ssa.gov/benefits/disability/', desc: 'Benefits for disabled adults' },
              { name: 'NeedyMeds', url: 'https://www.needymeds.org/', desc: 'Free/low-cost medication assistance programs' }
            ]
          },
          {
            title: 'Legal & Advance Planning',
            icon: 'fa-gavel', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200',
            resources: [
              { name: 'Five Wishes (Aging with Dignity)', url: 'https://fivewishes.org/', desc: 'Advance directive / living will tool' },
              { name: 'National Academy of Elder Law', url: 'https://www.naela.org/', desc: 'Find elder law attorneys near you' },
              { name: 'Caring Info (NHPCO)', url: 'https://www.nhpco.org/patients-and-caregivers/', desc: 'Hospice and palliative care information' },
              { name: 'Long-Term Care Planning (ACL)', url: 'https://acl.gov/', desc: 'Administration for Community Living resources' }
            ]
          },
          {
            title: 'Dementia & Alzheimer\'s',
            icon: 'fa-puzzle-piece', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200',
            resources: [
              { name: 'Alzheimer\'s Association', url: 'https://www.alz.org/', desc: '24/7 helpline: 1-800-272-3900' },
              { name: 'Alzheimer\'s Foundation of America', url: 'https://alzfdn.org/', desc: 'Free memory screenings & education' },
              { name: 'Dementia Care Central', url: 'https://www.dementiacarecentral.com/', desc: 'Practical guides for dementia caregivers' },
              { name: 'Lewy Body Dementia Association', url: 'https://www.lbda.org/', desc: 'Support for LBD families' }
            ]
          }
        ].map(cat => `
          <div class="card-hover bg-white border ${cat.border} rounded-2xl overflow-hidden">
            <div class="${cat.bg} px-5 py-4 border-b ${cat.border}">
              <div class="flex items-center gap-3">
                <i class="fas ${cat.icon} ${cat.color} text-xl"></i>
                <h4 class="font-bold text-gray-800">${cat.title}</h4>
              </div>
            </div>
            <div class="p-5 space-y-3">
              ${cat.resources.map(r => `
                <a href="${r.url}" target="_blank" rel="noopener" class="block group">
                  <div class="font-semibold text-sm text-gray-800 group-hover:${cat.color} transition-colors">${r.name} <i class="fas fa-external-link-alt text-xs text-gray-300 group-hover:text-gray-500"></i></div>
                  <div class="text-xs text-gray-500 mt-0.5">${r.desc}</div>
                </a>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ============================================================
         SECTION 4: CARE GUIDES
    ============================================================ -->
    <section id="guides" class="scroll-reveal">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <i class="fas fa-book-open text-blue-600 text-xl"></i>
        </div>
        <div>
          <h2 class="font-playfair text-3xl font-bold text-gray-900">Caregiving Guides & Articles</h2>
          <p class="text-gray-500 text-sm">Practical wisdom for every stage of the caregiving journey</p>
        </div>
      </div>

      <div class="space-y-4">
        ${[
          {
            title: 'Starting the Caregiving Conversation with Your Family',
            category: 'Family Planning', time: '7 min read',
            summary: 'Having "the talk" is never easy — but starting the conversation early can prevent crisis decision-making later. This guide walks you through how to bring up care planning with aging parents or loved ones with compassion and clarity.',
            tips: ['Choose a calm moment, not a crisis', 'Use "I" statements to avoid blame', 'Involve a neutral third party if needed', 'Document wishes in writing']
          },
          {
            title: 'How to Evaluate a Skilled Nursing Facility or Assisted Living Community',
            category: 'Care Placement', time: '10 min read',
            summary: 'Whether you\'re exploring assisted living, memory care, or skilled nursing, this guide gives you the exact questions to ask, red flags to watch for, and a printable evaluation checklist.',
            tips: ['Visit at different times of day', 'Check state inspection reports at CMS.gov', 'Ask about staff-to-resident ratios', 'Review the arbitration agreement carefully']
          },
          {
            title: 'Navigating the Hospital-to-Home Transition',
            category: 'Hospital Care', time: '8 min read',
            summary: 'Discharge from the hospital is one of the riskiest periods for older adults. Learn how to communicate with the care team, what questions to ask before leaving, and how to set up a safe home environment.',
            tips: ['Ask for a written discharge plan', 'Confirm all follow-up appointments before leaving', 'Request a 24-hour nurse line number', 'Confirm all new prescriptions are filled']
          },
          {
            title: 'The Caregiver\'s Guide to Managing Medications at Home',
            category: 'Medication Management', time: '6 min read',
            summary: 'Managing 5, 10, or even 15+ medications for a loved one requires systems and vigilance. This guide covers pill organizers, tracking apps, pharmacy partnerships, and how to identify concerning side effects.',
            tips: ['Create a master medication list with photos', 'Use a weekly pill organizer', 'Set phone alarms for timing', 'Ask the pharmacist for a medication review annually']
          },
          {
            title: 'Recognizing and Preventing Caregiver Burnout',
            category: 'Caregiver Wellness', time: '5 min read',
            summary: 'Burnout doesn\'t happen overnight — it builds over time through chronic stress, sleep deprivation, and loss of identity. Learn the warning signs and evidence-based strategies to protect your own health.',
            tips: ['Schedule and protect your own appointments', 'Accept help when offered (say yes!)', 'Connect with a peer support group', 'Practice the HALT check: Hungry, Angry, Lonely, Tired?']
          }
        ].map((g, i) => `
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <button class="accordion-btn w-full text-left px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div class="flex items-start gap-4">
                <span class="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">${i + 1}</span>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="pill-tag bg-teal-100 text-teal-700 text-xs">${g.category}</span>
                    <span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i>${g.time}</span>
                  </div>
                  <span class="font-playfair font-bold text-gray-900 text-lg">${g.title}</span>
                </div>
              </div>
              <i class="fas fa-chevron-down text-gray-400 flex-shrink-0 ml-4 acc-icon transition-transform"></i>
            </button>
            <div class="accordion-content">
              <div class="px-6 pb-6 pt-2 border-t border-gray-50">
                <p class="text-gray-600 text-sm leading-relaxed mb-4">${g.summary}</p>
                <div>
                  <strong class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Key Tips:</strong>
                  <ul class="mt-2 space-y-1">
                    ${g.tips.map(t => `<li class="flex items-center gap-2 text-sm text-gray-600"><i class="fas fa-check-circle text-teal-500 flex-shrink-0 text-xs"></i>${t}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

  </div>

  <!-- Medication Modal for viewing full schedule -->
  <div id="schedule-modal" class="modal">
    <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto p-6 relative">
      <button onclick="closeModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
        <i class="fas fa-times text-gray-600"></i>
      </button>
      <div id="modal-content"></div>
    </div>
  </div>

  <script>
    // ---- Medicare Comparator ----
    function switchMedicarTab(tab) {
      ['input','compare','guide'].forEach(t => {
        document.getElementById('mtab-content-' + t).classList.remove('active');
        document.getElementById('mtab-' + t).classList.remove('tab-active');
        document.getElementById('mtab-' + t).classList.add('text-gray-500');
      });
      document.getElementById('mtab-content-' + tab).classList.add('active');
      document.getElementById('mtab-' + tab).classList.add('tab-active');
      document.getElementById('mtab-' + tab).classList.remove('text-gray-500');
    }

    function getVal(id) { return (document.getElementById(id)?.value || '').trim(); }

    function comparePlans() {
      const fields = [
        { label: 'Plan Type', cy: 'cy-plantype', ny: 'ny-plantype', type: 'text' },
        { label: 'Plan Name', cy: 'cy-planname', ny: 'ny-planname', type: 'text' },
        { label: 'Monthly Premium', cy: 'cy-premium', ny: 'ny-premium', type: 'cost', prefix: '$', lower: 'better' },
        { label: 'Annual Deductible', cy: 'cy-deductible', ny: 'ny-deductible', type: 'cost', prefix: '$', lower: 'better' },
        { label: 'Out-of-Pocket Max', cy: 'cy-oop', ny: 'ny-oop', type: 'cost', prefix: '$', lower: 'better' },
        { label: 'Primary Care Copay', cy: 'cy-copay', ny: 'ny-copay', type: 'cost', prefix: '$', lower: 'better' },
        { label: 'Specialist Copay', cy: 'cy-specialist', ny: 'ny-specialist', type: 'cost', prefix: '$', lower: 'better' },
        { label: 'Drug Coverage', cy: 'cy-drug', ny: 'ny-drug', type: 'text' },
        { label: 'Network Type', cy: 'cy-network', ny: 'ny-network', type: 'text' },
        { label: 'Dental Coverage', cy: 'cy-dental', ny: 'ny-dental', type: 'text' },
        { label: 'Vision Coverage', cy: 'cy-vision', ny: 'ny-vision', type: 'text' },
        { label: 'Star Rating', cy: 'cy-star', ny: 'ny-star', type: 'cost', prefix: '', lower: 'worse' },
        { label: 'Notes', cy: 'cy-notes', ny: 'ny-notes', type: 'text' }
      ];
      let rows = '';
      let changes = 0, same = 0;
      fields.forEach(f => {
        const cv = getVal(f.cy), nv = getVal(f.ny);
        let rowClass = '';
        let changeIcon = '';
        if (!cv && !nv) return;
        if (cv === nv) {
          rowClass = 'bg-gray-50';
          changeIcon = '<span class="text-gray-400 text-xs">Same</span>';
          same++;
        } else if (f.type === 'cost' && cv && nv) {
          const diff = parseFloat(nv) - parseFloat(cv);
          const improved = (f.lower === 'better') ? diff < 0 : diff > 0;
          rowClass = improved ? 'bg-green-50' : 'bg-red-50';
          const pct = cv !== '0' ? Math.abs(Math.round((diff / parseFloat(cv)) * 100)) : '';
          changeIcon = improved
            ? '<span class="text-green-700 text-xs font-bold"><i class="fas fa-arrow-down mr-1"></i>Improved' + (pct ? ' (' + pct + '%)' : '') + '</span>'
            : '<span class="text-red-700 text-xs font-bold"><i class="fas fa-arrow-up mr-1"></i>Increased' + (pct ? ' (' + pct + '%)' : '') + '</span>';
          changes++;
        } else {
          rowClass = 'bg-yellow-50';
          changeIcon = '<span class="text-yellow-700 text-xs font-bold">Changed</span>';
          changes++;
        }
        rows += '<tr class="' + rowClass + ' border-b border-gray-100"><td class="py-3 px-4 text-sm font-semibold text-gray-700 w-1/4">' + f.label + '</td><td class="py-3 px-4 text-sm text-gray-800">' + (cv ? (f.prefix || '') + cv : '<span class="text-gray-400">—</span>') + '</td><td class="py-3 px-4 text-sm text-gray-800">' + (nv ? (f.prefix || '') + nv : '<span class="text-gray-400">—</span>') + '</td><td class="py-3 px-4">' + changeIcon + '</td></tr>';
      });
      const html = '<div class="mb-4 grid grid-cols-3 gap-4"><div class="text-center bg-blue-50 rounded-lg p-3"><div class="text-2xl font-bold text-blue-700">' + changes + '</div><div class="text-xs text-blue-600">Changes Found</div></div><div class="text-center bg-gray-50 rounded-lg p-3"><div class="text-2xl font-bold text-gray-600">' + same + '</div><div class="text-xs text-gray-500">Same as Before</div></div><div class="text-center bg-yellow-50 rounded-lg p-3"><div class="text-2xl font-bold text-yellow-700">' + (changes > 0 ? 'Review' : 'OK') + '</div><div class="text-xs text-yellow-600">Recommendation</div></div></div><table class="w-full text-sm"><thead><tr class="border-b-2 border-gray-200"><th class="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase">Field</th><th class="py-3 px-4 text-left text-xs font-bold text-blue-600 uppercase">Current Year (2024)</th><th class="py-3 px-4 text-left text-xs font-bold text-green-600 uppercase">New Year (2025)</th><th class="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase">Verdict</th></tr></thead><tbody>' + rows + '</tbody></table>';
      document.getElementById('compare-table-container').innerHTML = html;
      document.getElementById('compare-placeholder').classList.add('hidden');
      document.getElementById('compare-results').classList.remove('hidden');
      switchMedicarTab('compare');
    }

    function clearMedicare() {
      document.querySelectorAll('[id^="cy-"], [id^="ny-"]').forEach(el => {
        if (el.tagName === 'SELECT') el.selectedIndex = 0;
        else el.value = '';
      });
    }

    // ---- Medication Scheduler ----
    let medications = [];

    function addMedication() {
      const name = document.getElementById('med-name').value.trim();
      const dosage = document.getElementById('med-dosage').value.trim();
      const frequency = document.getElementById('med-frequency').value;
      const food = document.getElementById('med-food').value;
      const category = document.getElementById('med-category').value;
      const doctor = document.getElementById('med-doctor').value.trim();
      const notes = document.getElementById('med-notes').value.trim();
      if (!name || !dosage) { alert('Please enter medication name and dosage.'); return; }
      medications.push({ id: Date.now(), name, dosage, frequency, food, category, doctor, notes });
      renderMedTable();
      document.getElementById('med-name').value = '';
      document.getElementById('med-dosage').value = '';
      document.getElementById('med-notes').value = '';
      document.getElementById('med-doctor').value = '';
    }

    function removeMedication(id) {
      medications = medications.filter(m => m.id !== id);
      renderMedTable();
      document.getElementById('schedules-container').classList.add('hidden');
      document.getElementById('schedule-placeholder').classList.remove('hidden');
    }

    const freqLabels = { once_daily: '1x/day', twice_daily: '2x/day', three_daily: '3x/day', four_daily: '4x/day', every_other: 'Every other day', weekly: 'Weekly', as_needed: 'As needed' };
    const foodLabels = { no_pref: 'No pref.', with_food: 'With food', without_food: 'Without food', empty_stomach: 'Empty stomach' };

    function renderMedTable() {
      const count = medications.length;
      document.getElementById('med-count').textContent = count + ' medication' + (count !== 1 ? 's' : '');
      if (count === 0) {
        document.getElementById('med-list-empty').classList.remove('hidden');
        document.getElementById('med-table-wrapper').classList.add('hidden');
        document.getElementById('gen-schedule-btn').disabled = true;
      } else {
        document.getElementById('med-list-empty').classList.add('hidden');
        document.getElementById('med-table-wrapper').classList.remove('hidden');
        document.getElementById('gen-schedule-btn').disabled = false;
      }
      const catColors = { 'Heart / Blood Pressure': 'bg-red-100 text-red-700', 'Diabetes': 'bg-blue-100 text-blue-700', 'Cholesterol': 'bg-yellow-100 text-yellow-700', 'Blood Thinner': 'bg-pink-100 text-pink-700', 'Pain Relief': 'bg-orange-100 text-orange-700', 'Thyroid': 'bg-purple-100 text-purple-700', 'Mental Health': 'bg-indigo-100 text-indigo-700', 'Respiratory': 'bg-sky-100 text-sky-700', 'Vitamin / Supplement': 'bg-green-100 text-green-700', 'Other': 'bg-gray-100 text-gray-700' };
      document.getElementById('med-table-body').innerHTML = medications.map(m => '<tr class="med-row border-b border-gray-100"><td class="py-3 pr-4"><div class="font-semibold text-gray-800 text-sm">' + m.name + '</div>' + (m.notes ? '<div class="text-xs text-gray-400 mt-0.5 italic">' + m.notes + '</div>' : '') + '</td><td class="py-3 pr-4 text-sm text-gray-600">' + m.dosage + '</td><td class="py-3 pr-4 text-sm text-gray-600">' + (freqLabels[m.frequency] || m.frequency) + '</td><td class="py-3 pr-4 text-sm text-gray-600">' + (foodLabels[m.food] || m.food) + '</td><td class="py-3 pr-4"><span class="pill-tag ' + (catColors[m.category] || 'bg-gray-100 text-gray-700') + ' text-xs">' + m.category + '</span></td><td class="py-3 pr-4 text-sm text-gray-600">' + (m.doctor || '—') + '</td><td class="py-3"><button onclick="removeMedication(' + m.id + ')" class="text-red-400 hover:text-red-600 text-xs"><i class="fas fa-trash"></i></button></td></tr>').join('');
    }

    function generateSchedules() {
      if (medications.length === 0) return;
      const times = {
        morning: '7:00 AM',
        midMorning: '10:00 AM',
        noon: '12:00 PM',
        afternoon: '2:00 PM',
        evening: '6:00 PM',
        bedtime: '9:00 PM'
      };
      const schedules = [
        {
          name: 'Schedule A — Food-First Approach',
          desc: 'Organizes all medications around your 3 main meals to minimize stomach upset and simplify timing.',
          color: 'bg-amber-50 border-amber-300',
          headerColor: 'bg-amber-500',
          slots: [
            { time: 'Breakfast (' + times.morning + ')', icon: 'fa-sun', color: 'text-amber-500', meds: medications.filter(m => ['with_food','no_pref'].includes(m.food) && ['once_daily','twice_daily','three_daily','four_daily'].includes(m.frequency)) },
            { time: 'Lunch (' + times.noon + ')', icon: 'fa-hamburger', color: 'text-orange-500', meds: medications.filter(m => m.food === 'with_food' && ['twice_daily','three_daily','four_daily'].includes(m.frequency)) },
            { time: 'Dinner (' + times.evening + ')', icon: 'fa-moon', color: 'text-blue-500', meds: medications.filter(m => ['once_daily','twice_daily'].includes(m.frequency) && m.food !== 'empty_stomach').slice(0, 3) },
            { time: 'Bedtime (' + times.bedtime + ')', icon: 'fa-bed', color: 'text-purple-500', meds: medications.filter(m => m.food === 'empty_stomach' || m.frequency === 'as_needed') }
          ]
        },
        {
          name: 'Schedule B — Condition-Based Grouping',
          desc: 'Groups medications by condition/category so each time slot serves a specific health purpose.',
          color: 'bg-blue-50 border-blue-300',
          headerColor: 'bg-blue-500',
          slots: [
            { time: 'Morning (' + times.morning + ') — Heart & BP', icon: 'fa-heartbeat', color: 'text-red-500', meds: medications.filter(m => ['Heart / Blood Pressure','Blood Thinner','Cholesterol'].includes(m.category)) },
            { time: 'Midday (' + times.noon + ') — Metabolic', icon: 'fa-dna', color: 'text-blue-500', meds: medications.filter(m => ['Diabetes','Thyroid'].includes(m.category)) },
            { time: 'Afternoon (' + times.afternoon + ') — Vitamins', icon: 'fa-leaf', color: 'text-green-500', meds: medications.filter(m => ['Vitamin / Supplement'].includes(m.category)) },
            { time: 'Evening (' + times.evening + ') — Neuro & Other', icon: 'fa-brain', color: 'text-purple-500', meds: medications.filter(m => ['Mental Health','Pain Relief','Respiratory','Other'].includes(m.category)) }
          ]
        },
        {
          name: 'Schedule C — Minimal Interruption (2-Slot)',
          desc: 'Consolidates medications into just 2 daily windows — ideal for people with busy lifestyles or memory concerns.',
          color: 'bg-green-50 border-green-300',
          headerColor: 'bg-green-600',
          slots: [
            { time: 'Morning (' + times.morning + ')', icon: 'fa-sun', color: 'text-yellow-500', meds: medications.filter((_, i) => i % 2 === 0) },
            { time: 'Evening (' + times.evening + ')', icon: 'fa-moon', color: 'text-indigo-500', meds: medications.filter((_, i) => i % 2 !== 0) },
            { time: 'As Needed', icon: 'fa-clock', color: 'text-gray-500', meds: medications.filter(m => m.frequency === 'as_needed') }
          ]
        }
      ];

      let html = '';
      schedules.forEach((s, si) => {
        const letters = ['A','B','C'];
        html += '<div class="rounded-2xl border-2 ' + s.color + ' overflow-hidden mb-6"><div class="' + s.headerColor + ' text-white px-5 py-4"><div class="flex items-center justify-between"><div><h4 class="font-bold text-lg">' + s.name + '</h4><p class="text-sm opacity-90 mt-0.5">' + s.desc + '</p></div><span class="text-3xl font-playfair font-bold opacity-30">' + letters[si] + '</span></div></div><div class="p-5 space-y-4">';
        s.slots.forEach(slot => {
          if (slot.meds.length === 0) return;
          html += '<div class="bg-white rounded-xl p-4"><div class="flex items-center gap-2 mb-3"><i class="fas ' + slot.icon + ' ' + slot.color + '"></i><span class="font-semibold text-gray-700 text-sm">' + slot.time + '</span></div><div class="space-y-2">';
          slot.meds.forEach(m => {
            html += '<div class="flex items-start gap-3 text-sm"><div class="w-5 h-5 rounded bg-gray-100 flex items-center justify-center mt-0.5 flex-shrink-0"><i class="fas fa-pills text-gray-500 text-xs"></i></div><div><span class="font-semibold text-gray-800">' + m.name + '</span><span class="text-gray-500 ml-1">' + m.dosage + '</span>' + (m.food !== 'no_pref' ? '<span class="ml-2 text-xs text-blue-500">(' + foodLabels[m.food] + ')</span>' : '') + (m.notes ? '<div class="text-xs text-gray-400 italic">' + m.notes + '</div>' : '') + '</div></div>';
          });
          html += '</div></div>';
        });
        html += '</div></div>';
      });

      document.getElementById('schedule-output').innerHTML = html;
      document.getElementById('schedule-placeholder').classList.add('hidden');
      document.getElementById('schedules-container').classList.remove('hidden');
    }

    function exportSchedule() {
      let text = 'MY MEDICATION SCHEDULE\\n';
      text += '========================\\n';
      text += 'Generated: ' + new Date().toLocaleDateString() + '\\n\\n';
      medications.forEach(m => {
        text += m.name + ' ' + m.dosage + ' — ' + (freqLabels[m.frequency] || m.frequency) + '\\n';
        if (m.notes) text += '  Note: ' + m.notes + '\\n';
      });
      text += '\\n*** Share this with your pharmacist or doctor ***';
      const blob = new Blob([text], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'my-medication-schedule.txt';
      a.click();
    }

    function closeModal() {
      document.getElementById('schedule-modal').classList.remove('open');
    }

    function scrollToSection(id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  </script>
  `

  return c.html(layout('Caregiving', content, 'caregiving'))
}
