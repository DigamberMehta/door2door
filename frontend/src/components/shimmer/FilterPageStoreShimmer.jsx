const FilterPageStoreShimmer = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-2.5 flex gap-3.5 border border-white/5">
      {/* Left Image Section Shimmer */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-xl"></div>
      </div>

      {/* Right Details Section Shimmer */}
      <div className="flex-1 flex flex-col justify-center min-w-0 pr-1 gap-2">
        {/* Title */}
        <div className="h-4 w-3/4 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>

        {/* Rating */}
        <div className="h-3 w-20 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>

        {/* Description */}
        <div className="h-3 w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>

        {/* Location/Time */}
        <div className="h-3 w-2/3 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
      </div>
    </div>
  );
};

export default FilterPageStoreShimmer;
