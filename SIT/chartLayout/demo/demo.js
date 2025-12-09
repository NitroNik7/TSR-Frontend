const chartCentreDivider = document.getElementById('chartTopCenterDivider');
const chartTopLayout = document.getElementById('chartTopLayout');

let xCord;

const chartTopLayoutRight = document.getElementById('chartTopLayoutRight');
const chartTopLayoutLeft = document.getElementById('chartTopLayoutLeft');

chartCentreDivider.addEventListener('mousedown', (e) => {
    xCord = e.clientX; // xCord stores X cordinate value when mouse is initially clicked

    document.addEventListener('mousemove', mouseMoveHandlerCentreDivider);

    document.addEventListener('mouseup', mouseUpHandlerCentreDivider);


});

const mouseMoveHandlerCentreDivider = (e) => {
    let dx = e.clientX - xCord; // dx > 0 when moving right, dx < 0 when moving left

    // Update xCord for the next movement
    xCord = e.clientX;

    // Get current widths of left and right panes in pixels
    const leftPaneWidth = chartTopLayoutLeft.offsetWidth;
    const rightPaneWidth = chartTopLayoutRight.offsetWidth;
    const totalWidth = chartTopLayout.offsetWidth;

    // Set the new widths for both panes
    const newLeftPaneWidth = leftPaneWidth + dx;
    const newRightPaneWidth = rightPaneWidth - dx;

    // Ensure the new widths stay within valid bounds
    if (newLeftPaneWidth > 300 && newRightPaneWidth > 300) {
        chartTopLayoutLeft.style.width = (newLeftPaneWidth / totalWidth) * 100 + '%';
        chartTopLayoutRight.style.width = (newRightPaneWidth / totalWidth) * 100 + '%';
    }

    console.log(`dx: ${dx}, newLeftPaneWidth: ${newLeftPaneWidth}px, newRightPaneWidth: ${newRightPaneWidth}px`);
};


const mouseUpHandlerCentreDivider = () => {
    document.removeEventListener('mousemove', mouseMoveHandlerCentreDivider);
    document.removeEventListener('mouseup', mouseUpHandlerCentreDivider);
}