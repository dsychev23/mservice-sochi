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

  var addressLink = document.getElementById('addressLink');
  if (addressLink) {
    var ua = navigator.userAgent || '';
    var lat = 43.568844, lon = 39.754118;
    var label = encodeURIComponent('БМВ М сервис');
    if (/iPhone|iPad|iPod/i.test(ua)) {
      addressLink.href = 'https://maps.apple.com/?ll=' + lat + ',' + lon + '&q=' + label;
    } else if (/Android/i.test(ua)) {
      addressLink.href = 'geo:' + lat + ',' + lon + '?q=' + lat + ',' + lon + '(' + label + ')';
    }
  }

  var modal = document.getElementById('requestModal');
  if (modal) {
    var form = document.getElementById('requestForm');
    var thanks = document.getElementById('modalThanks');
    var closeBtn = document.getElementById('modalClose');
    var altSendBtn = document.getElementById('modalAltSend');
    var lastMessage = '';
    var lastChannel = '';

    function openModal() {
      modal.hidden = false;
      form.hidden = false;
      thanks.hidden = true;
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = '';
    }
    document.querySelectorAll('.js-open-request').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    function buildMessage(data) {
      var lines = ['Заявка с сайта BMW M Service', 'Имя: ' + data.name, 'Телефон: ' + data.phone];
      if (data.comment) lines.push('Запрос: ' + data.comment);
      return lines.join('\n');
    }
    function sendTo(channel, message) {
      var encoded = encodeURIComponent(message);
      var url = channel === 'telegram'
        ? 'https://t.me/bmwmservicesochi?text=' + encoded
        : 'https://wa.me/79186110011?text=' + encoded;
      window.open(url, '_blank');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        comment: form.comment.value.trim(),
        channel: form.channel.value
      };
      if (!data.name || !data.phone || !form.consent.checked) return;
      var message = buildMessage(data);
      lastMessage = message;
      lastChannel = data.channel;
      sendTo(data.channel, message);
      form.hidden = true;
      thanks.hidden = false;
      altSendBtn.textContent = 'Продублировать в ' + (data.channel === 'telegram' ? 'WhatsApp' : 'Telegram');
    });

    altSendBtn.addEventListener('click', function () {
      var other = lastChannel === 'telegram' ? 'whatsapp' : 'telegram';
      sendTo(other, lastMessage);
    });
  }
});
