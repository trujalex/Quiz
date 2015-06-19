var express = require('express');
var router = express.Router();


var quizController = require('../controllers/quiz_controller');

/* Página de entrada (home page). */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Página del autor
router.get('/author', function(req, res) {
  res.render('author');
});

//Autoload de comandos que contengan quizId
router.param('quizId', quizController.load); //Autoload :quizId

//Definición de las rutas de los quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);


module.exports = router;
