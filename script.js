function updateGamepadStatus() {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];

    if (!gamepad) {
        requestAnimationFrame(updateGamepadStatus);
        return;
    }

    // === Basic gamepad info ===
    const gamepadDetails = document.getElementById('gamepadDetails');
    gamepadDetails.innerHTML = `
        <p><strong>Name:</strong> ${gamepad.id}</p>
        <p><strong>Index:</strong> ${gamepad.index}</p>
        <p><strong>Number of Axes:</strong> ${gamepad.axes.length}</p>
        <p><strong>Number of Buttons:</strong> ${gamepad.buttons.length}</p>
    `;

    // === Control status (axes + buttons) ===
    const controlStatus = document.getElementById('controlStatus');
    controlStatus.innerHTML = '';

    // Axes visualization (bars)
    gamepad.axes.forEach((axis, index) => {
        const axisElement = document.createElement('div');
        axisElement.textContent = `Axis ${index}: ${axis.toFixed(2)}`;
        const axisBar = document.createElement('div');
        axisBar.className = 'axis-bar';
        axisBar.innerHTML = `<div class="fill" style="width: ${(axis + 1) * 50}%"></div>`;
        controlStatus.appendChild(axisElement);
        controlStatus.appendChild(axisBar);
    });

    // Buttons visualization
    gamepad.buttons.forEach((button, index) => {
        const buttonElement = document.createElement('div');
        buttonElement.textContent = `Button ${index}: ${button.pressed ? 'Pressed' : 'Released'}`;
        controlStatus.appendChild(buttonElement);
    });

    // === Analog stick movement ===
    updateAnalogSticks(gamepad);

    // Loop
    requestAnimationFrame(updateGamepadStatus);
}

// === Analog stick visualizer ===
function updateAnalogSticks(gamepad) {
    const leftStick = document.getElementById('leftStick');
    const rightStick = document.getElementById('rightStick');

    if (!leftStick || !rightStick) return;

    // Typical axis mapping
    const leftX = gamepad.axes[0] || 0;
    const leftY = gamepad.axes[1] || 0;
    const rightX = gamepad.axes[2] || 0;
    const rightY = gamepad.axes[3] || 0;

    // Optional deadzone (to prevent drift)
    const applyDeadzone = (value, threshold = 0.1) => {
        return Math.abs(value) < threshold ? 0 : value;
    };

    const lx = applyDeadzone(leftX);
    const ly = applyDeadzone(leftY);
    const rx = applyDeadzone(rightX);
    const ry = applyDeadzone(rightY);

    const maxMove = 50; // pixels from center

    // Apply transform for movement
    leftStick.style.transform = `translate(${lx * maxMove}px, ${ly * maxMove}px)`;
    rightStick.style.transform = `translate(${rx * maxMove}px, ${ry * maxMove}px)`;
}

// === Gamepad connection events ===
window.addEventListener('gamepadconnected', (event) => {
    console.log('Gamepad connected:', event.gamepad);
    updateGamepadStatus();
});

window.addEventListener('gamepaddisconnected', (event) => {
    console.log('Gamepad disconnected:', event.gamepad);
});
