import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const RecordView = ({ record, setAudioMessage }) => {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    let intervalId;

    if (record) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter, record]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setMinute('00');
  }
  const { status, startRecording, stopRecording, pauseRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: false,
      audio: true,
      echoCancellation: true,
    });
  console.log('url', mediaBlobUrl);

  useEffect(() => {
    if (record) {
      startRecording();
    } else {
      setAudioMessage(mediaBlobUrl);
      stopRecording();
      pauseRecording();
    }
  }, [record]);

  useEffect(() => {
    setAudioMessage(mediaBlobUrl);
  }, [mediaBlobUrl]);

  return (
    <audio style={{ margin: 10, width: '80%' }} src={mediaBlobUrl} controls>
      <source src={mediaBlobUrl && mediaBlobUrl} />
    </audio>
  );
};
export default RecordView;
