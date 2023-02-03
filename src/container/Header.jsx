import React from 'react'
// import { Button } from 'stories/Button'
import monkeyLogo from "../assets/monkeyLogo.svg"
import VibezterLogo from "../assets/VibezterLogo.svg"

const Header = () => {
  return (
    <Header>
    <div className="wrapper">
      <div>
       
        <img src={monkeyLogo} alt="monkeyLogo"/>
        <img src={VibezterLogo} alt="VibezterLogo"/>
        
      </div>
      <div>
       
          {/* <>
            <Button size="small"  label="Log in" />
            
          </> */}
      </div>
    </div>
    </Header>
  )
}

export default Header