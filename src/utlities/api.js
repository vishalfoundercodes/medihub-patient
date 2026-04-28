import axios from 'axios';

export const base_url = "http://localhost:3002/";

const api = axios.create({
  baseURL: `${base_url}api/`,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apis = {
  sendOtp: "auth/send-otp",
  verifyOtp: "auth/verify-otp",
  register: "auth/register-profile",
  profile: "users/profile",
  profileUpdate: "users/profile",
  slider: "sliders?panel=user",
  labTest: "lab-tests",
  labTestCategory: "lab-tests/categories",
  labTestCategory: "lab-tests/categories",
  medicines: "medicines",
  medicineCategory: "medicines/categories",
  medicinesBrands: "medicines/brands",
  doctors: "doctors",
  doctorSpecializations: "doctors/specializations",
  doctors: "doctors",
  wishlist: "wishlist",
  wishlistToggle: "wishlist/toggle",
  wishlistAllClear: "wishlist/clear",
  appSettings: "app-settings",
  privacyPolicy: "policies/privacy_policy",
  termsConditions: "policies/terms_conditions",
  cancellationPolicy: "policies/cancellation_policy",
  // ---------------------------------------------
  addToCart: "cart/add",
  getCart: "cart",
  orderPlace: "orders/place",
  getOrders: "orders",
  getOrderDetail: "orders",
  getDoctorDetail: "doctors",
  bookAppointment: "appointments",
  appointmentHistory: "appointments/history",
  appointmentDetail: "appointments",
};

export default api;
