// component
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import LabelIcon from "@mui/icons-material/Label";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Iconify from "../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Home",
    path: "",
    icon: <HomeIcon />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Cars",
    path: "/cars",
    icon: <DirectionsCarIcon />,
  },
  {
    title: "Listings",
    path: "/listings",
    icon: <LabelIcon />,
  },
  {
    title: "Purchase history",
    path: "/purchase-history",
    icon: <ShoppingCartIcon />,
  },
];

export default navConfig;
