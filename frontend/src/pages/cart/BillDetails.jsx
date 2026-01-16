const BillDetails = ({ cartItems }) => {
  // Calculate totals
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const deliveryCharge = 30;
  const isFreeDelivery = itemsTotal > 500; // Free delivery above ₹500
  
  const handlingCharge = 11;
  const grandTotal = itemsTotal + (isFreeDelivery ? 0 : deliveryCharge) + handlingCharge;

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-4 mx-4 mb-4">
      {/* Bill Details Header */}
      <h2 className="text-white font-semibold text-base mb-4">Bill details</h2>
      
      {/* Items Total */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-white/80 text-sm">Items total</span>
        </div>
        <span className="text-white font-semibold">₹{itemsTotal}</span>
      </div>
      
      {/* Delivery Charge */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
          <span className="text-white/80 text-sm">Delivery charge</span>
        </div>
        {isFreeDelivery ? (
          <span className="text-blue-300 font-bold text-sm">FREE</span>
        ) : (
          <span className="text-white font-semibold">₹{deliveryCharge}</span>
        )}
      </div>
      
      {/* Handling Charge */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-white/80 text-sm">Handling charge</span>
        </div>
        <span className="text-white font-semibold">₹{handlingCharge}</span>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-white/10 mb-4" />
      
      {/* Grand Total */}
      <div className="flex justify-between items-center">
        <span className="text-white font-bold text-lg">Grand total</span>
        <span className="text-white font-bold text-xl">₹{grandTotal}</span>
      </div>
    </div>
  );
};

export default BillDetails;

