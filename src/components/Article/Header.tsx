import BlogConfig from "../../../blog-config";
import { Divider } from "../Divider";
import { TagList } from "../TagList";

type Tag = {
  fieldValue: string;
  totalCount: number;
};

type Props = {
  title: string;
  date: string;
  tags: Array<Tag>;
  minToRead: number;
  hasSeries: boolean;
};

export const Header = ({ title, date, tags, minToRead, hasSeries }: Props) => {
  return (
    <div className="flex flex-col py-4 gap-y-4">
      <div className="font-bold text-4xl text-black">{title}</div>
      <div className="flex gap-x-1 text-sm">
        <div className="font-semibold text-black">{BlogConfig.author}</div>
        <div className="text-zinc-400">·</div>
        <div className="text-zinc-700">{date}</div>
        <div className="text-zinc-400">·</div>
        <div className="text-zinc-700">{minToRead} min read </div>
      </div>
      {tags && <TagList tagList={tags} className="text-xs" />}
      {!hasSeries && <Divider mt="0" />}
    </div>
  );
};
