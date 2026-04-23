export default function BookingSummary({ booking }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Booking Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">Test Price</span>
          <span className="font-medium text-[var(--color-text-dark)]">₹{booking.testPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">Discount ({booking.discountPct}%)</span>
          <span className="font-semibold text-red-500">- ₹{booking.discount}</span>
        </div>
        <div className="border-t border-dashed border-[var(--color-border)] pt-3 flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">Subtotal</span>
          <span className="font-bold text-[var(--color-text-dark)]">₹{booking.subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">Home Collection</span>
          <span className="font-bold text-[var(--color-success)]">{booking.homeCollection}</span>
        </div>
        <div className="border-t border-[var(--color-border)] pt-3 flex justify-between">
          <span className="font-bold text-[var(--color-text-dark)]">Total Amount</span>
          <span className="font-bold text-lg text-[var(--color-text-dark)]">₹{booking.total}</span>
        </div>
      </div>
    </div>
  );
}
