(function () {
  'use strict';

  var BASE_SERVINGS = 4;
  var MIN = 1;
  var MAX = 24;

  var input = document.getElementById('servings');
  var fewer = document.getElementById('fewer');
  var more = document.getElementById('more');
  var status = document.getElementById('status');
  var countEl = document.getElementById('count');
  var nounEl = document.getElementById('count-noun');

  var items = Array.prototype.slice.call(
    document.querySelectorAll('#ingredients li[data-qty]')
  );

  var UNIT_WORDS = {
    g: 'gram',
    ml: 'milliliter',
    tsp: 'teaspoon'
  };

  var FRACTIONS = [
    [0, ''],
    [1 / 4, '¼'],
    [1 / 3, '⅓'],
    [1 / 2, '½'],
    [2 / 3, '⅔'],
    [3 / 4, '¾'],
    [1, '']
  ];

  var servings = BASE_SERVINGS;
  var announceTimer = null;

  function format(n, unit) {
    if (unit === 'g' || unit === 'ml') {
      var r = Math.round(n);
      return { text: String(r), value: r };
    }

    var whole = Math.floor(n);
    var frac = n - whole;
    var best = FRACTIONS[0];

    FRACTIONS.forEach(function (f) {
      if (Math.abs(f[0] - frac) < Math.abs(best[0] - frac)) best = f;
    });
    if (best[0] === 1) { whole += 1; best = FRACTIONS[0]; }
    var value = whole + best[0];
    var text = whole === 0 ? (best[1] || '\u00BC') : String(whole) + best[1];
    return { text: text, value: whole === 0 && !best[1] ? 0.25 : value };
    
  }

  function spokenUnit(unit, value) {
    var word = UNIT_WORDS[unit] || unit;
    return value <= 1 ? word : word + 's';
  }

  
    function render() {
    var factor = servings / BASE_SERVINGS;
    var spoken = [];

    items.forEach(function (li) {
      var unit = li.getAttribute('data-unit');
      var q = format(parseFloat(li.getAttribute('data-qty')) * factor, unit);
      var name = li.querySelector('.name').textContent;

      li.querySelector('.qty').textContent = q.text + ' ' + unit;
      spoken.push(q.text + ' ' + spokenUnit(unit, q.value) + ' ' + name);
    });

    countEl.textContent = servings;
    nounEl.textContent = servings === 1 ? 'serving' : 'servings';

    fewer.setAttribute('aria-disabled', String(servings <= MIN));
    more.setAttribute('aria-disabled', String(servings >= MAX));

    announce(
      'Quantities updated for ' + servings +
      (servings === 1 ? ' serving. ' : ' servings. ') +
      spoken.join('. ') + '.'
    );
  }

  function announce(message) {
    clearTimeout(announceTimer);

    announceTimer = setTimeout(function () {
      status.textContent = message;
    }, 500);
  }

  function setServings(n) {
    n = Math.min(MAX, Math.max(MIN, n));

    if (
      n === servings &&
      String(n) === input.value
    ) {
      return;
    }

    servings = n;
    input.value = n;

    render();
  }

  fewer.addEventListener('click', function () {
    if (servings > MIN) {
      setServings(servings - 1);
    }
  });

  more.addEventListener('click', function () {
    if (servings < MAX) {
      setServings(servings + 1);
    }
  });

  input.addEventListener('input', function () {
    var n = parseInt(input.value, 10);

    if (!isNaN(n) && n >= MIN && n <= MAX) {
      servings = n;
      render();
    }
  });

  input.addEventListener('change', function () {
    var n = parseInt(input.value, 10);

    setServings(isNaN(n) ? servings : n);
    input.value = servings;
  });

  var mq = window.matchMedia(
    '(max-width: 44.99rem)'
  );

  var ingredientsPanel =
    document.getElementById('ingredients-panel');

  var methodPanel =
    document.getElementById('method-panel');

  var showIngredients =
    document.getElementById('show-ingredients');

  var showMethod =
    document.getElementById('show-method');

  var active = 'ingredients';

  function applyPanels() {
    var narrow = mq.matches;

    ingredientsPanel.hidden =
      narrow && active !== 'ingredients';

    methodPanel.hidden =
      narrow && active !== 'method';

    showIngredients.setAttribute(
      'aria-pressed',
      String(active === 'ingredients')
    );

    showMethod.setAttribute(
      'aria-pressed',
      String(active === 'method')
    );
  }

  showIngredients.addEventListener(
    'click',
    function () {
      active = 'ingredients';
      applyPanels();
    }
  );

  showMethod.addEventListener(
    'click',
    function () {
      active = 'method';
      applyPanels();
    }
  );

  if (mq.addEventListener) {
    mq.addEventListener('change', applyPanels);
  } else {
    mq.addListener(applyPanels);
  }

  applyPanels();

  setServings(BASE_SERVINGS);

  status.textContent = '';

  clearTimeout(announceTimer);
})();
