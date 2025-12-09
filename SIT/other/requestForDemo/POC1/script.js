// TODO write function to create Popup
// * Popup should open at the right bottom corner of the page
// * Popup should be a cloud 



let popup = document.getElementById('tsrRequestForDemoBtn');
popup.addEventListener("click", createRequestForDemoPopup);

function createRequestForDemoPopup() {
    console.log('Popup clicked');

    let btn = document.getElementById('tsrRequestForDemoBtn');
    btn.style.display = 'none';

    let popup = document.getElementById('tsrRequestForDemoPopup');
    popup.style.border = '1px solid black';

    popup.innerHTML = `
        <div style="
            background-color: gray;
            padding: 5px 10px 5px 10px;
            display: flex;
            justify-content: space-between;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            background-image: linear-gradient(to right, rgb(0, 113, 195) 9%, rgb(0, 168, 235) 95%);">
            <span style="color: white">Request for Demo</span>
            <div onclick="showRequestForDemoButton(event);" style="margin-top: auto; margin-bottom: auto; color: white; font-size:18px;">
                <i class="fas fa-times"></i>
            </div>
        </div>
        <div style="padding: 10px;">
                    <p style="font-size: 14px; color: slategray"> Fill the form below and one of our Experts will get back to you shortly</p>

                    <form class="mb-0">
                    <div class="mb-1">
                            <label for="username" class="form-label">Name <span style="color:red;">*<span></label>
                            <input type="text" class="form-control form-control-sm" id="username" aria-describedby="username" required>
                        </div>
                        <div class="mb-1">
                            <label for="exampleInputEmail1" class="form-label">Email address <span style="color:red;">*<span></label>
                            <input type="email" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                        </div>
                        <div class="mb-1">
                            <label for="mobileNumber" class="form-label">Mobile No. <span style="color:red;">*<span></label>
                            <input type="text" class="form-control form-control-sm" id="mobileNumber" aria-describedby="" required>
                        </div>
                        <div class="mb-1">
                            <label for="doubtQuery" class="form-label">Enter Doubt/Query</label>
                            <textarea class="form-control form-control-sm" id="doubtQuery" rows="1" style="resize: none;"></textarea>
                        </div>
                        <div class="mb-2">
                        <label for="preferredTimeSlot" class="form-label">Preferred Time Slot <span style="color:red;">*<span></label>
                            <select class="form-select mb-2" name="tick" id="preferredTimeSlot">
                                <option value="1">During Market Hours</option>
                                <option value="2">After Market Hours</option>
                            </select>
                            <div id="emailHelp" class="form-text">*For Support Call us <br><span style="color:black; font-size: 16px; font-weight: bold;">@ +91 922 655 760 3/4/5<span></div>
                            <div id="emailHelp" class="form-text">*Office Hours 10 AM to 7 PM, Mon - Sat </div>
                            <div id="emailHelp" class="form-text">*We'll never share your email/contact with anyone else.</div>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Submit</button>
                        
                    </form>

        </div>
    `;

    popup.removeEventListener("click", createRequestForDemoPopup);
    popup.removeEventListener("mouseover", showChatWithExpertText);
    popup.removeEventListener("mouseout", hideChatWithExpertText);

}


function showRequestForDemoButton(e) {
    e.stopPropagation();

    let btn = document.getElementById('tsrRequestForDemoBtn');
    let div = document.getElementById('tsrRequestForDemoPopup');
    let text = document.getElementById('chatWithExpert');
    btn.style.display = 'block';
    
    div.innerHTML = ``;

    div.style.border = 'unset';

    btn.addEventListener("click", createRequestForDemoPopup);

    btn.addEventListener("mouseover", showChatWithExpertText);

    btn.addEventListener("mouseout", hideChatWithExpertText);
}

function showChatWithExpertText() {
    document.getElementById("chatWithExpert").style.display = 'block';
}

function hideChatWithExpertText() {
    document.getElementById("chatWithExpert").style.display = 'none';
}

