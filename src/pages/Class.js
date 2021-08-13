import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import example_video from '../assets/example_video.mp4';

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Aula = () => {
    const { room_id } = useParams();
    
    const class_id = useQuery().get('class_id'); // passar como state ou na rota tb

    const [play, setPlay] = useState(false);
    const myRef = useRef(null);

    const handlePlay = () => {
        setPlay(!play);
        localStorage.setItem(`${room_id}_${class_id}_play`, play);
    }

    useEffect(() => {
        window.addEventListener('storage', () => {
            setPlay(localStorage.getItem(`${room_id}_${class_id}_play`) === 'true');
        });
    }, []);

    useEffect(() => {
        if (play)
            myRef.current.play();
        else
            myRef.current.pause();
    }, [play]);

    return (
        <Container>
            <p>id: {class_id}</p>
            <p onClick={() => handlePlay()}>status: {play ? 'Rodando...' : 'Pausado'}</p>

            <Video
                controls={false}
                muted
                ref={myRef}
            >
                <source src={example_video} type='video/mp4' />
                Seu browser não suporta a exibição de vídeo.
            </Video>
        </Container>
    );
}

export default Aula;