// import { client } from '@/contentful/cmsconfig'


// const getBlogs = async ()=>{

// const Blogs = await client.getEntries({
//     'content_type': 'blogs',
// })
// //console.log(blogs.items[0].feilds)
// return Blogs.items
// }

// export default async function Blogspage() {
//   const data = await getBlogs()
//   //console.log(data[0].fields.image)
//   console.log(data)
//     return (
        
//         <>    
//        <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-blue-500 text-white p-4">
//         <div className="container mx-auto">
//           <h1 className="text-4xl font-bold">My Blog</h1>
//         </div>
//       </header>

//       {/* Blog Posts */}
//       <div className="container mx-auto p-4 mt-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {data.map((post:any) => (
//             <div  className="bg-white p-4 rounded shadow-md">
//               <h2 className="text-xl font-bold mb-2">{post.fields.title}</h2>
//               <h3 className="text-sm font-bold mb-2">{post.fields.date}</h3>
//               <img src={post.fields.image.fields.file.url}  alt='pics' className='h-[400px] object-cover mb-4 rounded'/>
//               {/* <p className="text-gray-700">{post.fields.Discription1}</p> */}
//               <p className="text-gray-700">{post.fields.image.fields.description}</p>
//               <a href={`/blog/${post.id}`} className="text-blue-500 mt-2 block">
//                 Read more
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-blue-500 text-white p-4 mt-8">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2024 My Blog. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//         </>
//     )
// } 
