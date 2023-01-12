import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { client } from "../../libs/client";
import type { Blog } from "../../types/blog";
import styles from '../../styles/Home.module.scss';

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' });
  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return {paths, fallback: false};
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({endpoint: 'blog', contentId: id});
  return {
    props: {
      blog: data,
    }
  }
}

type Props = {
  blog: Blog;
};

export default function BlogId({ blog }: Props) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: `${blog.body}`}} className={styles.post}></div>
    </main>
  )
}