//GET /quizes/question
exports.question = function(req, res) {
  res.render('quizes/question', {pregunta: '¿Cuál es la capital de Italia?'});
};

//GET /quizes/answer
exports.answer = function(req, res) {
 var resp = (req.query.respuesta || "");
 if(resp.toUpperCase() === 'ROMA'){
   res.render('quizes/answer', {respuesta: 'correcta.'});
 } else {
   res.render('quizes/answer', {respuesta: 'incorrecta.'});
 }
};
