import "..//styles/index.css";

function AddEventComponent() {
  return (
    <>
      <div className="container-addEventComponent flex justify-center items-center w-full h-[100vh]">
        <div className="container-form flex justify-center items-center bg-white rounded-xl w-[600px] h-[500px] shadow-lg">
          <form className="bg-[#EDEDED] flex gap-5 h-[350px] w-[90%] flex-col justify-center items-center rounded-xl p-5">
            <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
              <p className="text-white text-2xl">Hora</p>
              <input
                type="time"
                placeholder="Name event"
                className="w-50 h-10 border-none rounded-md px-2"
              />
            </div>
            <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
              <p className="text-white text-2xl">Date</p>
              <input
                type="date"
                placeholder="Name event"
                className="w-50 h-10 border-none rounded-md px-2"
              />
            </div>
            <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
              <p className="text-white text-2xl">Name event</p>
              <input
                type="text"
                placeholder="Name event"
                className="w-40 h-10 border-none rounded-md px-2"
              />
            </div>
            <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
              <p className="text-white text-2xl">Attachment</p>
              <div className="relative w-40">
                <input
                  type="file"
                  id="fileInput"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="w-full h-10 bg-blue-500 text-white rounded-md px-4 flex items-center justify-center hover:bg-blue-600"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  Subir Archivo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEventComponent;
