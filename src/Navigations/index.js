import Loader from "../Components/Loader";
import ToastWidget from "../Components/ToastWidget";
import useCurrentUser from "../hooks/useCurrentUser";
import MainNav from "./mainNav";

function MainApp(params) {
  const { isLoading, isLoggedIn } = useCurrentUser();
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
