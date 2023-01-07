import {
  categoryType,
  CheckOutType,
  commentType,
  ContactType,
  LikeType,
  MainStateType,
  NewsType,
  OrderType,
  productType,
  SaveType,
  UserType,
} from "../mainState";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from "@mui/material";
import {
  _insertUser,
  _insetCheckOut,
  _insetProduct,
  _insetCategory,
  _insetComment,
  _insetContact,
  _insetOrders,
  _insetLike,
  _insetNews,
  _insetSave,
} from "../../service/postAllData";
import {
  _getAllUser,
  _getAllProducts,
  _getAllCategories,
  _getAllComment,
  _getAllLike,
  _getAllCheckOut,
  _getAllContact,
  _getAllNews,
  _getAllOrders,
  _getAllSave,
} from "../../service/getAllData";

interface SaveUserPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  user: UserType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function SaveUserPage({
  open,
  setopen,
  user,
  mainState,
  setMainState,
}: SaveUserPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          User Form
        </DialogContentText>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => setName(e.target.value)}
            name="name"
            value={name}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Phone"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            value={phone}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <Button variant="contained" component="label">
            <input
              accept=".jpg,.png,.svg"
              multiple
              type="file"
              name="image"
              onChange={(e: any) => setImage(e.target.files[0])}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            setLoading(true);
            const fromData: any = new FormData();
            fromData.append("name", name);
            fromData.append("email", email);
            fromData.append("password", password);
            fromData.append("phone", phone);
            if (image) {
              fromData.append("image", image, image.name);
            }
            user.id = 0;
            user.name = name;
            user.email = email;
            user.password = password;
            user.phone = phone;
            user.authorization = "user";
            await _insertUser(fromData);
            mainState.allUsers = [user, ...mainState.allUsers];
            mainState.allUsers = await _getAllUser();
            mainState.allUsers.forEach((user: UserType) => {
              user.userLike = mainState.allLike.filter(
                (l: LikeType) => l.iduser === user.id
              );
              user.userComment = mainState.allComment.filter(
                (c: commentType) => c.iduser === user.id
              );
              user.userOrders = mainState.allOrders.filter(
                (o: OrderType) => o.iduser === user.id
              );
              user.userSave = mainState.allSave.filter(
                (s: SaveType) => s.iduser === user.id
              );
              user.userCheckOut = mainState.allCheckOut.filter(
                (c: CheckOutType) => c.iduser === user.id
              );
            });
            mainState.render = "users";
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
interface SaveProductPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  product: productType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function SaveProductPage({
  open,
  setopen,
  product,
  mainState,
  setMainState,
}: SaveProductPageProps) {
  const [iduser, setIduser] = useState(0);
  const [idcategory, setIdCategory] = useState(0);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Product Form Save
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Name User</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={iduser}
              label="Name User"
              onChange={(e: any) => setIduser(e.target.value)}
            >
              {mainState.allUsers.map((user: UserType) => {
                return (
                  <MenuItem value={user.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={user.image} /> <span>{user.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idcategory}
              label="Category"
              onChange={(e: any) => setIdCategory(e.target.value)}
            >
              {mainState.allCategories.map((category: categoryType) => {
                return (
                  <MenuItem value={category.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={category.logo} />
                      <span>{category.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => setName(e.target.value)}
            name="name"
            value={name}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Country"
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            value={country}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="price"
            onChange={(e: any) => setPrice(e.target.value)}
            name="price"
            value={price}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            type={"date"}
            onChange={(e) => setDate(e.target.value)}
            name="date"
            value={date}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="description"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <Button variant="contained" component="label">
            <input
              accept=".jpg,.png,.svg"
              multiple
              type="file"
              name="images"
              onChange={(e: any) => setImages(e.target.files[0])}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            setLoading(true);
            const fromData: any = new FormData();
            fromData.append("iduser", iduser);
            fromData.append("idcategory", idcategory);
            fromData.append("name", name);
            fromData.append("country", country);
            fromData.append("price", price);
            fromData.append("date", date);
            fromData.append("description", description);
            if (images !== "") {
              product.images = images;
              fromData.append("images", product.images);
            } else {
              fromData.append("images", images, images.name);
            }
            await _insetProduct(fromData);
            mainState.allProducts = await _getAllProducts();
            mainState.allProducts.forEach((product: productType) => {
              product.productUser = mainState.allUsers.find(
                (u: UserType) => u.id === product.iduser
              );
              product.productCategory = mainState.allCategories.find(
                (c: categoryType) => c.id === product.idcategory
              );
              product.productlike = mainState.allLike.filter(
                (l: LikeType) => l.idproduct === product.id
              );
              product.productComment = mainState.allComment.filter(
                (c: commentType) => c.idproduct === product.id
              );
              product.productOrders = mainState.allOrders.filter(
                (c: OrderType) => c.idproduct === product.id
              );
              product.productSave = mainState.allSave.filter(
                (c: SaveType) => c.idproduct === product.id
              );
            });
            mainState.render = "products";
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface CheckOutPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  checkOut: CheckOutType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function SaveCheckOutPage({
  open,
  setopen,
  checkOut,
  mainState,
  setMainState,
}: CheckOutPageProps) {
  const [iduser, setIduser] = useState(0);
  const [priceOut, setpriceOut] = useState<any>(0);
  const [CreditCardNumber, setCreditCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Check Out Form
        </DialogContentText>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">users</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="users"
              name="iduser"
              onChange={(e: any) => setIduser(parseInt(e.target.value))}
              value={iduser}
            >
              {mainState.allUsers.map((user: UserType) => {
                return (
                  <MenuItem value={user.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={user.image} /> <span>{user.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="priceOut"
            type="text"
            onChange={(e) => {
              setpriceOut(e.target.value);
            }}
            name="priceOut"
            value={priceOut}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="CreditCardNumber"
            type="text"
            onChange={(e) => setCreditCardNumber(e.target.value)}
            name="password"
            value={CreditCardNumber}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            type="date"
            onChange={(e) => setExpMonth(e.target.value)}
            name="expMonth"
            value={expMonth}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="cvv"
            type="text"
            onChange={(e) => setCvv(e.target.value)}
            name="cvv"
            value={cvv}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            checkOut.iduser = iduser;
            checkOut.priceOut = priceOut;
            checkOut.CreditCardNumber = CreditCardNumber;
            checkOut.expMonth = expMonth;
            checkOut.cvv = cvv;
            const selectedUser = mainState.allUsers.find(
              (u: UserType) => u.id === checkOut.iduser
            );
            checkOut.checkUser = selectedUser;
            await _insetCheckOut(checkOut);
            mainState.allCheckOut = await _getAllCheckOut();
            mainState.allCheckOut.forEach((out: CheckOutType) => {
              out.checkUser = mainState.allUsers.find(
                (u: UserType) => u.id === out.iduser
              );
            });
            mainState.render = "checkOut";
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
interface SaveCategoriesPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  category: categoryType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function SaveCategoriesPage({
  open,
  setopen,
  category,
  mainState,
  setMainState,
}: SaveCategoriesPageProps) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Category Form Save
        </DialogContentText>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => setName(e.target.value)}
            name="name"
            value={name}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <Button variant="contained" component="label">
            <input
              accept=".jpg,.png,.svg"
              multiple
              type="file"
              name="logo"
              onChange={(e: any) => setLogo(e.target.files[0])}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            setLoading(true);
            const fromData: any = new FormData();
            fromData.append("name", name);
            if (logo !== "") {
              category.logo = logo;
              fromData.append("logo", category.logo);
            } else {
              fromData.append("logo", logo, logo.name);
            }
            await _insetCategory(fromData);
            mainState.allCategories = await _getAllCategories();
            mainState.allCategories.forEach((category: categoryType) => {
              category.categoryProduct = mainState.allProducts.filter(
                (p: productType) => p.idcategory === category.id
              );
            });
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface SaveCommentPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  comments: commentType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function SaveCommentPage({
  open,
  setopen,
  comments,
  mainState,
  setMainState,
}: SaveCommentPageProps) {
  const [iduser, setIduser] = useState(0);
  const [idproduct, setidProduct] = useState(0);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(new Date().toString());
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Comment Form Save
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Name User</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={iduser}
              label="Name User"
              onChange={(e: any) => setIduser(e.target.value)}
            >
              {mainState.allUsers.map((user: UserType) => {
                return (
                  <MenuItem value={user.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={user.image} /> <span>{user.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Name Product</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idproduct}
              label="Name Product"
              onChange={(e: any) => setidProduct(e.target.value)}
            >
              {mainState.allProducts.map((product: productType) => {
                return (
                  <MenuItem value={product.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={product.images} />{" "}
                      <span>{product.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="comment"
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            value={comment}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            disabled
            label="date"
            onChange={(e) => setDate(date)}
            name="date"
            value={date}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            setopen(true);
            comments.iduser = iduser;
            comments.idproduct = idproduct;
            comments.comment = comment;
            comments.date = date;
            await _insetComment(comments);
            mainState.allComment = await _getAllComment();
            mainState.allComment.forEach((comment: commentType) => {
              comment.commentUser = mainState.allUsers.find(
                (u: UserType) => u.id === comment.iduser
              );
              comment.commentProduct = mainState.allProducts.find(
                (p: productType) => p.id === comment.idproduct
              );
            });
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface SaveLikePageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  like: LikeType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function SaveLikePage({
  open,
  setopen,
  like,
  mainState,
  setMainState,
}: SaveLikePageProps) {
  const [iduser, setIduser] = useState(like.iduser);
  const [idproduct, setidProduct] = useState(like.idproduct);
  const [likee, setLike] = useState(like ? like.likee : 0);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Like Form Save
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Name User</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={iduser}
              label="Name User"
              onChange={(e: any) => setIduser(e.target.value)}
            >
              {mainState.allUsers.map((user: UserType) => {
                return (
                  <MenuItem value={user.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={user.image} /> <span>{user.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Name Product</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idproduct}
              label="Name User"
              onChange={(e: any) => setidProduct(e.target.value)}
            >
              {mainState.allProducts.map((product: productType) => {
                return (
                  <MenuItem value={product.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={product.images} />{" "}
                      <span>{product.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="likee"
            onChange={(e: any) => setLike(e.target.value)}
            name="likee"
            value={likee}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setopen(false);
            setMainState({ ...mainState });
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setopen(true);
            like.iduser = iduser;
            like.idproduct = idproduct;
            like.likee = likee;
            await _insetLike(like);
            mainState.allLike = await _getAllLike();
            mainState.allLike.forEach((l: LikeType) => {
              l.likeUser = mainState.allUsers.find(
                (u: UserType) => u.id === l.iduser
              );
              l.likeProduct = mainState.allProducts.find(
                (p: productType) => p.id === l.idproduct
              );
            });
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface SaveNewsPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  news: NewsType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function SaveNewsPage({
  open,
  setopen,
  news,
  mainState,
  setMainState,
}: SaveNewsPageProps) {
  const [email, setEmail] = useState(news ? news.email : "");
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Like Form Save
        </DialogContentText>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setopen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setopen(true);
            news.email = email;
            await _insetNews(news);
            let getAllNews = await _getAllNews();
            mainState.allNews = getAllNews;
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface SaveOrderPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  order: OrderType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function SaveOrderPage({
  open,
  setopen,
  order,
  mainState,
  setMainState,
}: SaveOrderPageProps) {
  const [iduser, setIduser] = useState(order.iduser);
  const [idproduct, setidProduct] = useState(order.idproduct);
  const [quantity, setQuantity] = useState(order ? order.quantity : 0);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Order Form Save
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Name User</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={iduser}
              label="Name User"
              onChange={(e: any) => setIduser(e.target.value)}
            >
              {mainState.allUsers.map((user: UserType) => {
                return (
                  <MenuItem value={user.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={user.image} /> <span>{user.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Name Product</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idproduct}
              label="Name User"
              onChange={(e: any) => setidProduct(e.target.value)}
            >
              {mainState.allProducts.map((product: productType) => {
                return (
                  <MenuItem value={product.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={product.images} />{" "}
                      <span>{product.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="quantity"
            onChange={(e: any) => setQuantity(e.target.value)}
            name="quantity"
            value={quantity}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setopen(false);
            setMainState({ ...mainState });
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setopen(true);
            order.iduser = iduser;
            order.idproduct = idproduct;
            order.quantity = quantity;
            await _insetOrders(order);
            mainState.allOrders = await _getAllOrders();
            mainState.allOrders.forEach((order: OrderType) => {
              order.orderUser = mainState.allUsers.find(
                (u: UserType) => u.id === order.iduser
              );
              order.orderProduct = mainState.allProducts.find(
                (p: productType) => p.id === order.idproduct
              );
            });
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface SaveContactPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  contact: ContactType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function SaveContactPage({
  open,
  setopen,
  contact,
  mainState,
  setMainState,
}: SaveContactPageProps) {
  const [email, setEmail] = useState("");
  const [massage, setMassage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Like Form Save
        </DialogContentText>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="massage"
            onChange={(e) => setMassage(e.target.value)}
            name="massage"
            value={massage}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setopen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setopen(true);
            contact.email = email;
            contact.massage = massage;
            await _insetContact(contact);
            let getAllContacts = await _getAllContact();
            mainState.allContact = getAllContacts;
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface SavePageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  savee: SaveType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function SavePage({
  open,
  setopen,
  savee,
  mainState,
  setMainState,
}: SavePageProps) {
  const [iduser, setIduser] = useState(0);
  const [idproduct, setidProduct] = useState(0);
  const [save, setSave] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Save Form
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Name User</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={iduser}
              label="Name User"
              onChange={(e: any) => setIduser(e.target.value)}
            >
              {mainState.allUsers.map((user: UserType) => {
                return (
                  <MenuItem value={user.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={user.image} /> <span>{user.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Name Product</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idproduct}
              label="Name Product"
              onChange={(e: any) => setidProduct(e.target.value)}
            >
              {mainState.allProducts.map((product: productType) => {
                return (
                  <MenuItem value={product.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={product.images} />{" "}
                      <span>{product.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Save</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={save}
              label="Save"
              onChange={(e) => setSave(e.target.value)}
            >
              <MenuItem value={"save"}>save</MenuItem>
              <MenuItem value={"unsave"}>unsave</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            setopen(true);
            savee.iduser = iduser;
            savee.idproduct = idproduct;
            savee.save = save;
            await _insetSave(savee);
            mainState.allSave = await _getAllSave();
            mainState.allSave.forEach((s: SaveType) => {
              s.saveUser = mainState.allUsers.find(
                (u: UserType) => u.id === s.iduser
              );
              s.saveProduct = mainState.allProducts.find(
                (p: productType) => p.id === s.idproduct
              );
            });
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
