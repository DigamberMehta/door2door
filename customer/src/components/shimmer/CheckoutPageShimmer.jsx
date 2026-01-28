import CartItemShimmer from "./CartItemShimmer";

const CheckoutPageShimmer = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Shimmer */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="w-5 h-5 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
          <div className="h-5 w-24 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
          <div className="w-5 h-5 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
        </div>
      </div>

      {/* Cart Items Shimmer */}
      <div className="px-3 py-3 space-y-2">
        {[...Array(3)].map((_, index) => (
          <CartItemShimmer key={index} />
        ))}
      </div>

      {/* Recommended Products Section Shimmer */}
      <div className="px-3 py-3">
        <div className="h-5 w-48 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded mb-3"></div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="min-w-[140px] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-2"
            >
              <div className="w-full aspect-square bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-lg mb-2"></div>
              <div className="h-3 w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded mb-1"></div>
              <div className="h-2 w-3/4 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded mb-2"></div>
              <div className="h-6 w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Details Section Shimmer */}
      <div className="px-3 py-3">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 space-y-2">
          <div className="h-4 w-32 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded mb-3"></div>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="h-3 w-24 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
              <div className="h-3 w-16 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
            </div>
          ))}
          <div className="border-t border-white/10 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
              <div className="h-4 w-20 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Shimmer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 p-3 z-40">
        <div className="space-y-2">
          <div className="h-3 w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
          <div className="h-3 w-3/4 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded mb-3"></div>
          <div className="flex items-center justify-between">
            <div className="h-5 w-32 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
            <div className="h-10 w-40 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageShimmer;
