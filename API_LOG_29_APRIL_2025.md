# API Integration Log — 29 April 2025

## 1. Doctor Detail API
- **Endpoint:** `GET /api/doctors/:doctorId`
- **Page:** `BookAppointment.jsx`
- **Kaam:** Doctor ka detail fetch karna — name, specialization, fee, slots, consultancy_type
- **Features added:**
  - `consultancy_type` ke basis par consultation type auto-set aur lock
  - Doctor ke `slots` se sirf available days ki dates selectable
  - Selected date ke weekday ke hisaab se time slots dikhna

---

## 2. Book Appointment API
- **Endpoint:** `POST /api/appointments`
- **Page:** `BookAppointment.jsx`
- **Auth:** Bearer Token (Authorization header)
- **Request:** `multipart/form-data`
- **Body:**
  | Field | Type |
  |-------|------|
  | `doctor_id` | number |
  | `slot_id` | number |
  | `appointment_date` | string (YYYY-MM-DD) |
  | `consultancy_type` | string (online / offline) |
  | `reports` | file[] (images/pdf) |

---

## 3. Appointment History API
- **Endpoint:** `GET /api/appointments/history`
- **Page:** `Appointments.jsx`
- **Auth:** Bearer Token
- **Kaam:** Patient ki saari appointments fetch karna
- **Response groups:** `pending`, `upcoming`, `completed`, `cancelled`, `rejected`
- **Features added:**
  - Tab filters — pending / upcoming / completed / cancelled / rejected
  - Search by doctor name, specialization, appointment ID
  - `AppointmentCard` real API fields se update kiya
  - `UpcomingAppointmentCard` real API fields se update kiya

---

## 4. Appointment Detail API
- **Endpoint:** `GET /api/appointments/:appointmentId`
- **Page:** `AppointmentDetail.jsx`
- **Auth:** Bearer Token
- **Kaam:** Kisi ek appointment ka poora detail fetch karna
- **Features added:**
  - Doctor info, patient info, slot time, consultancy type
  - Uploaded reports — clickable links
  - Prescription — download link
  - Review — star rating + text
  - Video call join button (sirf online + pending/upcoming)
  - Clinic address with Google Maps link (sirf offline)
  - Timeline — status ke hisaab se dynamic steps

---

## Components Updated Today

| Component | Change |
|-----------|--------|
| `AppointmentCard.jsx` | Real API fields, video call link, prescription download |
| `UpcomingAppointmentCard.jsx` | Real API fields, video call join button |
| `AppointmentFilters.jsx` | Tab IDs lowercase (match API status values) |
| `ApptDetailHero.jsx` | Lowercase status styles, real booked date |
| `ApptDoctorCard.jsx` | Real doctor fields from API |
| `ApptInfoGrid.jsx` | Real date, time, type, patient info |
| `ApptAboutSection.jsx` | Reports, prescription, review from API |
| `ApptActionButtons.jsx` | Conditional video call button |
| `ApptTimeline.jsx` | Dynamic steps from status |
| `ApptSummary.jsx` | Real fee and status |
| `ApptHospitalCard.jsx` | Real address, Google Maps link |

---

## `api.js` — New Endpoints Added

```js
bookAppointment:     "appointments"           // POST
appointmentHistory:  "appointments/history"   // GET
appointmentDetail:   "appointments"           // GET /:id
getDoctorDetail:     "doctors"                // GET /:id  (already existed)
```
