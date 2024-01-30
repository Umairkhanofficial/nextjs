"use client"
import { client } from '@/contentful/cmsconfig'
import { useEffect, useState } from 'react';

export default function Blogspage() {
  const [Blogsfinal, setBlogs] = useState<[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const bearerToken = localStorage.getItem("bearer_token");
      if (!bearerToken) return;

      try {
        const apiResp = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: bearerToken,
          },
        });

        if (!apiResp.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await apiResp.json();
        console.log("Data from useEffect:", data);

        // Fetch blogs from Contentful after successfully fetching user data
        const blogsData = await getBlogs();
        setBlogs(blogsData);
        
        console.log("blogdata",blogsData)
        console.log("Blogs",Blogsfinal)
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const Blogs = await client.getEntries({
        'content_type': 'blogs',
      });
      console.log(Blogs.items);
      return Blogs.items;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">My Blog</h1>
        </div> 
      </header>

      {/* Blog Posts */}
      <div className="container mx-auto p-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Blogsfinal.map((post:any) => (
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">{post.fields.title}</h2>
              <h3 className="text-sm font-bold mb-2">{post.fields.date}</h3>
              <img src={post.fields.image.fields.file.url} alt='pics' className='h-[400px] object-cover mb-4 rounded'/>
              <p className="text-gray-700">{post.fields.image.fields.description}</p>
              <a href={`/blog/${post.sys.id}`} className="text-blue-500 mt-2 block">
                Read more
              </a>
            </div>
          ))}
          {}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-500 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 My Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
