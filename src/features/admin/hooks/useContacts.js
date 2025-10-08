import { useState, useEffect } from 'react'
import { contactsService } from '../services/contactsService'
import { useAdmin } from '../../../contexts/AdminContext'

export function useContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { setError: setAdminError, setSuccess } = useAdmin()

  const fetchContacts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await contactsService.fetchContacts()
      setContacts(data)
    } catch (err) {
      console.error('Error fetching contacts:', err)
      setError(err.message)
      setAdminError('Failed to load contact messages')
    } finally {
      setLoading(false)
    }
  }

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      setError(null)
      await contactsService.updateContactStatus(contactId, newStatus)

      setContacts(prev => prev.map(contact =>
        contact.id === contactId 
          ? { ...contact, status: newStatus, updated_at: new Date().toISOString() }
          : contact
      ))

      setSuccess(`Contact marked as ${newStatus}`)
      return { success: true }
    } catch (err) {
      console.error('Error updating contact status:', err)
      setError(err.message)
      setAdminError('Failed to update contact status')
      return { success: false, error: err.message }
    }
  }

  const deleteContact = async (contactId) => {
    try {
      setError(null)
      await contactsService.deleteContact(contactId)

      setContacts(prev => prev.filter(contact => contact.id !== contactId))
      setSuccess('Contact message deleted')
      
      return { success: true }
    } catch (err) {
      console.error('Error deleting contact:', err)
      setError(err.message)
      setAdminError('Failed to delete contact message')
      return { success: false, error: err.message }
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return {
    contacts,
    loading,
    error,
    updateContactStatus,
    deleteContact,
    refreshContacts: fetchContacts
  }
}