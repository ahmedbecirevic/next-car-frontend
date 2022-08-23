
import { useEffect } from "react";

import { requestWithAuthHeader } from "../api/helpers";
import LogOut from "../components/Login/LogOut";

const Profile = () => {
  useEffect(() => {
    // (async () => {
    //   await requestWithAuthHeader("GET", "/users");
    // })();
  }, []);

  return (
    <>
      <div>Profile Page</div>
      <LogOut />
    </>
  );
};

export default Profile;
