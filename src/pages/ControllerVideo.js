import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';

import LinearProgress from '@material-ui/core/LinearProgress';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const CardContentContainer = styled.div`
    width: 100%;
`;

const ContainerButton = styled.div`
    width: min-content;
    height: min-content;
    cursor: pointer;
    outline: none;
`;

const CardBanner = styled.div`
    width: 100%;
    background-color: ${props => props.play ? '#3f50b5' : '#f50057'};
    font-family: 'Roboto';
    font-weight: bold;
    color: black;
`;

const PlayButton = ({ play=true, onClick=null }) => {
    return (
        <ContainerButton onClick={onClick}>
            {play ? 
                <PauseCircleOutlineIcon 
                    style={{ fontSize: 45 }}
                    color='primary'
                /> 
            : 
                <PlayCircleOutlineIcon 
                    style={{ fontSize: 45 }}
                    color='secondary'
                />
            }
        </ContainerButton>
    );
}

const useStyles = makeStyles((theme) => ({
    card: {
        width: 180,
        margin: theme.spacing(2),
    },
    media: {
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    root: {
        width: '100%',
      },
}));

const ContainerInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 6px;
    font-size: 14px;

    p {
        margin: 0;
        padding: 0;
    }
`;

function Media(props) {
    const [progress, setProgress] = useState(80);
  const { loading = false } = props;
  const classes = useStyles();
  const [play, setPlay] = useState(false);

  return (
    <Card className={classes.card}>
        {loading ? (
            <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
            <CardBanner className={classes.media} play={play}>
                <p>1</p>
            </CardBanner>
        )}

      <CardContent>
        {loading ? (
          <CardContentContainer>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </CardContentContainer>
        ) : (
          <CardContentContainer>
                <div style={{ display: 'flex' }}>
                    <PlayButton play={play} onClick={() => setPlay(!play)} />
                    <ContainerInfo>
                        <p><b>Nome da Aula</b></p>
                        <p>00:21</p>
                    </ContainerInfo>
                </div>

                <div className={classes.root}>
                    <LinearProgress variant="determinate" value={progress} color={play ? 'primary' : 'secondary'} />
                </div>
          </CardContentContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default function Facebook() {
  return (
    <div>
      <Media loading />
      <Media />
    </div>
  );
}
