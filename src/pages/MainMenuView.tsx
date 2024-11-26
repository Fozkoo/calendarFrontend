
import "..//styles/MainMenu.css"

export const MainMenuView = () => {
  return (
    <body>
      <div className='menu-container'>
        <button className='menu-button'>New Event</button>
        <button className='menu-button'>Delete Event</button>
        <button className='menu-button'>Change Event</button>
      </div>
    </body>
  )
}