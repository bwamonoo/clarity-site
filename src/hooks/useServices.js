import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useServices = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingService, setEditingService] = useState(null)

  // Load all services
  const loadServices = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name')

      if (error) throw error

      setServices(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error loading services:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Create or update service
  const saveService = useCallback(async (serviceData) => {
    try {
      setLoading(true)
      setError(null)

      if (serviceData.id) {
        // Update existing service
        const { data, error } = await supabase
          .from('services')
          .update({
            name: serviceData.name,
            description: serviceData.description,
            short_description: serviceData.short_description,
            price: serviceData.price,
            duration: serviceData.duration,
            icon: serviceData.icon,
            category: serviceData.category,
            active: serviceData.active,
            updated_at: new Date().toISOString()
          })
          .eq('id', serviceData.id)
          .select()

        if (error) throw error
      } else {
        // Create new service
        const { data, error } = await supabase
          .from('services')
          .insert([{
            name: serviceData.name,
            description: serviceData.description,
            short_description: serviceData.short_description,
            price: serviceData.price,
            duration: serviceData.duration,
            icon: serviceData.icon,
            category: serviceData.category,
            active: serviceData.active !== false
          }])
          .select()

        if (error) throw error
      }

      await loadServices()
      setEditingService(null)
      
      return { success: true, message: 'Service saved successfully' }
    } catch (err) {
      setError(err.message)
      console.error('Error saving service:', err)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }, [loadServices])

  // Delete service
  const deleteService = useCallback(async (serviceId) => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId)

      if (error) throw error

      await loadServices()
      
      return { success: true, message: 'Service deleted successfully' }
    } catch (err) {
      setError(err.message)
      console.error('Error deleting service:', err)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }, [loadServices])

  // Load services on mount
  useEffect(() => {
    loadServices()
  }, [loadServices])

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