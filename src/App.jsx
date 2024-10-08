import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from "../layouts/Main"
import Product from "./components/Product/Product"
import Order from "./components/Order/Order"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Favorite from "./components/Favorite/Favorite"
import Cart from "./components/Cart/Cart"
import CheckOut from "./components/CheckOut/CheckOut"
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess"
import PaymentFail from "./components/PaymentFail/PaymentFail"
import PaymentCancel from "./components/PaymentCancel/PaymentCancel"
import ProductDetails from "./components/ProductDetails/ProductDetails"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"

function App() {
 const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {path:'/',element:<Product></Product>},
      {path:'/product',element:<Product></Product>},
      {path:'order',element:<PrivateRoute><Order></Order></PrivateRoute>},
      {path:'/login',element:<Login></Login>},
      {path:'/register',element:<Register></Register>},
      {path:'/addToCart',element:<PrivateRoute><Cart></Cart></PrivateRoute>},
      {path:'/favorite',element:<PrivateRoute><Favorite></Favorite></PrivateRoute>},
      {path:'/checkout',element:<CheckOut></CheckOut>},
      {path:'/paymentSuccess',element:<PaymentSuccess></PaymentSuccess>},
      {path:'/paymentFail',element:<PaymentFail></PaymentFail>},
      {path:'/paymentCalcel',element:<PaymentCancel></PaymentCancel>},
      {path:'/productDetails/:productId',element:<ProductDetails></ProductDetails>}
    ]
  }
 ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
