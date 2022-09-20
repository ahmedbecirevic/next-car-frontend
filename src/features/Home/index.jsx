import { Box, CircularProgress } from "@mui/material";
import {
  useCallback, useEffect, useRef, useState,
} from "react";
import { useSelector } from "react-redux";

import { requestWithAuthHeader } from "../../api/helpers";
import ListingCard from "./ListingCard";
import noDataIllustration from "../../assets/no-data.svg";

const SIZE = 3;

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [listings, setListings] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [totalRows, setTotalRows] = useState(10);
  const [lastElement, setLastElement] = useState(null);

  const { id: userId } = useSelector((state) => state.userData);

  const handleObserver = useCallback((entries) => {
    const first = entries[0];
    if (first.isIntersecting) {
      setPageNum((no) => no + 1);
    }
  }, []);

  const observer = useRef(
    new IntersectionObserver(
      handleObserver,
    ),
  );

  const getAllPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await requestWithAuthHeader("GET", `/posts?page=${pageNum}&size=${SIZE}`);
      setListings((prevState) => [...prevState, ...response.data.rows]);
      setTotalRows(response.data.count);
      setIsError(false);
    } catch {
      setIsError(true);
    }
    setLoading(false);
  }, [pageNum]);

  useEffect(() => {
    if (pageNum * SIZE <= totalRows) {
      getAllPosts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <Box>
      <Box display="flex" flexDirection="column">
        {listings?.length ? listings?.map((listing, i) => (i === listings.length - 1 && !loading && pageNum <= totalRows ? (
          <div
            key={listing?.id}
            ref={setLastElement}
          >
            <ListingCard listing={listing} userId={userId} />
          </div>
        ) : (
          <ListingCard key={listing?.id} listing={listing} userId={userId} />
        )))
          : <Box display="flex" justifyContent="center"><Box width="50vw" component="img" src={noDataIllustration} /></Box>}
      </Box>
      {loading && !isError && <Box width="100%" display="flex" justifyContent="center"><CircularProgress /></Box>}
    </Box>
  );
};

export default HomePage;
