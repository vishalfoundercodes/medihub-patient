import api, { apis } from '../utlities/api';

const TYPE_MAP = {
  medicine:    'medicine',
  test:        'lab_test',
  doctor:      'appointment',
  lab_test:    'lab_test',
  appointment: 'appointment',
};

/**
 * POST cart/add
 * Body: { type, item_id, quantity }
 * Auth: Bearer token auto-injected by axios interceptor
 */
export const addToCartAPI = async ({ type, item_id, quantity = 1 }) => {
  const mappedType = TYPE_MAP[type] || 'medicine';
  const response = await api.post(apis.addToCart, {
    type: mappedType,
    item_id,
    quantity,
  });
  return response.data;
};

/**
 * GET cart
 * Returns cart items + summary
 * Auth: Bearer token auto-injected by axios interceptor
 */
export const getCartAPI = async () => {
  const response = await api.get(apis.getCart);
  return response.data;
};

/**
 * POST orders/place  (multipart/form-data)
 * Fields: address_id, note, prescription (file, optional — only for medicine)
 * Auth: Bearer token auto-injected
 */
export const placeOrderAPI = async ({ address_id, note = '', prescription = null, lab_test_slot_id = null, lab_test_booking_date = null }) => {
  const formData = new FormData();
  formData.append('address_id', address_id);
  formData.append('note', note);
  if (prescription) formData.append('prescriptions', prescription);
  if (lab_test_slot_id) formData.append('lab_test_slot_id', lab_test_slot_id);
  if (lab_test_booking_date) formData.append('lab_test_booking_date', lab_test_booking_date);
  const response = await api.post(apis.orderPlace, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * GET orders
 * Returns list of all orders with items
 * Auth: Bearer token auto-injected
 */
export const getOrdersAPI = async () => {
  const response = await api.get(apis.getOrders);
  return response.data;
};

/**
 * GET orders/:id
 * Returns single order detail with items
 * Auth: Bearer token auto-injected
 */
export const getOrderDetailAPI = async (orderId) => {
  const response = await api.get(`${apis.getOrderDetail}/${orderId}`);
  return response.data;
};

/**
 * GET doctors/:id
 * Returns doctor detail with slots
 * Auth: Bearer token auto-injected
 */
export const getDoctorDetailAPI = async (doctorId) => {
  const response = await api.get(`${apis.getDoctorDetail}/${doctorId}`);
  return response.data;
};
