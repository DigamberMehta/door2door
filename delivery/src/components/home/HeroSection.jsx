import heroImage from "../../assets/herosection.png";

const HeroSection = () => {
  return (
    <div className="w-full bg-blue-300 overflow-hidden h-[160px]">
      <img 
        src={heroImage} 
        alt="Hero Banner" 
        className="w-full h-full object-cover "
      />
    </div>
  );
};

export default HeroSection;
