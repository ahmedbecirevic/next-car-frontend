// import { Outlet, useMatch } from "react-router-dom";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";

// import Sidebar from "../components/Sidebar";
// import { ROUTES } from "../config";
// import Navbar from "../components/Navbar";

// function PrivateLayout() {
//   return (
//     <Box sx={{ display: "flex", backgroundColor: "gray.light", height: "100vh" }}>
//       <CssBaseline />
//       {!useMatch({ path: ROUTES.CUSTOMERS, end: true }) && <Navbar />}
//       {!useMatch({ path: ROUTES.CUSTOMERS, end: true }) && <Sidebar />}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1, pl: "45px", pt: 12, backgroundColor: "gray.light", display: "flex",
// flexDirection: "column",
//         }}
//       >
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }

// export default PrivateLayout;
