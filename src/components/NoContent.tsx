import React from "react";

type Props = {
  name: string;
};

export const NoContent = ({ name }: Props) => (
  <div className="flex items-center justify-center font-bold text-3xl text-zinc-700">
    There is no {name}.
  </div>
);
