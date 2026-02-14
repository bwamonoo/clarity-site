import { supabase } from '../../../lib/supabaseClient'

export const doctorsService = {
  async fetchDoctors() {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  },

  async createDoctor(doctorData) {
    const { data, error } = await supabase
      .from('doctors')
      .insert([{
        name: doctorData.name,
        specialization: doctorData.specialization || 'General Ophthalmology',
        active: doctorData.active !== false
      }])
      .select()

    if (error) throw error
    return data
  },

  async updateDoctor(doctorId, doctorData) {
    const { data, error } = await supabase
      .from('doctors')
      .update({
        name: doctorData.name,
        specialization: doctorData.specialization,
        active: doctorData.active,
        updated_at: new Date().toISOString()
      })
      .eq('id', doctorId)
      .select()

    if (error) throw error
    return data
  },

  async deleteDoctor(doctorId) {
    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', doctorId)

    if (error) throw error
  },

  async getActiveDoctorCount() {
    const { count, error } = await supabase
      .from('doctors')
      .select('*', { count: 'exact', head: true })
      .eq('active', true)

    if (error) throw error
    return count || 0
  },

  async getActiveDoctorIds() {
    const { data, error } = await supabase
      .from('doctors')
      .select('id')
      .eq('active', true)

    if (error) throw error
    return (data || []).map(d => d.id)
  }
}
