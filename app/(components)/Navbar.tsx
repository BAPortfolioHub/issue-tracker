import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/IssuePage/new" className="text-default-text">
          Create Issue
        </Link>
        <Link href="/ProjectPage/new" className="text-default-text">
          Create Project
        </Link>
      </div>
      <div>
        <p className="text-default-text">PLACEHOLDER</p>
      </div>
    </nav>
  );
};

export default Nav;
