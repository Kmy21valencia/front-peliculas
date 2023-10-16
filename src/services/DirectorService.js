import { axiosConfiguration } from '../configuration/axiosConfiguration'

// obtener todos los directores
const obtenerDirectores = () => {
    return axiosConfiguration.get('directores/?estado=true', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// crear un director
const crearDirector = (data) => {
    return axiosConfiguration.post('directores', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// actualizar director
const editarDirector = (tipoId, data) => {
    return axiosConfiguration.put('directores/'+tipoId, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// borrar director
const borrarDirector = (tipoId) => {
    return axiosConfiguration.delete('directores/'+tipoId, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// obtener director por su ID
const obtenerDirectorPorID = (tipoId) => {
    return axiosConfiguration.get('directores/'+tipoId, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export {
    obtenerDirectores,
    crearDirector,
    editarDirector,
    borrarDirector,
    obtenerDirectorPorID
}
