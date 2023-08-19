import Loader from "../Components/Loader";
import ToastWidget from "../Components/ToastWidget";
import useCategories from "../hooks/useCategories";
import useCurrentUser from "../hooks/useCurrentUser";
import MainNav from "./mainNav";

function MainApp(params) {
  const { isLoading, isLoggedIn } = useCurrentUser();
  useCategories();
  if (isLoading) return <Loader isLoading={true} />;
  else
    return (
      <>
        <MainNav isLoggedIn={isLoggedIn} />
        <ToastWidget />
      </>
    );
}
export default MainApp;
