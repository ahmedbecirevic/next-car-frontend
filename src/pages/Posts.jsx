import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

import { requestWithAuthHeader } from "../api/helpers";
import Listing from "../features/Listings";
import ListingsTable from "../features/Listings/ListingTable";

const Posts = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [posts, setPosts] = useState([]);
  const [, setError] = useState(null);

  const onCloseModalHandler = () => {
    setIsModalOpened(false);
  };

  useEffect(() => {
    (async () => {
      try {
        // const res = await axios.get("/posts");
        const res = await requestWithAuthHeader("GET", "/posts/user");
        setPosts(res.data);
      } catch (e) {
        setError(e);
      }
    })();
  }, []);

  return (
    <>
      <Listing open={isModalOpened} setListings={setPosts} onClose={onCloseModalHandler} />
      <Box width="100%">
        <Box display="flex" width="100%" flexDirection="row" justifyContent="flex-end">
          <Button
            sx={{
              bgcolor: "primary.main",
              color: "secondary.contrastText",
              mb: 3,
            }}
            onClick={() => setIsModalOpened(true)}
          >
            Add New Listing
          </Button>
        </Box>
        <ListingsTable rows={posts} />
      </Box>
    </>
  );
};

export default Posts;
