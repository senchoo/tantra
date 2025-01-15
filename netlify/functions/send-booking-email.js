const sgMail = require('@sendgrid/mail');

const emailContent = {
  en: {
    subject: {
      customer: "Authentic Tantra - Your {service} booking confirmation",
      teacher: "New Booking: {service} with {name}"
    },
    currency: "$",
    sessionType: {
      online: "Online",
      inPerson: "In person"
    },
    location: {
      home: "At your home",
      studio: "At our location"
    },
    duration: {
      whole_day: "Whole Day"
    }
  },
  ru: {
    subject: {
      customer: "Authentic Tantra - Подтверждение запроса {service}",
      teacher: "Новый запрос: {service} от {name}"
    },
    currency: "₽",
    sessionType: {
      online: "Онлайн",
      inPerson: "Офлайн"
    },
    location: {
      home: "У вас дома",
      studio: "В нашей студии"
    },
    duration: {
      whole_day: "Весь день"
    }
  }
};

exports.handler = async (event) => {
  console.log('Function triggered');
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  console.log('API Key:', process.env.SENDGRID_API_KEY ? 'Present' : 'Missing');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  try {
    const formData = JSON.parse(event.body);
    console.log('Received form data:', formData);
    
    const { name, email, phone, date, time, message, service, isOnline, atHome, price, priceNote, duration, language } = formData;
    console.log('Service:', service);
    console.log('Duration:', duration);
    
    // Check if this is an event booking
    const isEventBooking = service === 'Event Bookings' || service === 'Организация Мероприятий';
    console.log('Is event booking:', isEventBooking);

    // Determine session type and location text with translations
    const session_type = isEventBooking ? null : (isOnline 
      ? emailContent[language].sessionType.online 
      : emailContent[language].sessionType.inPerson);
    
    const location = !isEventBooking && !isOnline && atHome 
      ? emailContent[language].location.home 
      : emailContent[language].location.studio;

    // Format duration display
    const durationDisplay = duration === 'whole_day' 
      ? emailContent[language].duration.whole_day 
      : duration ? `${duration} ${language === 'en' ? 'hours' : 'часов'}` 
      : null;

    // Format price display with currency
    const currencySymbol = emailContent[language].currency;
    const priceDisplay = priceNote 
      ? `${currencySymbol}${price} ${priceNote}` 
      : `${currencySymbol}${price}`;

    // Email to customer
    const customerEmail = {
      to: email,
      from: {
        email: 'a.enns@talent-butler.de',
        name: 'Authentic Tantra'
      },
      subject: emailContent[language].subject.customer.replace('{service}', service),
      templateId: language === 'en' ? 'd-b9837fe078c442ef9ae4cf639ebb71d0' : 'd-9ce9cc3bfc1f49a880ef8dba6c68e04a',
      dynamicTemplateData: {
        name,
        service,
        date,
        time,
        duration: isEventBooking ? durationDisplay : null,
        session_type: !isEventBooking ? session_type : null,
        location: !isEventBooking && !isOnline ? location : null,
        message,
        price: priceDisplay,
        isEventBooking
      }
    };

    // Email to teacher
    const teacherEmail = {
      to: 'Abakova.sabina@gmail.com',
      from: {
        email: 'a.enns@talent-butler.de',
        name: 'Authentic Tantra'
      },
      subject: emailContent[language].subject.teacher
        .replace('{service}', service)
        .replace('{name}', name),
      templateId: language === 'en' ? 'd-Yb8e3bcce40064d1eabd8e48be3eef0ae' : 'd-b8e3bcce40064d1eabd8e48be3eef0ae',
      dynamicTemplateData: {
        name,
        email,
        phone,
        service,
        date,
        time,
        duration: isEventBooking ? durationDisplay : null,
        session_type: !isEventBooking ? session_type : null,
        location: !isEventBooking && !isOnline ? location : null,
        message,
        price: priceDisplay,
        isEventBooking
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
    console.log('Form data that caused error:', event.body);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send booking confirmation emails',
        details: error.message 
      })
    };
  }
}; // This closing bracket is for the exports.handler