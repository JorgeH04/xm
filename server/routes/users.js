// const express = require('express');
// const _ = require('underscore');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const validarUsuario = require('./users.validate').validarUsuario;
// const validarPedidoDeLogin = require('./users.validate').validarPedidoDeLogin;
// const config = require('../config');
// const usersController = require('../controllers/users');
// const { DatosDeUsuarioYaEnUso, CredencialesIncorrectas } = require('./users.error');
// const jwtAuthenticate = passport.authenticate('jwt', { session: false });


// const router = express.Router();

// function transformarBodyALowercase(req, res, next) {
//   req.body.username && (req.body.username = req.body.username.toLowerCase());
//   req.body.email && (req.body.email = req.body.email.toLowerCase());
//   next();
// }

// router.get(
//   '/',((req, res) => {
//     return usersController.obtenerUsuarios().then(usuarios => {
//       res.json(usuarios);
//     });
//   })
// );

// // router.get(
// //   '/explore',
// //   [jwtAuthenticate],(async (req, res) => {
// //     usersController
// //       .obtenerUsuariosExplore(req.user.id)
// //       .then(user => res.json(user));
// //   })
// // );

// router.get('/whoami', [jwtAuthenticate], (async (req, res) => {
//     res.json(esconderCamposSensibles(req.user));
//   })
// );

// router.get(
//   '/:username',
//   [jwtAuthenticate],(async (req, res) => {
//     const username = req.params.username;
//     const usuario = await usersController.obtenerUsuario(
//       { username },
//       req.user.id
//     );

//     if (!usuario) {
//       let err = new Error(`Usuario con username [${username}] no existe.`);
//       err.status = 404;
//       throw err;
//     }

//     res.json(esconderCamposSensibles(usuario));
//   })
// );

// router.post(
//   '/signup',
//   [validarUsuario, transformarBodyALowercase],
//   (async(req, res) => {
//     let nuevoUsuario = req.body;

//     return usersController
//       .usuarioExiste(nuevoUsuario.username, nuevoUsuario.email)
//       .then(usuarioExiste => {
//         if (usuarioExiste) {
//           console.log( 
//             `Email [${nuevoUsuario.email}] o username [${
//               nuevoUsuario.username
//             }] ya existen en la base de datos`
//           );
//           throw new DatosDeUsuarioYaEnUso();
//         }

//         return bcrypt.hash(nuevoUsuario.password, 10);
//       })
//       .then(hash => {
//         return usersController
//           .crearUsuario(nuevoUsuario, hash)
//           .then(nuevoUsario => {
//             res.status(201).json({
//               token: crearToken(nuevoUsario._id),
//               usuario: esconderCamposSensibles(nuevoUsario)
//             });

//             return nuevoUsario;
//           })
//           .then(nuevoUsario => {
//             // El usuario creado se sigue a si mismo
//             friendshipsController.createFriendship(nuevoUsario._id, nuevoUsario._id);
//           });
//       });
//   })
// );

// router.post(
//   '/login',
//   [validarPedidoDeLogin, transformarBodyALowercase],
//   (async (req, res) => {
//     let usuarioNoAutenticado = req.body;

//     let usuarioRegistrado = await usersController.obtenerUsuario({
//       email: usuarioNoAutenticado.email
//     });
//     if (!usuarioRegistrado) {
//       console.log(
//         `Usuario con email [${
//           usuarioNoAutenticado.email
//         }] no existe. No pudo ser autenticado`
//       );
//       throw new CredencialesIncorrectas();
//     }

//     let contraseñaCorrecta = await bcrypt.compare(
//       usuarioNoAutenticado.password,
//       usuarioRegistrado.password
//     );
//     if (contraseñaCorrecta) {
//       let token = crearToken(usuarioRegistrado.id);

//       console.log(
//         `Usuario con email ${
//           usuarioNoAutenticado.email
//         } completo autenticación exitosamente.`
//       );

//       const usuario = esconderCamposSensibles(usuarioRegistrado);

//       res.status(200).json({ token, usuario });
//     } else {
//       console.log(
//         `Usuario con email ${
//           usuarioNoAutenticado.email
//         } no completo autenticación. Contraseña incorrecta`
//       );
//       throw new CredencialesIncorrectas();
//     }
//   })
// );



