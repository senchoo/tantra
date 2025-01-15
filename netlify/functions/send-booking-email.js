const sgMail = require('@sendgrid/mail');

const emailContent = {
  en: {
    subject: {
      customer: "Authentic Tantra - Your {service} booking confirmation",
      teacher: "New Booking: {service} with {name}"
    },
    currency: "$"
  },
  ru: {
    subject: {
      customer: "Authentic Tantra - Подтверждение запроса {service}",
      teacher: "Новый запрос: {service} от {name}"
    },
    currency: "₽"
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
    
    const { name, email, phone, date, time, message, service, duration, language } = formData;
    
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
        duration,
        message
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
        duration,
        message
      }
    };

    await Promise.all([
      sgMail.send(customerEmail),
      sgMail.send(teacherEmail)
    ]);

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
};