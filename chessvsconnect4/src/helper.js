export const getCharacter=file=>String.fromCharCode(file+96)

export const createPosition=()=>{
    const position=new Array(8).fill('').map(x=>new Array(8).fill(''))
    
    position[0][0]='bn'
    position[0][1]='bn'
    position[0][2]='bb'
    position[0][3]='bq'
    position[0][4]='bk'
    position[0][5]='bb'
    position[0][6]='bn'
    position[0][7]='bn'
    position[1][0]='bp'
    position[1][1]='bp'
    position[1][2]='bp'
    position[1][3]='br'
    position[1][4]='br'
    position[1][5]='bp'
    position[1][6]='bp'
    position[1][7]='bp'

    return position
}

export const copyPosition=position=>{
    const newPosition=new Array(8).fill('').map(x=>new Array(8).fill(''))

    for(let rank=0;rank<8;rank++){
        for (let file = 0; file < 8; file++) {
            newPosition[rank][file] = position[rank][file];
            
        }
    }
    return newPosition
}