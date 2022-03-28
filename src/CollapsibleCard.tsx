import React from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";

const CollapsibleCard = (props: { header: any; children: any }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex space-x-4">
        <div className="">
          <button onClick={handleToggleOpen} className="text-5xl text-gray">
            <ChevronRightIcon
              className={`h-6 w-6 text-gray-600 transition ${
                isOpen && "rotate-90"
              }`}
            />
          </button>
        </div>
        <div className="space-y-6 flex-1">
          <div className="">{props.header}</div>
          {isOpen && <div className="border-t py-6">{props.children}</div>}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleCard;
