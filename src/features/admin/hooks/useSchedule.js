import { useState, useEffect } from 'react'
import { scheduleService } from '../services/scheduleService'
import { useAdmin } from '../../../contexts/AdminContext'

export function useSchedule() {
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { setError: setAdminError, setSuccess } = useAdmin()

  const dayNames = {
    0: 'Sunday',
    1: 'Monday', 
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  const loadSchedule = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await scheduleService.fetchSchedule()

      // Transform data with day names and map 'active' to 'open' for frontend
      const transformedSchedule = data.map(day => ({
        ...day,
        day_name: dayNames[day.weekday] || `Day ${day.weekday}`,
        open: day.active
      }))

      setSchedule(transformedSchedule)
    } catch (err) {
      console.error('Error loading schedule:', err)
      setError(err.message)
      setAdminError('Failed to load schedule')
    } finally {
      setLoading(false)
    }
  }

  const updateSchedule = async (scheduleData) => {
    try {
      setLoading(true)
      setError(null)

      await scheduleService.updateSchedule(scheduleData)
      await loadSchedule()
      setSuccess('Schedule updated successfully')
      
      return { success: true }
    } catch (err) {
      console.error('Error updating schedule:', err)
      setError(err.message)
      setAdminError('Failed to update schedule')
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSchedule()
  }, [])

  return {
    schedule,
    loading,
    error,
    updateSchedule,
    refreshSchedule: loadSchedule
  }
}