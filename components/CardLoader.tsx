export default function CardLoader({display}: {display: number}) {

  return (
    <div className="grid grid-cols-5 gap-7 animate-pulse">
        {display && [...Array(display)].map((v, i) => (
            <div key={i}>
                <div className="box-placeholder card-placeholder bg-slate-800 rounded mb-5 pt-20"></div>
                <div className="block text-placeholder bg-slate-700 rounded py-2 mb-3"></div>
                <div className="block text-placeholder bg-slate-700 rounded py-2 mb-3 w-4/5"></div>
                <div className="block text-placeholder bg-slate-700 rounded py-2 w-3/5"></div>
            </div>
        ))}
    </div>
  )
}
