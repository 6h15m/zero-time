type Props = {
  mt?: string;
  mb?: string;
};

export const Divider = ({ mt, mb }: Props) => (
  <hr
    className="border-0 w-full border-b border-black"
    style={{ marginTop: mt, marginBottom: mb }}
  />
);
