import { Link } from "gatsby";
import { FiTag } from "react-icons/fi";
import { spaceToDash } from "../utils";

type Tag =
  | {
      fieldValue: string;
      totalCount: number;
    }
  | string;

type Props = {
  tags: Array<Tag>;
};

export const SideTagList = ({ tags }: Props) => {
  return (
    <div className="relative xl:block hidden">
      <aside className="absolute -right-10 translate-x-[100%] flex flex-col gap-2">
        <Link to="/tags">
          <FiTag className="w-5 h-5 stroke-1" />
        </Link>
        <ul className="text-xs flex flex-col gap-y-1.5">
          <li>
            <Link to="/tags"># All</Link>
          </li>
          {tags.map((tag) => {
            const tagName = typeof tag === "object" ? tag.fieldValue : tag;
            return (
              <li key={tagName}>
                <Link to={`/tags?q=${spaceToDash(tagName)}`}># {tagName}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};
