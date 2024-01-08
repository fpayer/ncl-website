  function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var updateBehavior = async function() {
  await timeout(100);

  /* Allow external hyperlinks with gallery views */
  document.querySelectorAll('.notion-collection-card.gallery.no-click').forEach(function(item) {
    var link = item.querySelector('.notion-link');

    if (link) {
      /* Create new anchor */
      var newAnchor = document.createElement('a');
      newAnchor.href = link.href;
      newAnchor.classList.add('notion-link');
      newAnchor.classList.add('notion-collection-card__anchor');
      newAnchor.target = '_blank';
      newAnchor.rel = 'noreferrer noopener';

      item.classList.remove('no-click');
      item.prepend(newAnchor);
    }
  });

  /* Allow external hyperlinks with list views */
  document.querySelectorAll('.notion-collection-list .notion-collection-list__item').forEach(function(item) {
    var link = item.querySelector('.notion-link');

    if (link) {
      /* Create new anchor */
      var newAnchor = document.createElement('a');
      newAnchor.href = link.href;
      newAnchor.classList.add('notion-link');
      newAnchor.classList.add('notion-collection-list__item-anchor');
      newAnchor.target = '_blank';
      newAnchor.rel = 'noreferrer noopener';

      item.prepend(newAnchor);
    }
  });

  /* Hide contact form on non-contact pages*/
  if (window.groove && window.groove.widget && window.next) {
    try {
      if (window.next.router.state.asPath !== '/contact-us') {
        window.groove.widget.destroy();
      } else {
        window.groove.widget.init('87c2fbe7-8f2c-40f2-bc24-d1f8ca04e5a5', { targetElement: screen.width >= 680 ? 'block-085983ef0d154acaaf458838923fc862' : undefined });

        window.groove.widget.open();
      }
    } catch (e) {
      console.log(e);
    }
  }
}

window.addEventListener('load', function() {
  /* Default navbar item list to a specific page on click */
  document.querySelectorAll('.super-navbar__list').forEach(function(item) {
    item.addEventListener('click', function() {
      var text = item.innerText;

      if (text === 'About') {
        window.next.router.push('/about/mission');
      } else if (text === 'Competition') {
        window.next.router.push('/competition');
      }
    });
  });

  updateBehavior();

  if (window.next) {
    window.next.router.events.on('routeChangeComplete', updateBehavior);
  }
})
