// Components
export { default as AdminHeader } from './components/shared/AdminHeader'
export { default as AdminSidebar } from './components/shared/AdminSidebar'
export { default as AdminLogin } from './components/shared/AdminLogin'
export { default as LoadingSpinner } from './components/shared/LoadingSpinner'
export { default as AdminContent } from './components/shared/AdminContent'
export { default as MobileBreadcrumb } from './components/shared/MobileBreadcrumb'

// Feature Tabs
export { default as DashboardTab } from './components/dashboard/DashboardTab'
export { default as AppointmentsTab } from './components/appointments/AppointmentsTab'
export { default as ServicesTab } from './components/services/ServicesTab'
export { default as DoctorsTab } from './components/doctors/DoctorsTab'
export { default as ScheduleTab } from './components/schedule/ScheduleTab'
export { default as ContactsTab } from './components/contacts/ContactsTab'

// Hooks
export { useAppointments } from './hooks/useAppointments'
export { useDashboard } from './hooks/useDashboard'
export { useServices } from './hooks/useServices'
export { useDoctors } from './hooks/useDoctors'
export { useSchedule } from './hooks/useSchedule'
export { useContacts } from './hooks/useContacts'

// Services
export { appointmentsService } from './services/appointmentsService'
export { dashboardService } from './services/dashboardService'
export { servicesService } from './services/servicesService'
export { doctorsService } from './services/doctorsService'
export { scheduleService } from './services/scheduleService'
export { contactsService } from './services/contactsService'