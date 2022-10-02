import React from "react";
import BlogConfig from "../../../../blog-config";
import { Divider } from "../../Divider";
import { TagList } from "../../TagList";

type Tag = {
  fieldValue: string;
  totalCount: number;
};

type Props = {
  title: string;
  date: string;
  tags: Array<Tag>;
  minToRead: number;
};

export const Header = ({ title, date, tags, minToRead }: Props) => {
  return (
    <div className="mt-8">
      <div className="font-bold text-4xl text-black">{title}</div>
      <div className="flex mb-8">
        <div className="font-semibold text-black"> {BlogConfig.author} </div>
        <div className="text-zinc-800">· {date} </div>
        <div className="text-zinc-800">· {minToRead} min read </div>
      </div>
      {tags && <TagList tagList={tags} />}
      <Divider mt="0" />
    </div>
  );
};
