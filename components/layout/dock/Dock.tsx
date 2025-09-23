import Image from 'next/image';
import Link from 'next/link';
import style from './Dock.module.css';

export default function Dock() {
  return (
    <div className="dock">
      <button>
        <Link href="/" className={style.link}>
          <Image
            src="/home-icon.svg"
            alt="Home"
            width={24}
            height={24}
            className={style.icon}
            />
          <span className="dock-label">홈</span>
        </Link>
      </button>

      <button>
        <Link href="/posting" className={style.link}>
          <Image
            src="/inbox-icon.svg"
            alt="Inbox"
            width={24}
            height={24}
            className={style.icon}
          />
          <span className="dock-label">글쓰기</span>
        </Link>
      </button>

      <button>
        <Link href="/" className={style.link}>
          <Image
            src="/settings-icon.svg"
            alt="Settings"
            width={24}
            height={24}
            className={style.icon}
          />
          <span className="dock-label">세팅</span>
        </Link>
      </button>
    </div>
  );
}
