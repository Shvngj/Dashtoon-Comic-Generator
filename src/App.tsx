import {Alert, type SelectChangeEvent} from '@mui/material';
import React, {useEffect, useState} from 'react';
import './App.css';
import ComicBoard from './components/ComicBoard';
import ComicTextInput from './components/ComicTextInput';
import {useSnackbar} from 'notistack';

type ComicInput = {
	inputs: string;
};

function App() {
	const [text, setText] = useState('');
	const [panel, setPanel] = useState('0');
	const [loading, setLoading] = useState(false);
	const {enqueueSnackbar} = useSnackbar();

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value);
	};

	const [comicImages, setComicImages] = React.useState(['']);

	async function query(data: ComicInput) {
		enqueueSnackbar('Hang on! Generating image from your input....it takes a bit of time!', {variant: 'success', autoHideDuration: 5000});
		setLoading(true);
		const response = await fetch(
			'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud',
			{
				headers: {
					Accept: 'image/png',
					Authorization: 'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(data),
			},
		);
		const result = await response.blob();
		return result;
	}

	const handleGetComicImage = () => {
		if (text === '') {
			enqueueSnackbar('No input is given. Could not generate any image!', {autoHideDuration: 5000});
			return;
		}

		query({inputs: text})
			.then(response => {
				const imageUrl = URL.createObjectURL(response);
				const newComicImages = [...comicImages];
				const panelIndex = Number(panel);
				newComicImages[panelIndex] = imageUrl;
				setComicImages(newComicImages);
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				enqueueSnackbar('Error encountered. Unable to generate image. Try again!', {variant: 'error', autoHideDuration: 5000});
			});
	};

	const handlePanelChange = (event: SelectChangeEvent) => {
		setPanel(event.target.value);
	};

	useEffect(() => {
		const comicImageData = Array(10).fill('');
		setComicImages(comicImageData);
	}, []);

	return (
		<div className='App'>
			<section className='App-section'>
				<ComicTextInput
					handleTextChange={handleTextChange}
					handleGetComicImage={handleGetComicImage}
					handlePanelChange={handlePanelChange}
					panel={panel}
					text={text}
					loading={loading}
				/>
				<ComicBoard comicImages={comicImages} />
			</section>
		</div>
	);
}

export default App;
