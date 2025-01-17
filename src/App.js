// =============== PART 1 - IMPORTS AND DATA ===============

import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { User, Phone, Mail, Heart, Users, Menu, X, MessageCircle, Send, Calendar, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import TelegramButton from './TelegramButton';

// Import images
import privateSessionImage from './images/private-session.jpg';
import couplesImage from './images/couples.jpg';
import groupClassImage from './images/group-class.jpg';

import eventsImage from './images/events.jpg';
import heroImage from './images/hero-image.jpg';
import profileImage from './images/profile.jpg';
import ukFlag from './images/uk-flag.png';
import ruFlag from './images/ru-flag.png';

// Language Context
const LanguageContext = createContext();

// TESTIMONIALS
const testimonialData = {
  en: [
    {
      id: 1,
      videoId: "4hvzr1qpxjk", // e.g., "dQw4w9WgXcQ" from https://youtube.com/watch?v=dQw4w9WgXcQ
      studentName: "Sarah",
      text: "The journey with Authentic Tantra transformed my understanding of self-love and connection."
    },
    {
      id: 2,
      videoId: "wSlpH0K4ycs",
      studentName: "Malika",
      text: "These sessions helped me discover a deeper spiritual connection I never knew existed."
    },
    {
      id: 3,
      videoId: "KUzDFe7kKIE",
      studentName: "Helmut",
      text: "These sessions helped me discover a deeper spiritual connection I never knew existed."
    },
    {
      id: 4,
      videoId: "2iIY2MMqI5s",
      studentName: "Lena",
      text: "These sessions helped me discover a deeper spiritual connection I never knew existed."
    },
    {
      id: 5,
      videoId: "uHwunmHfNn8", 
      studentName: "Daniel",
      text: "These sessions helped me discover a deeper spiritual connection I never knew existed."
    }
  ],
  ru: [
    {
      id: 1,
      videoId: "Y4hvzr1qpxjk",
      studentName: "Сара.",
      text: "Путешествие с Authentic Tantra преобразило мое понимание любви к себе и связи с другими."
    },
    {
      id: 2,
      videoId: "wSlpH0K4ycs",
      studentName: "Малика",
      text: "These sessions helped me discover a deeper spiritual connection I never knew existed."
    },
    {
      id: 3,
      videoId: "KUzDFe7kKIE",
      studentName: "Хельмут",
      text: "These sessions helped me discover a deeper spiritual connection I never knew existed."
    },
    {
      id: 4,
      videoId: "2iIY2MMqI5s", 
      studentName: "Лена",
      text: "These sessions helped me discover a deeper spiritual connection I never knew existed."
    },
    {
      id: 5,
      videoId: "uHwunmHfNn8", 
      studentName: "Даниел",
      text: "These sessions helped me discover a deeper spiritual connection I never knew existed."
    }
  ]
};

// Translations
const translations = {
  en: {
    currency: 'USD',
    currencySymbol: '$',
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact'
    },
    hero: {
      title: 'Discover your inner harmony',
      subtitle: 'Experience transformative tantra sessions tailored to your journey of self-discovery and spiritual growth.',
      bookButton: 'Book a Session',
      consultButton: 'Free Consultation'
    },
    services: {
      title: 'My Services',
      privateSession: {
        title: 'Private Sessions',
        description: 'One-on-one guidance tailored to your personal journey and goals.',
        price: '250',
        fullDescription: 'Experience a deeply transformative one-on-one session designed to meet you exactly where you are on your journey. Our private sessions offer a safe, nurturing space for personal exploration and growth through traditional tantra practices.',
        benefits: [
          'Personalized attention and guidance',
          'Custom-tailored practices for your needs',
          'Private, confidential environment',
          'Flexible scheduling options'
        ],
        includes: [
          '90-minute session',
          'Pre-session consultation',
          'Personalized practice recommendations',
          'Post-session integration guidance'
        ]
      },
      couplesSession: {
        title: 'Couples Sessions',
        description: 'Deepen your connection and explore sacred intimacy together.',
        price: '400',
        fullDescription: 'Strengthen your relationship through the sacred practices of tantra. Our couples sessions help you and your partner develop deeper intimacy, trust, and understanding while exploring the spiritual dimensions of your connection.',
        benefits: [
          'Enhanced emotional intimacy',
          'Improved communication',
          'Deeper spiritual connection',
          'Strengthened relationship bond'
        ],
        includes: [
          '2-hour couple session',
          'Joint consultation',
          'Practical exercises to take home',
          'Follow-up support'
        ]
      },
      groupSession: {
        title: 'Group Sessions',
        description: 'Share and learn in a supportive community environment.',
        price: '50',
        priceNote: 'per person (8-14 people)',
        fullDescription: 'Join our vibrant community in exploring tantra through group sessions. These classes offer a unique opportunity to learn and grow alongside others while maintaining personal boundaries and comfort levels.',
        benefits: [
          'Community support and connection',
          'Shared learning experience',
          'Affordable pricing',
          'Regular practice schedule'
        ],
        includes: [
          'Weekly 2-hour sessions',
          'Beginner-friendly instruction',
          'Community support',
          'Monthly workshops'
        ]
      },
      eventBooking: {
        title: 'Event Bookings',
        description: 'Book me as a speaker, ecstatic dance facilitator, or tantra instructor for your event.',
        fullDescription: 'Elevate your event with transformative tantra teachings, ecstatic dance experiences, or insightful speaking engagements. I bring years of expertise and a passionate approach to creating memorable, impactful experiences for your audience.',
        benefits: [
          'Experienced public speaker',
          'Ecstatic dance facilitation',
          'Tantra workshop leadership',
          'Customized event programming'
        ],
        includes: [
          'Pre-event consultation',
          'Customized content creation',
          'Professional presentation',
          'Post-event integration support'
        ]
      }
    },
    about: {
      title: 'About Me',
      content: [
        'After having lived over 5 years in Bali where the art of Tantra has completely transformed my life, I have dedicated my life to helping others discover their true potential through sacred practices. Having guided more than 1,000 individuals in group sessions and numerous couples on their journey to deeper connection, I bring both expertise and heartfelt dedication to every session.',
        'My practice combines traditional tantra teachings with ecstatic dance facilitation, creating unique experiences that open pathways to enhanced intimacy and self-discovery. Through private sessions, couple consultations, and regular appearances at transformational events, I have witnessed countless breakthroughs in personal growth and relationship dynamics. Whether you are seeking to deepen your connection with yourself, enhance your relationship, or explore the transformative power of tantra, I offer a safe and nurturing space for your journey.',
        'Let us explore together how these ancient practices can bring more harmony, joy, and authenticity into your life.'
      ]
    },
    contact: {
      title: 'Get in Touch',
      //subtitle: 'Contact Information',
      email: 'Abakova.sabina@gmail.com',
      phone: '+7-953-463-5742',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        submit: 'Send Message'
      }
    }
  },
  ru: {
    currency: 'RUB',
    currencySymbol: '₽',
    nav: {
      home: 'Главная',
      services: 'Услуги',
      about: 'Обо мне',
      contact: 'Контакты'
    },
    hero: {
      title: 'Откройте внутреннюю гармонию',
      subtitle: 'Испытайте трансформирующие сессии тантры, созданные для вашего пути самопознания и духовного роста.',
      bookButton: 'Записаться',
      consultButton: 'Бесплатная консультация'
    },
    services: {
      title: 'Мои Услуги',
      privateSession: {
        title: 'Индивидуальные Сессии',
        description: 'Индивидуальное руководство, адаптированное к вашему личному пути и целям.',
        price: '25.000',
        fullDescription: 'Испытайте глубоко трансформирующую индивидуальную сессию, разработанную специально для вас. Наши частные сессии предлагают безопасное, питающее пространство для личного исследования и роста через традиционные практики тантры.',
        benefits: [
          'Персональное внимание и руководство',
          'Практики, адаптированные под ваши потребности',
          'Приватная, конфиденциальная обстановка',
          'Гибкое расписание'
        ],
        includes: [
          '90-минутная сессия',
          'Предварительная консультация',
          'Персональные рекомендации по практике',
          'Пост-сессионное сопровождение'
        ]
      },
      couplesSession: {
        title: 'Парные Сессии',
        description: 'Углубите вашу связь и исследуйте священную близость вместе.',
        price: '40.000',
        fullDescription: 'Укрепите ваши отношения через священные практики тантры. Наши парные сессии помогают вам и вашему партнеру развить более глубокую близость, доверие и понимание.',
        benefits: [
          'Усиление эмоциональной близости',
          'Улучшение коммуникации',
          'Более глубокая духовная связь',
          'Укрепление отношений'
        ],
        includes: [
          '2-часовая парная сессия',
          'Совместная консультация',
          'Практические упражнения для дома',
          'Последующая поддержка'
        ]
      },
      groupSession: {
        title: 'Групповые Сессии',
        description: 'Обучайтесь и развивайтесь в поддерживающей среде единомышленников.',
        price: '5.000',
        priceNote: 'за человека (8-14 человек)',
        fullDescription: 'Присоединяйтесь к нашему сообществу в изучении тантры через групповые занятия. Эти классы предлагают уникальную возможность учиться и расти вместе с другими.',
        benefits: [
          'Поддержка сообщества',
          'Совместный опыт обучения',
          'Доступная цена',
          'Регулярное расписание'
        ],
        includes: [
          'Еженедельные 2-часовые занятия',
          'Обучение для начинающих',
          'Поддержка сообщества',
          'Ежемесячные воркшопы'
        ]
      },
      eventBooking: {
        title: 'Организация Мероприятий',
        description: 'Пригласите меня в качестве спикера, ведущей экстатических танцев или инструктора по тантре.',
        fullDescription: 'Поднимите ваше мероприятие на новый уровень с трансформационными учениями тантры, опытом экстатических танцев или вдохновляющими выступлениями. Я привношу годы экспертизы и страстный подход к созданию запоминающихся, впечатляющих событий для вашей аудитории.',
        benefits: [
          'Опытный публичный спикер',
          'Ведущая экстатических танцев',
          'Мастер тантрических практик',
          'Индивидуальная программа мероприятий'
        ],
        includes: [
          'Предварительная консультация',
          'Создание индивидуального контента',
          'Профессиональная презентация',
          'Поддержка после мероприятия'
        ]
      }
    },
    about: {
      title: 'Обо Мне',
      content: [
        'Прожив более 5 лет на Бали, где искусство Тантры полностью преобразило мою жизнь, я посвятила себя помощи другим в раскрытии их истинного потенциала через священные практики. Проведя занятия с более чем 1000 участников в групповых сессиях и множеством пар на их пути к более глубокой связи, я привношу как экспертизу, так и искреннюю преданность в каждую сессию.',
        'Моя практика сочетает традиционные учения тантры с проведением экстатических танцев, создавая уникальный опыт, открывающий пути к усилению близости и самопознанию. Через частные сессии, консультации для пар и регулярные выступления на трансформационных мероприятиях, я была свидетелем бесчисленных прорывов в личностном росте и динамике отношений. Ищете ли вы углубления связи с собой, улучшения отношений или изучения трансформирующей силы тантры, я предлагаю безопасное и поддерживающее пространство для вашего путешествия.',
        'Давайте вместе исследуем, как эти древние практики могут принести больше гармонии, радости и аутентичности в вашу жизнь.'
      ]
    },
    contact: {
      title: 'Свяжитесь со мной',
      //subtitle: 'Контакт',
      email: 'Abakova.sabina@gmail.com',
      phone: '+7-953-463-5742',
      form: {
        name: 'Ваше Имя',
        email: 'Електронная почта',
        message: 'Ваше Сообщение',
        submit: 'Отправить'
      }
    }
  }
};

