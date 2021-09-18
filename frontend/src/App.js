import Search from "./components/Search";
import Cart from "./components/Cart";
import ViewCoupons from "./components/ViewCoupons";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/cart" component={Cart} />
          <Route path="/coupons" component={ViewCoupons} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;