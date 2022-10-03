import { Link } from "gatsby";

type Props = {
  size: "sm" | "md" | "bg";
  title: string;
  to?: string;
};

export const Title = ({ size, title, to }: Props) => {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    bg: "text-3xl",
  };

  return (
    <h1 className={`font-bold text-black mb-3 ${sizes[size]}`}>
      {to ? (
        <Link to={to} className="transition-all hover:text-zinc-800">
          {title}
        </Link>
      ) : (
        <div className="text-black">{title}</div>
      )}
    </h1>
  );
};
