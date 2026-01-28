import StoreCardShimmer from "./StoreCardShimmer";

const StoreListShimmer = () => {
  return (
    <main className="bg-black w-full">
      <div className="grid grid-cols-1 gap-1.5 mb-20 md:grid-cols-2 px-0">
        {[...Array(6)].map((_, index) => (
          <StoreCardShimmer key={index} />
        ))}
      </div>
    </main>
  );
};

export default StoreListShimmer;
