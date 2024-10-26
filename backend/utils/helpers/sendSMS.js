import axios from 'axios';

/**
 * Send an SMS using send.lk
 * @param {string} to - The recipient's phone number
 * @param {string} message - The message body
 */
const sendSMS = async (to, message) => {
  try {
    const response = await axios.get('https://send.lk/sms/send.php', {
      params: {
        token: '1509|Y8kFWOl1AD0TBAZjZH3C5YJ1r9roIabTAHmFrPWn',
        to,
        from: 'DWT Edu msg',
        message,
      },
    });

    if (response.status === 200) {
      console.log('SMS sent successfully');
    } else {
      console.error('Failed to send SMS:', response.data);
    }
    console.log('SMS sent successfully');
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

export default sendSMS;


// import twilio from 'twilio';
// import dotenv from 'dotenv';

// dotenv.config();

// const accountSid = process.env.Twilio_Account_SID;
// const authToken = process.env.Twilio_Auth_Token;
// const client = twilio(accountSid, authToken);

// /**
//  * Send an SMS using Twilio
//  * @param {string} to - The recipient's phone number
//  * @param {string} body - The message body
//  */
// const sendSMS = async (to, body) => {
//   try {
//     await client.messages.create({
//       body,
//       from: '+94769836337',
//       to,
//     });
//     console.log('SMS sent successfully');
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//   }
// };

// export default sendSMS;