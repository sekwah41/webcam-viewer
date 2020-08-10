
window.onload = () => {
    const video = document.querySelector("#cameraPreview");
    const webcamSelector = document.querySelector("#webcamSelector");
    const selectionMenu = document.querySelector("#selectionMenu");

    window.ipcRenderer.send('videoSize', {width: 800, height: 600});

    function hideSelector() {
        selectionMenu.style.display = "none";
    }

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.enumerateDevices()
            .then(mediaDevices => {
               console.log(mediaDevices);
                mediaDevices.forEach(mediaDevice => {
                    if (mediaDevice.kind === 'videoinput') {
                        console.log(mediaDevice);
                        const option = document.createElement("option");
                        option.value = mediaDevice.deviceId;
                        option.text  = mediaDevice.label;
                        webcamSelector.appendChild(option);
                    }
                });
                webcamSelector.onchange = function() {
                    navigator.mediaDevices.getUserMedia(
                        {
                            video:
                                {
                                    deviceId: this.value
                                }
                        }).then((stream) => {
                            console.log(stream);
                        video.srcObject = stream;
                        console.log(stream);
                        const settings = stream.getVideoTracks()[0].getSettings();
                        window.ipcRenderer.send('videoSize', {width: settings.width, height: settings.height});
                    });
                    hideSelector();
                };
            });
    }
}
