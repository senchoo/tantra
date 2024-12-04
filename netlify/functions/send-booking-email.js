const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  console.log('Function triggered');
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  console.log('API Key:', process.env.SENDGRID_API_KEY ? 'Present' : 'Missing');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  try {
    console.log('Parsing request body');
    const formData = JSON.parse(event.body);
    console.log('Form data received:', formData);

    const { name, email, phone, date, time, message, service, isOnline, atHome } = formData;

    // Email to customer
    const customerEmail = {
      to: email,
      from: 'a.enns@talent-butler.de',
      subject: 'Your Sacred Journey Session Booking',
      html: `
        <h1>Thank you for booking a session with Sacred Journey</h1>
        <p>Dear ${name},</p>
        <p>We have received your booking for the following session:</p>
        <ul>
          <li>Service: ${service}</li>
          <li>Date: ${date}</li>
          <li>Time: ${time}</li>
          ${isOnline !== undefined ? `<li>Session Type: ${isOnline ? 'Online' : 'In-Person'}</li>` : ''}
          ${atHome ? '<li>Location: At your home</li>' : ''}
        </ul>
        ${message ? `<p>Your message: ${message}</p>` : ''}
        <p>We will confirm your booking within 24 hours.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
      `
    };

    // Email to teacher
    const teacherEmail = {
      to: 'Abakova.sabina@gmail.com',
      from: 'a.enns@talent-butler.de',
      subject: 'New Session Booking',
      html: `
        <h1>New Session Booking Received</h1>
        <h2>Client Details:</h2>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li>Phone: ${phone}</li>
        </ul>
        <h2>Session Details:</h2>
        <ul>
          <li>Service: ${service}</li>
          <li>Date: ${date}</li>
          <li>Time: ${time}</li>
          ${isOnline !== undefined ? `<li>Session Type: ${isOnline ? 'Online' : 'In-Person'}</li>` : ''}
          ${atHome ? '<li>Location: At client\'s home</li>' : ''}
        </ul>
        ${message ? `<p>Client's message: ${message}</p>` : ''}
      `
    };

    // Send both emails
    await Promise.all([
      sgMail.send(customerEmail),
      sgMail.send(teacherEmail)
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Booking confirmation emails sent successfully'
      })
    };
  } catch (error) {
    console.error('Error sending emails:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send booking confirmation emails' })
    };
  }
};