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
      ? locationLink ? 'View on Google Maps' : 'To be discussed'
      : atHome ? 'At client\'s home' : 'At our location';

    const sender = new Sender('senchoo84@gmail.com', 'Authentic Tantra');

    // Prepare variables for the email templates
    const variables = [
      {
        email: email,
        substitutions: [
          { var: 'name', value: name },
          { var: 'email', value: email },
          { var: 'phone', value: phone },
          { var: 'service', value: service },
          { var: 'date', value: date },
          { var: 'time', value: time },
          { var: 'message', value: message || '' },
          { var: 'locationLink', value: locationLink || '' }
        ]
      }
    ];

    // Add conditional variables based on booking type
    if (!isEventBooking) {
      variables[0].substitutions.push(
        { var: 'sessionType', value: sessionType },
        { var: 'location', value: location },
        { var: 'price', value: formData.price || '' }
      );
    } else {
      variables[0].substitutions.push(
        { var: 'duration', value: duration }
      );
    }

    // Client email
    const emailToClient = {
      from: sender,
      to: [new Recipient(email, name)],
      template_id: clientTemplateId,
      variables: variables
    };

    // Teacher email
    const emailToTeacher = {
      from: sender,
      to: [new Recipient('Abakova.sabina@gmail.com', 'Sabina Abakova')],
      template_id: '3yxj6lj5znqgdo2r',
      variables: variables
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