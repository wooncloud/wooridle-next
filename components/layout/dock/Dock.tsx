import Image from 'next/image';

export default function Dock() {
  return (
    <div className="dock">
      <button>
        <Image
          src="/home-icon.svg"
          alt="Home"
          width={24}
          height={24}
          className="size-[1.2em]"
        />
        <span className="dock-label">홈</span>
      </button>

      <button className="dock-active">
        <Image
          src="/inbox-icon.svg"
          alt="Inbox"
          width={24}
          height={24}
          className="size-[1.2em]"
        />
        <span className="dock-label">글쓰기</span>
      </button>

      <button>
        <Image
          src="/settings-icon.svg"
          alt="Settings"
          width={24}
          height={24}
          className="size-[1.2em]"
        />
        <span className="dock-label">세팅</span>
      </button>
    </div>
  );
}
