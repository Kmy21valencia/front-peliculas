import React, { useEffect, useState } from 'react'
import { borrarGenero, crearGenero, obtenerGeneros } from '../../services/GeneroService'
import Title from '../ui/Title'
import Modal from './Modal'
import Table from './Table'
import ButtonModal from '../ui/ButtonModal'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'

export default function Genero() {

    const [generos, setGeneros] = useState([])
    const [loader, setLoader] = useState(false)
    const [genero, setGenero] = useState({
      nombre: '',
      descripcion: ''
    })

  useEffect(() => {
    listarGeneros()
  }, [])

  const listarGeneros = async () => {
    setLoader(true)
    try {
        const { data } = await obtenerGeneros()
        setGeneros(data)
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
        const response = await crearGenero(genero)
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
        listarGeneros()
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
    setGenero({
      ...genero, 
      [e.target.name]: e.target.value
    })
  }

  const clearForm = () => {
    setGenero({
      nombre: '',
      descripcion: ''
    })
  }

  const borrarGeneroPorId = (e) => {
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
          const response = await borrarGenero(id)
          console.log(response)
          setLoader(false)
          listarGeneros()
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
          'Genero borrado.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
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
      <Title title={'Generos'}/>
      {
        loader && (<Spinner />)
      }
      <Table 
        generos={generos} 
        borrarGeneroPorId={borrarGeneroPorId}
      />
      <ButtonModal title='Nuevo Genero'/>
      <Modal 
        genero={genero} 
        change={handleChange}
        guardar={guardar}
        clearForm={clearForm}
      />
    </>
  )
}