// Create service data structure
const createServicesData = (lang) => [
  {
    icon: <User className="w-6 h-6 text-purple-600" />,
    title: translations[lang].services.privateSession.title,
    description: translations[lang].services.privateSession.description,
    price: translations[lang].services.privateSession.price,
    image: privateSessionImage,
    fullDescription: translations[lang].services.privateSession.fullDescription,
    benefits: translations[lang].services.privateSession.benefits,
    includes: translations[lang].services.privateSession.includes
  },
  {
    icon: <Heart className="w-6 h-6 text-purple-600" />,
    title: translations[lang].services.couplesSession.title,
    description: translations[lang].services.couplesSession.description,
    price: translations[lang].services.couplesSession.price,
    image: couplesImage,
    fullDescription: translations[lang].services.couplesSession.fullDescription,
    benefits: translations[lang].services.couplesSession.benefits,
    includes: translations[lang].services.couplesSession.includes
  },
  {
    icon: <Users className="w-6 h-6 text-purple-600" />,
    title: translations[lang].services.groupSession.title,
    description: translations[lang].services.groupSession.description,
    price: translations[lang].services.groupSession.price,
    priceNote: translations[lang].services.groupSession.priceNote,
    image: groupClassImage,
    fullDescription: translations[lang].services.groupSession.fullDescription,
    benefits: translations[lang].services.groupSession.benefits,
    includes: translations[lang].services.groupSession.includes
  },
  {
    icon: <Calendar className="w-6 h-6 text-purple-600" />,
    title: translations[lang].services.eventBooking.title,
    description: translations[lang].services.eventBooking.description,
    image: eventsImage,
    fullDescription: translations[lang].services.eventBooking.fullDescription,
    benefits: translations[lang].services.eventBooking.benefits,
    includes: translations[lang].services.eventBooking.includes
  }
];


