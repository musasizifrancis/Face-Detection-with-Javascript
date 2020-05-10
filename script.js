const video = document.getElementById('video')

Promise.all([
faceapi.nets.tnyFaceDetector.loadFroamUri('/models'),
faceapi.nets.faceLandmark68Net.loadFroamUri('/models'),
faceapi.nets.faceRecognitionNet.loadFroamUri('/models'),
faceapi.nets.faceExpressionNet.loadFroamUri('/models')
]).then(startVideo)


function startVideo() {
	navigator.getUserMedia(
	{ video: {} },
	stream => video.srcObject = stream,
	err => console.error(err)
	)
}

video.addEventListener('play', () => {
	const canvas = faceapi.createCanvasFromMedia(video)
	document.body.append(canvas)
	const displaySize = { width: video.width, height: video.height }
	faceapi.matchDimensions(canvas, didplaySize)
    setInterval(async () => {
	const detections = await faceapi.detectAllFaces(video,
	new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks
	().withfaceExpressions()
	const resizedDetections = faceapi.resizeResults
	(detections, displaySize)
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height
	faceapi.drawDetections(canvas, resizedDetections)
	faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
	faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
}, 100)
})
