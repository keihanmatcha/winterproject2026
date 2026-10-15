/* ==========================================
   main.js - 公演紹介ホームページ用スクリプト
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. スムーススクロール & クリック時の即時アクティブ化
  const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // スムーススクロールで移動（固定ヘッダーの高さを考慮して位置を微調整する場合は offset を調整できます）
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      // クリックされた瞬間に他のリンクの active を外し、自身に付与
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 2. ページスクロールに連動したヘッダーの active 切り替え
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let scrollY = window.pageYOffset;
      const headerOffset = 120; // ヘッダーの高さ＋余白分の調整値

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerOffset;
        const sectionId = section.getAttribute('id');

        // 現在のスクロール位置がセクションの範囲内にあるか判定
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }

});
