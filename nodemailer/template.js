export const emailVerifyTemplate =(code) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <title></title>
</head>
<body class="d-flex justify-content-center align-items-center vh-100">
    <div class="card" style="width: 18rem;">
        <div class="card-header p-5 bg-success fw-bold text-center">Email Verification</div>
        <div class="card-body">
            <h4 class="card-title">Hello From App Team</h4>
            <h6 class="card-text">
                This is a verification email iniiated by you

            </h6>
            <p class="card-text">
                Your verification code is:
            </p>
            <h1 class="card-text text-center fw-bolder">
                <strong>${code}</strong>
            </h1>
        </div>
        <div class="card-footer text-center">
            <small>Thank you for using our service!</small>
            <small>If you did not request this email, please ignore it or contact us at sylvesteroyonah@gmail.com</small>
    </div>


</body>
</html>`