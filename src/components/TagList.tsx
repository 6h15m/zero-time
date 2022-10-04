import { Link } from "gatsby";
import { spaceToDash } from "../utils";

type TagLinkProps = {
  selected: boolean;
  to: string;
  name: string;
  amount?: number | string | null;
};

const TagLink = ({ selected, to, name, amount }: TagLinkProps) => (
  <Link
    to={to}
    className={`border border-black px-2 py-1 ${
      selected
        ? "bg-black text-white"
        : "bg-white text-black hover:bg-black hover:text-white"
    }`}
  >
    # {name}
    {amount && `(${amount})`}
  </Link>
);

type Tag =
  | {
      fieldValue: string;
      totalCount: number;
    }
  | string;

type Props = {
  tagList: Array<Tag>;
  count?: boolean;
  selected?: string;
  className?: string;
};

export const TagList = ({ tagList, count, selected, className }: Props) => {
  return tagList.length > 0 ? (
    <div className={`flex gap-2 flex-wrap ${className}`}>
      {tagList.map((tag, index) => {
        const name = typeof tag === "object" ? tag.fieldValue : tag;
        return (
          <TagLink
            key={`tag-${index}`}
            to={selected === name ? "/tags" : `/tags?q=${spaceToDash(name)}`}
            selected={name === selected}
            name={name}
            amount={
              count ? (typeof tag === "object" ? tag.totalCount : tag) : null
            }
          />
        );
      })}
    </div>
  ) : null;
};
