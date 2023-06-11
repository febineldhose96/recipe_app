import { Provider } from "react-redux";
import { store } from "./Redux/store";
import MainApp from "./Navigations";

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
