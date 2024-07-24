import { presentProfile } from "@/lib/profile";
import axios from "axios";
import { Logout } from "./components/Logout";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import BookGrid from "./components/BookGrid";

export default async function Page() {
  const logo = "logo.png";
  let books = [];
  
  try {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=javascript"
    );
    books = response.data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
  }

   const profile = await presentProfile();
   console.log("Profile:", profile); // Logging profile object

  return (
    <div className="flex h-screen">
      <Sidebar logo={logo} />
      <div className="flex-1 p-6">
       
        <SearchBar placeholder="Search for books" />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Books List</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book.id}
                  className="border rounded-lg p-4 shadow-md flex flex-col items-center justify-items-center"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {book.volumeInfo.title}
                  </h2>
                  <p className="text-gray-700 mb-2">
                    Author:{" "}
                    {book.volumeInfo.authors
                      ? book.volumeInfo.authors.join(", ")
                      : "Unknown"}
                  </p>
                  <p className="text-gray-500">
                    {book.volumeInfo.description
                      ? book.volumeInfo.description.substring(0, 100) + "..."
                      : "No description available."}
                  </p>
                  {book.volumeInfo.imageLinks &&
                    book.volumeInfo.imageLinks.thumbnail && (
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        className="mt-2 w-[40%]"
                      />
                    )}
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Page;
