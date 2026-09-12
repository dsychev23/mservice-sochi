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
