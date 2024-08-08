import Axios from 'axios';
export default async function toggleSiguiendo(usuario) {
  let usuarioActualizado;
  if (usuario.siguiendo) {
    await Axios.delete(`/api/amistades/${usuario._id}/eliminar`);
    usuarioActualizado = {
      ...usuario,
      numSeguidores: usuario.numSeguidores - 1,
      siguiendo: false
    };
  } else {
    await Axios.post(`/api/amistades/${usuario._id}/seguir`);
    usuarioActualizado = {
      ...usuario,
      numSeguidores: usuario.numSeguidores + 1,
      siguiendo: true
    };
  }
  return usuarioActualizado;
}




// import Axios from 'axios';

// export default async function toggleSiguiendo(user) {
//   let userActualizado;
//   if (user.siguiendo) {
//     await Axios.delete(`/api/amistades/${user._id}/eliminar`);
//     userActualizado = {
//       ...user,
//       numSeguidores: user.numSeguidores - 1,
//       siguiendo: false
//     };
//   } else {
//     await Axios.post(`/api/amistades/${user._id}/seguir`);
//     userActualizado = {
//       ...user,
//       numSeguidores: user.numSeguidores + 1,
//       siguiendo: true
//     };
//   }
//   return userActualizado;
// }