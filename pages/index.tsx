import { client } from '../libs/client'
import styles from '../styles/Home.module.css'
import { Blog } from '../types/blog';
import Link from 'next/link';

// SSG
export const getStaticProps = async () => {
  const data = await client.get( {endpoint: 'blog' });
  return {
    props: {
      blog: data.contents,
    }
  }
}

type Props = {
  blog: Blog[];
};

export default function Home({blog}: Props) {
  return (
    <div>
      {blog.map((b) => (
        <li key={b.id}>
          <Link href={`blog/${b.id}`}>{b.title}</Link>
        </li>
      )) }
    </div>
  )
}
