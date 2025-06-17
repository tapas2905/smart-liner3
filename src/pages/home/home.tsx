import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { setLogout } from "../../store/userSlice";
import alert from "../../services/alert";
import api from "../../services/api";

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, []);
  const handleLogout = () => {
    dispatch(setLogout());
    alert("You have been logged out successfully.", "success");
  };
  const getProducts = async () => {
    try {
      const res = await api.get("product/list");
      if (res.status === 200) {
        // console.log(res.data);
        
        // setProducts(res.data.data);
      }
    } catch (error) {}
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Home Page!</h1>
      {isAuthenticated && userInfo && (
        <>
          <p>Hello, {userInfo.name}! You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <h2>AVailable Products</h2>
            {products.length > 0
              ? products.map((item, index) => {
                  return <div key={index}>{item?.attributes?.name}</div>;
                })
              : "No products found."}
          </div>
        </>
      )}
      {!isAuthenticated && <p>Please log in to access protected content.</p>}
    </div>
  );
};
export default Home;
