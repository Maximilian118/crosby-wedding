import React from "react"
import { Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Landing from "./pages/Landing"

const Router: React.FC = () => (
  <Routes>
    <Route path="*" Component={NotFound}/>
    <Route path="/" Component={Landing}/>
  </Routes>
)

export default Router