document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  var burger = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
  });

  var carousel = document.getElementById('reviewCarousel');
  if (carousel) {
    var slides = carousel.querySelectorAll('.review-page');
    var dotsWrap = document.getElementById('reviewDots');
    var current = 0;
    var timer;

    slides.forEach(function (_, i) {
      var dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () { goTo(i); resetTimer(); });
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll('span');

    function goTo(i) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }
    function next() { goTo((current + 1) % slides.length); }
    function resetTimer() { clearInterval(timer); timer = setInterval(next, 10000); }
    resetTimer();
  }

  var tabs = document.querySelectorAll('.gallery-tabs button');
  var items = document.querySelectorAll('#galleryGrid figure');
  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabs.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      items.forEach(function (it) {
        var show = filter === 'all' || it.getAttribute('data-cat') === filter;
        it.style.display = show ? '' : 'none';
      });
    });
  });
});
