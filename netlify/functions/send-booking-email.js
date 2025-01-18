const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const formData = JSON.parse(event.body);
    const { name, email, phone, date, time, message, service, isOnline, atHome, duration, locationLink } = formData;

    // Determine if this is an event booking
    const isEventBooking = service.includes('Event');

    // Set up variables based on booking type
    let clientTemplateId = isEventBooking ? '3vz9dle21r7lkj50' : 'pq3enl6qx5842vwr';
    
    // Format session type and location for display
    const sessionType = isEventBooking ? null : (isOnline ? 'Online' : 'In-person');
    const location = isEventBooking 
      ? (locationLink ? `<a href="${locationLink}">View on Google Maps</a>` : 'To be discussed')
      : (atHome ? (locationLink ? `<a href="${locationLink}">At client's home</a>` : 'At client\'s home') : 'At our location');

    // Client email data
    const clientData = isEventBooking ? {
      name,
      email,
      phone,
      service,
      date,
      time,
      location,
      duration,
      message: message || ''
    } : {
      name,
      email,
      phone,
      service,
      date,
      time,
      sessionType,
      location,
      price: formData.price,
      message: message || ''
    };

    // Client email
    const emailToClient = {
      from: {
        email: 'noreply@trial-351ndgwxzpq4zqx8.mlsender.net',
        name: 'Authentic Tantra'
      },
      to: [{
        email: email,
        name: name
      }],
      subject: 'Your Booking Request with Authentic Tantra',
      template_id: clientTemplateId,
      personalization: [{
        email: email,
        data: clientData
      }]
    };

    // Teacher email data is the same as client data
    // Teacher email
    const emailToTeacher = {
      from: {
        email: 'noreply@trial-351ndgwxzpq4zqx8.mlsender.net',
        name: 'Authentic Tantra'
      },
      to: [{
        email: 'senchoo84@gmail.com',
        name: 'Sabina Abakova'
      }],
      subject: 'New Booking Request Received',
      template_id: '3yxj6lj5znqgdo2r',
      personalization: [{
        email: 'senchoo84@gmail.com',
        data: clientData
      }]
    };

    // Send both emails
    await Promise.all([
      mailerSend.email.send(emailToClient),
      mailerSend.email.send(emailToTeacher)
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Booking confirmation emails sent successfully' })
    };
  } catch (error) {
    console.error('Error details:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send booking confirmation emails',
        details: error.message 
      })
    };
  }
};