function updateGamepadStatus() {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];

    if (!gamepad) {
        requestAnimationFrame(updateGamepadStatus);
        return;
    }

    const gamepadDetails = document.getElementById('gamepadDetails');
    gamepadDetails.innerHTML = `
        <p><strong>Name:</strong> ${gamepad.id}</p>
        <p><strong>Index:</strong> ${gamepad.index}</p>
        <p><strong>Number of Axes:</strong> ${gamepad.axes.length}</p>
        <p><strong>Number of Buttons:</strong> ${gamepad.buttons.length}</p>
    `;

    const controlStatus = document.getElementById('controlStatus');
    controlStatus.innerHTML = '';

    gamepad.axes.forEach((axis, index) => {
        const axisElement = document.createElement('div');
        axisElement.textContent = `Axis ${index}: ${axis.toFixed(2)}`;
        const axisBar = document.createElement('div');
        axisBar.className = 'axis-bar';
        axisBar.innerHTML = `<div class="fill" style="width: ${(axis + 1) * 50}%"></div>`;
        controlStatus.appendChild(axisElement);
        controlStatus.appendChild(axisBar);
    });

    gamepad.buttons.forEach((button, index) => {
        const buttonElement = document.createElement('div');
        buttonElement.textContent = `Button ${index}: ${button.pressed ? 'Pressed' : 'Released'}`;
        controlStatus.appendChild(buttonElement);
    });

    requestAnimationFrame(updateGamepadStatus);
}

window.addEventListener('gamepadconnected', (event) => {
    console.log('Gamepad connected:', event.gamepad);
    updateGamepadStatus();
});

window.addEventListener('gamepaddisconnected', (event) => {
    console.log('Gamepad disconnected:', event.gamepad);
});
