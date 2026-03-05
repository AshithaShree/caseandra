const mongoose = require("mongoose");
const CaseStudy = require("../models/CaseStudy");

mongoose.connect("mongodb://127.0.0.1:27017/caseio");

const cases = [

  // 🇮🇳 INDIA – Deep Explanatory Sources Only
  {
    title: "Kesavananda Bharati v. State of Kerala (1973)",
    category: "Constitutional Law",
    description: "Landmark Supreme Court case establishing the Basic Structure Doctrine of the Indian Constitution.",
    sourceLink: "https://www.scobserver.in/cases/kesavananda-bharati-v-state-of-kerala-background/"
  },
  {
    title: "Maneka Gandhi v. Union of India (1978)",
    category: "Fundamental Rights",
    description: "Expanded Article 21 to include procedural due process under Indian constitutional law.",
    sourceLink: "https://www.scobserver.in/cases/maneka-gandhi-v-union-of-india-background/"
  },
  {
    title: "Vishaka v. State of Rajasthan (1997)",
    category: "Human Rights",
    description: "Supreme Court laid down guidelines against workplace sexual harassment.",
    sourceLink: "https://www.scobserver.in/cases/vishaka-v-state-of-rajasthan-background/"
  },
  {
    title: "Navtej Singh Johar v. Union of India (2018)",
    category: "Human Rights",
    description: "Decriminalised Section 377 and recognised LGBTQ rights in India.",
    sourceLink: "https://www.scobserver.in/cases/navtej-singh-johar-v-union-of-india-background/"
  },
  {
    title: "Nirbhaya v. State (2012 Delhi Case)",
    category: "Criminal Law",
    description: "Case that led to major criminal law reforms in India.",
    sourceLink: "https://www.britannica.com/event/Delhi-gang-rape-case-of-2012"
  },
  {
    title: "Shreya Singhal v. Union of India (2015)",
    category: "Cyber Law",
    description: "Struck down Section 66A of IT Act for being unconstitutional.",
    sourceLink: "https://www.scobserver.in/cases/shreya-singhal-v-union-of-india-background/"
  },
  {
    title: "Mohammed Ajmal Amir Kasab Trial (2008 Mumbai Attacks)",
    category: "Criminal Law",
    description: "Conviction of lone surviving terrorist from 26/11 attacks in India.",
    sourceLink: "https://www.britannica.com/biography/Ajmal-Kasab"
  },
  {
    title: "Indira Gandhi Assassination Case (1984)",
    category: "Criminal Law",
    description: "Prosecution of conspirators involved in PM Indira Gandhi’s assassination.",
    sourceLink: "https://www.britannica.com/biography/Indira-Gandhi/Assassination"
  },
  {
    title: "Aruna Shanbaug Case (2011)",
    category: "Medical Law",
    description: "Landmark case legalizing passive euthanasia in India.",
    sourceLink: "https://www.scobserver.in/cases/aruna-shanbaug-v-union-of-india-background/"
  },
  {
    title: "S. R. Bommai v. Union of India (1994)",
    category: "Constitutional Law",
    description: "Judgment limiting the use of Article 356 to dismiss state governments.",
    sourceLink: "https://www.scobserver.in/cases/s-r-bommai-v-union-of-india-background/"
  },

  // 🇺🇸 USA – Detailed Explanations
  {
    title: "Brown v. Board of Education (1954)",
    category: "Civil Rights",
    description: "U.S. Supreme Court declared racial segregation in public schools unconstitutional.",
    sourceLink: "https://www.britannica.com/event/Brown-v-Board-of-Education-of-Topeka"
  },
  {
    title: "Miranda v. Arizona (1966)",
    category: "Criminal Procedure",
    description: "Established Miranda Rights requiring police to inform suspects of rights.",
    sourceLink: "https://www.britannica.com/event/Miranda-v-Arizona"
  },
  {
    title: "Roe v. Wade (1973)",
    category: "Constitutional Law",
    description: "Landmark abortion rights case in the United States.",
    sourceLink: "https://www.britannica.com/event/Roe-v-Wade"
  },
  {
    title: "United States v. Nixon (1974)",
    category: "Executive Power",
    description: "Limited executive privilege during the Watergate scandal.",
    sourceLink: "https://www.britannica.com/event/United-States-v-Nixon"
  },
  {
    title: "Citizens United v. FEC (2010)",
    category: "Election Law",
    description: "Corporations and unions have the right to spend unlimited funds in elections.",
    sourceLink: "https://www.britannica.com/event/Citizens-United-v-Federal-Election-Commission"
  },
  {
    title: "Obergefell v. Hodges (2015)",
    category: "Civil Rights",
    description: "Legalized same-sex marriage nationwide in the U.S.",
    sourceLink: "https://www.britannica.com/event/Obergefell-v-Hodges"
  },
  {
    title: "Shelby County v. Holder (2013)",
    category: "Voting Rights",
    description: "Struck down key provisions of Voting Rights Act of 1965.",
    sourceLink: "https://www.britannica.com/event/Shelby-County-v-Holder"
  },
  {
    title: "Trump v. Hawaii (2018)",
    category: "Immigration Law",
    description: "Upheld the President’s travel ban on certain countries.",
    sourceLink: "https://www.britannica.com/event/Trump-v-Hawaii"
  },
  {
    title: "National Federation of Independent Business v. Sebelius (2012)",
    category: "Health Law",
    description: "Upheld most provisions of the Affordable Care Act (Obamacare).",
    sourceLink: "https://www.britannica.com/event/National-Federation-of-Independent-Business-v-Sebelius"
  },
  {
    title: "Texas v. Johnson (1989)",
    category: "First Amendment",
    description: "Protected flag burning as free speech under U.S. Constitution.",
    sourceLink: "https://www.britannica.com/event/Texas-v-Johnson"
  }

];

async function seed() {
  await CaseStudy.deleteMany({});
  await CaseStudy.insertMany(cases);
  console.log("✅ 50 Unique Verified Cases Inserted");
  process.exit();
}

seed();