// Replace your entire send-booking-email.js with this:

const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  console.log('Function triggered');
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  try {
    const formData = JSON.parse(event.body);
    console.log('Received form data:', formData);
    
    const { name, email, phone, date, time, message, service, isOnline, atHome, duration } = formData;
    
    // Determine session details
    const isEventBooking = service === 'Event Bookings' || service === 'Организация Мероприятий';
    const sessionType = isOnline ? 'Online' : 'In-person';
    const location = atHome ? 'At client\'s home' : 'At our location';
    const priceDisplay = isEventBooking ? null : formData.price || '';


    // Email to customer
    const customerEmail = {
      to: email,
      from: {
        email: 'a.enns@talent-butler.de',
        name: 'Authentic Tantra'
      },
      templateId: 'd-b9837fe078c442ef9ae4cf639ebb71d0',
      dynamicTemplateData: {
        name: name,
        email: email,
        phone: phone,
        service: service,
        date: date,
        time: time,
        message: message || '',
        sessionType: isEventBooking ? null : sessionType,
        location: isEventBooking ? null : location,
        duration: duration || '',
        price: isEventBooking ? null : priceDisplay
    }
    };

    // Email to teacher
    const teacherEmail = {
      to: 'senchoo84@gmail.com',
      from: {
        email: 'a.enns@talent-butler.de',
        name: 'Authentic Tantra'
      },
      templateId: 'd-b8e3bcce40064d1eabd8e48be3eef0ae',
      dynamicTemplateData: {
        name: name,
        email: email,
        phone: phone,
        service: service,
        date: date,
        time: time,
        message: message || '',
        sessionType: isEventBooking ? null : sessionType,
        location: isEventBooking ? null : location,
        duration: duration || '',
        price: isEventBooking ? null : priceDisplay
    }
    };

    console.log('Preparing to send emails...');
    await Promise.all([
      sgMail.send(customerEmail),
      sgMail.send(teacherEmail)
    ]);
    console.log('Emails sent successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Booking confirmation emails sent successfully' })
    };
  } catch (error) {
    console.error('Error details:', error);
    // Add these lines for better error logging
    if (error.response && error.response.body && error.response.body.errors) {
      console.error('SendGrid errors:', error.response.body.errors);
    }
    console.log('Form data that caused error:', event.body);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send booking confirmation emails',
        details: error.response?.body?.errors || error.message 
      })
    };
  }
};