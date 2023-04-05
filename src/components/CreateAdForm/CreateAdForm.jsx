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

const schema = yup.object({
  title: yup.string().required(),
  summary: yup.string().required(),
  details: yup.string().required(),
}).required();

export default function CreateAdForm() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const { createAd } = useAPI();

  const theme = createTheme();
  const onSubmit = async (fields) => {
    delete fields.file;
    const { data } = await createAd(fields);
    navigate('/ads');
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('summary')}
                  placeholder='Summary'
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('details')}
                  placeholder='Details'
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="file" style={{color: 'gray'}}>Upload picture:</label>
                <input type='file' {...register('file')} style={{color: 'gray', padding: '0 8px'}}/>  
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