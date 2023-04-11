import React, { useEffect, useState, useRef } from 'react';
import { IResponseClock, ITime } from './clock.interface';
import './styles/clock.css';
import './styles/clock.media.css';

const Clock = (props: any): JSX.Element => {
    const [time, setTime] = useState<ITime>();
    const [secDeg, setSecDeg] = useState<number>(0);
    const [minDeg, setMinDeg] = useState<number>(0);
    const [hourDeg, setHourDeg] = useState<number>(0);

    // флаг, чтобы наш запрос не улетал дважды
    const wasQueried = useRef<boolean>(false);

    // делаем запрос, записываем время в state и меняем флаг
    useEffect(() => {
        if(!wasQueried.current) {
            wasQueried.current = true;

            fetch("https://timezoneapi.io/api/timezone/?Europe/Moscow&token=asNcXVlmxzIGXgCPmmWR")
            .then(res => res.json())
            .then((data: IResponseClock) => {
                const datetime = data.data.datetime;
                setTime({
                    sec: Number(datetime.seconds),
                    min: Number(datetime.minutes),
                    hour: Number(datetime.hour_12_wolz)
                })
            })
            .catch(err => console.log(err.message));
        }
    }, [])

    // проверяем time, и вызываем функцию только если он есть
    useEffect(() => {
        if(time !== undefined) {
            startPositionDeg(time);
        }
    }, [time])

    // запускаем таймер и каждую секунду высчитываем угол для стрелок
    useEffect(() => {
        const timer =setInterval(() => {
            setSecDeg(sec => sec + (360 / 60));
            setMinDeg(min => min + (360 / 60 / 60));
            setHourDeg(hour => hour + (360 / 60 / 60 / 12));
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    // функция первоначального позиционирования стрелок
    const startPositionDeg = (time: ITime) => {
        const {sec, min, hour} = time;

        const fullMinutes = (hour * 60) + min;

        const degSec = sec * (360 / 60);
        const degMin = min * (360 / 60);
        const degHour = fullMinutes * (360 / 720);
        setSecDeg(degSec);
        setMinDeg(degMin);
        setHourDeg(degHour);
    }

    const rotate = (deg: number) => ({transform: `rotate(${deg}deg)`});

    return (
        <div className='clock'>
            <ul className='arrows'>
                <li className='arrows__sec' style={rotate(secDeg)}></li>
                <li className='arrows__min' style={rotate(minDeg)}></li>
                <li className='arrows__hour' style={rotate(hourDeg)}></li>
                <li className='arrows__center'></li>
            </ul>
            <div className='semicircle'></div>
        </div>
    )
}

export default Clock;