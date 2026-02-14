import { useState, useEffect } from 'react'
import { doctorsService } from '../services/doctorsService'
import { useAdmin } from '../../../contexts/AdminContext'

export function useDoctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const { setError: setAdminError, setSuccess } = useAdmin()

  const loadDoctors = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await doctorsService.fetchDoctors()
      setDoctors(data)
    } catch (err) {
      console.error('Error loading doctors:', err)
      setError(err.message)
      setAdminError('Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }

  const saveDoctor = async (doctorData) => {
    try {
      setLoading(true)
      setError(null)

      if (doctorData.id) {
        await doctorsService.updateDoctor(doctorData.id, doctorData)
        setSuccess('Doctor updated successfully')
      } else {
        await doctorsService.createDoctor(doctorData)
        setSuccess('Doctor added successfully')
      }

      await loadDoctors()
      setEditingDoctor(null)
      return { success: true }
    } catch (err) {
      console.error('Error saving doctor:', err)
      setError(err.message)
      setAdminError('Failed to save doctor')
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteDoctor = async (doctorId) => {
    try {
      setLoading(true)
      setError(null)

      await doctorsService.deleteDoctor(doctorId)
      await loadDoctors()
      setSuccess('Doctor removed successfully')

      return { success: true }
    } catch (err) {
      console.error('Error deleting doctor:', err)
      setError(err.message)
      setAdminError('Failed to remove doctor')
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDoctors()
  }, [])

  return {
    doctors,
    loading,
    error,
    editingDoctor,
    setEditingDoctor,
    saveDoctor,
    deleteDoctor,
    refreshDoctors: loadDoctors
  }
}
