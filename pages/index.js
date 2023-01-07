import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import defaultOG from "../public/img/opengraph.jpg";
import PostList from "@components/postlist";
import siteConfig from '../site.config';
import { getAllPosts } from "@lib/api";

export default function Post(props) {
  const { posts } = props;

  const ogimage = siteConfig?.openGraphImage
    ? siteConfig?.openGraphImage
    : defaultOG.src;
  return (
    <>
      {siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Stablo"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          <Container>
            <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
              {posts.slice(0, 2).map(post => (
                <PostList
                  key={post._id}
                  post={post}
                  aspect="landscape"
                  preloadImage={true}
                />
              ))}
            </div>
            <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
              {posts.slice(2).map(post => (
                <PostList
                  key={post._id}
                  post={post}
                  aspect="square"
                />
              ))}
            </div>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'publishedAt',
    'slug',
    'author',
    'mainImage',
  ]);
  console.log(posts);
  return {
    props: {
      posts,
    },
    revalidate: 10
  };
}
