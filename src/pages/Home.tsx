import { useEffect, useState } from "react";
import servicesAPI from "../service/Helper";

interface BlockData {
    monthName: string;
    dayValue: string;
    numberValue: number;
    yearValue: number;
    eventTitle: string;
    eventDatetime: string;
    attachmentUrl: string | null;
}

function Home() {
    const [blocks, setBlocks] = useState<BlockData[]>([]);

    useEffect(() => {
        const fetchBlocks = async () => {
            const data = await servicesAPI.getBlocks();
            setBlocks(data);
        };

        fetchBlocks();
    }, []);

    return (
        <div className='bg-gray-200 flex justify-center items-center h-[100vh]'>
            <div className="container-bloks flex justify-center items-center flex-wrap bg-red-300 w-[70%] h-[90%]">
                {blocks.map((block, index) => (
                    <div
                        key={index}
                        className="bg-blue-500 h-[120px] w-[120px] m-2 flex flex-col justify-center items-center text-white"
                    >
                        <p>{block.numberValue}</p>
                        <p>{block.dayValue}</p>
                        <p>{block.eventTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
