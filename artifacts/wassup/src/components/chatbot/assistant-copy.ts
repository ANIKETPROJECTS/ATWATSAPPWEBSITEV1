import type { LanguageCode } from '../../i18n';

export type AssistantIntent = 'pricing' | 'features' | 'setup' | 'integrations' | 'team' | 'fallback';

export type AssistantCopy = {
  title: string;
  subtitle: string;
  whatsappContact: string;
  callContact: string;
  greeting: string;
  suggestions: [string, string, string];
  input: string;
  send: string;
  requestFollowup: string;
  contactIntro: string;
  name: string;
  whatsapp: string;
  contactRequired: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  typing: string;
  close: string;
  answers: Record<AssistantIntent, string>;
};

export const assistantCopy: Record<LanguageCode, AssistantCopy> = {
  en: {
    title: 'atWassup Assistant',
    subtitle: 'AI Assistant',
    whatsappContact: 'Chat on WhatsApp',
    callContact: 'Call atWassup',
    greeting: 'Hi! Welcome to atWassup.',
    suggestions: ['Pricing plan', 'Features', 'Contact'],
    input: 'Type your question…',
    send: 'Send message',
    requestFollowup: 'Talk to the atWassup team',
    contactIntro: 'Share your details and your question. The team will follow up with you.',
    name: 'Your name',
    whatsapp: 'WhatsApp number',
    contactRequired: 'Please enter your name and WhatsApp number.',
    submit: 'Submit',
    sending: 'Sending…',
    success: 'Thanks! Your request has been sent to the atWassup team.',
    error: 'Your request could not be sent right now. Please try again.',
    typing: 'Assistant is replying',
    close: 'Close assistant',
    answers: {
      pricing: 'The atWassup plan is ₹15,000 per year, plus applicable GST. Meta messaging charges are separate and passed through at cost.',
      features: 'atWassup brings WhatsApp Business API onboarding, AI-assisted replies, lead capture, follow-ups, broadcasts, in-chat forms, catalogs, payments, and analytics together.',
      setup: 'The team can guide your WhatsApp Business API onboarding and Meta verification. Meta makes the final verification decision.',
      integrations: 'atWassup can connect your CRM and existing tools. The team can confirm what fits your current setup.',
      team: 'I can ask the atWassup team to follow up. Share your contact details and what you need help with.',
      fallback: 'I don’t have a verified answer for that yet. I can pass your question to the atWassup team.',
    },
  },
  hi: {
    title: 'atWassup सहायक',
    subtitle: 'AI सहायक',
    whatsappContact: 'WhatsApp पर चैट करें',
    callContact: 'atWassup को कॉल करें',
    greeting: 'नमस्ते! atWassup में आपका स्वागत है।',
    suggestions: ['कीमत और प्लान', 'सुविधाएँ', 'संपर्क'],
    input: 'अपना सवाल लिखें…',
    send: 'संदेश भेजें',
    requestFollowup: 'atWassup टीम से बात करें',
    contactIntro: 'अपनी जानकारी और सवाल साझा करें। टीम आपसे संपर्क करेगी।',
    name: 'आपका नाम',
    whatsapp: 'WhatsApp नंबर',
    contactRequired: 'कृपया अपना नाम और WhatsApp नंबर दर्ज करें।',
    submit: 'जमा करें',
    sending: 'भेजा जा रहा है…',
    success: 'धन्यवाद! आपका अनुरोध atWassup टीम को भेज दिया गया है।',
    error: 'अभी अनुरोध नहीं भेजा जा सका। कृपया फिर कोशिश करें।',
    typing: 'सहायक जवाब दे रहा है',
    close: 'सहायक बंद करें',
    answers: {
      pricing: 'atWassup प्लान ₹15,000 प्रति वर्ष का है, साथ में लागू GST। Meta मैसेजिंग शुल्क अलग से वास्तविक लागत पर लिए जाते हैं।',
      features: 'atWassup WhatsApp Business API सेटअप, AI-सहायता वाले जवाब, लीड कैप्चर, फॉलो-अप, ब्रॉडकास्ट, चैट फॉर्म, कैटलॉग, भुगतान और एनालिटिक्स को एक साथ लाता है।',
      setup: 'टीम WhatsApp Business API सेटअप और Meta वेरिफिकेशन में मार्गदर्शन कर सकती है। अंतिम वेरिफिकेशन का निर्णय Meta लेता है।',
      integrations: 'atWassup आपके CRM और मौजूदा टूल्स से जुड़ सकता है। आपकी मौजूदा व्यवस्था के अनुसार टीम उपयुक्त विकल्प बता सकती है।',
      team: 'मैं atWassup टीम से आपसे संपर्क करने का अनुरोध भेज सकता हूँ। अपनी जानकारी और सवाल साझा करें।',
      fallback: 'मेरे पास अभी इसका सत्यापित जवाब नहीं है। मैं आपका सवाल atWassup टीम तक पहुँचा सकता हूँ।',
    },
  },
  ar: {
    title: 'مساعد atWassup',
    subtitle: 'مساعد الذكاء الاصطناعي',
    whatsappContact: 'تواصل عبر WhatsApp',
    callContact: 'اتصل بـ atWassup',
    greeting: 'مرحبًا! أهلًا بك في atWassup.',
    suggestions: ['الأسعار والخطة', 'الميزات', 'تواصل'],
    input: 'اكتب سؤالك…',
    send: 'إرسال الرسالة',
    requestFollowup: 'تواصل مع فريق atWassup',
    contactIntro: 'شارك بياناتك وسؤالك، وسيتواصل معك الفريق.',
    name: 'اسمك',
    whatsapp: 'رقم WhatsApp',
    contactRequired: 'يرجى إدخال اسمك ورقم WhatsApp.',
    submit: 'إرسال',
    sending: 'جارٍ الإرسال…',
    success: 'شكرًا لك! أُرسل طلبك إلى فريق atWassup.',
    error: 'تعذر إرسال طلبك الآن. حاول مرة أخرى.',
    typing: 'المساعد يكتب ردًا',
    close: 'إغلاق المساعد',
    answers: {
      pricing: 'تبلغ خطة atWassup ‏15,000 روبية هندية سنويًا، بالإضافة إلى ضريبة السلع والخدمات إن انطبقت. تُحتسب رسوم رسائل Meta بشكل منفصل وبالتكلفة الفعلية.',
      features: 'تجمع atWassup إعداد WhatsApp Business API، والردود بمساعدة الذكاء الاصطناعي، وجمع العملاء المحتملين، والمتابعات، والبث، والنماذج داخل الدردشة، والكتالوجات، والمدفوعات والتحليلات.',
      setup: 'يمكن للفريق إرشادك خلال إعداد WhatsApp Business API والتحقق من Meta. القرار النهائي للتحقق تتخذه Meta.',
      integrations: 'يمكن لـ atWassup الاتصال بنظام CRM والأدوات الحالية لديك. يمكن للفريق تأكيد ما يناسب إعدادك.',
      team: 'يمكنني إرسال طلب إلى فريق atWassup للتواصل معك. شارك بيانات الاتصال وما تحتاج إليه.',
      fallback: 'ليس لدي إجابة مؤكدة عن ذلك حتى الآن. يمكنني إحالة سؤالك إلى فريق atWassup.',
    },
  },
  es: {
    title: 'Asistente de atWassup',
    subtitle: 'Asistente de IA',
    whatsappContact: 'Chatear por WhatsApp',
    callContact: 'Llamar a atWassup',
    greeting: '¡Hola! Te damos la bienvenida a atWassup.',
    suggestions: ['Precios y plan', 'Funciones', 'Contacto'],
    input: 'Escribe tu pregunta…',
    send: 'Enviar mensaje',
    requestFollowup: 'Hablar con el equipo de atWassup',
    contactIntro: 'Comparte tus datos y tu consulta. El equipo se pondrá en contacto contigo.',
    name: 'Tu nombre',
    whatsapp: 'Número de WhatsApp',
    contactRequired: 'Ingresa tu nombre y número de WhatsApp.',
    submit: 'Enviar',
    sending: 'Enviando…',
    success: '¡Gracias! Tu solicitud se ha enviado al equipo de atWassup.',
    error: 'No se pudo enviar tu solicitud ahora. Inténtalo de nuevo.',
    typing: 'El asistente está respondiendo',
    close: 'Cerrar asistente',
    answers: {
      pricing: 'El plan de atWassup cuesta ₹15.000 al año, más el GST aplicable. Los cargos de mensajería de Meta se cobran aparte, al coste.',
      features: 'atWassup reúne la configuración de WhatsApp Business API, respuestas con IA, captación de clientes potenciales, seguimientos, difusiones, formularios, catálogos, pagos y analíticas.',
      setup: 'El equipo puede guiarte en la configuración de WhatsApp Business API y la verificación de Meta. Meta toma la decisión final de verificación.',
      integrations: 'atWassup puede conectarse con tu CRM y tus herramientas actuales. El equipo puede confirmar qué opción se adapta a tu configuración.',
      team: 'Puedo pedir al equipo de atWassup que se ponga en contacto contigo. Comparte tus datos y tu consulta.',
      fallback: 'Aún no tengo una respuesta verificada para eso. Puedo enviar tu pregunta al equipo de atWassup.',
    },
  },
  fr: {
    title: 'Assistant atWassup',
    subtitle: 'Assistant IA',
    whatsappContact: 'Discuter sur WhatsApp',
    callContact: 'Appeler atWassup',
    greeting: 'Bonjour ! Bienvenue chez atWassup.',
    suggestions: ['Tarifs et offre', 'Fonctionnalités', 'Contact'],
    input: 'Écrivez votre question…',
    send: 'Envoyer le message',
    requestFollowup: 'Contacter l’équipe atWassup',
    contactIntro: 'Partagez vos coordonnées et votre question. L’équipe vous recontactera.',
    name: 'Votre nom',
    whatsapp: 'Numéro WhatsApp',
    contactRequired: 'Veuillez saisir votre nom et votre numéro WhatsApp.',
    submit: 'Envoyer',
    sending: 'Envoi…',
    success: 'Merci ! Votre demande a été envoyée à l’équipe atWassup.',
    error: 'Votre demande n’a pas pu être envoyée. Veuillez réessayer.',
    typing: 'L’assistant rédige une réponse',
    close: 'Fermer l’assistant',
    answers: {
      pricing: 'L’offre atWassup coûte ₹15 000 par an, hors taxes GST applicables. Les frais de messagerie Meta sont facturés séparément, au coût réel.',
      features: 'atWassup réunit la configuration de WhatsApp Business API, les réponses assistées par IA, la collecte de prospects, les relances, les diffusions, les formulaires, les catalogues, les paiements et les statistiques.',
      setup: 'L’équipe peut vous accompagner pour la configuration de WhatsApp Business API et la vérification Meta. Meta prend la décision finale.',
      integrations: 'atWassup peut se connecter à votre CRM et à vos outils existants. L’équipe peut confirmer la compatibilité avec votre configuration.',
      team: 'Je peux demander à l’équipe atWassup de vous recontacter. Partagez vos coordonnées et votre question.',
      fallback: 'Je n’ai pas encore de réponse vérifiée à ce sujet. Je peux transmettre votre question à l’équipe atWassup.',
    },
  },
  de: {
    title: 'atWassup-Assistent',
    subtitle: 'KI-Assistent',
    whatsappContact: 'Über WhatsApp chatten',
    callContact: 'atWassup anrufen',
    greeting: 'Hallo! Willkommen bei atWassup.',
    suggestions: ['Preise und Tarif', 'Funktionen', 'Kontakt'],
    input: 'Frage eingeben…',
    send: 'Nachricht senden',
    requestFollowup: 'atWassup-Team kontaktieren',
    contactIntro: 'Teilen Sie Ihre Kontaktdaten und Ihre Frage. Das Team meldet sich bei Ihnen.',
    name: 'Ihr Name',
    whatsapp: 'WhatsApp-Nummer',
    contactRequired: 'Bitte geben Sie Ihren Namen und Ihre WhatsApp-Nummer ein.',
    submit: 'Absenden',
    sending: 'Wird gesendet…',
    success: 'Vielen Dank! Ihre Anfrage wurde an das atWassup-Team gesendet.',
    error: 'Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut.',
    typing: 'Der Assistent antwortet',
    close: 'Assistent schließen',
    answers: {
      pricing: 'Der atWassup-Tarif kostet ₹15.000 pro Jahr zuzüglich gegebenenfalls anfallender GST. Meta-Nachrichtenkosten werden separat zum Selbstkostenpreis berechnet.',
      features: 'atWassup vereint die Einrichtung der WhatsApp Business API, KI-gestützte Antworten, Lead-Erfassung, Follow-ups, Broadcasts, Formulare, Kataloge, Zahlungen und Analysen.',
      setup: 'Das Team unterstützt Sie bei der Einrichtung der WhatsApp Business API und der Meta-Verifizierung. Die endgültige Entscheidung trifft Meta.',
      integrations: 'atWassup kann Ihr CRM und bestehende Tools anbinden. Das Team kann bestätigen, was zu Ihrer Einrichtung passt.',
      team: 'Ich kann das atWassup-Team um Rückmeldung bitten. Teilen Sie Ihre Kontaktdaten und Ihr Anliegen mit.',
      fallback: 'Dazu habe ich noch keine bestätigte Antwort. Ich kann Ihre Frage an das atWassup-Team weiterleiten.',
    },
  },
  'zh-CN': {
    title: 'atWassup 助手',
    subtitle: 'AI 助手',
    whatsappContact: '通过 WhatsApp 联系',
    callContact: '拨打 atWassup 电话',
    greeting: '您好，欢迎使用 atWassup。',
    suggestions: ['价格与方案', '功能', '联系团队'],
    input: '输入您的问题…',
    send: '发送消息',
    requestFollowup: '联系 atWassup 团队',
    contactIntro: '请留下联系方式和问题，团队会与您联系。',
    name: '您的姓名',
    whatsapp: 'WhatsApp 号码',
    contactRequired: '请填写您的姓名和 WhatsApp 号码。',
    submit: '提交',
    sending: '正在发送…',
    success: '谢谢！您的请求已发送给 atWassup 团队。',
    error: '暂时无法发送请求，请重试。',
    typing: '助手正在回复',
    close: '关闭助手',
    answers: {
      pricing: 'atWassup 方案为每年 ₹15,000，另加适用的 GST。Meta 消息费用单独按实际成本收取。',
      features: 'atWassup 将 WhatsApp Business API 接入、AI 辅助回复、潜在客户收集、跟进、广播消息、聊天表单、商品目录、支付和数据分析整合在一起。',
      setup: '团队可协助您接入 WhatsApp Business API 并进行 Meta 验证。最终验证由 Meta 决定。',
      integrations: 'atWassup 可以连接您的 CRM 和现有工具。团队可确认哪些方案适合您当前的配置。',
      team: '我可以请 atWassup 团队与您联系。请留下联系方式和需要协助的事项。',
      fallback: '我暂时没有经过确认的答案，可以将您的问题转交给 atWassup 团队。',
    },
  },
  ja: {
    title: 'atWassup アシスタント',
    subtitle: 'AI アシスタント',
    whatsappContact: 'WhatsApp でチャット',
    callContact: 'atWassup に電話',
    greeting: 'こんにちは。atWassupへようこそ。',
    suggestions: ['料金プラン', '機能', 'お問い合わせ'],
    input: '質問を入力…',
    send: 'メッセージを送信',
    requestFollowup: 'atWassup チームに相談',
    contactIntro: '連絡先とご質問をお知らせください。チームからご連絡します。',
    name: 'お名前',
    whatsapp: 'WhatsApp 番号',
    contactRequired: 'お名前と WhatsApp 番号を入力してください。',
    submit: '送信',
    sending: '送信中…',
    success: 'ありがとうございます。お問い合わせを atWassup チームに送信しました。',
    error: '現在送信できません。もう一度お試しください。',
    typing: 'アシスタントが返信中',
    close: 'アシスタントを閉じる',
    answers: {
      pricing: 'atWassup のプランは年間 ₹15,000 で、適用される GST が別途かかります。Meta のメッセージ料金は別途、実費で請求されます。',
      features: 'atWassup は WhatsApp Business API の導入、AI を活用した返信、リード獲得、フォローアップ、一斉配信、チャットフォーム、カタログ、決済、分析をまとめて提供します。',
      setup: 'チームが WhatsApp Business API の導入と Meta 認証をサポートします。最終的な認証判断は Meta が行います。',
      integrations: 'atWassup は CRM や既存ツールと連携できます。現在の環境に合う方法をチームが確認します。',
      team: 'atWassup チームからご連絡するよう依頼できます。連絡先とご相談内容をお知らせください。',
      fallback: '確認済みの回答がまだありません。ご質問を atWassup チームに引き継げます。',
    },
  },
  'pt-BR': {
    title: 'Assistente atWassup',
    subtitle: 'Assistente de IA',
    whatsappContact: 'Conversar pelo WhatsApp',
    callContact: 'Ligar para atWassup',
    greeting: 'Olá! Boas-vindas ao atWassup.',
    suggestions: ['Preços e plano', 'Recursos', 'Contato'],
    input: 'Digite sua pergunta…',
    send: 'Enviar mensagem',
    requestFollowup: 'Falar com a equipe atWassup',
    contactIntro: 'Compartilhe seus dados e sua pergunta. A equipe entrará em contato.',
    name: 'Seu nome',
    whatsapp: 'Número do WhatsApp',
    contactRequired: 'Informe seu nome e número do WhatsApp.',
    submit: 'Enviar',
    sending: 'Enviando…',
    success: 'Obrigado! Sua solicitação foi enviada para a equipe atWassup.',
    error: 'Não foi possível enviar sua solicitação agora. Tente novamente.',
    typing: 'O assistente está respondendo',
    close: 'Fechar assistente',
    answers: {
      pricing: 'O plano atWassup custa ₹15.000 por ano, mais o GST aplicável. As tarifas de mensagens da Meta são cobradas separadamente, pelo custo real.',
      features: 'O atWassup reúne configuração da WhatsApp Business API, respostas com IA, captação de leads, acompanhamentos, transmissões, formulários no chat, catálogos, pagamentos e análises.',
      setup: 'A equipe pode orientar você na configuração da WhatsApp Business API e na verificação da Meta. A decisão final de verificação é da Meta.',
      integrations: 'O atWassup pode se conectar ao seu CRM e às ferramentas atuais. A equipe pode confirmar o que funciona para sua configuração.',
      team: 'Posso pedir para a equipe atWassup entrar em contato. Compartilhe seus dados e o que precisa.',
      fallback: 'Ainda não tenho uma resposta confirmada para isso. Posso encaminhar sua pergunta para a equipe atWassup.',
    },
  },
};

