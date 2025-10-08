import { supabase } from '../../../lib/supabaseClient'

export const contactsService = {
  async fetchContacts() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async updateContactStatus(contactId, newStatus) {
    const { error } = await supabase
      .from('contacts')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', contactId)

    if (error) throw error
  },

  async deleteContact(contactId) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', contactId)

    if (error) throw error
  }
}