import {FormControl, InputLabel, Select, MenuItem, Button, type SelectChangeEvent, Stack, Box, TextField, Grid, CircularProgress} from '@mui/material';
import React from 'react';

type ComicTextInputType = {
	handleGetComicImage: () => void;
	handlePanelChange: (event: SelectChangeEvent) => void;
	handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	text: string;
	panel: string;
	loading: boolean;
};

const ComicTextInput = ({handleGetComicImage, handlePanelChange, handleTextChange, text, panel, loading}: ComicTextInputType) => (
	<div className='comicTextInput'>
		<img src='./title.svg' alt='logo' style={{width: 'auto', height: '200px'}}/>
		<Stack spacing={2} direction='row' justifyContent={'center'} alignItems={'center'}>
			<Grid container spacing={{xs: 2, sm: 0}}>
				<Grid item xs={12} sm={8}>
					<Stack spacing={2} direction='row' justifyContent={'center'} alignItems={'center'}>
						<FormControl>
							<Select
								labelId='panel-select-label'
								id='panel-select'
								value={panel}
								variant='outlined'
								onChange={handlePanelChange}
								style={{
									width: '70px',
									backgroundColor: 'white',
									border: '3px solid black',
									height: '50px',
									borderRadius: '0px',
								}}
							>
								{Array.from(Array(10).keys()).map(index => (
									<MenuItem value={index} key={index}>{index + 1}</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							id='standard-basic'
							variant='outlined'
							value={text}
							onChange={handleTextChange}
							placeholder='Write text for the comic strip'
							style={{
								backgroundColor: 'white',
							}}
							InputProps={{
								style: {
									height: '50px',
									border: '3px solid black',
									borderRadius: '0px',
								},
							}}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Button
						disabled={loading}
						variant='contained'
						onClick={handleGetComicImage}
						style={{
							backgroundColor: '#FFC000',
							color: '#000',
							fontFamily: 'Comic Neue',
							textTransform: 'none',
							fontSize: '16px',
							fontWeight: '1000',
							width: '200px',
							height: '50px',
							border: '3px solid black',
							borderRadius: '0px',
						}}
					>
						{loading ? <CircularProgress color='inherit' style={{height: '30px', width: '30px'}}/> : <>Get Comic Image</>}
					</Button>
				</Grid>
			</Grid>
		</Stack>
	</div>
);

export default ComicTextInput;
