import React from "react"
import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Menu from "./pages/Menu/Menu"
import Rsvp from "./pages/Rsvp/Rsvp"
import RsvpAdmin from "./pages/RsvpAdmin/RsvpAdmin"
import Food from "./pages/Food/Food"
import Venue from "./pages/Venue/Venue"
import NotFound from "./pages/NotFound"

/* Application route definitions */
const Router: React.FC = () => (
  <Routes>
    <Route path="/" Component={Landing}/>
    <Route path="/food" Component={Food}/>
    <Route path="/venue" Component={Venue}/>
    <Route path="/menu" Component={Menu}/>
    <Route path="/rsvp" Component={Rsvp}/>
    <Route path="/rsvp/admin" Component={RsvpAdmin}/>
    <Route path="*" Component={NotFound}/>
  </Routes>
)

export default Router