const tantraInfo = {
  en: {
    whatIsTantra: {
      title: "What is Tantra?",
      content: [
        "Tantra is an ancient spiritual practice that goes far beyond its popular association with sexuality. At its core, Tantra is about connection - connection with yourself, with others, and with the universal energy that flows through all things.",
        "This sacred practice combines meditation, breathwork, mindful movement, and energy work to help you achieve deeper levels of awareness and presence. Through Tantra, you learn to embrace all aspects of yourself and life, transforming everyday experiences into opportunities for growth and enlightenment.",
        "Traditional Tantra teaches us that our body is a temple, and through conscious practices, we can unlock its wisdom and healing potential. It's about bringing consciousness to every moment, whether in stillness or in movement, in solitude or in relationship."
      ],
      benefits: [
        "Enhanced self-awareness and presence",
        "Deeper connection with yourself and others",
        "Increased energy and vitality",
        "Better understanding of your body and emotions",
        "Relief from stress and anxiety",
        "Improved emotional regulation",
        "Greater sense of inner peace"
      ]
    },
    isTantraForMe: {
      title: "Is Tantra for Me?",
      content: [
        "Tantra is for anyone seeking deeper connection, personal growth, and a more authentic way of being. Whether you're dealing with specific challenges or simply want to explore your full potential, Tantra offers tools and practices that can enhance every aspect of your life.",
      ],
      benefitsList1: [
        "Feel disconnected from yourself or others",
        "Are seeking more meaningful relationships",
        "Want to overcome emotional blocks",
        "Are experiencing stress or anxiety",
        "Seek to enhance your spiritual practice",
        "Want to live with more presence and awareness",
        "Are healing from past experiences"
      ],
      midContent: [
        "Tantra meets you exactly where you are on your journey. Whether you're completely new to spiritual practices or have years of experience, the principles of Tantra can be adapted to your unique needs and circumstances.",
      ],
      benefitsList2: [
        "Greater self-acceptance and confidence",
        "More fulfilling relationships",
        "Enhanced emotional awareness",
        "Increased energy and vitality",
        "Deeper spiritual connection",
        "Better stress management",
        "More joy and pleasure in daily life"
      ]
    }
  },
  ru: {
    whatIsTantra: {
      title: "Что такое Тантра?",
      content: [
        "Тантра - это древняя духовная практика, которая выходит далеко за рамки её популярной ассоциации с сексуальностью. В своей основе Тантра - это о связи: связи с собой, с другими и с универсальной энергией, которая течёт через всё сущее.",
        "Эта священная практика сочетает в себе медитацию, дыхательные техники, осознанное движение и работу с энергией, помогая достичь более глубоких уровней осознанности и присутствия. Через Тантру вы учитесь принимать все аспекты себя и жизни, превращая повседневный опыт в возможности для роста и просветления.",
        "Традиционная Тантра учит нас, что наше тело - это храм, и через осознанные практики мы можем раскрыть его мудрость и целительный потенциал. Речь идёт о привнесении осознанности в каждый момент, будь то в покое или в движении, в одиночестве или в отношениях."
      ],
      benefits: [
        "Повышенная самоосознанность и присутствие",
        "Более глубокая связь с собой и другими",
        "Увеличение энергии и витальности",
        "Лучшее понимание своего тела и эмоций",
        "Облегчение стресса и тревоги",
        "Улучшенная эмоциональная регуляция",
        "Большее чувство внутреннего покоя"
      ]
    },
    isTantraForMe: {
      title: "Подходит ли мне Тантра?",
      content: [
        "Тантра подходит каждому, кто ищет более глубокую связь, личностный рост и более аутентичный способ существования. Независимо от того, сталкиваетесь ли вы с конкретными проблемами или просто хотите исследовать свой полный потенциал, Тантра предлагает инструменты и практики, которые могут улучшить каждый аспект вашей жизни.",
      ],
      benefitsList1: [
        "Чувствуете отсоединение от себя или других",
        "Ищете более глубокие отношения",
        "Хотите преодолеть эмоциональные блоки",
        "Испытываете стресс или тревогу",
        "Стремитесь углубить свою духовную практику",
        "Хотите жить более осознанно",
        "Исцеляетесь от прошлого опыта"
      ],
      midContent: [
        "Тантра встречает вас именно там, где вы находитесь на своём пути. Независимо от того, совершенно ли вы новичок в духовных практиках или имеете многолетний опыт, принципы Тантры могут быть адаптированы к вашим уникальным потребностям и обстоятельствам.",
      ],
      benefitsList2: [
        "Большее самопринятие и уверенность",
        "Более полноценные отношения",
        "Усиленную эмоциональную осознанность",
        "Повышенную энергию и витальность",
        "Более глубокую духовную связь",
        "Лучшее управление стрессом",
        "Больше радости и удовольствия в повседневной жизни"
      ]
    }
  }
};


