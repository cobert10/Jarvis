import { Explora } from "next/font/google";

export const subjects = [
  "all",
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];

export const navItems = [
  {label: "Home", link: "/dashboard/home"},
  {label:"Companions",  link: "/dashboard/companions"},
  {label:"My Progress", link: "/dashboard/my-progress"}
]

export const subjectsColors = {
  Science: "#E5D0FF",
  Maths: "#FFDA6E",
  Language: "#BDE7FF",
  Coding: "#FFC8E4",
  History: "#FFECC8",
  Economics: "#C8FFDF",
};

// export const voices = {
//   male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
//   female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
// };

export const voices = [
  "Arnold Schwarzenegger",
  "Morgan Freeman",
  "Donald Trump"
]

export const teaching_style = [
  "College Professor",
  "Casual",
  "Expert",
  "Tell it like I'm 5 years old"
]

export const recentSessions = [
  {
    id: "1",
    subject: "Science",
    name: "Eddie the Planet Protector",
    topic: "Ecosystems and food chains",
    duration: 45,
    color: "#E5D0FF",
  },
  {
    id: "2",
    subject: "Language",
    name: "Grammarina the Sentence Sorceress",
    topic: "Parts of speech and sentence structure",
    duration: 30,
    color: "#FFDA6E",
  },
  {
    id: "3",
    subject: "Science",
    name: "Astro Andy the Space Navigator",
    topic: "The solar system and beyond",
    duration: 30,
    color: "#BDE7FF",
  },
  {
    id: "4",
    subject: "Coding",
    name: "Pat the Python tamer",
    topic: "Learn python progamming from zero to hero",
    duration: 45,
    color: "#FFC8E4",
  },
  {
    id: "5",
    subject: "History",
    name: "Hugo The historian",
    topic: "The Industrial Revolution",
    duration: 15,
    color: "#FFECC8",
  },
  {
    id: "6",
    subject: "Economics",
    name: "Finley the Budget Beast",
    topic: "Budgeting, saving, and spending",
    duration: 10,
    color: "#C8FFDF",
  },
];
