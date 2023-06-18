// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYXbg_87JPWeN19EUNFAi9ZrbLs3xZ7MM",
    authDomain: "ai-idol-election.firebaseapp.com",
    projectId: "ai-idol-election",
    storageBucket: "ai-idol-election.appspot.com",
    messagingSenderId: "383067549965",
    appId: "1:383067549965:web:3c814c3fea7ae5ad664044",
    measurementId: "G-NZDBNLYHCF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
var storageRef = storage.ref();


document.getElementById('mint-img-btn').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        // Create a canvas and draw the image onto it
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        var img = document.getElementById('displayImg');
        img.src = reader.result;

        img.onload = function () {
            // Calculate the position and size for the square crop
            var size = Math.min(img.naturalWidth, img.naturalHeight);
            var left = (img.naturalWidth - size) / 2;
            var top = (img.naturalHeight - size) / 2;

            // Draw the cropped image onto the canvas
            context.drawImage(img, left, top, size, size, 0, 0, canvas.width, canvas.height);

            // Create a new canvas for the resized image
            var resizeCanvas = document.createElement('canvas');
            var resizeContext = resizeCanvas.getContext('2d');
            resizeCanvas.width = 350;
            resizeCanvas.height = 350;

            // Draw the cropped image onto the resize canvas
            resizeContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, resizeCanvas.width, resizeCanvas.height);
            var dataUrl = resizeCanvas.toDataURL();

            // Set the cropped image as the src of the mint-img-btn
            document.getElementById('mint-profile-img').src = dataUrl;

            // Convert data URL to Blob
            var byteString = atob(dataUrl.split(',')[1]);
            var mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            var blob = new Blob([ab], { type: mimeString });

            // Upload the cropped image to Firebase
            var uploadTask = storageRef.child('images/' + file.name).put(blob);
            uploadTask.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, function (error) {
                console.log('Upload failed:', error);
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('Upload completed successfully!');
                    console.log('File available at', downloadURL);
                });
            });
        }
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});