// function crearToken(usuarioId) {
//   return jwt.sign({ id: usuarioId }, config.jwt.secreto, {
//     expiresIn: config.jwt.tiempoDeExpiración
//   });
// }

// function esconderCamposSensibles(usuario) {
//   return {
//     _id: usuario._id || usuario.id, // Cuando el usuario viene de req.user el id es "id" en vez de "_id"
//     email: usuario.email,
//     username: usuario.username,
//     bio: usuario.bio,
//     nombre: usuario.nombre,
//     imagen: usuario.imagen,
//   };
// }


// module.exports = router;








const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');
const usersController = require('../controllers/users');
const { DatosDeUsuarioYaEnUso, CredencialesIncorrectas } = require('./users.error');
const jwtAuthenticate = passport.authenticate('jwt', { session: false });
const User = require('../models/users');


const router = express.Router();

 

router.get(
  '/',((req, res) => {
    return usersController.obtainUsers().then(usuarios => {
      res.json(usuarios);
    });
  })
);

// router.get(
//   '/explore',
//   [jwtAuthenticate],(async (req, res) => {
//     usersController
//       .obtenerUsuariosExplore(req.user.id)
//       .then(user => res.json(user));
//   })
// );

router.get('/whoami', jwtAuthenticate, (async (req, res) => {
    res.json(esconderCamposSensibles(req.user));
  })
);

router.get(
  '/:username',
  jwtAuthenticate,(async (req, res) => {
    const username = req.params.username;
    const user = await usersController.obtainUser(
      { username },
      req.user.id
    );

    if (!user) {
      let err = new Error(`Usuario con username [${username}] no existe.`);
      err.status = 404;
      throw err;
    }

    res.json(esconderCamposSensibles(user));
  })
);

router.post(
  '/signup',
  (async(req, res) => {
    let newUser = req.body;

    return usersController
      .userExist(newUser.username, newUser.email)
      .then(userExist => {
        if (userExist) {
          console.log( 
            `Email [${newUser.email}] o username [${
              newUser.username
            }] ya existen en la base de datos`
          );
        }

        return bcrypt.hash(newUser.password, 10);
      })
      .then(hash => {
        return usersController
          .createUser(newUser, hash)
          .then(newUser => {
            res.status(201).json({
              token: crearToken(newUser._id),
              user: esconderCamposSensibles(newUser)
            });

            return newUser;
          })

          
      });
  })
);

router.post(
  '/login',
  (async (req, res) => {
    let userNotAuthenticated = req.body;  

    let userRegistered = await usersController.obtainUser({
      email: userNotAuthenticated.email
    });
    if (!userRegistered) {
      console.log(
        `Usuario con email [${
          userNotAuthenticated.email
        }] no existe. No pudo ser autenticado`
      );
    }

    let contraseñaCorrecta = await bcrypt.compare(
      userNotAuthenticated.password,
      userRegistered.password
    );
    if (contraseñaCorrecta) {
      let token = crearToken(userRegistered.id);

      console.log(
        `Usuario con email ${
          userNotAuthenticated.email
        } completo autenticación exitosamente.`
      );

      const user = esconderCamposSensibles(userRegistered);

      res.status(200).json({ token, user });
    } else {
      console.log(
        `Usuario con email ${
          userNotAuthenticated.email
        } no completo autenticación. Contraseña incorrecta`
      );
    }
  })
);



function crearToken(usuarioId) {
  return jwt.sign({ id: usuarioId }, config.jwt.secreto, {
    expiresIn: config.jwt.tiempoDeExpiración
  });
}

function esconderCamposSensibles(user) {
  return {
    _id: user._id || user.id,  
    email: user.email,
    username: user.username,
    bio: user.bio,
    name: user.name,
    picture: user.picture,
  };
}



router.get("/user/:userId", (req, res) => {
  try {
    const loggedInUserId = req.params.userId;

    User.find({ _id: { $ne: loggedInUserId } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        console.log("Error: ", error);
        res.status(500).json("errror");
      });
  } catch (error) {
    res.status(500).json({ message: "error getting the users" });
  }
});


module.exports = router;
