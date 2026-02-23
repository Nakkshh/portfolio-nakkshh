/* ════════════════════════════════════════
   PORTFOLIO V8 — SIGNAL
   Shared JS · All Pages
   ════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── BOOT SCREEN ── */
  const boot = document.getElementById('boot');
  if (boot) {
    const bootLines = boot.querySelectorAll('.boot-line');
    const bootBar   = boot.querySelector('.boot-bar');
    const bootPct   = boot.querySelector('.boot-pct');

    const steps = [
    { delay: 100,  pct: 14,  status: 'OK',   msg: 'Initializing portfolio v8...' },
    { delay: 350,  pct: 28,  status: 'OK',   msg: 'Loading stack — Java · Spring Boot · React' },
    { delay: 580,  pct: 44,  status: 'OK',   msg: 'Mounting cloud config — AWS · OCI · Azure' },
    { delay: 780,  pct: 58,  status: 'OK',   msg: 'Starting containers — Docker · Kubernetes' },
    { delay: 960,  pct: 72,  status: 'OK',   msg: 'Connecting database — PostgreSQL · Firebase' },
    { delay: 1120, pct: 86,  status: 'OK',   msg: 'Running CI/CD — GitHub Actions pipeline' },
    { delay: 1280, pct: 94,  status: 'OK',   msg: 'Loading projects — Nexora · NeuralNest' },
    { delay: 1420, pct: 100, status: 'READY',msg: 'Status — Open · Summer 2026 Internships' },
  ];

    steps.forEach((s, i) => {
      setTimeout(() => {
        if (bootLines[i]) {
          bootLines[i].querySelector('.bl-msg').textContent = s.msg;
          const statusEl = bootLines[i].querySelector('.bl-status');
          statusEl.textContent = `[${s.status}]`;
          if (s.status === 'WARN') statusEl.classList.add('warn');
          if (s.status === 'READY') statusEl.classList.add('ok');
          bootLines[i].classList.add('show');
        }
        if (bootBar) bootBar.style.width = s.pct + '%';
        if (bootPct) bootPct.textContent  = s.pct + '%';
      }, s.delay);
    });

    setTimeout(() => {
      boot.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1900);

    document.body.style.overflow = 'hidden';
  }

  /* ── CUSTOM CURSOR ── */
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  if (cur && ring) {
    let mx=0, my=0, rx=0, ry=0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx+'px'; cur.style.top = my+'px';
    });
    (function loop() {
      rx += (mx-rx)*.1; ry += (my-ry)*.1;
      ring.style.left = rx+'px'; ring.style.top = ry+'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.hcard,.prow,.cert-row,.val-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width='40px'; ring.style.height='40px';
        ring.style.opacity='.18'; ring.style.borderRadius='2px';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width='26px'; ring.style.height='26px';
        ring.style.opacity='.5'; ring.style.borderRadius='50%';
      });
    });
  }

  /* ── READING PROGRESS BAR ── */
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ── SCROLL REVEAL ── */
  const revEls = document.querySelectorAll('.reveal');
  if (revEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: .07 });
    revEls.forEach(el => obs.observe(el));
  }

  /* ── ACTIVE NAV LINK ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.tn-links a, .f-nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ── LIVE CLOCK ── */
  const clockTargets = [
    document.getElementById('tn-clock'),
    document.getElementById('bb-clock')
  ].filter(Boolean);
  if (clockTargets.length) {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-IN', {
        hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
      }) + ' IST';
      clockTargets.forEach(el => el.textContent = t);
    };
    tick(); setInterval(tick, 1000);
  }

  /* ── FOOTER TIME ── */
  const ftEl = document.getElementById('footer-time');
  if (ftEl) {
    const ftTick = () => {
      ftEl.textContent = new Date().toLocaleString('en-IN', {
        dateStyle: 'medium', timeStyle: 'short', hour12: false
      });
    };
    ftTick(); setInterval(ftTick, 60000);
  }

  /* ── COUNTER ANIMATION ── */
  document.querySelectorAll('[data-count]').forEach(el => {
    const cObs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const to=parseFloat(el.dataset.count), dec=parseInt(el.dataset.dec||0);
      const sfx=el.dataset.suffix||'', pfx=el.dataset.prefix||'';
      let start=null; const dur=1500;
      const step = ts => {
        if (!start) start=ts;
        const p=Math.min((ts-start)/dur,1), ease=1-Math.pow(1-p,3);
        const val=dec?(to*ease).toFixed(dec):Math.round(to*ease);
        el.textContent=pfx+val+sfx;
        if (p<1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cObs.unobserve(el);
    }, { threshold: .5 });
    cObs.observe(el);
  });

  /* ── TERMINAL TYPEWRITER ── */
  const termLines = document.querySelectorAll('.term-line[data-text]');
  if (termLines.length) {
    let li = 0;
    const typeLine = () => {
      if (li >= termLines.length) return;
      const el = termLines[li]; const txt = el.dataset.text;
      el.style.visibility = 'visible'; let i = 0;
      const t = setInterval(() => {
        el.textContent = txt.slice(0, ++i);
        if (i >= txt.length) { clearInterval(t); li++; setTimeout(typeLine, 160); }
      }, 24);
    };
    setTimeout(typeLine, 2000);
  }

  /* ── HERO ROLE CYCLER ── */
  const roleEl = document.getElementById('hero-role');
  if (roleEl) {
    const roles = ['Full-Stack Engineer','Cloud Architect','Backend Developer','Java Engineer','Systems Builder'];
    let ri=0, ci=0, del=false;
    function typeRole() {
      const r = roles[ri];
      if (!del) { roleEl.textContent=r.slice(0,++ci); if(ci===r.length){del=true;setTimeout(typeRole,2200);return;} }
      else { roleEl.textContent=r.slice(0,--ci); if(ci===0){del=false;ri=(ri+1)%roles.length;} }
      setTimeout(typeRole, del?38:68);
    }
    setTimeout(typeRole, 2000);
  }

  /* ── MAGNETIC BUTTONS ── */
  document.querySelectorAll('.mag-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * .28;
      const dy = (e.clientY - cy) * .28;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });

  /* ── GITHUB STATS ── */
  (async () => {
    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    const fallback = { repos: 24, stars: 1, followers: 1, prs: 2, commits: 101 };

    // Show fallback instantly — no blank flash
    set('gh-commits',   fallback.commits);
    set('gh-repos',     fallback.repos);
    set('gh-stars',     fallback.stars);
    set('gh-followers', fallback.followers);
    set('gh-prs',       fallback.prs);

    try {
      // Fetch stats.json generated by GitHub Actions every 6h
      const res = await fetch('assets/stats.json?v=' + Date.now());
      if (!res.ok) throw new Error('not found');
      const data = await res.json();

      set('gh-commits',   data.commits   ?? fallback.commits);
      set('gh-repos',     data.repos     ?? fallback.repos);
      set('gh-stars',     data.stars     ?? fallback.stars);
      set('gh-followers', data.followers ?? fallback.followers);
      set('gh-prs',       fallback.prs);

    } catch (_) { /* stats.json missing — fallback already shown */ }
  })();

  function getTimeAgo(date) {
    const sec = Math.floor((Date.now() - date) / 1000);
    if (sec < 60)   return sec + 's ago';
    if (sec < 3600) return Math.floor(sec/60) + 'm ago';
    if (sec < 86400)return Math.floor(sec/3600) + 'h ago';
    return Math.floor(sec/86400) + 'd ago';
  }

  /* ── COMMAND PALETTE ── */
  const cmdOverlay = document.getElementById('cmd-overlay');
  const cmdInput   = document.getElementById('cmd-input');
  if (cmdOverlay && cmdInput) {
    const cmdItems = [
      { icon:'⌂', label:'Home',          sub:'Back to homepage',        href:'index.html' },
      { icon:'◫', label:'Projects',      sub:'NeuralNest · Nexora',  href:'projects.html' },
      { icon:'◷', label:'Experience',    sub:'AWS Forage · VIT Bhopal', href:'experience.html' },
      { icon:'◈', label:'Skills',        sub:'Stack & certifications',  href:'skills.html' },
      { icon:'✉', label:'Contact',       sub:'Hire me or say hello',    href:'contact.html' },
      { icon:'⊡', label:'Resume',        sub:'View full resume',        href:'resume.html' },
      { icon:'↗', label:'GitHub',        sub:'github.com/Nakkshh',href:'https://github.com/Nakkshh', ext:true },
      { icon:'◈', label:'LinkedIn',      sub:'linkedin.com/in/nakshatrajain',href:'https://linkedin.com/in/nakshatrajain', ext:true },
      { icon:'✉', label:'Copy Email',    sub:'nakshtrajain25@gmail.com', action:'copy-email' },
    ];

    let focusIdx = 0;
    let filtered = [...cmdItems];

    const openCmd = () => {
      cmdOverlay.classList.add('open');
      cmdInput.value = '';
      setTimeout(() => cmdInput.focus(), 50);
      renderResults(cmdItems);
    };
    const closeCmd = () => {
      cmdOverlay.classList.remove('open');
      cmdInput.value = '';
    };

    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openCmd(); }
      if (e.key === 'Escape') closeCmd();
    });
    document.querySelectorAll('[data-cmd-open]').forEach(b => b.addEventListener('click', openCmd));
    cmdOverlay.addEventListener('click', e => { if (e.target === cmdOverlay) closeCmd(); });

    cmdInput.addEventListener('input', () => {
      const q = cmdInput.value.toLowerCase();
      filtered = cmdItems.filter(i =>
        i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q)
      );
      focusIdx = 0;
      renderResults(filtered);
    });

    cmdInput.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { focusIdx = Math.min(focusIdx+1, filtered.length-1); highlightResult(); }
      if (e.key === 'ArrowUp')   { focusIdx = Math.max(focusIdx-1, 0); highlightResult(); }
      if (e.key === 'Enter') { const el = document.querySelectorAll('.cmd-result')[focusIdx]; el?.click(); }
    });

    function renderResults(items) {
      const container = document.getElementById('cmd-results');
      if (!container) return;
      container.innerHTML = items.map((item, i) => `
        <${item.href ? 'a' : 'div'}
          class="cmd-result${i===0?' focused':''}"
          ${item.href ? `href="${item.href}"${item.ext?' target="_blank" rel="noopener"':''}` : ''}
          ${item.action ? `data-action="${item.action}"` : ''}
        >
          <div class="cmd-result-icon">${item.icon}</div>
          <div>
            <div class="cmd-result-label">${item.label}</div>
            <div class="cmd-result-sub">${item.sub}</div>
          </div>
          <span class="cmd-result-arrow">→</span>
        </${item.href ? 'a' : 'div'}>
      `).join('');

      container.querySelectorAll('.cmd-result').forEach(el => {
        el.addEventListener('click', () => {
          const action = el.dataset.action;
          if (action === 'copy-email') {
            navigator.clipboard.writeText('nakshtrajain25@gmail.com');
            el.querySelector('.cmd-result-label').textContent = 'Copied!';
            setTimeout(closeCmd, 700);
          } else closeCmd();
        });
      });
    }

    function highlightResult() {
      document.querySelectorAll('.cmd-result').forEach((el, i) => {
        el.classList.toggle('focused', i === focusIdx);
      });
    }
  }

  /* ── SKILL BARS ── */
  const fills = document.querySelectorAll('.sr-fill');
  if (fills.length) {
    const bObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); });
    }, { threshold: .3 });
    fills.forEach(f => bObs.observe(f));
  }

});