// ==========================================
// 週末工房 木ままBASE — メインスクリプト
// ==========================================

(function () {
  'use strict';

  // ナビゲーション スクロール制御
  const nav = document.getElementById('nav');
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ハンバーガーメニュー
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // スクロールリビールアニメーション
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });
  revealElements.forEach(el => revealObserver.observe(el));

  // パーラックス (ストーリーセクション背景)
  const storyBgImg = document.querySelector('.story-bg-img');
  if (storyBgImg) {
    const handleParallax = () => {
      const storySection = storyBgImg.closest('.story');
      if (!storySection) return;
      const rect = storySection.getBoundingClientRect();
      const scrolled = -rect.top * 0.25;
      storyBgImg.style.transform = `scale(1.15) translateY(${scrolled}px)`;
    };
    window.addEventListener('scroll', handleParallax, { passive: true });
  }

  // スムーズスクロール（ナビ以外のアンカーリンク）
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
