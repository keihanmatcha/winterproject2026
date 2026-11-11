document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const cards = document.querySelectorAll(".music-card");
  const sparkleLayer = document.querySelector(".sparkle-layer");
  const featherLayer = document.querySelector(".feather-layer");

  // カード表示アニメーション
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, {
    threshold: 0.15
  });

  cards.forEach((card) => cardObserver.observe(card));

  // 背景ステージ切り替え
  const stageOrder = {
    start: 1,
    middle: 2,
    final: 3
  };

  let currentStage = 1;

  const stageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const stage = entry.target.dataset.stage;
      const stageNumber = stageOrder[stage] || 1;

      if (stageNumber >= currentStage) {
        currentStage = stageNumber;
        body.classList.remove("stage-start", "stage-middle", "stage-final");

        if (stage === "start") {
          body.classList.add("stage-start");
        } else if (stage === "middle") {
          body.classList.add("stage-middle");
        } else if (stage === "final") {
          body.classList.add("stage-final");
        }
      }
    });
  }, {
    threshold: 0.45
  });

  cards.forEach((card) => stageObserver.observe(card));

  // 初期状態
  body.classList.add("stage-start");

  // ----------------------------
  // パターンAの補強：にじみ感をランダムに足す
  // ----------------------------
  function createSplash() {
    const splash = document.createElement("div");
    splash.className = "sparkle";

    const size = Math.random() * 12 + 14;
    splash.style.width = `${size}px`;
    splash.style.height = `${size}px`;
    splash.style.left = `${Math.random() * 100}%`;
    splash.style.top = `${55 + Math.random() * 35}%`;
    splash.style.animationDuration = `${6 + Math.random() * 4}s`;
    splash.style.animationDelay = `${Math.random() * 2}s`;

    const colors = [
      "rgba(255, 191, 212, 0.55)",
      "rgba(255, 229, 122, 0.55)",
      "rgba(157, 230, 255, 0.55)",
      "rgba(199, 171, 255, 0.50)",
      "rgba(164, 236, 208, 0.48)"
    ];

    splash.style.background = colors[Math.floor(Math.random() * colors.length)];
    splash.style.filter = `blur(${Math.random() * 1.5}px)`;
    sparkleLayer.appendChild(splash);
  }

  // ----------------------------
  // パターンB：粒子・光の飛散
  // ----------------------------
  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "sparkle";

    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${70 + Math.random() * 20}%`;
    particle.style.animationDuration = `${5 + Math.random() * 3}s`;
    particle.style.animationDelay = `${Math.random() * 2}s`;

    const colors = [
      "rgba(255,255,255,0.95)",
      "rgba(255,184,214,0.85)",
      "rgba(255,227,118,0.82)",
      "rgba(166,229,255,0.85)",
      "rgba(215,186,255,0.80)"
    ];

    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = "0 0 12px rgba(255,255,255,0.55)";
    sparkleLayer.appendChild(particle);
  }

  // ----------------------------
  // 羽根の演出
  // ----------------------------
  function createFeather() {
    const feather = document.createElement("div");
    feather.className = "feather";

    feather.style.left = `${Math.random() * 100}%`;
    feather.style.animationDuration = `${9 + Math.random() * 7}s`;
    feather.style.animationDelay = `${Math.random() * 5}s`;
    feather.style.transform = `scale(${0.8 + Math.random() * 0.7}) rotate(${Math.random() * 12}deg)`;

    featherLayer.appendChild(feather);
  }

  // 初期生成
  for (let i = 0; i < 16; i++) {
    createSplash();
  }

  for (let i = 0; i < 28; i++) {
    createParticle();
  }

  for (let i = 0; i < 10; i++) {
    createFeather();
  }
});
