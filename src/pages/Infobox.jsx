import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import CountUp from 'react-countup'

export default function Infobox({ title, casses, total}) {
  return (
    <div>
    <Card>
       <CardContent>
        <Typography className='info__title' color="textsecondary">{title}
        </Typography>
        <h3 className='info__casses'><CountUp start={0} end={casses} duration={2.5} separator=","/> </h3>
        <Typography className='info__total' color="textsecondary"> 
        <CountUp start={0} end={total} duration={2.5} separator=","/> Total
        </Typography>
       </CardContent>
    </Card>
    </div>
  ) 
}
