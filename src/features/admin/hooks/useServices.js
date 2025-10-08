import { useState, useEffect } from 'react'
import { servicesService } from '../services/servicesService'
import { useAdmin } from '../../../contexts/AdminContext'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingService, setEditingService] = useState(null)
  const { setError: setAdminError, setSuccess } = useAdmin()

  const loadServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await servicesService.fetchServices()
      setServices(data)
    } catch (err) {
      console.error('Error loading services:', err)
      setError(err.message)
      setAdminError('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const saveService = async (serviceData) => {
    try {
      setLoading(true)
      setError(null)

      if (serviceData.id) {
        await servicesService.updateService(serviceData.id, serviceData)
        setSuccess('Service updated successfully')
      } else {
        await servicesService.createService(serviceData)
        setSuccess('Service created successfully')
      }

      await loadServices()
      setEditingService(null)
      return { success: true }
    } catch (err) {
      console.error('Error saving service:', err)
      setError(err.message)
      setAdminError('Failed to save service')
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteService = async (serviceId) => {
    try {
      setLoading(true)
      setError(null)

      await servicesService.deleteService(serviceId)
      await loadServices()
      setSuccess('Service deleted successfully')
      
      return { success: true }
    } catch (err) {
      console.error('Error deleting service:', err)
      setError(err.message)
      setAdminError('Failed to delete service')
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  return {
    services,
    loading,
    error,
    editingService,
    setEditingService,
    saveService,
    deleteService,
    refreshServices: loadServices
  }
}