# MediHub Patient — Dev Log
**Date: 29 April 2025**

---

## 1. Search Fix
- **File:** `src/pages/Search.jsx`
- API se saara data aa raha tha bina filter ke
- `fetchResults` mein frontend par `filterByName` function add kiya jo query se naam match karta hai
- Ab "ESR" search karne par sirf ESR naam wale items dikhenge

---

## 2. Auth Validation — Book Appointment / Add to Cart / Book Now
- **Files:** `src/context/AuthContext.jsx`, `src/components/doctors/DoctorCard.jsx`, `src/components/lab/LabTestCard.jsx`, `src/components/medicines/MedicineCard.jsx`, `src/pages/BookAppointment.jsx`
- `AuthContext` mein `requireAuth()` function add kiya
- Token localStorage mein nahi hai → Login modal open hota hai
- Token hai → Normal flow chalta hai
- Buttons covered: Book Appointment, Book Now, Add to Cart, +/- qty, Confirm Appointment

---

## 3. Add Address API
- **Files:** `src/pages/MyAddresses.jsx`
- Mock data hata diya
- `POST addresses` — Add new address
- `GET addresses` — Fetch all addresses
- `PUT addresses/:id` — Update address
- `DELETE addresses/:id` — Delete address
- Request body: `name, mobile, address_line, city, state, pincode, label, is_default`

---

## 4. Update Address API
- **File:** `src/pages/MyAddresses.jsx`
- `PUT addresses/:id` mein puri address details bhejni thi sirf `is_default` nahi
- Success hone par API response ka message toast mein dikhta hai
- Toast 3 seconds baad auto-hide hota hai

---

## 5. handleSetDefault Fix
- **File:** `src/pages/MyAddresses.jsx`
- Pehle sirf `{ is_default: 1 }` ja raha tha
- Ab puri body: `name, mobile, address_line, city, state, pincode, label, is_default: 1`
- Success par API response message toast mein show hota hai

---

## 6. Page Refresh Fix — Auth Loading
- **Files:** `src/context/AuthContext.jsx`, `src/components/ProtectedRoute.jsx`, `src/App.jsx`
- **Problem:** Refresh karne par `user` null hota tha, pages home redirect kar dete the aur login modal khul jaata tha
- **Fix:**
  - `AuthContext` mein `authLoading` state add ki — localStorage restore hone tak `true` rehti hai
  - `ProtectedRoute` component banaya — `authLoading` true hai toh wait karo, false + no user toh redirect karo
  - `App.jsx` mein sabhi protected routes `ProtectedRoute` se wrap kiye
  - Sabhi pages se manual `!user` redirect logic hata diya

### Protected Routes:
`/account`, `/orders`, `/order/:id`, `/my-lab-tests`, `/appointments`, `/appointment/:id`, `/notifications`, `/help-support`, `/lab-checkout`, `/medicine-cart`, `/my-addresses`, `/wishlist`

---

## 7. Account Page — Recent Orders Real API
- **File:** `src/components/account/RecentOrders.jsx`
- Mock data `MOCK_ORDERS` hata diya
- `GET orders` API se latest 5 orders fetch hote hain
- Order type ke hisaab se icon — Medicine → ShoppingBag, Lab Test → FlaskConical, Appointment → Calendar
- Status badges: placed, confirmed, shipped, delivered, completed, cancelled
- Card click karne par `/order/:uid` pe navigate karta hai
- Loading spinner aur empty state add kiya

---

## 8. Order Detail Page Fix
- **File:** `src/pages/OrderDetail.jsx`
- `order` null hone par `order.status` access karte hi crash ho raha tha
- Loading aur error states ko order data use karne se pehle render kiya
- `GET orders/:id` API sahi se hit ho rahi hai

---

## 9. Place Order — Type Parameter
- **Files:** `src/services/cartService.js`, `src/pages/MedicineCart.jsx`, `src/pages/LabCheckout.jsx`
- `placeOrderAPI` mein `type` parameter add kiya jo FormData mein append hota hai
- Medicine page se order → `type: 'medicine'`
- Lab checkout se order → `type: 'lab_test'`

