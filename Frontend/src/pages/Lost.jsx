import React, { useState, useEffect } from 'react';
import LostCard from '../Components/LostCard';

function Lost() {
  const [member, setMember] = useState(null); // Initialize as null

  useEffect(() => {
    setMember({
      imgUrl: "http://res.cloudinary.com/dpwkgglet/image/upload/v1743513328/bx9ooexz44sbl2o0x6hv.jpg",
      name: "UNCLE",
      age: "50",
      desciption:"wearing black t-shirt and black pant , had a birthmark on his neck ",
      contactDetails:"3232414124"
    });
  }, []); // Runs once when the component mounts

  return (
    <div>
      {member && <LostCard member={member} />} {/* Fixed prop name */}
    </div>
  );
}

export default Lost;
