import React from 'react'

export default function Modal({
  genero,
  change,
  guardar,
  clearForm
}) {

  const handleChange = e => {
    change(e)
  }

  const guardarGenero = (e) => {
    e.preventDefault()
    guardar()
  }

  const clear = () => {
    clearForm()
  }

  return (
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo Genero</h1>
        <button 
          type="button" 
          className="btn-close" 
          data-bs-dismiss="modal" 
          aria-label="Close"
          onClick={clear}
        >
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={guardarGenero}>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Nombre:</label>
            <input 
              type="text" 
              className="form-control" 
              id="recipient-name" 
              onChange={handleChange}
              value={genero.nombre}
              name="nombre"
            />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Descripción:</label>
            <textarea 
              className="form-control" 
              id="message-text"
              onChange={handleChange}
              value={genero.descripcion}
              name='descripcion'
            >
            </textarea>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="modal"
              onClick={clear}
            >
              Cerrar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={genero.nombre.length == 1}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</div>
  )
}
