(() => {
    const pages = [
        ['index.html', 'Home'],
        ['programs.html', 'Core Areas'],
        ['achievements.html', 'Achievements'],
        ['placements.html', 'Placements']
    ];

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeFile = pages.some(([file]) => file === currentPage) ? currentPage : 'programs.html';
    const activeLabel = pages.find(([file]) => file === activeFile)?.[1] || document.title.split('|')[0].trim();
    const navMarkup = pages.map(([file, label]) => {
        const active = file === activeFile;
        return `<a href="${file}" class="px-3 py-2 rounded-lg text-sm ${active ? 'font-semibold bg-medical-50 text-medical-700' : 'font-medium text-slate-600 hover:text-medical-600 hover:bg-slate-100'} transition-colors">${label}</a>`;
    }).join('');
    const mobileNavMarkup = pages.map(([file, label]) => {
        const active = file === activeFile;
        return `<a href="${file}" class="block px-3 py-2 rounded-lg text-sm ${active ? 'font-semibold text-medical-700 bg-medical-50' : 'font-medium text-slate-700 hover:bg-slate-100'}">${label}</a>`;
    }).join('');

    const utilityBar = `
        <div class="bg-medical-900 text-white text-xs py-2 px-4 border-b border-medical-800">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <span class="inline-flex items-center gap-1.5"><i class="fa-solid fa-microchip text-amber-400"></i> Embedded Systems & Electronics Hub</span>
                <span class="hidden sm:inline-flex items-center gap-1 text-slate-300"><i class="fa-solid fa-certificate text-amber-400"></i> NBA Accredited Tier-1</span>
            </div>
        </div>`;

    const header = document.createElement('header');
    header.className = 'sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm';
    header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <a href="index.html" class="flex items-center gap-3">
                    <div class="bg-medical-50 p-2 rounded-xl border border-medical-100 flex items-center justify-center">
                        <img src="clg-logo.jpg" alt="SECE Logo" class="h-8 w-auto object-contain" onerror="this.src='https://via.placeholder.com/150x50?text=SECE+ECE'">
                    </div>
                    <div>
                        <span class="text-base font-bold text-slate-900 leading-tight block">Dept. of ECE</span>
                        <span class="text-[11px] font-medium text-medical-600 tracking-wide block">Electronics Portal</span>
                    </div>
                </a>
                <nav class="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Primary navigation">${navMarkup}</nav>
                <a href="placements.html" class="hidden sm:flex px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg font-semibold text-xs transition-all shadow-sm items-center gap-2"><i class="fa-solid fa-chart-line"></i> Analytics Portal</a>
                <button id="site-mobile-menu-btn" class="md:hidden p-2 rounded-lg text-slate-600 hover:text-medical-600 hover:bg-slate-100" aria-label="Toggle menu" aria-expanded="false"><i class="fa-solid fa-bars text-xl"></i></button>
            </div>
        </div>
        <div id="site-mobile-menu" class="hidden md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">${mobileNavMarkup}</div>`;

    const footer = document.createElement('footer');
    footer.className = 'bg-medical-900 text-slate-300 py-10 border-t border-medical-800';
    footer.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-3">
                <div class="bg-white p-2 rounded-lg"><img src="clg-logo.jpg" alt="SECE Logo" class="h-6 w-auto opacity-90"></div>
                <div><h4 class="text-white font-bold text-sm">Dept. of ECE</h4><p class="text-xs text-slate-400">Sri Eshwar College of Engineering</p></div>
            </div>
            <div class="text-center md:text-right text-xs space-y-1"><p>Empowering the next generation of electronics and communication innovators.</p><p class="text-slate-400">&copy; 2026 Sri Eshwar College of Engineering. All rights reserved.</p></div>
        </div>`;

    const install = () => {
        document.body.classList.add('bright-theme');
        const brightThemeStyles = document.createElement('style');
        brightThemeStyles.textContent = `
            .bright-theme .text-brand-500,
            .bright-theme .text-brand-600,
            .bright-theme nav a.text-brand-600,
            .bright-theme nav a:hover { color: #d97706 !important; }
            .bright-theme .bg-brand-50,
            .bright-theme .bg-brand-100,
            .bright-theme .bg-blue-50,
            .bright-theme .bg-white\/10 { background: #fffbeb !important; border-color: #fcd34d !important; color: #92400e !important; }
            .bright-theme .bg-brand-600,
            .bright-theme .group:hover .group-hover\\:bg-brand-600 { background: #facc15 !important; color: #111827 !important; }
            .bright-theme .border-brand-100,
            .bright-theme .border-brand-200,
            .bright-theme .border-brand-400\\/30 { border-color: #fcd34d !important; }
            .bright-theme .topic-pill,
            .bright-theme .academy-badge { background: #fffbeb !important; border-color: #fcd34d !important; color: #92400e !important; }
        `;
        document.head.append(brightThemeStyles);
        if (currentPage !== 'index.html') {
            document.body.classList.remove('pt-16');
            document.body.insertAdjacentHTML('afterbegin', utilityBar);
            document.querySelector('header')?.replaceWith(header);
            if (!document.querySelector('footer')) document.body.append(footer);

            const breadcrumb = document.createElement('div');
            breadcrumb.className = 'bg-medical-50/50 border-b border-medical-100/60 py-2.5 px-4';
            breadcrumb.innerHTML = `<div class="max-w-7xl mx-auto flex items-center text-xs text-slate-500 space-x-2"><a href="index.html" class="hover:text-medical-600 flex items-center gap-1"><i class="fa-solid fa-house text-[10px]"></i> SECE</a><span>/</span><span class="font-semibold text-medical-700">${activeLabel}</span></div>`;
            const contentRoot = document.querySelector('main') || document.querySelector('section');
            contentRoot?.parentNode.insertBefore(breadcrumb, contentRoot);
        } else {
            const existingButton = document.querySelector('header button');
            if (existingButton && !document.getElementById('site-mobile-menu')) {
                existingButton.id = 'site-mobile-menu-btn';
                const mobileMenu = document.createElement('div');
                mobileMenu.id = 'site-mobile-menu';
                mobileMenu.className = 'hidden md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1';
                mobileMenu.innerHTML = mobileNavMarkup;
                document.querySelector('header')?.append(mobileMenu);
            }
        }

        const menuButton = document.getElementById('site-mobile-menu-btn');
        const menu = document.getElementById('site-mobile-menu');
        menuButton?.addEventListener('click', () => {
            const isHidden = menu.classList.toggle('hidden');
            menuButton.setAttribute('aria-expanded', String(!isHidden));
        });
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
    else install();
})();
