import Link from 'next/link';
import Head from 'next/head';
//
export default function Navibar(){
  return (
    <div>
      <Link href="/">
        <a>[ Home ]</a>
      </Link>
      <Link href="/about">
        <a>[ About ]</a>
      </Link>
      <Link href="/books">
        <a>[ Books ]</a>
      </Link>
      <Link href="/login">
        <a>[ Login ]</a>
      </Link>
    </div>
  );
}
