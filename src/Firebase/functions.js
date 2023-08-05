import { getDoc } from "firebase/firestore";

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

export { getSingleDocument };
