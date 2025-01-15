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
    
    // Create base email data
    const baseEmailData = {
      name: name,
      email: email,
      phone: phone,
      service: service,
      date: date,
      time: time,
      message: message || ''
    };

    // Add type-specific fields
    if (isEventBooking) {
      baseEmailData.duration = duration 
        ? (duration === 'whole_day' 
            ? (lang === 'en' ? 'Whole Day' : 'Весь день')
            : `${duration} ${lang === 'en' ? 'hours' : 'часов'}`)
        : '';
      // Notice: We don't add sessionType or price for event bookings
    } else {
      baseEmailData.location = atHome ? 'At client\'s home' : 'At our location';
    }

    const customerEmail = {
      to: email,
      from: {
        email: 'a.enns@talent-butler.de',
        name: 'Authentic Tantra'
      },
      templateId: 'd-b9837fe078c442ef9ae4cf639ebb71d0',
      dynamicTemplateData: baseEmailData
    };

    const teacherEmail = {
      to: 'Abakova.sabina@gmail.com',
      from: {
        email: 'a.enns@talent-butler.de',
        name: 'Authentic Tantra'
      },
      templateId: 'd-b8e3bcce40064d1eabd8e48be3eef0ae',
      dynamicTemplateData: baseEmailData
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
    
    //  Error logging

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