import { useState } from "react";
import { Mic, PhoneOff, BellOff, PawPrint, DoorOpen, ShieldCheck, Check } from "lucide-react";

const DeliveryInstructions = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const options = [
    {
      id: "record",
      icon: Mic,
      label: "Tap here and hold",
      subtitle: "Record",
      action: "record",
      showCheckbox: false,
    },
    {
      id: "avoid-calling",
      icon: PhoneOff,
      label: "Avoid calling",
      action: "toggle",
      showCheckbox: true,
    },
    {
      id: "dont-ring",
      icon: BellOff,
      label: "Don't ring the bell",
      action: "toggle",
      showCheckbox: true,
    },
    {
      id: "leave-at-door",
      icon: DoorOpen,
      label: "Leave at door",
      action: "toggle",
      showCheckbox: true,
    },
    {
      id: "leave-with-guard",
      icon: ShieldCheck,
      label: "Leave with guard",
      action: "toggle",
      showCheckbox: true,
    },
    {
      id: "pet-at-home",
      icon: PawPrint,
      label: "Pet at home",
      action: "toggle",
      showCheckbox: true,
    },
  ];

  const handleOptionClick = (option) => {
    if (option.action === "record") {
      setIsRecording(!isRecording);
      // Add voice recording logic here
      console.log("Recording toggled:", !isRecording);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(option.id)
          ? prev.filter((id) => id !== option.id)
          : [...prev, option.id]
      );
    }
  };

  const isSelected = (optionId) => selectedOptions.includes(optionId);

  return (
    <div className="mx-4 mb-32">
      {/* Header */}
      <h2 className="text-white font-semibold text-base mb-4">
        Delivery instructions
      </h2>

      {/* Horizontal Scrollable Options */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {options.map((option) => {
          const Icon = option.icon;
          const selected = option.action === "record" ? isRecording : isSelected(option.id);

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-4 min-w-[120px] shrink-0 transition-all duration-300 hover:border-white/20 relative"
            >
              {/* Checkbox - Only show if showCheckbox is true */}
              {option.showCheckbox && (
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      selected
                        ? "bg-blue-300 border-blue-300"
                        : "border-white/30 bg-transparent"
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 text-black" />}
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-white/5">
                  <Icon className="w-5 h-5 text-white/60" />
                </div>
              </div>

              {/* Label */}
              <div className="text-center">
                <div className="text-white/80 text-xs font-medium">
                  {option.label}
                </div>
                {option.subtitle && (
                  <div className="text-blue-300 text-[10px] font-medium mt-1">
                    {option.subtitle}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryInstructions;
