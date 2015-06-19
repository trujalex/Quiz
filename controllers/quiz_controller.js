var models = require('../models/models.js');

//Autoload - Factoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(function(quiz) {
    if(quiz){
      req.quiz = quiz;
      next();
    } else {
      next(new error('No existe un Quiz con quizId = ' + quizId));
    }
  }
).catch(function(error) { next(error);});
};

//GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', {quiz: req.quiz});
  })
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    var resp = (req.query.respuesta || "");
    if(resp.toUpperCase() === req.quiz.respuesta){
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'correcta.'});
    } else {
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'incorrecta.'});
    }
  })
};

//GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', {quizes: quizes});
    }
  ).catch(function(error) { next(error);})
};
