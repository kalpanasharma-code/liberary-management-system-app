interface BookGridProps {
  books: string[];
}

const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {books.map((book, index) => (
        <div key={index} className="bg-gray-200 h-32 rounded-md"></div>
      ))}
    </div>
  );
};

export default BookGrid;
