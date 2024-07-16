import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-vector/books-seamless-pattern-doodle-outline-textbooks_107791-9584.jpg?t=st=1721118799~exp=1721122399~hmac=9a1988f0c99e9faa5f1f84fffe98a14c1b80b806c74c5e13cfad0b672d898680&w=740')",
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
