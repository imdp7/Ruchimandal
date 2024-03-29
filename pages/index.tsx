import Head from 'next/head';
import Link from 'next/link';
import TopNavigations from '../components/Header';
import { sanityClient, urlFor } from '../sanity';
import { parayan,vakta,banners } from '../typing';
import YouTube from 'react-youtube';

interface Props {
  parayan: [parayan];
  katha: [parayan];
  vakta:[vakta];
  banners: [banners];
}

const opts = {
  width: '100%',
  height:"100%",
};


export default function Home({ parayan,katha,vakta,banners }: Props) {

  return (

    <div>
      <Head>
        <title>Ruchimandal</title>
        <link rel="icon" href="https://cdn.sanity.io/images/kycw4p6j/production/513847cf48e44304ff41404142763e5f5df07472-512x512.png" />
        <script src="https://kit.fontawesome.com/e03f9c38e2.js"></script>

      </Head>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <TopNavigations />
      </div>
      

      <div className="flex items-center justify-between border-y border-black bg-yellow-400 py-10 p-2 lg:py-12">
        <div className="p-4 m-4">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Ruchimandal
            </span>{' '}
            is a place for peace, and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>

        <img
          src="/images/logo/medium-1.svg"
          className="hidden h-32 m-4  md:inline-flex"
        />
      </div>
      {/*{banners && (
          <div className='w-full'>
            <div className='flex flex-row justify-center bg-black p-2 m-2 text-white rounded shadow-md font-bold text-2xl'>
              Latest Updates
            </div>
                  <div className='py-4'>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {banners?.map((v) => (
           <div>
              <YouTube className='w-full h-full object-cover justify-center' videoId={v.referenceList} opts={opts}/>
              </div>
              ))}
              </div>
              </div>
              </div>
              )}*/}
      {/* Posts */}
      <div className='flex flex-row justify-center bg-black p-2 m-2 text-white rounded shadow-md font-bold text-2xl'>
        Parayan
      </div>
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-3 md:gap-6 md:p-6">
        {parayan.map((post) => {
          return (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group cursor-pointer overflow-hidden rounded-lg border ">
                <img
                  className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <div className="flex justify-center bg-white p-5">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                  </div>
                </div>
                  
              </div>
            </Link>
          );
        })}
      </div>

      {/* Vakta */}
      <div className='flex flex-row justify-center bg-black p-2 m-2 text-white rounded shadow-md font-bold text-2xl'>
        Vakta
      </div>
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-5 md:gap-6 md:p-6 rounded-2xl">
      {vakta.map((post) => {
          return (
            <Link key={post._id} href={`/person/${post.slug.current}`}>
              <div className="group cursor-pointer overflow-hidden rounded-lg border">
                <img
                  className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={urlFor(post.image).url()!}
                  alt=""
                />
                <div className="flex justify-center bg-white p-5">
                  <div>
                    <p className="text-lg font-bold">{post.name}</p>

                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Katha */}
      {/* <div className='flex flex-row justify-center bg-black p-2 m-2 text-white rounded shadow-md font-bold text-2xl'>
        Latest Katha
      </div>
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-3 md:gap-6 md:p-6">
      {katha.map((post) => {
          return (
            <Link key={post._id} href={`/katha/${post.slug.current}`}>
              <div className="group cursor-pointer overflow-hidden rounded-2xl border">
                <img
                  className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <div className="flex justify-between bg-white p-5">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>

                    <p>
                      {post.description} by {post.vakta?.name}
                    </p>

                  </div>

                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(post.vakta?.image).url()!}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div> */}
    </div>

  );
}

export async function getServerSideProps() {
  const query = `*[_type == "parayan"] {
  _id,
  title,
  vakta[] -> {
    name,
    image
  },
  description,
  mainImage,
  categories,
  slug
}`;
  const query_1 = `*[_type == "katha"] {
  _id,
  title,
  vakta -> {
    name,
    image
  },
  description,
  mainImage,
  slug
}`;

  const query_2 = `*[_type == "vakta"] {
  _id,
  name,
  image,
  slug,
  vakta -> {
    name,
    image
  },
}`;

  const query_3 = `*[_type == "banners"] {
  _id,
  slug,
  referenceList
}`;

  const parayan = await sanityClient.fetch(query);
  const katha = await sanityClient.fetch(query_1);
  const vakta = await sanityClient.fetch(query_2);
  const banners = await sanityClient.fetch(query_3);

  return {
    props: { parayan,katha,vakta,banners },
  };
}
