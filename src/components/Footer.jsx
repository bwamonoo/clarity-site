import React from 'react'

export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container-custom-2">
        <div className="row gy-4">
          <div className="col-md-4">
            <h5>Clarity Eye Clinic</h5>
            <p className="muted">Expert eye care, optical services, and modern diagnostics.</p>
            <p className="muted mb-0">Address line • City • Country</p>
            <p className="muted">Phone: +233-XX-XXX-XXXX</p>
          </div>

          <div className="col-md-3">
            <h6>Clinic</h6>
            <ul className="list-unstyled">
              <li><a href="/services">Services</a></li>
              <li><a href="/staff">Staff</a></li>
              <li><a href="/appointments">Appointments</a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6>Legal</h6>
            <ul className="list-unstyled">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms</a></li>
            </ul>
          </div>

          <div className="col-md-2 text-md-end">
            <h6>Follow</h6>
            <div className="d-flex gap-2 justify-content-md-end">
              <a className="btn btn-sm btn-outline-light rounded-circle" href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a className="btn btn-sm btn-outline-light rounded-circle" href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a className="btn btn-sm btn-outline-light rounded-circle" href="#" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
            </div>
            <div className="mt-3 muted">© {year} Clarity Eye Clinic</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
