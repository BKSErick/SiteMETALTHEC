/* ============================================================
   METALTHEC — Interactions v2.0
   - Sticky nav + hamburger mobile menu
   - Scroll reveal (IntersectionObserver)
   - Hero parallax
   - Service tabs
   - Gallery filters
   - Form interactions (file label, submit, simple validation)
   - Cookie consent LGPD
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll state ---
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Hamburger mobile nav ---
  const burger = document.querySelector('.nav__burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when a nav link is clicked
    document.querySelectorAll('.nav__links a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // --- IntersectionObserver reveals ---
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // --- Hero parallax ---
  const heroVisual = document.querySelector('.hero__visual[data-parallax]');
  if (heroVisual && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < window.innerHeight * 1.5) {
            heroVisual.style.transform = `translateY(${scrollY * 0.18}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Service Tabs ---
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab__panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
    });
  });

  // --- Gallery filters ---
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.gx');
  filters.forEach(f => {
    f.addEventListener('click', () => {
      const cat = f.dataset.filter;
      filters.forEach(x => x.classList.toggle('active', x === f));
      items.forEach(it => {
        const match = cat === 'all' || it.dataset.cat === cat;
        it.classList.toggle('hidden', !match);
      });
    });
  });


  // --- Form submit → WhatsApp (zero backend) ---
  const WA_NUMBER = '553120401161'; // +55 31 2040-1161
  const form = document.getElementById('lead-form');
  const success = document.querySelector('.form__success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome     = document.getElementById('nome')?.value.trim()     || '—';
      const empresa  = document.getElementById('empresa')?.value.trim()  || '—';
      const email    = document.getElementById('email')?.value.trim()    || '—';
      const telefone = document.getElementById('telefone')?.value.trim() || '—';
      const servico  = document.getElementById('servico')?.value.trim()  || '—';

      const msg = [
        '🔧 *ORÇAMENTO TÉCNICO B2B — METALTHEC*',
        '',
        `👤 *Nome:* ${nome}`,
        `🏭 *Empresa:* ${empresa}`,
        `📧 *E-mail:* ${email}`,
        `📱 *Telefone:* ${telefone}`,
        `⚙️ *Serviço:* ${servico}`,
        '',
        '_Enviado pelo site da METALTHEC_'
      ].join('\n');

      const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

      // Open WhatsApp
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Show success feedback
      if (success) {
        success.textContent = '✓ Abrindo WhatsApp… Confirme o envio na conversa com a engenharia.';
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 7000);
      }

      form.reset();
    });
  }

  // --- Animate hero telemetry numbers ---
  const tickers = document.querySelectorAll('[data-ticker]');
  tickers.forEach(t => {
    const end = parseFloat(t.dataset.ticker);
    const decimals = parseInt(t.dataset.decimals || '0', 10);
    const dur = 1800;
    const start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      t.textContent = (end * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  // --- Animate trust grid numbers when in view ---
  const trustNums = document.querySelectorAll('[data-count]');
  const numObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const end = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const dur = 1500;
        const start = performance.now();
        function step(now) {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (end * eased).toFixed(decimals);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        numObs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  trustNums.forEach(n => numObs.observe(n));

  // --- Smooth anchor with offset for fixed nav ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // --- Cookie consent LGPD ---
  const COOKIE_KEY = 'metalthec_cookies_v1';
  const cookieBar = document.getElementById('cookie-bar');
  if (cookieBar) {
    if (!localStorage.getItem(COOKIE_KEY)) {
      // Show after 1.4s so page has time to render
      setTimeout(() => cookieBar.classList.add('visible'), 1400);

      document.querySelector('.cookie-btn--accept')?.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'all');
        cookieBar.classList.remove('visible');
        setTimeout(() => cookieBar.style.display = 'none', 500);
      });

      document.querySelector('.cookie-btn--decline')?.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'essential');
        cookieBar.classList.remove('visible');
        setTimeout(() => cookieBar.style.display = 'none', 500);
      });
    } else {
      cookieBar.style.display = 'none';
    }
  }

});
