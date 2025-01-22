import React from "react";


const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id)
  return <div className="sm:my-16 my-6">{id} category</div>;
};

export default page;
