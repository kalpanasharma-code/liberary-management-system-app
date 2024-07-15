import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import BookGrid from "./components/BookGrid";

const Page = () => {
  const logo = "logo.png";
  const books = Array(9).fill("Book");

  return (
    <div className="flex h-screen">
      <Sidebar logo={logo} />
      <div className="flex-1 p-6">
        <SearchBar placeholder="Search for books" />
        <BookGrid books={books} />
      </div>
    </div>
  );
};

export default Page;
