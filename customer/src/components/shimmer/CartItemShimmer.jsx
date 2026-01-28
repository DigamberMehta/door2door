const CartItemShimmer = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
      <div className="flex gap-3">
        {/* Product Image Shimmer */}
        <div className="w-16 h-16 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-lg shrink-0"></div>

        {/* Product Details Shimmer */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="space-y-1.5">
            {/* Product name */}
            <div className="h-3 w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
            <div className="h-3 w-3/4 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>

            {/* Variant */}
            <div className="h-2 w-1/2 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
          </div>
        </div>

        {/* Price and Quantity Shimmer */}
        <div className="flex flex-col items-end justify-between">
          {/* Price */}
          <div className="h-4 w-16 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>

          {/* Quantity controls */}
          <div className="h-7 w-20 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CartItemShimmer;
