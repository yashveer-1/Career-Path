// ============================================================
// PATHFINDER — FULL CAREER DATABASE
// All career data, courses and roadmaps in one place
// ============================================================

const CAREERS = {
  technical: [
    {
      id: "software-dev",
      emoji: "💻", title: "Software Developer", subtitle: "Technology",
      baseMatch: 94,
      desc: "Build apps, websites and systems that millions use daily. The most in-demand job globally right now and for the next decade.",
      salary: "₹5–40 LPA", timeline: "6–18 months", demand: "Extremely High", scope: "Global",
      tags: ["coding","building","problem solving","logic"],
      roadmap: ["Learn Python or JavaScript basics","Build 5 real projects","Master Data Structures & Algorithms","Contribute to open source","Apply for internships"],
      courses: [
        { name:"CS50 by Harvard", url:"https://cs50.harvard.edu/", type:"free", platform:"Harvard/edX", rating:"⭐⭐⭐⭐⭐" },
        { name:"Full Stack Web Dev Bootcamp", url:"https://www.youtube.com/results?search_query=full+stack+web+development+2024+full+course", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"The Web Developer Bootcamp", url:"https://www.udemy.com/course/the-web-developer-bootcamp/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐⭐" },
        { name:"Python for Everybody", url:"https://www.coursera.org/specializations/python", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" }
      ],
      indianContext: "India is the world's IT hub. Companies like TCS, Infosys, Wipro, Flipkart, Swiggy all hire thousands of developers every year.",
      examsTips: "For top product companies, crack DSA on LeetCode. For service companies, focus on projects and communication."
    },
    {
      id: "ai-ml",
      emoji: "🤖", title: "AI / ML Engineer", subtitle: "Artificial Intelligence",
      baseMatch: 91,
      desc: "Build intelligent systems that learn from data. AI is the fastest growing and highest paying tech field of this decade.",
      salary: "₹8–60 LPA", timeline: "12–24 months", demand: "Extremely High", scope: "Global",
      tags: ["data","maths","coding","analysis","logic"],
      roadmap: ["Master Python & Statistics","Learn NumPy, Pandas, Matplotlib","Study ML algorithms (Scikit-learn)","Build real AI projects","Learn Deep Learning (PyTorch/TensorFlow)"],
      courses: [
        { name:"Machine Learning by Andrew Ng", url:"https://www.coursera.org/specializations/machine-learning-introduction", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" },
        { name:"ML Full Course (Free)", url:"https://www.youtube.com/results?search_query=machine+learning+full+course+2024", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"Fast.ai Practical Deep Learning", url:"https://course.fast.ai/", type:"free", platform:"Fast.ai", rating:"⭐⭐⭐⭐⭐" },
        { name:"Deep Learning Specialization", url:"https://www.coursera.org/specializations/deep-learning", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" }
      ],
      indianContext: "India has the second largest AI talent pool globally. ISRO, Razorpay, Zepto and every major tech company is hiring AI engineers urgently.",
      examsTips: "GATE CS helps for PSU jobs. For private sector, build a strong GitHub with AI projects."
    },
    {
      id: "cybersecurity",
      emoji: "🔐", title: "Cybersecurity Analyst", subtitle: "Security & Technology",
      baseMatch: 87,
      desc: "Protect companies from hackers and cyber attacks. One of the fastest growing and most critically needed fields globally.",
      salary: "₹6–35 LPA", timeline: "8–15 months", demand: "Very High", scope: "Global",
      tags: ["problem solving","technical","detail-oriented","coding"],
      roadmap: ["Learn networking basics (CompTIA Network+)","Study ethical hacking fundamentals","Get CEH or CompTIA Security+ cert","Practice on HackTheBox / TryHackMe","Apply for SOC analyst roles"],
      courses: [
        { name:"Google Cybersecurity Certificate", url:"https://www.coursera.org/professional-certificates/google-cybersecurity", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" },
        { name:"Ethical Hacking Full Course", url:"https://www.youtube.com/results?search_query=ethical+hacking+full+course+2024", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"TryHackMe Free Labs", url:"https://tryhackme.com/", type:"free", platform:"TryHackMe", rating:"⭐⭐⭐⭐⭐" },
        { name:"CompTIA Security+ Course", url:"https://www.udemy.com/topic/comptia-security-plus/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐" }
      ],
      indianContext: "With India's digital payment boom and massive data, cybersecurity jobs are exploding. CERT-In, banks and fintech companies all need security experts.",
      examsTips: "CEH (Certified Ethical Hacker) is the gold standard certification in India."
    },
    {
      id: "data-science",
      emoji: "📊", title: "Data Scientist", subtitle: "Data & Analytics",
      baseMatch: 89,
      desc: "Turn raw data into powerful decisions. Every company from cricket to healthcare needs someone who can make sense of data.",
      salary: "₹6–35 LPA", timeline: "8–15 months", demand: "Very High", scope: "Global",
      tags: ["data","analysis","maths","coding","logic"],
      roadmap: ["Learn Python & SQL","Study Statistics & Probability","Master Pandas, NumPy, Matplotlib","Learn ML basics","Build end-to-end data projects"],
      courses: [
        { name:"IBM Data Science Professional", url:"https://www.coursera.org/professional-certificates/ibm-data-science", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" },
        { name:"Data Science Full Course", url:"https://www.youtube.com/results?search_query=data+science+full+course+2024+free", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"Kaggle Free Courses", url:"https://www.kaggle.com/learn", type:"free", platform:"Kaggle", rating:"⭐⭐⭐⭐⭐" },
        { name:"Data Science Bootcamp (Udemy)", url:"https://www.udemy.com/topic/data-science/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐" }
      ],
      indianContext: "India's data economy is growing 23% annually. IPL, Zomato, OLA, Phonepe all run on data science teams.",
      examsTips: "Build a strong Kaggle profile with competition rankings. It gets noticed by recruiters."
    }
  ],

  creative: [
    {
      id: "ux-design",
      emoji: "🎨", title: "UX / UI Designer", subtitle: "Design & Technology",
      baseMatch: 92,
      desc: "Design apps and websites that feel intuitive and look beautiful. The bridge between technology and human experience.",
      salary: "₹4–22 LPA", timeline: "6–12 months", demand: "Very High", scope: "Global",
      tags: ["creative","visual","empathy","design","problem solving"],
      roadmap: ["Learn Figma (free tool)","Study UX principles & design thinking","Build 3 strong case studies","Learn basic HTML/CSS","Apply for junior designer roles"],
      courses: [
        { name:"Google UX Design Certificate", url:"https://www.coursera.org/professional-certificates/google-ux-design", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" },
        { name:"Figma Complete Course (Free)", url:"https://www.youtube.com/results?search_query=figma+complete+course+beginners+2024", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"UI/UX Design Bootcamp", url:"https://www.udemy.com/topic/user-experience-design/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐" },
        { name:"Interaction Design Foundation", url:"https://www.interaction-design.org/", type:"paid", platform:"IDF", rating:"⭐⭐⭐⭐⭐" }
      ],
      indianContext: "Every Indian startup building an app needs UX designers. Swiggy, Zepto, Razorpay and CRED are all known for their exceptional UX teams.",
      examsTips: "Portfolio is everything. 3 great case studies beats any certification."
    },
    {
      id: "content-creator",
      emoji: "🎬", title: "Content Creator / Digital Marketer", subtitle: "Media & Marketing",
      baseMatch: 85,
      desc: "Build brands through video, social media and storytelling. Content creators are among the highest earning independents in India today.",
      salary: "₹3–25 LPA", timeline: "3–8 months", demand: "High", scope: "India + Global",
      tags: ["creative","communication","storytelling","social media"],
      roadmap: ["Pick a niche you love","Learn video editing (CapCut/Premiere)","Start a YouTube or Instagram","Study SEO and analytics","Monetise through brand deals or freelancing"],
      courses: [
        { name:"Digital Marketing Full Course", url:"https://www.youtube.com/results?search_query=digital+marketing+full+course+free+2024", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"Google Digital Marketing Cert", url:"https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" },
        { name:"Video Editing — Premiere Pro", url:"https://www.youtube.com/results?search_query=premiere+pro+full+course+beginners", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"Social Media Marketing (Udemy)", url:"https://www.udemy.com/topic/social-media-marketing/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐" }
      ],
      indianContext: "Ranveer Allahbadia, Nikhil Kamath and Ankur Warikoo are examples of Indians building massive wealth through content. India has 500M+ internet users — the audience is massive.",
      examsTips: "No exam needed. Consistency and quality of content is what gets you hired or noticed."
    },
    {
      id: "product-manager",
      emoji: "🚀", title: "Product Manager", subtitle: "Tech & Business",
      baseMatch: 88,
      desc: "The CEO of a product. You decide what gets built, why and for whom. One of the highest paid and most exciting roles in tech.",
      salary: "₹12–50 LPA", timeline: "2–4 years experience first", demand: "Very High", scope: "Global",
      tags: ["leadership","strategy","communication","analytical","creative"],
      roadmap: ["Work in engineering or design first","Learn product thinking & frameworks","Read 'Inspired' by Marty Cagan","Do a PM internship or APM program","Build a product case study portfolio"],
      courses: [
        { name:"Product Management by Google", url:"https://www.coursera.org/professional-certificates/google-project-management", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" },
        { name:"PM Full Course (Free)", url:"https://www.youtube.com/results?search_query=product+management+full+course+free", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"Reforge Product Programs", url:"https://www.reforge.com/", type:"paid", platform:"Reforge", rating:"⭐⭐⭐⭐⭐" },
        { name:"PM Interview Prep (Udemy)", url:"https://www.udemy.com/topic/product-management/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐" }
      ],
      indianContext: "Flipkart, Razorpay, Zepto and every funded startup in India needs strong PMs. APM programs at these companies are highly competitive and well-paid.",
      examsTips: "MBA from IIM helps but not required. Strong portfolio and STAR method interview skills are key."
    }
  ],

  analytical: [
    {
      id: "finance",
      emoji: "💰", title: "Investment / Finance Analyst", subtitle: "Finance & Business",
      baseMatch: 86,
      desc: "Analyse markets, manage money and help companies grow. From stock markets to VC firms, finance skills are always in demand.",
      salary: "₹5–35 LPA", timeline: "6–18 months", demand: "High", scope: "India + Global",
      tags: ["numbers","analysis","strategy","markets","logic"],
      roadmap: ["Learn Financial Modelling in Excel","Study CFA Level 1 concepts","Understand Indian stock markets","Get internship at broker/bank/startup","Build a mock portfolio and track it"],
      courses: [
        { name:"Financial Markets by Yale (Free)", url:"https://www.coursera.org/learn/financial-markets-global", type:"free", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" },
        { name:"Finance for Beginners (YouTube)", url:"https://www.youtube.com/results?search_query=finance+full+course+beginners+india", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"Excel Financial Modelling", url:"https://www.youtube.com/results?search_query=excel+financial+modelling+course+free", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"CFA Prep Course (Udemy)", url:"https://www.udemy.com/topic/finance/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐" }
      ],
      indianContext: "Zerodha, Groww and Smallcase have created a huge retail investing wave in India. Finance professionals are needed everywhere from startups to Dalal Street.",
      examsTips: "CA is the gold standard in India for finance. MBA from IIM opens top investment banking doors."
    },
    {
      id: "consultant",
      emoji: "🧩", title: "Management Consultant", subtitle: "Strategy & Business",
      baseMatch: 84,
      desc: "Solve complex business problems for companies. Consultants get exposed to multiple industries and are trained to think strategically.",
      salary: "₹8–40 LPA", timeline: "MBA or strong experience first", demand: "High", scope: "Global",
      tags: ["strategy","analysis","communication","problem solving","leadership"],
      roadmap: ["Build strong analytical and communication skills","Do case study practice (Case in Point)","Intern at a consulting firm","Pursue MBA from IIM/IIT for top firms","Learn Excel, PowerPoint and data tools"],
      courses: [
        { name:"Business Analysis & Strategy", url:"https://www.coursera.org/learn/strategy-business", type:"free", platform:"Coursera", rating:"⭐⭐⭐⭐" },
        { name:"Consulting Case Interview Prep", url:"https://www.youtube.com/results?search_query=consulting+case+interview+preparation+free", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"McKinsey Problem Solving Skills", url:"https://www.udemy.com/topic/consulting/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐" },
        { name:"Strategic Management (Coursera)", url:"https://www.coursera.org/specializations/strategic-management", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐" }
      ],
      indianContext: "McKinsey, BCG, Bain hire from top IIMs. Indian firms like Deloitte and EY have massive India offices. CAT + MBA is the most common route.",
      examsTips: "CAT score for IIM. Focus on case cracking, communication and mental maths."
    }
  ],

  social: [
    {
      id: "hr-people",
      emoji: "👥", title: "HR / People & Culture", subtitle: "Human Resources",
      baseMatch: 85,
      desc: "Shape company culture, hire the right people and make organisations great places to work. HR is evolving rapidly with tech.",
      salary: "₹4–22 LPA", timeline: "6–12 months", demand: "High", scope: "India",
      tags: ["empathy","communication","leadership","people","organisation"],
      roadmap: ["Study organisational psychology basics","Get MBA HR or PGDHRM","Do internship at any company HR team","Learn HR tech tools (Darwinbox, Keka)","Build skills in recruitment and L&D"],
      courses: [
        { name:"HR Management (Coursera)", url:"https://www.coursera.org/learn/human-resource-management", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐" },
        { name:"People Analytics (Wharton Free)", url:"https://www.coursera.org/learn/wharton-people-analytics", type:"free", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" },
        { name:"HR for Beginners (YouTube)", url:"https://www.youtube.com/results?search_query=human+resource+management+full+course", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"Leadership & Management (Udemy)", url:"https://www.udemy.com/topic/management/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐" }
      ],
      indianContext: "Every company from TCS to a 10-person startup needs HR. Culture and people management is becoming a CEO-level priority in Indian companies.",
      examsTips: "MBA HR from XLRI Jamshedpur or TISS Mumbai are the most respected in India."
    },
    {
      id: "edtech",
      emoji: "🎓", title: "EdTech / Education Professional", subtitle: "Education & Training",
      baseMatch: 82,
      desc: "Educate and inspire the next generation. EdTech is a ₹5 lakh crore industry in India. Teaching is being reinvented.",
      salary: "₹3–20 LPA", timeline: "3–8 months", demand: "High", scope: "India",
      tags: ["communication","teaching","empathy","content","social"],
      roadmap: ["Pick a subject you're passionate about","Start a YouTube channel or blog","Build an online course on Udemy","Join EdTech company as instructor or PM","Scale content and build a community"],
      courses: [
        { name:"How to Create Online Courses", url:"https://www.youtube.com/results?search_query=how+to+create+online+course+free+2024", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"Instructional Design (Coursera)", url:"https://www.coursera.org/learn/instructional-design-digital-media-elearning", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐" },
        { name:"Public Speaking Course", url:"https://www.youtube.com/results?search_query=public+speaking+communication+course+free", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"Teaching & Training (Udemy)", url:"https://www.udemy.com/topic/training/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐" }
      ],
      indianContext: "PhysicsWallah turned a YouTube teacher into a ₹1.1 lakh crore unicorn. Unacademy, BYJU'S and Vedantu have created thousands of educator jobs.",
      examsTips: "No specific exam. Quality of teaching and content consistency is what matters."
    },
    {
      id: "psychology",
      emoji: "🧠", title: "Psychologist / Counsellor", subtitle: "Mental Health & Wellbeing",
      baseMatch: 80,
      desc: "Help people understand themselves and overcome challenges. Mental health is India's next big focus area with massive demand.",
      salary: "₹3–18 LPA", timeline: "3–5 year degree needed", demand: "Growing Fast", scope: "India + Global",
      tags: ["empathy","listening","communication","helping","analysis"],
      roadmap: ["Pursue BA/MA Psychology or B.Sc Psychology","Get RCI registration for clinical work","Study CBT and counselling techniques","Intern at hospitals or NGOs","Build private practice or join corporate wellness"],
      courses: [
        { name:"Introduction to Psychology (Yale)", url:"https://www.coursera.org/learn/introduction-psychology", type:"free", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" },
        { name:"Psychology Full Course (YouTube)", url:"https://www.youtube.com/results?search_query=psychology+full+course+beginners", type:"free", platform:"YouTube", rating:"⭐⭐⭐⭐" },
        { name:"CBT Fundamentals (Udemy)", url:"https://www.udemy.com/topic/psychology/", type:"paid", platform:"Udemy", rating:"⭐⭐⭐⭐" },
        { name:"Positive Psychology (Coursera)", url:"https://www.coursera.org/learn/positive-psychology", type:"paid", platform:"Coursera", rating:"⭐⭐⭐⭐⭐" }
      ],
      indianContext: "India has 1 mental health professional per 100,000 people. The gap is massive. Corporate wellness programs, schools and hospitals all urgently need psychologists.",
      examsTips: "NIMHANS entrance for top government roles. TISS for social work. Private colleges for quicker entry."
    }
  ]
};

// Get all careers as flat array
function getAllCareers() {
  const flat = [];
  Object.entries(CAREERS).forEach(([cat, list]) => {
    list.forEach(c => flat.push({ ...c, category: c.category || cat }));
  });
  return flat;
}

// Get top career matches based on ALL data sources:
// quiz scores + emotion + keywords + career signals + confidence + passion
function getCareerMatches(scores, emotion, keywords, options = {}) {
  const { signals = null, confidence = null, passion = null } = options;

  const all = getAllCareers();
  const sortedCats = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const topCat = sortedCats[0][0];
  const secondCat = sortedCats[1][0];

  // Map Gemini's signal names to our internal category keys
  const signalToCategory = {
    'Technical / Coding': 'technical',
    'Creative / Design': 'creative',
    'Data / Analytics': 'analytical',
    'People / Social': 'social',
    'Business / Finance': 'analytical'
  };

  const scored = all.map(career => {
    let score = career.baseMatch;
    let breakdown = []; // for transparency — "why this career" view

    // ── Quiz scores (40% weight) ──
    const catCareers = CAREERS[topCat] || [];
    if(catCareers.find(c=>c.id===career.id)) { score += 8; breakdown.push(`Strong match with your top quiz trait (${topCat})`); }
    const catCareers2 = CAREERS[secondCat] || [];
    if(catCareers2.find(c=>c.id===career.id)) { score += 4; breakdown.push(`Also aligns with your secondary trait (${secondCat})`); }

    // ── Keywords from Compromise.js (15% weight) ──
    if(keywords && keywords.length) {
      let kwHits = 0;
      keywords.forEach(kw => {
        if(career.tags.some(tag => tag.includes(kw.toLowerCase()) || kw.toLowerCase().includes(tag))) kwHits++;
      });
      if(kwHits > 0) { score += Math.min(6, kwHits * 2); breakdown.push(`${kwHits} keyword(s) from your writing matched this field`); }
    }

    // ── Career signals from Gemini (25% weight) — NEW, now actually used ──
    if(signals) {
      const careerCategory = career.category || Object.keys(CAREERS).find(cat => CAREERS[cat].find(c=>c.id===career.id));
      Object.entries(signals).forEach(([signalName, signalVal]) => {
        if(signalToCategory[signalName] === careerCategory) {
          const boost = Math.round((signalVal/100) * 10);
          if(boost > 0) { score += boost; breakdown.push(`Your paragraph showed a ${signalVal}% signal toward ${signalName}`); }
        }
      });
    }

    // ── Confidence score (10% weight) — NEW, now actually used ──
    if(confidence !== null) {
      if(confidence >= 65) {
        // High confidence → boost ambitious/high-demand careers
        if(career.demand === 'Extremely High' || career.demand === 'Very High') { score += 4; breakdown.push('Your confident writing style fits this competitive, high-demand field'); }
      } else if(confidence < 40) {
        // Lower confidence → slightly favour clearer-path careers
        if(career.timeline.includes('6') || career.timeline.includes('8')) { score += 3; breakdown.push('This path has a clear, well-defined timeline — good for building confidence'); }
      }
    }

    // ── Passion level (10% weight) — NEW, now actually used ──
    if(passion !== null && passion >= 70) {
      if(career.demand === 'Extremely High' || career.scope === 'Global') { score += 3; breakdown.push('Your high passion score suggests you could thrive in this ambitious field'); }
    }

    // ── Emotion-based adjustment ──
    if(emotion === 'fear' && career.salary.includes('₹5')) { score += 2; breakdown.push('Considered your current uncertainty — this is a stable, well-trodden path'); }
    if(emotion === 'joy' && career.demand === 'Extremely High') { score += 3; breakdown.push('Your enthusiasm matches well with this high-growth field'); }

    return { ...career, matchScore: Math.min(99, Math.round(score)), whyMatch: breakdown };
  });

  return scored.sort((a,b)=>b.matchScore-a.matchScore).slice(0,4);
}

// ─── Save counselling session signals in the SAME format as quiz/NLP ───
// Call this from counselling.html after the session completes
function saveCounsellingSignals(sessionSummary) {
  // Basic keyword-based category detection from the free-text answers
  const text = Object.values(sessionSummary).join(' ').toLowerCase();
  const categoryKeywords = {
    technical: ['code','coding','tech','engineer','computer','software','build','app','program'],
    creative: ['design','creative','art','draw','content','video','music','write'],
    analytical: ['data','analysis','numbers','finance','business','strategy','research'],
    social: ['people','help','teach','talk','communicate','team','lead']
  };
  const scores = { creative:1, technical:1, analytical:1, social:1 }; // baseline so no category is zero
  Object.entries(categoryKeywords).forEach(([cat, kws]) => {
    kws.forEach(kw => { if(text.includes(kw)) scores[cat] += 2; });
  });

  // Merge with any existing scores instead of overwriting
  const existing = JSON.parse(localStorage.getItem('pf_scores') || '{"creative":0,"technical":0,"analytical":0,"social":0}');
  const merged = {
    creative: existing.creative + scores.creative,
    technical: existing.technical + scores.technical,
    analytical: existing.analytical + scores.analytical,
    social: existing.social + scores.social
  };
  localStorage.setItem('pf_scores', JSON.stringify(merged));
  localStorage.setItem('pf_counselling_done', 'true');
  localStorage.setItem('pf_counselling_summary', JSON.stringify(sessionSummary));
}
