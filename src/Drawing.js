import { useEffect, useRef, useState } from 'react';

export default function Drawing() {
	const [drawing, setDrawing] = useState(false);
	const canvasRef = useRef(null);
	// Storing the context in a ref so we can use it
	// later to draw on the canvas
	const ctxRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;

		// For supporting computers with higher screen densities, we double the screen density
		canvas.width = window.innerWidth * 2;
		canvas.height = window.innerHeight * 2;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		// Setting the context to enable us draw
		const ctx = canvas.getContext('2d');
		ctx.scale(2, 2);
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 20;
		ctxRef.current = ctx;
	}, []);

	const startDraw = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		ctxRef.current.beginPath();
		ctxRef.current.moveTo(offsetX, offsetY);
		setDrawing(true);
	};
	const stopDraw = () => {
		ctxRef.current.closePath();
		setDrawing(false);
	};

	const clear = () => {
		ctxRef.current.clearRect(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height
		);
	};

	const draw = ({ nativeEvent }) => {
		if (!drawing) return;
		const { offsetX, offsetY } = nativeEvent;
		ctxRef.current.lineTo(offsetX, offsetY);
		ctxRef.current.stroke();
	};

	return (
		<>
			<canvas
				onMouseDown={startDraw}
				onMouseUp={stopDraw}
				onMouseMove={draw}
				ref={canvasRef}
			/>
			<button style={{ padding: '5px', fontSize: '1rem' }} onClick={clear}>
				Click to clean Canvas
			</button>
		</>
	);
}
