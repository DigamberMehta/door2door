import ProductCardShimmer from "./ProductCardShimmer";

const ProductGridShimmer = () => {
  return (
    <div className="px-2 pt-4 pb-6">
      {/* Multiple sections */}
      {[1, 2].map((section) => (
        <div key={section} className="mb-6">
          {/* Section header shimmer */}
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 w-32 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
            <div className="h-3 w-16 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded"></div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, index) => (
              <ProductCardShimmer key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridShimmer;
