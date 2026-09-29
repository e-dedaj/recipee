(function () {
  'use strict';

  var BASE_SERVINGS = 4;
  var MIN = 1;
  var MAX = 24;

  var input = document.getElementById('servings');
  var fewer = document.getElementById('fewer');
  var more = document.getElementById('more');
  var countEl = document.getElementById('count');
  var nounEl = document.getElementById('count-noun');

  var items = Array.prototype.slice.call(
    document.querySelectorAll('#ingredients li[data-qty]')
  );

  var servings = BASE_SERVINGS;

  function format(n, unit) {
    if (unit === 'g' || unit === 'ml') {
      return String(Math.round(n));
    }

    return String(Math.round(n * 4) / 4);
  }

  function render() {
    var factor = servings / BASE_SERVINGS;

    items.forEach(function (li) {
      var unit = li.getAttribute('data-unit');
      var quantity = parseFloat(li.getAttribute('data-qty'));
      var value = format(quantity * factor, unit);

      li.querySelector('.qty').textContent = value + ' ' + unit;
    });

    countEl.textContent = servings;
    nounEl.textContent = servings === 1 ? 'serving' : 'servings';
  }

  function setServings(value) {
    value = Math.min(MAX, Math.max(MIN, value));

    servings = value;
    input.value = value;

    render();
  }

  fewer.addEventListener('click', function () {
    setServings(servings - 1);
  });

  more.addEventListener('click', function () {
    setServings(servings + 1);
  });

  input.addEventListener('change', function () {
    var value = parseInt(input.value, 10);

    if (isNaN(value)) {
      setServings(servings);
    } else {
      setServings(value);
    }
  });

  render();
})();
