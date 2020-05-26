import * as React from 'react'
import './Cell.css'

interface CellStatelessProps {
	flipCellsAroundMe: () => void,
	isLit: boolean
}

// SFC stands for StatelessFunctionalComponent
const Cell: React.SFC<CellStatelessProps> = ({ flipCellsAroundMe, isLit }) => {
	
	const handleClick = (evt : any) : void => {
		flipCellsAroundMe();
	}

	let classes : string = 'Cell' + (isLit ? ' Cell-lit' : '');
	return (
		<td className={classes} onClick={handleClick} />
	);
}

export default Cell;