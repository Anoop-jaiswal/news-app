import FlightIcon from "@mui/icons-material/Flight";
import ComputerIcon from "@mui/icons-material/Computer";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MovieIcon from "@mui/icons-material/Movie";
import GavelIcon from "@mui/icons-material/Gavel";
import SchoolIcon from "@mui/icons-material/School";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";

export const categories = [
  { name: "Technology", color: "primary", icon: <ComputerIcon /> },
  { name: "Health", color: "secondary", icon: <LocalHospitalIcon /> },
  { name: "Sports", color: "success", icon: <SportsSoccerIcon /> },
  { name: "Business", color: "warning", icon: <BusinessCenterIcon /> },
  { name: "Entertainment", color: "info", icon: <MovieIcon /> },
  { name: "Politics", color: "error", icon: <GavelIcon /> },
  { name: "Education", color: "info", icon: <SchoolIcon /> },
  { name: "Environment", color: "success", icon: <EnergySavingsLeafIcon /> },
  { name: "Travel", color: "warning", icon: <FlightIcon /> },
];
