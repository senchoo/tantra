const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  console.log('Function triggered');
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  console.log('API Key:', process.env.SENDGRID_API_KEY ? 'Present' : 'Missing');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  try {
    const { name, email, phone, date, time, message, service, isOnline, atHome, price, priceNote } = JSON.parse(event.body);
    
    // Determine session type and location text
    const session_type = isOnline ? 'Online' : 'In-Person';
    const location = !isOnline && atHome ? 'At your home' : 'At our location';

    // Format price display
    const priceDisplay = priceNote 
      ? `$${price} ${priceNote}` 
      : `$${price}`;

    // Email to customer using template
    const customerEmail = {
      to: email,
      from: {
        email: 'a.enns@talent-butler.de',
        name: 'Authentic Tantra'
      },
      subject: `Authentic Tantra - Your ${service} Booking Confirmation`,
      templateId: 'd-b9837fe078c442ef9ae4cf639ebb71d0',
      dynamicTemplateData: {
        name,
        service,
        date,
        time,
        session_type,
        location: !isOnline ? location : null,
        message,
        price: priceDisplay
      }
    };

    // Email to teacher using template
    const teacherEmail = {
      to: 'Abakova.sabina@gmail.com',
      from: {
        email: 'a.enns@talent-butler.de',
        name: 'Authentic Tantra'
      },
      subject: `New Booking: ${service} with ${name}`,
      templateId: 'd-b8e3bcce40064d1eabd8e48be3eef0ae',
      dynamicTemplateData: {
        name,
        email,
        phone,
        service,
        date,
        time,
        session_type,
        location: !isOnline ? location : null,
        message,
        price: priceDisplay
      }
    };

    // Send both emails
    await Promise.all([
      sgMail.send(customerEmail),
      sgMail.send(teacherEmail)
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Booking confirmation emails sent successfully' })
    };
  } catch (error) {
    console.error('Error sending emails:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send booking confirmation emails' })
    };
  }
};