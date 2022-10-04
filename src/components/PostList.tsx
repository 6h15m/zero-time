import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { Title } from "./Title";
import { TagList } from "./TagList";

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  );
};

type Tag = {
  fieldValue: string;
  totalCount: number;
};

type Post = {
  frontmatter: {
    title: string;
    date: string;
    tags: Array<Tag>;
    description: string | null;
  };
  fields: {
    slug: string;
  };
};

type Props = {
  postList: Array<Post>;
};

export const PostList = ({ postList }: Props) => {
  const [postCount, setPostCount] = useState(10);

  const handleMoreLoad = throttle(() => {
    if (checkIsScrollAtBottom() && postCount < postList.length) {
      setTimeout(() => setPostCount(postCount + 10), 300);
    }
  }, 250);

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad);

    return () => {
      window.removeEventListener("scroll", handleMoreLoad);
    };
  }, [postCount, postList]);

  useEffect(() => {
    setPostCount(10);
  }, [postList]);

  return (
    <div className="flex flex-col divide-y divide-zinc-200">
      {postList.slice(0, postCount).map((post) => {
        const { title, date, tags, description } = post.frontmatter;
        const { slug } = post.fields;

        return (
          <div key={title} className="py-7 flex flex-col gap-y-2">
            <Title size="sm" to={slug} title={title} />
            <span>{date}</span>
            <p className="text-sm mb-2 text-zinc-700">{description}</p>
            <TagList tagList={tags} className="text-xs" />
          </div>
        );
      })}
    </div>
  );
};
