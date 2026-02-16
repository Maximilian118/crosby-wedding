import React from "react"
import './_navitem.scss'
import { useNavigate } from "react-router-dom"

interface NavItemInterface {
  item: {
    text: string,
    url: string,
    img: string,
    img2: string,
    imgColoured: string,
    underline: string,
    underlineColoured: string,
  }
}

const NavItem: React.FC<NavItemInterface> = ({ item }) => {
  const navigate = useNavigate()

  return (
    <div 
      className="nav-item" 
      style={{ paddingBottom: item.img ? 0 : 10 }} 
      onClick={() => navigate(item.url)}
    >
      {item.underline && <img className="nav-item-underline" src={item.underline} alt={item.text}/>}
      {item.img ?
        <div className="nav-item-img-container">
          <img className="logo-flowers" src={item.img} alt={item.text}/>
          <img src={item.img2} alt={item.text}/>
        </div> : <h2>{item.text}</h2>
      }
    </div>
  )
}

export default NavItem
