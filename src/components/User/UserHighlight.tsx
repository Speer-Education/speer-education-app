export default function UserHighlight({highlight}){
    if(!highlight)return <></>;

    return (
        <div className="flex flex-row space-x-2 items-center">
            <div className="w-12 h-12 p-3 text-center text-2xl bg-white rounded-xl flex justify-center items-center shadow-md">{highlight?.emoji}</div>
            <span className="text-sm text-gray-500">{highlight?.description}</span>
        </div>
    )
}