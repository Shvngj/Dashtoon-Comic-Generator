import {Grid, TextField} from '@mui/material';
import React, {useState} from 'react';
import ComicPanel from './ComicPanel';

type ComicBoardType = {
	comicImages: string[];
};
const ComicBoard = ({comicImages}: ComicBoardType) => (
	<article className='comicBoard'>
		{comicImages.map((comicImage, index) => (
			<ComicPanel key={index} comicImage={comicImage}/>
		))}
	</article>);

export default ComicBoard;
