import { supabase } from '../../../lib/supabaseClient'

export const servicesService = {
  async fetchServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  },

  async createService(serviceData) {
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
    return data
  },

  async updateService(serviceId, serviceData) {
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
      .eq('id', serviceId)
      .select()

    if (error) throw error
    return data
  },

  async deleteService(serviceId) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', serviceId)

    if (error) throw error
  }
}