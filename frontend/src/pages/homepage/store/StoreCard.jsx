import { MdStar, MdAccessTime, MdLocationOn } from "react-icons/md";

const StoreCard = ({ store, onStoreClick }) => {
  const StoreIcon = store.icon;

  return (
    <div
      className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ease-out relative border border-zinc-800 hover:-translate-y-1 hover:shadow-2xl hover:border-zinc-700"
      onClick={() => onStoreClick(store)}
    >
      {store.offer && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold z-10 shadow-lg tracking-wide uppercase">
          {store.offer}
        </div>
      )}
      <div
        className="h-36 flex items-center justify-center relative transition-transform duration-300 hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${store.iconColor}15, ${store.iconColor}30)`,
        }}
      >
        <StoreIcon
          className="text-5xl drop-shadow-md"
          style={{ color: store.iconColor }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2.5 m-0 tracking-wide">
          {store.name}
        </h3>
        <div className="flex gap-3 mb-2.5 flex-wrap">
          <span className="text-xs text-white font-semibold flex items-center gap-1">
            <MdStar className="text-sm text-amber-500" /> {store.rating}
          </span>
          <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
            <MdAccessTime className="text-sm" /> {store.deliveryTime}
          </span>
          <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
            <MdLocationOn className="text-sm" /> {store.distance}
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {store.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-md text-xs font-semibold border border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