// =============== PART 2 - COMPONENTS ===============
// =============== PART 2 - COMPONENTS ===============
// =============== PART 2 - COMPONENTS ===============
// =============== PART 2 - COMPONENTS ===============
// =============== PART 2 - COMPONENTS ===============
// =============== PART 2 - COMPONENTS ===============



const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`p-1 rounded ${language === 'en' ? 'ring-2 ring-purple-600' : ''}`}
      >
        <img src={ukFlag} alt="English" className="w-8 h-8 rounded" />
      </button>
      <button
        onClick={() => setLanguage('ru')}
        className={`p-1 rounded ${language === 'ru' ? 'ring-2 ring-purple-600' : ''}`}
      >
        <img src={ruFlag} alt="Russian" className="w-8 h-8 rounded" />
      </button>
    </div>
  );
};


const TestimonialsSection = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = testimonialData[language];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-8">
          {language === 'en' ? 'Testimonials' : 'Отзывы'}
        </h2>
        
        <div className="relative">
          {/* YouTube Video Container */}
          <div className="aspect-video relative rounded-lg overflow-hidden shadow-xl">
            <iframe
              src={`https://www.youtube.com/embed/${testimonials[currentIndex].videoId}?rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Testimonial Text */}
        <div className="mt-8 text-center">
          <p className="text-xl font-light italic mb-4">
            "{testimonials[currentIndex].text}"
          </p>
          <p className="text-lg font-medium text-purple-600">
            {testimonials[currentIndex].studentName}
          </p>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const BookingForm = ({ service, onClose, language }) => {
  const isEventBooking = service.title === translations[language].services.eventBooking.title;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    date: '',
    time: '',
    duration: '',
    isOnline: null,
    atHome: false
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dateError, setDateError] = useState('');

  const timeSlots = [
    "09:00", "10:30", "12:00", "13:30", 
    "15:00", "16:30", "18:00", "19:30"
  ];

  const validateDate = (selectedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const chosen = new Date(selectedDate);
    return chosen >= today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // date validation

    if (!validateDate(formData.date)) {
      alert(language === 'en' 
        ? 'Please select a future date.'
        : 'Пожалуйста, выберите дату в будущем.');
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: service.title
        }),
      });

      if (response.ok) {
        alert(language === 'en' 
          ? 'Booking request sent successfully! Check your email for confirmation.'
          : 'Запрос на бронирование успешно отправлен! Проверьте письмо с подтверждением.');
        onClose();
      } else {
        throw new Error('Failed to send booking request');
      }
    } catch (error) {
      alert(language === 'en'
        ? 'Failed to send booking request. Please try again or contact us directly.'
        : 'Не удалось отправить запрос на бронирование. Пожалуйста, попробуйте снова или свяжитесь с нами напрямую.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder={language === 'en' ? "Your Name" : "Ваше Имя"}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />

        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          placeholder={language === 'en' ? "Mobile Number" : "Номер Телефона"}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />

        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder={language === 'en' ? "Email Address" : "Email Адрес"}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700">
            {language === 'en' ? "Select Date" : "Выберите Дату"}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
              className="w-full p-3 pl-12 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>

        <select
          value={formData.time}
          onChange={(e) => setFormData({...formData, time: e.target.value})}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        >
          <option value="">
            {language === 'en' ? "Select Time" : "Выберите Время"}
          </option>
          {timeSlots.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        {isEventBooking ? (
          <select
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            <option value="">
              {language === 'en' ? "Select Duration (hours)" : "Выберите Продолжительность (часы)"}
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="whole_day">{language === 'en' ? "Whole Day" : "Весь день"}</option>
          </select>
        ) : (
          <>
            <div className="flex items-center justify-center gap-12">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sessionType"
                  checked={formData.isOnline === false}
                  onChange={() => setFormData({...formData, isOnline: false})}
                  className="w-5 h-5 text-purple-600"
                  required
                />
                <span className="text-lg">
                  {language === 'en' ? 'In-Person Session' : 'Очная Сессия'}
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sessionType"
                  checked={formData.isOnline === true}
                  onChange={() => setFormData({...formData, isOnline: true})}
                  className="w-5 h-5 text-purple-600"
                  required
                />
                <span className="text-lg">
                  {language === 'en' ? 'Online Session' : 'Онлайн Сессия'}
                </span>
              </label>
            </div>

            {formData.isOnline === false && (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.atHome}
                  onChange={(e) => setFormData({...formData, atHome: e.target.checked})}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">
                  {language === 'en' 
                    ? "I would like the session at my home" 
                    : "Я хочу провести сессию у себя дома"}
                </span>
              </label>
            )}
          </>
        )}

        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          placeholder={isEventBooking 
            ? (language === 'en' 
              ? "Please describe your event and requirements..." 
              : "Пожалуйста, опишите ваше мероприятие и требования...")
            : (language === 'en' 
              ? "Message (optional)" 
              : "Сообщение (необязательно)")
          }
          required={isEventBooking}
          className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
          {language === 'en' 
            ? 'Booking request sent successfully! Check your email for confirmation.'
            : 'Запрос на бронирование успешно отправлен! Проверьте письмо с подтверждением.'}
        </div>
      )}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {language === 'en' ? "Confirm Request" : "Подтвердить Запрос"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-white hover:bg-gray-50 px-6 py-4 rounded-lg transition-colors border border-gray-300"
        >
          {language === 'en' ? "Cancel" : "Отмена"}
        </button>
      </div>
    </form>
  );

};
const TantraInfo = ({ type, onClose }) => {
  const { language } = useContext(LanguageContext);
  const info = tantraInfo[language][type];

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-[90vw] max-w-[1000px] h-[80vh] flex flex-col"
        onClick={handleContentClick}
      >
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-semibold">{info.title}</h3>
              <button
                onClick={onClose}
                className="bg-white hover:bg-gray-50 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6 text-gray-600">
              {info.content && info.content.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">{paragraph}</p>
              ))}

              {info.benefits && (
                <div className="mt-8">
                  <h4 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Benefits:' : 'Преимущества:'}
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {info.benefits.map((benefit, index) => (
                      <li key={index} className="text-lg text-gray-600 pl-2">{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {info.benefitsList1 && (
                <>
                  <p className="text-lg font-medium">
                    {language === 'en' ? 'You might find Tantra particularly beneficial if you:' : 'Тантра может быть особенно полезна, если вы:'}
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    {info.benefitsList1.map((item, index) => (
                      <li key={index} className="text-lg text-gray-600 pl-2">{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {info.midContent && info.midContent.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">{paragraph}</p>
              ))}

              {info.benefitsList2 && (
                <>
                  <p className="text-lg font-medium">
                    {language === 'en' ? 'Through regular practice, you may experience:' : 'Через регулярную практику вы можете испытать:'}
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    {info.benefitsList2.map((item, index) => (
                      <li key={index} className="text-lg text-gray-600 pl-2">{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-white hover:bg-gray-50 px-6 py-3 rounded-lg transition-colors border border-gray-300 text-lg"
            >
              {language === 'en' ? 'Close' : 'Закрыть'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceDetails = ({ service, onClose }) => {
  const { language } = useContext(LanguageContext);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleBooking = () => {
    setShowBookingForm(true);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-[90vw] max-w-[1200px] h-[85vh] flex flex-col"
        onClick={handleContentClick}
      >
        {!showBookingForm ? (
          <>
            <div className="relative h-[35vh]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 text-lg mb-8">{service.fullDescription}</p>
                
                <div className="grid md:grid-cols-2 gap-12 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4">
                      {language === 'en' ? 'Benefits' : 'Преимущества'}
                    </h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="text-lg pl-2">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-4">
                      {language === 'en' ? 'Session Includes:' : 'Сессия включает:'}
                    </h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="text-lg pl-2">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-auto max-w-4xl mx-auto">
                {service.price && (
                  <div className="text-center mb-6">
                    <span className="text-2xl font-semibold text-purple-600">
                      {translations[language].currencySymbol}{service.price}
                      {service.priceNote && 
                        <span className="text-lg ml-2">({service.priceNote})</span>
                      }
                    </span>
                  </div>
                )}

                <div className="flex gap-6">
                  <button 
                    onClick={handleBooking}
                    className="flex-1 bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors text-lg"
                  >
                    {language === 'en' ? 'Schedule Session' : 'Запланировать Сессию'}
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-white hover:bg-gray-50 px-6 py-4 rounded-lg transition-colors border border-gray-300 text-lg"
                  >
                    {language === 'en' ? 'Close' : 'Закрыть'}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6">
                {language === 'en' 
                  ? `Schedule ${service.title}`
                  : `Запланировать ${service.title}`}
              </h3>
              <BookingForm
                service={service}
                onClose={() => {
                  setShowBookingForm(false);
                  onClose();
                }}
                language={language}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const ChatWidget = () => {
  const { language } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const welcomeMessage = language === 'en' 
      ? "Hi! I am Luna, your Authentic Tantra assistant. How can I help you today?"
      : "Привет! Я Луна, ваш ассистент. Как я могу помочь вам сегодня?";
    
    setMessages([{ sender: 'bot', text: welcomeMessage }]);
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Prevent background scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    
    setTimeout(() => {
      const response = language === 'en'
        ? "Thank you for your message! For now, I am in demo mode, but soon I will be able to help you with all your questions about our services and tantra practices."
        : "Спасибо за ваше сообщение! Пока я работаю в демо-режиме, но скоро я смогу помочь вам со всеми вопросами о наших услугах и практиках тантры.";
      
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 1000);

    setInputMessage('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 w-[85%] max-w-[320px] h-[500px] sm:w-[320px] bg-white rounded-lg shadow-xl flex flex-col z-60">
      <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-medium">Luna - Authentic-Tantra Assistant</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={language === 'en' ? "Type your message..." : "Введите сообщение..."}
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

  // =============== PART 3 - LANGUAGE PROVIDER ===============
  // =============== PART 3 - LANGUAGE PROVIDER ===============
  // =============== PART 3 - LANGUAGE PROVIDER ===============
  // =============== PART 3 - LANGUAGE PROVIDER ===============


const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [servicesData, setServicesData] = useState(createServicesData('en'));

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    setServicesData(createServicesData(language));
  }, [language]);

  const value = {
    language,
    setLanguage,
    translations,
    servicesData,
    tantraInfo
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className="relative">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

function AppContainer() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}

export default AppContainer;


  // =============== PART 4 - MAIN APP COMPONENT ===============
  // =============== PART 4 - MAIN APP COMPONENT ===============
  // =============== PART 4 - MAIN APP COMPONENT ===============
  // =============== PART 4 - MAIN APP COMPONENT ===============
  // =============== PART 4 - MAIN APP COMPONENT ===============
  // =============== PART 4 - MAIN APP COMPONENT ===============



function App() {
    const [infoType, setInfoType] = useState(null);
    const { language, translations, servicesData } = useContext(LanguageContext);
    const currentTranslations = translations[language];
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [selectedService, setSelectedService] = useState(null);
    const [contactForm, setContactForm] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    };
  
    const handleFormChange = (e) => {
      setContactForm({
        ...contactForm,
        [e.target.name]: e.target.value
      });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch('/.netlify/functions/send-contact-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactForm),
        });
    
        if (response) {
          setSubmitSuccess(true);
          setTimeout(() => {
            onClose();
          }, 2000); // Close after 2 seconds
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(language === 'en'
          ? 'Failed to send message. Please try again or contact us directly.'
          : 'Не удалось отправить сообщение. Пожалуйста, попробуйте снова или свяжитесь с нами напрямую.');
      }
    };
  
    return (
      <div className="min-h-screen bg-white-100">
        <LanguageSwitcher />
        
        {/* Navigation */}
        <nav className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-40">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
            <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => scrollToSection('home')}
      >
        <img 
          src="https://res.cloudinary.com/dooqdzwbb/image/upload/v1733408316/lotus-logo_lvzp9h.png" 
          alt="Mandala" 
          className="w-8 h-8 object-contain" // Added object-contain to maintain aspect ratio
        />
        <span className="text-2xl font-semibold text-purple-800"> 
          Authentic Tantra
        </span>
      </div>
  
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-purple-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
  
              <div className="hidden md:flex space-x-8">
                {Object.entries(currentTranslations.nav).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`${
                      activeSection === key ? 'text-purple-600' : 'text-gray-600'
                    } hover:text-purple-600 transition-colors`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
  
          {isMenuOpen && (
            <div className="md:hidden bg-white/90 border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {Object.entries(currentTranslations.nav).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`${
                      activeSection === key 
                        ? 'bg-purple-50 text-purple-600' 
                        : 'text-gray-600'
                    } block w-full px-3 py-2 rounded-md text-base text-left hover:bg-purple-50 hover:text-purple-600 transition-colors`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
  
        {/* Hero Section */}
        
      <section id="home" className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
            {currentTranslations.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {currentTranslations.hero.subtitle}
          </p>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="h-[180px]">
              <img
                src={heroImage}
                alt="Authentic Tantra Banner"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <button 
              onClick={() => setInfoType('whatIsTantra')}
              className="w-full bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors text-lg"
            >
              {language === 'en' ? 'What is Tantra?' : 'Что такое Тантра?'}
            </button>
            <button 
              onClick={() => setInfoType('isTantraForMe')}
              className="w-full bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors text-lg"
            >
              {language === 'en' ? 'Is Tantra for Me?' : 'Подходит ли мне Тантра?'}
            </button>
          </div>
        </div>
      </section>
      <TestimonialsSection language={language} />

      {/* Services Section */}

      <section id="services" className="py-12 bg-gray-100 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12 text-black">
            {currentTranslations.services.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-200"
                onClick={() => setSelectedService(service)}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Playfair Display font */}

      <section id="about" className="py-12 bg-white-500 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12 tx-lg">{currentTranslations.about.title}</h2>
          <div className="max-w-3xl mx-auto text-white-900 px-8 relative">
            <div className="md:float-right md:ml-8 md:mb-4 mb-8 text-center md:text-left">
              <img
                src={profileImage}
                alt="Tantra Teacher"
                className="w-72 h-72 mx-auto md:mx-0 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="font-playfair italic">
              <p className="leading-relaxed mb-6">
                {currentTranslations.about.content[0]}
              </p>
              <p className="leading-relaxed mb-6">
                {currentTranslations.about.content[1]}
              </p>
              <p className="leading-relaxed text-white-900 text-lg font-light">
                {currentTranslations.about.content[2]}
              </p>
            </div>
          </div>
        </div>
      </section>

  
        {/* Contact Section */}
        <section id="contact" className="py-12 bg-gray-200 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light text-center mb-12">{currentTranslations.contact.title}</h2>
            <div className="flex justify-center mb-8">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-medium">{currentTranslations.contact.subtitle}</h3>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <a href={`mailto:${currentTranslations.contact.email}`} className="hover:text-purple-600">
                    {currentTranslations.contact.email}
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <a href={`tel:${currentTranslations.contact.phone}`} className="hover:text-purple-600">
                    {currentTranslations.contact.phone}
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
  <Instagram className="w-5 h-5 text-purple-600" />
  <a 
    href="https://www.instagram.com/happiness.trainerrr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="hover:text-purple-600"
  >
    @happiness.trainerrr
  </a>
</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/90 p-6 rounded-lg shadow-sm col-span-2 max-w-xl mx-auto w-full">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleFormChange}
                    placeholder={currentTranslations.contact.form.name}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleFormChange}
                    placeholder={currentTranslations.contact.form.email}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleFormChange}
                    placeholder={currentTranslations.contact.form.message}
                    className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {currentTranslations.contact.form.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
  
        {/* Service Details Modal */}
        {selectedService && (
          <ServiceDetails 
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
         <ChatWidget />
         <TelegramButton />

      
         {/* Tantra Info Modal */}
      {infoType && (
        <TantraInfo 
          type={infoType}
          onClose={() => setInfoType(null)}
        />
      )}
      </div>
    );
  }