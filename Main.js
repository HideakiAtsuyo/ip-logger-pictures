var express = require('express'),
  app = express(),
  qs = require('querystring'),
  cfg = require("./config.json");

app.set('view engine', 'ejs').use(express.static( "public" ))
.get('/', function(req, res) {
  res.send('Nice cock !');
}).post('/', function(req, res) {
  res.send('What are you trying to do !?');
}).get('/params/:id', function(req, res) {

  //Ex: http://localhost:3001/params/Dragon.jpg

  let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log(`IP: ${ip.replace("::ffff:", "")}`);

  res.render('embed.ejs', { title: decodeURIComponent(qs.escape(`${req.query.title||cfg.embedDefaultTitle}`)), desc: decodeURIComponent(qs.escape(`${req.query.desc||cfg.embedDefaultDescription}`)), color: req.query.color, image: `${req.protocol + "://" + req.get('host')}/Images/${req.params["id"]}`, embedMode: cfg.embedMode });
}).get('/query?:id', function(req, res) {

  //Ex: http://localhost:3001/query?id=Dragon.jpg

  let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log(`IP: ${ip.replace("::ffff:", "")}`);

  res.render('embed.ejs', { title: decodeURIComponent(qs.escape(`${req.query.title||cfg.embedDefaultTitle}`)), desc: decodeURIComponent(qs.escape(`${req.query.desc||cfg.embedDefaultDescription}`)), color: req.query.color, image: `${req.protocol + "://" + req.get('host')}/Images/${req.query["id"]}`, embedMode: cfg.embedMode });
}).listen(cfg.Port, () => {
  console.log(`Listening at http://localhost:${cfg.Port}\nEmbeds: https://github.com/n0vuh/embeds`)
})