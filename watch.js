const fs = require('fs'), spawn = require('child_process').spawn;
console.log('Starting watching...');
var isWin = process.platform === "win32";
console.log(process.platform);
if (isWin) {
    console.log("OS: Win");
} else {
    console.log("OS: Mac/Linux");
}
var fsTimeout;
deployContainer();

fs.watch('.', {
    recursive: true
}, (e, file) => {
    if (!fsTimeout) {
        deployContainer();
        fsTimeout = setTimeout(function () { fsTimeout = null }, 3000)
    }
});

function deployContainer() {
    console.log('Deploying container...');
    if (isWin) {
        let child = spawn("powershell.exe", [".\\buildAndRunFrontEndContainer.ps1"]);
        child.on("exit", function () {
            console.log('Container has been deployed successfuly');
        });
        child.on('error', function (err) {
            console.log('Error: ' + err);
        });
        child.stdin.end();
    } else {
        let child = spawn("sh", ["./buildAndRunFrontEndContainer.sh"]);
        //let child = spawn("sh", ["pa"]);
        child.on("exit", function () {
            console.log('Container has been deployed successfuly');
        });
        child.on('error', function (err) {
            console.log('Error: ' + err);
        });
        child.stdin.end();
    }
}