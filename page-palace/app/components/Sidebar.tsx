import Link from "next/link";
import { Logout } from "./Logout";

interface SidebarProps {
  logo: string;
}

const Sidebar: React.FC<SidebarProps> = ({ logo }) => {
  return (
    <div className="bg-pink-200 h-screen p-4 w-64">
      <img src={logo} alt="Logo" className="w-12 h-12 mb-4" />
      <ul>
        <li className="py-2">
          <Link href="/cart">
            <span className="text-gray-600 hover:text-gray-900">
              Go to Cart
            </span>
          </Link>
        </li>
        <li className="py-2">
          <Link href="/settings">
            <span className="text-gray-600 hover:text-gray-900">
              Settings/Help/FAQ
            </span>
          </Link>
        </li>
        <li className="py-2">
        <Logout></Logout>
        </li>
        <li className="py-2">
          <Link href="/edit">
            <span className="text-gray-600 hover:text-gray-900">EditProfile</span>
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
