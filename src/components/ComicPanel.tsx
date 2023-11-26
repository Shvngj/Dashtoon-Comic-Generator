import {Skeleton} from '@mui/material';
import React from 'react';

type ComicPanelType = {
	comicImage: string;
};

const ComicPanel = ({comicImage}: ComicPanelType) => (
	(comicImage === ''
		? (<div className='panel'>
			<Skeleton animation='wave' variant='rectangular' width={350} height={350} />
		</div>)
		: (
			<div className='panel' style={{backgroundImage: `url(${comicImage})`, backgroundSize: 'contain', width: 350, height: 350}}>
				<p contentEditable className='text top-left' spellCheck='false'/>
				<p contentEditable className='text bottom-right' spellCheck='false'/>
			</div>
		)
	)
);

export default ComicPanel;
