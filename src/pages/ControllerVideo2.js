import React, { useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
}));

const ContainerBox = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 10px;
`;
/*<div className={classes.root}>
            <Paper elevation={3} />
        </div>*/

const Box = styled(Paper)`
    width: 160px;
    height: 160px;
    display: grid;
    grid-template-rows: 110px 4px auto;
`;

const Line = styled.div`
    width: 100%;
    height: 4px;
    background-color: #424242;
`;
const Footer = styled.div`
    width: 100%;
    display: flex;
    padding: 6px;
`;

Footer.Info = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 50% 50%;
    padding: 0 8px;

    p {
        margin: 0;
        padding: 0;
        font-size: 13px;
    }
`;

const ContainerButton = styled.div`
    width: min-content;
    height: min-content;
    cursor: pointer;
    outline: none;
`;

const PlayButton = ({ play=true, onClick=null }) => {
    return (
        <ContainerButton onClick={onClick}>
            {play ? 
                <PauseCircleOutlineIcon 
                    style={{ fontSize: 32 }}
                /> 
            : 
                <PlayCircleOutlineIcon 
                    style={{ fontSize: 32 }}
                />
            }
        </ContainerButton>
    );
}

const ControllerVideo = () => {
    const [play, setPlay] = useState(false);
    
    return (
        <Box elevation={3}>
            <div>oi</div>
            <Line />
            <Footer>
                <PlayButton play={play} onClick={() => setPlay(!play)} />
                <Footer.Info>
                    <p>Aula X</p>
                    <p>00:27</p>
                </Footer.Info>
            </Footer>
        </Box>
    );
}

export default ControllerVideo;