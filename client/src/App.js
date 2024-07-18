import logo from "./logo.svg";
import "./App.css";
import Footer from "./Components/NavigationAndRoutes/Footer";
import NavigationBar from "./Components/NavigationAndRoutes/NavigationBar";
import AllRoutes from "./Components/NavigationAndRoutes/AllRoutes";
function App() {
  const fetchData = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
      });
  };
  return (
    <>
      <header>
        <NavigationBar></NavigationBar>
      </header>
      <main>
        <AllRoutes></AllRoutes>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}

export default App;
