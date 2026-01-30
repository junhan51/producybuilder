export const LANGUAGES = ['en', 'zh', 'ko', 'de', 'es'] as const;
export type Language = typeof LANGUAGES[number];

export const languageNames: Record<Language, string> = {
  en: 'English',
  zh: '中文',
  ko: '한국어',
  de: 'Deutsch',
  es: 'Español',
};

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.analyze': 'Analyze',
    'nav.optimization': 'Optimization',
    'nav.process': 'Process',
    'nav.benefits': 'Benefits',
    'nav.getStarted': 'Get Started',

    // Hero
    'hero.badge': 'AI-Powered Analysis 2.0',
    'hero.title1': 'Glow Up',
    'hero.title2': 'with AI',
    'hero.subtitle': 'The scientific shortcut to your ultimate aesthetic. Advanced facial and physique analysis delivered in seconds.',
    'hero.cta': 'Get Started Free',
    'hero.users': '25k+ Users Analyzed',

    // Analyze Section
    'analyze.title': 'Start Your Analysis',

    // Optimization Section
    'optimization.face': 'Face',
    'optimization.faceDesc': 'Maximize facial harmony through golden ratio analysis and skin texture optimization.',
    'optimization.style': 'Style',
    'optimization.styleDesc': 'Curate a signature wardrobe that complements your specific body type and skin undertone.',
    'optimization.posture': 'Posture',
    'optimization.postureDesc': 'Correct structural imbalances to instantly project confidence and commanding presence.',

    // Process Section
    'process.title': 'Seamless Experience',
    'process.step1': 'Submit Photo',
    'process.step1Desc': 'Securely upload high-resolution photos for deep neural processing.',
    'process.step2': 'AI Processing',
    'process.step2Desc': 'Our engine analyzes 1,200+ facial landmarks and bone structures.',
    'process.step3': 'Result Dashboard',
    'process.step3Desc': 'Access your comprehensive rating, advice, and growth roadmap.',

    // Benefits Section
    'benefits.confidence': 'Confidence',
    'benefits.confidenceDesc': 'Gain the unwavering self-assurance that comes from knowing you are operating at your absolute peak aesthetic potential.',
    'benefits.roadmap': 'Clear Roadmap',
    'benefits.roadmapDesc': 'No more guesswork. Get a step-by-step actionable guide tailored to your unique features and specific body composition goals.',
    'benefits.data': 'Scientific Data',
    'benefits.dataDesc': 'Leverage the same metrics used by aesthetic professionals and cosmetic surgeons to track your real-world progress objectively.',

    // CTA Section
    'cta.title': 'Ready to Evolve?',
    'cta.subtitle': 'Start your transformation today. It takes less than 60 seconds to get your first report.',
    'cta.button': 'Analyze My Potential',
    'cta.secure': '100% Anonymous & Secure Analysis',

    // Footer
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.contact': 'Contact',
    'footer.twitter': 'Twitter',

    // Input Page
    'input.back': 'Back to Home',
    'input.title': 'Upload Your Photos',
    'input.subtitle': 'Complete the form below to get your personalized analysis',
    'input.warning': 'For accurate analysis:',
    'input.warningText': 'Your face should fill most of the frame. Take photos in good lighting with a neutral expression. Avoid filters or heavy makeup.',
    'input.frontView': 'Front View',
    'input.sideProfile': 'Side Profile',
    'input.frontFacing': 'Front facing',
    'input.sideView': 'Side view',
    'input.change': 'Change',
    'input.upload': 'Upload',
    'input.height': 'Height (cm)',
    'input.weight': 'Weight (kg)',
    'input.proceed': 'Proceed to Payment',
    'input.processing': 'Processing...',
    'input.securePayment': 'Secure payment powered by Polar. One-time purchase.',
    'input.errorBothPhotos': 'Please upload both front and side profile photos.',

    // Result Page
    'result.verifying': 'Verifying payment...',
    'result.analyzing': 'AI Analysis in Progress',
    'result.analyzingDesc': 'Examining facial structure, proportions, and aesthetic potential...',
    'result.front': 'Front',
    'result.side': 'Side',
    'result.error': 'Something Went Wrong',
    'result.tryAgain': 'Try Again',
    'result.complete': 'Analysis Complete',
    'result.yourResults': 'Your Results',
    'result.pslRating': 'PSL Rating',
    'result.pslDesc': 'Based on scientific facial analysis',
    'result.age': 'Age',
    'result.bodyFat': 'Body Fat',
    'result.skin': 'Skin',
    'result.facialAnalysis': 'Facial Region Analysis',
    'result.facialDesc': 'Detailed breakdown by area',
    'result.detailedAnalysis': 'Detailed Analysis',
    'result.detailedDesc': 'Personalized insights and recommendations',
    'result.yourAnalysis': 'Your Analysis',
    'result.aiRecommendations': 'AI-powered recommendations',
    'result.saveReport': 'Save Report',
    'result.backHome': 'Back to Home',
    'result.noSession': 'No valid session. Please complete payment first.',
    'result.noPhoto': 'No photo data found. Please start over.',

    // LooksmaxForm
    'form.title': 'Unlock Premium Analysis',
    'form.subtitle': 'Get your detailed facial scoring, personalized style recommendations, and actionable improvement roadmap.',
    'form.facialAnalysis': 'Facial Analysis',
    'form.facialAnalysisDesc': 'Golden ratio & symmetry evaluation',
    'form.styleRec': 'Style Recommendations',
    'form.styleRecDesc': 'Personalized wardrobe & grooming tips',
    'form.bodyOpt': 'Body Optimization',
    'form.bodyOptDesc': 'Fitness & posture improvement plan',
    'form.cta': 'Unlock Premium Analysis',
    'form.info': 'One-time payment. No subscription required.',
  },

  zh: {
    // Navbar
    'nav.analyze': '分析',
    'nav.optimization': '优化',
    'nav.process': '流程',
    'nav.benefits': '优势',
    'nav.getStarted': '开始',

    // Hero
    'hero.badge': 'AI驱动分析 2.0',
    'hero.title1': '蜕变升级',
    'hero.title2': '借助AI',
    'hero.subtitle': '通往极致美学的科学捷径。几秒钟内获得先进的面部和体型分析。',
    'hero.cta': '免费开始',
    'hero.users': '25000+用户已分析',

    // Analyze Section
    'analyze.title': '开始您的分析',

    // Optimization Section
    'optimization.face': '面部',
    'optimization.faceDesc': '通过黄金比例分析和皮肤纹理优化，最大化面部和谐度。',
    'optimization.style': '风格',
    'optimization.styleDesc': '打造与您的体型和肤色相得益彰的标志性衣橱。',
    'optimization.posture': '体态',
    'optimization.postureDesc': '纠正结构失衡，即刻展现自信和领导气质。',

    // Process Section
    'process.title': '无缝体验',
    'process.step1': '提交照片',
    'process.step1Desc': '安全上传高分辨率照片进行深度神经处理。',
    'process.step2': 'AI处理',
    'process.step2Desc': '我们的引擎分析1200+个面部标志点和骨骼结构。',
    'process.step3': '结果面板',
    'process.step3Desc': '获取您的综合评分、建议和成长路线图。',

    // Benefits Section
    'benefits.confidence': '自信',
    'benefits.confidenceDesc': '当您知道自己正处于美学巅峰时，获得坚定不移的自信。',
    'benefits.roadmap': '清晰路线图',
    'benefits.roadmapDesc': '不再猜测。获取针对您独特特征和身体目标的逐步行动指南。',
    'benefits.data': '科学数据',
    'benefits.dataDesc': '利用美学专家和整形外科医生使用的相同指标来客观跟踪您的进步。',

    // CTA Section
    'cta.title': '准备好进化了吗？',
    'cta.subtitle': '今天开始您的蜕变。只需不到60秒即可获得您的第一份报告。',
    'cta.button': '分析我的潜力',
    'cta.secure': '100%匿名且安全的分析',

    // Footer
    'footer.privacy': '隐私',
    'footer.terms': '条款',
    'footer.contact': '联系',
    'footer.twitter': '推特',

    // Input Page
    'input.back': '返回首页',
    'input.title': '上传您的照片',
    'input.subtitle': '完成以下表单以获取个性化分析',
    'input.warning': '为了准确分析：',
    'input.warningText': '您的面部应占据画面的大部分。在良好的光线下拍摄，保持中性表情。避免使用滤镜或浓妆。',
    'input.frontView': '正面照',
    'input.sideProfile': '侧面照',
    'input.frontFacing': '面向镜头',
    'input.sideView': '侧面视图',
    'input.change': '更换',
    'input.upload': '上传',
    'input.height': '身高 (厘米)',
    'input.weight': '体重 (公斤)',
    'input.proceed': '继续付款',
    'input.processing': '处理中...',
    'input.securePayment': '由Polar提供安全支付。一次性购买。',
    'input.errorBothPhotos': '请上传正面和侧面照片。',

    // Result Page
    'result.verifying': '正在验证付款...',
    'result.analyzing': 'AI分析进行中',
    'result.analyzingDesc': '正在分析面部结构、比例和美学潜力...',
    'result.front': '正面',
    'result.side': '侧面',
    'result.error': '出错了',
    'result.tryAgain': '重试',
    'result.complete': '分析完成',
    'result.yourResults': '您的结果',
    'result.pslRating': 'PSL评分',
    'result.pslDesc': '基于科学面部分析',
    'result.age': '年龄',
    'result.bodyFat': '体脂',
    'result.skin': '肤质',
    'result.facialAnalysis': '面部区域分析',
    'result.facialDesc': '按区域详细分析',
    'result.detailedAnalysis': '详细分析',
    'result.detailedDesc': '个性化见解和建议',
    'result.yourAnalysis': '您的分析',
    'result.aiRecommendations': 'AI驱动的建议',
    'result.saveReport': '保存报告',
    'result.backHome': '返回首页',
    'result.noSession': '无效会话。请先完成付款。',
    'result.noPhoto': '未找到照片数据。请重新开始。',

    // LooksmaxForm
    'form.title': '解锁高级分析',
    'form.subtitle': '获取详细的面部评分、个性化风格建议和可行的改进路线图。',
    'form.facialAnalysis': '面部分析',
    'form.facialAnalysisDesc': '黄金比例与对称性评估',
    'form.styleRec': '风格建议',
    'form.styleRecDesc': '个性化衣橱与护理建议',
    'form.bodyOpt': '身体优化',
    'form.bodyOptDesc': '健身与体态改善计划',
    'form.cta': '解锁高级分析',
    'form.info': '一次性付款。无需订阅。',
  },

  ko: {
    // Navbar
    'nav.analyze': '분석',
    'nav.optimization': '최적화',
    'nav.process': '과정',
    'nav.benefits': '혜택',
    'nav.getStarted': '시작하기',

    // Hero
    'hero.badge': 'AI 기반 분석 2.0',
    'hero.title1': '글로우업',
    'hero.title2': 'AI와 함께',
    'hero.subtitle': '궁극의 외모를 위한 과학적 지름길. 몇 초 만에 고급 얼굴 및 체형 분석을 받아보세요.',
    'hero.cta': '무료로 시작하기',
    'hero.users': '25,000+ 사용자 분석 완료',

    // Analyze Section
    'analyze.title': '분석 시작하기',

    // Optimization Section
    'optimization.face': '얼굴',
    'optimization.faceDesc': '황금 비율 분석과 피부 질감 최적화를 통해 얼굴 조화를 극대화하세요.',
    'optimization.style': '스타일',
    'optimization.styleDesc': '체형과 피부 톤에 맞는 시그니처 옷장을 구성하세요.',
    'optimization.posture': '자세',
    'optimization.postureDesc': '구조적 불균형을 교정하여 즉시 자신감과 존재감을 발산하세요.',

    // Process Section
    'process.title': '매끄러운 경험',
    'process.step1': '사진 제출',
    'process.step1Desc': '딥 뉴럴 처리를 위해 고해상도 사진을 안전하게 업로드하세요.',
    'process.step2': 'AI 처리',
    'process.step2Desc': '1,200개 이상의 얼굴 랜드마크와 골격 구조를 분석합니다.',
    'process.step3': '결과 대시보드',
    'process.step3Desc': '종합 평가, 조언, 성장 로드맵을 확인하세요.',

    // Benefits Section
    'benefits.confidence': '자신감',
    'benefits.confidenceDesc': '최상의 미적 잠재력을 발휘하고 있다는 것을 알 때 오는 흔들리지 않는 자신감을 얻으세요.',
    'benefits.roadmap': '명확한 로드맵',
    'benefits.roadmapDesc': '더 이상 추측하지 마세요. 고유한 특징과 체형 목표에 맞춤화된 단계별 실행 가이드를 받으세요.',
    'benefits.data': '과학적 데이터',
    'benefits.dataDesc': '미용 전문가와 성형외과 의사가 사용하는 동일한 지표를 활용하여 실제 진행 상황을 객관적으로 추적하세요.',

    // CTA Section
    'cta.title': '진화할 준비가 되셨나요?',
    'cta.subtitle': '오늘 변화를 시작하세요. 첫 번째 리포트를 받는 데 60초도 걸리지 않습니다.',
    'cta.button': '내 잠재력 분석하기',
    'cta.secure': '100% 익명 & 보안 분석',

    // Footer
    'footer.privacy': '개인정보',
    'footer.terms': '이용약관',
    'footer.contact': '문의',
    'footer.twitter': '트위터',

    // Input Page
    'input.back': '홈으로 돌아가기',
    'input.title': '사진 업로드',
    'input.subtitle': '개인 맞춤 분석을 받으려면 아래 양식을 작성하세요',
    'input.warning': '정확한 분석을 위해:',
    'input.warningText': '얼굴이 화면의 대부분을 차지해야 합니다. 좋은 조명에서 무표정으로 촬영하세요. 필터나 진한 화장은 피하세요.',
    'input.frontView': '정면 사진',
    'input.sideProfile': '측면 프로필',
    'input.frontFacing': '정면 촬영',
    'input.sideView': '측면 촬영',
    'input.change': '변경',
    'input.upload': '업로드',
    'input.height': '키 (cm)',
    'input.weight': '체중 (kg)',
    'input.proceed': '결제 진행',
    'input.processing': '처리 중...',
    'input.securePayment': 'Polar 보안 결제. 일회성 구매.',
    'input.errorBothPhotos': '정면과 측면 사진을 모두 업로드해 주세요.',

    // Result Page
    'result.verifying': '결제 확인 중...',
    'result.analyzing': 'AI 분석 진행 중',
    'result.analyzingDesc': '얼굴 구조, 비율, 미적 잠재력을 분석하고 있습니다...',
    'result.front': '정면',
    'result.side': '측면',
    'result.error': '문제가 발생했습니다',
    'result.tryAgain': '다시 시도',
    'result.complete': '분석 완료',
    'result.yourResults': '결과',
    'result.pslRating': 'PSL 평점',
    'result.pslDesc': '과학적 얼굴 분석 기반',
    'result.age': '나이',
    'result.bodyFat': '체지방',
    'result.skin': '피부',
    'result.facialAnalysis': '얼굴 부위별 분석',
    'result.facialDesc': '부위별 상세 분석',
    'result.detailedAnalysis': '상세 분석',
    'result.detailedDesc': '개인 맞춤 인사이트 및 추천',
    'result.yourAnalysis': '분석 결과',
    'result.aiRecommendations': 'AI 기반 추천',
    'result.saveReport': '리포트 저장',
    'result.backHome': '홈으로',
    'result.noSession': '유효하지 않은 세션입니다. 먼저 결제를 완료해 주세요.',
    'result.noPhoto': '사진 데이터를 찾을 수 없습니다. 처음부터 다시 시작해 주세요.',

    // LooksmaxForm
    'form.title': '프리미엄 분석 잠금 해제',
    'form.subtitle': '상세한 얼굴 점수, 개인 맞춤 스타일 추천, 실행 가능한 개선 로드맵을 받아보세요.',
    'form.facialAnalysis': '얼굴 분석',
    'form.facialAnalysisDesc': '황금 비율 & 대칭성 평가',
    'form.styleRec': '스타일 추천',
    'form.styleRecDesc': '개인 맞춤 옷장 & 그루밍 팁',
    'form.bodyOpt': '바디 최적화',
    'form.bodyOptDesc': '피트니스 & 자세 개선 계획',
    'form.cta': '프리미엄 분석 시작',
    'form.info': '일회성 결제. 구독 불필요.',
  },

  de: {
    // Navbar
    'nav.analyze': 'Analysieren',
    'nav.optimization': 'Optimierung',
    'nav.process': 'Prozess',
    'nav.benefits': 'Vorteile',
    'nav.getStarted': 'Loslegen',

    // Hero
    'hero.badge': 'KI-gestützte Analyse 2.0',
    'hero.title1': 'Glow Up',
    'hero.title2': 'mit KI',
    'hero.subtitle': 'Die wissenschaftliche Abkürzung zu Ihrer ultimativen Ästhetik. Fortschrittliche Gesichts- und Körperanalyse in Sekunden.',
    'hero.cta': 'Kostenlos starten',
    'hero.users': '25.000+ Benutzer analysiert',

    // Analyze Section
    'analyze.title': 'Starten Sie Ihre Analyse',

    // Optimization Section
    'optimization.face': 'Gesicht',
    'optimization.faceDesc': 'Maximieren Sie die Gesichtsharmonie durch Goldene-Schnitt-Analyse und Hauttextur-Optimierung.',
    'optimization.style': 'Stil',
    'optimization.styleDesc': 'Kuratieren Sie eine Signature-Garderobe, die zu Ihrem Körpertyp und Hautton passt.',
    'optimization.posture': 'Haltung',
    'optimization.postureDesc': 'Korrigieren Sie strukturelle Ungleichgewichte, um sofort Selbstvertrauen auszustrahlen.',

    // Process Section
    'process.title': 'Nahtlose Erfahrung',
    'process.step1': 'Foto einreichen',
    'process.step1Desc': 'Laden Sie hochauflösende Fotos sicher für die neuronale Verarbeitung hoch.',
    'process.step2': 'KI-Verarbeitung',
    'process.step2Desc': 'Unsere Engine analysiert über 1.200 Gesichtslandmarken und Knochenstrukturen.',
    'process.step3': 'Ergebnis-Dashboard',
    'process.step3Desc': 'Greifen Sie auf Ihre Bewertung, Ratschläge und Wachstums-Roadmap zu.',

    // Benefits Section
    'benefits.confidence': 'Selbstvertrauen',
    'benefits.confidenceDesc': 'Gewinnen Sie das unerschütterliche Selbstvertrauen, das entsteht, wenn Sie wissen, dass Sie Ihr ästhetisches Potenzial voll ausschöpfen.',
    'benefits.roadmap': 'Klare Roadmap',
    'benefits.roadmapDesc': 'Kein Raten mehr. Erhalten Sie einen schrittweisen Aktionsplan, der auf Ihre Merkmale zugeschnitten ist.',
    'benefits.data': 'Wissenschaftliche Daten',
    'benefits.dataDesc': 'Nutzen Sie die gleichen Metriken, die von Ästhetik-Profis verwendet werden, um Ihren Fortschritt zu verfolgen.',

    // CTA Section
    'cta.title': 'Bereit zur Evolution?',
    'cta.subtitle': 'Starten Sie Ihre Transformation heute. Es dauert weniger als 60 Sekunden für Ihren ersten Bericht.',
    'cta.button': 'Mein Potenzial analysieren',
    'cta.secure': '100% Anonym & Sichere Analyse',

    // Footer
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.contact': 'Kontakt',
    'footer.twitter': 'Twitter',

    // Input Page
    'input.back': 'Zurück zur Startseite',
    'input.title': 'Laden Sie Ihre Fotos hoch',
    'input.subtitle': 'Füllen Sie das Formular aus, um Ihre personalisierte Analyse zu erhalten',
    'input.warning': 'Für genaue Analyse:',
    'input.warningText': 'Ihr Gesicht sollte den größten Teil des Bildes ausfüllen. Fotografieren Sie bei gutem Licht mit neutralem Gesichtsausdruck. Vermeiden Sie Filter oder starkes Make-up.',
    'input.frontView': 'Frontalansicht',
    'input.sideProfile': 'Seitenprofil',
    'input.frontFacing': 'Frontal',
    'input.sideView': 'Seitenansicht',
    'input.change': 'Ändern',
    'input.upload': 'Hochladen',
    'input.height': 'Größe (cm)',
    'input.weight': 'Gewicht (kg)',
    'input.proceed': 'Zur Zahlung',
    'input.processing': 'Verarbeitung...',
    'input.securePayment': 'Sichere Zahlung über Polar. Einmaliger Kauf.',
    'input.errorBothPhotos': 'Bitte laden Sie sowohl Front- als auch Seitenfotos hoch.',

    // Result Page
    'result.verifying': 'Zahlung wird überprüft...',
    'result.analyzing': 'KI-Analyse läuft',
    'result.analyzingDesc': 'Analysiere Gesichtsstruktur, Proportionen und ästhetisches Potenzial...',
    'result.front': 'Front',
    'result.side': 'Seite',
    'result.error': 'Etwas ist schiefgelaufen',
    'result.tryAgain': 'Erneut versuchen',
    'result.complete': 'Analyse abgeschlossen',
    'result.yourResults': 'Ihre Ergebnisse',
    'result.pslRating': 'PSL-Bewertung',
    'result.pslDesc': 'Basierend auf wissenschaftlicher Gesichtsanalyse',
    'result.age': 'Alter',
    'result.bodyFat': 'Körperfett',
    'result.skin': 'Haut',
    'result.facialAnalysis': 'Gesichtsregion-Analyse',
    'result.facialDesc': 'Detaillierte Aufschlüsselung nach Bereich',
    'result.detailedAnalysis': 'Detaillierte Analyse',
    'result.detailedDesc': 'Personalisierte Einblicke und Empfehlungen',
    'result.yourAnalysis': 'Ihre Analyse',
    'result.aiRecommendations': 'KI-gestützte Empfehlungen',
    'result.saveReport': 'Bericht speichern',
    'result.backHome': 'Zur Startseite',
    'result.noSession': 'Keine gültige Sitzung. Bitte schließen Sie zuerst die Zahlung ab.',
    'result.noPhoto': 'Keine Fotodaten gefunden. Bitte beginnen Sie von vorne.',

    // LooksmaxForm
    'form.title': 'Premium-Analyse freischalten',
    'form.subtitle': 'Erhalten Sie Ihre detaillierte Gesichtsbewertung, personalisierte Stilempfehlungen und umsetzbare Verbesserungs-Roadmap.',
    'form.facialAnalysis': 'Gesichtsanalyse',
    'form.facialAnalysisDesc': 'Goldener Schnitt & Symmetrie-Bewertung',
    'form.styleRec': 'Stilempfehlungen',
    'form.styleRecDesc': 'Personalisierte Garderobe & Pflege-Tipps',
    'form.bodyOpt': 'Körperoptimierung',
    'form.bodyOptDesc': 'Fitness & Haltungsverbesserungsplan',
    'form.cta': 'Premium-Analyse freischalten',
    'form.info': 'Einmalzahlung. Kein Abo erforderlich.',
  },

  es: {
    // Navbar
    'nav.analyze': 'Analizar',
    'nav.optimization': 'Optimización',
    'nav.process': 'Proceso',
    'nav.benefits': 'Beneficios',
    'nav.getStarted': 'Comenzar',

    // Hero
    'hero.badge': 'Análisis con IA 2.0',
    'hero.title1': 'Glow Up',
    'hero.title2': 'con IA',
    'hero.subtitle': 'El atajo científico hacia tu estética definitiva. Análisis facial y físico avanzado en segundos.',
    'hero.cta': 'Comenzar Gratis',
    'hero.users': '25.000+ Usuarios Analizados',

    // Analyze Section
    'analyze.title': 'Comienza Tu Análisis',

    // Optimization Section
    'optimization.face': 'Rostro',
    'optimization.faceDesc': 'Maximiza la armonía facial a través del análisis de proporción áurea y optimización de textura de piel.',
    'optimization.style': 'Estilo',
    'optimization.styleDesc': 'Crea un guardarropa distintivo que complemente tu tipo de cuerpo y tono de piel.',
    'optimization.posture': 'Postura',
    'optimization.postureDesc': 'Corrige desequilibrios estructurales para proyectar confianza y presencia al instante.',

    // Process Section
    'process.title': 'Experiencia Fluida',
    'process.step1': 'Enviar Foto',
    'process.step1Desc': 'Sube de forma segura fotos de alta resolución para procesamiento neuronal profundo.',
    'process.step2': 'Procesamiento IA',
    'process.step2Desc': 'Nuestro motor analiza más de 1,200 puntos faciales y estructuras óseas.',
    'process.step3': 'Panel de Resultados',
    'process.step3Desc': 'Accede a tu calificación integral, consejos y hoja de ruta de crecimiento.',

    // Benefits Section
    'benefits.confidence': 'Confianza',
    'benefits.confidenceDesc': 'Obtén la seguridad inquebrantable que viene de saber que estás operando en tu máximo potencial estético.',
    'benefits.roadmap': 'Hoja de Ruta Clara',
    'benefits.roadmapDesc': 'Sin más conjeturas. Obtén una guía paso a paso adaptada a tus características únicas y objetivos corporales.',
    'benefits.data': 'Datos Científicos',
    'benefits.dataDesc': 'Aprovecha las mismas métricas usadas por profesionales estéticos para seguir tu progreso objetivamente.',

    // CTA Section
    'cta.title': '¿Listo para Evolucionar?',
    'cta.subtitle': 'Comienza tu transformación hoy. Toma menos de 60 segundos obtener tu primer informe.',
    'cta.button': 'Analizar Mi Potencial',
    'cta.secure': 'Análisis 100% Anónimo y Seguro',

    // Footer
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.contact': 'Contacto',
    'footer.twitter': 'Twitter',

    // Input Page
    'input.back': 'Volver al Inicio',
    'input.title': 'Sube Tus Fotos',
    'input.subtitle': 'Completa el formulario para obtener tu análisis personalizado',
    'input.warning': 'Para un análisis preciso:',
    'input.warningText': 'Tu rostro debe llenar la mayor parte del encuadre. Toma fotos con buena iluminación y expresión neutral. Evita filtros o maquillaje pesado.',
    'input.frontView': 'Vista Frontal',
    'input.sideProfile': 'Perfil Lateral',
    'input.frontFacing': 'Frente a cámara',
    'input.sideView': 'Vista lateral',
    'input.change': 'Cambiar',
    'input.upload': 'Subir',
    'input.height': 'Altura (cm)',
    'input.weight': 'Peso (kg)',
    'input.proceed': 'Proceder al Pago',
    'input.processing': 'Procesando...',
    'input.securePayment': 'Pago seguro con Polar. Compra única.',
    'input.errorBothPhotos': 'Por favor sube fotos frontal y de perfil.',

    // Result Page
    'result.verifying': 'Verificando pago...',
    'result.analyzing': 'Análisis IA en Progreso',
    'result.analyzingDesc': 'Examinando estructura facial, proporciones y potencial estético...',
    'result.front': 'Frontal',
    'result.side': 'Lateral',
    'result.error': 'Algo Salió Mal',
    'result.tryAgain': 'Intentar de Nuevo',
    'result.complete': 'Análisis Completo',
    'result.yourResults': 'Tus Resultados',
    'result.pslRating': 'Calificación PSL',
    'result.pslDesc': 'Basado en análisis facial científico',
    'result.age': 'Edad',
    'result.bodyFat': 'Grasa Corporal',
    'result.skin': 'Piel',
    'result.facialAnalysis': 'Análisis de Región Facial',
    'result.facialDesc': 'Desglose detallado por área',
    'result.detailedAnalysis': 'Análisis Detallado',
    'result.detailedDesc': 'Perspectivas y recomendaciones personalizadas',
    'result.yourAnalysis': 'Tu Análisis',
    'result.aiRecommendations': 'Recomendaciones con IA',
    'result.saveReport': 'Guardar Informe',
    'result.backHome': 'Volver al Inicio',
    'result.noSession': 'Sesión no válida. Por favor completa el pago primero.',
    'result.noPhoto': 'No se encontraron datos de foto. Por favor comienza de nuevo.',

    // LooksmaxForm
    'form.title': 'Desbloquea Análisis Premium',
    'form.subtitle': 'Obtén tu puntuación facial detallada, recomendaciones de estilo personalizadas y hoja de ruta de mejora.',
    'form.facialAnalysis': 'Análisis Facial',
    'form.facialAnalysisDesc': 'Evaluación de proporción áurea y simetría',
    'form.styleRec': 'Recomendaciones de Estilo',
    'form.styleRecDesc': 'Consejos personalizados de guardarropa y cuidado',
    'form.bodyOpt': 'Optimización Corporal',
    'form.bodyOptDesc': 'Plan de fitness y mejora postural',
    'form.cta': 'Desbloquear Análisis Premium',
    'form.info': 'Pago único. Sin suscripción.',
  },
};
