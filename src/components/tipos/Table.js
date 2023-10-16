import React from 'react'

export default function Table({
  tipos = [], 
  borrarTipoPorId
}) {

  const borrarPorId = (e) => {
    e.preventDefault()
    borrarTipoPorId(e)
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
        {
          tipos.map((tipo, index) => {
            const {nombre, descripcion, estado} = tipo
            return (
              <tr key={index}> 
                <th scope="row">{index+1}</th>
                <td>{nombre}</td>
                <td>{estado ? 'Activo': 'Inactivo'}</td>
                <td>{descripcion}</td>
                <td>
                  <button type="button" className="btn btn-info">Editar</button>
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    id={tipo._id}
                    onClick={borrarPorId}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