const intentKeywords: Record<LanguageCode, Record<Exclude<AssistantIntent, 'fallback'>, string[]>> = {
  en: {
    pricing: ['price', 'pricing', 'cost', 'plan', 'fee', 'how much', '₹'],
    features: ['feature', 'what can', 'chatbot', 'broadcast', 'catalog', 'payment', 'campaign', 'automation'],
    setup: ['setup', 'onboard', 'verification', 'green tick', 'meta verified', 'business api'],
    integrations: ['integrat', 'crm', 'connect', 'software', 'website'],
    team: ['human', 'person', 'team', 'contact', 'talk to', 'call me', 'follow up'],
  },
  hi: {
    pricing: ['कीमत', 'मूल्य', 'प्लान', 'शुल्क', 'खर्च', '₹'],
    features: ['सुविधा', 'फीचर', 'चैटबॉट', 'ब्रॉडकास्ट', 'कैटलॉग', 'भुगतान', 'ऑटोमेशन'],
    setup: ['सेटअप', 'सेट अप', 'ऑनबोर्ड', 'वेरिफिकेशन', 'ग्रीन टिक', 'मेटा'],
    integrations: ['इंटीग्रेशन', 'सीआरएम', 'कनेक्ट', 'वेबसाइट', 'सॉफ्टवेयर'],
    team: ['टीम', 'इंसान', 'संपर्क', 'बात करें', 'कॉल', 'फॉलो अप'],
  },
  ar: {
    pricing: ['سعر', 'الأسعار', 'تكلفة', 'خطة', 'رسوم', 'روبية'],
    features: ['ميزات', 'خصائص', 'روبوت', 'كتالوج', 'حملة', 'أتمتة', 'مدفوعات'],
    setup: ['إعداد', 'تهيئة', 'التحقق', 'شارة', 'واتساب للأعمال'],
    integrations: ['تكامل', 'crm', 'ربط', 'موقع', 'برنامج'],
    team: ['فريق', 'شخص', 'تواصل', 'اتصل', 'تحدث'],
  },
  es: {
    pricing: ['precio', 'precios', 'coste', 'costo', 'plan', 'tarifa', 'cuánto'],
    features: ['función', 'funciones', 'característica', 'chatbot', 'difusión', 'catálogo', 'automatización'],
    setup: ['configuración', 'configurar', 'incorporación', 'verificación', 'sello verde'],
    integrations: ['integración', 'crm', 'conectar', 'software', 'sitio web'],
    team: ['equipo', 'persona', 'contactar', 'hablar', 'llamar', 'seguimiento'],
  },
  fr: {
    pricing: ['prix', 'coût', 'tarif', 'offre', 'combien'],
    features: ['fonctionnalité', 'fonctionnalités', 'chatbot', 'diffusion', 'catalogue', 'automatisation'],
    setup: ['configuration', 'configurer', 'intégration initiale', 'vérification', 'badge vert'],
    integrations: ['intégration', 'crm', 'connecter', 'logiciel', 'site web'],
    team: ['équipe', 'personne', 'contacter', 'parler', 'appeler', 'suivi'],
  },
  de: {
    pricing: ['preis', 'kosten', 'tarif', 'plan', 'gebühr', 'wie viel'],
    features: ['funktion', 'funktionen', 'chatbot', 'broadcast', 'katalog', 'automatisierung'],
    setup: ['einrichtung', 'einrichten', 'onboarding', 'verifizierung', 'grüner haken'],
    integrations: ['integration', 'crm', 'verbinden', 'software', 'website'],
    team: ['team', 'person', 'kontakt', 'sprechen', 'anrufen', 'rückruf'],
  },
  'zh-CN': {
    pricing: ['价格', '费用', '套餐', '多少钱'],
    features: ['功能', '聊天机器人', '群发', '目录', '自动化', '支付'],
    setup: ['设置', '接入', '验证', '绿勾', '商业平台'],
    integrations: ['集成', 'crm', '连接', '软件', '网站'],
    team: ['团队', '人工', '联系', '沟通', '回电'],
  },
  ja: {
    pricing: ['料金', '価格', '費用', 'プラン', 'いくら'],
    features: ['機能', 'チャットボット', '一斉配信', 'カタログ', '自動化', '決済'],
    setup: ['設定', '導入', '認証', 'グリーンティック', 'ビジネス api'],
    integrations: ['連携', 'crm', '接続', 'ソフトウェア', 'ウェブサイト'],
    team: ['チーム', '担当者', '連絡', '相談', '電話'],
  },
  'pt-BR': {
    pricing: ['preço', 'preços', 'custo', 'plano', 'tarifa', 'quanto'],
    features: ['recurso', 'recursos', 'chatbot', 'transmissão', 'catálogo', 'automação'],
    setup: ['configuração', 'configurar', 'integração inicial', 'verificação', 'selo verde'],
    integrations: ['integração', 'crm', 'conectar', 'software', 'site'],
    team: ['equipe', 'pessoa', 'contato', 'conversar', 'ligar', 'retorno'],
  },
};

export function detectAssistantIntent(question: string, language: LanguageCode): AssistantIntent {
  const normalized = question
    .toLocaleLowerCase(language === 'zh-CN' ? 'zh-CN' : language)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
  const keywords = intentKeywords[language];
  const intentOrder: Exclude<AssistantIntent, 'fallback'>[] = ['pricing', 'setup', 'integrations', 'team', 'features'];
  for (const intent of intentOrder) {
    if (keywords[intent].some((keyword) => normalized.includes(
      keyword.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase(language),
    ))) {
      return intent;
    }
  }
  return 'fallback';
}
