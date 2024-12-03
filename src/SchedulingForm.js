const SchedulingForm = ({ service, onClose, language }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    date: '',
    time: '',
    atHome: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For now, just console log the data
    console.log('Form submitted:', formData);
    alert(language === 'en' 
      ? 'Thank you for your booking request! We will contact you shortly.'
      : 'Спасибо за ваш запрос! Мы свяжемся с вами в ближайшее время.');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">
              {language === 'en' ? 'Schedule Session' : 'Запланировать Сессию'}
            </h3>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder={language === 'en' ? 'Your Name' : 'Ваше Имя'}
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
            
            <input
              type="tel"
              placeholder={language === 'en' ? 'Phone Number' : 'Номер Телефона'}
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />

            <input
              type="email"
              placeholder={language === 'en' ? 'Email Address' : 'Email Адрес'}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />

            <div className="flex gap-4">
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
              <input
                type="time"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.atHome}
                onChange={e => setFormData({...formData, atHome: e.target.checked})}
                className="w-4 h-4 text-purple-600"
              />
              <span>
                {language === 'en' 
                  ? 'I would like the session at my home' 
                  : 'Я хочу провести сессию у меня дома'}
              </span>
            </label>

            <textarea
              placeholder={language === 'en' ? 'Additional Message (optional)' : 'Дополнительное Сообщение (необязательно)'}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />

            <button 
              type="submit"
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {language === 'en' ? 'Confirm Request' : 'Подтвердить Запрос'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};