"use strict";

var path = require('path');

var express = require('express');

var hbs = require('hbs');

var cotacoes = require('./util/cotacao');

var app = express();
var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express["static"](publicDirectoryPath));
app.get('', function (req, res) {
  res.render('index', {
    title: 'Bem vindo ao sistema de cotações',
    author: 'Júlio Mendes'
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: 'Sobre',
    author: 'Júlio Mendes'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    title: 'Ajuda',
    author: 'Júlio Mendes'
  });
});
app.get('/cotacoes', function (req, res) {
  if (!req.query.ativo) {
    return res.status(400).json({
      error: {
        code: 400,
        message: 'O ativo deve ser informado como query param'
      }
    });
  }

  var symbol = req.query.ativo.toUpperCase();
  cotacoes(symbol, function (err, body) {
    if (err) {
      return res.status(err.code).json({
        error: {
          code: err.code,
          message: err.message
        }
      });
    }

    res.status(200).json(body);
  });
});
app.get('/help/*', function (req, res) {
  res.render('404', {
    title: '404',
    errorMessage: 'Não existe página depois de /help',
    author: 'Júlio Mendes'
  });
});
app.get('*', function (req, res) {
  res.render('404', {
    title: '404',
    errorMessage: 'Página não encontrada',
    author: 'Júlio Mendes'
  });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("server is up on port ".concat(port));
});