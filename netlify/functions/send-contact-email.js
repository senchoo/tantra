const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  console.log('Contact form function triggered');
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  console.log('API Key:', process.env.SENDGRID_API_KEY ? 'Present' : 'Missing');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  try {
    console.log('Parsing request body');
    const { name, email, message } = JSON.parse(event.body);
    console.log('Form data received:', { name, email, message });

    // Email to teacher
    const emailToSend = {
      to: 'Abakova.sabina@gmail.com',  // Your email address
      from: 'a.enns@talent-butler.de',  // Your verified sender
      subject: 'New Contact Form Submission - Sacred Journey',
      html: `
        <h1>New Contact Form Message</h1>
        <h2>From:</h2>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
        </ul>
        <h2>Message:</h2>
        <p>${message}</p>
      `
    };

    await sgMail.send(emailToSend);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message' })
    };
  }
};