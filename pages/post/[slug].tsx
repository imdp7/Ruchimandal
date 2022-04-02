import Head from 'next/head';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import PortableText from 'react-portable-text';
import { useForm, SubmitHandler } from 'react-hook-form';
import { parayan } from '../../typing';
import Header from '../../components/Header';
import ReactAudioPlayer from 'react-audio-player';
import { FaHeart,FaPlay } from "react-icons/fa";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  parayan: parayan;
}

const parayan = ({ parayan }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

     fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };
  return (
    <>
      <Head>
        <title>{parayan.title}</title>
        <link rel="icon" href="/images/logo/medium-1.svg" />
      </Head>
      <div>
        <Header />
        <img
          className="h-80 w-full object-cover "
          src={urlFor(parayan.mainImage).url()!}
          alt=""
        />
          <div className='flex m-2 justify-center bg-black text-white p-3 rounded-lg shadow-2xl'>
          <h1 className="mt-3 mb-3 text-3xl">{parayan.title}</h1>
          </div>
        <article className="mx-auto max-w-3xl p-5">
          <h2 className="mb-2 text-xl font-light text-gray-500">
            {parayan.description}
          </h2>
          <div className="flex items-center space-x-2">
            <img
              className="h-10 w-10 rounded-full"
              src={urlFor(parayan.vakta?.image).url()!}
              alt=""
            />
            <p className="text-sm font-extralight">
              Blog post By{' '}
              <span className="text-green-700">{parayan.vakta?.name}</span> -
              Published at {new Date(parayan._createdAt).toLocaleString()}
            </p>
          </div>
          <div className='flex flex-col'>
          <div className='flex flex-row items-center justify-between w-full p-3 m-2 flex-wrap bg-red-500 rounded text-white'>
            <div className='flex items-center space-x-4 cursor-pointer'>
            <FaPlay className='text-xl'/>
              <span>{parayan.vakta?.name}</span>
              </div>
              <ReactAudioPlayer
                src="https://cdn.sanity.io/files/kycw4p6j/production/ede1df285255e4337b35e55679ea949c36aecf82.mp3"
                controls
              />
              <div className='flex flex-row rounded-2xl px-6 py-2 items-center text-3xl hover:text-black cursor-pointer'>
              <FaHeart/>
              </div>
            </div>
          <div className='flex flex-row items-center justify-between w-full p-2 m-2 flex-wrap bg-red-500 rounded text-white'>
          <div className='flex items-center space-x-4 cursor-pointer'>
            <FaPlay className='text-xl'/>
              <span>{parayan.vakta?.name}</span>
              </div>
              <ReactAudioPlayer
                src="https://cdn.sanity.io/files/kycw4p6j/production/ede1df285255e4337b35e55679ea949c36aecf82.mp3"
                controls
              />
              <div className='flex flex-row rounded-2xl px-6 py-2 text-3xl hover:text-black cursor-pointer'>
              <FaHeart/>
              </div>
            </div>
            </div>

          <div className="mt-10">
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECTID}
              content={parayan.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="my-5 text-2xl font-bold" {...props}></h1>
                ),
                h2: (props: any) => (
                  <h1 className="my-5 text-xl font-bold" {...props}></h1>
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ children, href }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>

        <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />

        {submitted ? (
          <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
            <h3>Thankyou for submitting your comment</h3>
            <p>Once it has been approved, it will appear below! </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
          >
            <h3 className="text-sm text-yellow-500">Enjoy this article?</h3>
            <h4 className="text-3xl font-bold">Leave a comment below!</h4>
            <hr className="mt-2 py-3" />

            <input
              {...register('_id')}
              type="hidden"
              name="_id"
              value={parayan._id}
            />

            <label className="mb-5 block">
              <span className="text-gray-700">Name</span>
              <input
                {...register('name', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                placeholder="name"
                type="text"
              />
            </label>
            <label className="mb-5 block">
              <span className="text-gray-700">Email</span>
              <input
                {...register('email', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                placeholder="email"
                type="email"
              />
            </label>
            <label className="mb-5 block">
              <span className="text-gray-700">Comment</span>
              <textarea
                {...register('comment', { required: true })}
                className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                placeholder="comment"
                rows={8}
              />
            </label>
            <div className="flex flex-col">
              {errors.name && (
                <span className="text-red-500">
                  - The Name Field is required
                </span>
              )}
              {errors.comment && (
                <span className="text-red-500">
                  - The Comment Field is required
                </span>
              )}
              {errors.email && (
                <span className="text-red-500">
                  - The Email Field is required
                </span>
              )}
            </div>

            <input
              type="submit"
              className="focus:shadow-outline cursor-pointer rounded bg-yellow-500  px-4 py-2 font-bold text-white shadow hover:bg-yellow-400"
            />
          </form>
        )}

        {/* Comments */}
        <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow  shadow-yellow-500">
          <h3 className="text-4xl">Comments</h3>
          <hr className="pb-2" />

          {parayan.comments.map((comment) => {
            return (
              <div key={comment._id}>
                <p>
                  <span className="text-yellow-500">{comment.name}: </span>
                  {comment.comment}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default parayan;

export const getStaticPaths = async () => {
  const query = `*[_type == "parayan"] {
  _id,
  slug {
      current
  },

}`;

  const parayan = await sanityClient.fetch(query);

  const paths = parayan.map((parayan: parayan) => ({
    params: {
      slug: parayan.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "parayan" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  vakta -> {
    name,
    image
  },
  media,
  "comments": *[
    _type == "comment" &&
    post._ref == ^._id && 
    approved == true
  ],
  description,
  mainImage,
  slug,
  body,
  
}`;

  const parayan = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!parayan) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      parayan,
      
    },
    revalidate: 60,
  };
};
