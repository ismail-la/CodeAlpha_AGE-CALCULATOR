import React, { useState } from "react";
import "./AgeCalculator.css";

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/calculate-age`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dob }),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response data:", data);
      setAge(data.age);
    } catch (error) {
      console.error("Error:", error);
    }
  };

   return (
     <div className="container">
       <h1>Age Calculator</h1>
       <form onSubmit={handleSubmit}>
         <label htmlFor="dob">Date of Birth:</label>
         <input
           type="date"
           id="dob"
           value={dob}
           onChange={(e) => setDob(e.target.value)}
         />
         <button type="submit">Calculate Age</button>
       </form>
       {age !== null && (
         <p className="age-result">
           Your age is: <span className="age-number">{age}</span> years
         </p>
       )}
     </div>
   );
};

export default AgeCalculator;
