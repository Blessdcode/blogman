import React from "react";


const page = ({ params }: { params: { title: string } }) => {
  const { title } = params;
  return <div className="sm:my-16 my-6">{title} category</div>;
};

export default page;
