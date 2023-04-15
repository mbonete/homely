import * as React from 'react';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import styled from 'styled-components';
import { useAPI } from '../../hooks/useAPI';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const schema = yup.object({
  title: yup.string().min(10).required(),
  summary: yup.string().min(10).required(),
  details: yup.string().min(10).required(),
}).required();

export default function CreateAdForm() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const { createAd } = useAPI();

  const theme = createTheme();
  const onSubmit = async (formValues) => {
    const fields = new FormData();

    /*
      We have two kinds of fields in formValues:
      - Normal fields
      - A FileList field

      The FileList field can not be added to the FormData
      as the others, so we need to extract it, append the
      others and finally, the FileList contents
    */
    
    // Store the images content to use it later
    const images = formValues.images || [];
    console.log('debug', 'images', images)
    // ...and remove it from the general form values
    delete formValues.images;
    // Store the normal values inside the FormData
    Object.keys(formValues).forEach((key) => fields.append(key, formValues[key]));

    // Now we process the images
    for (const image of images) {
      fields.append('images', image);
    }

    /*
    for (let i=0; i < images.length; i++) {
      fields.append('images', images[i]);
    }
    */

    const { data } = await createAd(fields);
    console.log(data);
    navigate(`/ads/${data?.id}`);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            <Title>
            <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
              <AddHomeOutlinedIcon  />
            </Avatar>
              List property
            </Title>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  {...register('title')}
                  placeholder='Title'
                  fullWidth
                  variant="standard"
                />
                {errors?.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('summary')}
                  placeholder='Summary'
                  fullWidth
                  multiline
                  rows={2}
                />
                {errors?.summary && <ErrorMessage>{errors.summary.message}</ErrorMessage>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('details')}
                  placeholder='Details'
                  fullWidth
                  multiline
                  rows={4}
                />
                {errors?.details && <ErrorMessage>{errors.details.message}</ErrorMessage>}
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="images" style={{color: 'gray'}}>Upload picture:</label>
                <input type='file' {...register('images')} style={{color: 'gray', padding: '0 8px'}}/>  
              </Grid>
            </Grid>
           
            <Button  
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>Publish</Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  )
};

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  font-size: 1.5rem;
`;