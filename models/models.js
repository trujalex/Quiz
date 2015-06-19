var path = require('path');

//Postgres DATABASE_URL = postgres://user:password@host:port/database
//postgres://tinbslbvkcetnf:rnlgncVPjCVLcUBwZBeEUFRnHw@ec2-54-204-20-209.compute-1.amazonaws.com:5432/d6e7jru9414t30
//SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage, //solo SQLite(.env)
    omitNull: true    //solo Postgres
  }
);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; //Exportar definicion de tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
  //success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function(count){
    if(count === 0) { //la tabla se inicializa sólo si está vacía
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'ROMA'
                 });
      Quiz.create({ pregunta: 'Capital de Portugal',
                    respuesta: 'LISBOA'
                 })
      .then(function(){console.log('Base de datos inicializada')});
    };
  });
});
