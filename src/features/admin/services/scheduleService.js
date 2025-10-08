import { supabase } from '../../../lib/supabaseClient'

export const scheduleService = {
  async fetchSchedule() {
    const { data, error } = await supabase
      .from('clinic_schedule')
      .select('*')
      .order('weekday')

    if (error) throw error
    return data || []
  },

  async updateSchedule(scheduleData) {
    // Map frontend data to database format
    const dataToUpdate = scheduleData.map(day => {
      const { day_name, open, id, ...rest } = day
      return {
        ...rest,
        active: open
      }
    })

    const { error } = await supabase
      .from('clinic_schedule')
      .upsert(dataToUpdate, { 
        onConflict: 'weekday'
      })

    if (error) throw error
  }
}