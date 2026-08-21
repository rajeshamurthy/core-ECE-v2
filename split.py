import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all navigation links in the template
nav_target = """                <!-- Desktop Navigation -->
                <nav class="hidden md:flex space-x-6 lg:space-x-8">
                    <a href="index.html"
                        class="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Home</a>
                    <a href="programs.html"
                        class="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Core Areas</a>
                    <a href="achievements.html"
                        class="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Achievements</a>
                    <a href="placements.html"
                        class="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Placements</a>
                </nav>"""

nav_regex = re.compile(r'<!-- Desktop Navigation -->.*?</nav>', re.DOTALL)
content_with_new_nav = nav_regex.sub(nav_target, content)

# Also update the mobile links if they existed (not present in current index.html but keeping in mind).
# Also update the hero links
hero_target = """                <div class="flex flex-wrap gap-4 animate-fade-in-up stagger-3">
                    <a href="programs.html"
                        class="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-brand-500/30 flex items-center">
                        Explore Domains <i class="fa-solid fa-arrow-right ml-2"></i>
                    </a>
                    <a href="placements.html"
                        class="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-lg font-bold transition-all flex items-center">
                        View Placements
                    </a>
                </div>"""
hero_regex = re.compile(r'<div class="flex flex-wrap gap-4 animate-fade-in-up stagger-3">.*?</div>', re.DOTALL)
content_with_new_nav = hero_regex.sub(hero_target, content_with_new_nav)

# Extract blocks
header_block = content_with_new_nav.split('<!-- Hero Section -->')[0]
hero_block = '<!-- Hero Section -->' + content_with_new_nav.split('<!-- Hero Section -->')[1].split('<!-- Highlights / Stats Bar -->')[0]
stats_block = '<!-- Highlights / Stats Bar -->' + content_with_new_nav.split('<!-- Highlights / Stats Bar -->')[1].split('<!-- Core Areas / Domains -->')[0]
programs_block = '<!-- Core Areas / Domains -->' + content_with_new_nav.split('<!-- Core Areas / Domains -->')[1].split('<!-- Student Achievements -->')[0]
achievements_block = '<!-- Student Achievements -->' + content_with_new_nav.split('<!-- Student Achievements -->')[1].split('<!-- Placement Highlights (Replaces old table with attractive cards) -->')[0]
placements_block = '<!-- Placement Highlights (Replaces old table with attractive cards) -->' + content_with_new_nav.split('<!-- Placement Highlights (Replaces old table with attractive cards) -->')[1].split('<!-- Footer -->')[0]
footer_block = '<!-- Footer -->' + content_with_new_nav.split('<!-- Footer -->')[1]

# Now, to make the internal pages look good without hero, we need a small spacing block or just pt-24 on body.
header_for_internal = header_block.replace('<body class="bg-slate-50 text-slate-800 antialiased font-sans">', '<body class="bg-slate-50 text-slate-800 antialiased font-sans pt-24">')

journey_component = """
    <!-- Learning Journey -->
    <section class="py-12 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-10">
                <h2 class="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">Pathway to Success</h2>
                <h3 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">The Student Journey</h3>
                <p class="text-slate-600 text-lg">In every Core Domain, our students follow a rigorous pathway to ensure they are industry-ready.</p>
            </div>

            <div class="relative max-w-5xl mx-auto">
                <div class="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-brand-200 -translate-y-1/2 z-0"></div>
                <div class="grid grid-cols-1 md:grid-cols-5 gap-6 text-center relative z-10">
                    <div class="bg-white rounded-xl p-6 shadow-lg border border-brand-100 flex flex-col items-center">
                        <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4 font-bold border-4 border-white shadow-sm">1</div>
                        <h4 class="font-bold text-slate-800">Training</h4>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-lg border border-brand-100 flex flex-col items-center">
                        <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-4 font-bold border-4 border-white shadow-sm">2</div>
                        <h4 class="font-bold text-slate-800">Certifications</h4>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-lg border border-brand-100 flex flex-col items-center">
                        <div class="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl mb-4 font-bold border-4 border-white shadow-sm">3</div>
                        <h4 class="font-bold text-slate-800">Projects</h4>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-lg border border-brand-100 flex flex-col items-center">
                        <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-2xl mb-4 font-bold border-4 border-white shadow-sm">4</div>
                        <h4 class="font-bold text-slate-800">Hackathons</h4>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-lg border border-brand-100 flex flex-col items-center">
                        <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4 font-bold border-4 border-white shadow-sm"><i class="fa-solid fa-trophy"></i></div>
                        <h4 class="font-bold text-slate-800">Placements</h4>
                    </div>
                </div>
            </div>
        </div>
    </section>
"""

def set_active_nav(header_html, active_href):
    active_class = 'class="text-brand-600 font-bold text-sm transition-colors"'
    inactive_class = 'class="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors"'
    return header_html.replace(f'href="{active_href}"\n                        {inactive_class}', f'href="{active_href}"\n                        {active_class}')

# Write index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(set_active_nav(header_block, 'index.html') + hero_block + stats_block + footer_block)

# Write programs.html
with open('programs.html', 'w', encoding='utf-8') as f:
    f.write(set_active_nav(header_for_internal, 'programs.html') + journey_component + programs_block + footer_block)

# Write achievements.html
with open('achievements.html', 'w', encoding='utf-8') as f:
    f.write(set_active_nav(header_for_internal, 'achievements.html') + achievements_block + footer_block)

# Write placements.html
with open('placements.html', 'w', encoding='utf-8') as f:
    f.write(set_active_nav(header_for_internal, 'placements.html') + journey_component + placements_block + footer_block)

print("Split completed successfully!")
