export type MainStateType = {
  allUsers: UserType[];
  allCategories: categoryType[];
  allComment: commentType[];
  allContact: ContactType[];
  allProducts: productType[];
  allLike: LikeType[];
  allNews: NewsType[];
  allOrders: OrderType[];
  allSave: SaveType[];
  allCheckOut: CheckOutType[];
  listUserOrder: OrderType[];
  ListUserSave: SaveType[];
  ListCheckOut: CheckOutType[];
  ListLikeProduct: LikeType[];
  ListOrdersProduct: OrderType[];
  ListCommentProduct: commentType[];
  ListCategoriesProducts: productType[];
  render: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  authorization?: string;
  userProduct?: productType[] | any;
  userLike?: LikeType[] | any;
  userComment?: commentType[] | any;
  userOrders?: OrderType[] | any;
  userSave?: SaveType[] | any;
  userCheckOut?: CheckOutType[] | any;
};

export type productType = {
  id: number;
  iduser: number;
  idcategory: number;
  name: string;
  country: string;
  images: string;
  price: number;
  date: string;
  description: string;
  productUser?: UserType | any;
  productCategory?: categoryType | any;
  productlike?: LikeType[] | any;
  productComment?: commentType[] | any;
  productOrders?: OrderType[] | any;
  productSave?: SaveType[] | any;
};
export type ContactType = {
  id?: number;
  email: string;
  massage: string;
};
export type NewsType = {
  id: number;
  email: string;
};
export type categoryType = {
  id: number;
  name: string;
  logo: string;
  categoryProduct?: productType[] | any;
};
export type LikeType = {
  id: number;
  iduser: number;
  idproduct: number;
  likee: number;
  likeProduct?: productType | any;
  likeUser?: UserType | any;
};
export type commentType = {
  id: number;
  iduser: number;
  idproduct: number;
  comment: string;
  date: string;
  commentProduct?: productType | any;
  commentUser?: UserType | any;
};
export type OrderType = {
  id: number;
  iduser: number;
  idproduct: number;
  quantity: number;
  orderProduct?: productType | any;
  orderUser?: UserType | any;
};
export type SaveType = {
  id?: number;
  iduser: number;
  idproduct: number;
  save: string;
  saveProduct?: productType | any;
  saveUser?: UserType | any;
};
export type CheckOutType = {
  id?: number;
  iduser: number;
  priceOut: number;
  CreditCardNumber: string;
  expMonth: string;
  cvv: string;
  checkUser?: UserType | any;
};
