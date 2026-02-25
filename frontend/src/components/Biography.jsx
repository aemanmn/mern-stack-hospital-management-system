import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero blanditiis aspernatur architecto id sit ut quis cum deserunt alias quos, sunt porro nesciunt nostrum sapiente necessitatibus odio ratione officiis, recusandae praesentium veniam ex deleniti velit obcaecati iusto! Rem, necessitatibus aliquid.
          </p>
          <p>We are all in 2024!</p>
          
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            assumenda exercitationem accusamus sit repellendus quo optio dolorum
            corporis corrupti. Quas similique vel minima veniam tenetur
            obcaecati atque magni suscipit laboriosam! Veniam vitae minus nihil
            cupiditate natus provident. Ex illum quasi pariatur odit nisi
            voluptas illo qui ipsum mollitia. Libero, assumenda?
          </p>
          <p>Lorem ipsum dolor sit!</p>
          <p>Health is wealth!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
