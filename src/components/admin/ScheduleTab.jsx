// src/components/admin/ScheduleTab.jsx
import React, { useState } from 'react'
import { useSchedule } from '../../hooks/useSchedule'

export default function ScheduleTab() {
  const { schedule, loading, error, updateSchedule } = useSchedule()
  const [saving, setSaving] = useState(false)

  // Initialize schedule data
  const [scheduleData, setScheduleData] = useState(
    Array.from({ length: 7 }, (_, i) => ({
      weekday: i,
      day_name: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i],
      open: false,
      start_time: '09:00',
      end_time: '17:00',
      slot_duration: 30
    }))
  )

  // Update schedule data when loaded
  React.useEffect(() => {
    if (schedule.length > 0) {
      const updatedSchedule = scheduleData.map(day => {
        const existingDay = schedule.find(s => s.weekday === day.weekday)
        return existingDay ? { ...day, ...existingDay } : day
      })
      setScheduleData(updatedSchedule)
    }
  }, [schedule])

  // Handle schedule change
  const handleScheduleChange = (weekday, field, value) => {
    setScheduleData(prev => prev.map(day => 
      day.weekday === weekday ? { ...day, [field]: value } : day
    ))
  }

  // Save schedule
  const handleSaveSchedule = async () => {
    setSaving(true)
    try {
      const result = await updateSchedule(scheduleData)
      if (result.success) {
        // Success handled in hook
      }
    } finally {
      setSaving(false)
    }
  }

  // Reset to default
  const handleReset = () => {
    setScheduleData(prev => prev.map(day => ({
      ...day,
      open: [1, 2, 3, 4, 5].includes(day.weekday), // Mon-Fri open by default
      start_time: '09:00',
      end_time: '17:00',
      slot_duration: 30
    })))
  }

  return (
    <div className="glass-admin-card">
      <div className="glass-card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="glass-card-title">Clinic Schedule</h5>
            <p className="glass-card-subtitle">Set your clinic operating hours</p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-glass-admin"
              onClick={handleReset}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Reset
            </button>
            <button
              className="btn elegant-btn"
              onClick={handleSaveSchedule}
              disabled={saving || loading}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Save Schedule
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card-body">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-accent" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading schedule...</p>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="schedule-list">
                {scheduleData.map(day => (
                  <div key={day.weekday} className="glass-admin-card mb-3 border-0">
                    <div className="glass-card-body">
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={day.open}
                              onChange={(e) => handleScheduleChange(day.weekday, 'open', e.target.checked)}
                              style={{ transform: 'scale(1.2)' }}
                            />
                            <label className="form-check-label fw-bold text-dark">
                              {day.day_name}
                            </label>
                          </div>
                        </div>
                        
                        <div className="col-md-9">
                          <div className="row g-3 align-items-center">
                            <div className="col-sm-4">
                              <label className="form-label-glass small mb-1">Start Time</label>
                              <input
                                type="time"
                                className="form-control elegant-input"
                                value={day.start_time}
                                onChange={(e) => handleScheduleChange(day.weekday, 'start_time', e.target.value)}
                                disabled={!day.open}
                              />
                            </div>
                            <div className="col-sm-4">
                              <label className="form-label-glass small mb-1">End Time</label>
                              <input
                                type="time"
                                className="form-control elegant-input"
                                value={day.end_time}
                                onChange={(e) => handleScheduleChange(day.weekday, 'end_time', e.target.value)}
                                disabled={!day.open}
                              />
                            </div>
                            <div className="col-sm-4">
                              <label className="form-label-glass small mb-1">Slot Duration</label>
                              <select
                                className="form-select elegant-input"
                                value={day.slot_duration}
                                onChange={(e) => handleScheduleChange(day.weekday, 'slot_duration', parseInt(e.target.value))}
                                disabled={!day.open}
                              >
                                <option value={15}>15 minutes</option>
                                <option value={30}>30 minutes</option>
                                <option value={45}>45 minutes</option>
                                <option value={60}>60 minutes</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="glass-admin-card border-0">
                <div className="glass-card-body">
                  <h6 className="card-title text-dark mb-3">
                    <i className="bi bi-info-circle text-accent me-2"></i>
                    Schedule Information
                  </h6>
                  <ul className="list-unstyled small text-muted">
                    <li className="mb-2">
                      <i className="bi bi-toggle-on text-accent me-2"></i>
                      Toggle days on/off to set operating days
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-clock text-accent me-2"></i>
                      Set start and end times for each day
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-hourglass text-accent me-2"></i>
                      Slot duration determines appointment intervals
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-save text-accent me-2"></i>
                      Changes take effect immediately after saving
                    </li>
                    <li>
                      <i className="bi bi-calendar-x text-accent me-2"></i>
                      Closed days will not show available slots
                    </li>
                  </ul>
                  
                  <div className="mt-4 p-3 rounded border" style={{background: 'rgba(255,255,255,0.3)'}}>
                    <h6 className="small text-muted mb-2">Quick Stats</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Open Days:</span>
                      <strong className="text-accent">
                        {scheduleData.filter(day => day.open).length}/7
                      </strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Standard Hours:</span>
                      <strong className="text-dark">9AM - 5PM</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}