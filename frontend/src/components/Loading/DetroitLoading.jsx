import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const DetroitLoadingContainer = styled.div`
	position: relative;
	width: 100vw;
	height: 100vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	font-family: 'Roboto Mono', monospace;
	color: #333333;
`;

const LoadingCircleWrapper = styled.div`
	position: relative;
	width: 100px;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
`;

const LoadingCircle = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CircleSegment = styled.div`
	position: absolute;
	width: 5px;
	height: 15px;
	background-color:rgb(196, 196, 196);
	border-radius: 5px
	top: 0;
	left: 50%;
	margin-left: calc(5px / -2);
	transform-origin: 50% calc(40px + 15px / 2);
	transform: rotate(${props => props.$rotationAngle}deg);
	transition: background-color 0.3s ease;

	${props => props.$active && css`
		background-color:rgb(53, 54, 54);
	`}
`;

const DetroitLoading = ({ progress = 0 }) => {
	const numSegments = 20;
	const [currentProgress, setCurrentProgress] = useState(0);

	useEffect(() => {
		let interval;
		if (progress > 0 && progress <= 100) {
			setCurrentProgress(progress);
		} else {
			interval = setInterval(() => {
				setCurrentProgress(prev => {
					if (prev >= 100) return 0;
					return Math.min(prev + 5, 100);
				});
			}, 200);
		}
		return () => clearInterval(interval);
	}, [progress]);

	const activeSegments = Math.ceil((currentProgress / 100) * numSegments);

	return (
		<>
			<DetroitLoadingContainer>
				<LoadingCircleWrapper>
					<LoadingCircle>
						{Array.from({ length: numSegments }).map((_, index) => (
							<CircleSegment
								key={index}
								$active={index < activeSegments}
								$rotationAngle={index * (360 / numSegments)}
							/>
						))}
					</LoadingCircle>
				</LoadingCircleWrapper>
			</DetroitLoadingContainer>
		</>
	);
};

export default DetroitLoading;