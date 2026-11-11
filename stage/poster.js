/* TOP page: optional helper. The poster fade-in works with CSS alone. */
document.addEventListener("DOMContentLoaded", () => {
  const poster = document.querySelector(".hero-poster-section .hero-poster");
  if (!poster) return;
  // When the image cannot load, leave a useful diagnostic in the console.
  poster.addEventListener("error", () => {
    console.warn("メインポスターを読み込めません。image/ 内のファイル名とパスを確認してください:", poster.getAttribute("src"));
  });
});
