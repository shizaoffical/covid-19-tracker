import React from 'react'

export default function TableData({allCountriesCases}) {
  return (
    <div className='table'>
      {allCountriesCases.map(({country , cases}) => (
        <tr>
             
            <td>{country}</td>
            <td><strong>{cases}</strong></td>
        </tr>
      ))}

    </div>
  )
}
