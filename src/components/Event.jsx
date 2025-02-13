import React from 'react'

function Event({ title, date, permission, tag, body }) {
  
  return (
    <div className={`relative bg-transparent py-10 px-14 md:px-8 mx-auto transition-all hover:bg-white hover:bg-opacity-[4%]`}>

      <div className="relative z-10">
        <h1 className="text-white text-2xl font-semibold">{title}</h1>
        <p className="text-gray-400 text-sm mt-1">{date}</p>

        <div className="flex gap-2 mt-3">
          {tag === "tech_talk" && <div className={`font-medium text-xs px-2.5 py-[3px] rounded-full bg-opacity-20 bg-[#ff00bf] text-primary`}>TECH TALK</div>}
          {tag === "workshop" && <div className={`font-medium text-xs px-2.5 py-[3px] rounded-full bg-opacity-20 bg-[#00c4ff] text-secondary`}>WORKSHOP</div>}
          {tag === "activity" && <div className={`font-medium text-xs px-2.5 py-[3px] rounded-full bg-opacity-20 bg-[#FF8C00] text-tertiary`}>ACTIVITY</div>}
          {permission === "private" && <div className="font-medium text-xs text-gray-300 bg-gray-300 bg-opacity-20 px-2.5 py-[3px] rounded-full">PRIVATE</div>}
          {permission === "public" && <div className="font-medium text-xs text-gray-300 bg-gray-300 bg-opacity-15 px-2.5 py-[3px] rounded-full">PUBLIC</div>}
        </div>

        <p className="text-gray-300 text-sm mt-3">
          {body}
        </p>
      </div>
    </div>
  )
}

export default Event