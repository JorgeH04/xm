require('dotenv').config();
const express = require('express');  
const morgan = require('morgan');
const authJWT = require('./libs/auth');
const cors = require('cors');


const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const likesRoutes = require('./routes/likes');
// const profileRoutes = require('./routes/profile');


   

const passport = require('passport');
passport.use(authJWT);

require('./database');


const app = express();
app.set('port', process.env.PORT || 4000);

    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());  

// Servir archivos estáticos que están en la carpeta public/
app.use(express.static('public'));
 



app.use(passport.initialize());



app.use('/api/usuarios', usersRoutes);
app.use('/', postsRoutes);
app.use('/', likesRoutes);

  // app.use('/', usersRoutes);
  // app.use('/', profileRoutes); 
  

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});    
