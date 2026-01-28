const ProductCardShimmer = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-2 flex flex-col">
      {/* Product Image Shimmer */}
      <div className="w-full aspect-square bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-lg mb-2"></div>

      {/* Product Info Shimmer */}
      <div className="flex flex-col flex-1 space-y-1.5">
        {/* Product name (2 lines) */}
        <div className="h-2 w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
        <div className="h-2 w-3/4 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>

        {/* Unit/Weight */}
        <div className="h-2 w-1/2 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>

        {/* Rating */}
        <div className="h-2 w-2/3 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>

        {/* Price & Button */}
        <div className="mt-auto pt-1">
          <div className="h-3 w-1/3 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded mb-1.5"></div>
          <div className="w-full h-6 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardShimmer;
