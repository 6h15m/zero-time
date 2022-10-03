type Props = {
  size: string | number;
};

export const VerticalSpace = ({ size }: Props) => (
  <div style={{ height: size }} />
);
