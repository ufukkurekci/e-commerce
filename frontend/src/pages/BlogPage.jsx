import Blogs from "../components/blogs/Blogs";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const BlogPage = () => {
  return (
    <>
      <Header></Header>
      <div className="blog-page">
        <Blogs></Blogs>
      </div>
      <Footer></Footer>
    </>
  );
};

export default BlogPage;
