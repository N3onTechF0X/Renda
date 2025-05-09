const standartConfig = {
    supplies: {
        delay: 50,
        multiply: 1,
        repair: !1,
        shield: !1,
        damage: !1,
        speed: !1,
        mine: !1
    },
    menu: {
        posY: "1rem",
        posX: "1rem"
    },
    binds: {
        menu: "KeyM",
        mines: "Quote",
        supplies: "Semicolon"
    }
};

let config = JSON.parse(localStorage.getItem("RendaConfig")) || standartConfig;

const saveConfig = () => {localStorage.setItem("RendaConfig", JSON.stringify(config))};
saveConfig();


unsafeWindow.rendaSettings = {
    changeBind: {
        menu: (key) => {
            config.binds.menu = key;
            saveConfig();
        },
        mines: (key) => {
            config.binds.mines = key;
            saveConfig();
        },
        supplies: (key) => {
            config.binds.supplies = key;
            saveConfig();
        }
    },
    resetConfig: () => {
        config = standartConfig;
        saveConfig();
    }
}


const styleElement = document.createElement("style");
document.head.appendChild(styleElement);
styleElement.textContent = `
@keyframes animIn {
    from {
        opacity: 0;
        transform: translateY(5rem) scale(0.9);
        filter: blur(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}

@keyframes animOut {
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
    to {
        opacity: 0;
        transform: translateY(-5rem) scale(0.9);
        filter: blur(20px);
    }
}
.animIn {
    animation: animIn 0.3s forwards;
}
.animOut {
    animation: animOut 0.3s forwards;
}
.renda_window{
    opacity: 0;
    display: none;
    position: fixed;
    width: 17rem;
    top:${config.menu.posY};
    left:${config.menu.posX};
    padding: 1rem;
    background: rgba(0,0,0,.5);
    backdrop-filter: blur(3px);
    border-radius: 1.5rem;
    z-index: 9998;
    font-size: 1.5rem;
    color: white;
    transition: opacity 0.5s, transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    user-select: none;
    text-align: center;
}
.switch_container{
    display: flex;
    justify-content: space-between;
}
.switch:hover{
    transform: scale(1.05);
}
.switch{
    margin: .2rem;
    width: 2.7rem;
    height: 2.7rem;
    border: .15rem solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
}
.switch img{
    width: 2rem;
    height: 2rem;
    transition: filter 0.3s ease-in-out;
}
.switch_off{
    filter: contrast(0%);
}
.switch_on{
    filter: contrast(100%);
}
.renda_slider{
    -webkit-appearance: none;
    appearance: none;
    background: rgb(200, 200, 200);
    margin: .5rem;
    width: 7rem;
    border-radius: .5rem;
    height: .7rem;
}
.renda_slider::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    background: rgb(50, 50, 50);
    cursor: pointer;
    border-radius: 50%;
}
`;

const floatingWindow = document.createElement("div");
floatingWindow.classList.add("renda_window");

const title = document.createElement("div");
title.classList.add("renda_title");
title.textContent = "Renda\nclicker";
floatingWindow.appendChild(title);

const switchContainer = document.createElement("div");
switchContainer.classList.add("switch_container");
floatingWindow.appendChild(switchContainer);

const repairSwitch = document.createElement("div");
repairSwitch.classList.add("switch");
const repairImg = document.createElement("img");
repairImg.classList.toggle("switch_on", config.supplies.repair);
repairImg.classList.toggle("switch_off", !config.supplies.repair);
repairImg.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMyAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNS40OTk1IDEuNUwyMC45OTk1IDZWOEwyNC45OTk1IDEySDI2Ljk5OTVMMzEuNDk5NSA3LjVIMzIuOTk5NVYxMEMzMi45OTk1IDE1LjUyMjggMjguNTIyNCAyMCAyMi45OTk1IDIwQzIxLjUzMjIgMjAgMjAuMTM4NiAxOS42ODQgMTguODgzMyAxOS4xMTYyTDYuOTk5OTMgMzAuOTk5OUM1LjYxOTIyIDMyLjM4MDcgMy4zODA2MSAzMi4zODA3IDEuOTk5ODkgMzFDMC42MTkxOSAyOS42MTkzIDAuNjE5MTc3IDI3LjM4MDcgMS45OTk4NSAyNkwxMy44ODMzIDE0LjExNjJDMTMuMzE1NiAxMi44NjA5IDEyLjk5OTUgMTEuNDY3MyAxMi45OTk1IDEwQzEyLjk5OTUgNC40NzcxNSAxNy40NzY3IDAgMjIuOTk5NSAwSDI1LjQ5OTVWMS41WiIgZmlsbD0iI0JGRTUwMCIvPgo8L3N2Zz4K";
repairSwitch.appendChild(repairImg);
repairSwitch.addEventListener("click", () => {
    config.supplies.repair = !config.supplies.repair;
    repairImg.classList.toggle("switch_on", config.supplies.repair);
    repairImg.classList.toggle("switch_off", !config.supplies.repair);
    saveConfig();
});
switchContainer.appendChild(repairSwitch);

