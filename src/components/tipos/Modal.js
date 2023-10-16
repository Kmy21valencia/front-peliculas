import React from 'react'

export default function Modal({
  tipo,
  change,
  guardar,
  clearForm
}) {

  const handleChange = e => {
    change(e)
  }

  const guardarTipo = (e) => {
    e.preventDefault()
    guardar()
  }

  const clear = () => {
    clearForm()
  }

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo Tipo</h1>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close"
              onClick={clear}
            />
          </div>
          <div className="modal-body">
            <form onSubmit={guardarTipo}>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="recipient-name" 
                  onChange={handleChange}
                  value={tipo.nombre}
                  name="nombre"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Descripción:</label>
                <textarea 
                  className="form-control" 
                  id="message-text"
                  onChange={handleChange}
                  value={tipo.descripcion}
                  name='descripcion'
                />
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
                  disabled={tipo.nombre.length === 1}
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
