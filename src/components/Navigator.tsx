import { MainStateType } from "./mainState";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const item = {
  py: "3px",
  px: 4,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};
interface NavigatorProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function Navigator({ mainState, setMainState }: NavigatorProps) {
  return (
    <Drawer variant="permanent">
      <List disablePadding>
        <ListItem sx={{ fontSize: 18, color: "#fff" }}>
          Shopping Online
        </ListItem>
        <Box sx={{ bgcolor: "#101F33" }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: "#fff" }}>Build</ListItemText>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={item}
              onClick={() => {
                mainState.render = "users";
                setMainState({ ...mainState });
              }}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText>users</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              mainState.render = "products";
              setMainState({ ...mainState });
            }}
          >
            <ListItemButton sx={item}>
              <ListItemIcon>
                <Inventory2Icon />
              </ListItemIcon>
              <ListItemText>Products</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              mainState.render = "categories";
              setMainState({ ...mainState });
            }}
          >
            <ListItemButton sx={item}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText>Categories</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              mainState.render = "comment";
              setMainState({ ...mainState });
            }}
          >
            <ListItemButton sx={item}>
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <ListItemText>Comment</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              mainState.render = "like";
              setMainState({ ...mainState });
            }}
          >
            <ListItemButton sx={item}>
              <ListItemIcon>
                <ThumbUpIcon />
              </ListItemIcon>
              <ListItemText>Like</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              mainState.render = "news";
              setMainState({ ...mainState });
            }}
          >
            <ListItemButton sx={item}>
              <ListItemIcon>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText>News</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              mainState.render = "orders";
              setMainState({ ...mainState });
            }}
          >
            <ListItemButton sx={item}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText>Orders</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              mainState.render = "contact";
              setMainState({ ...mainState });
            }}
          >
            <ListItemButton sx={item}>
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText>Contact</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              mainState.render = "save";
              setMainState({ ...mainState });
            }}
          >
            <ListItemButton sx={item}>
              <ListItemIcon>
                <SaveIcon />
              </ListItemIcon>
              <ListItemText>Save</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              mainState.render = "checkOut";
              setMainState({ ...mainState });
            }}
          >
            <ListItemButton sx={item}>
              <ListItemIcon>
                <CheckCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText>Check Out</ListItemText>
            </ListItemButton>
          </ListItem>
        </Box>
        <Divider sx={{ mt: 2 }} />
      </List>
    </Drawer>
  );
}
