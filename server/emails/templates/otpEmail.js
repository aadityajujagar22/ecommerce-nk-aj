exports.otpTemplate = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your OTP Code</title>
  <style>
    body {
      background-color: #f9fafc;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      background: #ffffff;
      margin: 40px auto;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #2563eb, #1e40af);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 30px;
      text-align: center;
    }
    .content h2 {
      color: #111827;
      margin-bottom: 10px;
      font-size: 22px;
    }
    .otp-box {
      display: inline-block;
      background: #f3f4f6;
      border: 1px dashed #2563eb;
      border-radius: 8px;
      padding: 15px 25px;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #1e3a8a;
      margin: 20px 0;
    }
    .content p {
      font-size: 15px;
      color: #4b5563;
      margin: 10px 0;
    }
    .cta {
      margin-top: 30px;
    }
    .cta a {
      background: #2563eb;
      color: white;
      padding: 12px 25px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      display: inline-block;
    }
    .cta a:hover {
      background: #1e40af;
    }
    .footer {
      background: #f3f4f6;
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #6b7280;
    }
    @media (max-width: 600px) {
      .content { padding: 20px; }
      .otp-box { font-size: 24px; padding: 12px 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Verify Your Email</h1>
    </div>
    <div class="content">
      <h2>Welcome to LearnStream LMS</h2>
      <p>To complete your sign-up and start exploring our courses, please verify your email using the OTP below:</p>
      <div class="otp-box">${otp}</div>
      <p>This code is valid for <strong>10 minutes</strong>. Do not share it with anyone for security reasons.</p>
      <div class="cta">
        <a href="#">Go to LearnStream</a>
      </div>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} DMC LMS. All rights reserved.<br />
      You’re receiving this email because you attempted to sign up or log in to LearnStream.
    </div>
  </div>
</body>
</html>
`;
};
