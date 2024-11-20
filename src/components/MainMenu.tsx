import "../styles/MainMenu.css"



const MainMenu = () => {  
  return (
    <>
      <div className='menu-container'>
        <button className='menu-button'>New Event</button>  
        <button className='menu-button'>Delete Event</button>
        <button className='menu-button'>Change Event</button>
      </div>
    </>
  )
}

export default MainMenu;
