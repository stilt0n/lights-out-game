const _ = require('lodash');

const dot = (x : Array<number>, y : Array<number>) : number => {
	return _.zip(x,y).reduce((acc : number, [a,b] : [number, number]) => acc += a * b, 0);
}

/* If a board has a solution, the flattened version of the board will be orthogonal to N1 and N2 
https://en.wikipedia.org/wiki/Lights_Out_(game)#Mathematics */
const N1 : Array<number> = [0,1,1,1,0,
							1,0,1,0,1,
							1,1,0,1,1,
							1,0,1,0,1,
							0,1,1,1,0];

const N2 : Array<number> = [1,0,1,0,1,
							1,0,1,0,1,
							0,0,0,0,0,
							1,0,1,0,1,
							1,0,1,0,1];

const is_solvable = (board : Array<Array<boolean>>) : boolean => {
	const board_vector : Array<number> = _.flatten(board).map((bool : boolean) => bool ? 1 : 0);
	return dot(N1, board_vector) === 0 && dot(N2, board_vector) === 0;
}

export default is_solvable;