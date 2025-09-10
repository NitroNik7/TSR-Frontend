# Google Sign in 

## Using HTML API


**HTML:**
```
<!-- Add following code wherever you need to place sign in button -->

        <div id="g_id_onload"
            data-client_id="687781720116-6e04u9huhh1u235ar6o9in1d3a3r44t5.apps.googleusercontent.com"
            data-context="signin" data-ux_mode="popup" data-callback="handleCredentialResponse"
            data-auto_select="true" data-itp_support="true">
        </div>

        <div class="g_id_signin" 
            data-type="standard"               data-shape="rectangular" 
            data-theme="outline"
            data-text="continue_with" 
            data-size="large" 
            data-logo_alignment="left">
        </div>

```

----------

**JS:**
```
<script>
    function handleCredentialResponse(response) {

        console.log("Encoded JWT ID token: " + response.credential);

        const responsePayload = decodeJWT(response.credential);

        console.log("Decoded JWT ID token fields:");
        console.log("  Full Name: " + responsePayload.name);
        console.log("  Given Name: " + responsePayload.given_name);
        console.log("  Family Name: " + responsePayload.family_name);
        console.log("  Unique ID: " + responsePayload.sub);
        console.log("  Profile image URL: " + responsePayload.picture);
        console.log("  Email: " + responsePayload.email);
    }

    function decodeJWT(token) {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    }

</script>

```


------


## Using JavaScript API

**JS:**
```
        <script>

            function handleCredentialResponse(response) {
                console.log(response.credential);
            }

            window.onload = function () {
                google.accounts.id.initialize({
                    client_id: '687781720116-6e04u9huhh1u235ar6o9in1d3a3r44t5.apps.googleusercontent.com',
                    auto_select: true,
                    callback: handleCredentialResponse,
                    cancel_on_tap_outside: false,
                    state_cookie_domain: "netlify.app",
                    use_fedcm_for_prompt: true,
                    use_fedcm_for_button: true

                }); // creates a Sign In With Google client instance for use throughout the webpage, it is called only once
                google.accounts.id.prompt();



                google.accounts.id.renderButton(document.getElementById("tsrGoogleSignIn"), {
                    theme: 'outline',
                    size: 'large',
                    click_listener: onClickHandler,
                    text: "continue_with",
                    width: "300px"
                });


            };

            function onClickHandler() {
                console.log("Sign in with Google button clicked...");
                google.accounts.id.cancel();
            }

        </script>
```