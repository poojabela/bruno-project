import EndpointDetails from "./components/EndpointDetails";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <EndpointDetails />
        </div>
      </div>
    </>
  );
}

export default App;
