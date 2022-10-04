import { useEffect, useState } from "react";
import { Title } from "./Title";
import { throttle } from "lodash";

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  );
};

type Post = unknown;

type Series = {
  name: string;
  posts: Array<Post>;
  lastUpdated: string;
};

type Props = {
  seriesList: Array<Series>;
};

export const SeriesList = ({ seriesList }: Props) => {
  const [seriesCount, setSeriesCount] = useState(10);

  const handleMoreLoad = throttle(() => {
    if (checkIsScrollAtBottom() && seriesCount < seriesList.length) {
      setTimeout(() => setSeriesCount(seriesCount + 10), 300);
    }
  }, 250);

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad);

    return () => {
      window.removeEventListener("scroll", handleMoreLoad);
    };
  }, [seriesCount, seriesList]);

  useEffect(() => {
    setSeriesCount(10);
  }, [seriesList]);

  return (
    <div className="flex flex-col gap-y-4">
      {seriesList.slice(0, seriesCount).map((series) => {
        return (
          <div className="border border-zinc-200 rounded bg-zinc-50 p-5">
            <Title
              size="sm"
              to={`/series/${series.name.replace(/\s/g, "-")}`}
              title={series.name}
            />
            <div className="flex gap-x-1 text-xs">
              <span>{series.posts.length} Posts</span>
              <span>·</span>
              <span>Last updated on {series.lastUpdated}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
