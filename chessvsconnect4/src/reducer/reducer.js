import actionTypes from "./actionTypes"
// import ActiveMarble from '../components/Board/ActiveCoin'
export const reducer=(state,action)=>{
    switch(action.type){
        case actionTypes.NEW_MOVE:{
            
            
            let {turn,position} =state
            // let { turn, newPosition } = action.payload;

            
            turn = turn==='b'?'c':'b'
            // let newTurn = turn === 'w' ? 'b' : 'w';
            
            
            position=[
                ...position,
                action.payload.newPosition
            ]
            
            return{
                ...state,
                turn,
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

        default:
            return state
    }

    
}