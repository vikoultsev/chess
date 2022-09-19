
interface Position {
	x: number;
	y: number;
}

type Board = (Position | null)[][]
type Path = Position[]

const getAvailableNextPositions = (boardSize: number, currentPosition: Position): Position[] => {
	const { x, y } = currentPosition;
	const availableNextPositions: Position[] = [{
		x: x + 1,
		y: y + 2,
	}, {
		x: x + 2,
		y: y + 1,
	}, {
		x: x - 1,
		y: y + 2,
	}, {
		x: x - 2,
		y: y + 1,
	}, {
		x: x - 1,
		y: y - 2,
	}, {
		x: x - 2,
		y: y - 1,
	}, {
		x: x + 1,
		y: y - 2,
	}, {
		x: x + 2,
		y: y - 1,
	}];
	return availableNextPositions.filter(({ x, y }: Position) => x < boardSize && y < boardSize && x >= 0 && y >= 0);
}


const hasPath = (initialPosition: Position, boardSize: number): boolean => {
	const iter = (board: Board, path: Path): boolean => {
		if (board.length * board.length === path.length) {
			return true;
		}

		const availableNextPositions = getAvailableNextPositions(board.length, path[path.length - 1]);
		for (const position of availableNextPositions) {
			const { x, y } = position;
			if (!board[y][x]) {
				board[y][x] = position;
				path.push(position);
				if (iter(board, path)) {
					return true;
				}
				board[y][x] = null;
				path.pop();
			}
		}
		return false;
	}
	const board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
	const path = [initialPosition];
	const { x, y } = initialPosition;
	board[y][x] = initialPosition;
	return iter(board, path);
}

export default hasPath;
