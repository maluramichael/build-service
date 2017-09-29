const Sequelize = require('sequelize');
const async = require('async');

/********************************************************
   _____       _______       ____           _____ ______ 
  |  __ \   /\|__   __|/\   |  _ \   /\    / ____|  ____|
  | |  | | /  \  | |  /  \  | |_) | /  \  | (___ | |__   
  | |  | |/ /\ \ | | / /\ \ |  _ < / /\ \  \___ \|  __|  
  | |__| / ____ \| |/ ____ \| |_) / ____ \ ____) | |____ 
  |_____/_/    \_\_/_/    \_\____/_/    \_\_____/|______|
                                      
 ********************************************************/
const db = new Sequelize(
  process.env.db || 'build',
  process.env.db_user || 'build',
  process.env.db_password || 'build', {
    host: process.env.db_host || 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: null
  });

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

/********************************************
   __  __  ____  _____  ______ _       _____ 
  |  \/  |/ __ \|  __ \|  ____| |     / ____|
  | \  / | |  | | |  | | |__  | |    | (___  
  | |\/| | |  | | |  | |  __| | |     \___ \ 
  | |  | | |__| | |__| | |____| |____ ____) |
  |_|  |_|\____/|_____/|______|______|_____/ 

 ********************************************/
const User = db.define('user', {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING
  }
});

const Build = db.define('build', {
  done: {
    type: Sequelize.BOOLEAN
  },
  success: {
    type: Sequelize.BOOLEAN
  }
});

const Artifact = db.define('artifact', {
  path: {
    type: Sequelize.STRING
  }
});

/********************************************
    _    _ ______ _      _____  ______ _____  
  | |  | |  ____| |    |  __ \|  ____|  __ \ 
  | |__| | |__  | |    | |__) | |__  | |__) |
  |  __  |  __| | |    |  ___/|  __| |  _  / 
  | |  | | |____| |____| |    | |____| | \ \ 
  |_|  |_|______|______|_|    |______|_|  \_\
                                           
 ********************************************/

const models = {
  User,
  Project,
  Build,
  Artifact
};

function sync(force = false) {
  return new Promise(function (resolve, reject) {
    async.eachSeries(models, function (model, done) {
      model.sync({
        force
      }).then(() => {
        done();
      }).catch(error => {
        done(error)
      });
    }, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    })
  })
}

module.exports = {
  db: db,
  models: models,
  sync: sync
};