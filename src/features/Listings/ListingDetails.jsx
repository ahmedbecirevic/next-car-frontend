import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { requestWithAuthHeader } from "../../api/helpers";
import CustomCard from "../../components/CustomCard";
import EditInfoModal from "./EditInfoModal";
import EditPhotosModal from "./EditPhotosModal";

const ListingDetails = () => {
  const [post, setPost] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { id: userId } = useSelector((state) => state.userData);
  const { listingId } = useParams();

  useEffect(() => {
    (async () => {
      const res = await requestWithAuthHeader("GET", `posts/${listingId}/images`);
      setPost(res?.data);
    })();
  }, [listingId]);

  const getActions = () => {
    if (userId !== post?.car?.userId) {
      return [];
    }

    return [
      { label: "Change photos", action: () => setIsModalOpen(true) },
      { label: "Edit information", action: () => setIsInfoModalOpen(true) }];
  };

  return (
    <>
      <CustomCard
        title={post?.title}
        details={[
          { property: "Car", value: post?.car?.description },
          { property: "Price", value: post?.price },
          { property: "Location", value: post?.location },
          { property: "Condition", value: post?.condition },
          { property: "Date of creation", value: new Date(post?.createdAt).toLocaleString() },
        ]}
        actions={getActions()}
      >
        <Carousel>
          {post?.images?.map((image) => <img key={image?.id} alt="car" src={image?.link} />)}
        </Carousel>
      </CustomCard>
      <EditPhotosModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        listing={post}
        images={post?.images}
        setListing={setPost}
      />
      <EditInfoModal
        open={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        listing={post}
        setListing={setPost}
      />
    </>
  );
};

export default ListingDetails;
