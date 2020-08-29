"use strict";

console.log('javascript no frontend');
var cotacoesForm = document.querySelector('form');
var mainMessage = document.querySelector('h3');
var price = document.querySelector('#price');
var price_open = document.querySelector('#price_open');
var day_high = document.querySelector('#day_high');
var day_low = document.querySelector('#day_low');
cotacoesForm.addEventListener('submit', function (event) {
  mainMessage.innerText = 'Buscando...';
  price.innerHTML = '';
  price_open.innerHTML = '';
  day_high.innerHTML = '';
  day_low.innerHTML = '';
  event.preventDefault();
  var ativo = document.querySelector('input').value;

  if (!ativo) {
    mainMessage.innerText = 'O ativo deve ser informado';
    return;
  }

  fetch("http://localhost:3000/cotacoes?ativo=".concat(ativo)).then(function (response) {
    response.json().then(function (data) {
      if (data.error) {
        mainMessage.innerText = "Alguma coisa deu errado";
        price.innerHTML = "".concat(data.error.message, " | c\xF3digo ").concat(data.error.code);
      } else {
        mainMessage.innerText = data.symbol;
        price.innerHTML = "PRICE: ".concat(data.price);
        price_open.innerHTML = "PRICE OPEN: ".concat(data.price_open);
        day_high.innerHTML = "DAY HIGH: ".concat(data.day_high);
        day_low.innerHTML = "DAY LOW: ".concat(data.day_low);
      }
    });
  });
});