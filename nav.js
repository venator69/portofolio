(function () {
  const nav = document.getElementById('myTopnav');
  const icon = document.querySelector('.topnav a.icon');
  if (!nav || !icon) return;

  icon.addEventListener('click', (e) => {
    e.preventDefault();
    nav.classList.toggle('responsive');
  });

  nav.querySelectorAll('a:not(.icon)').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('responsive'));
  });
})();