const shieldSwitch = document.createElement("div");
shieldSwitch.classList.add("switch");
const shieldImg = document.createElement("img");
shieldImg.classList.toggle("switch_on", config.supplies.shield);
shieldImg.classList.toggle("switch_off", !config.supplies.shield);
shieldImg.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yOS4zNTg1IDIwLjI2MTdDMjYuNjE0MSAyOC45Njc0IDE2IDMyIDE2IDMyQzE2IDMyIDIgMjggMiAxNlY1LjUwODZDMiA0LjYxNTY0IDIuNTkxOTUgMy44MzA4NyAzLjQ1MDU2IDMuNTg1NTVMMTYgMEwyOC41NDk0IDMuNTg1NTVDMjkuNDA4IDMuODMwODcgMzAgNC42MTU2NCAzMCA1LjUwODZWMTJWMTZDMzAgMTYgMzAgMTYgMzAgMTZDMzAgMTcuNTUxNCAyOS43NjYgMTguOTY5MSAyOS4zNTg1IDIwLjI2MTdaTTI2IDEwLjg1NzFWNy4wMTcyMUwxNiA0LjE2MDA2TDYgNy4wMTcyMVYxNkM2IDIwLjIwOTEgOC4zOTA3NCAyMy4xNDkyIDExLjMyNSAyNS4yNDUxQzEyLjc3OTMgMjYuMjgzOSAxNC4yNTk1IDI3LjAyNzIgMTUuMzg4MiAyNy41MTA5QzE1LjYwOSAyNy42MDU1IDE1LjgxNCAyNy42ODkyIDE2IDI3Ljc2MjRMMTYgOEwyNiAxMC44NTcxWiIgZmlsbD0iI0VBREM5OSIvPgo8L3N2Zz4K";
shieldSwitch.appendChild(shieldImg);
shieldSwitch.addEventListener("click", () => {
    config.supplies.shield = !config.supplies.shield;
    shieldImg.classList.toggle("switch_on", config.supplies.shield);
    shieldImg.classList.toggle("switch_off", !config.supplies.shield);
    saveConfig();
});
switchContainer.appendChild(shieldSwitch);

const damageSwitch = document.createElement("div");
damageSwitch.classList.add("switch");
const damageImg = document.createElement("img");
damageImg.classList.toggle("switch_on", config.supplies.damage);
damageImg.classList.toggle("switch_off", !config.supplies.damage);
damageImg.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDEuMzMzMzNMMCAyNkwyMCAxMkw2IDMyTDMwLjY2NjcgMjhMMjAgMjRMMzIgMEw4IDEyTDQgMS4zMzMzM1oiIGZpbGw9IiNGRjMzMzMiLz4KPC9zdmc+Cg==";
damageSwitch.appendChild(damageImg);
damageSwitch.addEventListener("click", () => {
    config.supplies.damage = !config.supplies.damage;
    damageImg.classList.toggle("switch_on", config.supplies.damage);
    damageImg.classList.toggle("switch_off", !config.supplies.damage);
    saveConfig();
});
switchContainer.appendChild(damageSwitch);

