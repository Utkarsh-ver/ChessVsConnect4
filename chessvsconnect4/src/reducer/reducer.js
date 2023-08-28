import actionTypes from "./actionTypes"
// import ActiveMarble from '../components/Board/ActiveCoin'
export const reducer=(state,action)=>{
    switch(action.type){
        case actionTypes.NEW_MOVE:{
            
            
            let {turn,movesList,position} =state
            // let { turn, newPosition } = action.payload;

            
            turn = turn==='b'?'c':'b'
            // let newTurn = turn === 'w' ? 'b' : 'w';
            
            
            position=[
                ...position,
                action.payload.newPosition
            ]
            movesList = [
                ...movesList,
                action.payload.newMove
            ]
            return{
                ...state,
                turn,
                movesList,
                position
            }
            // return {
            //     ...state,
            //     turn: newTurn,
            //     position: [...state.position, newPosition]
            //   };
        }
        
        case actionTypes.GENERATE_CANDIDATE_MOVES:{
            return{
                ...state,
                candidateMoves:action.payload.candidateMoves
            }


        }
        case actionTypes.CLEAR_CANDIDATE_MOVES:{
            return{
                ...state,
                candidateMoves:[]
            }

            
        }
        case actionTypes.TAKE_BACK : {
            let {position,movesList,turn} = state 
            if (position.length > 1){
                position = position.slice(0,position.length-1)
                movesList = movesList.slice(0,movesList.length-1)
                turn = turn === 'b' ? 'c' : 'b'
            }

            return {
                ...state,
                position,
                movesList,
                turn,
            }
        }

        default:
            return state
    }

    
}