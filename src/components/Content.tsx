import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import {
  EditCategoriesPage,
  EditCheckOutPage,
  EditCommentPage,
  EditContactPage,
  EditLikePage,
  EditNewsPage,
  EditOrderPage,
  EditSavePage,
  EditUserPage,
  EidtProductPage,
} from "./common/ConfirmEditDialog";
import {
  SaveUserPage,
  SaveCheckOutPage,
  SaveProductPage,
  SaveCategoriesPage,
  SaveCommentPage,
  SaveLikePage,
  SaveNewsPage,
  SaveOrderPage,
  SaveContactPage,
  SavePage,
} from "./common/ConfirmSave";
import {
  _deleteCategories,
  _deleteComment,
  _deleteContact,
  _deleteLike,
  _deleteOrders,
  _deleteUser,
  _deleteNews,
  _deleteAllPost,
  _deleteCheckOut,
  _deleteSave,
} from "../service/deleteAllData";
import { ConfirmDeleteDialog } from "./common/ConfirmDeleteDialog";
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
} from "./mainState";
import {
  _getAllCategories,
  _getAllCheckOut,
  _getAllContact,
  _getAllLike,
  _getAllNews,
  _getAllOrders,
  _getAllProducts,
  _getAllSave,
  _getAllUser,
} from "../service/getAllData";
import {
  ListTableOrder,
  ListUserCheckOut,
  ListUserSave,
  ListProductLike,
  ListProductComment,
  ListCategoriesProduct,
} from "./listTable";
interface ContactProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function Content({ mainState, setMainState }: ContactProps) {
  const {
    allUsers,
    allProducts,
    allCategories,
    allComment,
    allLike,
    allNews,
    allOrders,
    allContact,
    allSave,
    allCheckOut,
  } = mainState;
  const [open, setopen] = useState(false);
  const [openSave, setopenSave] = useState(false);
  const [openEdit, setopenEdit] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<productType | null>(
    null
  );
  const [selectedCategories, setSelectedCategories] =
    useState<categoryType | null>(null);
  const [selectedComment, setSelectedComment] = useState<commentType | null>(
    null
  );
  const [selectedLike, setSelectedLike] = useState<LikeType | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsType | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<OrderType | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(
    null
  );
  const [selectedSave, setSelectedSave] = useState<SaveType | null>(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState<CheckOutType | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [openListTableOrders, setOpenListTableOrders] = useState(false);
  const [openListTableLike, setOpenListTableLike] = useState(false);
  const [openListTableComment, setOpenListTableComment] = useState(false);
  const [openListTableSave, setOpenListTableSave] = useState(false);
  const [openListTableCheckOut, setOpenListTableCheckOut] = useState(false);
  const [openListTableProduct, setOpenListTableProduct] = useState(false);

  return (
    <Paper sx={{ maxWidth: 2000, margin: "auto", overflow: "hidden" }}>
      {mainState.render === "users" && (
        <div>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    onClick={async () => {
                      let SearchUser: any = allUsers.filter((e: UserType) => {
                        return (
                          e.name.toUpperCase().search(search.toUpperCase()) !==
                          -1
                        );
                      });

                      if (SearchUser.length === 0) {
                        mainState.render = "users";
                        SearchUser = mainState.allUsers;
                        let getallUsers = await _getAllUser();
                        mainState.allUsers = getallUsers;
                        setMainState({ ...mainState });
                      }
                      mainState.allUsers = SearchUser;
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Button>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "default" },
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={async () => {
                      const newUser: UserType = {
                        id: 0,
                        name: "",
                        email: "",
                        password: "",
                        phone: "",
                        image: "",
                      };
                      setopenSave(true);
                      setSelectedUser(newUser);
                    }}
                  >
                    Add user
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={async () => {
                        let getallUsers = await _getAllUser();
                        mainState.allUsers = getallUsers;
                        setMainState({ ...mainState });
                      }}
                    >
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>phone</TableCell>
                    <TableCell>image</TableCell>
                    <TableCell>authorization</TableCell>
                    <TableCell>Orders</TableCell>
                    <TableCell>Save</TableCell>
                    <TableCell>CheckOut</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allUsers &&
                    allUsers.map((user: UserType) => {
                      return (
                        <TableRow
                          key={user.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {user.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {user.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {user.email}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {user.phone}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Avatar
                              alt="Remy Sharp"
                              src={user.image}
                              sx={{ width: 56, height: 56 }}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {user.authorization}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                const findUserOrder = allOrders.filter(
                                  (o: OrderType) => o.iduser === user.id
                                );
                                mainState.listUserOrder = findUserOrder;
                                setOpenListTableOrders(true);

                                setSelectedUser(user);
                              }}
                            >
                              Orders
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                const findUserSave = allSave.filter(
                                  (o: SaveType) => o.iduser === user.id
                                );
                                mainState.ListUserSave = findUserSave;

                                setOpenListTableSave(true);

                                setSelectedUser(user);
                              }}
                            >
                              Save
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                const findUserCheckOut = allCheckOut.filter(
                                  (o: CheckOutType) => o.iduser === user.id
                                );
                                mainState.ListCheckOut = findUserCheckOut;

                                setOpenListTableCheckOut(true);
                                setSelectedUser(user);
                              }}
                            >
                              CheckOut
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={async () => {
                                setopenEdit(true);
                                setSelectedUser(user);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                setopen(true);
                                setSelectedUser(user);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          {selectedUser && (
            <ListUserCheckOut
              open={openListTableCheckOut}
              setopen={setOpenListTableCheckOut}
              check={selectedUser}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedUser && (
            <ListUserSave
              open={openListTableSave}
              setopen={setOpenListTableSave}
              save={selectedUser}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedUser && (
            <ListTableOrder
              open={openListTableOrders}
              setopen={setOpenListTableOrders}
              userOrders={selectedUser}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedUser && (
            <ConfirmDeleteDialog
              open={open}
              setopen={setopen}
              text={`Do ${selectedUser.email}  will be deleted permenantly, are you sure?`}
              onConfirm={async () => {
                if (!selectedUser) return;
                await _deleteUser(selectedUser.id);
                mainState.allUsers = mainState.allUsers.filter(
                  (u: UserType) => u.id !== selectedUser.id
                );
                mainState.render = "users";
                setMainState({ ...mainState });
              }}
            />
          )}
          {selectedUser && (
            <SaveUserPage
              open={openSave}
              setopen={setopenSave}
              user={selectedUser}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedUser && (
            <EditUserPage
              open={openEdit}
              setopen={setopenEdit}
              user={selectedUser}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
        </div>
      )}
      {mainState.render === "products" && (
        <div>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    onClick={async () => {
                      let SearchProduct: any = allProducts.filter(
                        (e: productType) => {
                          return (
                            e.name
                              .toUpperCase()
                              .search(search.toUpperCase()) !== -1
                          );
                        }
                      );

                      if (SearchProduct.length === 0) {
                        mainState.render = "products";
                        SearchProduct = mainState.allProducts;
                        mainState.allProducts = await _getAllProducts();
                        setMainState({ ...mainState });
                      }
                      mainState.allProducts = SearchProduct;
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Button>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "default" },
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={async () => {
                      const newProduct: productType = {
                        id: 0,
                        iduser: 0,
                        idcategory: 0,
                        name: "",
                        country: "",
                        images: "",
                        price: 0,
                        date: "",
                        description: "",
                      };
                      setopenSave(true);
                      setSelectedProduct(newProduct);
                    }}
                  >
                    Add Product
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={() => {
                        setMainState({ ...mainState });
                      }}
                    >
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>iduser</TableCell>
                    <TableCell>idcategory</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>images</TableCell>
                    <TableCell>price</TableCell>
                    <TableCell>date</TableCell>
                    <TableCell>country</TableCell>
                    <TableCell>description</TableCell>
                    <TableCell>Like</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allProducts.map((product: productType) => {
                    return (
                      <TableRow
                        key={product.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {product.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {product.productUser && product.productUser.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {product.idcategory}
                        </TableCell>

                        <TableCell component="th" scope="row">
                          {product.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Avatar
                            alt="Remy Sharp"
                            src={product.images}
                            sx={{ width: 56, height: 56 }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {product.price}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {product.date}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {product.country}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {product.description}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Button
                            variant="contained"
                            onClick={() => {
                              const FindProductLike = allLike.filter(
                                (l: LikeType) => l.idproduct === product.id
                              );
                              mainState.ListLikeProduct = FindProductLike;
                              setOpenListTableLike(true);
                              setSelectedProduct(product);
                            }}
                          >
                            Like
                          </Button>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Button
                            variant="contained"
                            onClick={() => {
                              const FindProductComment = allComment.filter(
                                (c: commentType) => c.idproduct === product.id
                              );
                              mainState.ListCommentProduct = FindProductComment;
                              setOpenListTableComment(true);
                              setSelectedProduct(product);
                            }}
                          >
                            Comment
                          </Button>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Button
                            variant="contained"
                            onClick={() => {
                              setopenEdit(true);
                              setSelectedProduct(product);
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              setopen(true);
                              setSelectedProduct(product);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          {selectedProduct && (
            <ConfirmDeleteDialog
              open={open}
              setopen={setopen}
              text={`Do ${selectedProduct.name}  will be deleted permenantly, are you sure?`}
              onConfirm={async () => {
                if (!selectedProduct) return;
                await _deleteAllPost(selectedProduct.id);
                mainState.allProducts = mainState.allProducts.filter(
                  (p: productType) => p.id !== selectedProduct.id
                );
                mainState.render = "products";
                setMainState({ ...mainState });
              }}
            />
          )}
          {selectedProduct && (
            <ListProductLike
              open={openListTableLike}
              setopen={setOpenListTableLike}
              product={selectedProduct}
              mainState={mainState}
            />
          )}
          {selectedProduct && (
            <SaveProductPage
              open={openSave}
              setopen={setopenSave}
              product={selectedProduct}
              mainState={mainState}
              setMainState ={setMainState}
            />
          )}
          {selectedProduct && (
            <ListProductComment
              open={openListTableComment}
              setopen={setOpenListTableComment}
              product={selectedProduct}
              mainState={mainState}
            />
          )}
          {selectedProduct && (
            <EidtProductPage
              open={openEdit}
              setopen={setopenEdit}
              product={selectedProduct}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
        </div>
      )}
      {mainState.render === "categories" && (
        <div>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    onClick={async () => {
                      let SearchCategory: any = allCategories.filter(
                        (e: categoryType) => {
                          return (
                            e.name
                              .toUpperCase()
                              .search(search.toUpperCase()) !== -1
                          );
                        }
                      );

                      if (SearchCategory.length === 0) {
                        mainState.render = "categories";
                        SearchCategory = mainState.allCategories;
                        mainState.allCategories = await _getAllCategories();
                        setMainState({ ...mainState });
                      }
                      mainState.allCategories = SearchCategory;
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Button>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "default" },
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      const newCategory: categoryType = {
                        id: 0,
                        name: "",
                        logo: "",
                      };
                      setopenSave(true);
                      setSelectedCategories(newCategory);
                    }}
                  >
                    Add category
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={() => {
                        setMainState({ ...mainState });
                      }}
                    >
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>logo</TableCell>
                    <TableCell>product</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCategories &&
                    allCategories.map((category: categoryType) => {
                      return (
                        <TableRow
                          key={category.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {category.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {category.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Avatar
                              alt="Remy Sharp"
                              src={category.logo}
                              sx={{ width: 56, height: 56 }}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => {
                                const findCategoriesProduct =
                                  allProducts.filter(
                                    (p: productType) =>
                                      p.idcategory === category.id
                                  );
                                mainState.ListCategoriesProducts =
                                  findCategoriesProduct;
                                setOpenListTableProduct(true);
                                setSelectedCategories(category);
                              }}
                            >
                              Products{" "}
                              {category.categoryProduct &&
                                category.categoryProduct.length}
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                setopenEdit(true);
                                setSelectedCategories(category);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              disabled={
                                category.categoryProduct &&
                                category.categoryProduct.length > 0
                              }
                              variant="contained"
                              color="error"
                              onClick={() => {
                                setopen(true);
                                setSelectedCategories(category);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          {selectedCategories && (
            <ConfirmDeleteDialog
              open={open}
              setopen={setopen}
              text={`Do ${selectedCategories.name}  will be deleted permenantly, are you sure?`}
              onConfirm={async () => {
                if (!selectedCategories) return;
                await _deleteCategories(selectedCategories.id);
                mainState.allCategories = mainState.allCategories.filter(
                  (c: categoryType) => c.id !== selectedCategories.id
                );
                mainState.render = "categories";
                setMainState({ ...mainState });
              }}
            />
          )}
          {selectedCategories && (
            <SaveCategoriesPage
              open={openSave}
              setopen={setopenSave}
              category={selectedCategories}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedCategories && (
            <ListCategoriesProduct
              open={openListTableProduct}
              setopen={setOpenListTableProduct}
              category={selectedCategories}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedCategories && (
            <EditCategoriesPage
              open={openEdit}
              setopen={setopenEdit}
              category={selectedCategories}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
        </div>
      )}
      {mainState.render === "comment" && (
        <div>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    onClick={async () => {
                      let SearchComment: any = allComment.filter(
                        (e: commentType) => {
                          return (
                            e.commentUser.name
                              .toUpperCase()
                              .search(search.toUpperCase()) !== -1
                          );
                        }
                      );

                      if (SearchComment.length === 0) {
                        mainState.render = "comment";
                        SearchComment = mainState.allComment;
                        mainState.allComment = await _getAllLike();
                        setMainState({ ...mainState });
                      }
                      mainState.allComment = SearchComment;
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Button>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "default" },
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      const newComment: commentType = {
                        id: 0,
                        iduser: 0,
                        idproduct: 0,
                        comment: "",
                        date: "",
                      };
                      setopenSave(true);
                      setSelectedComment(newComment);
                    }}
                  >
                    Add Comment
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={() => {
                        setMainState({ ...mainState });
                      }}
                    >
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>iduser</TableCell>
                    <TableCell>idproduct</TableCell>
                    <TableCell>comment</TableCell>
                    <TableCell>date</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allComment &&
                    allComment.map((command: commentType) => {
                      return (
                        <TableRow
                          key={command.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {command.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {command.commentUser && command.commentUser.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {command.commentProduct &&
                              command.commentProduct.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {command.comment}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {command.date}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                setopenEdit(true);
                                setSelectedComment(command);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                setopen(true);
                                setSelectedComment(command);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          {selectedComment && (
            <ConfirmDeleteDialog
              open={open}
              setopen={setopen}
              text={`Do ${selectedComment.comment}  will be deleted permenantly, are you sure?`}
              onConfirm={async () => {
                if (!selectedComment) return;
                await _deleteComment(selectedComment.id);
                mainState.allComment = mainState.allComment.filter(
                  (l: commentType) => l.id !== selectedComment.id
                );
                mainState.render = "comment";
                setMainState({ ...mainState });
              }}
            />
          )}
          {selectedComment && (
            <SaveCommentPage
              open={openSave}
              setopen={setopenSave}
              comments={selectedComment}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedComment && (
            <EditCommentPage
              open={openEdit}
              setopen={setopenEdit}
              comments={selectedComment}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
        </div>
      )}
      {mainState.render === "like" && (
        <div>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    onClick={async () => {
                      let SearchLike: any = allLike.filter((e: LikeType) => {
                        return (
                          e.likeUser.name
                            .toUpperCase()
                            .search(search.toUpperCase()) !== -1
                        );
                      });

                      if (SearchLike.length === 0) {
                        mainState.render = "like";
                        SearchLike = mainState.allLike;
                        mainState.allLike = await _getAllLike();
                        setMainState({ ...mainState });
                      }
                      mainState.allLike = SearchLike;
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Button>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "default" },
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      const newLike: LikeType = {
                        idproduct: 0,
                        iduser: 0,
                        id: 0,
                        likee: 0,
                      };
                      setopenSave(true);
                      setSelectedLike(newLike);
                    }}
                  >
                    Add Like
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={() => {
                        setMainState({ ...mainState });
                      }}
                    >
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>iduser</TableCell>
                    <TableCell>idproduct</TableCell>
                    <TableCell>likee</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allLike &&
                    allLike.map((like: LikeType) => {
                      return (
                        <TableRow
                          key={like.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {like.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {like.likeUser && like.likeUser.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {like.likeProduct && like.likeProduct.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {like.likee}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                setopenEdit(true);
                                setSelectedLike(like);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                setopen(true);
                                setSelectedLike(like);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          {selectedLike && (
            <ConfirmDeleteDialog
              open={open}
              setopen={setopen}
              text={`Do ${selectedLike.likee}  will be deleted permenantly, are you sure?`}
              onConfirm={async () => {
                if (!selectedLike) return;
                await _deleteLike(selectedLike.id);
                mainState.allLike = mainState.allLike.filter(
                  (l: LikeType) => l.id !== selectedLike.id
                );
                mainState.render = "like";
                setMainState({ ...mainState });
              }}
            />
          )}
          {selectedLike && (
            <EditLikePage
              open={openEdit}
              setopen={setopenEdit}
              like={selectedLike}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedLike && (
            <SaveLikePage
              open={openSave}
              setopen={setopenSave}
              like={selectedLike}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
        </div>
      )}
      {mainState.render === "news" && (
        <div>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    onClick={async () => {
                      let SearchNews: any = allNews.filter((e: NewsType) => {
                        return (
                          e.email.toUpperCase().search(search.toUpperCase()) !==
                          -1
                        );
                      });

                      if (SearchNews.length === 0) {
                        mainState.render = "news";
                        SearchNews = mainState.allNews;
                        mainState.allNews = await _getAllNews();
                        setMainState({ ...mainState });
                      }
                      mainState.allNews = SearchNews;
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Button>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "default" },
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      const newNews: NewsType = {
                        id: 0,
                        email: "",
                      };
                      setopenSave(true);
                      setSelectedNews(newNews);
                    }}
                  >
                    Add News
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={() => {
                        setMainState({ ...mainState });
                      }}
                    >
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allNews &&
                    allNews.map((news: NewsType) => {
                      return (
                        <TableRow
                          key={news.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {news.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {news.email}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                setopenEdit(true);
                                setSelectedNews(news);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                setopen(true);
                                setSelectedNews(news);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          {selectedNews && (
            <ConfirmDeleteDialog
              open={open}
              setopen={setopen}
              text={`Do ${selectedNews.email}  will be deleted permenantly, are you sure?`}
              onConfirm={async () => {
                if (!selectedNews) return;
                await _deleteNews(selectedNews.id);
                mainState.allNews = mainState.allNews.filter(
                  (o: NewsType) => o.id !== selectedNews.id
                );
                mainState.render = "news";
                setMainState({ ...mainState });
              }}
            />
          )}
          {selectedNews && (
            <EditNewsPage
              open={openEdit}
              setopen={setopenEdit}
              news={selectedNews}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedNews && (
            <SaveNewsPage
              open={openSave}
              setopen={setopenSave}
              news={selectedNews}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
        </div>
      )}
      {mainState.render === "orders" && (
        <div>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    onClick={async () => {
                      let SearchOrder: any = allOrders.filter(
                        (e: OrderType) => {
                          return (
                            e.orderUser.email
                              .toUpperCase()
                              .search(search.toUpperCase()) !== -1
                          );
                        }
                      );

                      if (SearchOrder.length === 0) {
                        mainState.render = "orders";
                        SearchOrder = mainState.allOrders;
                        mainState.allOrders = await _getAllOrders();
                        setMainState({ ...mainState });
                      }
                      mainState.allOrders = SearchOrder;
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Button>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "default" },
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      const newOrder: OrderType = {
                        id: 0,
                        idproduct: 0,
                        iduser: 0,
                        quantity: 0,
                      };
                      setopenSave(true);
                      setSelectedOrders(newOrder);
                    }}
                  >
                    Add Order
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={() => {
                        setMainState({ ...mainState });
                      }}
                    >
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>iduser</TableCell>
                    <TableCell>idproduct</TableCell>
                    <TableCell>quantity</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allOrders &&
                    allOrders.map((order: OrderType) => {
                      return (
                        <TableRow
                          key={order.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {order.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {order.orderUser && order.orderUser?.email}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {order.orderProduct && order.orderProduct?.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {order.quantity}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                setopenEdit(true);
                                setSelectedOrders(order);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                setopen(true);
                                setSelectedOrders(order);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          {selectedOrders && (
            <ConfirmDeleteDialog
              open={open}
              setopen={setopen}
              text={`Do ${selectedOrders.quantity}  will be deleted permenantly, are you sure?`}
              onConfirm={async () => {
                if (!selectedOrders) return;
                await _deleteOrders(selectedOrders.id);
                mainState.allOrders = mainState.allOrders.filter(
                  (o: OrderType) => o.id !== selectedOrders.id
                );
                mainState.render = "orders";
                setMainState({ ...mainState });
              }}
            />
          )}
          {selectedOrders && (
            <EditOrderPage
              open={openEdit}
              setopen={setopenEdit}
              order={selectedOrders}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedOrders && (
            <SaveOrderPage
              open={openSave}
              setopen={setopenSave}
              order={selectedOrders}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
        </div>
      )}
      {mainState.render === "contact" && (
        <div>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    onClick={async () => {
                      let SearchContact: any = allContact.filter(
                        (e: ContactType) => {
                          return (
                            e.email
                              .toUpperCase()
                              .search(search.toUpperCase()) !== -1
                          );
                        }
                      );

                      if (SearchContact.length === 0) {
                        mainState.render = "contact";
                        SearchContact = mainState.allContact;
                        mainState.allContact = await _getAllContact();
                        setMainState({ ...mainState });
                      }
                      mainState.allContact = SearchContact;
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Button>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "default" },
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      const newContact: ContactType = {
                        id: 0,
                        email: "",
                        massage: "",
                      };
                      setopenSave(true);
                      setSelectedContact(newContact);
                    }}
                  >
                    Add Contact
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={() => {
                        setMainState({ ...mainState });
                      }}
                    >
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>massage</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allContact &&
                    allContact.map((contact: ContactType) => {
                      return (
                        <TableRow
                          key={contact.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {contact.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {contact.email}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {contact.massage}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                setopenEdit(true);
                                setSelectedContact(contact);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                setopen(true);
                                setSelectedContact(contact);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          {selectedContact && (
            <ConfirmDeleteDialog
              open={open}
              setopen={setopen}
              text={`Do ${selectedContact.email}  will be deleted permenantly, are you sure?`}
              onConfirm={async () => {
                if (!selectedContact) return;
                await _deleteContact(selectedContact.id);
                mainState.allContact = mainState.allContact.filter(
                  (c: ContactType) => c.id !== selectedContact.id
                );
                mainState.render = "contact";
                setMainState({ ...mainState });
              }}
            />
          )}
          {selectedContact && (
            <EditContactPage
              open={openEdit}
              setopen={setopenEdit}
              contact={selectedContact}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedContact && (
            <SaveContactPage
              open={openSave}
              setopen={setopenSave}
              contact={selectedContact}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
        </div>
      )}
      {mainState.render === "save" && (
        <div>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    onClick={async () => {
                      let SearchSave: any = allSave.filter((e: SaveType) => {
                        return (
                          e.saveUser.name
                            .toUpperCase()
                            .search(search.toUpperCase()) !== -1
                        );
                      });

                      if (SearchSave.length === 0) {
                        mainState.render = "save";
                        SearchSave = mainState.allSave;
                        mainState.allSave = await _getAllSave();
                        setMainState({ ...mainState });
                      }
                      mainState.allSave = SearchSave;
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Button>{" "}
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "default" },
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      const newSave: SaveType = {
                        id: 0,
                        idproduct: 0,
                        iduser: 0,
                        save: "",
                      };
                      setopenSave(true);
                      setSelectedSave(newSave);
                    }}
                  >
                    Add Save
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={() => {
                        setMainState({ ...mainState });
                      }}
                    >
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>iduser</TableCell>
                    <TableCell>idproduct</TableCell>
                    <TableCell>save</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allSave &&
                    allSave.map((save: SaveType) => {
                      return (
                        <TableRow
                          key={save.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {save.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {save.saveUser && save.saveUser?.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {save.saveProduct && save.saveProduct?.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {save.save}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                setopenEdit(true);
                                setSelectedSave(save);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                setopen(true);
                                setSelectedSave(save);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          {selectedSave && (
            <ConfirmDeleteDialog
              open={open}
              setopen={setopen}
              text={`Do ${selectedSave.save}  will be deleted permenantly, are you sure?`}
              onConfirm={async () => {
                if (!selectedSave) return;
                await _deleteSave(selectedSave.id);
                mainState.allSave = mainState.allSave.filter(
                  (s: SaveType) => s.id !== selectedSave.id
                );
                mainState.render = "save";
                setMainState({ ...mainState });
              }}
            />
          )}
          {selectedSave && (
            <SavePage
              open={openSave}
              setopen={setopenSave}
              savee={selectedSave}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedSave && (
            <EditSavePage
              open={openEdit}
              setopen={setopenEdit}
              savee={selectedSave}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
        </div>
      )}
      {mainState.render === "checkOut" && (
        <div>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    onClick={async () => {
                      let SearchCheck: any = allCheckOut.filter(
                        (e: CheckOutType) => {
                          return (
                            e.checkUser.name
                              .toUpperCase()
                              .search(search.toUpperCase()) !== -1
                          );
                        }
                      );

                      if (SearchCheck.length === 0) {
                        mainState.render = "checkOut";
                        SearchCheck = mainState.allCheckOut;
                        mainState.allCheckOut = await _getAllCheckOut();
                        setMainState({ ...mainState });
                      }
                      mainState.allCheckOut = SearchCheck;
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Button>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "default" },
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      const newOut: CheckOutType = {
                        id: 0,
                        iduser: 0,
                        priceOut: 0,
                        CreditCardNumber: "",
                        expMonth: "",
                        cvv: "",
                      };
                      setopenSave(true);
                      setSelectedCheckOut(newOut);
                    }}
                  >
                    Add check Out
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={() => {
                        setMainState({ ...mainState });
                      }}
                    >
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>iduser</TableCell>
                    <TableCell>priceOut</TableCell>
                    <TableCell>CreditCardNumber</TableCell>
                    <TableCell>expMonth</TableCell>
                    <TableCell>cvv</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCheckOut &&
                    allCheckOut.map((out: CheckOutType) => {
                      return (
                        <TableRow
                          key={out.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {out.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {out.checkUser.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {out.priceOut}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {out.CreditCardNumber}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {out.expMonth}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {out.cvv}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                setopenEdit(true);
                                setSelectedCheckOut(out);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                setopen(true);
                                setSelectedCheckOut(out);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          {selectedCheckOut && (
            <ConfirmDeleteDialog
              open={open}
              setopen={setopen}
              text={`Do ${selectedCheckOut.CreditCardNumber}  will be deleted permenantly, are you sure?`}
              onConfirm={async () => {
                if (!selectedCheckOut) return;
                await _deleteCheckOut(selectedCheckOut.id);
                mainState.allCheckOut = mainState.allCheckOut.filter(
                  (c: CheckOutType) => c.id !== selectedCheckOut.id
                );
                mainState.render = "checkOut";
                setMainState({ ...mainState });
              }}
            />
          )}
          {selectedCheckOut && (
            <SaveCheckOutPage
              open={openSave}
              setopen={setopenSave}
              checkOut={selectedCheckOut}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
          {selectedCheckOut && (
            <EditCheckOutPage
              open={openEdit}
              setopen={setopenEdit}
              checkOut={selectedCheckOut}
              mainState={mainState}
              setMainState={setMainState}
            />
          )}
        </div>
      )}
    </Paper>
  );
}
