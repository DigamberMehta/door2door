import { HiOutlineSearch } from "react-icons/hi";
import StoreCard from "./StoreCard";

const StoreList = ({ stores, onStoreClick, onCategoryClick }) => {
  return (
    <main className="px-4 py-6 bg-black max-w-xl mx-auto md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-zinc-800">
        <h2 className="text-2xl font-bold text-white m-0 tracking-wide">
          Stores
        </h2>
        <button
          className="bg-transparent border border-zinc-700 text-white px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 tracking-wide hover:bg-zinc-800 hover:border-zinc-600 hover:-translate-y-0.5 active:translate-y-0"
          onClick={() =>
            onCategoryClick({ category: "All Stores", route: "/stores" })
          }
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} onStoreClick={onStoreClick} />
        ))}
      </div>

      {stores.length === 0 && (
        <div className="text-center py-15 px-5">
          <HiOutlineSearch className="text-6xl text-slate-300 block mx-auto mb-4" />
          <p className="text-lg font-semibold text-white my-2">
            No stores found
          </p>
          <p className="text-sm text-zinc-500 font-normal">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </main>
  );
};

export default StoreList;
