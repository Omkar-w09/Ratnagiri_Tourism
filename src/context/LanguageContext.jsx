import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext(null);

const translations = {
  en: {
    languageCode: "EN",

    brandFirst: "Explore",
    brandSecond: "Ratnagiri",
    tagline: "Your Gateway to the Konkan Coast",

    home: "Home",
    places: "Places",
    hiddenGems: "Hidden Gems",
    food: "Food",
    rentals: "Rentals",
    guides: "Guides",
    emergency: "Emergency",
    emergencySupport: "Emergency Support",
    signIn: "Sign In",
    register: "Register",

    heroBadge: "Discover the Soul of the Konkan Coast",
    heroLineOne: "Explore the Beauty of",
    heroLineTwo: "Ratnagiri",

    heroDescription:
      "Discover pristine beaches, ancient sea forts, hidden coastal gems, authentic Konkani cuisine, trusted local guides and unforgettable travel experiences.",

    safetySupport: "Safety Support",
    mapsDirections: "Maps and Directions",
    localRecommendations: "Local Recommendations",

    destination: "Destination",
    destinationPlaceholder: "Where do you want to go?",
    category: "Category",
    allCategories: "All Categories",
    beaches: "Beaches",
    historicForts: "Historic Forts",
    localFood: "Local Food",
    religiousPlaces: "Religious Places",

    travelDate: "Travel Date",
    travellers: "Travellers",
    oneTraveller: "1 Traveller",
    twoTravellers: "2 Travellers",
    threeTravellers: "3 Travellers",
    fourTravellers: "4 Travellers",
    fiveTravellers: "5+ Travellers",

    search: "Search",
    exploreDestinations: "Explore Destinations",
    planTrip: "Plan My Trip",

    touristPlacesCount: "Tourist Places",
    hiddenGemsCount: "Hidden Gems",
    safetySupportCount: "Safety Support",
    localExperience: "Local Experience",
    scrollDiscover: "Scroll to Discover",
  },

  mr: {
    languageCode: "मराठी",

    brandFirst: "एक्सप्लोर",
    brandSecond: "रत्नागिरी",
    tagline: "कोकण किनारपट्टीचे तुमचे प्रवेशद्वार",

    home: "मुख्यपृष्ठ",
    places: "पर्यटन स्थळे",
    hiddenGems: "लपलेली ठिकाणे",
    food: "खाद्यपदार्थ",
    rentals: "वाहन भाड्याने",
    guides: "स्थानिक मार्गदर्शक",
    emergency: "आपत्कालीन मदत",
    emergencySupport: "आपत्कालीन मदत",
    signIn: "लॉग इन",
    register: "नोंदणी",

    heroBadge: "कोकण किनारपट्टीचे सौंदर्य अनुभवा",
    heroLineOne: "रत्नागिरीचे सौंदर्य",
    heroLineTwo: "अनुभवा",

    heroDescription:
      "स्वच्छ समुद्रकिनारे, प्राचीन सागरी किल्ले, निसर्गरम्य लपलेली ठिकाणे, अस्सल कोकणी खाद्यपदार्थ, स्थानिक मार्गदर्शक आणि अविस्मरणीय प्रवासाचा अनुभव घ्या.",

    safetySupport: "सुरक्षा मदत",
    mapsDirections: "नकाशे आणि दिशादर्शन",
    localRecommendations: "स्थानिक शिफारसी",

    destination: "ठिकाण",
    destinationPlaceholder: "तुम्हाला कुठे जायचे आहे?",
    category: "प्रकार",
    allCategories: "सर्व प्रकार",
    beaches: "समुद्रकिनारे",
    historicForts: "ऐतिहासिक किल्ले",
    localFood: "स्थानिक खाद्यपदार्थ",
    religiousPlaces: "धार्मिक स्थळे",

    travelDate: "प्रवासाची तारीख",
    travellers: "प्रवासी",
    oneTraveller: "१ प्रवासी",
    twoTravellers: "२ प्रवासी",
    threeTravellers: "३ प्रवासी",
    fourTravellers: "४ प्रवासी",
    fiveTravellers: "५ किंवा अधिक प्रवासी",

    search: "शोधा",
    exploreDestinations: "पर्यटन स्थळे पहा",
    planTrip: "प्रवासाचे नियोजन करा",

    touristPlacesCount: "पर्यटन स्थळे",
    hiddenGemsCount: "लपलेली ठिकाणे",
    safetySupportCount: "सुरक्षा मदत",
    localExperience: "स्थानिक अनुभव",
    scrollDiscover: "अधिक पाहण्यासाठी खाली जा",
  },

  hi: {
    languageCode: "हिंदी",

    brandFirst: "एक्सप्लोर",
    brandSecond: "रत्नागिरी",
    tagline: "कोंकण तट का आपका प्रवेशद्वार",

    home: "मुख्य पृष्ठ",
    places: "पर्यटन स्थल",
    hiddenGems: "छिपे हुए स्थान",
    food: "स्थानीय भोजन",
    rentals: "वाहन किराया",
    guides: "स्थानीय गाइड",
    emergency: "आपातकालीन",
    emergencySupport: "आपातकालीन सहायता",
    signIn: "लॉग इन",
    register: "पंजीकरण",

    heroBadge: "कोंकण तट की सुंदरता का अनुभव करें",
    heroLineOne: "रत्नागिरी की सुंदरता",
    heroLineTwo: "का अनुभव करें",

    heroDescription:
      "स्वच्छ समुद्र तटों, प्राचीन समुद्री किलों, छिपे हुए सुंदर स्थानों, असली कोंकणी भोजन, भरोसेमंद स्थानीय गाइड और यादगार यात्रा अनुभवों का आनंद लें।",

    safetySupport: "सुरक्षा सहायता",
    mapsDirections: "मानचित्र और दिशाएं",
    localRecommendations: "स्थानीय सुझाव",

    destination: "स्थान",
    destinationPlaceholder: "आप कहां जाना चाहते हैं?",
    category: "श्रेणी",
    allCategories: "सभी श्रेणियां",
    beaches: "समुद्र तट",
    historicForts: "ऐतिहासिक किले",
    localFood: "स्थानीय भोजन",
    religiousPlaces: "धार्मिक स्थल",

    travelDate: "यात्रा की तारीख",
    travellers: "यात्री",
    oneTraveller: "1 यात्री",
    twoTravellers: "2 यात्री",
    threeTravellers: "3 यात्री",
    fourTravellers: "4 यात्री",
    fiveTravellers: "5+ यात्री",

    search: "खोजें",
    exploreDestinations: "पर्यटन स्थल देखें",
    planTrip: "यात्रा की योजना बनाएं",

    touristPlacesCount: "पर्यटन स्थल",
    hiddenGemsCount: "छिपे हुए स्थान",
    safetySupportCount: "सुरक्षा सहायता",
    localExperience: "स्थानीय अनुभव",
    scrollDiscover: "और देखने के लिए नीचे जाएं",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("websiteLanguage") || "en";
  });

  useEffect(() => {
    localStorage.setItem("websiteLanguage", language);
    document.documentElement.lang = language;
  }, [language]);

  const text = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        text,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider",
    );
  }

  return context;
}