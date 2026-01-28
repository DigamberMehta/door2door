const StoreBannerShimmer = () => {
  return (
    <div className="px-2 pt-2">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Store Image Shimmer */}
        <div className="w-full h-44 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer"></div>

        {/* Store Info Shimmer */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0 pr-2 space-y-2">
              {/* Store name */}
              <div className="h-6 w-3/4 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
              {/* Delivery time & location */}
              <div className="h-3 w-1/2 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
            </div>

            <div className="flex flex-col items-end gap-1">
              {/* Rating badge */}
              <div className="h-6 w-12 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-lg"></div>
              {/* Rating text */}
              <div className="h-2 w-16 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBannerShimmer;
