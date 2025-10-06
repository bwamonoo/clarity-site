// src/hooks/useSchedule.js
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useSchedule = () => {
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Day names mapping
  const dayNames = {
    0: 'Sunday',
    1: 'Monday', 
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  // Load schedule
  const loadSchedule = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('clinic_schedule')
        .select('*')
        .order('weekday')

      if (error) throw error

      // Transform data with day names and map 'active' to 'open' for frontend
      const transformedSchedule = data.map(day => ({
        ...day,
        day_name: dayNames[day.weekday] || `Day ${day.weekday}`,
        open: day.active // Map database 'active' to frontend 'open'
      }))

      setSchedule(transformedSchedule)
    } catch (err) {
      setError(err.message)
      console.error('Error loading schedule:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Update schedule - Map 'open' back to 'active' for database
const updateSchedule = useCallback(async (scheduleData) => {
  try {
    setLoading(true)
    setError(null)

    // Map frontend data to database format - remove ID completely for new records
    const dataToUpdate = scheduleData.map(day => {
      const { day_name, open, id, ...rest } = day // Remove id from rest
      
      return {
        ...rest,
        active: open
        // Don't include id - let database handle it
      }
    })

    console.log('Updating schedule with data:', dataToUpdate)

    const { error } = await supabase
      .from('clinic_schedule')
      .upsert(dataToUpdate, { 
        onConflict: 'weekday'
      })

    if (error) throw error

    await loadSchedule()
    
    return { success: true, message: 'Schedule updated successfully' }
  } catch (err) {
    setError(err.message)
    console.error('Error updating schedule:', err)
    return { success: false, message: err.message }
  } finally {
    setLoading(false)
  }
}, [loadSchedule])
  // Load schedule on mount
  useEffect(() => {
    loadSchedule()
  }, [loadSchedule])

  return {
    schedule,
    loading,
    error,
    updateSchedule,
    refreshSchedule: loadSchedule
  }
}