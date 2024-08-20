import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from "../layouts/Main"
import Product from "./components/Product/Product"
import Order from "./components/Order/Order"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Favorite from "./components/Favorite/Favorite"
import Cart from "./components/Cart/Cart"


function App() {
 const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {path:'/product',element:<Product></Product>},
      {path:'order',element:<Order></Order>},
      {path:'/login',element:<Login></Login>},
      {path:'/register',element:<Register></Register>},
      {path:'/addToCart',element:<Cart></Cart>},
      {path:'/favorite',element:<Favorite></Favorite>}
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
