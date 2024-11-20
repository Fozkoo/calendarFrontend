import "../styles/MainMenu.css"

interface MainMenuProps {
  showNewEvent: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ showNewEvent }) => {  
  return (
    <>
      <div className='menu-container'>
        <button className='menu-button' onClick={showNewEvent}>New Event</button>  
        <button className='menu-button'>Delete Event</button>
        <button className='menu-button'>Change Event</button>
      </div>
    </>
  )
}

export default MainMenu;
