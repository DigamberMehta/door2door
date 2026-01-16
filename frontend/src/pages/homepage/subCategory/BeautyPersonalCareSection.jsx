import SubCategorySection from "./SubCategorySection";

const BeautyPersonalCareSection = ({ onCategoryClick }) => {
  const beautyItems = [
    {
      id: 1,
      name: "Bath & Body",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Hair",
      image:
        "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Skin & Face",
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Beauty & Cosmetics",
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Feminine Hygiene",
      image:
        "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Baby Care",
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "Health & Pharma",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop",
    },
    {
      id: 8,
      name: "Sexual Wellness",
      image:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&auto=format&fit=crop",
    },
  ];

  return (
    <SubCategorySection
      title="Beauty & Personal Care"
      items={beautyItems}
      onCategoryClick={onCategoryClick}
      route="/beauty"
    />
  );
};

export default BeautyPersonalCareSection;
