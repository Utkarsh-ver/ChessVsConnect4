import './Rank.css'

const Rank=({ranks})=>{
    return <div className="ranks">
        {ranks.map(rank=><span key={rank}>{rank}</span>)}
    </div>
}

export default Rank