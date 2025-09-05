import './page.css';
import Avatar from '@/components/Avatar';

export default function Home() {

  return (
    <main>
      <div className='container'>
        <h1>wooridle</h1>

        <a href="/about">
          <Avatar imageUrl='https://www.wooncloud.com/_app/immutable/assets/logo.VYlMOeSY.png' />
          <p>About me</p>
        </a>

        <div className="divider">프로필</div>

        <a href="/blog" className="btn btn-block btn-primary">블로그</a>
        <br/>

        <a href="https://github.com/wooncloud" className="btn btn-block btn-primary">깃허브</a>

        <div className="divider">사이드 프로젝트</div>

        <button className="btn btn-block">프로젝트1</button>
        <br/>
        <button className="btn btn-block">프로젝트2</button>
      </div>
    </main>
  );
}
