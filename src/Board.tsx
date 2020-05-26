import React, {Component} from 'react';
import Cell from './Cell';
import './Board.css';
import is_solvable from './Utils';

interface IBoardProps {
	nrows: number,
	ncols: number,
	chanceLightStartsOn: number
}

interface IBoardState {
	board: Array<Array<boolean>>,
	hasWon: boolean
}

class Board extends Component<IBoardProps, IBoardState> {
	static defaultProps : IBoardProps = {
		nrows: 5,
		ncols: 5,
		chanceLightStartsOn: 0.25
	}

	constructor(props : any) {
		super(props);
		let game_board : Array<Array<boolean>> = this.createBoard();

		// My solvable function only works if the board is 5 x 5.  If the board is 5 x 5
		// then the board is validated before being used.
		while(this.props.nrows === 5 && this.props.ncols === 5 && !is_solvable(game_board)) {
			game_board = this.createBoard();
		}

		this.state = {
			board: game_board,
			hasWon: false
		}
	}

	createBoard() : Array<Array<boolean>> {

		const board : Array<Array<boolean>> = [];
		const { chanceLightStartsOn, ncols, nrows } = this.props;

		for(let i = 0; i < nrows; ++i) {
			let row : Array<boolean> = [];
			for(let j = 0; j < ncols; ++j) {
				row.push(Math.random() < chanceLightStartsOn);
			}
			board.push(row);
		}

		return board;
	}

	flipCellsAround(coord : string) : void {
		const {ncols, nrows} = this.props;
		const board = this.state.board;
		const [y, x] = coord.split('-').map(Number);

		function flipCell(y: number, x : number) : void {
			if(x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x] = !board[y][x];
			}
		}

		flipCell(y, x);
		flipCell(y-1, x);
		flipCell(y+1, x);
		flipCell(y, x-1);
		flipCell(y, x+1);

		const hasWon : boolean = board.every(row => row.every(cell => !cell));
		this.setState({board, hasWon});
	}

	render() : JSX.Element { 
		if(this.state.hasWon)
			return <h1> You Won! </h1>;

		const tableBoard : Array<JSX.Element> = [];
		for(let row = 0; row < this.props.nrows; ++row) {
			let current_row : Array<JSX.Element> = [];
			for(let col = 0; col < this.props.ncols; ++col) {
				current_row.push(<Cell
					key={`${row}-${col}`}
					isLit={this.state.board[row][col]}
					flipCellsAroundMe={() => this.flipCellsAround(`${row}-${col}`)}
					/>);
			}
			tableBoard.push(<tr key={row}>{current_row}</tr>);
		}

		return (
			<table className='Board'>
				<tbody>
					{tableBoard}
				</tbody>
			</table>
		);
	}
}

export default Board;