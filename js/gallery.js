// ============================================================
//  gallery.js  –  Slideshow and gallery grid
// ============================================================

let currentSlide = 0;
let autoplayInterval = null;
let isAutoplay = true;

function buildGallery() {
  buildSlideshow();
  buildThumbnails();
  buildGalleryGrid();
  startAutoplay();
}

function buildSlideshow() {
  const track = document.getElementById('slideshow-track');
  if (!track) return;
  track.innerHTML = GALLERY_IMAGES.map((img, i) => `
    <div class="slide ${i === 0 ? 'active' : ''}" onclick="openLightbox(${i})">
      <img src="${img.url}" alt="${img.caption}" loading="${i === 0 ? 'eager' : 'lazy'}">
      <div class="slide-caption">
        <h3>${img.caption}</h3>
        <p>FlashScore Gallery · ${i + 1}/${GALLERY_IMAGES.length}</p>
      </div>
      <div class="slide-number">${i + 1} / ${GALLERY_IMAGES.length}</div>
    </div>`).join('');

  const dotsEl = document.getElementById('slideshow-dots');
  if (dotsEl) {
    dotsEl.innerHTML = GALLERY_IMAGES.map((_, i) =>
      `<button class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></button>`
    ).join('');
  }
}

function buildThumbnails() {
  const strip = document.getElementById('thumbnail-strip');
  if (!strip) return;
  strip.innerHTML = GALLERY_IMAGES.map((img, i) => `
    <div class="thumb ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})" id="thumb-${i}">
      <img src="${img.url}" alt="${img.caption}" loading="lazy">
      <div class="thumb-overlay"></div>
    </div>`).join('');
}

function buildGalleryGrid() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  // More images by repeating with different seeds
  const extraImages = [
    ...GALLERY_IMAGES,
    { url: 'https://picsum.photos/seed/sport1/600/450', caption: 'Gol spectaculos – Premier League' },
    { url: 'https://picsum.photos/seed/sport2/600/450', caption: 'Faza zilei – Serie A' },
    { url: 'https://picsum.photos/seed/sport3/600/450', caption: 'Bucuria victoriei – La Liga' },
    { url: 'https://picsum.photos/seed/sport4/600/450', caption: 'Derby-ul etapei – Bundesliga' },
  ];
  grid.innerHTML = extraImages.map((img, i) => `
    <div class="gallery-item" onclick="openLightbox(${i % GALLERY_IMAGES.length})">
      <img src="${img.url}" alt="${img.caption}" loading="lazy">
      <div class="gallery-item-overlay">
        <span class="gallery-item-caption">${img.caption}</span>
      </div>
    </div>`).join('');
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const thumbs = document.querySelectorAll('.thumb');

  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  thumbs[currentSlide]?.classList.remove('active');

  currentSlide = (index + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;

  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
  thumbs[currentSlide]?.classList.add('active');

  // Scroll thumb into view
  document.getElementById(`thumb-${currentSlide}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

  // Reset progress bar
  resetProgress();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoplay() {
  stopAutoplay();
  if (!isAutoplay) return;
  resetProgress();
  autoplayInterval = setInterval(nextSlide, 3000);
}

function stopAutoplay() {
  if (autoplayInterval) { clearInterval(autoplayInterval); autoplayInterval = null; }
  const bar = document.getElementById('progress-bar');
  if (bar) { bar.classList.remove('animating'); bar.style.transition = 'none'; bar.style.width = '0'; }
}

function resetProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar || !isAutoplay) return;
  bar.style.transition = 'none';
  bar.style.width = '0';
  bar.classList.remove('animating');
  setTimeout(() => {
    bar.classList.add('animating');
    bar.style.transition = 'width 3s linear';
    bar.style.width = '100%';
  }, 50);
}

function toggleAutoplay() {
  isAutoplay = !isAutoplay;
  const btn = document.getElementById('autoplay-btn');
  if (isAutoplay) {
    startAutoplay();
    if (btn) btn.classList.add('active');
    showToast('Autoplay pornit', 'success');
  } else {
    stopAutoplay();
    if (btn) btn.classList.remove('active');
    showToast('Autoplay oprit', 'info');
  }
}

// ── Lightbox ──────────────────────────────────────────────────
let lightboxIndex = 0;

function openLightbox(index) {
  lightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  if (!lb || !img) return;
  img.src = GALLERY_IMAGES[index]?.url || '';
  img.alt = GALLERY_IMAGES[index]?.caption || '';
  if (caption) caption.textContent = GALLERY_IMAGES[index]?.caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  openLightbox(lightboxIndex);
}
function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % GALLERY_IMAGES.length;
  openLightbox(lightboxIndex);
}

document.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox')?.classList.contains('open')) {
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'Escape') closeLightbox();
  } else {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  }
});

// Touch/swipe
let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) < 50) return;
  if (document.getElementById('lightbox')?.classList.contains('open')) {
    diff > 0 ? lightboxNext() : lightboxPrev();
  } else {
    diff > 0 ? nextSlide() : prevSlide();
  }
});

document.addEventListener('DOMContentLoaded', buildGallery);