const speedSwitch = document.createElement("div");
speedSwitch.classList.add("switch");
const speedImg = document.createElement("img");
speedImg.classList.toggle("switch_on", config.supplies.speed);
speedImg.classList.toggle("switch_off", !config.supplies.speed);
speedImg.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuODM5N0MyIDEyLjY3MiAyLjUxMDI1IDExLjU2MjYgMy4zOTY4MyAxMC44MDI3TDE2IDBMMjguNjAzMiAxMC44MDI3QzI5LjQ4OTcgMTEuNTYyNiAzMCAxMi42NzIgMzAgMTMuODM5N1YyMEwxNiA4TDIgMjBWMTMuODM5N1oiIGZpbGw9IiNGRkZGMDAiLz4KPHBhdGggZD0iTTIgMjUuODM5N0MyIDI0LjY3MiAyLjUxMDI1IDIzLjU2MjYgMy4zOTY4MyAyMi44MDI3TDE2IDEyTDI4LjYwMzIgMjIuODAyN0MyOS40ODk3IDIzLjU2MjYgMzAgMjQuNjcyIDMwIDI1LjgzOTdWMzJMMTYgMjBMMiAzMlYyNS44Mzk3WiIgZmlsbD0iI0ZGRkYwMCIvPgo8L3N2Zz4K";
speedSwitch.appendChild(speedImg);
speedSwitch.addEventListener("click", () => {
    config.supplies.speed = !config.supplies.speed;
    speedImg.classList.toggle("switch_on", config.supplies.speed);
    speedImg.classList.toggle("switch_off", !config.supplies.speed);
    saveConfig();
});
switchContainer.appendChild(speedSwitch);

const mineSwitch = document.createElement("div");
mineSwitch.classList.add("switch");
const mineImg = document.createElement("img");
mineImg.classList.toggle("switch_on", config.supplies.mine);
mineImg.classList.toggle("switch_off", !config.supplies.mine);
mineImg.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDIxLjAwOThWMTAuOTkwMkwxMC45OTAyIDRIMjEuMDA5OEwyOCAxMC45OTAyVjIxLjAwOThMMjEuMDA5OCAyOEgxMC45OTAyTDQgMjEuMDA5OFpNOC43NDc1NSAwLjU4NTc4NkM5LjEyMjYyIDAuMjEwNzEzIDkuNjMxMzMgMCAxMC4xNjE4IDBIMjEuODM4MkMyMi4zNjg3IDAgMjIuODc3NCAwLjIxMDcxNCAyMy4yNTI1IDAuNTg1Nzg3TDMxLjQxNDIgOC43NDc1NUMzMS43ODkzIDkuMTIyNjIgMzIgOS42MzEzMyAzMiAxMC4xNjE4VjIxLjgzODJDMzIgMjIuMzY4NyAzMS43ODkzIDIyLjg3NzQgMzEuNDE0MiAyMy4yNTI1TDIzLjI1MjUgMzEuNDE0MkMyMi44Nzc0IDMxLjc4OTMgMjIuMzY4NyAzMiAyMS44MzgyIDMySDEwLjE2MThDOS42MzEzMyAzMiA5LjEyMjYyIDMxLjc4OTMgOC43NDc1NSAzMS40MTQyTDAuNTg1Nzg2IDIzLjI1MjVDMC4yMTA3MTMgMjIuODc3NCAwIDIyLjM2ODcgMCAyMS44MzgyVjEwLjE2MThDMCA5LjYzMTMzIDAuMjEwNzE0IDkuMTIyNjIgMC41ODU3ODYgOC43NDc1NUw4Ljc0NzU1IDAuNTg1Nzg2Wk0xNiAyM0MxOS44NjYgMjMgMjMgMTkuODY2IDIzIDE2QzIzIDEyLjEzNCAxOS44NjYgOSAxNiA5QzEyLjEzNCA5IDkgMTIuMTM0IDkgMTZDOSAxOS44NjYgMTIuMTM0IDIzIDE2IDIzWiIgZmlsbD0iIzM2QjI0QSIvPgo8L3N2Zz4K";
mineSwitch.appendChild(mineImg);
mineSwitch.addEventListener("click", () => {
    config.supplies.mine = !config.supplies.mine;
    mineImg.classList.toggle("switch_on", config.supplies.mine);
    mineImg.classList.toggle("switch_off", !config.supplies.mine);
    saveConfig();
});
switchContainer.appendChild(mineSwitch);

const multiplySlider = document.createElement("input");
multiplySlider.classList.add("renda_slider");
multiplySlider.type = "range";
multiplySlider.min = 1;
multiplySlider.max = 10;
multiplySlider.value = config.supplies.multiply;
multiplySlider.addEventListener("input", ({target}) => {
    config.supplies.multiply = parseInt(target.value);
    saveConfig();
});
floatingWindow.appendChild(multiplySlider);

const multiplyLabel = document.createElement("span");
multiplyLabel.textContent = `Multiply: ${config.supplies.multiply}`;
setInterval(() => {
    multiplyLabel.textContent = `Multiply: ${config.supplies.multiply}`
}, 100);
floatingWindow.appendChild(multiplyLabel);

