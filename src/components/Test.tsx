import React from 'react'

const Test = () => {
    return (
        <>
            <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800 max-2xl:w-[75%]  max-2xl:px-4">
                <p className="text-white text-2xl max-2xl:text-base">Description</p>
                <input
                    type="file"
                    placeholder="Attachment"
                    className="w-40 h-10 border-none rounded-md px-2 max-2xl:w-32"
                    required
                />
            </div>
        </>
    )
}

export default Test