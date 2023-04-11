import * as React from 'react';
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DateTime} from 'luxon';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { useAPI } from '../../hooks/useAPI';


export default function AdCard({ ad }) {
  const { currentUser } = useAPI();
  const { id, title, summary, details, createdAt, userId } = ad;
  const { name } = currentUser || {};
  const myInitials = name?.charAt(0).toUpperCase() + name?.charAt(1).toUpperCase();

  const localizedCreatedAt = DateTime
    .fromISO(createdAt)
    .toLocaleString();

  const avatarType = currentUser?.id === userId ? myInitials : 'JD';

  return (
    <Card sx={{ width: '100%', height: '100%', margin: '16px', }} id={id}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'navy'}}>{avatarType}</Avatar>
        }
        action={
            <DropdownMenu userId={userId} adId={id}>
              <MoreVertIcon />  
            </DropdownMenu>
        }
        title={title}
        subheader={localizedCreatedAt}
      />
      <CardMedia
        component="img"
        height='300'
        image="/apartment1.jpg"
        alt="bedroom apartment"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {summary}
        </Typography>
        <ActionsWrapper>
          <DetailsWrapper>
            <Typography paragraph variant="body2" style={{marginBottom: '4px'}}>Property details:</Typography>
            <Typography paragraph variant="body2" style={{marginBottom: '4px'}}>{details}</Typography>
          </DetailsWrapper>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </ActionsWrapper>    
      </CardContent>
    </Card>
  );
}

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-width: 80%;
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;