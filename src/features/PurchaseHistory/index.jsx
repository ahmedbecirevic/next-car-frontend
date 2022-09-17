import {
  Box, Button, Card, CardContent, Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { getAllPurchasesForUser } from "../../redux/purchaseSlice";
import noDataIllustration from "../../assets/no-data.svg";
import { requestWithAuthHeader } from "../../api/helpers";

const Purchases = () => {
  const { purchases } = useSelector((state) => state.purchaseData);
  const { id: userId } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => dispatch(getAllPurchasesForUser(userId))
    )();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const purchaseHistoryApproveHandler = async (purchase) => {
    try {
      await requestWithAuthHeader("PUT", `/purchase-history/${purchase?.id}`, { ...purchase });
      await dispatch(getAllPurchasesForUser(userId));
    // eslint-disable-next-line no-empty
    } catch {}
  };

  return (
    <div>
      {purchases?.length ? purchases?.map((purchase) => (
        <Card
          sx={{
            p: 2,
            // height: 120,
            width: { lg: "60%", xs: "90%" },
            bgcolor: "grey.200",
            // bgcolor: getCardColor(purchase?.status),
            my: 2,
            display: "flex",
          }}
          key={purchase?.id}
        >
          <Box display="flex" justifyContent="center" alignItems="center" mr={1}>
            {purchase?.status === "REQUESTED" ? <PendingIcon sx={{ width: 45, height: 45, color: "error.main" }} />
              : <CheckCircleIcon sx={{ width: 45, height: 45, color: "success.main" }} />}
          </Box>
          <CardContent sx={{ height: "100%", width: "100%" }}>
            <Box display="flex" flexDirection="column">
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">
                    {purchase?.status === "REQUESTED"
                      ? `${purchase?.post?.car?.user?.displayName || "No name"} requested to purchase this listing!`
                      : `Listing sold to ${purchase?.post?.car?.user?.displayName || "No name"}`}
                  </Typography>
                  <Typography
                    sx={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      mt: 1,
                    }}
                    variant="body1"
                    onClick={() => navigate(`/listings/${purchase?.postId}`)}
                  >
                    <b>Listing title:</b>
                    {" "}
                    {purchase?.post?.title}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <b>Car:</b>
                    {purchase?.post?.car?.description}
                  </Typography>
                </Box>
                {purchase?.userId !== userId
                  && (
                  <Button
                    sx={{ height: 45 }}
                    variant={purchase?.status === "FINISHED" ? "outlined" : "contained"}
                    onClick={() => {
                      if (purchase?.status === "FINISHED") {
                        return;
                      }
                      purchaseHistoryApproveHandler({
                        id: purchase?.id,
                        status: "FINISHED",
                        userId: purchase?.userId,
                        listingId: purchase?.postId,
                      });
                    }}
                  >
                    {purchase?.status === "FINISHED" ? "Sold" : "Approve"}
                  </Button>
                  )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )) : <Box display="flex" justifyContent="center"><Box width="50vw" component="img" src={noDataIllustration} /></Box>}
    </div>
  );
};
export default Purchases;
