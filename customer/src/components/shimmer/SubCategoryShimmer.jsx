const SubCategoryShimmer = () => {
  return (
    <section className="px-2 py-4 bg-black max-w-xl mx-auto md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
      {/* Title Shimmer */}
      <div className="h-6 w-40 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded mb-3"></div>

      {/* Grid Shimmer */}
      <div className="grid grid-cols-4 gap-2.5 max-w-full md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 sm:gap-2">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="text-center flex flex-col items-center justify-start gap-1"
          >
            {/* Image Shimmer */}
            <div className="h-auto w-full aspect-square rounded-xl bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer mb-0"></div>
            {/* Text Shimmer */}
            <div className="h-3 w-3/4 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded mt-1"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubCategoryShimmer;
