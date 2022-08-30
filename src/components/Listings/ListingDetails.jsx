import { Box, Typography } from "@mui/material";
import { useState, useEffect, Suspense } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";

import { requestWithAuthHeader } from "../../api/helpers";
import CustomCard from "../CustomCard";

const ListingDetails = () => {
  const [post, setPost] = useState({});
  const { listingId } = useParams();

  useEffect(() => {
    (async () => {
      const res = await requestWithAuthHeader("GET", `posts/${listingId}/images`);
      setPost(res?.data);
    })();
  }, [listingId]);

  return (
    // <Box ml={3}>
    //   <Typography variant="h2">
    //     {post?.title}
    //   </Typography>
    //   <Box mb={1}>
    //     <b>Price:</b>
    //     {" "}
    //     {post?.price}
    //   </Box>
    //   <Box mb={1}>
    //     <b>Location:</b>
    //     {" "}
    //     {post?.location}
    //   </Box>
    //   <Box>
    //     <b>Date of creation:</b>
    //     {" "}
    //     {post?.createdAt}
    //   </Box>
    // </Box>
    <CustomCard
      title={post?.title}
      details={[
        { property: "Price", value: post?.price },
        { property: "Location", value: post?.location },
        { property: "Date of creation", value: post?.createdAt },
      ]}
      actions={[{ label: "Edit", action: () => console.log("edit") }]}
    >
      <Carousel>
        {post?.images?.map((image) => <img key={image?.id} alt="car" src={image?.link} />)}
      </Carousel>
    </CustomCard>
  );
};

export default ListingDetails;
