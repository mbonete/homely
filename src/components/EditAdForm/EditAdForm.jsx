import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import Loader from '../Loader/Loader';

const schema = yup.object({
  title: yup.string().min(10).required(),
  summary: yup.string().min(10).required(),
  details: yup.string().min(10).required(),
}).required();

function EditAdForm() {


  const navigate = useNavigate();

  const { getAd, editAd } = useAPI();

  const { id } = useParams();

  const adQuery = useQuery(
    ['ad'], 
    async () => {
      const { data } = await getAd(id);
      return data;
    },
  );

  const getDefaultValues = () => ({
    title: adQuery.data?.title || '...',
    summary: adQuery.data?.summary || '...',
    details: adQuery.data?.details || '...',
  });

  const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues(),
  });

  React.useEffect(() => {
    reset(getDefaultValues());
  }, [adQuery.data]);

  const theme = createTheme();

  const onSubmit = async (fields) => {
    delete fields.file;
    const { data } = await editAd(id, fields);
    navigate(`/ads/${id}`);
  }

  return (
    <ThemeProvider theme={theme}>
      {adQuery.isLoading && <Loader/>}
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            <Title>
            <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
              <AddHomeOutlinedIcon  />
            </Avatar>
              Edit ad
            </Title>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  {...register('title')}
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


export default EditAdForm;