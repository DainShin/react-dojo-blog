import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {

    const [blogs, setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ]);

    const [name,setName] = useState('mario');

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }

    // useEffect function is called whenever the page is rendered
    // If we want to make this function work only when they are rendered, add the empty array as a second parameter
    // If we want to call this function only when the name value is changed from the initial value to the new value, add an array with the "name" value
    useEffect(() => {
        console.log('use effect ran');
        console.log(name);
    }, [name]);

    return (
        <div className="home">
          <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete}/>
          <button onClick={() => setName('luigi')}>change name</button>
          <p>{ name }</p>
          {/* <BlogList blogs={blogs.filter((blog) => blog.author == 'mario')} title="Mario's Blogs" /> */}
        </div>
    );
}

export default Home;
