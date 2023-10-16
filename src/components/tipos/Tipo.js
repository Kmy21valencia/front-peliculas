import React, { useEffect, useState } from 'react'
import { borrarTipo, crearTipo, obtenerTipos } from '../../services/TipoService'
import Title from '../ui/Title'
import Modal from './Modal'
import Table from './Table'
import ButtonModal from '../ui/ButtonModal'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'

export default function Tipo() {

    const [tipos, setTipos] = useState([])
    const [loader, setLoader] = useState(false)
    const [tipo, setTipo] = useState({
      nombre: '',
      descripcion: ''
    })

  useEffect(() => {
    listarTipos()
  }, [])

  const listarTipos = async () => {
    setLoader(true)
    try {
        const { data } = await obtenerTipos()
        setTipos(data)
        setLoader(false)
    } catch (e) {
        console.log(e)
        setLoader(false)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar datos!',
          footer: 'Intenta de nuevo!'
        })
    }
  }

  const guardar = async () => {
    setLoader(true)
    try {
        const response = await crearTipo(tipo)
        console.log(response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado exitoso',
          showConfirmButton: false,
          timer: 1500
        })
        setLoader(false)
        clearForm()
        listarTipos()
    } catch (e) {
        console.log(e)
        setLoader(false)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al intentar guardar!',
          footer: 'Intenta de nuevo!'
        })
    }
  }

  const handleChange = e => {
    console.log(e.target)
    setTipo({
      ...tipo, 
      [e.target.name]: e.target.value
    })
  }

  const clearForm = () => {
    setTipo({
      nombre: '',
      descripcion: ''
    })
  }

  const borrarTipoPorId = (e) => {
    const id = e.target.id
    setLoader(true)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await borrarTipo(id)
          console.log(response)
          setLoader(false)
          listarTipos()
      } catch (e) {
          console.log(e)
          setLoader(false)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al intentar eliminar!',
            footer: 'Intenta de nuevo!'
          })
      }
        swalWithBootstrapButtons.fire(
          'Borrado!',
          'Tipo borrado.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Cancelaste la borrada :)',
          'error'
        )
        setLoader(false)
      }
    })
  }

  return (
    <>
      <Title title={'Tipos'}/>
      {
        loader && (<Spinner />)
      }
      <Table 
        tipos={tipos} 
        borrarTipoPorId={borrarTipoPorId}
      />
      <ButtonModal title='Nuevo Tipo'/>
      <Modal 
        tipo={tipo} 
        change={handleChange}
        guardar={guardar}
        clearForm={clearForm}
      />
    </>
  )
}

