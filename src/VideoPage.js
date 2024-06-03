import React, { useState, useRef, useEffect } from 'react';
import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import emailjs from 'emailjs-com';
import './VideoPage.css';

const VideoPage = () => {
  const videos = [
    { id: 1, title: 'Fighting Detection', url: 'https://drive.google.com/file/d/1vvKaw9_51aO14WMgW7KE_0mxOXP2V3lL/view?usp=sharing' },
    { id: 2, title: 'Gun Shooting Detection', url: 'https://drive.google.com/file/d/1rRMpc_wF7gKCjVkY4OrVQ5qJx6HDcr0w/view?usp=sharing' },
    { id: 3, title: 'Accident Detection', url: 'https://drive.google.com/file/d/1PlSk1im8M6l_2ngNuKqgJ6hRfwuYLRKC/view?usp=sharing' },
    { id: 4, title: 'Abuse Detection', url: 'https://drive.google.com/file/d/11u-7x5b3x4vGM2ZIFaCDw0Ochz7Zp_Jd/view?usp=sharing' },
    { id: 5, title: 'Fire Detection', url: 'https://drive.google.com/file/d/1QE-f3V3AE1g_wxX7ydxo25Sv05fCPaEc/view?usp=sharing' },
    { id: 6, title: 'Module1 Video', url: 'https://drive.google.com/file/d/13cKsPaxWqE4hF1BQ4o4HOdE5X7FVPhLA/view?usp=sharing' },
  ];


  const [isRecording, setIsRecording] = useState(false);
  const [model, setModel] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        videoRef.current.onloadedmetadata = () => {
          setIsRecording(true);
          detectFrame();
        };
      })
      .catch(error => console.error('Error accessing media devices.', error));
  };

  const detectFrame = () => {
    if (videoRef.current && model) {
      if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
        requestAnimationFrame(detectFrame);
        return;
      }

      model.detect(videoRef.current).then(predictions => {
        drawBoundingBoxes(predictions);

        predictions.forEach(prediction => {
          if (['person', 'fire', 'knife', 'gun'].includes(prediction.class)) {
            playAlert(prediction.class);
            if (prediction.class === 'person') {
              sendEmailNotification();
            }
          }
        });

        requestAnimationFrame(detectFrame);
      });
    }
  };

  const drawBoundingBoxes = (predictions) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      ctx.font = '18px Arial';
      ctx.fillStyle = 'red';
      ctx.fillText(prediction.class, x, y > 10 ? y - 5 : y + 10);
    });
  };

  const playAlert = (event) => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    alert(`Detected: ${event}`);
  };

  const sendEmailNotification = () => {
    const templateParams = {
      to_name: 'User', // Replace with the recipient's name
      message: 'A person has been detected in the surveillance area.',
    };

    emailjs.send('service_uwspnno', 'template_25dv8kc', templateParams, '7vxBxQZXleccAfwi-')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Failed to send email.', error);
      });
  };

  const stopRecording = () => {
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setIsRecording(false);
  };

  return (
    <div className="video-page">
      <h2>Surveillance Videos Links</h2>
      <div className="card-container">
        {videos.map((video) => (
          <div key={video.id} className="card" onClick={() => window.open(video.url, '_blank')}>
            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
      <h2>Live Recording</h2>
      <div className="live-section">
        <video ref={videoRef} className="video-preview"></video>
        <canvas ref={canvasRef} className="video-canvas"></canvas>
        <audio ref={audioRef} src="ambulance-sound-27708(1).mp3" preload="auto"></audio>
        <div className="controls">
          {!isRecording && <button onClick={startRecording}>Start Recording</button>}
          {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
