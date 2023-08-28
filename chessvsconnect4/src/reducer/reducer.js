import actionTypes from "./actionTypes"
export const reducer=(state,action)=>{
    switch(action.type){
        case actionTypes.NEW_MOVE:{
            
            
            let {turn,movesList,position} =state
           

            
            turn = turn==='b'?'c':'b'
            
            
            
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