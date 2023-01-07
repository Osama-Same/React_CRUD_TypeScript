import { useState, useEffect } from "react";
import { Paperbase } from "./components/Paperbase";
import { MainStateType } from "./components/mainState";
import { updateUserState } from "./components/users";
import { ToastContainer } from "react-toastify";
function App() {
  const [mainState, setMainState] = useState<MainStateType>({
    allUsers: [],
    allCategories: [],
    allComment: [],
    allContact: [],
    allLike: [],
    allOrders: [],
    allNews: [],
    allProducts: [],
    allSave: [],
    allCheckOut: [],
    listUserOrder: [],
    ListUserSave: [],
    ListCheckOut: [],
    ListLikeProduct: [],
    ListCommentProduct: [],
    ListOrdersProduct: [],
    ListCategoriesProducts : [],
    render: "",
  });
  useEffect(() => {
    updateUserState(mainState, setMainState);
  }, [mainState]);

  console.log(mainState);
  return (
    <div className="App">
      <ToastContainer />
      <Paperbase mainState={mainState} setMainState={setMainState} />
    </div>
  );
}

export default App;
