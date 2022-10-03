import type { ChangeEventHandler } from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const TextField = ({ onChange }: Props) => {
  return (
    <div className="relative">
      <input
        className="w-full border py-3 border-black focus:outline-none pl-12 pr-4"
        onChange={onChange}
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2">
        <FiSearch className="stroke-1 w-5 h-5" />
      </span>
    </div>
  );
};
