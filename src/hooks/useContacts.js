// src/hooks/useContacts.js - NEW
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch contacts from Supabase
  const fetchContacts = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (supabaseError) throw supabaseError

      setContacts(data || [])
    } catch (err) {
      console.error('Error fetching contacts:', err)
      setError('Failed to load contact messages')
    } finally {
      setLoading(false)
    }
  }

  // Update contact status
  const updateContactStatus = async (contactId, newStatus) => {
    try {
      setError(null)

      const { error: supabaseError } = await supabase
        .from('contacts')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', contactId)

      if (supabaseError) throw supabaseError

      // Update local state
      setContacts(prev => prev.map(contact =>
        contact.id === contactId 
          ? { ...contact, status: newStatus, updated_at: new Date().toISOString() }
          : contact
      ))

      return { success: true }
    } catch (err) {
      console.error('Error updating contact status:', err)
      setError('Failed to update contact status')
      return { success: false, error: err.message }
    }
  }

  // Delete contact
  const deleteContact = async (contactId) => {
    try {
      setError(null)

      const { error: supabaseError } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId)

      if (supabaseError) throw supabaseError

      // Update local state
      setContacts(prev => prev.filter(contact => contact.id !== contactId))

      return { success: true }
    } catch (err) {
      console.error('Error deleting contact:', err)
      setError('Failed to delete contact message')
      return { success: false, error: err.message }
    }
  }

  // Refresh contacts
  const refreshContacts = () => {
    fetchContacts()
  }

  // Initial fetch
  useEffect(() => {
    fetchContacts()
  }, [])

  return {
    contacts,
    loading,
    error,
    updateContactStatus,
    deleteContact,
    refreshContacts
  }
}