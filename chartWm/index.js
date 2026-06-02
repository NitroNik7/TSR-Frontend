let htmlU = mintHtmlUtil;

function addWmToChart() {
    let chId = "tsrChartSvg0";
    let chSvg = document.querySelector("#" + chId);

    let chWidth = chSvg.getBoundingClientRect().width;
    // chWidth = 1400;
    let size = 1;

    if (chWidth < 600) {
        size = 0.7;
    } else if (chWidth < 1200) {
        size = 0.8;
    } else {
        size = 0.9;
    }

    let chWmHtml = ``;
    chWmHtml = `
             <g height="40" style="transform: translate(70px, 415px) scale(${size});" viewBox="0 0 80 40" width="80">
                <rect x="0" y="0" rx="15" style="height: 40px; width: 90px; fill: rgb(255 255 255 / 80%); stroke: #3F51B5;"></rect>
                <g transform="translate(10, 4)">
                    <rect x="0" y="18" width="6" rx="1.5" fill="#3b82f6" height="8">
                    </rect>
                    <rect x="9" y="10" width="6" rx="1.5" fill="#2563eb" height="16">
                    </rect>
                    <rect x="18" y="2" width="6" rx="1.5" fill="#1d4ed8" height="24">
                    </rect>
                </g>
                <text x="40" y="28" letter-spacing="-0.5" style="font-size: 22px; font-family: Segoe UI, Tahoma, sans-serif; font-weight: 700; fill: #0f172a;">
                    TSR
                </text>
            </g>

    `;

    let html = chSvg.innerHTML;
    chSvg.innerHTML = (html + chWmHtml);
}

addWmToChart();