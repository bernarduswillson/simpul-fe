// Libs
import Image from "next/image";

// Assets
import chevronDownIcon from "@/assets/icons/chevron-down-ic.svg";

// Components
import FlyoutLink from "@/components/dialogue/FlyoutLink";

// Hooks
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setFilter } from "@/redux/reducers/taskSlice";


export default function EditMessageButton() {
  return (
    <div>
      <FlyoutLink FlyoutContent={EditMessageFlyout}>
        <button className="border-2 border-primary-gray rounded-md flex items-center lato-regular px-4 py-2 group hover:translate-y-[3px] transition-all duration-300">
          My Tasks
          <Image
            src={chevronDownIcon}
            alt="Chevron Down Icon"
            width={10}
            height={10}
            className="ml-2 transform group-hover:translate-y-[3px] transition-all duration-1000"
          />
        </button>
      </FlyoutLink>
    </div>
  );
};


const EditMessageFlyout = () => {
  // States
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.task.value.filter);

  return (
    <div className={`bg-white border-[1px] border-primary-gray rounded-lg shadow-md absolute w-[230px] left-[-60px] top-[-30px] lato-bold overflow-hidden`}>
      <button 
        className={`border-b-[1px] border-primary-gray w-[230px] px-5 py-2 bg-white text-black text-start hover:bg-primary-blue hover:text-white transition-all duration-200 ${filter === "all" ? "text-primary-blue" : ""}`}
        onClick={() => dispatch(setFilter("all"))}
      >
        All
      </button>
      <button 
        className={`border-b-[1px] border-primary-gray w-[230px] px-5 py-2 bg-white text-black text-start hover:bg-primary-blue hover:text-white transition-all duration-200 ${filter === "personal" ? "text-primary-blue" : ""}`}
        onClick={() => dispatch(setFilter("personal"))}
      > 
        Personal Errands
      </button>
      <button 
        className={`border-primary-gray w-[230px] px-5 py-2 bg-white text-black text-start hover:bg-primary-blue hover:text-white transition-all duration-200 ${filter === "urgent" ? "text-primary-blue" : ""}`}
        onClick={() => dispatch(setFilter("urgent"))}
      >
        Urgent To-Do
      </button>
    </div>
  );
};
