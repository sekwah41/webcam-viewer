window.onload = () => {
    const video = document.querySelector("#cameraPreview");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.enumerateDevices()
            .then(mediaDevices => {
               console.log(mediaDevices);
                mediaDevices.forEach(mediaDevice => {
                    if (mediaDevice.kind === 'videoinput') {
                        console.log(mediaDevice);
                    }
                });
            });
    }
}
