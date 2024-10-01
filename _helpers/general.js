function generateCode(length) 
{    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    let code = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
  
    return code;
}

function generateOTP(length) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }
  
    return otp;
}

function getCurrentUrl(req,res) {
  const currentUrl = `${req.protocol}://${req.get('host')}`;
  return currentUrl;
}

module.exports = {
    generateCode,
    generateOTP,
    getCurrentUrl
};