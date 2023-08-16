import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

const getSingleDocument = async ({ query }) => {
  try {
    const result = await getDoc(query);
    const filterData = { ...result.data(), id: result.id };
    return filterData;
  } catch (error) {
    console.log("errorr single document", error);
    return [];
  }
};

const getUserDetails = async ({ userId }) => {
  try {
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const nwDta = await getDocs(q);
    const _fdata = nwDta.docs.map((e) => ({ ...e.data(), id: e.id }))[0] ?? {};
    delete _fdata.password;
    const options = {
      isLoggedIn: true,
      isLoading: false,
      userDetails: { userId, ..._fdata },
    };
    localStorage.setItem("userdata", JSON.stringify(options.userDetails));
    return options;
  } catch (error) {
    console.log("errorr user details document", error);
    return {};
  }
};

export { getSingleDocument, getUserDetails };
