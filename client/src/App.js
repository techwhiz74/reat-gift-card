import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Loader from "./components/Loader";
import LandingPage from "./screens/LandingPage";

import Api from "./services/Api";

const AuthScreen = React.lazy(() => import("./screens/AuthScreen"));
const ResetPassScreen = React.lazy(() =>
  import("./screens/auth/ResetPassScreen")
);

// Footer
const AboutUs = React.lazy(() => import("./screens/footer/AboutUs"));
const FAQs = React.lazy(() => import("./screens/footer/FAQs"));
const CookiePolicy = React.lazy(() => import("./screens/footer/CookiePolicy"));
const Dispatch = React.lazy(() => import("./screens/footer/Dispatch"));
const Terms = React.lazy(() => import("./screens/footer/Terms"));
const Privacy = React.lazy(() => import("./screens/footer/Privacy"));

const AccountScreen = React.lazy(() => import("./screens/AccountScreen"));
const ProfilePanel = React.lazy(() => import("./screens/account/ProfilePanel"));
const OrderPanel = React.lazy(() => import("./screens/account/OrderPanel"));
const AddressPanel = React.lazy(() => import("./screens/account/AddressPanel"));
const AddressDetails = React.lazy(() =>
  import("./screens/account/AddressDetails")
);
const ThemeScreen = React.lazy(() => import("./screens/ThemeScreen"));
const GiftsScreen = React.lazy(() => import("./screens/GiftsScreen"));
const SearchScreen = React.lazy(() => import("./screens/SearchScreen"));
const CardInfoScreen = React.lazy(() => import("./screens/CardInfoScreen"));
const GiftInfoScreen = React.lazy(() => import("./screens/GiftInfoScreen"));
const CanvasContainer = React.lazy(() =>
  import("./components/CanvasContainer")
);
const CanvasMiddleContainer = React.lazy(() =>
  import("./components/CanvasMiddleContainer")
);
const GiftCardCanvas = React.lazy(() => import("./components/GiftCardCanvas"));
const GiftForCardScreen = React.lazy(() =>
  import("./screens/shopping/GiftForCardScreen")
);
const CardForGiftScreen = React.lazy(() =>
  import("./screens/shopping/CardForGiftScreen")
);
const CartScreen = React.lazy(() => import("./screens/shopping/CartScreen"));
const DeliveryScreen = React.lazy(() =>
  import("./screens/shopping/DeliveryScreen")
);
const NewAddressScreen = React.lazy(() =>
  import("./screens/shopping/NewAddressScreen")
);
const CheckoutScreen = React.lazy(() =>
  import("./screens/shopping/CheckoutScreen")
);

const AdminLayout = React.lazy(() => import("./screens/AdminLayout"));
const Dashboard = React.lazy(() => import("./screens/dashboard/Dashboard"));
const Customers = React.lazy(() => import("./screens/dashboard/Customers"));
const CustomerDetails = React.lazy(() =>
  import("./screens/dashboard/CustomerDetails")
);
const Products = React.lazy(() => import("./screens/dashboard/Products"));
const ProductDetails = React.lazy(() =>
  import("./screens/dashboard/ProductDetails")
);
const SupplementDetails = React.lazy(() =>
  import("./screens/dashboard/SupplementDetails")
);
const Categories = React.lazy(() => import("./screens/dashboard/Categories"));
const CategoryDetails = React.lazy(() =>
  import("./screens/dashboard/CategoryDetails")
);
const Orders = React.lazy(() => import("./screens/dashboard/Orders"));
const OrderDetails = React.lazy(() =>
  import("./screens/dashboard/OrderDetails")
);
const AdminProfile = React.lazy(() =>
  import("./screens/dashboard/AdminProfile")
);