---

## 10. My Lab Tests — Real API
- **File:** `src/pages/MyLabTests.jsx`
- Mock data hata diya
- `GET lab-test-orders` API se real data fetch hota hai
- Fields: `lab_test_name`, `lab_test_image`, `category_name`, `booking_date`, `discounted_price`, `slot_start/slot_end`, `status`
- Status: requested, confirmed, collected, completed, cancelled
- Slot time format: `09:00:00` → `9:00 AM`
- Loading spinner aur empty state add kiya

---

## 11. Lab Test Order Detail Page
- **Files:** `src/pages/LabTestOrderDetail.jsx`, `src/App.jsx`, `src/pages/MyLabTests.jsx`, `src/utlities/api.js`
- Naya page banaya: `GET lab-test-orders/:id`
- My Lab Tests mein card click par `/my-lab-test/:id` pe navigate karta hai
- Page mein dikhta hai:
  - Test info (naam, category, description, image)
  - Booking details (collection date, time slot)
  - Order timeline (requested → confirmed → collected → completed / cancelled)
  - Collection address
  - Price summary (original, discount, total paid)
- Route: `/my-lab-test/:id` (Protected)

---

## 12. Help & Support — Real API
- **Files:** `src/pages/HelpSupport.jsx`, `src/components/support/CreateTicketForm.jsx`, `src/components/support/TicketHistoryCard.jsx`, `src/utlities/api.js`

### Create Ticket
- `POST support` — FormData: `title`, `description`, `image`
- Success → API response message toast mein dikhta hai, history tab open hota hai
- Error → Form ke neeche error message dikhta hai

### Ticket History
- `GET support` — Sabhi tickets fetch hote hain
- Filter: All, Pending, Resolved, Rejected
- Pending tickets ka count badge tab button pe dikhta hai
- `TicketHistoryCard` mein API fields map kiye: `title`, `description`, `image_url`, `status`, `admin_note`, `resolved_at`

---

## API Endpoints Added Today

| Key | Endpoint | Method |
|-----|----------|--------|
| `addAddress` | `addresses` | POST |
| `getAddress` | `addresses` | GET |
| `updateAddress` | `addresses/:id` | PUT |
| `getLabTestOrders` | `lab-test-orders` | GET |
| `getLabTestOrderDetail` | `lab-test-orders/:id` | GET |
| `createSupportTicket` | `support` | POST |
| `getSupportTickets` | `support` | GET |

---

## New Files Created Today

| File | Description |
|------|-------------|
| `src/components/ProtectedRoute.jsx` | Auth guard component |
| `src/pages/LabTestOrderDetail.jsx` | Lab test order detail page |

## Files Modified Today

| File | Changes |
|------|---------|
| `src/context/AuthContext.jsx` | `authLoading`, `requireAuth()` added |
| `src/App.jsx` | ProtectedRoute wrap, new routes added |
| `src/pages/Search.jsx` | Frontend filter fix |
| `src/pages/MyAddresses.jsx` | Full real API integration |
| `src/pages/HelpSupport.jsx` | Real API, toast, error handling |
| `src/pages/MyLabTests.jsx` | Real API integration |
| `src/pages/OrderDetail.jsx` | Loading/error state fix |
| `src/pages/MedicineCart.jsx` | `type: 'medicine'` in placeOrder |
| `src/pages/LabCheckout.jsx` | `type: 'lab_test'` in placeOrder |
| `src/components/account/RecentOrders.jsx` | Real API, 5 orders |
| `src/components/doctors/DoctorCard.jsx` | `requireAuth` on Book Appointment |
| `src/components/lab/LabTestCard.jsx` | `requireAuth` on Book Now |
| `src/components/medicines/MedicineCard.jsx` | `requireAuth` on Add to Cart |
| `src/components/support/CreateTicketForm.jsx` | Real API, title/description/image |
| `src/components/support/TicketHistoryCard.jsx` | API response fields mapped |
| `src/services/cartService.js` | `type` param in placeOrderAPI |
| `src/utlities/api.js` | New endpoints added |
