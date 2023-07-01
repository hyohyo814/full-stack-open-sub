import { Courseinfo } from '../types';

const Header = (props: Courseinfo) => {
  return <h1>{props.name}</h1>;
}
export default Header;