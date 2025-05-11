import HeaderLayoutDefault from "./LayoutDefault";

const Header = ({ layout, setLoading }) => {
  switch (layout) {
    case 1:
      return;

    case 2:
      return;

    default:
      return <HeaderLayoutDefault setLoading={setLoading} />;
  }
};
export default Header;
