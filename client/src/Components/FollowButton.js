import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import toggleSiguiendo from '../Helpers/friendship-helpers';

function BotonSeguir({ user }) {
  const [siguiendo, setSiguiendo] = useState(false);


  // useEffect(() => {
  //   // Realizar una solicitud al backend para obtener el estado de seguimiento
  //   async function obtenerEstadoSeguimiento() {
  //     try {
  //       const userActualizado = await toggleSiguiendo(user);
  //       setSiguiendo(userActualizado.siguiendo);
  //     } catch (error) {
  //       console.error('Error al obtener el estado de seguimiento:', error);
  //     }
  //   }

  //   obtenerEstadoSeguimiento();
  // }, [user]);

  const onToggleSiguiendo = async () => {
    try {
      const userActualizado = await toggleSiguiendo(user);
      setSiguiendo(userActualizado.siguiendo);
    } catch (error) {
      console.error('Error al cambiar el estado de seguimiento:', error);
    }
  };

  return (
    <Button className="Perfil__boton-seguir" onClick={onToggleSiguiendo}>
      {siguiendo ? 'Dejar de seguir' : 'Seguir'}
    </Button>
  );
}

export default BotonSeguir;