// component
import Iconify from "../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Home",
    path: "",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Profile",
    path: "/profile",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Cars",
    path: "/cars",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "Listings",
    path: "/listings",
    icon: getIcon("eva:lock-fill"),
  },
];

export default navConfig;
