import { axiosConfiguration } from '../configuration/axiosConfiguration'

// obtener todos los tipos
const obtenerTipos = () => {
  return axiosConfiguration.get('tipos/?estado=true', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// crear un tipo
const crearTipo = (data) => {
  return axiosConfiguration.post('tipos', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// actualizar tipo
const editarTipo = (tipoId, data) => {
  return axiosConfiguration.put('tipos/' + tipoId, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// borrar tipo
const borrarTipo = (tipoId, data) => {
  return axiosConfiguration.delete('tipos/' + tipoId, {}, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// obtener tipo por su ID
const obtenerTipoPorID = (tipoId) => {
  return axiosConfiguration.get('tipos/' + tipoId, {
    headers: {
      'Content-Type': 'application.json'
    }
  })
}

export {
  obtenerTipos,
  crearTipo,
  editarTipo,
  borrarTipo,
  obtenerTipoPorID
}
