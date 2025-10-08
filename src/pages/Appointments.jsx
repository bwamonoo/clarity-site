import React from 'react'
import { BookingProvider } from '../contexts/BookingContext'
import { BookingFlow, BookingInfo } from '../features/booking'

function BookingApp() {
  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        <BookingFlow />
        <BookingInfo />
      </div>
    </div>
  )
}

export default function Appointments() {
  return (
    <BookingProvider>
      <BookingApp />
    </BookingProvider>
  )
}