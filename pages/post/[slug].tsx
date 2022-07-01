import Head from 'next/head';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import { sanityClient, urlFor,urlForFile } from '../../sanity';
import PortableText from 'react-portable-text';
import { useForm, SubmitHandler } from 'react-hook-form';
import { parayan } from '../../typing';
import Header from '../../components/Header';
import ReactAudioPlayer from 'react-audio-player';
import YouTube from 'react-youtube';
import 'react-jinke-music-player/assets/index.css'
import Accordation from '../../components/accordation'
import Modals from '../../components/Modal'

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
  },
};
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
  const [modal, setModal] = useState(false);
  const [viewMore, setViewMore] = useState(false);

  const Toggle = () => {
  setModal(!modal);
}

const getEnteriesList = (NoOfEntries:any, x: any) => {
  let entries: any = []
  for (let i = 1; i<=NoOfEntries; i++) {
    if (i <=4){
      entries.push(
        <p>View More</p>
      )
      }else {
        {viewMore && entries.push(
          <p>View More</p>
        )}
      }
    }
    console.log(entries)
return entries;
}

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
  // const getUrlFromId = (media) => {
  //   // Example ref: file-207fd9951e759130053d37cf0a558ffe84ddd1c9-mp3
  //   // We don't need the first part, unless we're using the same function for files and images
  //   const [_file, id, extension] = media.ref.split('-');
  //   return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${id}.${extension}`
  // }

  const shift = 
  <>
  {
            parayan?.categories?.map((c) => <div className="">
              {c.title}
            </div>)
          }
</>
  const audio =   
    
  <div>
    
    {parayan.vakta?.map((v) => (
             
      <div className='flex flex-col w-full flex-wrap bg-white rounded-2xl text-black'>
        {parayan.media?.map((a) => (
          <div className='flex flex-col justify-center border border-black rounded-2xl m-2 p-2 space-y-4 align-center'>
     <div className="flex flex-row justify-start items-center rounded-2xl space-x-2">
                <img
              className="h-7 w-7 rounded-full"
              src={urlFor(v?.image).url()!}
              alt=""
              />
              <span className="text-black font-medium hover:bg-black p-2 hover:text-white hover:rounded-2xl cursor-pointer">{v?.name} {' '}</span>
              {/* Published at {new Date(parayan._createdAt).toLocaleString()} */}
              </div>
          <div>
           <ReactAudioPlayer
            src={`${a}`}
            controls
            className='w-full'
            />
          </div>
        </div>
        ))}
        </div>
        ))}
</div>  


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
          <div className='flex m-2 justify-center bg-black text-white p-3 text-center rounded-lg shadow-2xl'>
          <h1 className="mt-3 mb-3 text-3xl">{parayan?.title}</h1>
          </div>
        <article className="mx-auto max-w-5xl p-5">
          <h2 className="mb-2 text-xl font-light text-gray-500">
            {parayan.description}
          </h2>
        {parayan.vakta && (
          
          <div className="flex items-center space-x-2 md:flex-wrap text-center flex-col w-full">
            <p className="text-md font-extralight ">
              Vakta by{' - '}
              <div className="flex flex-row flex-wrap">
              {parayan.vakta?.map((v) => (
                <div className="flex flex-row justify-center items-center border rounded-2xl border-black space-x-2 p-2 m-2">
                <img
              className="h-10 w-10 rounded-full"
              src={urlFor(v?.image).url()!}
              alt=""
              />
              <span className="text-green-700 font-medium hover:bg-black p-2 hover:text-white hover:rounded-2xl cursor-pointer">{v?.name} {' '}</span>
              {/* Published at {new Date(parayan._createdAt).toLocaleString()} */}
              </div>
              ))}
              </div>
            </p>
          </div>
          )}


            {/* AUDIO CONTROL */}
          {parayan.media && (
          <div className='w-full mt-3 p-2'>
          <span className='font-extrabold text-black text-2xl p-3'>Audio </span>
          <Accordation audio={audio} />
          </div>
            )}

          <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>

          
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
              {parayan?.referenceList && (
          <div className='w-full mt-3 p-2'>
                  <span className='font-extrabold text-black text-2xl'>More Videos</span>
                  <div className='py-4'>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {parayan?.referenceList?.map((v) =>(
           <div className='py-2 w-full space-x-4 h-2xl'>
              <YouTube className='w-full h-full object-cover justify-center' videoId={v} />
              </div>
              ))}
              </div>
              </div>
              </div>
              )}
                {parayan.gallery && (
              <div className='w-full mt-3 p-2'>
  <span className='font-extrabold text-black text-2xl'>More Images</span>
  <div className=" py-2 mx-auto lg:pt-12">
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {parayan?.gallery?.map((g) => (
      <div className="flex flex-wrap cursor-pointer">
        <div className="w-full p-1 md:p-2" key={g?._id}>
          <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
             onClick={() => Toggle()}
            src={`${g.url}`} />
        </div>
        <div>
        <Modals show={modal} close={Toggle} links={g?.url} key={g?.url}/>
        </div>
        
      </div>
        ))}
      
    </div>
  </div>
  </div>
  )}
    
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
                placeholder="Name"
                type="text"
              />
            </label>
            <label className="mb-5 block">
              <span className="text-gray-700">Email</span>
              <input
                {...register('email', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                placeholder="Email"
                type="email"
              />
            </label>
            <label className="mb-5 block">
              <span className="text-gray-700">Comment</span>
              <textarea
                {...register('comment', { required: true })}
                className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                placeholder="Comment"
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
        {parayan.comments && (
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
        )}
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
  vakta[] -> {
    name,
    image
  },
  "media": media[].asset->url,
  referenceList,
  "gallery" : gallery.images[].asset -> {url,_id},
  "comments": *[
    _type == "comment" &&
    post._ref == ^._id && 
    approved == true
  ],
  categories[] -> {
    title,
    slug
  },
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
function render(arg0: JSX.Element) {
  throw new Error('Function not implemented.');
}

