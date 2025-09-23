import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <span></span>
      </div>
      <div className="navbar-center">
        <Link href="/">
          <h1 className="text-xl">WOORIDLE</h1>
        </Link>
      </div>
      <div className="navbar-end">
        <span></span>
        {/* <button className="btn btn-ghost btn-circle">
          <Image
            src="/search-icon.svg"
            alt="Search"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </button> */}
      </div>
    </div>
  );
}
