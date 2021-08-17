import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import ControllerVideo from './ControllerVideo';

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1vw;
`;

Container.Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: lightgray;
    border-radius: 6px;
`;

Container.Footer = styled.div`
    display: flex;
    background-color: lightgray;
    border-radius: 6px;
    gap: .6vw;
    padding: .6vw;
`;

const Button = styled.button`
    width: 100px;
    height: 100px;
    background-color: orange;
    cursor: pointer;
    outline: none;
    text-decoration: none;
    border: none;
`; 

const ClassContainer = styled.div`
    width: 100px;
    padding: 10px;
    background-color: teal;
    text-align: center;
`;

const ContainerMediaButton = styled.div`
    display: flex;
    cursor: pointer;
`;

const MediaButton = ({ children, play=true, onClick=null }) => {
    return (
        <ContainerMediaButton onClick={onClick}>
            {play ? <PlayArrowIcon color='primary' style={{ fontSize: 40 }} /> : <StopIcon color='secondary' style={{ fontSize: 40 }} />}
            {children}
        </ContainerMediaButton>
    );
}

const Controller = () => {
    const [loading, setLoading] = useState(true); // carregamento dos dados do localStorage sobre a aula
    const [loadingContent, setLoadingContent] = useState(true); // carregamento da aula
    

    const { room_id } = useParams();
    const aulas = [
        {name: 'Nome da Aula', total_time: '60'},
        {name: 'Aula 02', total_time: '70'},
        {name: 'Aula 03', total_time: '220'}
    ];

    const [play, setPlay] = useState([]);
    const [playString, setPlayString] = useState(''); // o array "play" como string para passar como dependência para o useEffect

    useEffect(() => {
        // carrega o estado dos vídeos pelo localStorage
        let arr = [];
        
        for (let class_id = 0; class_id < aulas.length; class_id++)
            arr.push(localStorage.getItem(`${room_id}_${class_id}_play`) === 'true');

        setPlay(arr);
        setPlayString(JSON.stringify(play));

        setLoading(true);

        console.log(arr);
    }, []);

    useEffect(() => {
        // o evento só é disparado se a alteração for feita em outra guia
        window.addEventListener('storage', () => {
            let tmp = play;

            for (let class_id = 0; class_id < aulas.length; class_id++)
                tmp[class_id] = localStorage.getItem(`${room_id}_${class_id}_play`) === '0';

            setPlay(tmp);
            setPlayString(JSON.stringify(tmp));
        });
    }, []);

    const handlePlayAll = (status) => {
        // true = playAll, false = pauseAll
        let tmp = play;

        for (let class_id = 0; class_id < aulas.length; class_id++) {
            localStorage.setItem(`${room_id}_${class_id}_play`, status);
            play[class_id] = status;
        }

        setPlay(tmp);
        setPlayString(JSON.stringify(tmp));
    }

    const handlePlay = (class_id) => {
        let tmp = play;

        tmp[class_id] = !tmp[class_id];

        setPlay(tmp);
        setPlayString(JSON.stringify(tmp));

        localStorage.setItem(`${room_id}_${class_id}_play`, tmp[class_id]);
    }

    return (
        <Container>
            <Container.Content>
                {aulas.map((aula, index) => 
                    <ControllerVideo
                        aula={aula}
                        class_id={index}
                        play={play[index]}
                        handlePlay={() => handlePlay(index)}
                        loading={loading && loadingContent}
                    />)
                }
                {/*<ControllerVideo />
                <ControllerVideo loading={false} />
                <ControllerVideo loading={false} />
                <ControllerVideo  />
                <ControllerVideo loading={false} />
                <ControllerVideo loading={false} />
                <ControllerVideo  />
                <ControllerVideo loading={false} />*/}
            </Container.Content>
            
            <Container.Footer>
                <MediaButton play onClick={() => handlePlayAll(true)} />
                <MediaButton play={false} onClick={() => handlePlayAll(false)} />
            </Container.Footer>
        </Container>
    );

    return (
        <Container>
            <div style={{ display: 'flex', gap: 15 }}>
                <Button onClick={() => handlePlayAll(true)}>
                    Play em todos
                </Button>
                <Button onClick={() => handlePlayAll(false)}>
                    Pause em todos
                </Button>
            </div>

            <div style={{ display: 'flex', gap: 15 }}>
                {aulas.map((aula, index) => (
                    <ClassContainer key={index}>
                        <Button onClick={() => handlePlay(index)}>
                            {play[index] ? 'Pause' : 'Play'}
                        </Button>
                        <p>{aula.name}</p>
                    </ClassContainer>
                ))}
            </div>
        </Container>
    );
}

export default Controller;