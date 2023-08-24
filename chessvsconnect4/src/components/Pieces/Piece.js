import { useAppContext } from "../../context/Context"
import arbiter from "../../arbiter/arbiter"
import { generateCandidateMoves } from "../../reducer/actions/move"
const Piece=({
    rank,
    file,
    piece,
})=>{
    
    const {appState,dispatch}=useAppContext()
    const {turn,position}=appState
    const currentPosition=position[position.length-1]

    

    const onDragStart=e=>{
        e.dataTransfer.effectAllowed='move'
        e.dataTransfer.setData('text/plain',`${piece},${rank},${file}`)
        setTimeout(()=>{
        e.target.style.display='none'
        },0)
        // if(turn===piece[0]){
            const candidateMoves=arbiter.getRegularMoves({position:currentPosition,piece,rank,file})
            dispatch(generateCandidateMoves({candidateMoves}))
        //  }
    }


    const onDragEnd=e=>e.target.style.display=''

    return (<div className={`piece ${piece} p-${rank}${file}`}
    draggable={true}
    onDragEnd={onDragEnd}
    onDragStart={onDragStart}/>
    )
}

export default Piece