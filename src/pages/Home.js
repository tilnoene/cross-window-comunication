import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// utils.js
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRoomID(length) {
    let room_id = '';

    for (let i = 0; i < length; i++)
        room_id += getRandomInt(0, 10);

    return room_id;
}

const Home = () => {
    const generateRoom = () => {
        const room_id = getRoomID(5);
        const aulas = [
            {name: 'Aula 01', total_time: '60'},
            {name: 'Aula 02', total_time: '70'},
            {name: 'Aula 03', total_time: '220'}
        ];

        // limpa os valores
        for (let i = 0; i < aulas.length; i++) {
            localStorage.setItem(`${room_id}_${i}_play`, false); // bool
            localStorage.setItem(`${room_id}_${i}_time-remaining`, aulas[i].total_time); // int: segundos
        }

        window.open(`/controle/${room_id}`);
        for (let i = 0; i < aulas.length; i++) {
            window.open(`/aula/${room_id}?class_id=${i}`, '_blank', 'location=yes, height=1920,width=1080, scrollbars=yes, status=yes');
        }
    }

    return (
        <Container>
            <Button variant='contained' color='primary' onClick={generateRoom}>
                Iniciar Aulas
            </Button>
        </Container>
    );
}

export default Home;