import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Image
              src="/menu-icon.svg"
              alt="Menu"
              width={20}
              height={20}
              className="h-5 w-5"
            />
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">WOORIDLE</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <Image
            src="/search-icon.svg"
            alt="Search"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Image
              src="/notification-icon.svg"
              alt="Notifications"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}
