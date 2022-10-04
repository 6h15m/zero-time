import { useMemo, useState } from "react";
import { findIndex } from "lodash";
import { Link } from "gatsby";
import { AiOutlineArrowLeft } from "react-icons/ai";

type Series = {
  id: string;
  currentPost: boolean;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
  };
};

type Props = {
  header: string;
  series: Array<Series>;
};

export const Series = ({ header, series }: Props) => {
  const [fold, setFold] = useState(true);

  const filteredPosts = useMemo(() => {
    if (series.length < 5) return series;
    if (!fold) return series;

    const currentPostIdx = findIndex(series, { currentPost: true });

    if (currentPostIdx < 2) return series.slice(0, 5);
    if (series.length - currentPostIdx - 1 < 2)
      return series.slice(series.length - 5, series.length);

    return series.slice(currentPostIdx - 2, currentPostIdx + 3);
  }, [series, fold]);

  const showViewButton = useMemo(() => {
    return series.length > 5;
  }, [series]);

  return (
    <div className="p-4 border border-black rounded-sm flex flex-col gap-y-3">
      <h2 className="font-bold">
        <Link
          className="hover:underline"
          to={`/series/${header.replace(/\s/g, "-")}`}
        >
          {header}
        </Link>
      </h2>
      <ul className="flex flex-col gap-y-2">
        {filteredPosts.map((post, i) => (
          <div
            key={"post " + i}
            className={`text-sm items-center flex ${
              post.currentPost ? "text-black" : "text-zinc-400"
            }`}
          >
            <Link className="hover:text-black" to={post.fields.slug}>
              {post.frontmatter.title}
            </Link>
            {post.currentPost && <AiOutlineArrowLeft className="ml-2" />}
          </div>
        ))}
      </ul>
      {showViewButton && (
        <button
          className="text-sm text-center text-zinc-600 hover:text-black"
          onClick={() => {
            setFold(!fold);
          }}
        >
          {fold
            ? `View More (+${series.length - filteredPosts.length})`
            : "View Less"}
        </button>
      )}
    </div>
  );
};

export default Series;
