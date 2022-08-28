import { Box, Typography } from "@mui/material";
import { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";

import { requestWithAuthHeader } from "../../api/helpers";

const ListingDetails = () => {
  const [post, setPost] = useState({});
  const { listingId } = useParams();

  useEffect(() => {
    (async () => {
      const res = await requestWithAuthHeader("GET", `posts/${listingId}`);
      setPost(res?.data);
    })();
  }, [listingId]);

  return (
    <Box ml={3}>
      <Typography variant="h2">
        {post?.title}
      </Typography>
      <Box mb={1}>
        Price:
        {" "}
        {post?.price}
      </Box>
      <Box mb={1}>
        Location:
        {" "}
        {post?.location}
      </Box>
      <Box>
        Date of creation:
        {" "}
        {post?.createdAt}
      </Box>
    </Box>
  );
};

export default ListingDetails;
