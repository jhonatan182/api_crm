import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="text-center bg-red-600 font-bold text-white my-4 p-3">
        {children}
    </div>
  )
}

export default Alerta;