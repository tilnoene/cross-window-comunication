import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ControllerVideo from './ControllerVideo';

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

const Controller = () => {
    const { room_id } = useParams();
    const aulas = [
        {name: 'Aula 01', total_time: '60'},
        {name: 'Aula 02', total_time: '70'},
        {name: 'Aula 03', total_time: '220'}
    ];

    const [play, setPlay] = useState([false, false, false]);
    
    useEffect(() => {
        // carrega
    }, []);

    useEffect(() => {
        window.addEventListener('storage', () => {
            let tmp = play;

            for (let class_id = 0; class_id < aulas.length; class_id++)
                tmp[class_id] = localStorage.getItem(`${room_id}_${class_id}_play`) === '0';

            setPlay(tmp);
        });
    }, []);

    const handlePlayAll = (status) => {
        for (let class_id = 0; class_id < aulas.length; class_id++) {
            localStorage.setItem(`${room_id}_${class_id}_play`, status);
        }
    }

    const handlePlay = (class_id) => {
        let tmp = play;
        tmp[class_id] = !tmp[class_id];
        //setPlay(tmp);
        //console.log(tmp);
        localStorage.setItem(`${room_id}_${class_id}_play`, tmp[class_id]);
    }

    return (
        <Container>
            <PlayArrowIcon>oi</PlayArrowIcon>
            <ControllerVideo />
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