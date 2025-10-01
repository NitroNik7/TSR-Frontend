stockList.forEach(element => {
    let li = document.createElement('li');

    let div = document.createElement('div');
    div.classList.add('d-flex', 'justify-content-between', 'w-100');

    let left = document.createElement('div');
    left.classList.add('d-flex');

    let divLeft = document.createElement('div');
    divLeft.classList.add('d-flex', 'flex-column', "col-8");

    let divRight = document.createElement('div');
    divRight.classList.add('d-flex', "align-content-center", "col-4");

    let divTop = document.createElement('div');
    divTop.innerHTML = element.name + "&nbsp;";

    let divBottom = document.createElement('div');
    divBottom.textContent = element.industry;
    divBottom.style.fontSize = "0.6em";

    let right = document.createElement('div');
    right.classList.add('d-sm-flex', 'd-none', "d-flex");

    let code = document.createElement('span');
    code.classList.add("code");
    code.innerHTML = element.code;


    let chartBtn = document.createElement('button');
    chartBtn.classList.add('btn', 'btn-sm', 'me-2');
    chartBtn.innerHTML = 'Launch chart';
    let analysisBtn = document.createElement('button');
    analysisBtn.classList.add('btn', 'btn-sm');
    analysisBtn.innerHTML = 'Analysis';

    right.appendChild(code);
    right.appendChild(chartBtn);
    right.appendChild(analysisBtn);

    let mobileChartBtn = document.createElement('div');
    mobileChartBtn.classList.add('mobileBtn', "p-2", "w-100");
    mobileChartBtn.style.backgroundColor = "pink";
    mobileChartBtn.innerHTML = 'Chart';
    let mobileAnalysisBtn = document.createElement('div');
    mobileAnalysisBtn.classList.add('mobileBtn', "p-2", "w-100");
    mobileAnalysisBtn.innerHTML = 'Analysis';
    mobileAnalysisBtn.style.backgroundColor = "violet";

    divLeft.appendChild(divTop);
    divLeft.appendChild(divBottom);


    divRight.appendChild(mobileChartBtn);
    divRight.appendChild(mobileAnalysisBtn);

    left.appendChild(divLeft);
    left.appendChild(divRight);

    div.appendChild(left);
    div.appendChild(right);

    li.appendChild(div);

    list.appendChild(li);
});