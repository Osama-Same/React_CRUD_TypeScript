import axios from "axios";
import { toast } from "react-toastify";
const url = "https://outstanding-hare-sweater.cyclic.app/";
//const url = "http://localhost:5000/";
export async function _loginUser(user: any) {
  const res = await axios.post(url + "login", user);

  if (res.data.result) {
    toast(`User Login sucessfully`);
    const token = res.data.token;
    localStorage.setItem("token", token);
    return res.data.result[0];
  } else if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data.error;
  } else if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else {
    toast.error(`Error server`);
  }
}

export async function _insertUser(user: any) {
  const res = await axios.post(url + "users", user);
  if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data.error;
  } else if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else {
    toast(`${res.data.result}`);
    return res.data.result;
  }
}

export async function _insetContact(contact: any) {
  const res = await axios.post(url + "contact", contact);
  console.log(res.data.result);
  if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  }
  if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data.error;
  } else {
    toast(`Contact sucessfully`);
    console.log(res.data);
    return res.data.result;
  }
}

export async function _insetCategory(categories: any) {
  const res = await axios.post(url + "categories", categories);
  if (res.data.result) {
    toast(`${res.data.result}`);
    return res.data.result;
  } else if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data.error;
  } else {
    toast.error(`Error server`);
  }
}

export async function _insetProduct(products: any) {
  const res = await axios.post(url + "products", products);
  if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data.error;
  } else {
    toast(`Product sucessfully`);
    return res.data.result;
  }
}

export async function _insetNews(news: any) {
  const res = await axios.post(url + "news", news);
  if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data.error;
  } else {
    toast(`News sucessfully`);
    return res.data.result;
  }
}

export async function _insetOrders(orders: any) {
  const res = await axios.post(url + "orders", orders);
  if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else {
    toast(`order sucessfully`);
    return res.data.result;
  }
}

export async function _insetComment(comment: any) {
  const res = await axios.post(url + "comment", comment);
  if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data.error;
  } else {
    toast(`comment sucessfully`);
    return res.data;
  }
}

export async function _insetLike(like: any) {
  const res: any = await axios.post(url + "like", like);
  if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else {
    toast(`Like sucessfully`);
    return res.data.result;
  }
}
export async function _insetSave(save: any) {
  const res: any = await axios.post(url + "save", save);
  if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else {
    toast(`Save sucessfully`);
    return res.data.result;
  }
}
export async function _insetCheckOut(checkOut: any) {
  const res: any = await axios.post(url + "checkOut", checkOut);
  if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else {
    toast(`check Out sucessfully`);
    return res.data.result;
  }
}
