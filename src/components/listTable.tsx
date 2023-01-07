import { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  categoryType,
  CheckOutType,
  commentType,
  LikeType,
  MainStateType,
  OrderType,
  productType,
  SaveType,
  UserType,
} from "./mainState";
import { ConfirmDeleteDialog } from "./common/ConfirmDeleteDialog";
import {
  _deleteCheckOut,
  _deleteOrders,
  _deleteSave,
} from "../service/deleteAllData";
import {
  EditOrderPage,
  EditSavePage,
  EditCheckOutPage,
} from "./common/ConfirmEditDialog";

interface ListTableOrder {
  open: boolean;
  setopen: (b: boolean) => void;
  userOrders: UserType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ListTableOrder({
  open,
  setopen,
  userOrders,
  mainState,
  setMainState,
}: ListTableOrder) {
  const { listUserOrder } = mainState;
  const [openDelete, setopenDelete] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [selectedListOrder, setSelectedOrder] = useState<OrderType | null>(
    null
  );
  const getTotalPrice = ({ listUserOrder }: any) => {
    let totalPrice = 0;
    if (!listUserOrder) return totalPrice;
    mainState.listUserOrder.forEach((e: OrderType) => {
      totalPrice += e.quantity * e.orderProduct.price;
    });
    return totalPrice;
  };
  return (
    <div>
      <Dialog open={open} onClose={() => setopen(false)} maxWidth={"xl"}>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
            Table Orders {userOrders.name}
          </DialogContentText>
          <TableContainer>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <caption style={{ textAlign: "right" }}>
                Total : {getTotalPrice({ listUserOrder })}
              </caption>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Name user</TableCell>
                  <TableCell>Name Product</TableCell>
                  <TableCell>images Product</TableCell>
                  <TableCell>Price Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Delete Order</TableCell>
                  <TableCell>Edit Order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mainState.listUserOrder.map((order: OrderType) => {
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
                        {order.orderUser?.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.orderProduct?.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Avatar
                          alt="Remy Sharp"
                          src={order.orderProduct?.images}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.orderProduct?.price}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.quantity}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {order.orderProduct?.price * order.quantity}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => {
                            setopenDelete(true);
                            setSelectedOrder(order);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            setopenEdit(true);
                            setSelectedOrder(order);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <ConfirmDeleteDialog
        open={openDelete}
        setopen={setopenDelete}
        text={`Do ${selectedListOrder?.orderProduct.name}  will be deleted permenantly, are you sure?`}
        onConfirm={async () => {
          if (!selectedListOrder) return;
          await _deleteOrders(selectedListOrder.id);
          mainState.listUserOrder = mainState.listUserOrder.filter(
            (o: OrderType) => o.id !== selectedListOrder.id
          );
          setMainState({ ...mainState });
        }}
      />
      {selectedListOrder && (
        <EditOrderPage
          open={openEdit}
          setopen={setopenEdit}
          order={selectedListOrder}
          mainState={mainState}
          setMainState={setMainState}
        />
      )}
    </div>
  );
}

interface ListTableSaveProps {
  open: boolean;
  setopen: (b: boolean) => void;
  save: UserType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function ListUserSave({
  open,
  setopen,
  save,
  mainState,
  setMainState,
}: ListTableSaveProps) {
  const [openDelete, setopenDelete] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [selectedListSave, setSelectedSave] = useState<SaveType | null>(null);
  return (
    <div>
      <Dialog open={open} onClose={() => setopen(false)} maxWidth={"xl"}>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
            Table Save {save.name}
          </DialogContentText>
          <TableContainer>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Name user</TableCell>
                  <TableCell>Name Product</TableCell>
                  <TableCell>images Product</TableCell>
                  <TableCell>save</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mainState.ListUserSave.map((s: SaveType) => {
                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{s.id}</TableCell>
                      <TableCell>{s.saveUser.name}</TableCell>
                      <TableCell>{s.saveProduct.name}</TableCell>
                      <TableCell component="th" scope="row">
                        <Avatar
                          alt="Remy Sharp"
                          src={s.saveProduct.images}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>{s.save}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => {
                            setopenDelete(true);
                            setSelectedSave(s);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="success"
                          variant="contained"
                          onClick={() => {
                            setopenEdit(true);
                            setSelectedSave(s);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <ConfirmDeleteDialog
        open={openDelete}
        setopen={setopenDelete}
        text={`Do ${selectedListSave?.saveProduct.name}  will be deleted permenantly, are you sure?`}
        onConfirm={async () => {
          if (!selectedListSave) return;
          await _deleteSave(selectedListSave.id);
          mainState.ListUserSave = mainState.ListUserSave.filter(
            (l: SaveType) => l.id !== selectedListSave.id
          );
          setMainState({ ...mainState });
        }}
      />
      {selectedListSave && (
        <EditSavePage
          open={openEdit}
          setopen={setopenEdit}
          savee={selectedListSave}
          mainState={mainState}
          setMainState={setMainState}
        />
      )}
    </div>
  );
}

interface ListTableCheckOutProps {
  open: boolean;
  setopen: (b: boolean) => void;
  check: UserType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function ListUserCheckOut({
  open,
  setopen,
  check,
  mainState,
  setMainState,
}: ListTableCheckOutProps) {
  const [openDelete, setopenDelete] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [selectedListCheckOut, setSelectedCheckOut] =
    useState<CheckOutType | null>(null);
  return (
    <div>
      <Dialog open={open} onClose={() => setopen(false)} maxWidth={"xl"}>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
            Table CheckOut
          </DialogContentText>
          <TableContainer>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Name user</TableCell>
                  <TableCell>Image user</TableCell>
                  <TableCell>Credit Card Number</TableCell>
                  <TableCell>expMonth</TableCell>
                  <TableCell>cvv</TableCell>
                  <TableCell>Totle</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mainState.ListCheckOut.map((c: CheckOutType) => {
                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {" "}
                      <TableCell>{c.id}</TableCell>
                      <TableCell>{c.checkUser.name}</TableCell>
                      <TableCell component="th" scope="row">
                        <Avatar
                          alt="Remy Sharp"
                          src={c.checkUser.image}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>{c.CreditCardNumber}</TableCell>
                      <TableCell>{c.expMonth}</TableCell>
                      <TableCell>{c.cvv}</TableCell>
                      <TableCell>{c.priceOut}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => {
                            setopenDelete(true);
                            setSelectedCheckOut(c);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="success"
                          variant="contained"
                          onClick={() => {
                            setopenEdit(true);
                            setSelectedCheckOut(c);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <ConfirmDeleteDialog
        open={openDelete}
        setopen={setopenDelete}
        text={`Do ${selectedListCheckOut?.checkUser.name}  will be deleted permenantly, are you sure?`}
        onConfirm={async () => {
          if (!selectedListCheckOut) return;
          await _deleteCheckOut(selectedListCheckOut.id);
          mainState.ListCheckOut = mainState.ListCheckOut.filter(
            (c: CheckOutType) => c.id !== selectedListCheckOut.id
          );
          setMainState({ ...mainState });
        }}
      />
      {selectedListCheckOut && (
        <EditCheckOutPage
          open={openEdit}
          setopen={setopenEdit}
          checkOut={selectedListCheckOut}
          mainState={mainState}
          setMainState={setMainState}
        />
      )}
    </div>
  );
}

// List Product

interface ListTableProductProps {
  open: boolean;
  setopen: (b: boolean) => void;
  product: productType;
  mainState: MainStateType;
}
export function ListProductLike({
  open,
  setopen,
  product,
  mainState,
}: ListTableProductProps) {
  return (
    <div>
      <Dialog open={open} onClose={() => setopen(false)} maxWidth={"xl"}>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
            Table Product Like {product.name}
          </DialogContentText>
          <TableContainer>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Name user</TableCell>
                  <TableCell>Image user</TableCell>
                  <TableCell>Name Product</TableCell>
                  <TableCell>Image Product</TableCell>
                  <TableCell>Like</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mainState.ListLikeProduct.map((l: LikeType) => {
                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {" "}
                      <TableCell>{l.id}</TableCell>
                      <TableCell>{l.likeUser.name}</TableCell>
                      <TableCell component="th" scope="row">
                        <Avatar
                          alt="Remy Sharp"
                          src={l.likeUser.image}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>{l.likeProduct.name}</TableCell>
                      <TableCell>
                        {" "}
                        <Avatar
                          alt="Remy Sharp"
                          src={l.likeProduct.images}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>{l.likee}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function ListProductComment({
  open,
  setopen,
  product,
  mainState,
}: ListTableProductProps) {
  return (
    <div>
      <Dialog open={open} onClose={() => setopen(false)} maxWidth={"xl"}>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
            Table Product Like {product.name}
          </DialogContentText>
          <TableContainer>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Name user</TableCell>
                  <TableCell>Image user</TableCell>
                  <TableCell>Name Product</TableCell>
                  <TableCell>Image Product</TableCell>
                  <TableCell>Comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mainState.ListCommentProduct.map((c: commentType) => {
                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {" "}
                      <TableCell>{c.id}</TableCell>
                      <TableCell>{c.commentUser.name}</TableCell>
                      <TableCell component="th" scope="row">
                        <Avatar
                          alt="Remy Sharp"
                          src={c.commentUser.image}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>{c.commentProduct.name}</TableCell>
                      <TableCell>
                        {" "}
                        <Avatar
                          alt="Remy Sharp"
                          src={c.commentProduct.images}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>{c.comment}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

interface ListCategoriesProductProps {
  open: boolean;
  setopen: (b: boolean) => void;
  category: categoryType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
// categories

export function ListCategoriesProduct({
  open,
  setopen,
  category,
  mainState,
  setMainState,
}: ListCategoriesProductProps) {
  return (
    <Dialog open={open} onClose={() => setopen(false)} maxWidth={"xl"}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Table category {category.name}
        </DialogContentText>
        <TableContainer>
          <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>country</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainState.ListCategoriesProducts.map((p:productType) => {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                     <TableCell>{p.id}</TableCell>
                     <TableCell>{p.name}</TableCell>
                     <TableCell component="th" scope="row">
                        <Avatar
                          alt="Remy Sharp"
                          src={p.images}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>{p.country}</TableCell>
                      <TableCell>{p.price}</TableCell>
                      <TableCell>{p.date}</TableCell>
                      <TableCell>{p.description}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}
