import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeView, setActiveView] = useState<'landing' | 'crm'>('landing');
  const { toast } = useToast();

  const [newShipmentFrom, setNewShipmentFrom] = useState('');
  const [newShipmentTo, setNewShipmentTo] = useState('');
  const [newShipmentWeight, setNewShipmentWeight] = useState('');
  const [newShipmentCargoType, setNewShipmentCargoType] = useState('');
  const [newShipmentContact, setNewShipmentContact] = useState('');
  const [newShipmentNotes, setNewShipmentNotes] = useState('');

  const [newShipmentFrom, setNewShipmentFrom] = useState('');
  const [newShipmentTo, setNewShipmentTo] = useState('');
  const [newShipmentWeight, setNewShipmentWeight] = useState('');
  const [newShipmentCargoType, setNewShipmentCargoType] = useState('');
  const [newShipmentContact, setNewShipmentContact] = useState('');
  const [newShipmentNotes, setNewShipmentNotes] = useState('');
  const [calcDistance, setCalcDistance] = useState('500');
  const [calcWeight, setCalcWeight] = useState('1000');
  const [calcCargoType, setCalcCargoType] = useState('standard');
  const [calcUrgency, setCalcUrgency] = useState('normal');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const distance = parseFloat(calcDistance) || 0;
    const weight = parseFloat(calcWeight) || 0;
    const basePrice = distance * 35;
    const weightMultiplier = weight > 5000 ? 1.5 : weight > 2000 ? 1.3 : 1;
    const typeMultiplier = calcCargoType === 'fragile' ? 1.4 : calcCargoType === 'express' ? 1.8 : 1;
    const urgencyMultiplier = calcUrgency === 'urgent' ? 1.6 : calcUrgency === 'express' ? 2 : 1;
    const total = Math.round(basePrice * weightMultiplier * typeMultiplier * urgencyMultiplier);
    setCalculatedPrice(total);
  };

  const shipments = [
    { id: 'SHP-2401', from: 'Москва', to: 'Владивосток', status: 'В пути', progress: 65, lat: 55.7558, lng: 37.6173, cost: 125000 },
    { id: 'SHP-2402', from: 'Санкт-Петербург', to: 'Екатеринбург', status: 'Доставлен', progress: 100, lat: 56.8389, lng: 60.6057, cost: 45000 },
    { id: 'SHP-2403', from: 'Новосибирск', to: 'Казань', status: 'В пути', progress: 40, lat: 55.0084, lng: 82.9357, cost: 67000 },
    { id: 'SHP-2404', from: 'Краснодар', to: 'Москва', status: 'Ожидание', progress: 10, lat: 45.0355, lng: 38.9753, cost: 52000 },
  ];

  const pricingPlans = [
    { name: 'Старт', price: '9 990', shipments: '10', features: ['Отслеживание грузов', 'Базовая аналитика', 'Email поддержка'] },
    { name: 'Бизнес', price: '24 990', shipments: '50', features: ['Все из Старт', 'Расширенная аналитика', 'Приоритетная поддержка', 'API доступ'], popular: true },
    { name: 'Корпоративный', price: 'По запросу', shipments: 'Неограниченно', features: ['Все из Бизнес', 'Персональный менеджер', 'Кастомизация', 'SLA 99.9%'] },
  ];

  const faqs = [
    { q: 'Как начать работу с платформой?', a: 'Зарегистрируйтесь, выберите тарифный план и добавьте ваши первые грузоперевозки. Мы предоставим пошаговое руководство.' },
    { q: 'Можно ли интегрировать платформу с 1С?', a: 'Да, мы поддерживаем интеграцию с 1С через API. Документация доступна в личном кабинете.' },
    { q: 'Как рассчитывается стоимость доставки?', a: 'Стоимость автоматически рассчитывается на основе расстояния, типа груза, срочности и текущих тарифов перевозчиков.' },
    { q: 'Какие способы оплаты доступны?', a: 'Принимаем оплату по счету, банковской картой, через электронные кошельки и онлайн-банкинг.' },
  ];

  const stats = [
    { value: '2,450+', label: 'Активных грузов', icon: 'Package' },
    { value: '98.7%', label: 'Доставка в срок', icon: 'Clock' },
    { value: '150+', label: 'Партнеров', icon: 'Users' },
    { value: '24/7', label: 'Поддержка', icon: 'Headphones' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {activeView === 'landing' ? (
        <>
          <nav className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Truck" size={32} className="text-primary" />
                <span className="text-2xl font-bold">LogisticsPro</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <a href="#about" className="text-sm hover:text-primary transition-colors">О платформе</a>
                <a href="#calculator" className="text-sm hover:text-primary transition-colors">Калькулятор</a>
                <a href="#pricing" className="text-sm hover:text-primary transition-colors">Тарифы</a>
                <a href="#faq" className="text-sm hover:text-primary transition-colors">FAQ</a>
                <a href="#contacts" className="text-sm hover:text-primary transition-colors">Контакты</a>
              </div>
              <Button onClick={() => setActiveView('crm')}>Демо CRM</Button>
            </div>
          </nav>

          <section className="py-20 px-4">
            <div className="container mx-auto text-center max-w-4xl">
              <Badge className="mb-4" variant="secondary">Логистика нового поколения</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Управляйте грузоперевозками профессионально
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Отслеживайте грузы в реальном времени, автоматизируйте расчеты и принимайте решения на основе данных
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={() => setActiveView('crm')}>Попробовать демо</Button>
                <Button size="lg" variant="outline">Связаться с нами</Button>
              </div>
            </div>
          </section>

          <section className="py-16 px-4 bg-slate-100">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                  <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Icon name={stat.icon as any} size={40} className="mx-auto text-primary mb-2" />
                      <CardTitle className="text-3xl">{stat.value}</CardTitle>
                      <CardDescription>{stat.label}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">О платформе</h2>
                <p className="text-xl text-muted-foreground">Современное решение для управления логистикой</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <Icon name="MapPin" size={40} className="text-primary mb-4" />
                    <CardTitle>Отслеживание в реальном времени</CardTitle>
                    <CardDescription>
                      Мониторинг местоположения грузов 24/7 с точностью до минуты и автоматическими уведомлениями
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <Icon name="Calculator" size={40} className="text-primary mb-4" />
                    <CardTitle>Автоматический расчет стоимости</CardTitle>
                    <CardDescription>
                      Калькулятор учитывает все факторы: расстояние, вес, тип груза, срочность и актуальные тарифы
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <Icon name="BarChart3" size={40} className="text-primary mb-4" />
                    <CardTitle>Аналитика и отчеты</CardTitle>
                    <CardDescription>
                      Детальная статистика по маршрутам, затратам, времени доставки и эффективности логистики
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          <section id="calculator" className="py-20 px-4 bg-white">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Калькулятор стоимости</h2>
                <p className="text-xl text-muted-foreground">Рассчитайте стоимость доставки вашего груза за несколько секунд</p>
              </div>
              <Card className="shadow-xl">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="distance" className="text-base font-semibold">Расстояние (км)</Label>
                        <Input
                          id="distance"
                          type="number"
                          placeholder="Например: 500"
                          value={calcDistance}
                          onChange={(e) => setCalcDistance(e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight" className="text-base font-semibold">Вес груза (кг)</Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="Например: 1000"
                          value={calcWeight}
                          onChange={(e) => setCalcWeight(e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cargoType" className="text-base font-semibold">Тип груза</Label>
                        <Select value={calcCargoType} onValueChange={setCalcCargoType}>
                          <SelectTrigger id="cargoType" className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Стандартный</SelectItem>
                            <SelectItem value="fragile">Хрупкий (+40%)</SelectItem>
                            <SelectItem value="express">Экспресс (+80%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="urgency" className="text-base font-semibold">Срочность</Label>
                        <Select value={calcUrgency} onValueChange={setCalcUrgency}>
                          <SelectTrigger id="urgency" className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Обычная</SelectItem>
                            <SelectItem value="urgent">Срочная (+60%)</SelectItem>
                            <SelectItem value="express">Экспресс (+100%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button onClick={calculatePrice} size="lg" className="w-full">
                      <Icon name="Calculator" size={20} className="mr-2" />
                      Рассчитать стоимость
                    </Button>
                  </div>
                  {calculatedPrice !== null && (
                    <div className="mt-6 p-6 bg-primary/5 rounded-lg border-2 border-primary animate-in fade-in slide-in-from-bottom-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Стоимость доставки</p>
                        <p className="text-4xl font-bold text-primary">{calculatedPrice.toLocaleString('ru-RU')} ₽</p>
                        <p className="text-sm text-muted-foreground mt-3">Расчет включает все факторы: расстояние, вес, тип груза и срочность</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          <Icon name="FileText" size={16} className="mr-2" />
                          Получить коммерческое предложение
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4">
                  <Icon name="Zap" size={32} className="mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Быстрый расчет</h3>
                  <p className="text-sm text-muted-foreground">Мгновенная оценка стоимости на основе актуальных тарифов</p>
                </div>
                <div className="text-center p-4">
                  <Icon name="Shield" size={32} className="mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Прозрачность</h3>
                  <p className="text-sm text-muted-foreground">Все факторы ценообразования учитываются автоматически</p>
                </div>
                <div className="text-center p-4">
                  <Icon name="TrendingDown" size={32} className="mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Оптимизация</h3>
                  <p className="text-sm text-muted-foreground">Система подбирает оптимальный маршрут для снижения цены</p>
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" className="py-20 px-4 bg-slate-50">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Тарифные планы</h2>
                <p className="text-xl text-muted-foreground">Выберите оптимальный план для вашего бизнеса</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, idx) => (
                  <Card key={idx} className={`relative hover:shadow-xl transition-all ${plan.popular ? 'border-primary border-2 scale-105' : ''}`}>
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Популярный</Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription className="text-3xl font-bold text-foreground mt-2">
                        {plan.price} ₽<span className="text-sm font-normal text-muted-foreground">/мес</span>
                      </CardDescription>
                      <CardDescription className="mt-2">{plan.shipments} грузоперевозок</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <Icon name="Check" size={20} className="text-primary" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>Выбрать план</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="py-20 px-4">
            <div className="container mx-auto max-w-3xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Вопросы и ответы</h2>
                <p className="text-xl text-muted-foreground">Ответы на частые вопросы о платформе</p>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section id="contacts" className="py-20 px-4 bg-secondary text-secondary-foreground">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-bold mb-6">Готовы начать?</h2>
              <p className="text-xl mb-8 opacity-90">Свяжитесь с нами для консультации или попробуйте демо-версию</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
                <Button size="lg" variant="secondary" onClick={() => setActiveView('crm')}>
                  <Icon name="Play" size={20} className="mr-2" />
                  Запустить демо
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-secondary">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Написать нам
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={24} className="mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="opacity-90">info@logisticspro.ru</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={24} className="mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Телефон</div>
                    <div className="opacity-90">+7 (495) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={24} className="mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Адрес</div>
                    <div className="opacity-90">Москва, Кутузовский пр-т, 36</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="py-8 px-4 border-t">
            <div className="container mx-auto text-center text-muted-foreground">
              <p>© 2026 LogisticsPro. Все права защищены.</p>
            </div>
          </footer>
        </>
      ) : (
        <>
          <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Truck" size={28} className="text-primary" />
                <span className="text-xl font-bold">LogisticsPro CRM</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <Icon name="Bell" size={20} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Settings" size={20} />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setActiveView('landing')}>
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  На главную
                </Button>
              </div>
            </div>
          </nav>

          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Панель управления</h1>
              <p className="text-muted-foreground">Отслеживание и управление грузоперевозками</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Всего грузов</CardDescription>
                  <CardTitle className="text-3xl">124</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Icon name="TrendingUp" size={16} />
                    <span>+12% за месяц</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>В пути</CardDescription>
                  <CardTitle className="text-3xl">47</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Icon name="Truck" size={16} />
                    <span>Отслеживаются</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Доставлено</CardDescription>
                  <CardTitle className="text-3xl">89</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Icon name="CheckCircle" size={16} />
                    <span>98.7% в срок</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Экономия</CardDescription>
                  <CardTitle className="text-3xl">₽847K</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Icon name="DollarSign" size={16} />
                    <span>Оптимизация маршрутов</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="shipments" className="space-y-6">
              <TabsList className="grid w-full max-w-2xl grid-cols-3">
                <TabsTrigger value="shipments">
                  <Icon name="Package" size={16} className="mr-2" />
                  Грузы
                </TabsTrigger>
                <TabsTrigger value="new-request">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Новая заявка
                </TabsTrigger>
                <TabsTrigger value="map">
                  <Icon name="Map" size={16} className="mr-2" />
                  Карта
                </TabsTrigger>
              </TabsList>

              <TabsContent value="new-request">
                <Card>
                  <CardHeader>
                    <CardTitle>Новая заявка на грузоперевозку</CardTitle>
                    <CardDescription>Заполните форму для создания новой заявки на доставку груза</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!newShipmentFrom || !newShipmentTo || !newShipmentWeight || !newShipmentCargoType || !newShipmentContact) {
                        toast({
                          title: 'Ошибка',
                          description: 'Заполните все обязательные поля',
                          variant: 'destructive'
                        });
                        return;
                      }
                      toast({
                        title: 'Заявка создана!',
                        description: `Заявка на маршрут ${newShipmentFrom} → ${newShipmentTo} успешно создана. Номер заявки: SHP-${Math.floor(Math.random() * 9000) + 1000}`
                      });
                      setNewShipmentFrom('');
                      setNewShipmentTo('');
                      setNewShipmentWeight('');
                      setNewShipmentCargoType('');
                      setNewShipmentContact('');
                      setNewShipmentNotes('');
                    }} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="from">Откуда <span className="text-red-500">*</span></Label>
                          <Input
                            id="from"
                            placeholder="Москва"
                            value={newShipmentFrom}
                            onChange={(e) => setNewShipmentFrom(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="to">Куда <span className="text-red-500">*</span></Label>
                          <Input
                            id="to"
                            placeholder="Владивосток"
                            value={newShipmentTo}
                            onChange={(e) => setNewShipmentTo(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="weight">Вес груза (кг) <span className="text-red-500">*</span></Label>
                          <Input
                            id="weight"
                            type="number"
                            placeholder="1000"
                            value={newShipmentWeight}
                            onChange={(e) => setNewShipmentWeight(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cargoType">Тип груза <span className="text-red-500">*</span></Label>
                          <Select value={newShipmentCargoType} onValueChange={setNewShipmentCargoType} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип груза" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Стандартный</SelectItem>
                              <SelectItem value="fragile">Хрупкий</SelectItem>
                              <SelectItem value="perishable">Скоропортящийся</SelectItem>
                              <SelectItem value="hazardous">Опасный</SelectItem>
                              <SelectItem value="oversized">Негабаритный</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact">Контактная информация <span className="text-red-500">*</span></Label>
                        <Input
                          id="contact"
                          placeholder="+7 (999) 123-45-67 или email@example.com"
                          value={newShipmentContact}
                          onChange={(e) => setNewShipmentContact(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Дополнительные примечания</Label>
                        <Textarea
                          id="notes"
                          placeholder="Особые требования к перевозке, условия погрузки/разгрузки и т.д."
                          value={newShipmentNotes}
                          onChange={(e) => setNewShipmentNotes(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Icon name="Info" size={20} className="text-primary mt-0.5" />
                          <div className="text-sm text-muted-foreground">
                            <p className="font-semibold text-foreground mb-1">Информация о расчете стоимости</p>
                            <p>После создания заявки наш менеджер свяжется с вами в течение 30 минут для уточнения деталей и расчета точной стоимости доставки.</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="flex-1">
                          <Icon name="Send" size={18} className="mr-2" />
                          Отправить заявку
                        </Button>
                        <Button type="button" variant="outline" onClick={() => {
                          setNewShipmentFrom('');
                          setNewShipmentTo('');
                          setNewShipmentWeight('');
                          setNewShipmentCargoType('');
                          setNewShipmentContact('');
                          setNewShipmentNotes('');
                        }}>
                          <Icon name="RotateCcw" size={18} className="mr-2" />
                          Очистить
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipments" className="space-y-4">
                {shipments.map((shipment) => (
                  <Card key={shipment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{shipment.id}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Icon name="MapPin" size={14} />
                            {shipment.from} → {shipment.to}
                          </CardDescription>
                        </div>
                        <Badge variant={shipment.status === 'Доставлен' ? 'default' : shipment.status === 'В пути' ? 'secondary' : 'outline'}>
                          {shipment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Прогресс доставки</span>
                            <span className="font-semibold">{shipment.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${shipment.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Стоимость: </span>
                            <span className="font-semibold">{shipment.cost.toLocaleString('ru-RU')} ₽</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Icon name="Eye" size={16} className="mr-2" />
                            Детали
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="map">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Отслеживание грузов в реальном времени</CardTitle>
                    <CardDescription>Интерактивная карта с текущими позициями всех грузов</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative w-full h-[600px] bg-slate-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-primary rounded-full animate-pulse flex items-center justify-center shadow-lg">
                            <Icon name="Truck" size={24} className="text-white" />
                          </div>
                          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <Icon name="CheckCircle" size={24} className="text-white" />
                          </div>
                          <div className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-primary rounded-full animate-pulse flex items-center justify-center shadow-lg">
                            <Icon name="Truck" size={24} className="text-white" />
                          </div>
                          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center shadow-lg">
                            <Icon name="Clock" size={24} className="text-white" />
                          </div>
                          <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl">
                            <Icon name="MapPin" size={48} className="mx-auto text-primary mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Интерактивная карта</h3>
                            <p className="text-muted-foreground mb-4">В полной версии здесь отображается карта с реальными GPS-координатами</p>
                            <div className="flex gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                                <span>В пути</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>Доставлен</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                                <span>Ожидание</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;