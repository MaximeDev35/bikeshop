var express = require('express');
var router = express.Router();

var dataBike = [
  {name:"BIK045", url:"/images/bike-1.jpg", price:679},
  {name:"ZOOK07", url:"/images/bike-2.jpg", price:999},
  {name:"TITANS", url:"/images/bike-3.jpg", price:799},
  {name:"CEWO", url:"/images/bike-4.jpg", price:1300},
  {name:"AMIG039", url:"/images/bike-5.jpg", price:479},
  {name:"LIK099", url:"/images/bike-6.jpg", price:869},
]


//var dataCardBike1 = [
  //{name:"BIK045", url:"/images/bike-1.jpg", price:679, quantity:1},
  //{name:"ZOOK07", url:"/images/bike-2.jpg", price:999, quantity:2},
//]

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.dataCardBike===undefined){req.session.dataCardBike=[]}
  res.render('index', {dataBike:dataBike});
});

// Ajouter un item au Panier
router.get('/shop', function(req, res, next) {
  if (req.session.dataCardBike===undefined){req.session.dataCardBike=[]}
  console.log('on est dans router.get')
  if(req.query.name!=undefined){
    console.log('on est dans if 1')
    var request1 = req.query
    console.log(req.session.dataCardBike)
    if(req.session.dataCardBike.length === 0)
    {
      console.log('panier vide')
      req.session.dataCardBike.push(request1)
    }else{
      console.log('panier not empty')
      for (var i=0; i<req.session.dataCardBike.length; i++){ // On cherche à voir si l'item à ajouter au panier est déjà dans le panier
        if(request1.name === req.session.dataCardBike[i].name){  // si oui... On augmente juste la quantité
          req.session.dataCardBike[i].quantity++
          break
        }else if (i===(req.session.dataCardBike.length-1) && (request1.name !== req.session.dataCardBike[i].name)){ //Si on a pas trouvé l'item lors de la dernière itération, on l'ajoute au tableau !
          req.session.dataCardBike.push(request1)
          break
        }
      }
    }
   }
   console.log(req.session.dataCardBike)
    res.render('shop', {dataCardBike:req.session.dataCardBike});
  });

module.exports = router;

// Mise à jour de la quantité de vélo dans le panier

router.post('/shop', function(req, res, next) {
  if (req.session.dataCardBike===undefined){req.session.dataCardBike=[]}
  var request3 = req.body
  console.log(request3.quantity)
  if (req.session.dataCardBike.length !== 0)
  {
    for (var i3=0; i3<req.session.dataCardBike.length; i3++)
    {
      if (request3.quantity == 0)
      {
        if(request3.name === req.session.dataCardBike[i3].name)
        {
          req.session.dataCardBike.splice(i3,1)
          break
        }
      }
      if(request3.name === req.session.dataCardBike[i3].name)
      {
        req.session.dataCardBike[i3].quantity = request3.quantity
        break
      }
    }
  }
  res.render('shop', {dataCardBike:req.session.dataCardBike});
});

// Suppression d'une ligne complète de panier
router.get('/shop/delete', function(req, res, next) {
  if (req.session.dataCardBike===undefined){req.session.dataCardBike=[]}
  var request2 = req.query
  for (var i2=0; i2<req.session.dataCardBike.length; i2++){
    if(request2.name === req.session.dataCardBike[i2].name){
      req.session.dataCardBike.splice(i2,1)
      break
    }
  }
  res.render('shop', {dataCardBike:req.session.dataCardBike});
});

/* 
router.post('/shop', function(req, res, next) {
  var request3 = req.body
  console.log(request3.quantity)
  for (var i3=0; i3<dataCardBike1.length; i3++){
    if (request3.quantity == 0){
      if(request3.name === dataCardBike1[i3].name){
        dataCardBike1.splice(i3,1)
        break
      }
    }
    if(request3.name === dataCardBike1[i3].name){
      dataCardBike1[i3].quantity = request3.quantity
    break
   }
  }
  res.render('shop', {dataCardBike:dataCardBike1});
});

// Suppression d'une ligne complète de panier
router.get('/shop/delete', function(req, res, next) {
  var request2 = req.query
  for (var i2=0; i2<dataCardBike1.length; i2++){
    if(request2.name === dataCardBike1[i2].name){
      dataCardBike1.splice(i2,1)
      break
    }
  }
  res.render('shop', {dataCardBike:dataCardBike1});
});

router.get('/', function(req, res, next) {
  res.render('index', {dataBike:dataBike});
});

// Ajouter un item au Panier
router.get('/shop', function(req, res, next) {
  console.log(req.query.name)
if(req.query.name!=undefined){  // On vérifie que l'url : /shop contient bien les paramètres attendus
  var request1 = req.query
  if (dataCardBike1.length==0)  // Si le panier est vide, on a juste besoin d'ajouter l'item... Pas de vérification à effectuer
  {
    dataCardBike1.push(request1)
  }else{  // Si le panier n'est pas vide
    for (var i=0; i<dataCardBike1.length; i++){ // On cherche à voir si l'item à ajouter au panier est déjà dans le panier
      if(request1.name === dataCardBike1[i].name){  // si oui... On augmente juste la quantité
        dataCardBike1[i].quantity++
        break
      }else if (i===(dataCardBike1.length-1) && (request1.name !== dataCardBike1[i].name)){ //Si on a pas trouvé l'item lors de la dernière itération, on l'ajoute au tableau !
        dataCardBike1.push(request1)
        break
      }
    }
  }
 }
  res.render('shop', {dataCardBike:dataCardBike1});
});

module.exports = router;

*/
