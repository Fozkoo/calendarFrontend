

function AddEventComponent() {



  return (
      <div className="absolute  bg-white w-full h-f max-w-sm bg-red rounded-3xl shadow-xl p-8">
        <form  className="space-y-6">
        <div className="relative">
            <input
              type="date"
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
              required
            />
            <label className="absolute left-4 -top-2.5 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text text-sm font-medium px-1">
              Date
            </label>
          </div>

          <div className="relative">
            <input
              type="time"
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
              required
            />
            <label className="absolute left-4 -top-2.5 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text text-sm font-medium px-1">
              Hora
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
              required
            />
            <label className="absolute left-4 -top-2.5 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text text-sm font-medium px-1">
              Nombre
            </label>
          </div>

          <div className="relative">
            <label 
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 text-white cursor-pointer hover:opacity-90 transition-opacity"
            >
            
              <span>Adjunto</span>
              <input
                type="file"
                className="hidden"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Save
          </button>
        </form>
      </div>
  );
}

export default AddEventComponent;