Api.url = "/";
// Api.url = "http://localhost:4000";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route
          path="/admin"
          render={(props) => (
            <Suspense fallback={<></>}>
              <AdminLayout {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/admin/dashboard"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <Dashboard {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/admin/customers"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <Customers {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/admin/customer/add"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CustomerDetails method="Add" />
            </Suspense>
          )}
        />
        <Route
          path="/admin/customer/:id/detail"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CustomerDetails />
            </Suspense>
          )}
        />
        <Route
          path="/admin/customer/:id/edit"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CustomerDetails method="Edit" />
            </Suspense>
          )}
        />
        <Route
          path="/admin/products"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <Products {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/admin/product/add"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <ProductDetails method="Add" />
            </Suspense>
          )}
        />
        <Route
          path="/admin/product/:id/detail"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <ProductDetails />
            </Suspense>
          )}
        />
        <Route
          path="/admin/product/:id/edit"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <ProductDetails method="Edit" />
            </Suspense>
          )}
        />
        <Route
          path="/admin/supplement/add"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <SupplementDetails method="Add" />
            </Suspense>
          )}
        />
        <Route
          path="/admin/supplement/:id/detail"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <SupplementDetails />
            </Suspense>
          )}
        />
        <Route
          path="/admin/supplement/:id/edit"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <SupplementDetails method="Edit" />
            </Suspense>
          )}
        />
        <Route
          path="/admin/categories"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <Categories {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/admin/category/add"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CategoryDetails method="Add" />
            </Suspense>
          )}
        />
        <Route
          path="/admin/category/:id/edit"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CategoryDetails method="Edit" />
            </Suspense>
          )}
        />
        <Route
          path="/admin/profile"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <AdminProfile {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/admin/orders"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <Orders {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/admin/order/:id/edit"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <OrderDetails method="Edit" />
            </Suspense>
          )}
        />
        <Route
          path="/admin/order/:id/detail"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <OrderDetails {...props} />
            </Suspense>
          )}
        />

        <Route path="/" component={LandingPage} exact />
        <Route path="/loading" component={Loader} exact />

        <Route
          path="/about"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <AboutUs {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/faqs"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <FAQs {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/cookie"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CookiePolicy {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/dispatch"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <Dispatch {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/terms"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <Terms {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/privacy"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <Privacy {...props} />
            </Suspense>
          )}
        />

        <Route
          path="/login/:fromcart?"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <AuthScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/passwordreset/:token"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <ResetPassScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/account"
          render={(props) => (
            <Suspense fallback={<></>}>
              <AccountScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/account/profile"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <ProfilePanel {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/account/order/page/:pageNumber"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <OrderPanel {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/account/addressbook"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <AddressPanel {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/accounts/address/add"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <AddressDetails method="Add" />
            </Suspense>
          )}
        />
        <Route
          path="/accounts/address/:id/edit/:fromdelivery?"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <AddressDetails method="Edit" />
            </Suspense>
          )}
        />
        <Route
          path="/accounts/address/:id/detail"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <AddressDetails />
            </Suspense>
          )}
        />
        <Route
          path="/themes/page/:pageNumber"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <ThemeScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/theme/:occasion/:pageNumber"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <ThemeScreen {...props} occasion={props.match.params.occasion} />
            </Suspense>
          )}
        />
        <Route
          path="/gifts/page/:pageNumber"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <GiftsScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/gift/:occasion/:pageNumber"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <GiftsScreen {...props} occasion={props.match.params.occasion} />
            </Suspense>
          )}
        />
        <Route
          path="/cardinfo/:id/:forGift?"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CardInfoScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/giftinfo/:giftId/:productId?/:prevData?"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <GiftInfoScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/search"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <SearchScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/addgift/:id/:giftIds?"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <GiftForCardScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/addcards/page/:pageNumber"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CardForGiftScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/addcard/:occasion/:pageNumber"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CardForGiftScreen
                {...props}
                occasion={props.match.params.occasion}
              />
            </Suspense>
          )}
        />
        <Route
          path="/cart/:id?"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CartScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/delivery"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <DeliveryScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/newaddress"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <NewAddressScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/checkout/:id"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CheckoutScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/design/:id/front/:forGift?"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CanvasContainer {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/design/:id/middle/:forGift?"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <CanvasMiddleContainer {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/giftdesign/:id/:productId?/:amount/:fee/:prevData?"
          render={(props) => (
            <Suspense fallback={<Loader />}>
              <GiftCardCanvas {...props} />
            </Suspense>
          )}
        />
      </main>
    </BrowserRouter>
  );
};

export default App;
