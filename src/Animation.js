import { useRef, useEffect } from 'react';

const Canvas = () => {
	const canvasRef = useRef(null);

	const draw = (ctx, frameCount) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = 'blue';
		ctx.beginPath();
		ctx.arc(270, 50, 30 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
		ctx.fill();
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		let frameCount = 0;
		let animationFrameId;

		const render = () => {
			frameCount++;
			draw(context, frameCount);
			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return <canvas style={{ width: '900px' }} ref={canvasRef} />;
};
export default Canvas;