const delaySlider = document.createElement("input");
delaySlider.classList.add("renda_slider");
delaySlider.type = "range";
delaySlider.min = 0;
delaySlider.max = 300;
delaySlider.step = 5;
delaySlider.value = config.supplies.delay;
delaySlider.addEventListener("input", ({target}) => {
    config.supplies.delay = parseInt(target.value);
    saveConfig();
});
floatingWindow.appendChild(delaySlider);

const delayLabel = document.createElement("span");
delayLabel.textContent = `Delay: ${config.supplies.delay}`;
setInterval(() => {
    delayLabel.textContent = `Delay: ${config.supplies.delay}`
}, 100);
floatingWindow.appendChild(delayLabel);

const emulateSupply = (supply) => {
    root.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        code: 'Digit' + supply
    }));
    root.dispatchEvent(new KeyboardEvent('keyup', {
        bubbles: true,
        code: 'Digit' + supply
    }));
}

let lastClickTime = Date.now();
function activateSupplies() {
    if (config.supplies.delay != 0) {
        if (Date.now() - lastClickTime < config.supplies.delay) {
            requestAnimationFrame(activateSupplies);
            return;
        };
    }
    config.supplies.repair && emulateSupply("1");
    config.supplies.shield && emulateSupply("2");
    config.supplies.damage && emulateSupply("3");
    config.supplies.speed && emulateSupply("4");
    for (let i = 0; i < config.supplies.multiply; i++) config.supplies.mine && emulateSupply("5");
    lastClickTime = Date.now();
    requestAnimationFrame(activateSupplies);
}
activateSupplies()

const openMenu = () => {
    floatingWindow.style.display = 'block';
    floatingWindow.classList.remove('animOut');
    floatingWindow.classList.add('animIn');
    isMenuOpen = true;
}

const closeMenu = () => {
    floatingWindow.classList.remove('animIn');
    floatingWindow.classList.add('animOut');
    floatingWindow.addEventListener('animationend', () => {
        if (floatingWindow.classList.contains('animOut')) {
            floatingWindow.style.display = 'none';
        }
    }, {once: true});
    isMenuOpen = false;
}

let isMenuOpen = false;
document.addEventListener("keyup", ({code}) => {
    if (document.querySelector('.BattleHudComponentStyle-hudContainer input') !== null) return;
    switch (code) {
        case config.binds.menu:
            isMenuOpen ? closeMenu() : openMenu();
            break;
        case config.binds.mines:
            config.supplies.mine = !config.supplies.mine;
            mineImg.classList.toggle("switch_on", config.supplies.mine);
            mineImg.classList.toggle("switch_off", !config.supplies.mine);
            saveConfig();
            break;
        case config.binds.supplies:
            config.supplies.shield = !config.supplies.shield;
            shieldImg.classList.toggle("switch_on", config.supplies.shield);
            shieldImg.classList.toggle("switch_off", !config.supplies.shield);
            config.supplies.damage = !config.supplies.damage;
            damageImg.classList.toggle("switch_on", config.supplies.damage);
            damageImg.classList.toggle("switch_off", !config.supplies.damage);
            config.supplies.speed = !config.supplies.speed;
            speedImg.classList.toggle("switch_on", config.supplies.speed);
            speedImg.classList.toggle("switch_off", !config.supplies.speed);
            saveConfig();
            break;
    }
});

let offsetX, offsetY, isDragging = false, canDrag = true;
floatingWindow.addEventListener("mousedown", ({target, clientX, clientY}) => {
    if (target.classList.contains("switch") || target.classList.contains("renda_slider")) {
        canDrag = false;
        return;
    }
    canDrag = true, isDragging = true;
    offsetX = clientX - floatingWindow.getBoundingClientRect().left;
    offsetY = clientY - floatingWindow.getBoundingClientRect().top;
});
document.addEventListener("mousemove", ({clientX, clientY}) => {
    if (isDragging && canDrag) {
        const newX = `${clientX - offsetX}px`;
        const newY = `${clientY - offsetY}px`;
        floatingWindow.style.left = newX;
        floatingWindow.style.top = newY;
        config.menu.posX = newX;
        config.menu.posY = newY;
    }
});
document.addEventListener("mouseup", () => {
    isDragging = false;
    saveConfig();
});

document.body.appendChild(floatingWindow);
