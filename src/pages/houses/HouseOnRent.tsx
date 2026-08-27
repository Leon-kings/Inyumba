/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// HouseOnRent.tsx - Complete file with same functionality as Hero.tsx
// @ts-nocheck
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BedIcon from "@mui/icons-material/Bed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SchoolIcon from "@mui/icons-material/School";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BathroomIcon from "@mui/icons-material/Bathroom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import SecurityIcon from "@mui/icons-material/Security";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import LoginIcon from "@mui/icons-material/Login";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PhoneIcon from "@mui/icons-material/Phone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DomainIcon from "@mui/icons-material/Domain";

// ============================================================
// API CONFIGURATION
// ============================================================

const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================================================
// TRANSLATION HELPER - Google Translate API
// ============================================================

const translateContent = async (
  text: string,
  targetLang: string,
): Promise<string> => {
  if (!text || targetLang === "en") return text;
  if (targetLang === "rw" || targetLang === "fr") {
    try {
      const response = await axios.post(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
      );
      if (response.data && response.data[0] && response.data[0][0]) {
        return response.data[0][0][0] || text;
      }
      return text;
    } catch (error) {
      console.error("Translation error for text:", text, error);
      return text;
    }
  }
  return text;
};

// ============================================================
// LOCATION DATA - All 30 Districts of Rwanda
// ============================================================

const ALL_DISTRICTS = [
  "Nyarugenge",
  "Gasabo",
  "Kicukiro",
  "Nyanza",
  "Gisagara",
  "Nyaruguru",
  "Huye",
  "Muhanga",
  "Kamonyi",
  "Ruhango",
  "Karongi",
  "Rutsiro",
  "Nyabihu",
  "Rubavu",
  "Rusizi",
  "Nyamasheke",
  "Ngororero",
  "Musanze",
  "Burera",
  "Gakenke",
  "Rulindo",
  "Gicumbi",
  "Bugesera",
  "Gatsibo",
  "Kayonza",
  "Kirehe",
  "Ngoma",
  "Nyagatare",
  "Rwamagana",
];

// ============================================================
// SECTORS DATA - Complete with all sectors per district
// ============================================================

const ALL_SECTORS: Record<string, string[]> = {
  Nyarugenge: [
    "Gitega",
    "Kanyinya",
    "Kigali",
    "Kimisagara",
    "Mageregere",
    "Muhima",
    "Nyakabanda",
    "Nyamirambo",
    "Nyarugenge",
    "Rwezamenyo",
  ],
  Gasabo: [
    "Bumbogo",
    "Gatsata",
    "Gikomero",
    "Gisozi",
    "Jabana",
    "Jali",
    "Kacyiru",
    "Kimihurura",
    "Kimironko",
    "Kinyinya",
    "Ndera",
    "Nduba",
    "Remera",
    "Rusororo",
    "Rutunga",
  ],
  Kicukiro: [
    "Gahanga",
    "Gatenga",
    "Gikondo",
    "Kagarama",
    "Kanombe",
    "Kicukiro",
    "Kigarama",
    "Masaka",
    "Niboye",
    "Nyarugunga",
  ],
  Nyanza: [
    "Busasamana",
    "Busoro",
    "Cyabakamyi",
    "Kibilizi",
    "Kigoma",
    "Mukingo",
    "Muyira",
    "Ntyazo",
    "Nyagisozi",
    "Rwabicuma",
  ],
  Gisagara: [
    "Gikonko",
    "Gishubi",
    "Kansi",
    "Kibirizi",
    "Kigembe",
    "Mamba",
    "Muganza",
    "Mugombwa",
    "Mukindo",
    "Musha",
    "Ndora",
    "Nyanza",
    "Save",
  ],
  Nyaruguru: [
    "Busanze",
    "Cyahinda",
    "Kibeho",
    "Kivu",
    "Mata",
    "Muganza",
    "Munini",
    "Ngera",
    "Ngoma",
    "Nyabimata",
    "Nyagisozi",
    "Ruheru",
    "Ruramba",
    "Rusenge",
  ],
  Huye: [
    "Gishamvu",
    "Huye",
    "Karama",
    "Kigoma",
    "Kinazi",
    "Maraba",
    "Mbazi",
    "Mukura",
    "Ngoma",
    "Ruhashya",
    "Rusatira",
    "Rwaniro",
    "Simbi",
    "Tumba",
  ],
  Muhanga: [
    "Cyeza",
    "Kabacuzi",
    "Kibangu",
    "Kiyumba",
    "Muhanga",
    "Mushishiro",
    "Nyabinoni",
    "Nyamabuye",
    "Nyarusange",
    "Rongi",
    "Rugendabari",
    "Shyogwe",
  ],
  Kamonyi: [
    "Gacurabwenge",
    "Karama",
    "Kayenzi",
    "Kayumbu",
    "Mugina",
    "Musambira",
    "Ngamba",
    "Nyamiyaga",
    "Nyarubaka",
    "Rugarika",
    "Rukoma",
    "Runda",
  ],
  Ruhango: [
    "Bweramana",
    "Byimana",
    "Kabagali",
    "Kinazi",
    "Kinihira",
    "Mbuye",
    "Mwendo",
    "Ntongwe",
    "Ruhango",
  ],
  Karongi: [
    "Bwishyura",
    "Gashari",
    "Gishyita",
    "Gitesi",
    "Mubuga",
    "Murambi",
    "Murundi",
    "Mutuntu",
    "Rubengera",
    "Rugabano",
    "Ruganda",
    "Rwankuba",
    "Twumba",
  ],
  Rutsiro: [
    "Boneza",
    "Gihango",
    "Kigeyo",
    "Kivumu",
    "Manihira",
    "Mukura",
    "Murunda",
    "Musasa",
    "Mushonyi",
    "Mushubati",
    "Nyabirasi",
    "Ruhango",
    "Rusebeya",
  ],
  Nyabihu: [
    "Bigogwe",
    "Jenda",
    "Jomba",
    "Kabatwa",
    "Karago",
    "Kintobo",
    "Mukamira",
    "Muringa",
    "Rambura",
    "Rugera",
    "Rurembo",
    "Shyira",
  ],
  Rubavu: [
    "Bugeshi",
    "Busasamana",
    "Cyanzarwe",
    "Gisenyi",
    "Kanama",
    "Kanzenze",
    "Mudende",
    "Nyakiriba",
    "Nyamyumba",
    "Nyundo",
    "Rubavu",
    "Rugerero",
  ],
  Rusizi: [
    "Bugarama",
    "Butare",
    "Bweyeye",
    "Gashonga",
    "Giheke",
    "Gihundwe",
    "Gikundamvura",
    "Gitambi",
    "Kamembe",
    "Muganza",
    "Mururu",
    "Nkanka",
    "Nkombo",
    "Nkungu",
    "Nyakabuye",
    "Nyakarenzo",
    "Nzahaha",
    "Rwimbogo",
  ],
  Nyamasheke: [
    "Bushekeri",
    "Bushenge",
    "Cyato",
    "Gihombo",
    "Kagano",
    "Kanjongo",
    "Karambi",
    "Karengera",
    "Kirimbi",
    "Macuba",
    "Mahembe",
    "Nyabitekeri",
    "Rangiro",
    "Ruharambuga",
    "Shangi",
  ],
  Ngororero: [
    "Bwira",
    "Gatumba",
    "Hindiro",
    "Kabaya",
    "Kageyo",
    "Kavumu",
    "Matyazo",
    "Muhanda",
    "Muhororo",
    "Ndaro",
    "Ngororero",
    "Nyange",
    "Sovu",
  ],
  Musanze: [
    "Busogo",
    "Cyuve",
    "Gacaca",
    "Gashaki",
    "Gataraga",
    "Kimonyi",
    "Kinigi",
    "Muhoza",
    "Muko",
    "Musanze",
    "Nkotsi",
    "Nyange",
    "Remera",
    "Rwaza",
    "Shingiro",
  ],
  Burera: [
    "Bungwe",
    "Butaro",
    "Cyanika",
    "Cyeru",
    "Gahunga",
    "Gatebe",
    "Gitovu",
    "Kagogo",
    "Kinoni",
    "Kinyababa",
    "Kivuye",
    "Nemba",
    "Rugarama",
    "Rugengabari",
    "Ruhunde",
    "Rusarabuye",
    "Rwerere",
  ],
  Gakenke: [
    "Busengo",
    "Coko",
    "Cyabingo",
    "Gakenke",
    "Gashenyi",
    "Janja",
    "Kamubuga",
    "Karambo",
    "Kivuruga",
    "Mataba",
    "Minazi",
    "Mugunga",
    "Muhondo",
    "Muyongwe",
    "Muzo",
    "Nemba",
    "Ruli",
    "Rusasa",
    "Rushashi",
  ],
  Rulindo: [
    "Base",
    "Burega",
    "Bushoki",
    "Buyoga",
    "Cyinzuzi",
    "Cyungo",
    "Kinihira",
    "Kisaro",
    "Masoro",
    "Mbogo",
    "Murambi",
    "Ngoma",
    "Ntarabana",
    "Rukozo",
    "Rusiga",
    "Shyorongi",
    "Tumba",
  ],
  Gicumbi: [
    "Bukure",
    "Bwisige",
    "Byumba",
    "Cyumba",
    "Giti",
    "Kageyo",
    "Kaniga",
    "Manyagiro",
    "Miyove",
    "Mukarange",
    "Muko",
    "Mutete",
    "Nyamiyaga",
    "Nyankenke",
    "Rubaya",
    "Rukomo",
    "Rushaki",
    "Rutare",
    "Ruvune",
    "Rwamiko",
    "Shangasha",
  ],
  Rwamagana: [
    "Fumbwe",
    "Gahengeri",
    "Gishali",
    "Karenge",
    "Kigabiro",
    "Muhazi",
    "Munyaga",
    "Munyiginya",
    "Musha",
    "Muyumbu",
    "Mwulire",
    "Nyakaliro",
    "Nzige",
    "Rubona",
  ],
  Nyagatare: [
    "Gatunda",
    "Karama",
    "Karangazi",
    "Katabagemu",
    "Kiyombe",
    "Matimba",
    "Mimuri",
    "Mukama",
    "Musheri",
    "Nyagatare",
    "Rukomo",
    "Rwempasha",
    "Rwimiyaga",
    "Tabagwe",
  ],
  Gatsibo: [
    "Gasange",
    "Gatsibo",
    "Gitoki",
    "Kabarore",
    "Kageyo",
    "Kiramuruzi",
    "Kiziguro",
    "Muhura",
    "Murambi",
    "Ngarama",
    "Nyagihanga",
    "Remera",
    "Rugarama",
    "Rwimbogo",
  ],
  Kayonza: [
    "Gahini",
    "Kabare",
    "Kabarondo",
    "Mukarange",
    "Murama",
    "Murundi",
    "Mwiri",
    "Ndego",
    "Nyamirama",
    "Rukara",
    "Ruramira",
    "Rwinkwavu",
  ],
  Kirehe: [
    "Gahara",
    "Gatore",
    "Kigarama",
    "Kigina",
    "Kirehe",
    "Mahama",
    "Mpanga",
    "Musaza",
    "Mushikiri",
    "Nasho",
    "Nyamugari",
    "Nyarubuye",
  ],
  Ngoma: [
    "Gashanda",
    "Jarama",
    "Karembo",
    "Kazo",
    "Kibungo",
    "Mugesera",
    "Murama",
    "Mutenderi",
    "Remera",
    "Rukira",
    "Rukumberi",
    "Rurenge",
    "Sake",
    "Zaza",
  ],
  Bugesera: [
    "Gashora",
    "Juru",
    "Kamabuye",
    "Mareba",
    "Mayange",
    "Musenyi",
    "Mwogo",
    "Ngeruka",
    "Ntarama",
    "Nyamata",
    "Nyarugenge",
    "Rilima",
    "Ruhuha",
    "Rweru",
    "Shyara",
  ],
};

// ============================================================
// CELLS DATA - Complete with all cells per sector
// ============================================================

const ALL_CELLS: Record<string, string[]> = {
  // ----- Nyarugenge District -----
  Gitega: ["Akabahizi", "Akabeza", "Gacyamo", "Kigarama", "Kinyange", "Kora"],
  Kanyinya: ["Nyamweru", "Nzove", "Taba"],
  Kigali: ["Kigali", "Mwendo", "Nyabugogo", "Ruriba", "Rwesero"],
  Kimisagara: ["Kamuhoza", "Katabaro", "Kimisagara"],
  Mageregere: [
    "Kankuba",
    "Kavumu",
    "Mataba",
    "Ntungamo",
    "Nyarufunzo",
    "Nyarurenzi",
    "Runzenze",
  ],
  Muhima: [
    "Amahoro",
    "Kabasengerezi",
    "Kabeza",
    "Nyabugogo",
    "Rugenge",
    "Tetero",
    "Ubumwe",
  ],
  Nyakabanda: ["Munanira I", "Munanira II", "Nyakabanda I", "Nyakabanda II"],
  Nyamirambo: ["Cyivugiza", "Gasharu", "Mumena", "Rugarama"],
  Nyarugenge: ["Agatare", "Biryogo", "Kiyovu", "Rwampara"],
  Rwezamenyo: ["Kabuguru I", "Kabuguru II", "Rwezamenyo I", "Rwezamenyo II"],

  // ----- Gasabo District -----
  Bumbogo: [
    "Kinyaga",
    "Musave",
    "Mvuzo",
    "Ngara",
    "Nkuzuzu",
    "Nyabikenke",
    "Nyagasozi",
  ],
  Gatsata: ["Karuruma", "Nyamabuye", "Nyamugari"],
  Gikomero: ["Gasagara", "Gicaca", "Kibara", "Munini", "Murambi"],
  Gisozi: ["Musezero", "Ruhango"],
  Jabana: ["Akamatamu", "Bweramvura", "Kabuye", "Kidashya", "Ngiryi"],
  Jali: [
    "Agateko",
    "Buhiza",
    "Muko",
    "Nkusi",
    "Nyabuliba",
    "Nyakabungo",
    "Nyamitanga",
  ],
  Kacyiru: ["Kamatamu", "Kamutwa", "Kibaza"],
  Kimihurura: ["Kamukina", "Kimihurura", "Rugando"],
  Kimironko: ["Bibare", "Kibagabaga", "Nyagatovu"],
  Kinyinya: ["Gacuriro", "Kagugu", "Murama"],
  Ndera: ["Bwiza", "Cyaruzinge", "Kibenga", "Masoro", "Mukuyu", "Rudashya"],
  Nduba: [
    "Butare",
    "Gasanze",
    "Gasura",
    "Gatunga",
    "Muremure",
    "Sha",
    "Shango",
  ],
  Remera: ["Nyabisindu", "Nyarutarama", "Rukiri I", "Rukiri II"],
  Rusororo: [
    "Bisenga",
    "Kabuga I",
    "Kabuga II",
    "Kinyana",
    "Mbandazi",
    "Nyagahinga",
    "Ruhanga",
  ],
  Rutunga: ["Gasabo", "Indatemwa", "Kabaliza", "Kacyatwa", "Kigabiro"],

  // ----- Kicukiro District -----
  Gahanga: ["Gahanga", "Kagasa", "Karembure", "Murinja", "Nunga", "Rwabutenge"],
  Gatenga: ["Gatenga", "Karambo", "Nyanza", "Nyarurama"],
  Gikondo: ["Kagunga", "Kanserege", "Kinunga"],
  Kagarama: ["Muyange", "Rukatsa"],
  Kanombe: ["Busanza", "Karama", "Rubirizi"],
  Kicukiro: ["Kagina", "Kicukiro", "Ngoma"],
  Kigarama: ["Bwerankori", "Karugira"],
  Masaka: ["Ayabaraya", "Cyimo", "Gako", "Gitaraga", "Mbabe", "Rusheshe"],
  Niboye: ["Gatare", "Niboye", "Nyakabanda"],
  Nyarugunga: ["Kamashashi", "Nonko", "Rwimbogo"],

  // ----- South Province - Nyanza District -----
  Busasamana: ["Gahondo", "Kibinja"],
  Busoro: [
    "Gitovu",
    "Kimirama",
    "Masangano",
    "Munyinya",
    "Rukingiro",
    "Shyira",
  ],
  Cyabakamyi: ["Kadaho", "Nyabinyenga", "Rubona"],
  Kibilizi: ["Cyeru", "Mbuye", "Mututu", "Rwotso"],
  Kigoma: ["Butansinda", "Butara", "Gahombo", "Gasoro", "Mulinja"],
  Mukingo: ["Cyerezo", "Gatagara", "Kiruli", "Mpanga", "Ngwa", "Nkomero"],
  Muyira: ["Gati", "Migina", "Nyamiyaga", "Nyamure", "Nyundo"],
  Ntyazo: ["Bugali", "Cyotamakara", "Katarara"],
  Nyagisozi: ["Gahunga", "Kabirizi", "Kabuga", "Kirambi", "Rurangazi"],
  Rwabicuma: [
    "Gacu",
    "Gishike",
    "Mubuga",
    "Mushirarungu",
    "Nyarusange",
    "Runga",
  ],

  // ----- South Province - Gisagara District -----
  Gikonko: ["Cyiri", "Gikonko", "Mbogo"],
  Gishubi: ["Gabiro", "Nyabitare", "Nyakibungo", "Nyeranzi"],
  Kansi: ["Akaboti", "Sabusaro", "Umunini"],
  Kibirizi: ["Duwani", "Kibirizi", "Muyira", "Ruturo"],
  Kigembe: ["Agahabwa", "Gatovu", "Impinga", "Rusagara"],
  Mamba: ["Gakoma", "Kabumbwe", "Mamba", "Muyaga", "Ramba"],
  Muganza: ["Cyumba", "Muganza", "Remera", "Rwamiko", "Saga"],
  Mugombwa: ["Baziro", "Kibayi", "Kibu", "Mugombwa", "Mukomacara"],
  Mukindo: ["Gitega", "Mukiza", "Nyabisagara", "Runyinya"],
  Musha: ["Bukinanyana", "Kimana"],
  Ndora: ["Bweya", "Cyamukuza", "Dahwe", "Gisagara", "Mukande"],
  Nyanza: ["Higiro", "Nyaruteja", "Umubanga"],
  Save: ["Gatoki", "Munazi", "Rwanza", "Shyanda", "Zivu"],

  // ----- South Province - Huye District -----
  Gishamvu: ["Nyakibanda", "Nyumba", "Ryakibogo", "Shori"],
  Huye: ["Muyogoro", "Nyakagezi", "Rukira", "Sovu"],
  Karama: ["Buhoro", "Bunazi", "Gahororo", "Kibingo", "Muhembe"],
  Kigoma: ["Gishihe", "Kabatwa", "Karambi", "Musebeya", "Shanga"],
  Kinazi: ["Byinza", "Gahana", "Kabona", "Sazange"],
  Maraba: ["Buremera", "Gasumba", "Kanyinya", "Shyembe"],
  Mbazi: ["Gatobotobo", "Mutunda", "Mwulire", "Rugango", "Tare"],
  Mukura: ["Bukomeye", "Buvumu", "Icyeru", "Rango A"],
  Ngoma: ["Kaburemera", "Matyazo"],
  Ruhashya: ["Busheshi", "Mara", "Muhororo", "Rugogwe", "Ruhashya"],
  Rusatira: ["Buhimba", "Gafumba", "Kimirehe", "Kimuna", "Kiruhura", "Mugogwe"],
  Rwaniro: ["Gatwaro", "Kamwambi", "Kibiraro", "Nyaruhombo", "Shyunga"],
  Simbi: ["Cyendajuru", "Gisakura", "Kabusanza", "Mugobore", "Nyangazi"],
  Tumba: ["Cyarwa", "Cyimana", "Gitwa", "Mpare", "Rango B"],

  // ----- South Province - Nyaruguru District -----
  Busanze: ["Kirarangombe", "Nkanda", "Nteko", "Runyombyi", "Shororo"],
  Cyahinda: ["Coko", "Cyahinda", "Gasasa", "Muhambara", "Rutobwe"],
  Kibeho: ["Kibeho", "Mbasa", "Mpanda", "Nyange"],
  Kivu: ["Cyanyirankora", "Gahurizo", "Kimina", "Kivu", "Rugerero"],
  Mata: ["Gorwe", "Murambi", "Nyamabuye", "Ramba", "Rwamiko"],
  Muganza: ["Rukore", "Samiyonga", "Uwacyiza"],
  Munini: ["Giheta", "Ngarurira", "Ngeri", "Ntwali", "Nyarure"],
  Ngera: ["Bitare", "Mukuge", "Nyamirama", "Yaramba"],
  Ngoma: ["Fugi", "Kibangu", "Kiyonza"],
  Nyabimata: ["Gihemvu", "Kabere", "Mishungero", "Nyabimata", "Ruhinga"],
  Nyagisozi: ["Maraba", "Mwoya", "Nkakwa", "Nyagisozi"],
  Ruheru: ["Gitita", "Ruyenzi", "Uwumusebeya"],
  Ruramba: ["Giseke", "Nyarugano", "Ruramba"],
  Rusenge: ["Bunge", "Cyuna", "Gikunzi", "Mariba", "Raranzige", "Rusenge"],

  // ----- South Province - Nyamagabe District -----
  Buruhukiro: ["Bushigishigi", "Byimana", "Gifurwe", "Kizimyamuriro", "Rambya"],
  Cyanika: ["Kiyumba", "Nyanzoga"],
  Gasaka: ["Kigeme", "Nyabivumu", "Nzega"],
  Gatare: ["Bakopfu", "Mukongoro", "Ruganda", "Shyeru"],
  Kaduha: ["Musenyi"],
  Kamegeri: ["Bwama", "Kamegeri", "Kirehe", "Kizi", "Nyarusiza", "Rususa"],
  Kibirizi: ["Bugarama", "Bugarura", "Gashiha", "Ruhunga", "Uwindekezi"],
  Kibumbwe: ["Bwenda", "Gakanka", "Kibibi", "Nyakiza"],
  Kitabi: ["Kagano", "Mujuga", "Mukungu", "Shaba", "Uwingugu"],
  Mbazi: ["Manwari", "Mutiwingoma", "Ngambi"],
  Mugano: ["Gitondorero", "Suti", "Yonde"],
  Musange: ["Gasave", "Jenda", "Masagara", "Masizi"],
  Musebeya: ["Nyarurambi", "Rugano", "Runege", "Rusekera", "Sekera"],
  Mushubi: ["Buteteri", "Cyobe", "Gashwati"],
  Nkomane: [
    "Bitandara",
    "Musaraba",
    "Mutengeri",
    "Nkomane",
    "Nyarwungo",
    "Twiya",
  ],
  Tare: ["Gasarenda", "Kaganza", "Nkumbure", "Nyamigina"],
  Uwinkingi: ["Bigumira", "Gahira", "Kibyagira", "Mudasomwa", "Munyege"],

  // ----- South Province - Ruhango District -----
  Bweramana: ["Buhanda", "Gitisi", "Rwinyana"],
  Byimana: ["Kamusenyi", "Kirengeri", "Mahembe", "Ntenyo", "Nyakabuye"],
  Kabagali: ["Bihembe", "Munanira", "Rwoga"],
  Kinazi: ["Burima", "Gisali", "Kinazi", "Rutabo"],
  Kinihira: ["Gitinda", "Kirwa", "Muyunzwe", "Nyakogo", "Rukina"],
  Mbuye: ["Cyanza", "Gisanga", "Kizibere", "Nyakarekare"],
  Mwendo: [
    "Gafunzo",
    "Gishweru",
    "Kamujisho",
    "Kubutare",
    "Mutara",
    "Nyabibugu",
    "Saruheshyi",
  ],
  Ntongwe: ["Kareba", "Kayenzi", "Kebero"],
  Ruhango: ["Bunyogombe", "Gikoma", "Musamo", "Nyamagana", "Tambwe"],

  // ----- South Province - Muhanga District -----
  Cyeza: ["Biringaga", "Kivumu", "Makera", "Nyarunyinya"],
  Kabacuzi: ["Buramba", "Kibyimba", "Ngarama", "Sholi"],
  Kibangu: ["Gisharu", "Jurwe", "Rubyiniro", "Ryakanimba"],
  Kiyumba: ["Budende", "Ndago", "Ruhina", "Rukeri"],
  Muhanga: ["Nganzo", "Tyazo"],
  Mushishiro: ["Rukaragata", "Rwasare", "Rwigerero"],
  Nyabinoni: ["Gashorera", "Mbuga", "Muvumba", "Nyarusozi"],
  Nyamabuye: ["Gahogo", "Gifumba", "Gitarama"],
  Nyarusange: ["Mbiriri", "Musongati", "Ngaru", "Rusovu"],
  Rongi: ["Nyamirambo"],
  Rugendabari: ["Kanyana", "Kibaga", "Mpinga", "Nsanga"],
  Shyogwe: ["Kinini", "Mbare", "Ruli"],

  // ----- South Province - Kamonyi District -----
  Gacurabwenge: ["Gihinga", "Gihira", "Kigembe", "Nkingo"],
  Karama: ["Bunyonga", "Nyamirembe"],
  Kayenzi: ["Cubi", "Kayonza"],
  Kayumbu: ["Busoro", "Gaseke", "Giko"],
  Mugina: ["Kabugondo", "Mbati", "Mugina"],
  Musambira: ["Cyambwe", "Karengera", "Mpushi", "Rukambura"],
  Ngamba: ["Kazirabonde", "Marembo"],
  Nyamiyaga: ["Bibungo", "Kabashumba", "Kidahwe", "Mukinga"],
  Nyarubaka: ["Gitare", "Kambyeyi", "Kigusa", "Nyagishubi", "Ruyanza"],
  Rugarika: ["Kigese", "Masaka", "Nyarubuye", "Sheli"],
  Rukoma: ["Bugoba", "Buguri", "Gishyeshye", "Murehe", "Mwirute"],
  Runda: ["Gihara", "Kabagesera"],

  // ----- West Province - Karongi District -----
  Bwishyura: ["Burunga", "Kibuye", "Kiniha", "Nyarusazi"],
  Gashari: ["Birambo", "Musasa", "Rugobagoba", "Tongati"],
  Gishyita: ["Cyanya"],
  Gitesi: ["Kanunga", "Kirambo", "Nyamiringa", "Rwariro"],
  Mubuga: ["Kagabiro", "Murangara", "Ryaruhanga"],
  Murambi: ["Nkoto"],
  Murundi: ["Bukiro", "Kabaya", "Kamina", "Nyamushishi", "Nzaratsi"],
  Mutuntu: ["Byogo", "Gisayura", "Kanyege", "Kinyonzwe", "Murengezo", "Rwufi"],
  Rubengera: ["Bubazi", "Gacaca", "Gisanze", "Nyarugenge", "Ruragwe"],
  Rugabano: ["Gisiza", "Mucyimba", "Rufungo", "Rwungo"],
  Ruganda: ["Biguhu", "Kabingo", "Kinyovu", "Nyabikeri", "Nyamugwagwa"],
  Rwankuba: [
    "Bigugu",
    "Bisesero",
    "Gasata",
    "Nyakamira",
    "Nyarusanga",
    "Rubazo",
    "Rubumba",
  ],
  Twumba: ["Bihumbe", "Gakuta", "Gisovu", "Gitabura", "Rutabi"],

  // ----- West Province - Rutsiro District -----
  Boneza: ["Bushaka", "Kabihogo", "Nkira"],
  Gihango: [
    "Bugina",
    "Congo-nil",
    "Mataba",
    "Murambi",
    "Ruhingo",
    "Shyembe",
    "Teba",
  ],
  Kigeyo: ["Buhindure", "Nkora", "Nyagahinika", "Rukaragata"],
  Kivumu: ["Bunyoni", "Bunyunju", "Kabere", "Kabujenje", "Karambi", "Nganzo"],
  Manihira: ["Haniro", "Muyira", "Tangabo"],
  Mukura: ["Kabuga", "Kagano", "Kageyo", "Kagusa", "Karambo", "Mwendo"],
  Murunda: ["Kirwa", "Mburamazi", "Rugeyo", "Twabugezi"],
  Musasa: ["Gabiro", "Gisiza", "Murambi", "Nyarubuye"],
  Mushonyi: ["Biruyi", "Kaguriro", "Magaba", "Rurara"],
  Mushubati: ["Bumba", "Cyarusera", "Gitwa", "Mageragere", "Sure"],
  Nyabirasi: ["Busuku", "Cyivugiza", "Mubuga", "Ngoma", "Terimbere"],
  Ruhango: ["Gatare", "Gihira", "Kavumu", "Nyakarera", "Rugasa", "Rundoyi"],
  Rusebeya: ["Kabona", "Mberi", "Remera", "Ruronde"],

  // ----- West Province - Rubavu District -----
  Bugeshi: [
    "Buringo",
    "Butaka",
    "Hehu",
    "Kabumba",
    "Mutovu",
    "Nsherima",
    "Rusiza",
  ],
  Busasamana: [
    "Gacurabwenge",
    "Gasiza",
    "Gihonga",
    "Kageshi",
    "Makoro",
    "Nyacyonga",
    "Rusura",
  ],
  Cyanzarwe: [
    "Busigari",
    "Cyanzarwe",
    "Gora",
    "Kinyanzovu",
    "Makurizo",
    "Rwangara",
    "Rwanzekuma",
    "Ryabizige",
  ],
  Gisenyi: [
    "Amahoro",
    "Bugoyi",
    "Kivumu",
    "Mbugangari",
    "Nengo",
    "Rubavu",
    "Umuganda",
  ],
  Kanama: [
    "Kamuhoza",
    "Karambo",
    "Mahoko",
    "Musabike",
    "Nkomane",
    "Rusongati",
    "Yungwe",
  ],
  Kanzenze: [
    "Kanyirabigogo",
    "Kirerema",
    "Muramba",
    "Nyamikongi",
    "Nyamirango",
    "Nyaruteme",
  ],
  Mudende: [
    "Bihungwe",
    "Kanyundo",
    "Micinyiro",
    "Mirindi",
    "Ndoranyi",
    "Rungu",
    "Rwanyakayaga",
  ],
  Nyakiriba: ["Bisizi", "Gikombe", "Kanyefurwe", "Nyarushyamba"],
  Nyamyumba: ["Burushya", "Busoro", "Kinigi", "Kiraga", "Munanira", "Rubona"],
  Nyundo: [
    "Bahimba",
    "Gatovu",
    "Kavomo",
    "Kigarama",
    "Mukondo",
    "Nyundo",
    "Terimbere",
  ],
  Rubavu: [
    "Buhaza",
    "Burinda",
    "Byahi",
    "Gikombe",
    "Murambi",
    "Murara",
    "Rukoko",
  ],
  Rugerero: [
    "Basa",
    "Gisa",
    "Kabilizi",
    "Muhira",
    "Rugerero",
    "Rushubi",
    "Rwaza",
  ],

  // ----- West Province - Nyabihu District -----
  Bigogwe: ["Arusha", "Basumba", "Kijote", "Kora", "Muhe", "Rega"],
  Jenda: ["Bukinanyana", "Gasizi", "Kabatezi", "Kareba", "Nyirakigugu", "Rega"],
  Jomba: ["Gasiza", "Gasura", "Gisizi", "Guriro", "Kavumu", "Nyamitanzi"],
  Kabatwa: ["Batikoti", "Cyamvumba", "Gihorwe", "Myuga", "Ngando", "Rugarama"],
  Karago: [
    "Busoro",
    "Cyamabuye",
    "Gatagara",
    "Gihirwa",
    "Kadahenda",
    "Karengera",
  ],
  Kintobo: ["Gatovu", "Kintobo", "Nyagisozi", "Nyamugari", "Rukondo", "Ryinyo"],
  Mukamira: [
    "Gasizi",
    "Jaba",
    "Kanyove",
    "Rubaya",
    "Rugeshi",
    "Rukoma",
    "Rurengeri",
  ],
  Muringa: [
    "Gisizi",
    "Mulinga",
    "Mwiyanike",
    "Nkomane",
    "Nyamasheke",
    "Rwantobo",
  ],
  Rambura: ["Birembo", "Guriro", "Kibisabo", "Mutaho", "Nyundo", "Rugamba"],
  Rugera: [
    "Gakoro",
    "Marangara",
    "Nyagahondo",
    "Nyarutembe",
    "Rurembo",
    "Tyazo",
  ],
  Rurembo: ["Gahondo", "Gitega", "Kirimbogo", "Murambi", "Mwana", "Rwaza"],
  Shyira: [
    "Cyimanzovu",
    "Kanyamitana",
    "Kintarure",
    "Mpinga",
    "Mutanda",
    "Shaki",
  ],

  // ----- West Province - Ngororero District -----
  Bwira: ["Bungwe", "Cyahafi", "Gashubi", "Kabarondo", "Ruhindage"],
  Gatumba: ["Cyome", "Gatsibo", "Kamasiga", "Karambo", "Ruhanga", "Rusumo"],
  Hindiro: [
    "Buyungu",
    "Gatega",
    "Kajinge",
    "Marantima",
    "Rugendabari",
    "Runyinya",
  ],
  Kabaya: ["Busunzu", "Gaseke", "Kabaya", "Mwendo", "Ngoma", "Nyenyeri"],
  Kageyo: ["Kageshi", "Kirwa", "Mukore", "Muramba", "Nyamata", "Rwamamara"],
  Kavumu: ["Birembo", "Gitwa", "Murinzi", "Nyamugeyo", "Rugeshi", "Tetero"],
  Matyazo: ["Binana", "Gitega", "Matare", "Rutare", "Rwamiko"],
  Muhanda: ["Bugarura", "Gasiza", "Mashya", "Nganzo", "Ngoma", "Rutagara"],
  Muhororo: ["Bweramana", "Mubuga", "Myiha", "Rugogwe", "Rusororo", "Sanza"],
  Ndaro: ["Bijyojyo", "Bitabage", "Kabageshi", "Kibanda", "Kinyovi"],
  Ngororero: ["Kaseke", "Kazabe", "Mugano", "Nyange", "Rususa", "Torero"],
  Nyange: ["Bambiro", "Gaseke", "Nsibo", "Vuganyana"],
  Sovu: ["Birembo", "Kagano", "Kanyana", "Musenyi", "Nyabipfura", "Rutovu"],

  // ----- West Province - Rusizi District -----
  Bugarama: ["Nyange", "Pera", "Ryankana"],
  Butare: ["Butanda", "Gatereri", "Nyamihanda", "Rwambogo"],
  Bweyeye: ["Gikungu", "Kiyabo", "Murwa", "Nyamuzi", "Rasano"],
  Gashonga: [
    "Birembo",
    "Buhokoro",
    "Kabakobwa",
    "Kacyuma",
    "Kamurehe",
    "Karemereye",
    "Muti",
    "Rusayo",
  ],
  Giheke: [
    "Cyendajuru",
    "Gakomeye",
    "Giheke",
    "Kamashangi",
    "Kigenge",
    "Ntura",
    "Rwega",
    "Turambi",
  ],
  Gihundwe: ["Burunga", "Gatsiro", "Gihaya", "Kagara", "Kamatita", "Shagasha"],
  Gikundamvura: ["Kizura", "Mpinga", "Nyamigina"],
  Gitambi: ["Cyingwa", "Gahungeri", "Hangabashi", "Mashesha"],
  Kamembe: ["Cyangugu", "Gihundwe", "Kamashangi", "Kamurera", "Ruganda"],
  Muganza: ["Cyarukara", "Gakoni", "Shara"],
  Mururu: [
    "Gahinga",
    "Kabahinda",
    "Kabasigirira",
    "Kagarama",
    "Karambi",
    "Miko",
    "Tara",
  ],
  Nkanka: ["Gitwa", "Kamanyenga", "Kangazi", "Kinyaga", "Rugabano"],
  Nkombo: ["Bigoga", "Bugarura", "Ishywa", "Kamagimbo", "Rwenje"],
  Nkungu: ["Gatare", "Kiziguro", "Mataba", "Ryamuhirwa"],
  Nyakabuye: [
    "Gasebeya",
    "Gaseke",
    "Kamanu",
    "Kiziho",
    "Mashyuza",
    "Nyabintare",
  ],
  Nyakarenzo: [
    "Gatare",
    "Kabagina",
    "Kabuye",
    "Kanoga",
    "Karangiro",
    "Murambi",
    "Rusambu",
  ],
  Nzahaha: ["Butambamo", "Kigenge", "Murya", "Nyenji", "Rebero", "Rwinzuki"],
  Rwimbogo: ["Karenge", "Muhehwe", "Mushaka", "Rubugu", "Ruganda"],

  // ----- West Province - Nyamasheke District -----
  Bushekeri: ["Buvungira", "Mpumbu", "Ngoma", "Nyarusange"],
  Bushenge: ["Gasheke", "Impala", "Kagatamu", "Karusimbi"],
  Cyato: ["Bisumo", "Murambi", "Mutongo", "Rugari"],
  Gihombo: ["Butare", "Gitwa", "Jarama", "Kibingo", "Mubuga"],
  Kagano: ["Gako", "Mubumbano", "Ninzi", "Rwesero", "Shara"],
  Kanjongo: ["Kibogora", "Kigarama", "Kigoya", "Raro", "Susa"],
  Karambi: ["Gasovu", "Gitwe", "Kabuga", "Kagarama", "Rushyarara"],
  Karengera: ["Gasayo", "Gashashi", "Higiro", "Miko", "Mwezi"],
  Kirimbi: ["Cyimpindu", "Karengera", "Muhororo", "Nyarusange"],
  Macuba: ["Gatare", "Mutongo", "Nyakabingo", "Rugari", "Vugangoma"],
  Mahembe: ["Gisoke", "Kagarama", "Nyagatare", "Nyakavumu"],
  Nyabitekeri: ["Kigabiro", "Kinunga", "Mariba", "Muyange", "Ntango"],
  Rangiro: ["Banda", "Gakenke", "Jurwe", "Murambi"],
  Ruharambuga: ["Kanazi", "Ntendezi", "Save", "Wimana"],
  Shangi: ["Burimba", "Mataba", "Mugera", "Nyamugari", "Shangi"],

  // ----- North Province - Rulindo District -----
  Base: ["Cyohoha", "Gitare", "Rwamahwa"],
  Burega: ["Butangampundu", "Karengeri", "Taba"],
  Bushoki: ["Gasiza", "Giko", "Kayenzi", "Mukoto", "Nyirangarama"],
  Buyoga: [
    "Busoro",
    "Butare",
    "Gahororo",
    "Gitumba",
    "Karama",
    "Mwumba",
    "Ndarage",
  ],
  Cyinzuzi: ["Budakiranya", "Migendezo", "Rudogo"],
  Cyungo: ["Burehe", "Marembo", "Rwili"],
  Kinihira: ["Butunzi", "Karegamazi", "Marembo", "Rebero"],
  Kisaro: ["Gitatsa", "Kamushenyi", "Kigarama", "Mubuga", "Murama", "Sayo"],
  Masoro: ["Kabuga", "Kigarama", "Kivugiza", "Nyamyumba", "Shengampuli"],
  Mbogo: ["Bukoro", "Mushari", "Ngiramazi", "Rurenge"],
  Murambi: ["Bubangu", "Gatwa", "Mugambazi", "Mvuzo"],
  Ngoma: ["Kabuga", "Karambo", "Mugote", "Munyarwanda"],
  Ntarabana: ["Kajevuba", "Kiyanza", "Mahaza"],
  Rukozo: ["Buraro", "Bwimo", "Mberuka", "Mbuye"],
  Rusiga: ["Gako", "Kirenge", "Taba"],
  Shyorongi: ["Bugaragara", "Kijabagwe", "Muvumu", "Rubona", "Rutonde"],
  Tumba: ["Barari", "Gahabwa", "Misezero", "Nyirabirori", "Taba"],

  // ----- North Province - Gakenke District -----
  Busengo: [
    "Birambo",
    "Butereri",
    "Byibuhiro",
    "Kamina",
    "Kirabo",
    "Mwumba",
    "Ruhanga",
  ],
  Coko: ["Kiruku", "Mbirima", "Nyange", "Nyanza"],
  Cyabingo: ["Muhaza", "Muhororo", "Muramba", "Mutanda", "Rukore"],
  Gakenke: ["Buheta", "Kagoma", "Nganzo", "Rusagara"],
  Gashenyi: ["Nyacyina", "Rukura", "Rutabo", "Rutenderi", "Taba"],
  Janja: ["Gakindo", "Gashyamba", "Gatwa", "Karukungu"],
  Kamubuga: ["Kamubuga", "Kidomo", "Mbatabata", "Rukore"],
  Karambo: ["Kanyanza", "Karambo", "Kirebe"],
  Kivuruga: ["Cyintare", "Gasiza", "Rugimbu", "Ruhinga", "Sereri"],
  Mataba: ["Buyange", "Gikombe", "Nyundo"],
  Minazi: ["Gasiho", "Munyana", "Murambi", "Raba"],
  Mugunga: [
    "Gahinga",
    "Munyana",
    "Mutego",
    "Nkomane",
    "Rutabo",
    "Rutenderi",
    "Rwamambe",
  ],
  Muhondo: [
    "Busake",
    "Bwenda",
    "Gasiza",
    "Gihinga",
    "Huro",
    "Musagara",
    "Musenyi",
    "Ruganda",
    "Rwinkuba",
  ],
  Muyongwe: ["Bumba", "Gisiza", "Karyango", "Nganzo", "Va"],
  Muzo: ["Kabatezi", "Kiryamo", "Mubuga", "Mwiyando", "Rwa"],
  Nemba: ["Buranga", "Gahinga", "Gisozi", "Mucaca"],
  Ruli: ["Busoro", "Gikingo", "Jango", "Ruli", "Rwesero"],
  Rusasa: ["Gataba", "Kamonyi", "Murambi", "Nyundo", "Rumbi", "Rurembo"],
  Rushashi: [
    "Burimba",
    "Busanane",
    "Joma",
    "Kageyo",
    "Mbogo",
    "Razi",
    "Rwankuba",
    "Shyombwe",
  ],

  // ----- North Province - Musanze District -----
  Busogo: ["Gisesero", "Kavumu", "Nyagisozi", "Sahara"],
  Cyuve: ["Bukinanyana", "Buruba", "Cyanya", "Kabeza", "Migeshi", "Rwebeya"],
  Gacaca: ["Gakoro", "Gasakuza", "Kabirizi", "Karwasa"],
  Gashaki: ["Kigabiro", "Kivumu", "Mbwe", "Muharuro"],
  Gataraga: ["Mudakama", "Murago", "Rubindi", "Rungu"],
  Kimonyi: ["Birira", "Buramira", "Kivumu", "Mbizi"],
  Kinigi: ["Bisoke", "Kaguhu", "Kampanga", "Nyabigoma", "Nyonirima"],
  Muhoza: ["Cyabararika", "Kigombe", "Mpenge", "Ruhengeri"],
  Muko: ["Cyivugiza", "Cyogo", "Mburabuturo", "Songa"],
  Musanze: ["Cyabagarura", "Garuka", "Kabazungu", "Nyarubuye", "Rwambogo"],
  Nkotsi: ["Bikara", "Gashinga", "Mubago", "Rugeshi", "Ruyumba"],
  Nyange: ["Cyivugiza", "Kabeza", "Kamwumba", "Muhabura", "Ninda"],
  Remera: ["Gasongero", "Kamisave", "Murandi", "Murwa", "Rurambo"],
  Rwaza: ["Bumara", "Kabushinge", "Musezero", "Nturo", "Nyarubuye"],
  Shingiro: ["Gakingo", "Kibuguzo", "Mudende", "Mugari"],

  // ----- North Province - Burera District -----
  Bungwe: ["Bungwe", "Bushenya", "Mudugari", "Tumba"],
  Butaro: ["Gatsibo", "Mubuga", "Muhotora", "Nyamicucu", "Rusumo"],
  Cyanika: [
    "Gasiza",
    "Gisovu",
    "Kabyiniro",
    "Kagitega",
    "Kamanyana",
    "Nyagahinga",
  ],
  Cyeru: ["Butare", "Ndongozi", "Ruyange"],
  Gahunga: ["Buramba", "Gisizi", "Kidakama", "Nyangwe", "Rwasa"],
  Gatebe: ["Gabiro", "Musenda", "Rwambogo", "Rwasa"],
  Gitovu: ["Mariba", "Musasa", "Runoga"],
  Kagogo: ["Kabaya", "Kayenzi", "Kiringa", "Nyamabuye"],
  Kinoni: ["Gafuka", "Nkenke", "Nkumba", "Ntaruka"],
  Kinyababa: ["Bugamba", "Kaganda", "Musasa", "Rutovu"],
  Kivuye: ["Bukwashuri", "Gashanje", "Murwa", "Nyirataba"],
  Nemba: ["Kivumu", "Nyamugari", "Rubona", "Rushara"],
  Rugarama: ["Cyahi", "Gafumba", "Karangara", "Rurembo"],
  Rugengabari: ["Kilibata", "Mucaca", "Nyanamo", "Rukandabyuma"],
  Ruhunde: ["Gaseke", "Gatare", "Gitovu", "Rusekera"],
  Rusarabuye: ["Kabona", "Ndago", "Ruhanga"],
  Rwerere: ["Gacundura", "Gashoro", "Ruconsho", "Rugari"],

  // ----- North Province - Gicumbi District -----
  Bukure: ["Karenge", "Kigabiro", "Kivumu", "Rwesero"],
  Bwisige: ["Bwisige", "Gihuke", "Mukono", "Nyabushingitwa"],
  Byumba: [
    "Gacurabwenge",
    "Gisuna",
    "Kibali",
    "Kivugiza",
    "Murama",
    "Ngondore",
    "Nyakabungo",
    "Nyamabuye",
    "Nyarutarama",
  ],
  Cyumba: [
    "Gasunzu",
    "Muhambo",
    "Nyakabungo",
    "Nyambare",
    "Nyaruka",
    "Rwankonjo",
  ],
  Giti: ["Gatobotobo", "Murehe", "Tanda"],
  Kageyo: ["Gihembe", "Horezo", "Nyamiyaga", "Kabuga", "Muhondo"],
  Kaniga: ["Bugomba", "Gatoma", "Mulindi", "Nyarwambu", "Rukurura"],
  Manyagiro: [
    "Kabuga",
    "Nyiragifumba",
    "Nyiravugiza",
    "Remera",
    "Rusekera",
    "Ryaruyumba",
  ],
  Miyove: ["Gakenke", "Miyove", "Mubuga"],
  Mukarange: [
    "Cyamuganga",
    "Gatenga",
    "Kiruhura",
    "Mutarama",
    "Rugerero",
    "Rusambya",
  ],
  Muko: ["Cyamuhinda", "Kigoma", "Mwendo", "Ngange", "Rebero"],
  Mutete: ["Gaseke", "Kabeza", "Musenyi", "Mutandi", "Nyarubuye"],
  Nyamiyaga: [
    "Gahumuliza",
    "Jamba",
    "Kabeza",
    "Kabuga",
    "Karambo",
    "Kiziba",
    "Mataba",
  ],
  Nyankenke: [
    "Butare",
    "Kigogo",
    "Kinishya",
    "Rusasa",
    "Rutete",
    "Rwagihura",
    "Yaramba",
  ],
  Rubaya: ["Gihanga", "Gishambashayo", "Gishari", "Muguramo", "Nyamiyaga"],
  Rukomo: ["Cyeya", "Cyuru", "Gisiza", "Kinyami", "Mabare", "Munyinya"],
  Rushaki: ["Gitega", "Kamutora", "Karurama"],
  Rutare: ["Bikumba", "Gasharu", "Gatwaro", "Kigabiro", "Munanira", "Nkoto"],
  Ruvune: ["Cyandaro", "Gasambya", "Gashirira", "Kabare", "Rebero", "Ruhondo"],
  Rwamiko: ["Cyeru", "Kigabiro", "Nyagahinga"],
  Shangasha: [
    "Bushara",
    "Kitazigurwa",
    "Nyabishambi",
    "Nyabubare",
    "Shangasha",
  ],

  // ----- East Province - Rwamagana District -----
  Fumbwe: [
    "Mununu",
    "Nyagasambu",
    "Nyakagunga",
    "Nyamirama",
    "Nyarubuye",
    "Sasabirago",
  ],
  Gahengeri: [
    "Gihumuza",
    "Kagezi",
    "Kanyangese",
    "Kibare",
    "Mutamwa",
    "Rugarama",
    "Runyinya",
    "Rweri",
  ],
  Gishali: [
    "Binunga",
    "Bwinsanga",
    "Cyinyana",
    "Gati",
    "Kavumu",
    "Ruhimbi",
    "Ruhunda",
  ],
  Karenge: [
    "Bicaca",
    "Byimana",
    "Kabasore",
    "Kangamba",
    "Karenge",
    "Nyabubare",
    "Nyamatete",
  ],
  Kigabiro: ["Bwiza", "Cyanya", "Nyagasenyi", "Sibagire", "Sovu"],
  Muhazi: [
    "Byeza",
    "Kabare",
    "Karambi",
    "Karitutu",
    "Kitazigurwa",
    "Murambi",
    "Nsinda",
    "Ntebe",
    "Nyarusange",
  ],
  Munyaga: ["Kaduha", "Nkungu", "Rweru", "Zinga"],
  Munyiginya: [
    "Binunga",
    "Bwana",
    "Cyarukamba",
    "Cyimbazi",
    "Nkomangwa",
    "Nyarubuye",
  ],
  Musha: [
    "Akabare",
    "Budahanda",
    "Kagarama",
    "Musha",
    "Nyabisindu",
    "Nyakabanda",
  ],
  Muyumbu: ["Akinyambo", "Bujyujyu", "Murehe", "Ntebe", "Nyarukombe"],
  Mwulire: ["Bicumbi", "Bushenyi", "Mwulire", "Ntunga"],
  Nyakaliro: ["Bihembe", "Gatare", "Gishore", "Munini", "Rwimbogo"],
  Nzige: ["Akanzu", "Kigarama", "Murama", "Rugarama"],
  Rubona: ["Byinza", "Kabatasi", "Kabuye", "Karambi", "Mabare", "Nawe"],

  // ----- East Province - Nyagatare District -----
  Gatunda: [
    "Cyagaju",
    "Kabeza",
    "Nyamikamba",
    "Nyamirembe",
    "Nyangara",
    "Nyarurema",
    "Rwensheke",
  ],
  Karama: [
    "Bushara",
    "Cyenkwanzi",
    "Gikagati",
    "Gikundamvura",
    "Kabuga",
    "Ndego",
    "Nyakiga",
  ],
  Karangazi: [
    "Kamate",
    "Karama",
    "Kizirakome",
    "Mbare",
    "Musenyi",
    "Ndama",
    "Nyagashanga",
    "Nyamirama",
    "Rubagabaga",
    "Rwenyemera",
    "Rwisirabo",
  ],
  Katabagemu: [
    "Bayigaburire",
    "Kaduha",
    "Kanyeganyege",
    "Katabagemu",
    "Kigarama",
    "Nyakigando",
    "Rubira",
    "Rugazi",
    "Rutoma",
  ],
  Kiyombe: ["Gataba", "Gitenga", "Kabungo", "Karambo", "Karujumba", "Tovu"],
  Matimba: [
    "Bwera",
    "Byimana",
    "Cyembogo",
    "Kagitumba",
    "Kanyonza",
    "Matimba",
    "Nyabwishongwezi",
    "Rwentanga",
  ],
  Mimuri: ["Bibare", "Gakoma", "Mahoro", "Mimuri", "Rugari"],
  Mukama: ["Bufunda", "Gatete", "Gihengeri", "Gishororo", "Kagina", "Rugarama"],
  Musheri: [
    "Kibirizi",
    "Kijojo",
    "Musheri",
    "Ntoma",
    "Nyagatabire",
    "Nyamiyonga",
    "Rugarama I",
    "Rugarama II",
  ],
  Nyagatare: [
    "Barija",
    "Bushoga",
    "Cyabayaga",
    "Gakirage",
    "Kamagiri",
    "Nsheke",
    "Nyagatare",
    "Rutaraka",
    "Ryabega",
  ],
  Rukomo: ["Gahurura", "Gashenyi", "Nyakagarama", "Rukomo II", "Rurenge"],
  Rwempasha: [
    "Cyenjonjo",
    "Gasinga",
    "Kabare",
    "Kazaza",
    "Mishenyi",
    "Rugarama",
    "Rukorota",
    "Rutare",
    "Rwempasha",
    "Ryeru",
  ],
  Rwimiyaga: [
    "Gacundezi",
    "Kabeza",
    "Kirebe",
    "Ntoma",
    "Nyarupfubire",
    "Nyendo",
    "Rutungu",
    "Rwimiyaga",
  ],
  Tabagwe: [
    "Gishuro",
    "Gitengure",
    "Nkoma",
    "Nyabitekeri",
    "Nyagatoma",
    "Shonga",
    "Tabagwe",
  ],

  // ----- East Province - Gatsibo District -----
  Gasange: ["Kigabiro", "Kimana", "Teme", "Viro"],
  Gatsibo: ["Gatsibo", "Manishya", "Mugera", "Nyabicwamba", "Nyagahanga"],
  Gitoki: [
    "Bukomane",
    "Cyabusheshe",
    "Karubungo",
    "Mpondwa",
    "Nyamirama",
    "Rubira",
  ],
  Kabarore: ["Kabarore", "Kabeza", "Karenge", "Marimba", "Nyabikiri", "Simbwa"],
  Kageyo: ["Busetsa", "Gituza", "Kintu", "Nyagisozi"],
  Kiramuruzi: ["Akabuga", "Gakenke", "Gakoni", "Nyabisindu"],
  Kiziguro: ["Agakomeye", "Mbogo", "Ndatemwa", "Rubona"],
  Muhura: ["Bibare", "Gakorokombe", "Mamfu", "Rumuli", "Taba"],
  Murambi: ["Murambi", "Nyamiyaga", "Rwankuba", "Rwimitereri"],
  Ngarama: ["Bugamba", "Karambi", "Kigasha", "Ngarama", "Nyarubungo"],
  Nyagihanga: [
    "Gitinda",
    "Kibare",
    "Mayange",
    "Murambi",
    "Nyagitabire",
    "Nyamirama",
  ],
  Remera: [
    "Bushobora",
    "Butiruka",
    "Kigabiro",
    "Nyagakombe",
    "Rurenge",
    "Rwarenga",
  ],
  Rugarama: [
    "Bugarama",
    "Gihuta",
    "Kanyangese",
    "Matare",
    "Matunguru",
    "Remera",
  ],
  Rwimbogo: ["Kiburara", "Munini", "Nyamatete", "Rwikiniro"],

  // ----- East Province - Kayonza District -----
  Gahini: ["Juru", "Kahi", "Kiyenzi", "Urugarama"],
  Kabare: ["Cyarubare", "Gitara", "Kirehe", "Rubimba", "Rubumba"],
  Kabarondo: ["Cyabajwa", "Cyinzovu", "Kabura", "Rusera"],
  Mukarange: ["Bwiza", "Kayonza", "Mburabuturo", "Nyagatovu", "Rugendabari"],
  Murama: ["Bunyentongo", "Muko", "Murama", "Nyakanazi", "Rusave"],
  Murundi: ["Buhabwa", "Karambi", "Murundi", "Ryamanyoni"],
  Mwiri: ["Kageyo", "Migera", "Nyamugari", "Nyawera"],
  Ndego: ["Byimana", "Isangano", "Karambi", "Kiyovu"],
  Nyamirama: ["Gikaya", "Musumba", "Rurambi", "Shyogo"],
  Rukara: ["Kawangire", "Rukara", "Rwimishinya"],
  Ruramira: ["Bugambira", "Nkamba", "Ruyonza", "Umubuga"],
  Rwinkwavu: ["Gihinga", "Mbarara", "Mukoyoyo", "Nkondo"],

  // ----- East Province - Kirehe District -----
  Gahara: ["Butezi", "Muhamba", "Murehe", "Nyagasenyi", "Nyakagezi", "Rubimba"],
  Gatore: [
    "Curazo",
    "Cyunuzi",
    "Muganza",
    "Nyamiryango",
    "Rwabutazi",
    "Rwantonde",
  ],
  Kigarama: ["Cyanya", "Kigarama", "Kiremera", "Nyakerera", "Nyankurazo"],
  Kigina: ["Gatarama", "Rugarama", "Ruhanga", "Rwanteru"],
  Kirehe: ["Gahama", "Kirehe", "Nyabigega", "Nyabikokora"],
  Mahama: ["Kamombo", "Mwoga", "Saruhembe"],
  Mpanga: [
    "Bwiyorere",
    "Kankobwa",
    "Mushongi",
    "Nasho",
    "Nyakabungo",
    "Rubaya",
  ],
  Musaza: ["Gasarabwayi", "Kabuga", "Mubuga", "Musaza", "Nganda"],
  Mushikiri: [
    "Bisagara",
    "Cyamigurwa",
    "Rugarama",
    "Rwanyamuhanga",
    "Rwayikona",
  ],
  Nasho: ["Cyambwe", "Kagese", "Ntaruka", "Rubirizi", "Rugoma"],
  Nyamugari: ["Bukora", "Kagasa", "Kazizi", "Kiyanzi", "Nyamugari"],
  Nyarubuye: ["Mareba", "Nyabitare", "Nyarutunga"],

  // ----- East Province - Ngoma District -----
  Gashanda: ["Cyerwa", "Giseri", "Munege", "Mutsindo"],
  Jarama: ["Ihanika", "Jarama", "Karenge", "Kibimba", "Kigoma"],
  Karembo: ["Akaziba", "Karaba", "Nyamirambo"],
  Kazo: ["Birenga", "Gahurire", "Karama", "Kinyonzo", "Umukamba"],
  Kibungo: ["Cyasemakamba", "Gahima", "Gatonde", "Karenge", "Mahango"],
  Mugesera: ["Akabungo", "Mugatare", "Ntanga", "Nyamugari", "Nyange"],
  Murama: ["Gitaraga", "Kigabiro", "Mvumba", "Rurenge", "Sakara"],
  Mutenderi: ["Karwema", "Kibare", "Mutenderi", "Muzingira", "Nyagasozi"],
  Remera: ["Bugera", "Kinunga", "Ndekwe", "Nyamagana"],
  Rukira: ["Buliba", "Kibatsi", "Nyaruvumu", "Nyinya"],
  Rukumberi: ["Gituza", "Ntovi", "Rubago", "Rubona", "Rwintashya"],
  Rurenge: ["Akagarama", "Muhurire", "Musya", "Rugese", "Rujambara", "Rwikubo"],
  Sake: ["Gafunzo", "Kibonde", "Nkanga", "Rukoma"],
  Zaza: ["Nyagasozi", "Nyagatugunda", "Ruhembe", "Ruhinga"],

  // ----- East Province - Bugesera District -----
  Gashora: ["Biryogo", "Kabuye", "Kagomasi", "Mwendo", "Ramiro"],
  Juru: ["Juru", "Kabukuba", "Mugorore", "Musovu", "Rwinume"],
  Kamabuye: ["Biharagu", "Burenge", "Kampeka", "Nyakayaga", "Tunda"],
  Mareba: ["Bushenyi", "Gakomeye", "Nyamigina", "Rango", "Rugarama"],
  Mayange: ["Gakamba", "Kagenge", "Kibenga", "Kibirizi", "Mbyo"],
  Musenyi: ["Gicaca", "Musenyi", "Nyagihunika", "Rulindo"],
  Mwogo: ["Bitaba", "Kagasa", "Rugunga", "Rurenge"],
  Ngeruka: ["Gihembe", "Murama", "Ngeruka", "Nyakayenzi", "Rutonde"],
  Ntarama: ["Cyugaro", "Kanzenze", "Kibungo"],
  Nyamata: ["Kanazi", "Kayumba", "Maranyundo", "Murama", "Nyamata y'Umujyi"],
  Nyarugenge: ["Gihinga", "Kabuye", "Murambi", "Ngenda", "Rugando"],
  Rilima: ["Kabeza", "Karera", "Kimaranzara", "Ntarama", "Nyabagendwa"],
  Ruhuha: ["Bihari", "Gatanga", "Gikundamvura", "Kindama", "Ruhuha"],
  Rweru: ["Batima", "Kintambwe", "Mazane", "Nemba", "Nkanga", "Sharita"],
  Shyara: ["Kabagugu", "Kamabuye", "Nziranziza"],
};

// ============================================================
// VILLAGES DATA - Using composite keys for uniqueness
// ============================================================

const ALL_VILLAGES: Record<string, string[]> = {
  // ============================================================
  // KIGALI CITY PROVINCE - Nyarugenge District
  // ============================================================

  // Gitega Sector
  "Nyarugenge|Gitega|Akabahizi": [
    "Gihanga",
    "Iterambere",
    "Izuba",
    "Nyaburanga",
    "Nyenyeri",
    "Ubukorikori",
    "Ubumwe",
    "Ubwiyunge",
    "Umucyo",
    "Umurabyo",
    "Umuseke",
    "Vugizo",
  ],
  "Nyarugenge|Gitega|Akabeza": [
    "Akinyambo",
    "Amayaga",
    "Gitwa",
    "Ituze",
    "Mpazi",
  ],
  "Nyarugenge|Gitega|Gacyamo": [
    "Amahoro",
    "Impuhwe",
    "Intsinzi",
    "Kivumu",
    "Ubumwe",
    "Urukundo",
    "Ururembo",
  ],
  "Nyarugenge|Gitega|Kigarama": [
    "Ingenzi",
    "Sangwa",
    "Umubano",
    "Umucyo",
    "Umuhoza",
    "Umurava",
  ],
  "Nyarugenge|Gitega|Kinyange": [
    "Akabugenewe",
    "Ihuriro",
    "Isangano",
    "Isano",
    "Karitasi",
    "Ubumanzi",
    "Uburezi",
    "Ubwiza",
    "Umucyo",
    "Umwembe",
    "Urugano",
  ],
  "Nyarugenge|Gitega|Kora": [
    "Isangano",
    "Kanunga",
    "Kinyambo",
    "Kivumu",
    "Mpazi",
    "Rugano",
    "Rugari",
    "Ubumwe",
  ],

  // Kanyinya Sector
  "Nyarugenge|Kanyinya|Nyamweru": [
    "Bwimo",
    "Gatare",
    "Mubuga",
    "Nyakirambi",
    "Nyamweru",
    "Ruhengeri",
  ],
  "Nyarugenge|Kanyinya|Nzove": [
    "Bibungo",
    "Bwiza",
    "Gateko",
    "Kagasa",
    "Nyabihu",
    "Rutagara I",
    "Rutagara II",
    "Ruyenzi",
  ],
  "Nyarugenge|Kanyinya|Taba": [
    "Kagaramira",
    "Ngendo",
    "Nyarurama",
    "Nyarusange",
    "Rwakivumu",
  ],

  // Kigali Sector
  "Nyarugenge|Kigali|Kigali": [
    "Akirwanda",
    "Gisenga",
    "Kadobogo",
    "Kagarama",
    "Kibisogi",
    "Muganza",
    "Murama",
    "Rubuye",
    "Ruhango",
    "Ryasharangabo",
  ],
  "Nyarugenge|Kigali|Mwendo": [
    "Agakomeye",
    "Akagugu",
    "Amahoro",
    "Amajyambere",
    "Birambo",
    "Isangano",
    "Kanyabami",
    "Karambo",
    "Ruhuha",
    "Ubuzima",
    "Umutekano",
  ],
  "Nyarugenge|Kigali|Nyabugogo": [
    "Gakoni",
    "Gatare",
    "Giticyinyoni",
    "Kadobogo",
    "Kamenge",
    "Karama",
    "Kiruhura",
    "Nyabikoni",
    "Nyabugogo",
    "Ruhondo",
  ],
  "Nyarugenge|Kigali|Ruriba": [
    "Misibya",
    "Nyabitare",
    "Ruhango",
    "Ruharabuge",
    "Ruriba",
    "Ruzigimbogo",
    "Ryamakomari",
    "Tubungo",
  ],
  "Nyarugenge|Kigali|Rwesero": [
    "Akanyamirambo",
    "Akinama",
    "Makaga",
    "Musimba",
    "Ruhogo",
    "Rweza",
    "Vuganyana",
  ],

  // Kimisagara Sector
  "Nyarugenge|Kimisagara|Kamuhoza": [
    "Buhoro",
    "Busasamana",
    "Isimbi",
    "Ituze",
    "Karama",
    "Karwarugabo",
    "Kigabiro",
    "Mataba",
    "Munini",
    "Ntaraga",
    "Nunga",
    "Rurama",
    "Rutunga",
    "Tetero",
  ],
  "Nyarugenge|Kimisagara|Katabaro": [
    "Akamahoro",
    "Akishinge",
    "Akishuri",
    "Amahumbezi",
    "Inganzo",
    "Kigarama",
    "Mpazi",
    "Mugina",
    "Ubumwe",
    "Ubusabane",
    "Umubano",
    "Umurinzi",
    "Uruyange",
  ],
  "Nyarugenge|Kimisagara|Kimisagara": [
    "Akabeza",
    "Amahoro",
    "Birama",
    "Buhoro",
    "Bwiza",
    "Byimana",
    "Gakaraza",
    "Gaseke",
    "Ihuriro",
    "Inkurunziza",
    "Karambi",
    "Kigina",
    "Kove",
    "Muganza",
    "Nyabugogo",
    "Nyagakoki",
    "Nyakabingo",
    "Nyamabuye",
    "Sangwa",
    "Sano",
  ],

  // Mageregere Sector
  "Nyarugenge|Mageregere|Kankuba": [
    "Kamatamu",
    "Karukina",
    "Musave",
    "Nyarumanga",
    "Rugendabari",
  ],
  "Nyarugenge|Mageregere|Kavumu": [
    "Ayabatanga",
    "Kankurimba",
    "Mubura",
    "Murondo",
    "Nyakabingo",
    "Nyarubuye",
  ],
  "Nyarugenge|Mageregere|Mataba": [
    "Burema",
    "Gahombo",
    "Kabeza",
    "Kwisanga",
    "Mageragere",
    "Rushubi",
  ],
  "Nyarugenge|Mageregere|Ntungamo": [
    "Akanakamageragere",
    "Gatovu",
    "Nyabitare",
    "Nyarubande",
    "Rubungo",
    "Rwindonyi",
  ],
  "Nyarugenge|Mageregere|Nyarufunzo": [
    "Akabungo",
    "Akamashinge",
    "Maya",
    "Nyarufunzo",
    "Nyarurama",
    "Rubete",
  ],
  "Nyarugenge|Mageregere|Nyarurenzi": [
    "Amahoro",
    "Ayabaramba",
    "Gikuyu",
    "Iterambere",
    "Nyabirondo",
  ],
  "Nyarugenge|Mageregere|Runzenze": [
    "Gisunzu",
    "Mpanga",
    "Nkomero",
    "Uwurugenge",
  ],

  // Muhima Sector
  "Nyarugenge|Muhima|Amahoro": [
    "Amizero",
    "Inyarurembo",
    "Kabirizi",
    "Ubuzima",
    "Uruhimbi",
  ],
  "Nyarugenge|Muhima|Kabasengerezi": ["Icyeza", "Ikana", "Intwari"],
  "Nyarugenge|Muhima|Kabeza": [
    "Hirwa",
    "Ikaze",
    "Imanzi",
    "Ingenzi",
    "Ituze",
    "Sangwa",
    "Umwezi",
  ],
  "Nyarugenge|Muhima|Nyabugogo": [
    "Gakoni",
    "Gatare",
    "Giticyinyoni",
    "Kadobogo",
    "Kamenge",
    "Karama",
    "Kiruhura",
    "Nyabikoni",
    "Nyabugogo",
    "Ruhondo",
  ],
  "Nyarugenge|Muhima|Rugenge": ["Imihigo", "Impala", "Ubumanzi"],
  "Nyarugenge|Muhima|Tetero": [
    "Indamutsa",
    "Ingoro",
    "Inkingi",
    "Intiganda",
    "Iwacu",
  ],
  "Nyarugenge|Muhima|Ubumwe": ["Isangano"],

  // Nyakabanda Sector
  "Nyarugenge|Nyakabanda|Munanira I": [
    "Kabusunzu",
    "Munanira",
    "Ntaraga",
    "Nyagasozi",
    "Rurembo",
  ],
  "Nyarugenge|Nyakabanda|Munanira II": [
    "Gasiza",
    "Kamwiza",
    "Kanyange",
    "Karudandi",
    "Kigabiro",
    "Kokobe",
    "Mucyuranyana",
    "Nkundumurimbo",
  ],
  "Nyarugenge|Nyakabanda|Nyakabanda I": [
    "Akinkware",
    "Gapfupfu",
    "Gasiza",
    "Kariyeri",
    "Kokobe",
    "Munini",
    "Nyakabanda",
    "Rwagitanga",
  ],
  "Nyarugenge|Nyakabanda|Nyakabanda II": [
    "Ibuhoro",
    "Kabeza",
    "Kanyiranganji",
    "Karujongi",
    "Kigarama",
    "Kirwa",
  ],

  // Nyamirambo Sector
  "Nyarugenge|Nyamirambo|Cyivugiza": [
    "Amizero",
    "Gabiro",
    "Imanzi",
    "Ingenzi",
    "Intwari",
    "Karisimbi",
    "Mahoro",
    "Mpano",
    "Muhabura",
    "Muhoza",
    "Munini",
    "Rugero",
    "Shema",
  ],
  "Nyarugenge|Nyamirambo|Gasharu": ["Kagunga", "Karukoro", "Rwintare"],
  "Nyarugenge|Nyamirambo|Mumena": [
    "Akanyana",
    "Akanyirazaninka",
    "Akarekare",
    "Akatabaro",
    "Irembo",
    "Itaba",
    "Kiberinka",
    "Mumena",
    "Rwampara",
  ],
  "Nyarugenge|Nyamirambo|Rugarama": [
    "Gatare",
    "Kiberinka",
    "Munanira",
    "Riba",
    "Rubona",
    "Rugarama",
    "Runyinya",
    "Rusisiro",
    "Tetero",
  ],

  // Nyarugenge Sector
  "Nyarugenge|Nyarugenge|Agatare": [
    "Agatare",
    "Amajyambere",
    "Inyambo",
    "Meraneza",
    "Uburezi",
    "Umucyo",
    "Umurava",
  ],
  "Nyarugenge|Nyarugenge|Biryogo": ["Gabiro", "Isoko", "Nyiranuma", "Umurimo"],
  "Nyarugenge|Nyarugenge|Kiyovu": [
    "Amizero",
    "Cercle Sportif",
    "Ganza",
    "Imena",
    "Indangamirwa",
    "Ingenzi",
    "Inyarurembo",
    "Ishema",
    "Isibo",
    "Muhabura",
    "Rugunga",
    "Sugira",
  ],
  "Nyarugenge|Nyarugenge|Rwampara": [
    "Amahoro",
    "Gacaca",
    "Intwari",
    "Umucyo",
    "Umuganda",
  ],

  // Rwezamenyo Sector
  "Nyarugenge|Rwezamenyo|Kabuguru I": [
    "Muhoza",
    "Muhuza",
    "Mumararungu",
    "Murambi",
  ],
  "Nyarugenge|Rwezamenyo|Kabuguru II": [
    "Buhoro",
    "Gasabo",
    "Mutara",
    "Ubusabane",
  ],
  "Nyarugenge|Rwezamenyo|Rwezamenyo I": [
    "Abatarushwa",
    "Indatwa",
    "Inkerakubanza",
    "Intwari",
  ],
  "Nyarugenge|Rwezamenyo|Rwezamenyo II": ["Amahoro", "Umucyo", "Urumuri"],

  // ============================================================
  // KIGALI CITY PROVINCE - Gasabo District
  // ============================================================

  // Bumbogo Sector
  "Gasabo|Bumbogo|Kinyaga": [
    "Akakaza",
    "Muhozi",
    "Rubungo",
    "Ryakigogo",
    "Zindiro",
  ],
  "Gasabo|Bumbogo|Musave": [
    "Kagarama",
    "Kayumba",
    "Ramba",
    "Rebero",
    "Rugando",
  ],
  "Gasabo|Bumbogo|Mvuzo": [
    "Kigabiro",
    "Kiyoro",
    "Murarambo",
    "Nkona",
    "Nyakabingo",
    "Rukoma",
  ],
  "Gasabo|Bumbogo|Ngara": [
    "Birembo",
    "Gisasa",
    "Munini",
    "Ruhinga",
    "Uwaruraza",
  ],
  "Gasabo|Bumbogo|Nkuzuzu": [
    "Akabenejuru",
    "Akasedogo",
    "Akimpama",
    "Burima",
    "Kityazo",
  ],
  "Gasabo|Bumbogo|Nyabikenke": [
    "Bushya",
    "Gikumba",
    "Kamutamu",
    "Karama",
    "Kayenzi",
    "Kigara",
    "Kiriza",
    "Masizi",
    "Mbogo",
    "Nyampamo",
  ],
  "Gasabo|Bumbogo|Nyagasozi": [
    "Akanyiramugarura",
    "Akigabiro",
    "Gishaka",
    "Kabuye",
    "Mpabwa",
    "Nyagasambu",
    "Urutarishonga",
  ],

  // Gatsata Sector
  "Gasabo|Gatsata|Karuruma": [
    "Akamamana",
    "Akimihigo",
    "Bigega",
    "Busasamana",
    "Kingasire",
    "Kumuyange",
    "Muremera",
    "Nyagasozi",
    "Rugoro",
    "Rwesero",
    "Tetero",
  ],
  "Gasabo|Gatsata|Nyamabuye": [
    "Agakomeye",
    "Gashubi",
    "Gisiza",
    "Hanika",
    "Juru",
    "Kibaya",
    "Mpakabavu",
    "Musango",
    "Ndengo",
    "Nyakabande",
    "Nyakanunga",
    "Rubonobono",
    "Runyonza",
    "Rusoro",
    "Ruvumero",
    "Uwagatovu",
  ],
  "Gasabo|Gatsata|Nyamugari": [
    "Agataramo",
    "Akamwunguzi",
    "Akarubimbura",
    "Akisoko",
    "Amarembo",
    "Amizero",
    "Bwiza",
    "Ihuriro",
    "Isangano",
    "Kanyonyomba",
    "Nyakariba",
    "Rwakarihejuru",
  ],

  // Gikomero Sector
  "Gasabo|Gikomero|Gasagara": ["Bwimiyange", "Bwingeyo", "Rugwiza"],
  "Gasabo|Gikomero|Gicaca": ["Ntaganzwa", "Nyagasozi", "Nyagisozi", "Ruganda"],
  "Gasabo|Gikomero|Kibara": ["Gahinga", "Gasharu", "Kibobo", "Nombe"],
  "Gasabo|Gikomero|Munini": [
    "Munini",
    "Mutokerezwa",
    "Rudakabukirwa",
    "Runyinya",
  ],
  "Gasabo|Gikomero|Murambi": ["Kimisebeya", "Kivugiza", "Rugarama", "Twina"],

  // Gisozi Sector
  "Gasabo|Gisozi|Musezero": [
    "Amajyambere",
    "Amarembo",
    "Byimana",
    "Gasave",
    "Gasharu",
    "Kagara",
    "Nyakariba",
    "Rwinyana",
  ],
  "Gasabo|Gisozi|Ruhango": [
    "Kanyinya",
    "Kumukenke",
    "Murambi",
    "Ntora",
    "Rukeri",
    "Umurava",
  ],

  // Jabana Sector
  "Gasabo|Jabana|Akamatamu": [
    "Cyeyere",
    "Murehe",
    "Nyacyonga",
    "Nyagasozi",
    "Nyarukurazo",
  ],
  "Gasabo|Jabana|Bweramvura": [
    "Agakenke",
    "Agatare",
    "Akinyana",
    "Gikingo",
    "Gitega",
    "Gitenga",
    "Nyakabingo",
    "Nyarurama",
    "Rugogwe",
  ],
  "Gasabo|Jabana|Kabuye": [
    "Amakawa",
    "Amasangano",
    "Buliza",
    "Ihuriro",
    "Kabeza",
    "Karuruma",
    "Murama",
    "Nyagasozi",
    "Rebero",
    "Rugarama",
    "Tetero",
  ],
  "Gasabo|Jabana|Kidashya": [
    "Agasekabuye",
    "Agatare",
    "Amasangano",
    "Mubuga",
    "Nyamweru",
  ],
  "Gasabo|Jabana|Ngiryi": [
    "Agahama",
    "Agasharu",
    "Akabuga",
    "Jurwe",
    "Kiberinka",
    "Nyakirehe",
    "Nyarubuye",
    "Rubona",
    "Rwanyanza",
    "Uwanyange",
  ],

  // Jali Sector
  "Gasabo|Jali|Agateko": [
    "Bugarama",
    "Bukamba",
    "Byimana",
    "Kabizoza",
    "Kinunga",
    "Urunyinya",
    "Rwankuba",
  ],
  "Gasabo|Jali|Buhiza": ["Kabande", "Gatare", "Nyamugali", "Nyarubuye"],
  "Gasabo|Jali|Muko": ["Gahinga", "Gatare", "Umunyinya"],
  "Gasabo|Jali|Nkusi": [
    "Agatwa",
    "Kabagina",
    "Kajevuba",
    "Kigarama",
    "Nyagasayo",
  ],
  "Gasabo|Jali|Nyabuliba": [
    "Nyaburira",
    "Kirehe",
    "Mataba",
    "Nyarurembo",
    "Rubona",
  ],
  "Gasabo|Jali|Nyakabungo": ["Bwocya", "Gitaba", "Karenge", "Rugina", "Ruhihi"],
  "Gasabo|Jali|Nyamitanga": ["Agasharu", "Agatare", "Kabuga", "Runyinya"],

  // Kacyiru Sector
  "Gasabo|Kacyiru|Kamatamu": [
    "Amajyambere",
    "Bukinanyana",
    "Cyimana",
    "Gataba",
    "Itetero",
    "Kabare",
    "Kamuhire",
    "Karukamba",
    "Nyagacyamo",
    "Rwinzovu",
    "Urugwiro",
    "Uruhongore",
  ],
  "Gasabo|Kacyiru|Kamutwa": [
    "Agasaro",
    "Gasharu",
    "Inkingi",
    "Kanserege",
    "Kigugu",
    "Ruganwa",
    "Umuco",
    "Urugero",
    "Urwibutso",
  ],
  "Gasabo|Kacyiru|Kibaza": [
    "Amahoro",
    "Bwiza",
    "Ihuriro",
    "Ineza",
    "Inyange",
    "Iriba",
    "Kabagari",
    "Ubumwe",
    "Umutako",
    "Urukundo",
    "Virunga",
  ],

  // Kimihurura Sector
  "Gasabo|Kimihurura|Kamukina": [
    "Inyamibwa",
    "Isangano",
    "Isano",
    "Ituze",
    "Izuba",
    "Juru",
    "Nyenyeri",
    "Umurava",
    "Urumuri",
  ],
  "Gasabo|Kimihurura|Kimihurura": [
    "Amahoro",
    "Amajyambere",
    "Imihigo",
    "Intambwe",
    "Mutara",
    "Rugarama",
    "Ubumwe",
    "Umutekano",
    "Urwego",
  ],
  "Gasabo|Kimihurura|Rugando": ["Gasange", "Gasasa", "Rebero"],

  // Kimironko Sector
  "Gasabo|Kimironko|Bibare": [
    "Abatuje",
    "Amariza",
    "Imanzi",
    "Imena",
    "Imitari",
    "Inganji",
    "Ingenzi",
    "Ingeri",
    "Inshuti",
    "Intashyo",
    "Intwari",
    "Inyamibwa",
    "Inyange",
    "Ubwiza",
    "Umwezi",
  ],
  "Gasabo|Kimironko|Kibagabaga": [
    "Akintwari",
    "Buranga",
    "Gasharu",
    "Ibuhoro",
    "Kageyo",
    "Kamahinda",
    "Karisimbi",
    "Karongi",
    "Nyirabwana",
    "Ramiro",
    "Rindiro",
    "Rugero",
    "Rukurazo",
    "Urumuri",
  ],
  "Gasabo|Kimironko|Nyagatovu": [
    "Ibukinanyana",
    "Ibuhoro",
    "Ijabiro",
    "Isangano",
    "Itetero",
    "Urugwiro",
  ],

  // Kinyinya Sector
  "Gasabo|Kinyinya|Gacuriro": [
    "Akarambo",
    "Akaruvusha",
    "Estate 2020",
    "Kabuhunde II",
    "Urugarama",
    "Ururembo",
    "Umucyo",
  ],
  "Gasabo|Kinyinya|Kagugu": [
    "Dusenyi",
    "Gicikiza",
    "Giheka",
    "Kabuhunde I",
    "Kadobogo",
    "Kagarama",
    "Muhororo",
    "Nyakabungo",
    "Rukingu",
  ],
  "Gasabo|Kinyinya|Murama": ["Binunga", "Ngaruyinka", "Rusenyi"],

  // Ndera Sector
  "Gasabo|Ndera|Bwiza": [
    "Akarwasa",
    "Akasemuromba",
    "Bucyemba",
    "Gasharu",
    "Mukagarama",
    "Ruhangare",
  ],
  "Gasabo|Ndera|Cyaruzinge": [
    "Ayabakora",
    "Cyaruzinge",
    "Gashure",
    "Gatare",
    "Gisura",
    "Karubibi",
    "Mulindi",
  ],
  "Gasabo|Ndera|Kibenga": [
    "Bahoze",
    "Berwa",
    "Buhoro",
    "Burunga",
    "Gitaraga",
    "Kira",
    "Nezerwa",
    "Rugazi",
    "Runyonza",
    "Tumurere",
    "Ururembo",
  ],
  "Gasabo|Ndera|Masoro": [
    "Byimana",
    "Kabeza",
    "Masoro",
    "Matwari",
    "Mubuga",
    "Munini",
  ],
  "Gasabo|Ndera|Mukuyu": [
    "Akamusare",
    "Akimana",
    "Gasharu",
    "Jurwe",
    "Karambo",
    "Kigabiro",
    "Ruseno",
  ],
  "Gasabo|Ndera|Rudashya": [
    "Kacyinyaga",
    "Kamahoro",
    "Munini",
    "Nyakagezi",
    "Ruhangare",
    "Ruhogo",
  ],

  // Nduba Sector
  "Gasabo|Nduba|Butare": [
    "Kanani",
    "Kidahe",
    "Kigabiro",
    "Nyamurambi",
    "Nyarubuye",
    "Nyura",
  ],
  "Gasabo|Nduba|Gasanze": [
    "Gatagara",
    "Kagarama",
    "Nyabitare",
    "Nyakabungo",
    "Nyarubande",
    "Uruhetse",
  ],
  "Gasabo|Nduba|Gasura": [
    "Agacyamo",
    "Gashinya",
    "Gikombe",
    "Kazi",
    "Kigufi",
    "Nyirakibehe",
    "Uruhahiro",
  ],
  "Gasabo|Nduba|Gatunga": [
    "Agasharu",
    "Amataba",
    "Burungero",
    "Karama",
    "Nyange",
    "Rebero",
    "Uruyange",
  ],
  "Gasabo|Nduba|Muremure": ["Gatobotobo", "Kibungo", "Musezero", "Nyaburoro"],
  "Gasabo|Nduba|Sha": [
    "Bikumba",
    "Gakizi",
    "Gatare",
    "Kamuyange",
    "Kigarama",
    "Ngara",
  ],
  "Gasabo|Nduba|Shango": [
    "Akazi",
    "Kaduha",
    "Kamuhoza",
    "Mirambi",
    "Munini",
    "Ndanyoye",
    "Nyamigina",
    "Rugarama",
  ],

  // Remera Sector
  "Gasabo|Remera|Nyabisindu": [
    "Amarembo I",
    "Amarembo II",
    "Gihogere",
    "Kagara",
    "Kinunga",
    "Nyabisindu",
    "Rugarama",
  ],
  "Gasabo|Remera|Nyarutarama": [
    "Gishushu",
    "Juru",
    "Kamahwa",
    "Kangondo I",
    "Kangondo II",
    "Kibiraro I",
    "Kibiraro II",
  ],
  "Gasabo|Remera|Rukiri I": [
    "Agashyitsi",
    "Amajyambere",
    "Izuba",
    "Gisimenti",
    "Ubumwe",
    "Ukwezi",
    "Urumuri",
  ],
  "Gasabo|Remera|Rukiri II": [
    "Amahoro",
    "Rebero",
    "Ruturusu I",
    "Ruturusu II",
    "Ubumwe",
  ],

  // Rusororo Sector
  "Gasabo|Rusororo|Bisenga": ["Bisenga", "Gakenyeri", "Gasiza", "Kidogo"],
  "Gasabo|Rusororo|Kabuga I": [
    "Abatangampundu",
    "Amahoro",
    "Isangano",
    "Kabeza",
    "Kalisimbi",
    "Masango",
  ],
  "Gasabo|Rusororo|Kabuga II": [
    "Bwiza",
    "Cyanamo",
    "Gatare",
    "Kamashashi",
    "Mataba",
    "Nyagakombe",
    "Ruhangare",
  ],
  "Gasabo|Rusororo|Kinyana": ["Busenyi", "Kigabiro", "Kinyana", "Nyagisozi"],
  "Gasabo|Rusororo|Mbandazi": [
    "Cyeru",
    "Karambo",
    "Kataruha",
    "Mugeyo",
    "Rugarama",
    "Samuduha",
  ],
  "Gasabo|Rusororo|Nyagahinga": [
    "Gisharara",
    "Kabutare",
    "Kanyinya",
    "Kigarama",
    "Nyarucundura",
    "Runyonza",
    "Urumuri",
  ],
  "Gasabo|Rusororo|Ruhanga": ["Kinyaga", "Mirama", "Nyagacyamo", "Rugende"],

  // Rutunga Sector
  "Gasabo|Rutunga|Gasabo": ["Gasharu", "Mulindi", "Vugavuge"],
  "Gasabo|Rutunga|Indatemwa": [
    "Kabarera",
    "Kamusengo",
    "Karekare",
    "Karuranga",
    "Nyakabande",
  ],
  "Gasabo|Rutunga|Kabaliza": ["Kabaliza", "Nyamise", "Rwanyanza"],
  "Gasabo|Rutunga|Kacyatwa": [
    "Cyili",
    "Kacyatwa",
    "Kandamira",
    "Kantabana",
    "Munini",
  ],
  "Gasabo|Rutunga|Kigabiro": [
    "Kamusare",
    "Karwiru",
    "Kigabiro",
    "Rukerereza",
    "Rwintare",
  ],

  // ============================================================
  // KIGALI CITY PROVINCE - Kicukiro District
  // ============================================================

  // Gahanga Sector
  "Kicukiro|Gahanga|Gahanga": [
    "Gahanga",
    "Gatare",
    "Gatovu",
    "Rinini",
    "Rwinanka",
    "Ubumwe",
  ],
  "Kicukiro|Gahanga|Kagasa": [
    "Kabeza",
    "Kabidandi",
    "Kiyanja",
    "Nyacyonga",
    "Nyagafunzo",
    "Nyakuguma",
    "Rugando II",
  ],
  "Kicukiro|Gahanga|Karembure": [
    "Amahoro",
    "Bigo",
    "Kabeza",
    "Kamuyinga",
    "Karembure",
    "Kimena",
    "Mubuga",
    "Rwamaya",
  ],
  "Kicukiro|Gahanga|Murinja": [
    "Kampuro",
    "Kigasa",
    "Mashyiga",
    "Nyabigugu",
    "Nyamuharaza",
    "Rukore",
    "Runyoni",
    "Sabununga",
  ],
  "Kicukiro|Gahanga|Nunga": [
    "Kigarama",
    "Kinyana",
    "Mugendo",
    "Nunga I",
    "Nunga II",
    "Rugasa",
  ],
  "Kicukiro|Gahanga|Rwabutenge": [
    "Gahosha",
    "Gashubi",
    "Kaboshya",
    "Karambo",
    "Rebero",
    "Rugando I",
  ],

  // Gatenga Sector
  "Kicukiro|Gatenga|Gatenga": [
    "Amahoro",
    "Gakoki",
    "Gatenga",
    "Ihuriro",
    "Isangano",
    "Rugari",
  ],
  "Kicukiro|Gatenga|Karambo": [
    "Gwiza",
    "Ihuriro",
    "Jyambere",
    "Kamabuye",
    "Mahoro",
    "Ramiro",
    "Rebero",
    "Rugwiro",
    "Ruhuka",
    "Sangwa",
  ],
  "Kicukiro|Gatenga|Nyanza": [
    "Bwiza",
    "Cyeza",
    "Gasabo",
    "Ihuriro",
    "Isonga",
    "Juru",
    "Marembo",
    "Murambi",
    "Nyanza",
    "Rebero",
    "Rusororo",
    "Sabaganga",
  ],
  "Kicukiro|Gatenga|Nyarurama": ["Bigo", "Bisambu", "Kabeza", "Nyabikenke"],

  // Gikondo Sector
  "Kicukiro|Gikondo|Kagunga": [
    "Gatare",
    "Kabuye I",
    "Kabuye II",
    "Kagunga I",
    "Kagunga II",
    "Rebero",
  ],
  "Kicukiro|Gikondo|Kanserege": [
    "Kanserege I",
    "Kanserege II",
    "Kanserege III",
    "Marembo I",
    "Marembo II",
    "Marembo III",
  ],
  "Kicukiro|Gikondo|Kinunga": [
    "Kigugu I",
    "Kigugu II",
    "Kigugu III",
    "Kinunga",
    "Ruganwa I",
    "Ruganwa II",
    "Ruganwa III",
  ],

  // Kagarama Sector
  "Kicukiro|Kagarama|Muyange": ["Kamuna", "Mugeyo", "Muyange", "Rugunga"],
  "Kicukiro|Kagarama|Rukatsa": [
    "Inshuti",
    "Mpingayanyanza",
    "Nyacyonga",
    "Nyanza",
    "Rukatsa",
  ],

  // Kanombe Sector
  "Kicukiro|Kanombe|Busanza": [
    "Amahoro",
    "Antene",
    "Bamporeze I",
    "Bamporeze II",
    "Gashyushya",
    "Gishikiri",
    "Hope",
    "Kariyeri",
    "Nyarugugu",
    "Radari",
    "Rukore",
  ],
  "Kicukiro|Kanombe|Karama": [
    "Bitare",
    "Byimana",
    "Cyurusagara",
    "Gakorokombe",
    "Gikundiro",
    "Gitarama",
    "Nyabyunyu",
    "Nyarutovu",
    "Urukundo",
  ],
  "Kicukiro|Kanombe|Rubirizi": [
    "Beninka",
    "Bukunzi",
    "Cyeru",
    "Intwari",
    "Itunda",
    "Kavumu",
    "Susuruka",
    "Ubumwe",
    "Umunara",
    "Uwabarezi",
    "Zirakamwa",
  ],

  // Kicukiro Sector
  "Kicukiro|Kicukiro|Kagina": [
    "Gashiha",
    "Iriba",
    "Multimedia",
    "Umunyinya",
    "Umuremure",
    "Urugero",
  ],
  "Kicukiro|Kicukiro|Kicukiro": [
    "Gasave",
    "Isoko",
    "Karisimbi",
    "Kicukiro",
    "Triangle",
    "Ubumwe",
  ],
  "Kicukiro|Kicukiro|Ngoma": [
    "Ahitegeye",
    "Intaho",
    "Iriba",
    "Isangano",
    "Urugero",
  ],

  // Kigarama Sector
  "Kicukiro|Kigarama|Bwerankori": [
    "Gakokobe",
    "Gatare",
    "Imena",
    "Ituze",
    "Kabutare",
    "Kimisange",
    "Nyenyeri",
    "Ubumenyi",
  ],
  "Kicukiro|Kigarama|Karugira": [
    "Ibuga",
    "Ihuriro",
    "Murambi",
    "Rutoki",
    "Terimbere",
    "Ubutare",
    "Umurimo",
  ],

  // Masaka Sector
  "Kicukiro|Masaka|Ayabaraya": [
    "Kababyeyi",
    "Ayabaraya",
    "Nyamico",
    "Nyamyijima",
    "Nyirakavomo",
    "Rususa",
  ],
  "Kicukiro|Masaka|Cyimo": [
    "Biryogo",
    "Bwiza",
    "Cyimo",
    "Kabeza",
    "Kiyovu",
    "Masaka",
    "Murambi",
    "Nyakagunga",
    "Urugwiro",
  ],
  "Kicukiro|Masaka|Gako": [
    "Bamporeze",
    "Butangampundu",
    "Butare",
    "Cyugamo",
    "Gicaca",
    "Gihuke",
    "Kabeza",
    "Kibande",
    "Rebero",
    "Rugende",
    "Ruyaga",
  ],
  "Kicukiro|Masaka|Gitaraga": [
    "Gitaraga",
    "Kabeza",
    "Kajevuba",
    "Nyakarambi",
    "Nyange",
    "Ruhanga",
    "Rwintare",
  ],
  "Kicukiro|Masaka|Mbabe": [
    "Kabeza",
    "Kamashashi",
    "Mbabe",
    "Murambi",
    "Ngarama",
    "Sangano",
  ],
  "Kicukiro|Masaka|Rusheshe": [
    "Cyankongi",
    "Cyeru",
    "Gatare",
    "Kagese",
    "Kanyetabi",
    "Mubano",
    "Ruhosha",
  ],

  // Niboye Sector
  "Kicukiro|Niboye|Gatare": [
    "Byimana",
    "Gatare",
    "Imena",
    "Kamahoro",
    "Kigarama",
    "Rugunga",
    "Rurembo",
  ],
  "Kicukiro|Niboye|Niboye": [
    "Buhoro",
    "Gaseke",
    "Gateke",
    "Gorora",
    "Kigabiro",
    "Kinunga",
    "Kiruhura",
    "Munini",
    "Murehe",
    "Mwijabo",
    "Mwijuto",
    "Nyarubande",
    "Rwezamenyo",
    "Sovu",
  ],
  "Kicukiro|Niboye|Nyakabanda": [
    "Amahoro",
    "Amarebe",
    "Amarembo",
    "Bigabiro",
    "Bukinanyana",
    "Bumanzi",
    "Bwiza",
    "Gatsibo",
    "Gikundiro",
    "Indakemwa",
    "Indamutsa",
    "Indatwa",
    "Inyarurembo",
    "Isangano",
    "Karama",
    "Kinyana",
    "Rugwiro",
    "Umurava",
  ],

  // Nyarugunga Sector
  "Kicukiro|Nyarugunga|Kamashashi": [
    "Akindege",
    "Indatwa",
    "Intwari",
    "Kabagendwa",
    "Kibaya",
    "Mukoni",
    "Mulindi",
    "Umucyo",
    "Uruhongore",
  ],
  "Kicukiro|Nyarugunga|Nonko": [
    "Gasaraba",
    "Gihanga",
    "Gitara",
    "Kavumu",
    "Mahoro",
    "Nyarutovu",
    "Rugali",
    "Runyonza",
  ],
  "Kicukiro|Nyarugunga|Rwimbogo": [
    "Gabiro",
    "Kabaya",
    "Kanogo",
    "Marembo",
    "Umushumba Mwiza",
    "Nyandungu",
    "Ruragendwa",
    "Rwinyana",
    "Rwinyange",
    "Rwiza",
    "Urwibutso",
  ],
  // ============================================================
  // SOUTH PROVINCE - Nyanza District
  // ============================================================

  // Busasamana Sector
  "Nyanza|Busasamana|Gahondo": [
    "Bigega",
    "Bugura",
    "Kamatovu",
    "Karama",
    "Kavumu",
    "Kibaga",
    "Kiberinka",
    "Nyakwibereka",
    "Nyarutovu",
  ],
  "Nyanza|Busasamana|Kibinja": [
    "Kabuzuru",
    "Kigarama",
    "Mukindo",
    "Ngorongari",
    "Rebero",
    "Rugarama",
    "Rugari A",
    "Rugari B",
  ],

  // Busoro Sector
  "Nyanza|Busoro|Gitovu": [
    "Gitega",
    "Kabeza",
    "Kayenzi",
    "Muhindo",
    "Musumba",
    "Nazareti",
    "Nyacyonga",
    "Nyagasambu",
    "Rushoka",
  ],
  "Nyanza|Busoro|Kimirama": [
    "Gitwa",
    "Kimirama",
    "Kireranyana",
    "Ndamira",
    "Nyamiyonga",
    "Nyarugenge",
    "Rugarama",
  ],
  "Nyanza|Busoro|Masangano": [
    "Busoro",
    "Bweramana",
    "Gikombe",
    "Masangano",
    "Murambi",
    "Nyarugunga",
    "Runyonza",
    "Shinga",
  ],
  "Nyanza|Busoro|Munyinya": [
    "Kagarama",
    "Karambi",
    "Kigali",
    "Kivugiza",
    "Rwara",
  ],
  "Nyanza|Busoro|Rukingiro": [
    "Cyamugani",
    "Cyuriro",
    "Gasambu",
    "Runazi",
    "Rwanamiza",
    "Rwangoga",
  ],
  "Nyanza|Busoro|Shyira": [
    "Gahogo",
    "Kinkanga",
    "Nyamoyaga",
    "Rucyamo",
    "Rusharu",
    "Saruduha",
  ],

  // Cyabakamyi Sector
  "Nyanza|Cyabakamyi|Kadaho": [
    "Gahengeri",
    "Gasenyi",
    "Gataba",
    "Gitega",
    "Kabere",
    "Kabeza",
    "Kadaho",
    "Nyabisazi",
    "Nyabyiyoni",
  ],
  "Nyanza|Cyabakamyi|Nyabinyenga": [
    "Kabuga",
    "Kandihe",
    "Karehe",
    "Kimiyumbu",
    "Nyabinyenga",
    "Rugwa",
    "Rwamagana",
  ],
  "Nyanza|Cyabakamyi|Rubona": [
    "Bikombe",
    "Bugarama",
    "Gahunga",
    "Karambo",
    "Kavumu",
    "Murambi",
    "Nyabishike",
    "Nyaminazi",
    "Nyarutovu",
    "Rugendabari",
  ],

  // Kibilizi Sector
  "Nyanza|Kibilizi|Cyeru": [
    "Gasagara",
    "Gisika",
    "Kamatamu",
    "Karama",
    "Matara",
    "Muyebe",
    "Nyamunini",
    "Rutete",
  ],
  "Nyanza|Kibilizi|Mbuye": [
    "Binyana",
    "Gako",
    "Gihama",
    "Karambi",
    "Karehe",
    "Kigarama",
    "Mukoni",
    "Rukore",
  ],
  "Nyanza|Kibilizi|Mututu": [
    "Gatongati",
    "Gicumbi",
    "Kabeza",
    "Kanyinya",
    "Kivugiza",
    "Masangano",
  ],
  "Nyanza|Kibilizi|Rwotso": [
    "Bigarama",
    "Kabuga",
    "Kibilizi",
    "Mubano",
    "Mubuga",
    "Mutima",
    "Nyarurama",
    "Runyonza",
    "Rusagara",
    "Saruhembe",
  ],

  // Kigoma Sector
  "Nyanza|Kigoma|Butansinda": [
    "Butatsinda",
    "Gitare",
    "Shusho",
    "Karama",
    "Karambo",
    "Kayange",
    "Kibaza",
    "Kigoma",
    "Marongi",
    "Mataba",
    "Nyesonga",
  ],
  "Nyanza|Kigoma|Butara": [
    "Buruba",
    "Butara",
    "Gasharu",
    "Kavumu",
    "Kigufi",
    "Kirundo",
    "Nyabusheshe",
    "Runyinya",
  ],
  "Nyanza|Kigoma|Gahombo": [
    "Birembo",
    "Cyingina",
    "Gashikiri",
    "Gicunshu",
    "Gisore",
    "Karugando",
    "Kaziba",
    "Kirerabana",
    "Nyagacyamo",
    "Rugarama",
    "Serivise",
  ],
  "Nyanza|Kigoma|Gasoro": [
    "Bugarura",
    "Bwambika",
    "Gisoro",
    "Giturwa",
    "Kabacuzi",
    "Kajevuba",
    "Kinene",
    "Mutende",
    "Nyabubare",
    "Nyakabungo",
    "Runyanzige",
    "Sholi",
  ],
  "Nyanza|Kigoma|Mulinja": [
    "Akana Ka Mulinja",
    "Akintare",
    "Buharankakara",
    "Buhoro",
    "Burambi",
    "Karama",
    "Kigarama",
    "Muramba",
    "Nyarukurazo",
    "Sabununga",
  ],

  // Mukingo Sector
  "Nyanza|Mukingo|Cyerezo": [
    "Birambo",
    "Bweramana",
    "Cyerezo",
    "Cyikirehe",
    "Cyumba",
    "Gasharu",
    "Kamabuye",
    "Karambi",
    "Nyarutovu",
  ],
  "Nyanza|Mukingo|Gatagara": [
    "Cyahafi",
    "Gatagara",
    "Kamushatsi",
    "Karama",
    "Karuhwanya",
    "Kinyogoto",
    "Muhororo",
    "Nyamiyaga",
    "Nyamuko",
  ],
  "Nyanza|Mukingo|Kiruli": [
    "Gahoko",
    "Kaganza",
    "Kiganda",
    "Kigarama",
    "Masambu",
    "Muganza",
    "Murehe",
    "Muturirwa",
    "Nkiko",
    "Nyabishinge",
    "Nyankunamirwa",
  ],
  "Nyanza|Mukingo|Mpanga": [
    "Birembo",
    "Karambi",
    "Kinyinya",
    "Mataba",
    "Nkinda",
    "Nyakabuye",
    "Nyamazi",
    "Remera",
  ],
  "Nyanza|Mukingo|Ngwa": [
    "Bikire",
    "Biroro",
    "Gasiza",
    "Kagwa A",
    "Karambi A",
    "Karenge",
    "Kidaturwa",
    "Kigarama",
    "Mwanabiri",
    "Nyarunyinya A",
    "Rutete",
  ],
  "Nyanza|Mukingo|Nkomero": [
    "Cyimana",
    "Gisuma",
    "Kabarima",
    "Kibonde",
    "Kigarama",
    "Nyacyoma",
    "Nyakabungo",
    "Nyankokoma",
    "Nzuki",
    "Ruhosha",
  ],

  // Muyira Sector
  "Nyanza|Muyira|Gati": [
    "Buhaza",
    "Kimfizi",
    "Kinyoni",
    "Ruyenzi",
    "Rwabihanga",
  ],
  "Nyanza|Muyira|Migina": [
    "Bugina",
    "Kalilisi",
    "Kavumu",
    "Kinyana",
    "Musenyi",
  ],
  "Nyanza|Muyira|Nyamiyaga": ["Gihama", "Kabuye", "Kiniga", "Nzovi", "Rugese"],
  "Nyanza|Muyira|Nyamure": [
    "Cyegera",
    "Gatare",
    "Gituza",
    "Kanyundo",
    "Nyarugunga",
  ],
  "Nyanza|Muyira|Nyundo": ["Jari", "Nyundo", "Mugari", "Muyira", "Nzoga"],

  // Ntyazo Sector
  "Nyanza|Ntyazo|Bugali": [
    "Gakindo",
    "Gisayura",
    "Kabusheja",
    "Kiruhura",
    "Marabage",
    "Ndago",
    "Nkomane",
    "Nyabitare",
    "Rugarama",
  ],
  "Nyanza|Ntyazo|Cyotamakara": [
    "Bayi",
    "Kankima",
    "Karuyumbo",
    "Misasa",
    "Mpande",
    "Nyabigugu",
    "Nyarutovu",
    "Ruyenzi",
    "Rwimpundu",
  ],
  "Nyanza|Ntyazo|Katarara": [
    "Gasharu",
    "Kagarama",
    "Kamabuye",
    "Muhero",
    "Munyiginya",
    "Muyenzi",
    "Nkombe",
    "Rebero",
    "Rukoma",
    "Rusebeya",
  ],

  // Nyagisozi Sector
  "Nyanza|Nyagisozi|Gahunga": [
    "Gatare",
    "Gihara",
    "Gituntu",
    "Kagarama",
    "Kigohe",
    "Mweya",
    "Nyamugari",
    "Uwarukara",
  ],
  "Nyanza|Nyagisozi|Kabirizi": [
    "Cyahafi",
    "Gihimbi",
    "Kabuye",
    "Muhaga",
    "Nyagatovu",
    "Nyamabuye",
    "Nyaruvumu",
  ],
  "Nyanza|Nyagisozi|Kabuga": [
    "Gatoki",
    "Mirehe",
    "Murandaryi",
    "Mwokora",
    "Nyamitobo",
    "Uwabushingwe",
    "Uwagisozi",
    "Uwimpura",
  ],
  "Nyanza|Nyagisozi|Kirambi": [
    "Busenyeye",
    "Bweru",
    "Gasharu",
    "Gasiza",
    "Jarama",
    "Mpaza",
    "Murende",
    "Mwezi",
    "Rwankuba",
    "Rwimbazi",
  ],
  "Nyanza|Nyagisozi|Rurangazi": [
    "Gashyenzi",
    "Kami",
    "Kigarama",
    "Musongati",
    "Nyamagana",
    "Nyarutovu",
    "Nyaruvumu",
    "Rugarama",
  ],

  // Rwabicuma Sector
  "Nyanza|Rwabicuma|Gacu": ["Bisambu", "Gisake", "Karehe", "Nyamiyaga"],
  "Nyanza|Rwabicuma|Gishike": [
    "Gakoni",
    "Gasiza A",
    "Gasiza B",
    "Karambo A",
    "Karambo B",
    "Karusimbi",
    "Rwamushumba",
  ],
  "Nyanza|Rwabicuma|Mubuga": ["Kabisine", "Kadusenyi", "Karwiru", "Nyamiseke"],
  "Nyanza|Rwabicuma|Mushirarungu": [
    "Kirwa",
    "Nyabubare",
    "Nyamivumu A",
    "Nyamuvumu B",
  ],
  "Nyanza|Rwabicuma|Nyarusange": [
    "Cyarwa",
    "Kamushi",
    "Kamuvunyi A",
    "Kamuvunyi B",
    "Karambi",
    "Kavumu A",
    "Kavumu B",
  ],
  "Nyanza|Rwabicuma|Runga": [
    "Kigarama",
    "Murambi",
    "Ndago",
    "Rugarama A",
    "Rugarama B",
  ],

  // ============================================================
  // SOUTH PROVINCE - Gisagara District
  // ============================================================

  // Gikonko Sector
  "Gisagara|Gikonko|Cyiri": [
    "Curusi",
    "Cyendajuru",
    "Cyimpuga",
    "Katiro",
    "Kigitega",
    "Kinyana",
    "Murambi",
    "Musambi",
    "Sanzu",
  ],
  "Gisagara|Gikonko|Gikonko": [
    "Gahabwa",
    "Karubondo",
    "Manyinya",
    "Rugarama",
    "Runyinya",
  ],
  "Gisagara|Gikonko|Mbogo": [
    "Bukorota",
    "Buremera",
    "Kirivuga",
    "Mbogo",
    "Nyakabuye",
    "Nyiramageni",
    "Rwatano",
    "Rwintare",
  ],

  // Gishubi Sector
  "Gisagara|Gishubi|Gabiro": [
    "Busave",
    "Kigozi",
    "Kivugiza",
    "Kurugogwe",
    "Nyamure",
    "Nyundo",
    "Ruhina",
    "Kurutare",
    "Rweza",
    "Tamba",
    "Zamwe",
  ],
  "Gisagara|Gishubi|Nyabitare": [
    "Hemba",
    "Kabuga",
    "Kanombe",
    "Mutobo",
    "Mwiba",
    "Ndaro",
    "Nyabisindu",
    "Nyirakanywero",
    "Rwinkwavu",
    "Ryarugaju",
  ],
  "Gisagara|Gishubi|Nyakibungo": [
    "Banga",
    "Gicaca",
    "Kavumu",
    "Kibindyi",
    "Munyinya",
    "Nkunamo",
    "Nyakibungo",
    "Nyarurama",
    "Rebero",
    "Rugarama",
    "Rusasa",
  ],
  "Gisagara|Gishubi|Nyeranzi": [
    "Cyamanyeri",
    "Gikuyo",
    "Gishya",
    "Gitekateke",
    "Kabungo",
    "Kagoma",
    "Kavumu",
    "Kigarama",
    "Muduha",
    "Muyinza",
    "Nyabyunyu",
    "Rebero",
    "Rugogwe",
    "Rwanza",
    "Rwegura",
    "Sakara",
  ],

  // Kansi Sector
  "Gisagara|Kansi|Akaboti": [
    "Agacyamu",
    "Agataba",
    "Akabuga",
    "Akayenzi",
    "Gatare",
    "Impinga",
    "Rugarama",
    "Ruhuha",
  ],
  "Gisagara|Kansi|Sabusaro": [
    "Akayenzi",
    "Gikore",
    "Muhororo",
    "Nyamure",
    "Nyarunazi",
    "Ruhangaye",
  ],
  "Gisagara|Kansi|Umunini": [
    "Agatare",
    "Akabagari",
    "Gisororo",
    "Kaburanjwiri",
    "Kaduha",
    "Kamugani",
    "Kigarama",
    "Nyange",
  ],

  // Kibirizi Sector
  "Gisagara|Kibirizi|Duwani": [
    "Buhoro",
    "Burashi",
    "Cyahafi",
    "Duwani",
    "Karambo",
    "Kinteko",
    "Kivumu",
    "Mubuga",
    "Murambi",
    "Rwuya",
  ],
  "Gisagara|Kibirizi|Kibirizi": [
    "Burashi",
    "Gasagara",
    "Kabakobwa",
    "Kigarama",
    "Mareba",
    "Mbeho",
    "Ruhuha",
    "Shenyeri",
    "Torero",
  ],
  "Gisagara|Kibirizi|Muyira": [
    "Agahumiro",
    "Agasharu",
    "Akagarama",
    "Akayohani",
    "Akirasaniro",
    "Impinga",
    "Nyagasozi",
    "Nyagisasa",
    "Rwinzuki",
    "Zihare",
  ],
  "Gisagara|Kibirizi|Ruturo": [
    "Agatongati",
    "Akabuhuzu",
    "Akamuzenga",
    "Akarugaju",
    "Impinga",
    "Kabagoti",
    "Karengera",
    "Kigarama",
    "Ntobo",
    "Nyabununi",
    "Rubazi",
  ],

  // Kigembe Sector
  "Gisagara|Kigembe|Agahabwa": [
    "Agahehe",
    "Kabacuzi",
    "Kamutozo",
    "Kamweko",
    "Nyamabuye",
    "Ruhuha",
  ],
  "Gisagara|Kigembe|Gatovu": [
    "Agasharu",
    "Agatare",
    "Akamana",
    "Gitozo",
    "Janja",
    "Kigarama",
  ],
  "Gisagara|Kigembe|Impinga": [
    "Akadogo",
    "Akakijugujugu",
    "Ikidashya",
    "Icyijana",
    "Nyamirama",
    "Rugeragere",
  ],
  "Gisagara|Kigembe|Rusagara": [
    "Agasharu",
    "Akajwiga",
    "Akatera",
    "Kigarama",
    "Nyarukurazo",
    "Nyarunyinya",
  ],

  // Mamba Sector
  "Gisagara|Mamba|Gakoma": [
    "Gakomeye",
    "Gatare",
    "Kinamba",
    "Kivomo",
    "Kizenga",
    "Rebero",
    "Rugenge",
    "Rugwiza",
    "Ruhuha",
    "Sokofi",
  ],
  "Gisagara|Mamba|Kabumbwe": [
    "Buye",
    "Gahararo",
    "Kabuga",
    "Kirwa",
    "Muhabura",
    "Munopfu",
    "Nunga",
    "Nyarugenge",
  ],
  "Gisagara|Mamba|Mamba": [
    "Buhima",
    "Gakoma",
    "Gatovu",
    "Kamudogo",
    "Karama",
    "Kirase",
    "Mashenyi",
    "Nyarugenge",
    "Rugunga",
  ],
  "Gisagara|Mamba|Muyaga": [
    "Butezi",
    "Cadi",
    "Cyarwa",
    "Kabeza",
    "Kibumba",
    "Mutori",
    "Nyamirama",
    "Ruhamagariro",
    "Shyembe",
  ],
  "Gisagara|Mamba|Ramba": [
    "Gatare",
    "Gatoke",
    "Kayenzi",
    "Kigangazi",
    "Murama",
    "Murambi",
    "Nyiramageni",
    "Runazi",
    "Rurama",
    "Rusave",
    "Rwimvubu",
  ],

  // Muganza Sector
  "Gisagara|Muganza|Cyumba": [
    "Byiza",
    "Cyumba",
    "Gitwa",
    "Kabacuzi",
    "Kamabango",
    "Musatsi",
    "Mutorerwa",
    "Nyagatovu",
    "Nyiraburiba",
    "Rugantete",
    "Rutare",
    "Rwimisambi",
  ],
  "Gisagara|Muganza|Muganza": [
    "Agasharu",
    "Agatongati",
    "Amajuri",
    "Cyanamo",
    "Gitisi",
    "Rwamugoyi",
    "Rwinkuba",
    "Ubusenyi",
    "Urusaro",
  ],
  "Gisagara|Muganza|Remera": [
    "Agakurwe",
    "Agaseke",
    "Akarambo",
    "Butare",
    "Kajyanama",
  ],
  "Gisagara|Muganza|Rwamiko": [
    "Agasharu",
    "Agatovu",
    "Akarubumba",
    "Akimirama",
    "Buseruka",
    "Gako",
    "Impinga",
    "Kabahongo",
    "Kiberengeri",
    "Kidaturwa",
    "Kigina",
    "Kiyogoro",
    "Mbehe",
    "Nyagatovu",
    "Nyamagana",
    "Ryarumenangiga",
    "Umunazi",
  ],
  "Gisagara|Muganza|Saga": [
    "Akabacuzi",
    "Bucaya",
    "Buhiza",
    "Duwane",
    "Impinga",
    "Isangano",
    "Kanto I",
    "Kanto II",
    "Nyabigugu",
    "Nyagafumberi",
    "Nyakagezi",
    "Nyamiheto I",
    "Nyamiheto II",
    "Rwinkuba",
  ],

  // Mugombwa Sector
  "Gisagara|Mugombwa|Baziro": [
    "Bazankuru",
    "Igitungwa",
    "Nyabinyenga",
    "Nyagatovu",
    "Nyamirama",
    "Nyarukeri",
    "Nyesumo",
  ],
  "Gisagara|Mugombwa|Kibayi": [
    "Agakanka",
    "Akarutsibuka",
    "Akashyamba",
    "Akabugabo",
    "Rinda",
    "Rwahambi",
    "Udukoni",
  ],
  "Gisagara|Mugombwa|Kibu": [
    "Agasharu",
    "Akabugabo",
    "Akagashuma",
    "Mushongi",
    "Rurenge",
  ],
  "Gisagara|Mugombwa|Mugombwa": [
    "Agasharu",
    "Akagarama",
    "Akarambo",
    "Bishya",
    "Impinga",
    "Migina",
  ],
  "Gisagara|Mugombwa|Mukomacara": [
    "Agakomansyo",
    "Akanyamirama",
    "Akarangabo",
    "Akatare",
    "Gitarama",
    "Kabuye",
    "Nyabisonga",
    "Nyarusange",
    "Umukungu",
  ],

  // Mukindo Sector
  "Gisagara|Mukindo|Gitega": [
    "Agasharu",
    "Akazenga",
    "Gatunda",
    "Joma",
    "Akabati",
    "Magi",
    "Nyabikoni",
    "Nyamabuye",
    "Rebero",
    "Ruko",
  ],
  "Gisagara|Mukindo|Mukiza": [
    "Akagarama",
    "Bukamba",
    "Cyimana",
    "Gitwa",
    "Kigoyi",
    "Mukiza",
    "Nyabiryo",
    "Nyakazana",
    "Nyarutovu",
    "Rusumba",
  ],
  "Gisagara|Mukindo|Nyabisagara": [
    "Agatare",
    "Kabuga",
    "Akanage",
    "Butare",
    "Kamasiga",
    "Makwaza",
    "Mihigo",
    "Mutondo",
    "Nkurubuye",
    "Nyabihama",
    "Rurimbi",
    "Rususa",
  ],
  "Gisagara|Mukindo|Runyinya": [
    "Agakomeye",
    "Agasharu",
    "Akakarinda",
    "Akamaranga",
    "Akarugina",
    "Akayenzi",
    "Cyumusave",
    "Impinga",
    "Itaba",
    "Mpungwe",
    "Munyegera",
    "Nyiranguri",
  ],

  // Musha Sector
  "Gisagara|Musha|Bukinanyana": [
    "Agatega",
    "Akagarama",
    "Bukinanyana",
    "Gihinga",
    "Karishyira",
    "Kigoma",
    "Mugejuru",
    "Munyegera",
    "Rugarama",
    "Rukoni",
    "Rwabuhanga",
    "Rwatano",
  ],
  "Gisagara|Musha|Kimana": [
    "Akabanga",
    "Kamabuye",
    "Kamutabazi",
    "Kibirizi",
    "Murambi",
    "Nyabiduha",
    "Nyamiyaga",
    "Ramba",
    "Rurama",
    "Rusenyi",
  ],

  // Ndora Sector
  "Gisagara|Ndora|Bweya": [
    "Akiminazi",
    "Gatobotobo",
    "Kamahembe",
    "Kantabana",
    "Mirayi",
    "Sabudari",
  ],
  "Gisagara|Ndora|Cyamukuza": [
    "Giseke",
    "Nyaburondwe",
    "Nyarubari",
    "Ryabiyaga",
    "Sagahungu",
    "Urusenyi",
  ],
  "Gisagara|Ndora|Dahwe": [
    "Agasharu",
    "Gahondo",
    "Gitwa",
    "Kigarama",
    "Ndatemwa",
    "Twarubona",
  ],
  "Gisagara|Ndora|Gisagara": [
    "Gisagara",
    "Kabuga",
    "Kabuye",
    "Ndora",
    "Nyabitare",
    "Nyamigango",
    "Nyarunazi",
    "Rugara",
    "Rutonde",
  ],
  "Gisagara|Ndora|Mukande": [
    "Bugarama",
    "Kidwange",
    "Nkinda I",
    "Nkinda II",
    "Nyarunyinya",
    "Nyarusange",
  ],

  // Nyanza Sector (Gisagara)
  "Gisagara|Nyanza|Higiro": [
    "Agatare",
    "Kabakene",
    "Akagarama",
    "Amashya",
    "Impinga II",
    "Rama",
    "Ruvugizo",
    "Uruvumvuti",
  ],
  "Gisagara|Nyanza|Nyaruteja": [
    "Agahehe",
    "Akamerwe",
    "Akasemabondi",
    "Marambya",
    "Gisunzu",
    "Impinga I",
    "Intuntu",
    "Rugayantete",
    "Rugomero",
  ],
  "Gisagara|Nyanza|Umubanga": [
    "Akamabuye",
    "Akarwishyura",
    "Akinyana",
    "Maheresho",
    "Manyoni",
    "Remera",
    "Tundiro",
    "Urukeri",
  ],

  // Save Sector
  "Gisagara|Save|Gatoki": [
    "Gasambu",
    "Gashubi",
    "Kampuro",
    "Kaneke",
    "Kavumu",
    "Nyarigina",
    "Rugarama",
  ],
  "Gisagara|Save|Munazi": [
    "Kadurumba",
    "Gakombe",
    "Gitwa",
    "Kabitoki",
    "Kigwa",
    "Nyarure",
    "Rwoserezo",
    "Zihare",
  ],
  "Gisagara|Save|Rwanza": [
    "Akarambo",
    "Bazenga",
    "Bitabire",
    "Bwinyambo",
    "Cyezuburo",
    "Gahora",
    "Kamudahunga",
    "Kigarama",
    "Kivumu",
    "Nyabitare",
    "Nyagacyamu",
    "Ryamaguri",
  ],
  "Gisagara|Save|Shyanda": [
    "Gahora",
    "Kagende",
    "Kirehe",
    "Kirira",
    "Mpinga",
    "Mukoni",
    "Rugori",
    "Ryakabuye",
    "Ryamutabazi",
  ],
  "Gisagara|Save|Zivu": [
    "Kinyonzwe",
    "Musekera",
    "Nyagasozi",
    "Rugogwe",
    "Rwanzana",
    "Ryamurongo",
    "Ryarubayi",
  ],

  // ============================================================
  // SOUTH PROVINCE - Huye District
  // ============================================================

  // Gishamvu Sector
  "Huye|Gishamvu|Nyakibanda": ["Byimana", "Kamabuye", "Karambo", "Kigarama"],
  "Huye|Gishamvu|Nyumba": [
    "Akagahaya",
    "Busoro",
    "Gasyankingi",
    "Gishamvu",
    "Mirambi",
    "Nyagatama",
  ],
  "Huye|Gishamvu|Ryakibogo": [
    "Gakombe",
    "Gasekebuye",
    "Gitwa",
    "Impinga",
    "Kadahokwa",
    "Kidahire",
    "Kiduha",
  ],
  "Huye|Gishamvu|Shori": [
    "Akabere",
    "Cyambwe",
    "Kabeza",
    "Karubare",
    "Kinyovi",
    "Rebero",
    "Rusasa",
    "Umunyinya",
  ],

  // Huye Sector
  "Huye|Huye|Muyogoro": [
    "Agacyamu",
    "Agasharu",
    "Akagarama",
    "Akaruzi",
    "Kigarama",
    "Munini",
    "Nkamatira",
    "Nyarutovu",
    "Nyarwumba",
    "Rugerero",
    "Rwankoni",
    "Rwaza",
    "Shuni",
  ],
  "Huye|Huye|Nyakagezi": [
    "Gatongati",
    "Kamutima",
    "Karuhinda",
    "Kigarama",
    "Kinyana",
    "Kinyinya",
    "Mbuba",
    "Munanira",
    "Nyarunazi",
    "Rugarama",
  ],
  "Huye|Huye|Rukira": [
    "Agacyamu",
    "Agahenerezo",
    "Agakombe",
    "Agasharu",
    "Gitwa",
    "Kanazi",
    "Kaseramba",
    "Kubutare",
    "Magonde",
    "Nyagasambu",
    "Nyanza",
    "Rugarama",
    "Sabaderi",
  ],
  "Huye|Huye|Sovu": [
    "Gako",
    "Gasongati",
    "Gikombe",
    "Kabagendera",
    "Karambo",
    "Karuhayi",
    "Kigarama",
    "Ngobagoba",
    "Rwezamenyo",
  ],

  // Karama Sector
  "Huye|Karama|Buhoro": [
    "Kibingo",
    "Mataba",
    "Mitsinda",
    "Nyamapfunda",
    "Nyamikaba",
  ],
  "Huye|Karama|Bunazi": [
    "Agatenderi",
    "Akarehe",
    "Ikigarama",
    "Kinani",
    "Rwezamenyo",
  ],
  "Huye|Karama|Gahororo": [
    "Akarambo",
    "Mavumba",
    "Mukongoro",
    "Nyarusange",
    "Sangano",
    "Umuyange",
    "Uwarugondo",
  ],
  "Huye|Karama|Kibingo": [
    "Agasharu",
    "Agatovu",
    "Mukimba",
    "Nkoto",
    "Nyesonga",
    "Zaga",
  ],
  "Huye|Karama|Muhembe": [
    "Butare",
    "Cyetete",
    "Kaburemera",
    "Rugege",
    "Uwimpundu",
  ],

  // Kigoma Sector (Huye)
  "Huye|Kigoma|Gishihe": [
    "Birambo",
    "Gihanda",
    "Gishihe",
    "Kababaji",
    "Kabingo",
    "Kamyuga",
    "Karambi",
    "Kavumu",
  ],
  "Huye|Kigoma|Kabatwa": [
    "Bande",
    "Buremera",
    "Kamihuro",
    "Karuhimbana",
    "Kinyata",
    "Mahwa",
    "Mbogo",
    "Sekera",
  ],
  "Huye|Kigoma|Karambi": [
    "Gasura",
    "Gituntu",
    "Gitwa",
    "Kagarama",
    "Kigarama",
    "Nyarunyinya",
    "Rebo",
  ],
  "Huye|Kigoma|Musebeya": [
    "Gatovu",
    "Kabacuzi",
    "Kabakobwa",
    "Nyagasozi",
    "Nyarurembo",
    "Rusenyi",
  ],
  "Huye|Kigoma|Shanga": [
    "Gasharu",
    "Akaderege",
    "Gaseke",
    "Kabicuki",
    "Ntuntu",
    "Nyamirama",
    "Serugenzi",
  ],

  // Kinazi Sector
  "Huye|Kinazi|Byinza": ["Buremera", "Gakoni", "Nyarurama", "Rwerinka"],
  "Huye|Kinazi|Gahana": ["Cyegera", "Gasaka", "Gihana", "Rugarama", "Sogwe"],
  "Huye|Kinazi|Kabona": [
    "Kibiraro",
    "Mujyejuru",
    "Munyu",
    "Remera",
    "Rwambariro",
  ],
  "Huye|Kinazi|Sazange": [
    "Butare",
    "Gahondo",
    "Giseke",
    "Kigarama",
    "Mukuzanyana",
    "Nyabisindu",
  ],

  // Maraba Sector
  "Huye|Maraba|Buremera": ["Buremera", "Gasarabuye", "Kinazi", "Nkorwe"],
  "Huye|Maraba|Gasumba": ["Gitabure", "Gitwa", "Kinombe"],
  "Huye|Maraba|Kanyinya": ["Bwegera", "Gikomero", "Kabirombe", "Kayeye"],
  "Huye|Maraba|Shyembe": [
    "Gisagara",
    "Kagoma",
    "Karambi",
    "Karambo",
    "Kigarama",
    "Kizi",
  ],

  // Mbazi Sector
  "Huye|Mbazi|Gatobotobo": [
    "Agasharu",
    "Akanyinya",
    "Bigangara",
    "Kanyaruhinda",
    "Mpinga",
    "Rubona",
    "Rwabuye",
  ],
  "Huye|Mbazi|Mutunda": [
    "Kagera",
    "Kigusa",
    "Kimuna",
    "Kinyana",
    "Rugarama",
    "Ruryango",
  ],
  "Huye|Mbazi|Mwulire": ["Bumbogo", "Cyayove", "Gitwa", "Kaburuba", "Murambi"],
  "Huye|Mbazi|Rugango": [
    "Gahanga",
    "Kabakono",
    "Kamunyinya",
    "Kanzeyi",
    "Kibiraro",
    "Kigarama",
    "Mpinga",
    "Ngeri",
    "Nyabisindu",
    "Nyamirundi",
  ],
  "Huye|Mbazi|Tare": [
    "Cyahafi",
    "Gashikiri",
    "Kagarama",
    "Kavumu",
    "Kigwene",
    "Rupango",
  ],

  // Mukura Sector
  "Huye|Mukura|Bukomeye": [
    "Bweramana",
    "Cyiri",
    "Gahanga",
    "Gasunzwe",
    "Kigarama",
    "Kizenga",
    "Nyagakingi",
    "Sata",
    "Shingangabo",
  ],
  "Huye|Mukura|Buvumu": [
    "Akagarama",
    "Akayenzi",
    "Akogo",
    "Amasanganzira",
    "Kabeza",
    "Akabutora",
    "Mpinga",
    "Nyagasambu",
    "Remera",
    "Rujumbura",
    "Rusenyi",
  ],
  "Huye|Mukura|Icyeru": [
    "Akabuga",
    "Akamahinda",
    "Gakombe",
    "Nyagisenyi",
    "Nyarusambu",
  ],
  "Huye|Mukura|Rango A": [
    "Agakera",
    "Agakombe",
    "Gaseke",
    "Kabahora",
    "Mpaza",
    "Nyamata",
    "Rwinuma",
  ],

  // Ngoma Sector (Huye)
  "Huye|Ngoma|Kaburemera": [
    "Gatoki",
    "Kaguhu",
    "Karambi",
    "Nyabubare",
    "Nyagapfizi",
    "Rugarama",
    "Runga",
  ],
  "Huye|Ngoma|Matyazo": [
    "Gafurwe",
    "Kabeza",
    "Kamucuzi",
    "Nyabitare",
    "Rurenda",
    "Rusisiro",
    "Ruvuzo",
  ],

  // Ruhashya Sector
  "Huye|Ruhashya|Busheshi": [
    "Kamuhoza",
    "Kibyagira",
    "Nyabijyo",
    "Nyagatovu",
    "Umuyange",
  ],
  "Huye|Ruhashya|Mara": [
    "Bwankusi",
    "Gashikiri",
    "Gitwa",
    "Karambo",
    "Rwamara",
  ],
  "Huye|Ruhashya|Muhororo": [
    "Agasharu",
    "Kinziramuhindo",
    "Nyakabingo",
    "Shyara",
  ],
  "Huye|Ruhashya|Rugogwe": ["Agasharu", "Akanyana", "Umurambi"],
  "Huye|Ruhashya|Ruhashya": [
    "Igerero",
    "Kigarama",
    "Mbagabaga",
    "Muginga",
    "Rugarama",
    "Rwamabare",
  ],

  // Rusatira Sector
  "Huye|Rusatira|Buhimba": [
    "Gasaka",
    "Agasharu",
    "Impinga",
    "Kanyirankuba",
    "Karubona",
    "Kinkanga",
    "Mucunda",
    "Rugarama",
  ],
  "Huye|Rusatira|Gafumba": [
    "Kabuga",
    "Kigarama",
    "Kigari",
    "Mubuga",
    "Ruvugizo",
  ],
  "Huye|Rusatira|Kimirehe": [
    "Gakomeye",
    "Kagasa",
    "Kavumu",
    "Kigarama",
    "Ndyome",
    "Nyakabuye",
    "Nyarutovu",
    "Rubanga",
  ],
  "Huye|Rusatira|Kimuna": [
    "Kamabuye",
    "Kimigo",
    "Murambi",
    "Nyabusunzu",
    "Rushikiri",
    "Rwamuganda",
  ],
  "Huye|Rusatira|Kiruhura": [
    "Agasharu",
    "Impinga",
    "Nyagasozi",
    "Nyamuko",
    "Nyarucyamu",
    "Nyarugenge",
    "Rubona",
    "Rugarama",
    "Tumba",
    "Umuremera",
  ],
  "Huye|Rusatira|Mugogwe": [
    "Gicubuka",
    "Kabeza",
    "Kibiraro",
    "Mubuga",
    "Murambi",
  ],

  // Rwaniro Sector
  "Huye|Rwaniro|Gatwaro": ["Amarongi", "Gatwaro", "Nyakabuye", "Rumana"],
  "Huye|Rwaniro|Kamwambi": [
    "Gakomeye",
    "Kamwambi",
    "Karambo",
    "Remera",
    "Rurembo",
  ],
  "Huye|Rwaniro|Kibiraro": ["Murehe", "Nyabisindu", "Nyamivumu", "Nyarunyinya"],
  "Huye|Rwaniro|Nyaruhombo": [
    "Gasharu",
    "Kibara",
    "Kigarama",
    "Murambi",
    "Mwezi",
    "Nyabujengwe",
    "Rugarama",
  ],
  "Huye|Rwaniro|Shyunga": [
    "Karama",
    "Karugumya",
    "Kiboga",
    "Kigarama",
    "Rugarama",
  ],

  // Simbi Sector
  "Huye|Simbi|Cyendajuru": [
    "Bisambu",
    "Cyendajuru",
    "Kigarama",
    "Matyazo",
    "Rugarama",
    "Ruhinga",
    "Rwatsi",
  ],
  "Huye|Simbi|Gisakura": [
    "Bambiro",
    "Gasharu",
    "Kigarama",
    "Kirarambogo",
    "Nyabisindu",
  ],
  "Huye|Simbi|Kabusanza": [
    "Bwiza",
    "Gihinga",
    "Kigarama",
    "Maliza",
    "Muranda",
    "Ndago",
    "Ntobwe",
    "Rusuma",
    "Umurera",
  ],
  "Huye|Simbi|Mugobore": [
    "Kigarama",
    "Mugobore",
    "Nyagasozi",
    "Nyamirama",
    "Nyamiyaga",
    "Nyarurembo",
    "Rugarama",
    "Ryasebiganza",
  ],
  "Huye|Simbi|Nyangazi": [
    "Igode",
    "Kabakobwa",
    "Kanyiramana",
    "Karebero",
    "Kinyambo",
    "Ngororero",
    "Nyarukurazo",
    "Remera",
    "Shunga",
    "Umuyange",
  ],

  // Tumba Sector
  "Huye|Tumba|Cyarwa": [
    "Agahora",
    "Agasengasenge",
    "Agasharu",
    "Agateme",
    "Icyiri",
    "Kabeza",
    "Kigarama",
  ],
  "Huye|Tumba|Cyimana": [
    "Abizerwa",
    "Akamuhoza",
    "Amahoro",
    "Ubumwe",
    "Ubwiyunge",
  ],
  "Huye|Tumba|Gitwa": ["Gasenyi", "Berwa", "Nyarurembo", "Rebero", "Rimba"],
  "Huye|Tumba|Mpare": [
    "Agasharu",
    "Akabuga",
    "Akarugiranka",
    "Kigarama",
    "Musange",
    "Runyinya",
    "Rwanyanza",
  ],
  "Huye|Tumba|Rango B": [
    "Akabeza",
    "Akakanyamanza",
    "Byimana",
    "Impuhwe",
    "Kigarama",
    "Ntangarugero",
    "Urugwiro",
  ],
  // ============================================================
  // SOUTH PROVINCE - Nyaruguru District
  // ============================================================

  // Busanze Sector
  "Nyaruguru|Busanze|Kirarangombe": [
    "Bukinanyana",
    "Gisenyi",
    "Gitwe",
    "Kinyinya",
    "Masiga",
    "Uwindava",
  ],
  "Nyaruguru|Busanze|Nkanda": [
    "Bitare",
    "Mutarama",
    "Mutobo",
    "Nkanda",
    "Uwamakumba",
  ],
  "Nyaruguru|Busanze|Nteko": [
    "Gisoro",
    "Kabavomo",
    "Ndatemwa",
    "Nteko",
    "Nyarukeri",
    "Nyarusange",
  ],
  "Nyaruguru|Busanze|Runyombyi": [
    "Bugina",
    "Gabiro",
    "Musebeya",
    "Rango",
    "Ryabusagara",
    "Shwima",
  ],
  "Nyaruguru|Busanze|Shororo": [
    "Bukinga",
    "Mirindi",
    "Murambi",
    "Runyami",
    "Rutabo",
    "Uwinteko",
  ],

  // Cyahinda Sector
  "Nyaruguru|Cyahinda|Coko": ["Agasharu", "Coko", "Gitara", "Ruko"],
  "Nyaruguru|Cyahinda|Cyahinda": [
    "Cyahinda",
    "Cyanwa",
    "Kinyaga",
    "Saburunduru",
    "Rutega",
  ],
  "Nyaruguru|Cyahinda|Gasasa": ["Gasasa", "Kavumu", "Mugari", "Ryamarembo"],
  "Nyaruguru|Cyahinda|Muhambara": [
    "Busanza",
    "Byanone",
    "Gasharu",
    "Kubitiro",
    "Nyagatovu",
    "Rebero",
  ],
  "Nyaruguru|Cyahinda|Rutobwe": [
    "Kanyinya",
    "Kibumba",
    "Ngobyi",
    "Rubona",
    "Rugarama",
    "Rutobwe",
  ],

  // Kibeho Sector
  "Nyaruguru|Kibeho|Kibeho": ["Agateko", "Akajonge", "Sinayi"],
  "Nyaruguru|Kibeho|Mbasa": ["Kinazi", "Migina", "Rwimbogo"],
  "Nyaruguru|Kibeho|Mpanda": ["Banga", "Kibayi", "Mpanda", "Munege"],
  "Nyaruguru|Kibeho|Nyange": ["Agateko", "Kigona", "Mpatswe", "Nkomero"],

  // Kivu Sector
  "Nyaruguru|Kivu|Cyanyirankora": [
    "Businde",
    "Cyanyirankora",
    "Gakuta",
    "Ruganza",
  ],
  "Nyaruguru|Kivu|Gahurizo": ["Gasezo", "Kintama", "Kintare", "Uwamizirikano"],
  "Nyaruguru|Kivu|Kimina": ["Kabeza", "Kabingo", "Kimina", "Uwisaga"],
  "Nyaruguru|Kivu|Kivu": [
    "Kavumu",
    "Kivu",
    "Murambi",
    "Rubumburi",
    "Rusuzumiro",
  ],
  "Nyaruguru|Kivu|Rugerero": ["Kivumu", "Misundwe", "Nyarwotsi", "Rugerero"],

  // Mata Sector
  "Nyaruguru|Mata|Gorwe": ["Mataba", "Rimbanya", "Ruhunga"],
  "Nyaruguru|Mata|Murambi": ["Mata", "Murambi", "Nyamyumba", "Runono"],
  "Nyaruguru|Mata|Nyamabuye": ["Bushara", "Gahurura", "Nyamabuye", "Rutabo"],
  "Nyaruguru|Mata|Ramba": ["Gihango", "Kabuga", "Ramba", "Rugano"],
  "Nyaruguru|Mata|Rwamiko": ["Karambo", "Mubuga", "Nyakabungo", "Rwamiko"],

  // Muganza Sector (Nyaruguru)
  "Nyaruguru|Muganza|Rukore": [
    "Kanazi",
    "Karanka",
    "Nyagisenyi",
    "Remera",
    "Rwishywa",
    "Uwinzira",
  ],
  "Nyaruguru|Muganza|Samiyonga": [
    "Bigugu",
    "Cyurukore",
    "Gituntu",
    "Kigwene",
    "Mazimeru",
    "Murambi",
    "Tangabo",
  ],
  "Nyaruguru|Muganza|Uwacyiza": [
    "Bitaba",
    "Migendo",
    "Mukongoro",
    "Murambya",
    "Mutovu",
    "Sekera",
  ],

  // Munini Sector (Nyaruguru)
  "Nyaruguru|Munini|Giheta": [
    "Gacumu",
    "Gahango",
    "Gasare",
    "Giheta",
    "Mashya",
  ],
  "Nyaruguru|Munini|Ngarurira": [
    "Agatare",
    "Akarehe",
    "Gisizi",
    "Gitega",
    "Uwumuko",
  ],
  "Nyaruguru|Munini|Ngeri": [
    "Akagera",
    "Mushwati",
    "Ndago",
    "Rubona",
    "Ruseke",
    "Rushubi",
  ],
  "Nyaruguru|Munini|Ntwali": [
    "Kabirizi",
    "Ntwari",
    "Nyembaragasa",
    "Rwinanka",
    "Umurambi",
  ],
  "Nyaruguru|Munini|Nyarure": [
    "Kamana",
    "Kimena",
    "Muhororo",
    "Munanira",
    "Nyarure",
    "Sheke",
  ],

  // Ngera Sector
  "Nyaruguru|Ngera|Bitare": ["Bitare", "Gashiru", "Sheke"],
  "Nyaruguru|Ngera|Mukuge": ["Cyamutumba", "Cyaratsi", "Mukuge"],
  "Nyaruguru|Ngera|Nyamirama": ["Kinteko", "Mubuga", "Nyamirama"],
  "Nyaruguru|Ngera|Yaramba": ["Buhunga", "Kirwa", "Musumba", "Yaramba"],

  // Ngoma Sector (Nyaruguru)
  "Nyaruguru|Ngoma|Fugi": [
    "Akanyaru",
    "Gasha",
    "Mutakwa",
    "Nteko",
    "Ruli",
    "Urugeyo",
  ],
  "Nyaruguru|Ngoma|Kibangu": ["Gituramigina", "Kirehe", "Kiriro", "Nyarukeri"],
  "Nyaruguru|Ngoma|Kiyonza": [
    "Akagano",
    "Gacumbi",
    "Maraba",
    "Munini",
    "Mwumba",
    "Nyagahinga",
  ],

  // Nyabimata Sector
  "Nyaruguru|Nyabimata|Gihemvu": ["Bihembe", "Bugina", "Gihemvu", "Rugarama"],
  "Nyaruguru|Nyabimata|Kabere": ["Kabere", "Nyarunazi", "Uwurusugi"],
  "Nyaruguru|Nyabimata|Mishungero": [
    "Mishungero",
    "Muyira",
    "Ngarama",
    "Rubindi",
    "Uwaruhigi",
  ],
  "Nyaruguru|Nyabimata|Nyabimata": [
    "Murambi",
    "Mutobwe",
    "Nyabimata",
    "Rwerere",
  ],
  "Nyaruguru|Nyabimata|Ruhinga": ["Agasugi", "Cyumuzi", "Ndaro", "Ruhinga"],

  // Nyagisozi Sector (Nyaruguru)
  "Nyaruguru|Nyagisozi|Maraba": ["Bugarama", "Maraba", "Nkima", "Rushunguriro"],
  "Nyaruguru|Nyagisozi|Mwoya": [
    "Agatovu",
    "Bwerankori",
    "Muhombo",
    "Mwoya",
    "Nkomero",
    "Nyagashubi",
  ],
  "Nyaruguru|Nyagisozi|Nkakwa": [
    "Bihembe",
    "Kaduha",
    "Nkakwa",
    "Nyarubuye",
    "Rarire",
    "Rubuga",
  ],
  "Nyaruguru|Nyagisozi|Nyagisozi": [
    "Muriza",
    "Nyagishayo",
    "Nyamiyaga",
    "Ryabidandi",
    "Uwimfizi",
  ],

  // Ruheru Sector
  "Nyaruguru|Ruheru|Gitita": [
    "Gahotora",
    "Kibyibushye",
    "Nyacyonga",
    "Ruganza",
    "Rusagara",
    "Ryanyaruja",
  ],
  "Nyaruguru|Ruheru|Ruyenzi": [
    "Rukarakara",
    "Ruvuru",
    "Ruyenzi",
    "Tambananga",
    "Zirambi",
  ],
  "Nyaruguru|Ruheru|Uwumusebeya": [
    "Gakaranka",
    "Mubuga",
    "Rugote",
    "Uwimbogo",
    "Yanza",
  ],

  // Ruramba Sector
  "Nyaruguru|Ruramba|Giseke": [
    "Giseke",
    "Kabari",
    "Kidogo",
    "Matyazo",
    "Tugogo",
  ],
  "Nyaruguru|Ruramba|Nyarugano": [
    "Gisorora",
    "Kinyonyo",
    "Nyarugano",
    "Uruyange",
  ],
  "Nyaruguru|Ruramba|Ruramba": ["Bugizi", "Busasamana", "Karambi", "Ruramba"],

  // Rusenge Sector
  "Nyaruguru|Rusenge|Bunge": ["Bunge", "Jali", "Nyanzoga", "Toraniro"],
  "Nyaruguru|Rusenge|Cyuna": ["Cyuna", "Kiramutse", "Remera", "Uwamuhizi"],
  "Nyaruguru|Rusenge|Gikunzi": ["Jali", "Kibu", "Munanira", "Rwabujagi"],
  "Nyaruguru|Rusenge|Mariba": ["Gihango", "Kabuye", "Miko", "Rasaniro"],
  "Nyaruguru|Rusenge|Raranzige": [
    "Akabacura",
    "Gasave",
    "Karimba",
    "Ntanda",
    "Nyamugari",
  ],
  "Nyaruguru|Rusenge|Rusenge": ["Kabacuzi", "Kamusindi", "Kavumu", "Runyinya"],

  // ============================================================
  // SOUTH PROVINCE - Nyamagabe District
  // ============================================================

  // Buruhukiro Sector
  "Nyamagabe|Buruhukiro|Bushigishigi": [
    "Bushigishigi",
    "Giharayumbu",
    "Mugote",
    "Rusekera",
  ],
  "Nyamagabe|Buruhukiro|Byimana": [
    "Bishyiga",
    "Buhoro",
    "Gakangaga",
    "Gihumo",
    "Rukeri",
  ],
  "Nyamagabe|Buruhukiro|Gifurwe": [
    "Bitaba",
    "Gifurwe",
    "Nganzo",
    "Nyamaberi",
    "Ruronzi",
    "Uwankiriye",
  ],
  "Nyamagabe|Buruhukiro|Kizimyamuriro": [
    "Gikungu",
    "Gishwati",
    "Kagano",
    "Kinaba",
    "Minaga",
    "Mujerenge",
    "Tantamara",
    "Uwinzira",
  ],
  "Nyamagabe|Buruhukiro|Rambya": [
    "Buruhukiro",
    "Kibuburo",
    "Mpanga",
    "Nkamba",
    "Ruseke",
  ],

  // Cyanika Sector (Nyamagabe)
  "Nyamagabe|Cyanika|Kiyumba": [
    "Gatare",
    "Gatentwe",
    "Gikomero",
    "Gishike",
    "Kagarama",
    "Kaviri",
    "Nyarucyamu",
  ],
  "Nyamagabe|Cyanika|Nyanzoga": [
    "Bigazi",
    "Gafuhisha",
    "Kagarama",
    "Karuvenya",
    "Mbeho",
    "Mugari",
    "Nyamirama",
    "Rusenyi",
  ],

  // Gasaka Sector
  "Nyamagabe|Gasaka|Kigeme": ["Gakoma", "Gitaba", "Munombe", "Nyentanga"],
  "Nyamagabe|Gasaka|Nyabivumu": ["Dusego", "Gasharu", "Nyabivumu", "Raro"],
  "Nyamagabe|Gasaka|Nzega": ["Gasaka", "Gitantu", "Kadoma", "Nzega"],

  // Gatare Sector (Nyamagabe)
  "Nyamagabe|Gatare|Bakopfu": ["Karambo", "Karumbi", "Muhingo", "Twiya"],
  "Nyamagabe|Gatare|Mukongoro": [
    "Gikungu",
    "Kagano",
    "Kageyo",
    "Nyakabuye",
    "Rukereko",
  ],
  "Nyamagabe|Gatare|Ruganda": [
    "Gasharu",
    "Gituntu",
    "Kamamara",
    "Masangano",
    "Runaba",
    "Rwangambibi",
  ],
  "Nyamagabe|Gatare|Shyeru": [
    "Baziro",
    "Bimba",
    "Kagusa",
    "Ruhanga",
    "Rushyarara",
  ],

  // Kaduha Sector
  "Nyamagabe|Kaduha|Musenyi": [
    "Burengo",
    "Gasovu",
    "Gatoki",
    "Kirwa",
    "Munini",
    "Nganzo",
    "Nyakirambi",
    "Ruganda",
  ],

  // Kamegeri Sector
  "Nyamagabe|Kamegeri|Bwama": ["Gitwa", "Kamiro", "Kigarama"],
  "Nyamagabe|Kamegeri|Kamegeri": ["Kinyovu", "Ntaruka", "Rweru", "Sovu"],
  "Nyamagabe|Kamegeri|Kirehe": ["Gasharu", "Kigarama", "Ryanyirataba"],
  "Nyamagabe|Kamegeri|Kizi": ["Gakomeye", "Kagarama", "Kinyana"],
  "Nyamagabe|Kamegeri|Nyarusiza": [
    "Bande",
    "Nyarusange",
    "Nyarusiza",
    "Rutuna",
  ],
  "Nyamagabe|Kamegeri|Rususa": ["Bahina", "Baro", "Kigarama", "Muhembe"],

  // Kibirizi Sector (Nyamagabe)
  "Nyamagabe|Kibirizi|Bugarama": [
    "Kabarera",
    "Kamina",
    "Karandura",
    "Kivumu",
    "Munazi",
    "Nyabusozi",
  ],
  "Nyamagabe|Kibirizi|Bugarura": [
    "Kasebuturanyi",
    "Kirwa",
    "Muyange",
    "Nyakibyeyi",
    "Uwinyana",
  ],
  "Nyamagabe|Kibirizi|Gashiha": [
    "Gasharu",
    "Muduha",
    "Muganza",
    "Nyabubare",
    "Rukamiro",
  ],
  "Nyamagabe|Kibirizi|Ruhunga": [
    "Cyamashya",
    "Gakoma",
    "Kabuga",
    "Munombe",
    "Nyagishubi",
    "Ruhurura",
  ],
  "Nyamagabe|Kibirizi|Uwindekezi": [
    "Birembo",
    "Gatovu",
    "Karumbi",
    "Kigarama",
    "Mugote",
    "Uwamataba",
  ],

  // Kibumbwe Sector
  "Nyamagabe|Kibumbwe|Bwenda": [
    "Munyinya",
    "Murambi",
    "Murwa",
    "Nyagatovu",
    "Nyamirama",
  ],
  "Nyamagabe|Kibumbwe|Gakanka": [
    "Cyeru",
    "Gikomero",
    "Munini",
    "Nkurubuye",
    "Nyarubuye",
    "Rambya",
  ],
  "Nyamagabe|Kibumbwe|Kibibi": [
    "Gatandaganya",
    "Kabere",
    "Kanyege",
    "Kirwa",
    "Rwezamenyo",
    "Ryingarura",
  ],
  "Nyamagabe|Kibumbwe|Nyakiza": [
    "Dusenyi",
    "Karambo",
    "Kinyana",
    "Murambi",
    "Nyakizu",
    "Zigati",
  ],

  // Kitabi Sector
  "Nyamagabe|Kitabi|Kagano": [
    "Bususuruke",
    "Kintobo",
    "Turonzi",
    "Uwabumenyi",
    "Uwarwubatsi",
    "Uwintyabire",
  ],
  "Nyamagabe|Kitabi|Mujuga": [
    "Gahande",
    "Gasasa",
    "Mujuga",
    "Mukaka",
    "Rwufe",
    "Uwanyakanyeri",
    "Uwinka",
  ],
  "Nyamagabe|Kitabi|Mukungu": [
    "Gahira",
    "Gatare",
    "Karambi",
    "Uwicurangiro",
    "Uwurunazi",
  ],
  "Nyamagabe|Kitabi|Shaba": [
    "Bitaba",
    "Gakoko",
    "Muganza",
    "Muyange",
    "Uwakagoro",
    "Uwinka",
  ],
  "Nyamagabe|Kitabi|Uwingugu": [
    "Gisarenda",
    "Kigari",
    "Rubuye",
    "Ruhanga",
    "Uwimisigati",
    "Uwurunazi",
  ],

  // Mbazi Sector (Nyamagabe)
  "Nyamagabe|Mbazi|Manwari": ["Karambi", "Kibumba", "Kigarama", "Muhororo"],
  "Nyamagabe|Mbazi|Mutiwingoma": [
    "Gatwa",
    "Kabere",
    "Kabuga",
    "Muduha",
    "Nyamirama",
  ],
  "Nyamagabe|Mbazi|Ngambi": [
    "Gaseke",
    "Kabeza",
    "Kivomo",
    "Maheresho",
    "Munanira",
  ],

  // Mugano Sector
  "Nyamagabe|Mugano|Gitondorero": [
    "Gakomeye",
    "Gitondorero",
    "Gituntu",
    "Karambi",
    "Maso",
  ],
  "Nyamagabe|Mugano|Suti": [
    "Cyabute",
    "Gasiza",
    "Matyazo",
    "Rwamiko",
    "Turyango",
  ],
  "Nyamagabe|Mugano|Yonde": [
    "Gisovu",
    "Kanyegenyege",
    "Nyarusazi",
    "Ruhamira I",
    "Ruhamira II",
  ],

  // Musange Sector
  "Nyamagabe|Musange|Gasave": [
    "Gasura",
    "Kabingo",
    "Murambi",
    "Nyabivumu",
    "Nyakabuye",
  ],
  "Nyamagabe|Musange|Jenda": [
    "Cyabagomba",
    "Kabakannyi",
    "Kavumu",
    "Kayogoro",
    "Nyakibungo",
    "Nyakirambi",
  ],
  "Nyamagabe|Musange|Masagara": [
    "Cyabasana",
    "Cyaruvunge",
    "Gituntu",
    "Muhororo",
    "Mutakara",
    "Mutuntu",
    "Nyagihima",
  ],
  "Nyamagabe|Musange|Masizi": [
    "Karama",
    "Munini",
    "Murehe",
    "Rwankango",
    "Rwina",
  ],

  // Musebeya Sector (Nyamagabe)
  "Nyamagabe|Musebeya|Nyarurambi": [
    "Cyabwimba",
    "Cyarwa",
    "Gatiti",
    "Giheta",
    "Kabere",
    "Mujyejuru",
    "Nyarurambi",
    "Rwabigeyo",
  ],
  "Nyamagabe|Musebeya|Rugano": [
    "Bugarama",
    "Busanza",
    "Gisiza",
    "Kibandirwa",
    "Rugano",
    "Rukungu",
  ],
  "Nyamagabe|Musebeya|Runege": [
    "Bigugu",
    "Bitaba",
    "Gacundura",
    "Gakereko",
    "Ndogondwe",
    "Ruganza",
    "Rukaranka",
  ],
  "Nyamagabe|Musebeya|Rusekera": [
    "Karambo",
    "Ngoma",
    "Rebero",
    "Shaki",
    "Uwimituza",
  ],
  "Nyamagabe|Musebeya|Sekera": [
    "Masinde",
    "Mugano",
    "Nkomero",
    "Nyaruhura",
    "Rubumburi",
    "Rugazi",
  ],

  // Mushubi Sector
  "Nyamagabe|Mushubi|Buteteri": [
    "Gorwe",
    "Kagorwe",
    "Kizanganya",
    "Mugunda",
    "Murambi",
    "Ngoma",
    "Nyakibande",
    "Remera",
    "Rusoyo",
    "Rwamiko",
  ],
  "Nyamagabe|Mushubi|Cyobe": [
    "Cyobe",
    "Gaseke",
    "Gitikirema",
    "Nyagisumo",
    "Nyakabingo",
    "Nyakirambi",
    "Nyarushike",
    "Rutoyi",
  ],
  "Nyamagabe|Mushubi|Gashwati": [
    "Bweramana",
    "Gashwati",
    "Muhembe",
    "Muko",
    "Mushubi",
    "Rucunda",
    "Ruhinga",
  ],

  // Nkomane Sector
  "Nyamagabe|Nkomane|Bitandara": [
    "Bitandara",
    "Buhanzi",
    "Munanira",
    "Muyange",
    "Rugeyo",
  ],
  "Nyamagabe|Nkomane|Musaraba": [
    "Gatorove",
    "Gihunga",
    "Kimbogo",
    "Musaraba",
    "Rusoyo",
    "Rutare",
    "Rwimpiri",
  ],
  "Nyamagabe|Nkomane|Mutengeri": [
    "Cyurwufe",
    "Gihwahwa",
    "Kavumu",
    "Kivumu",
    "Mutengeri",
    "Tubuye",
  ],
  "Nyamagabe|Nkomane|Nkomane": [
    "Banda",
    "Kagano",
    "Mugari",
    "Mutarama",
    "Ruhinga",
  ],
  "Nyamagabe|Nkomane|Nyarwungo": [
    "Bisharara",
    "Bucyero",
    "Marambo",
    "Nyaruhombo",
    "Nyarwungo",
    "Rangi",
    "Rutoyi",
  ],
  "Nyamagabe|Nkomane|Twiya": [
    "Gakomeye",
    "Gishenge",
    "Karukoma",
    "Kibuga",
    "Twiya",
  ],

  // Tare Sector (Nyamagabe)
  "Nyamagabe|Tare|Gasarenda": [
    "Kagarama",
    "Kiminazi",
    "Kivuruga",
    "Murangara",
    "Muse",
    "Mwufe",
    "Uwinkomo",
  ],
  "Nyamagabe|Tare|Kaganza": [
    "Akanyirandori",
    "Bivumu",
    "Buremera",
    "Cyimicanga",
    "Ruganza",
  ],
  "Nyamagabe|Tare|Nkumbure": [
    "Biraro",
    "Bireka",
    "Gahembe",
    "Kibwije",
    "Mubezi",
    "Muhumo",
    "Rugeti",
    "Rukereko",
    "Uwumugeti",
    "Vumwe",
  ],
  "Nyamagabe|Tare|Nyamigina": [
    "Gakoma",
    "Maryohe",
    "Ngororero",
    "Nkomero",
    "Nyarugeti",
    "Rukoko",
    "Uwinyana",
  ],

  // Uwinkingi Sector
  "Nyamagabe|Uwinkingi|Bigumira": [
    "Bigumira",
    "Cyumuganza",
    "Gakoko",
    "Magumira",
  ],
  "Nyamagabe|Uwinkingi|Gahira": [
    "Bunyunyu",
    "Gahira",
    "Gititi",
    "Kibugazi",
    "Kunyu",
    "Rugeyo",
    "Uwinkingi",
  ],
  "Nyamagabe|Uwinkingi|Kibyagira": [
    "Bishya",
    "Cyumuganza",
    "Kabuga",
    "Kabusekuru",
    "Kagano",
    "Sabake",
    "Sekera",
  ],
  "Nyamagabe|Uwinkingi|Mudasomwa": [
    "Gicaca",
    "Karambo",
    "Nsinduka",
    "Rushubi",
    "Uwanjyogoro",
  ],
  "Nyamagabe|Uwinkingi|Munyege": [
    "Bitaba",
    "Gahango",
    "Kanyampongo",
    "Kimina",
    "Munyege",
    "Nyarurambi",
  ],

  // ============================================================
  // SOUTH PROVINCE - Ruhango District
  // ============================================================

  // Bweramana Sector
  "Ruhango|Bweramana|Buhanda": [
    "Bugufi",
    "Gakongoro",
    "Gikarabiro",
    "Kabere",
    "Kamatungo",
    "Kavumu",
    "Mpunu",
    "Munini",
    "Nyakidahe",
    "Nyarubuye",
    "Rutarabana",
  ],
  "Ruhango|Bweramana|Gitisi": [
    "Kabugusu",
    "Nyamaraba",
    "Nyarugenge",
    "Nyarunyinya",
    "Ruvugizo",
  ],
  "Ruhango|Bweramana|Rwinyana": [
    "Karambi",
    "Kumunyinya",
    "Mubuga",
    "Mukingi",
    "Nyagakombe",
    "Nyagitongwe",
    "Nyarubuye",
    "Nyarutovu",
    "Rugarama",
    "Rugogwe",
    "Rwinyana",
    "Samba",
  ],

  // Byimana Sector (Ruhango)
  "Ruhango|Byimana|Kamusenyi": [
    "Gahama",
    "Gakomeye",
    "Gakurazo",
    "Gasharu",
    "Gasiza",
    "Gitanga",
    "Kabusheshe",
    "Kinama",
    "Mayebe",
    "Nyakabungo",
    "Nyarusange",
    "Rugerero",
  ],
  "Ruhango|Byimana|Kirengeri": [
    "Gahengeri",
    "Gatoki",
    "Kamonyi",
    "Kirengeri",
    "Masaka",
    "Nyabizenga",
    "Nyamirambo",
    "Rusororo",
  ],
  "Ruhango|Byimana|Mahembe": [
    "Akabere",
    "Kavumu",
    "Muhororo",
    "Mujyejuru",
    "Mutobo",
    "Nyabisindu",
    "Nyagisozi",
  ],
  "Ruhango|Byimana|Ntenyo": [
    "Bugarura",
    "Gihinga",
    "Kageyo",
    "Kamurenzi",
    "Kavumu",
    "Mucubi",
    "Ngando",
    "Ntenyo",
    "Nyabisindu",
    "Rukiriza",
  ],
  "Ruhango|Byimana|Nyakabuye": [
    "Gasasa",
    "Gatobotobo",
    "Kizibaziba",
    "Muhororo",
    "Ndago",
    "Nyarubumbiro",
    "Nyarutovu",
  ],

  // Kabagali Sector
  "Ruhango|Kabagali|Bihembe": [
    "Bihembe",
    "Bwama",
    "Kanyinya",
    "Kirwa",
    "Misambagiro",
    "Nyagatovu",
    "Rusisiro",
  ],
  "Ruhango|Kabagali|Munanira": [
    "Byimana",
    "Kagitare",
    "Kavumu",
    "Munanira",
    "Muremera",
    "Musekera",
    "Nyabyunyu",
    "Remera",
    "Ruyogoro",
  ],
  "Ruhango|Kabagali|Rwoga": [
    "Cyunyu",
    "Gasharu",
    "Gitwa",
    "Kabakamba",
    "Kanyinya",
    "Kavumu",
    "Kiyanja",
    "Nyabitare",
    "Nyagisenyi",
    "Nyarushishi",
    "Rusebeya",
  ],

  // Kinazi Sector (Ruhango)
  "Ruhango|Kinazi|Burima": [
    "Burima",
    "Mirambi",
    "Nyagahama",
    "Nyamiyaga",
    "Nyarugenge",
    "Nyaruteja",
  ],
  "Ruhango|Kinazi|Gisali": [
    "Gisari",
    "Kabeza",
    "Kaduha",
    "Kakirenzi",
    "Kamuraza",
    "Kanaba",
    "Kibanda",
    "Matara",
    "Nyabusunzu",
    "Nyiranduga",
    "Remera",
  ],
  "Ruhango|Kinazi|Kinazi": [
    "Gasiza",
    "Impara",
    "Kabuga",
    "Kacyiru",
    "Kamabuye",
    "Karama",
    "Kareshya",
    "Karuhuga",
    "Marche-commun",
    "Mpemba",
    "Nyabinyenga",
    "Nyabisindu",
    "Nyiraruhinga",
    "Rebero",
    "Ruhuha",
  ],
  "Ruhango|Kinazi|Rutabo": [
    "Bugiranteko",
    "Gatonde",
    "Gitwa",
    "Kanka",
    "Mukoma",
    "Nyarugunga",
    "Nyarunazi",
    "Nyirarubayi",
    "Runzenze",
    "Rutabo",
  ],

  // Kinihira Sector
  "Ruhango|Kinihira|Gitinda": [
    "Kabasanzu",
    "Muremure",
    "Nyagatovu",
    "Nyamagana",
    "Nyarugunga",
    "Nyarusange",
    "Remera",
    "Rubona",
    "Rugarama",
  ],
  "Ruhango|Kinihira|Kirwa": [
    "Gasharu",
    "Kabareshya",
    "Muyange",
    "Nyarubuye",
    "Rukeri",
    "Sunzu",
    "Wimana",
  ],
  "Ruhango|Kinihira|Muyunzwe": [
    "Gasiza",
    "Muyunzwe",
    "Nyamirambo",
    "Nyarubumbiro",
    "Nyarutovu",
    "Ruhuha",
  ],
  "Ruhango|Kinihira|Nyakogo": [
    "Buhanda",
    "Bweramana",
    "Gashirabwoba",
    "Kibirizi",
    "Rusizi",
    "Shamba",
  ],
  "Ruhango|Kinihira|Rukina": [
    "Dusenyi",
    "Kabacuzi",
    "Kabirizi",
    "Kabuga",
    "Munini",
    "Murinzi",
  ],

  // Mbuye Sector (Ruhango)
  "Ruhango|Mbuye|Cyanza": [
    "Kabungo",
    "Murambi",
    "Nyamikoni",
    "Rwamiko",
    "Wimana",
  ],
  "Ruhango|Mbuye|Gisanga": [
    "Bienvenue",
    "Gisanga",
    "Gishari",
    "Karama",
    "Kavumu",
    "Nyarugenge",
    "Sabudari",
    "Sahara",
  ],
  "Ruhango|Mbuye|Kizibere": [
    "Bereshi",
    "Biraro",
    "Bunyeshywa",
    "Kangoma",
    "Kivumu",
    "Kizibere",
    "Mayunzwe",
    "Nyamiyaga",
    "Rebero",
    "Ruhuha",
  ],
  "Ruhango|Mbuye|Nyakarekare": [
    "Bereshi",
    "Jari",
    "Kigabiro",
    "Nyakarekare",
    "Nyaruyonga",
    "Rubona",
    "Ruyenzi",
    "Vugiza",
  ],

  // Mwendo Sector (Ruhango)
  "Ruhango|Mwendo|Gafunzo": [
    "Kagarama",
    "Kajevuba",
    "Kimburu",
    "Nyamigina",
    "Nyamugari",
    "Ruhamagariro",
    "Rutagara",
  ],
  "Ruhango|Mwendo|Gishweru": [
    "Kanzu",
    "Mabanza",
    "Nyakabuye",
    "Nyakizu",
    "Rubona",
  ],
  "Ruhango|Mwendo|Kamujisho": [
    "Bugaramantare",
    "Gakomeye",
    "Gitwa",
    "Nyarusange",
  ],
  "Ruhango|Mwendo|Kubutare": ["Buhoro", "Dusego", "Gasyogogo", "Karambo"],
  "Ruhango|Mwendo|Mutara": [
    "Bunyankungu",
    "Gashiru",
    "Kabiha",
    "Kakarima",
    "Mbunduye",
    "Murambi",
    "Nyabisindu",
  ],
  "Ruhango|Mwendo|Nyabibugu": [
    "Kiganira",
    "Ntongwe",
    "Nyarutovu",
    "Nyaruvumu",
    "Rukeri",
    "Ryakabunga",
  ],
  "Ruhango|Mwendo|Saruheshyi": [
    "Buhigiro",
    "Gaseke",
    "Gasharu",
    "Rugasari",
    "Ruhondo",
  ],

  // Ntongwe Sector
  "Ruhango|Ntongwe|Kareba": ["Kavumu", "Kibatsi", "Marimba", "Ruko"],
  "Ruhango|Ntongwe|Kayenzi": [
    "Kanyete",
    "Kirwa",
    "Ntungamo",
    "Nyagatovu",
    "Nyamigende",
  ],
  "Ruhango|Ntongwe|Kebero": [
    "Cyeru",
    "Gasuna",
    "Kaburanjwiri",
    "Nyabigunzu",
    "Nyabitare",
    "Nyacyonga",
    "Ruko",
  ],

  // Ruhango Sector
  "Ruhango|Ruhango|Bunyogombe": [
    "Bugarura",
    "Busego",
    "Gacoko",
    "Gishegesha",
    "Kabega",
    "Kamugaru",
    "Kamugaza",
    "Karehe",
    "Kasemahundo",
    "Kavumu",
    "Kigabiro",
    "Kigarama",
    "Murehe",
    "Nyabibugu",
    "Nyabisindu",
    "Remera",
    "Rubazi",
    "Rusebeya",
    "Rwankuba",
  ],
  "Ruhango|Ruhango|Gikoma": [
    "Gatengeri",
    "Gikumba",
    "Karama",
    "Murambi",
    "Nangurugomo",
    "Nyarusange",
    "Rebero",
    "Rubiha",
    "Rurembo",
    "Ryabonyinka",
    "Wimana",
  ],
  "Ruhango|Ruhango|Musamo": [
    "Cana",
    "Gaseke",
    "Jokoma",
    "Kabere",
    "Kamabare",
    "Kinama",
    "Kinkene",
    "Musamo",
    "Mwali",
    "Rwinkuba",
    "Rwinyege",
    "Ryanyiranda",
    "Wimana",
  ],
  "Ruhango|Ruhango|Nyamagana": [
    "Bumbogo",
    "Butare I",
    "Butare II",
    "Bwangacumu",
    "Gataka",
    "Gatengezi",
    "Gutamba",
    "Kamabano",
    "Kigabiro",
    "Kigimbu",
    "Kinama",
    "Mabera",
    "Mujyejuru I",
    "Mujyejuru II",
    "Murinzi",
    "Ngurukizi",
    "Ntungamo",
    "Nyabihanga",
    "Nyagasozi",
    "Nyamagana",
    "Nyamugari",
    "Nyarusange I",
    "Nyarusange II",
    "Ruhango",
    "Ruhuha",
  ],
  "Ruhango|Ruhango|Tambwe": [
    "Buterana",
    "Mubuga",
    "Nyamugari I",
    "Nyamugari II",
    "Nyundo",
    "Ruduha I",
    "Ruduha II",
    "Rugarama",
    "Rugondo",
    "Tambwe",
  ],

  // ============================================================
  // SOUTH PROVINCE - Muhanga District
  // ============================================================

  // Cyeza Sector
  "Muhanga|Cyeza|Biringaga": [
    "Gatare",
    "Karama",
    "Kuwimana",
    "Munini",
    "Nyabisindu",
  ],
  "Muhanga|Cyeza|Kivumu": [
    "Buruba",
    "Busozi",
    "Bwirika",
    "Bwiza",
    "Kamonyi",
    "Musengo",
    "Takwe",
  ],
  "Muhanga|Cyeza|Makera": [
    "Binunga",
    "Kanyanza",
    "Kigaga",
    "Nyagatovu",
    "Rwamugoroba",
  ],
  "Muhanga|Cyeza|Nyarunyinya": [
    "Bishike",
    "Bucyeye",
    "Buhoro",
    "Gasovu",
    "Gatete",
    "Rusave",
  ],

  // Kabacuzi Sector
  "Muhanga|Kabacuzi|Buramba": [
    "Gahembe",
    "Gahinga",
    "Kabayaza",
    "Kirambo",
    "Musasa",
  ],
  "Muhanga|Kabacuzi|Kibyimba": ["Gasharu", "Kamiranzogera", "Kanka", "Kibaya"],
  "Muhanga|Kabacuzi|Ngarama": ["Kabuga", "Karambo", "Mpanga", "Nzovi"],
  "Muhanga|Kabacuzi|Sholi": [
    "Gakondokondo",
    "Gitwa",
    "Jandari",
    "Kinyoni",
    "Mucyamo",
  ],

  // Kibangu Sector
  "Muhanga|Kibangu|Gisharu": [
    "Buhoro",
    "Kirehe",
    "Murandi",
    "Musezero",
    "Remera",
    "Rwesero",
  ],
  "Muhanga|Kibangu|Jurwe": [
    "Bukiro",
    "Kimisange",
    "Murambi",
    "Nzarwa",
    "Rubona",
    "Ruminantege",
  ],
  "Muhanga|Kibangu|Rubyiniro": [
    "Butare",
    "Gakurwe",
    "Mucyamo",
    "Mugari",
    "Murehe",
  ],
  "Muhanga|Kibangu|Ryakanimba": [
    "Kinogi",
    "Musekera",
    "Mushubaguriko",
    "Mwumba",
    "Nyamugari",
  ],

  // Kiyumba Sector
  "Muhanga|Kiyumba|Budende": ["Karambi", "Muduha", "Musenyi", "Ruramba"],
  "Muhanga|Kiyumba|Ndago": ["Mataba", "Rwezamenyo", "Sovu"],
  "Muhanga|Kiyumba|Ruhina": [
    "Busumba",
    "Gatwa",
    "Kabimbura",
    "Mubuga",
    "Nundwe",
  ],
  "Muhanga|Kiyumba|Rukeri": [
    "Busindi",
    "Kabuga",
    "Matovu",
    "Munini",
    "Musagara",
    "Nyamirambo",
  ],

  // Muhanga Sector
  "Muhanga|Muhanga|Nganzo": [
    "Gasenyi",
    "Gitongati",
    "Kabingo",
    "Kagombero",
    "Kamazu",
    "Karama",
    "Kumukenke",
    "Masumo",
  ],
  "Muhanga|Muhanga|Tyazo": ["Gasaka", "Gitima", "Kivomo", "Nyahinda", "Ruhuha"],

  // Mushishiro Sector
  "Muhanga|Mushishiro|Rukaragata": [
    "Bitsibo",
    "Hanika",
    "Kamurekezi",
    "Kivumu",
    "Rugerero",
  ],
  "Muhanga|Mushishiro|Rwasare": ["Bahimba", "Kanyinya", "Karucura", "Rubona"],
  "Muhanga|Mushishiro|Rwigerero": [
    "Nyamasheke",
    "Nyanza",
    "Rwuki",
    "Ryaruyange",
  ],

  // Nyabinoni Sector
  "Muhanga|Nyabinoni|Gashorera": [
    "Munyinya",
    "Muzamuzi",
    "Ndaragati",
    "Ryakiyange",
  ],
  "Muhanga|Nyabinoni|Mbuga": [
    "Gitaba",
    "Karengeri",
    "Munini",
    "Murama",
    "Nyarusange",
  ],
  "Muhanga|Nyabinoni|Muvumba": ["Nyamugari", "Nyamure", "Nyanza"],
  "Muhanga|Nyabinoni|Nyarusozi": [
    "Gitwa",
    "Kamahoro",
    "Kanombe",
    "Kanyamizo",
    "Mugeni",
    "Rusenge",
  ],

  // Nyamabuye Sector
  "Muhanga|Nyamabuye|Gahogo": [
    "Gihuma",
    "Kamazuru",
    "Kamugina",
    "Kavumu",
    "Nyarucyamu I",
    "Nyarucyamu II",
    "Nyarucyamu III",
    "Rutenga",
    "Ruvumera",
  ],
  "Muhanga|Nyamabuye|Gifumba": [
    "Gifumba",
    "Gisiza",
    "Kirebe",
    "Rugarama",
    "Rutarabana",
    "Samuduha",
  ],
  "Muhanga|Nyamabuye|Gitarama": [
    "Gatika",
    "Kagitarama",
    "Kavumu",
    "Nyabisindu",
    "Nyarusiza",
    "Nyarutovu",
  ],

  // Nyarusange Sector
  "Muhanga|Nyarusange|Mbiriri": [
    "Gasave",
    "Gasharu",
    "Gisasa",
    "Karehe",
    "Kintobo",
    "Ntenderi",
    "Nyarushora",
  ],
  "Muhanga|Nyarusange|Musongati": [
    "Cyiciro",
    "Jabiro",
    "Kagarama",
    "Kamanga",
    "Murambi",
    "Ngororano",
  ],
  "Muhanga|Nyarusange|Ngaru": ["Gitega", "Kibirizi", "Remera", "Rukamiro"],
  "Muhanga|Nyarusange|Rusovu": ["Mututu", "Rukurazo", "Rwambariro", "Vugo"],

  // Rongi Sector
  "Muhanga|Rongi|Nyamirambo": [
    "Gisoro",
    "Kabakungu",
    "Karambi",
    "Masizi",
    "Mugwato",
    "Ntarabana",
    "Rugogwe",
    "Rwamure",
  ],

  // Rugendabari Sector
  "Muhanga|Rugendabari|Kanyana": ["Gasovu", "Kabuba", "Muheta", "Ntonde"],
  "Muhanga|Rugendabari|Kibaga": ["Kiduha", "Mataba", "Njamena"],
  "Muhanga|Rugendabari|Mpinga": ["Buganda", "Gisiza"],
  "Muhanga|Rugendabari|Nsanga": [
    "Mpongo",
    "Ngando",
    "Nyundo",
    "Rugwiza",
    "Twabumbogo",
  ],

  // Shyogwe Sector
  "Muhanga|Shyogwe|Kinini": [
    "Gatare",
    "Kabungo",
    "Kinyami",
    "Musezero",
    "Nyakabingo",
    "Nyakaguhu",
  ],
  "Muhanga|Shyogwe|Mbare": [
    "Buriza",
    "Muremberi",
    "Nyabisindu",
    "Rubugurizo",
    "Rubuye",
    "Songa",
    "Vunga",
  ],
  "Muhanga|Shyogwe|Ruli": [
    "Gakombe",
    "Kabeza",
    "Karama",
    "Kavumu",
    "Munyinya",
    "Murambi",
    "Nyagacyamu",
    "Ruhina",
  ],

  // ============================================================
  // SOUTH PROVINCE - Kamonyi District
  // ============================================================

  // Gacurabwenge Sector
  "Kamonyi|Gacurabwenge|Gihinga": [
    "Kagarama",
    "Kambyeyi",
    "Karama",
    "Nyagasozi",
    "Nyarunyinya",
    "Ryabitana",
  ],
  "Kamonyi|Gacurabwenge|Gihira": [
    "Bugaba",
    "Kibanza",
    "Kidaturwa",
    "Migina",
    "Nyabitare",
  ],
  "Kamonyi|Gacurabwenge|Kigembe": [
    "Buhoro",
    "Kabatsi",
    "Kagarama",
    "Mushimba",
    "Nyakabungo",
    "Rugobagoba",
  ],
  "Kamonyi|Gacurabwenge|Nkingo": [
    "Juru",
    "Kamonyi",
    "Mataba",
    "Nyamiryango",
    "Nyamugari",
    "Rubona",
  ],

  // Karama Sector (Kamonyi)
  "Kamonyi|Karama|Bunyonga": [
    "Bunyonga",
    "Nyarurembo",
    "Nyenyeri",
    "Ryagashaza",
  ],
  "Kamonyi|Karama|Nyamirembe": [
    "Gaji",
    "Gasharu",
    "Kavumu",
    "Kigabiro",
    "Nyakizu",
  ],

  // Kayenzi Sector
  "Kamonyi|Kayenzi|Cubi": [
    "Gitwa",
    "Kamabuye",
    "Ntwari",
    "Nyakigezi",
    "Rwishywa",
  ],
  "Kamonyi|Kayenzi|Kayonza": ["Kigwene", "Muza", "Nyabubare"],

  // Kayumbu Sector
  "Kamonyi|Kayumbu|Busoro": ["Buramba", "Manyana", "Nyabuhoro", "Nyarugenge"],
  "Kamonyi|Kayumbu|Gaseke": ["Gasiza", "Kigarama", "Nyarunyinya"],
  "Kamonyi|Kayumbu|Giko": ["Gasharu", "Mirehe", "Nyarusange", "Ryamanywa"],

  // Mugina Sector
  "Kamonyi|Mugina|Kabugondo": ["Bihenga", "Cyeru", "Mataba Sud", "Runzenzi"],
  "Kamonyi|Mugina|Mbati": [
    "Kansoro",
    "Kigorora",
    "Mbati",
    "Mikamba",
    "Murambi",
  ],
  "Kamonyi|Mugina|Mugina": ["Kagasa", "Kireka", "Mparo", "Mugina"],

  // Musambira Sector
  "Kamonyi|Musambira|Cyambwe": [
    "Bimomwe",
    "Gacaca",
    "Giheta",
    "Rugarama",
    "Ruvumura",
    "Shaka",
  ],
  "Kamonyi|Musambira|Karengera": [
    "Kamayanja",
    "Mbari",
    "Nyarusange",
    "Nyarutovu",
    "Rubanga",
  ],
  "Kamonyi|Musambira|Mpushi": [
    "Gitwiko",
    "Kabere",
    "Kamashashi",
    "Kingoma",
    "Nyarubuye",
    "Nyarurama",
  ],
  "Kamonyi|Musambira|Rukambura": ["Bitsibo", "Ngoma", "Nkomane", "Nyamirembe"],

  // Ngamba Sector
  "Kamonyi|Ngamba|Kazirabonde": [
    "Bigobe",
    "Gatare",
    "Gatwa",
    "Kabande",
    "Kajevuba",
    "Munoga",
  ],
  "Kamonyi|Ngamba|Marembo": [
    "Gahinga",
    "Kabagogo",
    "Kigina",
    "Nyabitare",
    "Rugarama",
  ],

  // Nyamiyaga Sector
  "Kamonyi|Nyamiyaga|Bibungo": [
    "Byenene",
    "Karubanda",
    "Murambi",
    "Nkimbiri",
    "Nyamabere",
    "Nyamurasa",
    "Nyamweru",
    "Rwabinagu",
  ],
  "Kamonyi|Nyamiyaga|Kabashumba": [
    "Bumbogo",
    "Buye",
    "Gacumu",
    "Kigabiro",
    "Mukuyo",
    "Murehe",
    "Nkoto",
    "Ruvugizo",
    "Ruyumba",
    "Umugarama",
  ],
  "Kamonyi|Nyamiyaga|Kidahwe": [
    "Kiranzi",
    "Kirehe",
    "Magu",
    "Nyamiyaga",
    "Nyarubuye",
    "Rugarama",
    "Rugwiro",
    "Rwezamenyo",
    "Sabununga",
  ],
  "Kamonyi|Nyamiyaga|Mukinga": [
    "Birembo",
    "Kabeza",
    "Kayenzi",
    "Mbayaya",
    "Nyabubare",
    "Nyamahuru",
    "Nyarugenge",
    "Nyaruhengeri",
    "Wimana",
  ],

  // Nyarubaka Sector
  "Kamonyi|Nyarubaka|Gitare": [
    "Karora",
    "Kibingo",
    "Mugereke",
    "Nyabitare",
    "Remera",
    "Rwigerero",
  ],
  "Kamonyi|Nyarubaka|Kambyeyi": [
    "Kabungo",
    "Kigwene",
    "Kirwa",
    "Nyagihamba",
    "Ruhuha",
    "Ruseke",
  ],
  "Kamonyi|Nyarubaka|Kigusa": [
    "Birembo",
    "Gaserege",
    "Kigarama",
    "Kintama",
    "Rugarama",
    "Rwinanka",
  ],
  "Kamonyi|Nyarubaka|Nyagishubi": [
    "Kabere",
    "Ngendo",
    "Nombe",
    "Nyagasozi",
    "Tare",
  ],
  "Kamonyi|Nyarubaka|Ruyanza": [
    "Buhunga",
    "Gatagara",
    "Gitega",
    "Kanombe",
    "Kavumu",
    "Ngarama",
  ],

  // Rugarika Sector
  "Kamonyi|Rugarika|Kigese": [
    "Bikamba",
    "Kigese",
    "Kirega",
    "Mibirizi",
    "Rugarama",
  ],
  "Kamonyi|Rugarika|Masaka": ["Masaka", "Mpungwe", "Ruramba", "Rwimondo"],
  "Kamonyi|Rugarika|Nyarubuye": [
    "Kabarama",
    "Musave",
    "Nzagwa",
    "Remera",
    "Ruhogo",
    "Samuduha",
  ],
  "Kamonyi|Rugarika|Sheli": [
    "Butera",
    "Gatovu",
    "Kagangayire",
    "Karehe",
    "Kigarama",
    "Ntebe",
  ],

  // Rukoma Sector
  "Kamonyi|Rukoma|Bugoba": [
    "Bugoba",
    "Gatare",
    "Kabuga",
    "Nyarurama",
    "Nyenge",
  ],
  "Kamonyi|Rukoma|Buguri": [
    "Buguri",
    "Nyabuvomo",
    "Nyagasozi",
    "Nyakabande",
    "Ruzege",
    "Tunza",
  ],
  "Kamonyi|Rukoma|Gishyeshye": [
    "Gahungeri",
    "Gishyeshye",
    "Murambi",
    "Nyamabuye",
    "Rubare",
  ],
  "Kamonyi|Rukoma|Murehe": [
    "Kabagabo",
    "Kamuzi",
    "Mubuga",
    "Rushikiri",
    "Uwingando",
  ],
  "Kamonyi|Rukoma|Mwirute": [
    "Gafonogo",
    "Mwirute",
    "Nyarusave",
    "Rubuye",
    "Rugarama",
  ],

  // Runda Sector
  "Kamonyi|Runda|Gihara": [
    "Bikimba",
    "Bimba",
    "Kabasanza",
    "Nyagatare",
    "Rukaragata",
    "Ruyigi",
  ],
  "Kamonyi|Runda|Kabagesera": [
    "Bwirabo",
    "Kabagesera",
    "Muhambara",
    "Rubuye",
    "Rugogwe",
  ],
  // ============================================================
  // WEST PROVINCE - Karongi District
  // ============================================================

  // Bwishyura Sector
  "Karongi|Bwishyura|Burunga": [
    "Kabuga",
    "Majuri",
    "Matyazo",
    "Nyabikenke",
    "Nyamarebe",
    "Ruyenzi",
    "Twimbogo",
  ],
  "Karongi|Bwishyura|Kibuye": ["Gacumba", "Gatwaro", "Rurembo"],
  "Karongi|Bwishyura|Kiniha": [
    "Karutete",
    "Kiyovu",
    "Maryohe",
    "Nyabaguma",
    "Nyakigezi",
    "Nyarurembo",
    "Nyegabo",
    "Ruganda",
  ],
  "Karongi|Bwishyura|Nyarusazi": [
    "Birembo",
    "Bupfune",
    "Bwishyura",
    "Kanyabusage",
    "Karongi",
    "Nyarusozi",
  ],

  // Gashari Sector
  "Karongi|Gashari|Birambo": [
    "Birambo",
    "Gashari",
    "Kabirizi",
    "Kakibereka",
    "Kananira",
    "Ntarabana",
    "Nyabikenke",
    "Nyakibuguma",
    "Nyarusange",
    "Rugarama",
  ],
  "Karongi|Gashari|Musasa": [
    "Kabasare",
    "Kaduha",
    "Kagangare",
    "Kigarama",
    "Musasa",
    "Rasaniro",
  ],
  "Karongi|Gashari|Rugobagoba": [
    "Karambo",
    "Karutare",
    "Kibingo",
    "Musongati",
    "Nkingo",
    "Shungwe",
  ],
  "Karongi|Gashari|Tongati": ["Kayonga", "Nyabivumu", "Nyagisozi", "Rubona"],

  // Gishyita Sector
  "Karongi|Gishyita|Cyanya": [
    "Gataba",
    "Gatare",
    "Gisiza",
    "Gitovu",
    "Kabuga",
    "Kagano",
    "Mpatsi",
  ],

  // Gitesi Sector
  "Karongi|Gitesi|Kanunga": [
    "Giticyuma",
    "Karongi",
    "Nemba",
    "Nyabitare",
    "Nyagisozi",
    "Nyarugenge",
  ],
  "Karongi|Gitesi|Kirambo": [
    "Buye",
    "Karongi",
    "Kirambo",
    "Nyarusange",
    "Nzabuhara",
  ],
  "Karongi|Gitesi|Nyamiringa": [
    "Burega",
    "Cyimba",
    "Gisasa",
    "Kagari",
    "Kivuruga",
  ],
  "Karongi|Gitesi|Rwariro": [
    "Karwiru",
    "Kigarama",
    "Kirwa",
    "Rurumbu",
    "Rusekera",
    "Rwariro",
  ],

  // Mubuga Sector
  "Karongi|Mubuga|Kagabiro": [
    "Bitaba",
    "Buhari",
    "Kagabiro",
    "Kagarama",
    "Mweya",
    "Nyabinyenga",
    "Nyakabande",
    "Nyakagezi",
    "Rubondo",
    "Runyinya",
  ],
  "Karongi|Mubuga|Murangara": [
    "Gisunzu",
    "Kabuga",
    "Kaduha",
    "Karora",
    "Murangara",
    "Nyabitare",
    "Rubyiro",
    "Rwakamuri",
  ],
  "Karongi|Mubuga|Ryaruhanga": [
    "Bikenke",
    "Gihira",
    "Jurwe",
    "Kizibaziba",
    "Mubuga",
    "Rwamiko",
    "Ryaruhanga",
  ],

  // Murambi Sector
  "Karongi|Murambi|Nkoto": [
    "Gakoma",
    "Gisovu",
    "Kakirinda",
    "Kibamba",
    "Mataba",
    "Muramba",
  ],

  // Murundi Sector
  "Karongi|Murundi|Bukiro": [
    "Bugeni",
    "Bukiro",
    "Gitwa",
    "Munzanga",
    "Nyamabuye",
    "Nyamyumba",
  ],
  "Karongi|Murundi|Kabaya": [
    "Burwi",
    "Gakomeye",
    "Karambo",
    "Mujyojyo",
    "Murambi",
    "Mwumba",
  ],
  "Karongi|Murundi|Kamina": [
    "Kiraro",
    "Kirehe",
    "Murehe",
    "Mwunguzi",
    "Nyakarambi",
    "Nzobe",
  ],
  "Karongi|Murundi|Nyamushishi": [
    "Gasharu",
    "Gitwa",
    "Kisenge",
    "Ngoma",
    "Nyarurembo",
    "Remera",
    "Rubona",
  ],
  "Karongi|Murundi|Nzaratsi": [
    "Gatwaro",
    "Gishyikiro",
    "Nyabinombe",
    "Nyamabuye",
    "Remera",
    "Ruhondo",
    "Rusovu",
  ],

  // Mutuntu Sector
  "Karongi|Mutuntu|Byogo": [
    "Gasenyi",
    "Gititi",
    "Kivumu",
    "Muhondo",
    "Murambi",
    "Musango",
    "Rugogo",
  ],
  "Karongi|Mutuntu|Gisayura": [
    "Gashubi",
    "Gatwa",
    "Kabariro",
    "Mayombo",
    "Ryarugango",
  ],
  "Karongi|Mutuntu|Kanyege": [
    "Gitumba",
    "Kanyege",
    "Kavumu",
    "Manji",
    "Mukongoro",
    "Nyarubuye",
    "Rugogwe",
  ],
  "Karongi|Mutuntu|Kinyonzwe": [
    "Kadehero",
    "Kinyonzwe",
    "Matyazo",
    "Ruhindiro",
    "Uwabashi",
    "Uwibumba",
  ],
  "Karongi|Mutuntu|Murengezo": [
    "Cyamakamba",
    "Karambo",
    "Ngundusi",
    "Nyarutovu",
    "Uwiraro",
  ],
  "Karongi|Mutuntu|Rwufi": [
    "Cyiha",
    "Gatiti",
    "Mwumba",
    "Rasaniro",
    "Rugusa",
    "Ruhuha",
  ],

  // Rubengera Sector
  "Karongi|Rubengera|Bubazi": [
    "Gakomeye",
    "Gitwa",
    "Kabuga",
    "Kavumu",
    "Kigarama",
    "Makurungwe",
    "Nyagahinga",
  ],
  "Karongi|Rubengera|Gacaca": [
    "Gakomeye",
    "Gasharu",
    "Kamuvunyi",
    "Kamwijagi",
    "Karehe",
    "Nyarubuye",
    "Remera",
  ],
  "Karongi|Rubengera|Gisanze": [
    "Kabatara",
    "Kibande",
    "Kigabiro",
    "Nyabitare",
    "Nyamagana",
  ],
  "Karongi|Rubengera|Nyarugenge": [
    "Bigugu",
    "Gatare",
    "Kabazi",
    "Kambogo",
    "Karusha",
    "Nkomagurwa",
    "Rukaragata",
  ],
  "Karongi|Rubengera|Ruragwe": [
    "Bunyankungu",
    "Kabeza",
    "Nyagahinga",
    "Nyagasozi",
    "Nyagatovu",
    "Nyakabungo",
    "Rutabo",
    "Rwimpongo",
  ],

  // Rugabano Sector
  "Karongi|Rugabano|Gisiza": [
    "Gitwa",
    "Kamina",
    "Muciro",
    "Rubona",
    "Rugabano",
    "Winyambo",
  ],
  "Karongi|Rugabano|Mucyimba": [
    "Gihara",
    "Kagombyi",
    "Kamonyi",
    "Kigarama",
    "Kivumu",
    "Rwagisozi",
    "Ryangondo",
  ],
  "Karongi|Rugabano|Rufungo": [
    "Bucensha",
    "Bwihe",
    "Gitabi",
    "Karambo",
    "Kavumu",
    "Rukoko",
  ],
  "Karongi|Rugabano|Rwungo": [
    "Gahengeri",
    "Gasharu",
    "Kabuye",
    "Rwungo",
    "Wisazi",
  ],

  // Ruganda Sector
  "Karongi|Ruganda|Biguhu": [
    "Gitwa",
    "Murambi",
    "Muremure",
    "Ngange",
    "Nyagasozi",
  ],
  "Karongi|Ruganda|Kabingo": ["Bugarura", "Kabingo", "Nyagisozi"],
  "Karongi|Ruganda|Kinyovu": ["Bizitiro", "Kabaranda", "Kanyegenyege"],
  "Karongi|Ruganda|Nyabikeri": ["Dusasa", "Gahororo", "Kiguhu", "Nyabikeri"],
  "Karongi|Ruganda|Nyamugwagwa": ["Burango", "Kaduha", "Kibari", "Nyamugwagwa"],

  // Rwankuba Sector
  "Karongi|Rwankuba|Bigugu": [
    "Kagusa",
    "Kavumu",
    "Mifuba",
    "Nyantwa",
    "Ruhondo",
    "Ruhuha",
  ],
  "Karongi|Rwankuba|Bisesero": ["Bisesero", "Jurwe", "Kigarama", "Uwingabo"],
  "Karongi|Rwankuba|Gasata": [
    "Cyabahanga",
    "Muhingo",
    "Nyagafumba",
    "Rugeti",
    "Rurebero",
    "Rutiti",
    "Rwasheke",
  ],
  "Karongi|Rwankuba|Nyakamira": ["Mahembe", "Musango", "Nyarushekera"],
  "Karongi|Rwankuba|Nyarusanga": [
    "Gasharu",
    "Karambo",
    "Kigogwe",
    "Kanyege",
    "Wingwa",
  ],
  "Karongi|Rwankuba|Rubazo": [
    "Bucyurabuhoro",
    "Kanyarusanga",
    "Nyaruyaga",
    "Ruhinga",
    "Wamahoro",
  ],
  "Karongi|Rwankuba|Rubumba": ["Gishwati", "Himbo", "Rukore", "Ryampande"],

  // Twumba Sector
  "Karongi|Twumba|Bihumbe": [
    "Bihumbe",
    "Bivumu",
    "Gikaranka",
    "Nyabubare",
    "Rushishi",
    "Uwintobo",
  ],
  "Karongi|Twumba|Gakuta": [
    "Gakoko",
    "Karumbi",
    "Nyamiryango",
    "Rugogwe",
    "Twumba",
  ],
  "Karongi|Twumba|Gisovu": [
    "Bikunda",
    "Gashihe",
    "Kanyovu",
    "Karambo",
    "Kibuburo",
    "Mwumba",
    "Nyakabingo",
  ],
  "Karongi|Twumba|Gitabura": [
    "Gatare",
    "Kibingo",
    "Mataba",
    "Nyakiyabo",
    "Nyarubuye",
    "Nyaruyaga",
    "Rugeyo",
    "Tuvunasogi",
  ],
  "Karongi|Twumba|Rutabi": ["Gahondo", "Nyirabununu", "Rutabi", "Wintobo"],

  // ============================================================
  // WEST PROVINCE - Rutsiro District
  // ============================================================

  // Boneza Sector
  "Rutsiro|Boneza|Bushaka": [
    "Bikono",
    "Bugarura",
    "Gaseke",
    "Kabirizi",
    "Kinunu",
    "Muramba",
    "Rutagara",
    "Rwimbogo",
  ],
  "Rutsiro|Boneza|Kabihogo": [
    "Buhonongo",
    "Bweramana",
    "Gashoko",
    "Kamuyaga",
    "Rugamba",
    "Rwabisururu",
  ],
  "Rutsiro|Boneza|Nkira": [
    "Gisiza",
    "Gisoro",
    "Kabuga",
    "Karukamba",
    "Kigarama",
    "Munanira",
    "Murambi",
  ],

  // Gihango Sector
  "Rutsiro|Gihango|Bugina": ["Gishushu", "Gitarama", "Kagarama", "Karambi"],
  "Rutsiro|Gihango|Congo-nil": [
    "Kandahura",
    "Kindoyi",
    "Mukebera",
    "Nduba",
    "Nkwiro",
  ],
  "Rutsiro|Gihango|Mataba": [
    "Butare",
    "Kabeza",
    "Kamutambiro",
    "Muyange",
    "Nganzo",
    "Terimbere",
  ],
  "Rutsiro|Gihango|Murambi": [
    "Gashihe",
    "Gatomvu",
    "Karugaju",
    "Muhora",
    "Nyagahinga",
  ],
  "Rutsiro|Gihango|Ruhingo": ["Gasharu", "Kabuga", "Nyagahinga"],
  "Rutsiro|Gihango|Shyembe": [
    "Gisunzu",
    "Karambo",
    "Karongi",
    "Rugote",
    "Rwamiyaga",
    "Shyembe",
  ],
  "Rutsiro|Gihango|Teba": [
    "Bweramana",
    "Gasave",
    "Gateja",
    "Kanembwe",
    "Rasaniro",
  ],

  // Kigeyo Sector
  "Rutsiro|Kigeyo|Buhindure": [
    "Burambo",
    "Bushaka",
    "Gacaca",
    "Gaharawe",
    "Gisiza",
    "Nkamba",
    "Nkomero",
    "Nturo",
  ],
  "Rutsiro|Kigeyo|Nkora": [
    "Buhimba",
    "Gahotora",
    "Gasagara",
    "Gasereganya",
    "Humiro",
    "Kabashyembe",
    "Kanyirahweza",
    "Karambi",
    "Kigugu",
    "Muhora",
    "Rukundo",
  ],
  "Rutsiro|Kigeyo|Nyagahinika": [
    "Bukungu",
    "Kampi",
    "Nteko",
    "Nyarusuku",
    "Rugabi",
    "Rukombe",
    "Rupango",
    "Rusisiro",
    "Ruvumu",
  ],
  "Rutsiro|Kigeyo|Rukaragata": [
    "Gahunga",
    "Gasenyi",
    "Kagondero",
    "Kamina",
    "Kinihira",
    "Murambi",
    "Nganzo",
    "Rwambeho",
    "Rwamiyaga",
    "Tagaza",
  ],

  // Kivumu Sector
  "Rutsiro|Kivumu|Bunyoni": [
    "Bureke",
    "Gashinga",
    "Gihari",
    "Gitwa",
    "Kabigabiro",
    "Kanyempanga",
    "Nyarubuye",
  ],
  "Rutsiro|Kivumu|Bunyunju": [
    "Cyivugiza",
    "Kamabuye",
    "Karungu",
    "Mpinga",
    "Rwamvura",
    "Tarafiporo",
  ],
  "Rutsiro|Kivumu|Kabere": [
    "Burambo",
    "Burango",
    "Cyato",
    "Kabitara",
    "Kabusagara",
    "Kagera",
    "Mushubati",
  ],
  "Rutsiro|Kivumu|Kabujenje": [
    "Bitare",
    "Buhogo",
    "Kabagwe",
    "Kabuye",
    "Kanyamatembe",
    "Rurembo",
    "Rusisiro",
    "Rutambi",
    "Tarasi",
  ],
  "Rutsiro|Kivumu|Karambi": [
    "Bukiro",
    "Bukumba",
    "Buroha",
    "Bushamba",
    "Gateko",
    "Kabuga",
    "Nyundo",
    "Rusumo",
  ],
  "Rutsiro|Kivumu|Nganzo": [
    "Bubira",
    "Bugarishya",
    "Kamwimba",
    "Muramba",
    "Nyabiti",
    "Remera",
    "Rwinyoni",
    "Tawuni",
  ],

  // Manihira Sector
  "Rutsiro|Manihira|Haniro": [
    "Bitabaro",
    "Gisunzu",
    "Gitwe",
    "Kaziramihunda",
    "Kivumu",
    "Mifu",
    "Rukondo",
    "Runaba",
  ],
  "Rutsiro|Manihira|Muyira": [
    "Birambo",
    "Kagarama",
    "Kamishunguro",
    "Kanama",
    "Kimpongo",
    "Mujebeshi",
    "Muyira",
    "Nyakarambi",
    "Rufungo",
    "Rutangaza",
    "Rutare",
  ],
  "Rutsiro|Manihira|Tangabo": [
    "Kabeza",
    "Kadehero",
    "Kanama",
    "Karambo",
    "Munini",
    "Nyarushogwe",
    "Rugano",
  ],

  // Mukura Sector
  "Rutsiro|Mukura|Kabuga": ["Kabahigi", "Karambo Ya 1", "Miraramo", "Sanzare"],
  "Rutsiro|Mukura|Kagano": [
    "Cyabatsinga",
    "Gakeri",
    "Kabacuzi",
    "Kagano",
    "Kamonyi",
    "Kazizi",
    "Kibavu",
    "Kiriba",
    "Ntobo",
    "Nyaburama",
    "Rugomero",
    "Tumba",
  ],
  "Rutsiro|Mukura|Kageyo": [
    "Bitura",
    "Karumbi",
    "Kigeyo",
    "Kimishishi",
    "Mucaca",
    "Ntonde",
    "Nyanzu",
    "Rukeri",
    "Rukondo",
    "Site Mukura ya 1",
    "Site Mukura ya 2",
  ],
  "Rutsiro|Mukura|Kagusa": ["Bucyeye", "Gako", "Gasharu", "Muhindo", "Rusasa"],
  "Rutsiro|Mukura|Karambo": [
    "Bandamiko",
    "Dehero",
    "Gasambi",
    "Gihumo",
    "Gituntu",
    "Karambo Ya 2",
    "Terimbere",
  ],
  "Rutsiro|Mukura|Mwendo": [
    "Bitenga",
    "Gafu",
    "Gako",
    "Gitega",
    "Kabeza",
    "Kabisasa",
    "Kagogo",
    "Kagombwa",
    "Kamariba",
    "Mataba",
    "Nyarubande",
    "Nyarusongati",
    "Nyove",
    "Rugari",
  ],

  // Murunda Sector
  "Rutsiro|Murunda|Kirwa": [
    "Bukongora",
    "Gasasa",
    "Kabatemba",
    "Kajugujugu",
    "Karumbi",
    "Karuruma",
    "Muremure",
    "Nyenyeri",
    "Ruhanga",
    "Rusisiro",
    "Satinsyi",
  ],
  "Rutsiro|Murunda|Mburamazi": [
    "Gatoki",
    "Kamuhoza",
    "Kariba",
    "Murunda",
    "Rukingu",
    "Rurimba",
    "Rwamiko",
  ],
  "Rutsiro|Murunda|Rugeyo": [
    "Kabeza",
    "Kamabuye",
    "Kamusambi",
    "Karambo",
    "Musongati",
  ],
  "Rutsiro|Murunda|Twabugezi": [
    "Bweramana",
    "Gatare",
    "Nyarucundura",
    "Rwanika",
    "Rwoza",
  ],

  // Musasa Sector
  "Rutsiro|Musasa|Gabiro": [
    "Gabiro",
    "Gitwa",
    "Murama",
    "Murama/Nyagahinga",
    "Nyarugenge",
    "Rugarambiro",
    "Rwagatoki",
    "Rwangoma",
  ],
  "Rutsiro|Musasa|Gisiza": [
    "Bweramana",
    "Gasharu",
    "Gihinga",
    "Gisiza",
    "Gitovu",
    "Karambi",
    "Karambo",
    "Ngoma",
    "Nyagafurwe",
    "Rubaya",
  ],
  "Rutsiro|Musasa|Murambi": [
    "Bunnyari",
    "Buruseri",
    "Kabatoni",
    "Munyinya",
    "Murambi",
    "Nyamasheke",
    "Rwintanga",
    "Rwumba",
    "Syiki",
  ],
  "Rutsiro|Musasa|Nyarubuye": [
    "Bwinyana",
    "Gataka",
    "Gitete",
    "Kabuga",
    "Mirambi",
    "Muhororo",
    "Rebero",
  ],

  // Mushonyi Sector
  "Rutsiro|Mushonyi|Biruyi": [
    "Buhunde",
    "Bushunga",
    "Buzukira",
    "Kabakiza",
    "Kamaranzara",
    "Karengera",
    "Mugara",
    "Rurimba",
  ],
  "Rutsiro|Mushonyi|Kaguriro": [
    "Cyondo",
    "Gakenke",
    "Kabere",
    "Kivumu",
    "Maziba",
    "Mubuga",
    "Rugerero",
    "Rwesero",
    "Ryarwasa",
  ],
  "Rutsiro|Mushonyi|Magaba": [
    "Gakomeye",
    "Gasave",
    "Gihumba",
    "Kakibaba",
    "Kariba",
    "Nkomero",
    "Ruyogoro",
  ],
  "Rutsiro|Mushonyi|Rurara": [
    "Gasoro",
    "Gisunzu",
    "Kaboneye",
    "Kagano",
    "Kashishi",
    "Kavumu",
    "Mukati",
    "Ngunguru",
    "Rugaragara",
    "Ruhengeri",
  ],

  // Mushubati Sector
  "Rutsiro|Mushubati|Bumba": [
    "Bisyo",
    "Kabiraho",
    "Kamushozi",
    "Karambi",
    "Mataba",
    "Rugote",
    "Ruhinga",
  ],
  "Rutsiro|Mushubati|Cyarusera": [
    "Bivumu",
    "Cyahafi",
    "Gasharu",
    "Kigarama",
    "Kunini",
    "Mugeri",
  ],
  "Rutsiro|Mushubati|Gitwa": [
    "Gakoma",
    "Gashinge",
    "Karambira",
    "Kibari",
    "Mbuga",
    "Mubuga",
    "Mugote",
    "Rububa",
    "Ruhinga",
    "Rwintore",
  ],
  "Rutsiro|Mushubati|Mageragere": [
    "Gitega",
    "Murambi",
    "Nyakabuye",
    "Nyarusange",
    "Rarankuba",
    "Rushikiri",
  ],
  "Rutsiro|Mushubati|Sure": [
    "Kabuga",
    "Kaduha",
    "Kagugu",
    "Kanyinya",
    "Kivumu",
    "Nyagahinga",
    "Nyamahuru",
  ],

  // Nyabirasi Sector
  "Rutsiro|Nyabirasi|Busuku": [
    "Bishami",
    "Busuku",
    "Busuti",
    "Bwiza",
    "Gacaca",
    "Gatare",
    "Ngugo",
    "Nyakibande",
    "Rwamigega",
    "Torwe",
    "Tsindiro",
  ],
  "Rutsiro|Nyabirasi|Cyivugiza": [
    "Cyubi",
    "Gakumba",
    "Gishahaga",
    "Kageyo",
    "Kamananga",
    "Mukungu",
    "Nyabishongo",
    "Rukomero",
  ],
  "Rutsiro|Nyabirasi|Mubuga": [
    "Bugorozi",
    "Buryoshya",
    "Gakararanka",
    "Gashasho",
    "Gatsiro",
    "Gitongo",
    "Kabaratama",
    "Mubuga",
    "Pfunda",
    "Rushubi",
    "Rutovu",
    "Rwankuba",
  ],
  "Rutsiro|Nyabirasi|Ngoma": [
    "Bukanda",
    "Bushoga",
    "Cyeshero",
    "Gashihe",
    "Gisayo",
    "Gishowa",
    "Kaje",
    "Kamunyurwe",
    "Kazo",
    "Mpati",
    "Ngoma",
    "Nkuna",
  ],
  "Rutsiro|Nyabirasi|Terimbere": [
    "Gihinga",
    "Kageshi",
    "Kanombe",
    "Karongi",
    "Kasonga",
    "Kinyamavuta",
    "Mukondo",
    "Negenero",
    "Nyampengeri",
    "Ruraji",
    "Rwandozi",
    "Rwangambuto",
    "Ryanyiramunonko",
  ],

  // Ruhango Sector (Rutsiro)
  "Rutsiro|Ruhango|Gatare": [
    "Gasovu",
    "Gasoyo",
    "Kamuramira",
    "Kirinja",
    "Mwurire",
    "Ruhimbi",
    "Rukenesha",
  ],
  "Rutsiro|Ruhango|Gihira": [
    "Bitenga",
    "Busenda",
    "Kararo",
    "Kinyenkanda",
    "Murambi",
    "Rukoko",
    "Tara",
  ],
  "Rutsiro|Ruhango|Kavumu": [
    "Gakeri",
    "Gasasa",
    "Gasunzu",
    "Mubirizi",
    "Muhingo",
    "Nyundo",
  ],
  "Rutsiro|Ruhango|Nyakarera": [
    "Buzeyi",
    "Kabeza",
    "Kagogo",
    "Kayove",
    "Marabuye",
    "Mugali",
  ],
  "Rutsiro|Ruhango|Rugasa": [
    "Cyashenge",
    "Gicaca",
    "Kabitovu",
    "Kiraza",
    "Murambi",
    "Nyakagezi",
  ],
  "Rutsiro|Ruhango|Rundoyi": [
    "Gakararanka",
    "Karebero",
    "Kaziga",
    "Matyazo",
    "Rugaragara",
    "Rushasho",
  ],

  // Rusebeya Sector
  "Rutsiro|Rusebeya|Kabona": [
    "Byiniro",
    "Kibara",
    "Munini",
    "Murengeri",
    "Ntereye",
    "Nyagasambu",
    "Rusheshi",
    "Rwamvura",
  ],
  "Rutsiro|Rusebeya|Mberi": [
    "Bungwe",
    "Gakeri",
    "Gashihe",
    "Gatenga",
    "Gihinga",
    "Kabeza",
    "Kacyiru",
    "Kagano",
    "Marimba",
    "Ruganda",
    "Rurimba",
  ],
  "Rutsiro|Rusebeya|Remera": [
    "Bihira",
    "Bweramana",
    "Gahunga",
    "Kabarirwa",
    "Kiyanja",
    "Nturo",
    "Ruhuha",
    "Rurambo",
    "Shyembe",
  ],
  "Rutsiro|Rusebeya|Ruronde": [
    "Gisozi",
    "Kigali",
    "Kirumbi",
    "Mubuga",
    "Nyamibombwe",
  ],

  // ============================================================
  // WEST PROVINCE - Rubavu District
  // ============================================================

  // Bugeshi Sector
  "Rubavu|Bugeshi|Buringo": [
    "Bugeshi",
    "Buringo",
    "Butaka",
    "Gaharawe",
    "Gahira",
    "Jenda",
    "Mutegengeri",
  ],
  "Rubavu|Bugeshi|Butaka": [
    "Akabajara",
    "Akimitori",
    "Gaheriheri",
    "Kabingo",
    "Kinyamuhanga",
    "Muremure",
  ],
  "Rubavu|Bugeshi|Hehu": [
    "Bereshi",
    "Bweramana",
    "Gasizi",
    "Gitotoma",
    "Hangari",
    "Humure",
    "Kabeza",
    "Ngando",
  ],
  "Rubavu|Bugeshi|Kabumba": [
    "Bonde",
    "Bugeshi",
    "Gashaka",
    "Gatovu",
    "Gihira",
    "Kabumba",
    "Mweya",
    "Ryarukara",
  ],
  "Rubavu|Bugeshi|Mutovu": [
    "Bigaragara",
    "Bugeshi",
    "Kabuhanga",
    "Kimpongo",
    "Mburamazi",
    "Rindiro",
    "Vuna",
  ],
  "Rubavu|Bugeshi|Nsherima": [
    "Batikoti",
    "Bipfura",
    "Bweza",
    "Cyumba",
    "Gaheriheri",
    "Murangara",
  ],
  "Rubavu|Bugeshi|Rusiza": [
    "Bihe",
    "Bunjuri",
    "Kabarore",
    "Kitagabwa",
    "Nyacyonga",
    "Ryarugamba",
  ],

  // Busasamana Sector (Rubavu)
  "Rubavu|Busasamana|Gacurabwenge": [
    "Biziguro",
    "Bukumu",
    "Busanganya",
    "Gakomero",
    "Kamuyenzi",
    "Kanondo",
    "Kanyabijumba",
    "Nyamyenge",
    "Nyarubuye",
    "Nyarusozi",
  ],
  "Rubavu|Busasamana|Gasiza": [
    "Bunyogwe",
    "Gisura",
    "Kibavu",
    "Kinyababa",
    "Kinyandaro",
    "Kiraro",
    "Mashinga",
    "Munanira",
    "Nyarunembwe",
    "Rwagare",
  ],
  "Rubavu|Busasamana|Gihonga": ["Marumba", "Mubona", "Nyamyumba", "Sabushengo"],
  "Rubavu|Busasamana|Kageshi": [
    "Gasenyi",
    "Kigezi",
    "Mufumba",
    "Ruhara",
    "Rwamigega",
    "Rwankuba",
  ],
  "Rubavu|Busasamana|Makoro": [
    "Gakuta",
    "Hanika",
    "Kamuzamuzi",
    "Karambi",
    "Kidadi",
  ],
  "Rubavu|Busasamana|Nyacyonga": [
    "Cyanika",
    "Kacyiru",
    "Kamiro",
    "Kingogo",
    "Kitagabwa",
    "Nyarurembo",
  ],
  "Rubavu|Busasamana|Rusura": [
    "Cyamabuye",
    "Kabagoyi",
    "Kageyo",
    "Kambonyi",
    "Kamivumba",
    "Kinogo",
    "Munege",
    "Rebero",
  ],

  // Cyanzarwe Sector
  "Rubavu|Cyanzarwe|Busigari": ["Bisizi", "Bugu", "Kanembwe", "Rwashungwe"],
  "Rubavu|Cyanzarwe|Cyanzarwe": [
    "Butango",
    "Cyanzarwe",
    "Gasenyi",
    "Karangara",
    "Kiruhura",
    "Rushura",
  ],
  "Rubavu|Cyanzarwe|Gora": ["Burima", "Gora", "Kabere"],
  "Rubavu|Cyanzarwe|Kinyanzovu": [
    "Bushanga",
    "Kanyentambi",
    "Kibaya",
    "Muhororo",
  ],
  "Rubavu|Cyanzarwe|Makurizo": [
    "Gashuha",
    "Makurizo",
    "Mukingo",
    "Nyamugari",
    "Ruhuranda",
  ],
  "Rubavu|Cyanzarwe|Rwangara": [
    "Buramazi",
    "Hanika",
    "Muti",
    "Nyakabanda",
    "Nyakabungo",
  ],
  "Rubavu|Cyanzarwe|Rwanzekuma": [
    "Kabirizi",
    "Karambi",
    "Kinyamiyaga",
    "Munaba",
    "Rukorakore",
  ],
  "Rubavu|Cyanzarwe|Ryabizige": [
    "Burere",
    "Kanyamagare",
    "Kavumu",
    "Muhuhuri",
    "Musene",
    "Nganzo",
  ],

  // Gisenyi Sector
  "Rubavu|Gisenyi|Amahoro": [
    "Amahoro",
    "Kitagabwa",
    "Muhabura",
    "Murakazaneza",
    "Umunezero",
  ],
  "Rubavu|Gisenyi|Bugoyi": [
    "Amataba",
    "Bugoyi",
    "Giraneza",
    "Irakiza",
    "Isangano",
    "Ituze",
    "Kaminuza",
    "Nyakabungo",
    "Ubutabera",
    "Ubwiza",
  ],
  "Rubavu|Gisenyi|Kivumu": [
    "Giponda",
    "Igisubizo",
    "Itangazamakuru",
    "Karisimbi",
    "Kivumu",
    "Muduha",
    "Murisanga",
    "Ubukerarugendo",
    "Ubumwe",
    "Ubutabazi",
    "Umurava",
    "Urumuri",
  ],
  "Rubavu|Gisenyi|Mbugangari": [
    "Abahuje",
    "Amajyambere",
    "Gasutamo",
    "Haguruka",
    "Icyinyambo",
    "Ihumure",
    "Ikaze",
    "Ikibuga",
    "Inkurunziza",
    "Iyobokamana",
    "Karundo",
    "Nyarubande",
    "Rebero",
    "Uburanga",
    "Uburezi",
    "Ubwiyunge",
    "Umubano",
    "Umutekano",
  ],
  "Rubavu|Gisenyi|Nengo": [
    "Gacuba",
    "Gikarani",
    "Kivu",
    "Nyabagobe",
    "Nyaburanga",
    "Ubucuruzi",
    "Urubyiruko",
  ],
  "Rubavu|Gisenyi|Rubavu": ["Gahojo", "Kamayugi", "Munini", "Rubavu", "Ruliba"],
  "Rubavu|Gisenyi|Umuganda": [
    "Bonde",
    "Dukore",
    "Ihuriro",
    "Kabuga",
    "Majengo",
    "Muhato",
    "Umucyo",
    "Umuganda",
    "Umunyinya",
  ],

  // Kanama Sector
  "Rubavu|Kanama|Kamuhoza": [
    "Bambiro",
    "Kagarama",
    "Nyamigogo",
    "Nyanshundura",
    "Rukoro",
    "Rwankomo",
  ],
  "Rubavu|Kanama|Karambo": ["Gahunga", "Mariba", "Mutanda", "Ndongoshori"],
  "Rubavu|Kanama|Mahoko": [
    "Bikuka",
    "Kabeza",
    "Kabindi",
    "Kanama",
    "Kara",
    "Mahoko",
    "Nyagasozi",
    "Nyamirambo",
    "Nyamugari",
    "Nyamuremure",
    "Rubare",
    "Shusho",
  ],
  "Rubavu|Kanama|Musabike": [
    "Kabingo",
    "Kagano",
    "Kaje",
    "Nteranya",
    "Nyakibande",
    "Ryamibungo",
  ],
  "Rubavu|Kanama|Nkomane": [
    "Gashasho",
    "Gatsina",
    "Nkomane",
    "Nyabishongo",
    "Rwanzuki",
  ],
  "Rubavu|Kanama|Rusongati": [
    "Busesa",
    "Gihurizo",
    "Kabere",
    "Kibuga",
    "Mashyoza",
    "Muvebwa",
    "Nyabitunda",
  ],
  "Rubavu|Kanama|Yungwe": [
    "Bwikurure",
    "Gikomero",
    "Rugege",
    "Rugogwe",
    "Rutagara",
    "Yungwe",
  ],

  // Kanzenze Sector
  "Rubavu|Kanzenze|Kanyirabigogo": ["Giramata", "Kabana", "Mizingo", "Murambi"],
  "Rubavu|Kanzenze|Kirerema": ["Bisesero", "Kirerema", "Rushasho"],
  "Rubavu|Kanzenze|Muramba": ["Kanya", "Muramba", "Rubara", "Tubindi"],
  "Rubavu|Kanzenze|Nyamikongi": [
    "Cyivugiza",
    "Kabari",
    "Nyamikongi",
    "Rwamikungu",
  ],
  "Rubavu|Kanzenze|Nyamirango": ["Gasizi", "Mareru", "Mizingo", "Nyamirango"],
  "Rubavu|Kanzenze|Nyaruteme": ["Kabere", "Karagarago", "Rugali"],

  // Mudende Sector
  "Rubavu|Mudende|Bihungwe": [
    "Bihungwe",
    "Bivumu",
    "Bunyove",
    "Mwirima",
    "Rukeri",
  ],
  "Rubavu|Mudende|Kanyundo": [
    "Gahanika",
    "Mugongo",
    "Murambi",
    "Mutura",
    "Nyamirama",
    "Rebero",
  ],
  "Rubavu|Mudende|Micinyiro": [
    "Gasiza",
    "Kanombe",
    "Kanyamitura",
    "Micinyiro",
    "Nyagisozi",
    "Tetero",
  ],
  "Rubavu|Mudende|Mirindi": ["Gasumba", "Kiryoha", "Mirindi", "Tamira"],
  "Rubavu|Mudende|Ndoranyi": [
    "Gaharawe",
    "Gikuyu",
    "Gitega",
    "Karandaryi",
    "Kinyangwe",
    "Nyabishongo",
  ],
  "Rubavu|Mudende|Rungu": ["Bihe", "Gahenerezo", "Ndiza", "Rungu", "Rwangara"],
  "Rubavu|Mudende|Rwanyakayaga": [
    "Kabunoni",
    "Muyange",
    "Nangurubibi",
    "Nyamugari",
  ],

  // Nyakiriba Sector
  "Rubavu|Nyakiriba|Bisizi": [
    "Bweza",
    "Gisangani",
    "Kamakinga",
    "Kibuye",
    "Kingoma",
    "Mwumba",
    "Nyamwishyura",
    "Runaba",
  ],
  "Rubavu|Nyakiriba|Gikombe": [
    "Kitarimwa",
    "Nyabibuye",
    "Nyakibande",
    "Rugerero",
    "Rushubi",
  ],
  "Rubavu|Nyakiriba|Kanyefurwe": [
    "Kayove",
    "Kiyovu",
    "Muhira",
    "Nyakabungo",
    "Rebero",
    "Rukoro",
  ],
  "Rubavu|Nyakiriba|Nyarushyamba": [
    "Bazirete",
    "Kivumu",
    "Makoro",
    "Nyonirima",
    "Ruhangiro",
    "Runyeheri",
    "Ruvuzananga",
  ],

  // Nyamyumba Sector
  "Rubavu|Nyamyumba|Burushya": [
    "Kaberamo",
    "Kabuyekera",
    "Karuvugiro",
    "Muhingo",
    "Mutembe",
    "Nganzo",
    "Wintwari",
  ],
  "Rubavu|Nyamyumba|Busoro": [
    "Bugoma",
    "Buhanga",
    "Bujenje",
    "Bushagi",
    "Buvano",
    "Gateko",
    "Kabushongo",
    "Kanajana",
    "Kiguri",
  ],
  "Rubavu|Nyamyumba|Kinigi": [
    "Burevu",
    "Byima",
    "Gatyazo",
    "Karambi",
    "Nyabisusa",
    "Nyamiko",
    "Pfunda",
  ],
  "Rubavu|Nyamyumba|Kiraga": [
    "Buhogo",
    "Bukiro",
    "Kigufi",
    "Mukondo",
    "Nyaruhonga",
    "Rambo",
  ],
  "Rubavu|Nyamyumba|Munanira": [
    "Bugarura",
    "Busumba",
    "Cyeya",
    "Kabakora",
    "Nyamirambo",
    "Rebero",
    "Ruhondo",
    "Shusho",
  ],
  "Rubavu|Nyamyumba|Rubona": [
    "Bugasha",
    "Buharara",
    "Bunyago",
    "Burima",
    "Butotori",
    "Kabiza",
    "Kabuyekera",
    "Remera",
    "Rurembo",
    "Rushagara",
    "Tagaza",
  ],

  // Nyundo Sector
  "Rubavu|Nyundo|Bahimba": [
    "Bahimba",
    "Buhozi",
    "Gatuntu",
    "Kagera",
    "Kanyiraruhindu",
    "Ngege",
    "Rurembo",
  ],
  "Rubavu|Nyundo|Gatovu": [
    "Budaha",
    "Busheru",
    "Cyima",
    "Kanyahene",
    "Murambi",
    "Ruhanga",
  ],
  "Rubavu|Nyundo|Kavomo": [
    "Bahimba",
    "Burambo",
    "Gitwa",
    "Kavumu",
    "Kinihira",
    "Kinyendaro",
    "Shonyi",
  ],
  "Rubavu|Nyundo|Kigarama": [
    "Busesa",
    "Kazabe",
    "Mwali",
    "Ndamiye",
    "Rukore",
    "Rwantobo",
  ],
  "Rubavu|Nyundo|Mukondo": [
    "Buroha",
    "Busogo",
    "Byiniro",
    "Cyungeri",
    "Kabitongo",
    "Kanyamisuku",
    "Kashumba",
    "Nkora",
    "Remera",
    "Tanda",
  ],
  "Rubavu|Nyundo|Nyundo": [
    "Birembo",
    "Gasenyi",
    "Huye",
    "Kayanza",
    "Kiribata",
    "Kiyove",
    "Kiziguro",
    "Nyakagezi",
    "Rumbati",
    "Runandi",
  ],
  "Rubavu|Nyundo|Terimbere": [
    "Gahama",
    "Hanika",
    "Kanyamatembe",
    "Keya",
    "Nombe",
    "Rambura",
    "Ruhango",
    "Terimbere",
  ],

  // Rubavu Sector
  "Rubavu|Rubavu|Buhaza": ["Dufatanye", "Gabiro", "Murambi"],
  "Rubavu|Rubavu|Burinda": [
    "Akasengore",
    "Bubaji",
    "Gasenyi",
    "Nyabantu",
    "Nyamwinshi",
    "Rwezamenyo",
  ],
  "Rubavu|Rubavu|Byahi": ["Buhuru", "Isangano", "Mikingo", "Ngugo", "Rurembo"],
  "Rubavu|Rubavu|Gikombe": [
    "Bambiro",
    "Bushengo I",
    "Gafuku",
    "Mubuga",
    "Rebero",
  ],
  "Rubavu|Rubavu|Murambi": [
    "Bushengo",
    "Buzuta",
    "Bwiru",
    "Kabere II",
    "Ruvumbu",
    "Rwangara",
  ],
  "Rubavu|Rubavu|Murara": ["Bugesera", "Gahinga", "Gasayo", "Kabere", "Kiroji"],
  "Rubavu|Rubavu|Rukoko": [
    "Bisizi",
    "Isangano",
    "Karukogo",
    "Kitarimwa",
    "Rutagara",
  ],

  // Rugerero Sector
  "Rubavu|Rugerero|Basa": [
    "Buranga",
    "Gahinga",
    "Kabeza",
    "Kanyukiro",
    "Mukumya",
    "Nyaruhengeri",
    "Tagaza",
  ],
  "Rubavu|Rugerero|Gisa": [
    "Gatangare",
    "Gihira",
    "Gisa",
    "Kabashanja",
    "Kaniga",
    "Ndobogo",
    "Rusongati",
    "Shwemu",
  ],
  "Rubavu|Rugerero|Kabilizi": [
    "Amahoro",
    "Gakoro",
    "Nkama",
    "Nyamyiri",
    "Ruhangiro",
    "Rukukumbo",
  ],
  "Rubavu|Rugerero|Muhira": [
    "Gatebe I",
    "Gatebe II",
    "Gitebe I",
    "Gitebe II",
    "Kasonga",
    "Kizi",
    "Rusamaza",
  ],
  "Rubavu|Rugerero|Rugerero": [
    "Kabarora",
    "Kibaya",
    "Nyantomvu",
    "Nyarurembo",
    "Rukingo",
    "Ruranga",
  ],
  "Rubavu|Rugerero|Rushubi": [
    "Busheke",
    "Butangi",
    "Butumba",
    "Kabashara",
    "Kazika",
    "Kimina",
    "Muhingo",
  ],
  "Rubavu|Rugerero|Rwaza": [
    "Byima",
    "Cyanika",
    "Gashovu",
    "Gateko",
    "Kiroji",
    "Mushoko",
    "Rebero",
    "Rohero",
    "Rucyamo",
    "Rwaza",
  ],

  // ============================================================
  // WEST PROVINCE - Nyabihu District
  // ============================================================

  // Bigogwe Sector
  "Nyabihu|Bigogwe|Arusha": [
    "Arusha",
    "Bukinanyana",
    "Busasamana",
    "Ngamba",
    "Ngandu",
    "Nyabishunguru",
    "Nyagihinga",
  ],
  "Nyabihu|Bigogwe|Basumba": [
    "Buheke",
    "Gasizi",
    "Giticyinyoni",
    "Ngando",
    "Rusenge",
    "Vuga",
  ],
  "Nyabihu|Bigogwe|Kijote": [
    "Bikingi",
    "Bukinanyana",
    "Busasamana",
    "Gasiza",
    "Gatagara",
    "Kabaya",
    "Kazuba",
    "Kijote",
    "Shaba",
    "Zihari",
  ],
  "Nyabihu|Bigogwe|Kora": [
    "Bweramana",
    "Kabatezi",
    "Kabuga",
    "Kageli",
    "Ruhinga",
    "Rukore",
    "Rwankuba",
  ],
  "Nyabihu|Bigogwe|Muhe": [
    "Bihangara",
    "Kananira",
    "Kirandaryi",
    "Murambi",
    "Rusogo",
  ],
  "Nyabihu|Bigogwe|Rega": [
    "Gaturo",
    "Kabaya",
    "Kagano",
    "Kariyeri",
    "Kinamba",
    "Mizingo",
    "Ngangare",
    "Nyagafumberi",
  ],

  // Jenda Sector
  "Nyabihu|Jenda|Bukinanyana": [
    "Bibanza",
    "Bugarama",
    "Bukinanyana",
    "Kageri",
    "Karuhirwa",
    "Kibaya",
    "Nsakira",
  ],
  "Nyabihu|Jenda|Gasizi": [
    "Kagano",
    "Kanyaru",
    "Kanzenze",
    "Kinyengagi",
    "Mikingo",
    "Munanira",
    "Rwanamiza",
  ],
  "Nyabihu|Jenda|Kabatezi": [
    "Gitambuko",
    "Kagaga",
    "Kibuye",
    "Musumba",
    "Ndorwa",
    "Runyanja",
  ],
  "Nyabihu|Jenda|Kareba": [
    "Bizu",
    "Gikombe",
    "Kamatenge",
    "Kareba",
    "Nyacyonga",
    "Rebero",
    "Rubare",
  ],
  "Nyabihu|Jenda|Nyirakigugu": [
    "Cyamabuye",
    "Gisozi",
    "Jenda",
    "Nteranya",
    "Nyamutukura",
    "Rushunguru",
  ],
  "Nyabihu|Jenda|Rega": [
    "Bihinga",
    "Gakarara",
    "Gasesero",
    "Kajebeshi",
    "Rega",
    "Rubare",
    "Terimbere",
  ],

  // Jomba Sector
  "Nyabihu|Jomba|Gasiza": [
    "Cyumba",
    "Gahama",
    "Gasiza",
    "Isangano",
    "Kabingo",
    "Kanama",
    "Nyundo",
  ],
  "Nyabihu|Jomba|Gasura": [
    "Gasura",
    "Gisoro",
    "Kagano",
    "Rwandarugari",
    "Ryabasenge",
    "Ryabirumba",
  ],
  "Nyabihu|Jomba|Gisizi": ["Futi", "Gahanga", "Gikaranka", "Gisizi", "Kagege"],
  "Nyabihu|Jomba|Guriro": [
    "Guriro",
    "Kabari",
    "Misegwibiri",
    "Ngabo",
    "Nyarusongati",
    "Ruhunga",
  ],
  "Nyabihu|Jomba|Kavumu": [
    "Gasanze",
    "Kavumu",
    "Muhare",
    "Munyege",
    "Rugerero",
    "Rushubi",
  ],
  "Nyabihu|Jomba|Nyamitanzi": [
    "Bihinga",
    "Kivumu",
    "Ntwaro",
    "Nyamitanzi",
    "Rubavu",
    "Rugera",
    "Ruhongore",
    "Rutabu",
  ],

  // Kabatwa Sector
  "Nyabihu|Kabatwa|Batikoti": ["Batikoti", "Kamuhe", "Rubare", "Sake"],
  "Nyabihu|Kabatwa|Cyamvumba": ["Kabagabo", "Murambi", "Nyabitembo"],
  "Nyabihu|Kabatwa|Gihorwe": ["Bisukiro", "Kaminuza", "Kinyababa", "Rushubi"],
  "Nyabihu|Kabatwa|Myuga": [
    "Akabeza",
    "Akimitori",
    "Butaka",
    "Myuga",
    "Rugendabari",
  ],
  "Nyabihu|Kabatwa|Ngando": [
    "Gaharawe",
    "Kiramira",
    "Mahurura",
    "Ngando",
    "Ruhango",
  ],
  "Nyabihu|Kabatwa|Rugarama": [
    "Karambi",
    "Kinkware",
    "Masasa",
    "Rebero",
    "Remera",
  ],

  // Karago Sector
  "Nyabihu|Karago|Busoro": [
    "Gasasa",
    "Gatagara",
    "Gisesa",
    "Kageshi",
    "Kagohe",
    "Rebero",
    "Ruhigiro",
  ],
  "Nyabihu|Karago|Cyamabuye": [
    "Buremera",
    "Kinyanja",
    "Matyazo",
    "Muderi",
    "Muremure",
    "Nanga",
    "Nkomane",
    "Rubare",
  ],
  "Nyabihu|Karago|Gatagara": [
    "Bikereri",
    "Budacya",
    "Gatwe",
    "Gisunzu",
    "Karambi",
    "Kinanira",
    "Muvure",
  ],
  "Nyabihu|Karago|Gihirwa": [
    "Biseke",
    "Gifumba",
    "Kanombe",
    "Nyagasozi",
    "Rugarambiro",
    "Rurambo",
  ],
  "Nyabihu|Karago|Kadahenda": [
    "Bukongora",
    "Gakoma",
    "Gihira",
    "Karandaryi",
    "Kivunja",
    "Muremure",
    "Mwiyanike",
    "Nkomane",
    "Nyaburaro",
  ],
  "Nyabihu|Karago|Karengera": [
    "Hanika",
    "Kirwa",
    "Mashyuza",
    "Remera",
    "Ruyebe",
    "Rwumuyaga",
  ],

  // Kintobo Sector
  "Nyabihu|Kintobo|Gatovu": [
    "Gatovu Centre",
    "Giharo",
    "Nyagitaba",
    "Nyarusekera",
    "Rubande",
  ],
  "Nyabihu|Kintobo|Kintobo": [
    "Bikingi",
    "Gakoro",
    "Gasura",
    "Gasyo",
    "Kansesa",
  ],
  "Nyabihu|Kintobo|Nyagisozi": [
    "Dehero",
    "Hungiro",
    "Nyanshundura",
    "Rutoyi",
    "Sinayi",
  ],
  "Nyabihu|Kintobo|Nyamugari": [
    "Kabagundu",
    "Kariyeri",
    "Karucuranya",
    "Kiyumba",
    "Kizunga",
  ],
  "Nyabihu|Kintobo|Rukondo": ["Kamanga", "Kankima", "Kimpundu", "Mugogo"],
  "Nyabihu|Kintobo|Ryinyo": [
    "Gahwege",
    "Gasenyi",
    "Humiro",
    "Kabashumba Centre",
    "Kadaterurwa",
    "Kirwa",
    "Rwamikeri",
  ],

  // Mukamira Sector
  "Nyabihu|Mukamira|Gasizi": ["Kamiro", "Sasangabo"],
  "Nyabihu|Mukamira|Jaba": [
    "Biriba",
    "Butondwe",
    "Gisenyi",
    "Hesha",
    "Nyirabashenyi",
    "Rwanyirangeni",
  ],
  "Nyabihu|Mukamira|Kanyove": ["Kabere", "Kanyove", "Musumba", "Rwaseka"],
  "Nyabihu|Mukamira|Rubaya": [
    "Cyivugiza",
    "Gashonero",
    "Kaburende",
    "Karandaryi",
    "Kinyababa",
    "Rwamikeri",
  ],
  "Nyabihu|Mukamira|Rugeshi": [
    "Cyinkenke",
    "Cyumukenke",
    "Kamenyo",
    "Karama",
    "Kazibake",
    "Kazuba",
  ],
  "Nyabihu|Mukamira|Rukoma": [
    "Bihinga",
    "Gatare",
    "Gitete",
    "Pfunda",
    "Rugaragara",
  ],
  "Nyabihu|Mukamira|Rurengeri": [
    "Kabyaza",
    "Kibugazi",
    "Maziba",
    "Rugarambiro",
    "Rutovu",
    "Rwankeri",
  ],

  // Muringa Sector
  "Nyabihu|Muringa|Gisizi": [
    "Kabyuma",
    "Kinihira",
    "Kinyasenge",
    "Munini",
    "Muremure",
  ],
  "Nyabihu|Muringa|Mulinga": [
    "Bunywero",
    "Gakamba",
    "Gora",
    "Kamazage",
    "Kiruma",
    "Kivugiza",
    "Migongo",
    "Ruganda",
    "Rurambo",
  ],
  "Nyabihu|Muringa|Mwiyanike": [
    "Gitebe",
    "Kayanza",
    "Kivuruga",
    "Mucundebo",
    "Musaraba",
    "Nyankukuma",
    "Ryamwana",
    "Ryanyirandaba",
  ],
  "Nyabihu|Muringa|Nkomane": [
    "Kamajanga",
    "Kigusa",
    "Kinaba",
    "Mabare",
    "Muremure",
  ],
  "Nyabihu|Muringa|Nyamasheke": [
    "Bambiro",
    "Kanwiri",
    "Muyange",
    "Nyamasheke",
    "Rubare",
  ],
  "Nyabihu|Muringa|Rwantobo": [
    "Gasura",
    "Karambi",
    "Musenyi",
    "Ntango",
    "Rurembo",
    "Rwandarugari",
  ],

  // Rambura Sector
  "Nyabihu|Rambura|Birembo": [
    "Birembo",
    "Cyugi",
    "Kimisebeya",
    "Mariba",
    "Munyangari",
    "Nyavuvu",
    "Rugarambiro",
  ],
  "Nyabihu|Rambura|Guriro": [
    "Cyanika",
    "Kimisebeya",
    "Nteko",
    "Nyanguragura",
    "Raro",
    "Rusogo",
  ],
  "Nyabihu|Rambura|Kibisabo": [
    "Bugonde",
    "Gatare",
    "Kabeza",
    "Karambi",
    "Kinihira",
    "Nyampuhu",
    "Rwenzo",
  ],
  "Nyabihu|Rambura|Mutaho": [
    "Bihangara",
    "Bukinanyana",
    "Kiraza",
    "Murambi",
    "Nyiragikokora",
    "Rusekera",
    "Rutazigurwa",
    "Sukiro",
  ],
  "Nyabihu|Rambura|Nyundo": [
    "Gasiza",
    "Kamifuho",
    "Myumba",
    "Nama",
    "Ntagihendo",
    "Nyempanika",
    "Rusereka",
    "Rwinkingi",
  ],
  "Nyabihu|Rambura|Rugamba": [
    "Giharo",
    "Kamiro",
    "Kibumbiro",
    "Muturagara",
    "Muturirwa",
    "Nkomane",
  ],

  // Rugera Sector
  "Nyabihu|Rugera|Gakoro": [
    "Bweru",
    "Kintore",
    "Mubuga",
    "Nyakigezi",
    "Nyarubingo",
    "Nyarusange",
  ],
  "Nyabihu|Rugera|Marangara": [
    "Bwumba",
    "Gasayo",
    "Gasiza",
    "Giko",
    "Kabahendanyi",
    "Kagano",
    "Nyagasozi",
    "Rwangege",
    "Tetero",
  ],
  "Nyabihu|Rugera|Nyagahondo": [
    "Buhete",
    "Gitotsi",
    "Kabyaza",
    "Muhare",
    "Munyinya",
    "Musenyi",
    "Nganzo",
  ],
  "Nyabihu|Rugera|Nyarutembe": [
    "Gatyazo",
    "Gisenyi",
    "Jari",
    "Kamenyo",
    "Kibumba",
    "Kirebe",
    "Mwambi",
    "Nyamugari",
  ],
  "Nyabihu|Rugera|Rurembo": [
    "Bihe",
    "Bukango",
    "Cyasenge",
    "Gahama",
    "Gaseke",
    "Gihuri",
    "Karambi",
    "Murama",
  ],
  "Nyabihu|Rugera|Tyazo": [
    "Harabana",
    "Kabuye",
    "Kingona",
    "Kiyanza",
    "Mucaca",
    "Murengeri",
    "Nyakiriba",
  ],

  // Rurembo Sector
  "Nyabihu|Rurembo|Gahondo": [
    "Bihira",
    "Gahoko",
    "Gitega",
    "Kamahwera",
    "Kanama",
    "Kazuba",
    "Murungu",
    "Musenyi",
    "Rugendabari",
    "Rwamigega",
  ],
  "Nyabihu|Rurembo|Gitega": [
    "Bukangano",
    "Cyanika",
    "Cyivugiza",
    "Cyuve",
    "Gitega",
    "Kagusa",
    "Rurambo",
  ],
  "Nyabihu|Rurembo|Kirimbogo": [
    "Cyayu",
    "Cyinkware",
    "Cyogo",
    "Gabiro",
    "Gasenyi",
    "Karuhara",
    "Kinaba",
    "Nturo",
    "Nturoyinkoko",
  ],
  "Nyabihu|Rurembo|Murambi": [
    "Bugeshi",
    "Gahondo",
    "Gisoro",
    "Kabyaza",
    "Karambi",
    "Karuhindu",
    "Kidomo",
    "Mpinga",
    "Muremure",
    "Nyarukangaga",
    "Rubavu",
    "Rubona I",
  ],
  "Nyabihu|Rurembo|Mwana": [
    "Busenge",
    "Kamugarura",
    "Karukungu",
    "Murama",
    "Mwana",
    "Nemba",
    "Nyagahangara",
  ],
  "Nyabihu|Rurembo|Rwaza": [
    "Gatobo",
    "Gifunzo",
    "Kabutozi",
    "Kamenyo I",
    "Kamenyo II",
    "Muhungwe",
    "Murama",
    "Musekera",
    "Musenyi",
    "Musezero",
    "Muturagara",
    "Rubona II",
    "Rugarambiro",
    "Rugote",
    "Rwanika",
    "Tubuye",
  ],

  // Shyira Sector
  "Nyabihu|Shyira|Cyimanzovu": [
    "Bihembe",
    "Cyinyana",
    "Kabuga",
    "Mugwato",
    "Murikwa",
  ],
  "Nyabihu|Shyira|Kanyamitana": [
    "Kamahoro",
    "Kazirankara",
    "Kibuye",
    "Kigabiro",
    "Kabagabo",
    "Rubaba",
  ],
  "Nyabihu|Shyira|Kintarure": [
    "Kabagabo",
    "Kabuguzo",
    "Mabare",
    "Munanira",
    "Remera",
  ],
  "Nyabihu|Shyira|Mpinga": [
    "Gacurabwenge",
    "Kagongo",
    "Mukaka",
    "Rwabahungu",
    "Vunga",
  ],
  "Nyabihu|Shyira|Mutanda": ["Kaziba", "Kidandari", "Murambi", "Ntende"],
  "Nyabihu|Shyira|Shaki": [
    "Gitega",
    "Kabuga",
    "Karambi",
    "Kirwa",
    "Kiyovu",
    "Rutoyi",
  ],
  // ============================================================
  // WEST PROVINCE - Rusizi District
  // ============================================================

  // Bugarama Sector
  "Rusizi|Bugarama|Nyange": [
    "Cit?",
    "Cyagara",
    "Gatebe",
    "Kabeza",
    "Kamabuye",
    "Mihabura",
    "Misufi",
    "Mubogora",
    "Muko",
    "Munini",
    "Nyange",
    "Rubumba",
    "Rusayo",
  ],
  "Rusizi|Bugarama|Pera": [
    "Buhanga",
    "Isangano",
    "Ituze",
    "Kabusunzu",
    "Kabuye",
    "Kinamba",
    "Kiyovu",
    "Majyambere",
    "Murambi",
    "Murwa",
    "Mwaro",
    "Pera",
  ],
  "Rusizi|Bugarama|Ryankana": [
    "Gihigano",
    "Gombaniro",
    "Kabuga",
    "Kagarama",
    "Kayenzi",
    "Mahoro",
    "Mubombo",
    "Muyange",
    "Nyehonga",
    "Rubyiro",
    "Ruhwa",
    "Rusizi",
  ],

  // Butare Sector (Rusizi)
  "Rusizi|Butare|Butanda": [
    "Buganzo",
    "Gasihe",
    "Gitega",
    "Murambi",
    "Mwoya",
    "Rugera",
    "Rujagi",
  ],
  "Rusizi|Butare|Gatereri": [
    "Giciramata",
    "Gisovu",
    "Kabuga",
    "Karama",
    "Kareba",
    "Nyabitimbo",
    "Nyaburenge",
    "Nyakibanda",
    "Nyambeho",
    "Ruhinga",
    "Rwibutso",
  ],
  "Rusizi|Butare|Nyamihanda": [
    "Kenya",
    "Kirwano",
    "Munkamba",
    "Mwimerere",
    "Ndengerezi",
    "Rushwati",
  ],
  "Rusizi|Butare|Rwambogo": [
    "Bisengo",
    "Buye",
    "Byimana",
    "Cyaruhiza",
    "Cyijuru",
    "Gasumo",
    "Karambo",
    "Kigarama",
    "Nyaruteja",
    "Rutovu",
  ],

  // Bweyeye Sector
  "Rusizi|Bweyeye|Gikungu": ["Kibonajoro", "Rwamagare"],
  "Rusizi|Bweyeye|Kiyabo": [
    "Bunyagiro",
    "Matyazo",
    "Mbisabasaba",
    "Mudasomwa",
    "Mutara",
    "Ruhondo",
    "Runege",
    "Rutobo",
  ],
  "Rusizi|Bweyeye|Murwa": ["Muyebe", "Nyabigoma"],
  "Rusizi|Bweyeye|Nyamuzi": ["Gakopfo", "Kigobe", "Muhiza", "Rwamisave"],
  "Rusizi|Bweyeye|Rasano": [
    "Banamba",
    "Kabuga",
    "Nyamirambo",
    "Nyamutake",
    "Runyami",
    "Runyovu",
    "Uwinzovu",
  ],

  // Gashonga Sector
  "Rusizi|Gashonga|Birembo": ["Mariba", "Burama"],
  "Rusizi|Gashonga|Buhokoro": [
    "Busekera",
    "Cyimbazi",
    "Gahinga",
    "Kabahizi",
    "Ryagacece",
  ],
  "Rusizi|Gashonga|Kabakobwa": ["Gatare", "Munini", "Rango", "Rwesero"],
  "Rusizi|Gashonga|Kacyuma": ["Mubuga", "Mukaba", "Rango", "Torero"],
  "Rusizi|Gashonga|Kamurehe": [
    "Gacyamo",
    "Gasharu",
    "Kamonyi",
    "Mashya",
    "Murehe",
    "Nyabihanga",
    "Rebero",
    "Shara",
  ],
  "Rusizi|Gashonga|Karemereye": [
    "Kabaha",
    "Kabahinda",
    "Kagikongoro",
    "Mibirizi",
    "Rugarama",
  ],
  "Rusizi|Gashonga|Muti": ["Gakombe", "Kabeza", "Karenge", "Marebe", "Rugende"],
  "Rusizi|Gashonga|Rusayo": [
    "Bitaba",
    "Kamuhana",
    "Kibombwe",
    "Kiremereye",
    "Misave",
    "Nyamutarama",
    "Ryagatebe",
  ],

  // Giheke Sector
  "Rusizi|Giheke|Cyendajuru": ["Burembo", "Kabeza", "Kibakure", "Murinzi"],
  "Rusizi|Giheke|Gakomeye": [
    "Buzi",
    "Gacyamo",
    "Kabuga",
    "Kagarama",
    "Ruvumbu",
  ],
  "Rusizi|Giheke|Giheke": [
    "Karambo",
    "Murambi",
    "Rugombo",
    "Rwumvangoma",
    "Wimana",
  ],
  "Rusizi|Giheke|Kamashangi": ["Gitwa", "Isha", "Kamuhozi", "Rukombe"],
  "Rusizi|Giheke|Kigenge": ["Gahinga", "Gahurubuka", "Rwamiko"],
  "Rusizi|Giheke|Ntura": [
    "Bubanga",
    "Kabujyogoro",
    "Kabyuma",
    "Karambi",
    "Kavuye",
    "Kigenge",
    "Ntura",
    "Rebero",
  ],
  "Rusizi|Giheke|Rwega": ["Impala", "Kanoga", "Rwega"],
  "Rusizi|Giheke|Turambi": ["Kamuhoza", "Munyove", "Rwinkwavu", "Turambi"],

  // Gihundwe Sector
  "Rusizi|Gihundwe|Burunga": [
    "Burunga",
    "Cyapa",
    "Cyunyu",
    "Gacamahembe",
    "Kamabuye",
    "Kanombe",
    "Karangiro",
    "Karitasi",
    "Karorabose",
    "Karushaririza",
  ],
  "Rusizi|Gihundwe|Gatsiro": [
    "Gahinga",
    "Gikombe",
    "Kavumu",
    "Kinyereri",
    "Mpongora",
    "Rwahi",
    "Tuwonane",
  ],
  "Rusizi|Gihundwe|Gihaya": ["Budorozo", "Kinyaga"],
  "Rusizi|Gihundwe|Kagara": [
    "Bahemba",
    "Kivoga",
    "Nyandarama",
    "Rubenga I",
    "Rubenga II",
    "Rukohwa",
  ],
  "Rusizi|Gihundwe|Kamatita": [
    "Cyinzovu",
    "Gahwazi",
    "Kamanyenga",
    "Muhari",
    "Munyana",
    "Ngoma",
  ],
  "Rusizi|Gihundwe|Shagasha": [
    "Bisanganira",
    "Gasharu",
    "Gitwa",
    "Kanoga",
    "Karambo",
    "Nyagatare",
    "Shagasha",
  ],

  // Gikundamvura Sector
  "Rusizi|Gikundamvura|Kizura": [
    "Gasharu",
    "Gitambi",
    "Hinduka",
    "Ituze",
    "Kamabuye",
    "Mubera",
    "Mutonga",
    "Ruhango",
    "Rukuraza",
    "Shanike",
  ],
  "Rusizi|Gikundamvura|Mpinga": [
    "Birindiro",
    "Busarabuye",
    "Bushenge",
    "Gihomba",
    "Kaberenge",
    "Kagari",
    "Kirume",
    "Matyazo",
    "Mpuzamahanga",
    "Mubuga",
    "Mugerero",
    "Nyabihanga",
    "Rebero",
  ],
  "Rusizi|Gikundamvura|Nyamigina": [
    "Binyaburanga",
    "Buhinga",
    "Bumaranyota",
    "Bwiza",
    "Jyambere",
    "Kanoga",
    "Kariba",
  ],

  // Gitambi Sector
  "Rusizi|Gitambi|Cyingwa": [
    "Kabucuku",
    "Kabugarama",
    "Mpinga",
    "Mugenge",
    "Rwihene",
  ],
  "Rusizi|Gitambi|Gahungeri": [
    "Kamagaju",
    "Kamonyi",
    "Kaninda",
    "Kazinda",
    "Kigarama",
    "Mugerero",
    "Njambwe",
    "Nyakibingo",
    "Nyamaganda",
    "Nyantaba",
  ],
  "Rusizi|Gitambi|Hangabashi": [
    "Kabonabose",
    "Kabuga",
    "Karambo",
    "Kirehe",
    "Nzabuhaha",
    "Runanira",
  ],
  "Rusizi|Gitambi|Mashesha": [
    "Busasamana",
    "Idaga",
    "Kankuba",
    "Karama",
    "Nyakivomero",
    "Ruvuruga",
  ],

  // Kamembe Sector
  "Rusizi|Kamembe|Cyangugu": [
    "Gatovu",
    "Karambo",
    "Karangiro",
    "Mont Cyangugu",
    "Mundima",
    "Ngoma",
    "Ntwari",
  ],
  "Rusizi|Kamembe|Gihundwe": [
    "Batero",
    "Burunga",
    "Kabeza",
    "Munyinya",
    "Murambi",
    "Nkurunziza",
  ],
  "Rusizi|Kamembe|Kamashangi": [
    "Amahoro",
    "Badura",
    "Gitinda",
    "Kadasomwa",
    "Kannyogo",
    "Mbagira",
    "Mucyamo",
    "Ntemabiti",
    "Nyakayonga",
    "Rushakamba",
    "Umuganda",
  ],
  "Rusizi|Kamembe|Kamurera": ["Cyapa", "Gikombe", "Kamuhirwa", "Murangi"],
  "Rusizi|Kamembe|Ruganda": ["Kadashya", "Kamubaji", "Murindi", "Ruhimbi"],

  // Muganza Sector (Rusizi)
  "Rusizi|Muganza|Cyarukara": [
    "Gashinjano",
    "Gashisha",
    "Gisozi",
    "Kabamba",
    "Murira",
    "Nyakagoma",
    "Rubumba",
    "Rubyiro",
    "Rungunga",
  ],
  "Rusizi|Muganza|Gakoni": [
    "Gatabuvuga",
    "Gatanga",
    "Kabeza",
    "Kindobwe",
    "Kiyovu",
    "Muhuta",
    "Nyakagenge",
    "Rebero",
    "Rugaragara",
    "Sanganiro",
    "Sano",
    "Umutuzo",
  ],
  "Rusizi|Muganza|Shara": [
    "Busasamana",
    "Gakenke",
    "Kabarore",
    "Kamabuye",
    "Murabyo",
    "Nyabishunju",
    "Nyenyeri",
    "Ramiro",
    "Rubeho",
  ],

  // Mururu Sector
  "Rusizi|Mururu|Gahinga": [
    "Birogo",
    "Buremera",
    "Cyirabyo A",
    "Cyirabyo B",
    "Gipfura",
    "Kabirizi",
    "Kamarebe",
    "Kanunga",
    "Mutara",
    "Ryabadugu",
  ],
  "Rusizi|Mururu|Kabahinda": ["Kabahire", "Karambo", "Winteko"],
  "Rusizi|Mururu|Kabasigirira": ["Bitongo", "Butazigurwa", "Mutimasi"],
  "Rusizi|Mururu|Kagarama": ["Cyete", "Gikungwe", "Gitwa", "Kamatene"],
  "Rusizi|Mururu|Karambi": ["Bugayi", "Gihango", "Kagarama"],
  "Rusizi|Mururu|Miko": ["Kabageni", "Nyakanyinya", "Ruhimbi"],
  "Rusizi|Mururu|Tara": [
    "Byangoma",
    "Cyandarama",
    "Gatimbwa",
    "Kamutongo",
    "Karanjwa",
    "Mukorazuba",
    "Mutongo",
    "Rugerero",
  ],

  // Nkanka Sector
  "Rusizi|Nkanka|Gitwa": [
    "Buganda",
    "Burege",
    "Kanyombya",
    "Karama",
    "Muhonga",
    "Rugarika",
  ],
  "Rusizi|Nkanka|Kamanyenga": [
    "Gatebe",
    "Hepfo",
    "Kavogo",
    "Muramba",
    "Nyabiranga",
    "Rweya",
  ],
  "Rusizi|Nkanka|Kangazi": [
    "Bahemba",
    "Busekanka",
    "Gafoka",
    "Muyange",
    "Rusunyu",
  ],
  "Rusizi|Nkanka|Kinyaga": [
    "Kabutimbiri",
    "Kinyaga",
    "Miramba",
    "Rugaragara",
    "Sumoyamana",
  ],
  "Rusizi|Nkanka|Rugabano": [
    "Bitaba",
    "Kagarama",
    "Kamahoro",
    "Karambo",
    "Rebero",
    "Rurembo",
  ],

  // Nkombo Sector
  "Rusizi|Nkombo|Bigoga": [
    "Gisunyu",
    "Giteme",
    "Kabashinga",
    "Ngoma",
    "Nyawenya",
    "Rebero",
  ],
  "Rusizi|Nkombo|Bugarura": ["Gaturo", "Nyakabanda", "Nyankumbira", "Rurembo"],
  "Rusizi|Nkombo|Ishywa": ["Biraro", "Kaboneke", "Kabuga", "Mapfura"],
  "Rusizi|Nkombo|Kamagimbo": [
    "Gashara",
    "Gitwa",
    "Kabuye",
    "Kanyinya",
    "Karenge",
    "Mbuga",
    "Muhora",
  ],
  "Rusizi|Nkombo|Rwenje": ["Gituro", "Mirara", "Nyabintare", "Rutarakiro"],

  // Nkungu Sector
  "Rusizi|Nkungu|Gatare": [
    "Bahuro",
    "Cyandarama",
    "Kimpundu",
    "Kivugiza",
    "Madaho",
    "Njambwe",
    "Rubona",
    "Rutegamatwi",
  ],
  "Rusizi|Nkungu|Kiziguro": [
    "Byugaro",
    "Gasarabuye",
    "Kabigohe",
    "Kabuga",
    "Kabuganza",
    "Kadashya",
    "Kamabuye",
    "Karongoro",
    "Mpinga",
    "Mukenke",
    "Rebero",
    "Ryamibuga",
  ],
  "Rusizi|Nkungu|Mataba": [
    "Gashashi",
    "Gatagara",
    "Gatondo",
    "Gikombe",
    "Honga",
    "Kabinyugwe",
    "Kamajumba",
    "Migazo",
    "Muhora",
    "Rubona",
    "Rwamaraba",
  ],
  "Rusizi|Nkungu|Ryamuhirwa": [
    "Gako",
    "Gatarange",
    "Kigurwe",
    "Kinanira",
    "Kiyanza",
    "Nyarushishi",
    "Rugabe",
    "Rususa",
    "Ryamaraza",
  ],

  // Nyakabuye Sector
  "Rusizi|Nyakabuye|Gasebeya": [
    "Biteri",
    "Gacyamo",
    "Gahuna",
    "Gaseke",
    "Gashyuha",
    "Kabuye",
    "Kanoga",
    "Karambi",
    "Kaveya",
  ],
  "Rusizi|Nyakabuye|Gaseke": [
    "Bitendezi",
    "Gatambamo",
    "Kagabiro",
    "Kagenge",
    "Kinunga",
    "Muyange",
    "Rubona",
  ],
  "Rusizi|Nyakabuye|Kamanu": [
    "Bikinga",
    "Bugumya",
    "Gatare",
    "Gishagara",
    "Kamusana",
    "Kiyovu",
    "Mpoga",
    "Mukondo",
    "Murambi",
    "Nyakagoma",
    "Nyeshati",
    "Ruguti",
    "Ryamberu",
    "Segege",
    "Shaba",
    "Site",
  ],
  "Rusizi|Nyakabuye|Kiziho": [
    "Bunyereri",
    "Kamagerero",
    "Makoko",
    "Nkanga",
    "Ruhinga",
    "Rwimbogo",
  ],
  "Rusizi|Nyakabuye|Mashyuza": [
    "Cyamura",
    "Kibirizi",
    "Nyamaronko",
    "Ruganzu",
    "Rukamba",
  ],
  "Rusizi|Nyakabuye|Nyabintare": [
    "Barenga",
    "Gakungu",
    "Gatanga",
    "Gatare",
    "Mabuye",
    "Mizibira",
    "Peru",
    "Ryarubaka",
  ],

  // Nyakarenzo Sector
  "Rusizi|Nyakarenzo|Gatare": ["Bigando", "Kabumbwe", "Rwindare"],
  "Rusizi|Nyakarenzo|Kabagina": [
    "Bitaba",
    "Gacyamo",
    "Gitovu",
    "Karambi",
    "Nyamugari",
  ],
  "Rusizi|Nyakarenzo|Kabuye": [
    "Bisenyi",
    "Kazuba",
    "Kigarama",
    "Mashya",
    "Mugerero",
    "Nyamagana",
    "Nyungu",
  ],
  "Rusizi|Nyakarenzo|Kanoga": ["Kamanura", "Kanoga", "Kanyovu", "Kumana"],
  "Rusizi|Nyakarenzo|Karangiro": ["Cyimbogo", "Gihusi", "Gituza", "Kabayego"],
  "Rusizi|Nyakarenzo|Murambi": ["Gisovu", "Njambwe", "Runyanzovu"],
  "Rusizi|Nyakarenzo|Rusambu": ["Gataramo", "Karambi", "Mugongo", "Rusambu"],

  // Nzahaha Sector
  "Rusizi|Nzahaha|Butambamo": [
    "Gashagwa",
    "Karunyerera",
    "Muguri",
    "Ngoma",
    "Ryarusaro",
  ],
  "Rusizi|Nzahaha|Kigenge": ["Gihungwe", "Kacyiru", "Karagizwa", "Ndabereye"],
  "Rusizi|Nzahaha|Murya": [
    "Buganza",
    "Gacuriro",
    "Gisheke",
    "Kamina",
    "Nyagahanga",
    "Nyagasozi",
    "Ryagashyitsi",
    "Tare",
  ],
  "Rusizi|Nzahaha|Nyenji": [
    "Gasharu",
    "Gatare",
    "Kinengwe",
    "Murindi",
    "Ruganzu",
    "Rugunga",
  ],
  "Rusizi|Nzahaha|Rebero": ["Gatovu", "Giti", "Kabuyange", "Rukoro", "Shariyo"],
  "Rusizi|Nzahaha|Rwinzuki": [
    "Gasave",
    "Kabugabo",
    "Kibirezi",
    "Kiranga",
    "Murambi",
    "Nyagahinga",
    "Peru",
  ],

  // Rwimbogo Sector (Rusizi)
  "Rusizi|Rwimbogo|Karenge": [
    "Batura",
    "Gatanga",
    "Gishoma",
    "Makambi",
    "Nyabihanga",
    "Ruzeneko",
  ],
  "Rusizi|Rwimbogo|Muhehwe": [
    "Kibare",
    "Murama",
    "Musigiti",
    "Nyarusebeya",
    "Renga",
    "Rungunga",
  ],
  "Rusizi|Rwimbogo|Mushaka": [
    "Gakombe",
    "Gatambamo",
    "Kabajoba",
    "Kamabuye",
    "Nyagashora",
  ],
  "Rusizi|Rwimbogo|Rubugu": ["Gatare", "Ntenyi", "Nyange", "Rukombe"],
  "Rusizi|Rwimbogo|Ruganda": [
    "Cyunguriro",
    "Musumba",
    "Rubamba",
    "Rubuye",
    "Ruhinga",
  ],

  // ============================================================
  // WEST PROVINCE - Nyamasheke District
  // ============================================================

  // Bushekeri Sector
  "Nyamasheke|Bushekeri|Buvungira": [
    "Buhinga",
    "Bushekeri",
    "Buvungira",
    "Gasebeya",
    "Gisakura",
    "Kinzovu",
    "Mujabagiro",
    "Nkenga",
    "Ruvumbu",
    "Rwumba",
    "Winkamba",
    "Yove",
  ],
  "Nyamasheke|Bushekeri|Mpumbu": [
    "Bona",
    "Gahondo",
    "Kamina",
    "Karambi",
    "Kirombozi",
  ],
  "Nyamasheke|Bushekeri|Ngoma": [
    "Bitare",
    "Buhembe",
    "Bukiro",
    "Cyeshero",
    "Kagarama",
    "Kanyovu",
    "Mashuhira",
    "Rugeregere",
  ],
  "Nyamasheke|Bushekeri|Nyarusange": [
    "Butangata",
    "Gatoki",
    "Kinini",
    "Mubuga",
    "Nyanza",
    "Rundwe",
    "Rweza",
  ],

  // Bushenge Sector
  "Nyamasheke|Bushenge|Gasheke": [
    "Bagiramenyo",
    "Biguzi",
    "Bugungu",
    "Gasheke",
    "Gikombe",
    "Gitwa",
    "Kamayenga",
    "Kamucyamo",
    "Karambo",
    "Kigenge",
    "Kivoga",
    "Nyamikingo",
    "Rwashyamba",
  ],
  "Nyamasheke|Bushenge|Impala": [
    "Birava",
    "Buninda",
    "Bushenge",
    "Gasharu",
    "Gasumo",
    "Kabeza",
    "Mucuzi",
    "Rumanga",
    "Runyinya",
  ],
  "Nyamasheke|Bushenge|Kagatamu": [
    "Gashirabwoba",
    "Gasura",
    "Gatare",
    "Kagatamu",
    "Karunga",
    "Kidashira",
    "Maherero",
    "Ruhinamavi",
    "Ruhinga I",
    "Ruhinga II",
  ],
  "Nyamasheke|Bushenge|Karusimbi": [
    "Gahongo",
    "Gakombe",
    "Gasharu",
    "Karusimbi",
    "Kasenjara",
    "Kigaga",
    "Nyakagezi",
    "Remera",
    "Rwumuyaga",
  ],

  // Cyato Sector
  "Nyamasheke|Cyato|Bisumo": [
    "Gasasa",
    "Hangari",
    "Kabuga",
    "Kayo",
    "Munini",
    "Mutuntu",
    "Rugabe",
    "Rugarama",
    "Ruhengeri",
    "Rwaramba",
  ],
  "Nyamasheke|Cyato|Murambi": [
    "Bigeyo",
    "Cyato",
    "Kamonyi",
    "Karehe",
    "Matyazo",
    "Muhingo",
    "Muremure",
    "Murenge",
    "Mutiti",
    "Nkomero",
    "Nyakabingo",
  ],
  "Nyamasheke|Cyato|Mutongo": [
    "Bwanama",
    "Kavumu",
    "Kizinga",
    "Muyugiri",
    "Rushahaga",
    "Rusi",
    "Rutiritiri",
    "Yove",
  ],
  "Nyamasheke|Cyato|Rugari": [
    "Gakenke",
    "Gashihe",
    "Gituntu",
    "Karambo",
    "Ntsinduka",
    "Rubeho",
    "Rwumba",
  ],

  // Gihombo Sector
  "Nyamasheke|Gihombo|Butare": [
    "Butare",
    "Gahanda",
    "Gasharu",
    "Mbogo",
    "Nyakabungo",
    "Rugaragara",
    "Rwamatamu",
    "Rwatsi",
  ],
  "Nyamasheke|Gihombo|Gitwa": [
    "Birehe",
    "Bwerankori",
    "Doga",
    "Gasagara",
    "Gaseke",
    "Gasharu",
    "Kinanira",
    "Nyagahinga",
    "Ruboreza",
  ],
  "Nyamasheke|Gihombo|Jarama": [
    "Bigabiro",
    "Buseso",
    "Kadobogo",
    "Karehe",
    "Kibirizi",
    "Ruvumbu",
  ],
  "Nyamasheke|Gihombo|Kibingo": [
    "Gituruka",
    "Kigarama",
    "Mataba",
    "Nyabitare",
    "Nyarunyinya",
    "Rushoka",
    "Rusuzumiro",
    "Rwabisindu",
    "Rwanyundo",
  ],
  "Nyamasheke|Gihombo|Mubuga": [
    "Bungo",
    "Butembo",
    "Mubuga",
    "Muhavu",
    "Muhororo",
    "Ruhingo",
  ],

  // Kagano Sector
  "Nyamasheke|Kagano|Gako": [
    "Bagarama",
    "Gasharu",
    "Gitwa",
    "Kazibira",
    "Mpombo",
    "Musagara",
    "Remera",
    "Rushondi",
    "Rwangoma",
    "Rwisovu",
    "Ryarutungura",
  ],
  "Nyamasheke|Kagano|Mubumbano": [
    "Bisoro",
    "Gikomero",
    "Gitanga",
    "Kabagabo",
    "Kabuyekeru",
    "Mabungo",
    "Makoko",
    "Mikingo",
    "Murambi",
    "Nyagashinge",
    "Nyamirambo",
  ],
  "Nyamasheke|Kagano|Ninzi": [
    "Gasayo",
    "Gikuyu",
    "Kavune",
    "Mujabagiro",
    "Murwa",
    "Ninzi",
    "Nyabageni",
    "Rugabano",
  ],
  "Nyamasheke|Kagano|Rwesero": [
    "Gasharu",
    "Gitaba",
    "Kamasera",
    "Kijibamba",
    "Kirehe",
    "Mutusa",
    "Rwesero",
  ],
  "Nyamasheke|Kagano|Shara": [
    "Byahi",
    "Gahumba",
    "Gihinga",
    "Gisunzu",
    "Kaduha",
    "Kamabuye",
    "Kamina",
    "Kibare",
    "Matara",
    "Mugohe",
    "Murambi",
    "Ntumba",
    "Rambira",
  ],

  // Kanjongo Sector
  "Nyamasheke|Kanjongo|Kibogora": [
    "Bizenga",
    "Gataba",
    "Kabuyaga",
    "Kagarama",
    "Kivugiza",
    "Maseka",
    "Munini",
    "Nyagacaca",
    "Nyarusange",
    "Nyenyeri",
    "Rwakagaju",
  ],
  "Nyamasheke|Kanjongo|Kigarama": [
    "Gakomeye",
    "Gatare",
    "Gisagara",
    "Gitwa",
    "Kajumiro",
    "Karambi",
    "Karehe",
    "Murambi",
  ],
  "Nyamasheke|Kanjongo|Kigoya": [
    "Bujanga",
    "Kabaga",
    "Kigugu",
    "Kirambo",
    "Museke",
    "Nkero",
    "Ruganzu",
  ],
  "Nyamasheke|Kanjongo|Raro": [
    "Baraguma",
    "Gasihe",
    "Gasumo",
    "Kamabuye",
    "Kamina",
    "Musasa",
    "Rambura",
    "Rugeyo",
  ],
  "Nyamasheke|Kanjongo|Susa": [
    "Gakenke",
    "Gatebe",
    "Kamuramira",
    "Kibazi",
    "Marongi",
    "Nyarubura",
    "Ruganda",
    "Wamugeyo",
  ],

  // Karambi Sector (Nyamasheke)
  "Nyamasheke|Karambi|Gasovu": [
    "Bitare",
    "Gasamba",
    "Gikangaga",
    "Gitwa",
    "Kabeza",
    "Murambi",
    "Nyarugenge",
    "Rurembo",
    "Ryanyagahangara",
  ],
  "Nyamasheke|Karambi|Gitwe": [
    "Giti",
    "Gitwe",
    "Kamina",
    "Karongi",
    "Kibiko",
    "Mburabuturo",
    "Rubingo",
  ],
  "Nyamasheke|Karambi|Kabuga": [
    "Bugarama",
    "Gaseke",
    "Kamukiza",
    "Kanombe",
    "Mugohe",
    "Munini",
    "Nyabitare",
    "Nyarusovu",
    "Rugano",
    "Rutiti",
  ],
  "Nyamasheke|Karambi|Kagarama": [
    "Bizimba",
    "Cyankuba",
    "Gituntu",
    "Kabingo",
    "Kamagese",
    "Karambo",
    "Misirimbo",
    "Rubona",
    "Tetero",
    "Wibungo",
  ],
  "Nyamasheke|Karambi|Rushyarara": [
    "Amizero",
    "Cyivugiza",
    "Kageyo",
    "Nkomero",
    "Rubyiruko",
    "Rudaga",
    "Ruzibira",
    "Rwunamuka",
    "Tyazo",
  ],

  // Karengera Sector (Nyamasheke)
  "Nyamasheke|Karengera|Gasayo": [
    "Gitwa",
    "Muganza",
    "Nyamugari",
    "Nyamurira",
    "Rubona",
  ],
  "Nyamasheke|Karengera|Gashashi": [
    "Kabuye",
    "Kanenge",
    "Karangiro",
    "Mwiyando",
    "Rwinkuba",
  ],
  "Nyamasheke|Karengera|Higiro": [
    "Gihaya",
    "Gitunda",
    "Mpinga",
    "Muhora",
    "Rujeberi",
    "Rukunguri",
  ],
  "Nyamasheke|Karengera|Miko": [
    "Boli",
    "Kabisheshe",
    "Karehe",
    "Mbanda",
    "Nyabwinshi",
    "Nyagisozi",
    "Nyamiyaga",
    "Rutare",
  ],
  "Nyamasheke|Karengera|Mwezi": [
    "Gakeri",
    "Gatagara",
    "Kamanu",
    "Nyagafunzo",
    "Nyagashikura",
    "Nyarusange",
    "Ruhabwa",
    "Ruhinga",
  ],

  // Kirimbi Sector
  "Nyamasheke|Kirimbi|Cyimpindu": [
    "Buha",
    "Gitwa",
    "Kamatare",
    "Katabaro",
    "Rugeregere",
    "Uwakibaba",
    "Uwamuduru",
    "Uwamugisha",
  ],
  "Nyamasheke|Kirimbi|Karengera": [
    "Gisenyi",
    "Kabuga",
    "Kaburiro",
    "Karambi",
    "Mitanga",
    "Mukoto",
    "Nduba",
    "Rubumba",
    "Rugote",
  ],
  "Nyamasheke|Kirimbi|Muhororo": [
    "Gabiro",
    "Gacumbi",
    "Giseke",
    "Gisesero",
    "Kigarama",
    "Nyagacaca",
    "Nyakabingo",
    "Rusebeya",
  ],
  "Nyamasheke|Kirimbi|Nyarusange": [
    "Bunyamanza",
    "Gisheke",
    "Gitsimbwe",
    "Mushungo",
    "Nyabinaga",
    "Rubona",
    "Rwamiko",
  ],

  // Macuba Sector
  "Nyamasheke|Macuba|Gatare": [
    "Buhoro",
    "Gaseke",
    "Gasharu",
    "Gashwi",
    "Kabeza",
    "Kayenzi",
    "Murama",
    "Nyakabingo",
    "Rugarama",
    "Ryasagahara",
    "Wimana",
    "Wingabe",
  ],
  "Nyamasheke|Macuba|Mutongo": [
    "Kamina",
    "Kanyenkondo",
    "Karamba",
    "Nyabihanga",
    "Rupango",
    "Ryagatari",
    "Ryarugamba",
  ],
  "Nyamasheke|Macuba|Nyakabingo": [
    "Kajumiro",
    "Kanyege",
    "Mataba",
    "Musumba",
    "Mwasa",
    "Nyarunombe",
    "Rugote",
    "Rumamfu",
    "Rwankuba",
  ],
  "Nyamasheke|Macuba|Rugari": [
    "Bitaba",
    "Bunyamanza",
    "Butare",
    "Gatyazo",
    "Gitwa",
    "Kabuga",
    "Kazimba",
    "Kirehe",
    "Matare",
    "Munimba",
    "Nyakariba",
    "Rusozi",
    "Rutaragwe",
    "Rwambogo",
    "Rwamiko",
  ],
  "Nyamasheke|Macuba|Vugangoma": [
    "Bitega",
    "Bizi",
    "Cyijima",
    "Kagarama",
    "Kigandi",
    "Kirambira",
    "Nkuro",
    "Nyagahinga",
    "Nyarusange",
    "Wisovu",
  ],

  // Mahembe Sector
  "Nyamasheke|Mahembe|Gisoke": [
    "Fumba",
    "Giko",
    "Gisebeya",
    "Kamashinge",
    "Kanyoni",
    "Kivumu",
    "Muramba",
    "Nyabumera",
  ],
  "Nyamasheke|Mahembe|Kagarama": [
    "Gabiro",
    "Gasharu",
    "Giti",
    "Kanombe",
    "Kigara",
    "Mikingo",
    "Nyamiheha",
    "Ruhanga",
    "Rukaragata",
  ],
  "Nyamasheke|Mahembe|Nyagatare": [
    "Gatare",
    "Karambo",
    "Kizenga",
    "Murundo",
    "Nyagahima",
    "Nyakabande",
    "Uwamaheke",
  ],
  "Nyamasheke|Mahembe|Nyakavumu": [
    "Bigali",
    "Bisharara",
    "Bungo",
    "Cyinjira",
    "Cyiya",
    "Gitwa",
    "Nyarusiza",
  ],

  // Nyabitekeri Sector
  "Nyamasheke|Nyabitekeri|Kigabiro": [
    "Bunyenga",
    "Butsure",
    "Cyamuti",
    "Kabarore",
    "Kamahongo",
    "Kigarama",
    "Mariba",
    "Murambi",
    "Ruginga",
    "Rweru",
  ],
  "Nyamasheke|Nyabitekeri|Kinunga": [
    "Gahwazi",
    "Gasebeya",
    "Gashashi",
    "Kabanda",
    "Kagarama",
    "Karambi",
    "Kibanda",
    "Mukarange",
    "Muremure",
    "Rugarama",
    "Shenyeri",
  ],
  "Nyamasheke|Nyabitekeri|Mariba": [
    "Buhinga",
    "Gahuhezi",
    "Gakoma",
    "Kabacuzi",
    "Kabukunzi",
    "Kamabera",
    "Kamuhoza",
    "Karango",
    "Mataba",
    "Murenge",
    "Nyarusange",
  ],
  "Nyamasheke|Nyabitekeri|Muyange": [
    "Buhokoro",
    "Bukiro",
    "Bukuri",
    "Gafunzo",
    "Gahabwa",
    "Gikombe",
    "Kazibo",
    "Nyange",
    "Taba",
    "Tundwe",
  ],
  "Nyamasheke|Nyabitekeri|Ntango": [
    "Bugiga",
    "Buhinga",
    "Kankoni",
    "Kanombe",
    "Kayenzi",
    "Murambi",
    "Nyamirundi",
    "Rebero",
    "Ruhonga",
  ],

  // Rangiro Sector
  "Nyamasheke|Rangiro|Banda": [
    "Bururi",
    "Gahira",
    "Gasumo",
    "Nkamba",
    "Uwakagano",
  ],
  "Nyamasheke|Rangiro|Gakenke": [
    "Gahisi",
    "Gasovu",
    "Kamatsira",
    "Ruhana",
    "Rwasa",
  ],
  "Nyamasheke|Rangiro|Jurwe": [
    "Gasebeya",
    "Gatagara",
    "Kaneke",
    "Kibavu",
    "Rudehero",
    "Rugomero",
  ],
  "Nyamasheke|Rangiro|Murambi": [
    "Bigeyo",
    "Bunyenyezi",
    "Munini",
    "Murambi",
    "Nyakabingo",
    "Nyarwungo",
    "Ryarubasha",
  ],

  // Ruharambuga Sector
  "Nyamasheke|Ruharambuga|Kanazi": [
    "Gashwati",
    "Gitaba",
    "Kadashya",
    "Kamuhumuza",
    "Karambo",
    "Rubiha",
    "Rukerereza",
    "Rusambu",
    "Rwamahwa",
    "Ryamashuri",
  ],
  "Nyamasheke|Ruharambuga|Ntendezi": [
    "Gasharu",
    "Kacyiru",
    "Kagarama",
    "Kamabuye",
    "Kamonyi",
    "Karambi",
    "Kigabiro",
    "Kigenge",
    "Muko",
    "Nganzo",
    "Risansi",
    "Rukoma",
    "Wimpundu",
  ],
  "Nyamasheke|Ruharambuga|Save": [
    "Bigutu",
    "Gihinga",
    "Giko",
    "Kanyovu",
    "Manzi",
    "Munini",
    "Nkomero",
    "Nyamuhunga",
    "Save",
  ],
  "Nyamasheke|Ruharambuga|Wimana": [
    "Gacyamo",
    "Gakomeye",
    "Gasumo",
    "Gatanga",
    "Gikundamvura",
    "Kabusunzu",
    "Kamudende",
    "Mpinga",
    "Murambi",
    "Ngoboka",
    "Nkomero",
    "Nyarushwati",
    "Rugabano",
    "Rumuna",
    "Ryangange",
  ],

  // Shangi Sector
  "Nyamasheke|Shangi|Burimba": [
    "Busangati",
    "Gikombe",
    "Kabahande",
    "Nyakagano",
    "Nyakibingo",
    "Rubayi",
    "Rukohwa",
  ],
  "Nyamasheke|Shangi|Mataba": [
    "Gabiro",
    "Gasumo",
    "Mataba",
    "Mpishyi",
    "Ruzinga",
    "Rwabagoyi",
  ],
  "Nyamasheke|Shangi|Mugera": [
    "Bweranyange",
    "Karugero",
    "Karuhatana",
    "Karuhigi",
    "Kavo",
    "Rwonga",
  ],
  "Nyamasheke|Shangi|Nyamugari": [
    "Amahoro",
    "Bitaba",
    "Kabare",
    "Mpande",
    "Nyamateke",
    "Nyamihondo",
    "Rubavu",
  ],
  "Nyamasheke|Shangi|Shangi": [
    "Bugomba",
    "Busasamana",
    "Gasharu",
    "Kabere",
    "Karambo",
    "Ngoboka",
  ],
  // ============================================================
  // WEST PROVINCE - Ngororero District
  // ============================================================

  // Bwira Sector
  "Ngororero|Bwira|Bungwe": ["Gasura", "Kirwa", "Nkuri", "Rutembo", "Rutoyi"],
  "Ngororero|Bwira|Cyahafi": ["Bushyogero", "Cyahafi", "Kamina", "Rushubi"],
  "Ngororero|Bwira|Gashubi": [
    "Gasasa",
    "Gitonde",
    "Rugeshi",
    "Rukeri",
    "Rwamakara",
  ],
  "Ngororero|Bwira|Kabarondo": [
    "Bereshi",
    "Gitarama",
    "Kurushishi",
    "Mukingi",
    "Nyakarambi",
  ],
  "Ngororero|Bwira|Ruhindage": ["Kabirizi", "Kiregamazi", "Mwiha", "Nyabitare"],

  // Gatumba Sector
  "Ngororero|Gatumba|Cyome": [
    "Birambo",
    "Mpara",
    "Musagara",
    "Nyakagezi",
    "Ruvumu",
    "Rwasare",
  ],
  "Ngororero|Gatumba|Gatsibo": [
    "Gasave",
    "Gatongo",
    "Gatsibo",
    "Gatwa",
    "Kimirama",
    "Rutabataba",
    "Shyogi",
  ],
  "Ngororero|Gatumba|Kamasiga": [
    "Byimana",
    "Gasave",
    "Karehe",
    "Kavumu",
    "Nsyabire",
    "Nyenyeri",
  ],
  "Ngororero|Gatumba|Karambo": [
    "Gahinga",
    "Gitega",
    "Kabarore",
    "Karehe",
    "Kimisagara",
    "Nteko",
    "Rugara",
  ],
  "Ngororero|Gatumba|Ruhanga": [
    "Butare",
    "Gasagara",
    "Jimbu",
    "Kabeza",
    "Kadehero",
    "Kamina",
  ],
  "Ngororero|Gatumba|Rusumo": ["Kagarama", "Mataba", "Mukaragata", "Rusumo"],

  // Hindiro Sector
  "Ngororero|Hindiro|Buyungu": ["Gatare", "Kigarama", "Muhororo", "Nyagasozi"],
  "Ngororero|Hindiro|Gatega": [
    "Cyahafi",
    "Gapfura",
    "Gasharu",
    "Gasovu",
    "Huriro",
    "Kabenge",
    "Kagarama",
    "Rutsiro",
    "Sereri",
  ],
  "Ngororero|Hindiro|Kajinge": ["Bwoga", "Kamana", "Rugari", "Rugeshi"],
  "Ngororero|Hindiro|Marantima": [
    "Kagugu",
    "Karambo",
    "Kiribata",
    "Munyegera",
    "Muvugangoma",
    "Rugarika",
  ],
  "Ngororero|Hindiro|Rugendabari": ["Kabuga", "Kamonyi", "Mituga", "Mukoni"],
  "Ngororero|Hindiro|Runyinya": [
    "Marembo",
    "Murambi",
    "Rugarambiro",
    "Rwamiko",
  ],

  // Kabaya Sector
  "Ngororero|Kabaya|Busunzu": [
    "Gitaba",
    "Kabarenzi",
    "Kabere",
    "Kabuganza",
    "Kabusizi",
    "Kinyamiyaga",
  ],
  "Ngororero|Kabaya|Gaseke": [
    "Mbandari",
    "Mitabo",
    "Mizingo",
    "Muturagara",
    "Nyamugari",
    "Nyamweru",
    "Rugari",
  ],
  "Ngororero|Kabaya|Kabaya": [
    "Bitare",
    "Kimisagara",
    "Kiyovu",
    "Migongo",
    "Nyanza",
    "Rebero",
    "Rurembo",
    "Rwantozi",
  ],
  "Ngororero|Kabaya|Mwendo": [
    "Bukonde",
    "Butare",
    "Kabeza",
    "Karambi",
    "Merabuye",
    "Nyabarinda",
    "Rubambiro",
  ],
  "Ngororero|Kabaya|Ngoma": [
    "Gisebeya",
    "Gitumba",
    "Hanika",
    "Ngoma",
    "Nyamugeyo",
    "Rukorati",
    "Rutoyi",
  ],
  "Ngororero|Kabaya|Nyenyeri": [
    "Bukonde",
    "Gashyitsi",
    "Kabasare",
    "Kimiramba",
    "Kirwa",
    "Nyamugari",
    "Nyasenge",
  ],

  // Kageyo Sector (Ngororero)
  "Ngororero|Kageyo|Kageshi": [
    "Cyungo",
    "Kantara",
    "Kariha",
    "Mukaka",
    "Ruganda",
  ],
  "Ngororero|Kageyo|Kirwa": ["Gatovu", "Gihonga", "Kabagari", "Nyaruzenga"],
  "Ngororero|Kageyo|Mukore": [
    "Gaseke",
    "Gitongo",
    "Kabuhake",
    "Nyamatanga",
    "Rusenyi",
  ],
  "Ngororero|Kageyo|Muramba": ["Gashinge", "Kabyaza", "Murangara", "Rurambo"],
  "Ngororero|Kageyo|Nyamata": [
    "Bereshi",
    "Kabuga",
    "Kagarama",
    "Kibanda",
    "Nyamutuku",
  ],
  "Ngororero|Kageyo|Rwamamara": ["Gaseke", "Gasiza", "Giseke", "Mubuga"],

  // Kavumu Sector
  "Ngororero|Kavumu|Birembo": [
    "Buhuma",
    "Gashaki",
    "Kantobo",
    "Nyabitsina",
    "Rwanamiza",
  ],
  "Ngororero|Kavumu|Gitwa": [
    "Biraro",
    "Karambi",
    "Kaziba",
    "Nyamugari",
    "Nyarukara",
  ],
  "Ngororero|Kavumu|Murinzi": [
    "Cyasenge",
    "Gasibya",
    "Ntebeyinuma",
    "Nyaramba",
    "Ruhurura",
  ],
  "Ngororero|Kavumu|Nyamugeyo": [
    "Gatovu",
    "Kabere",
    "Karambo",
    "Murimba",
    "Nyabubanda",
  ],
  "Ngororero|Kavumu|Rugeshi": [
    "Cyuzi",
    "Gasumo",
    "Kabeza",
    "Karambi",
    "Mwiyanike",
  ],
  "Ngororero|Kavumu|Tetero": [
    "Bereshi",
    "Gatsibo",
    "Kasumo",
    "Mizingo",
    "Ruherahere",
  ],

  // Matyazo Sector
  "Ngororero|Matyazo|Binana": [
    "Busoro",
    "Kabuye",
    "Kaseke",
    "Kavumu",
    "Nyagisozi",
  ],
  "Ngororero|Matyazo|Gitega": [
    "Barama",
    "Gahanda",
    "Gasayo",
    "Gataka",
    "Kabara",
    "Rwankenke",
  ],
  "Ngororero|Matyazo|Matare": [
    "Gako",
    "Gitega",
    "Kamasorori",
    "Munyinya",
    "Mwumba",
    "Nyenyeri",
  ],
  "Ngororero|Matyazo|Rutare": [
    "Kabingo",
    "Nyakiliba",
    "Ruhurura",
    "Rwamabuye",
    "Shori",
  ],
  "Ngororero|Matyazo|Rwamiko": ["Butare", "Nyakibande", "Rusororo", "Rwamiko"],

  // Muhanda Sector
  "Ngororero|Muhanda|Bugarura": [
    "Bugarura",
    "Burorero",
    "Gatomvu",
    "Ngando",
    "Nkongora",
    "Runayu",
  ],
  "Ngororero|Muhanda|Gasiza": [
    "Gasiza",
    "Kabeza",
    "Kigina",
    "Nyenyeri",
    "Rukobora",
    "Rurandama",
    "Rwantobotobo",
  ],
  "Ngororero|Muhanda|Mashya": [
    "Byerezo",
    "Kagano",
    "Karuhindura",
    "Kazuba",
    "Rubaya",
  ],
  "Ngororero|Muhanda|Nganzo": [
    "Gisebeya",
    "Gisiza",
    "Gisunzu",
    "Misemburo",
    "Murehe",
    "Ntaruko",
  ],
  "Ngororero|Muhanda|Ngoma": [
    "Bugobora",
    "Gacaca",
    "Karambi",
    "Ntendure",
    "Rucano",
    "Ruganda",
  ],
  "Ngororero|Muhanda|Rutagara": [
    "Bambiro",
    "Gaseke",
    "Kabari",
    "Kamashya",
    "Mushishiro",
    "Nyamutoni",
    "Nyanshundura",
    "Rukondo",
    "Rurambo",
  ],

  // Muhororo Sector
  "Ngororero|Muhororo|Bweramana": [
    "Buyenzi",
    "Gasave",
    "Musanzubize",
    "Nyagaseke",
    "Ruhanga",
  ],
  "Ngororero|Muhororo|Mubuga": [
    "Burengo",
    "Gashonyi",
    "Gasovu",
    "Mitsimbi",
    "Murambi",
    "Nyabigogoro",
    "Nyamirama",
  ],
  "Ngororero|Muhororo|Myiha": ["Kabyiniro", "Myiha", "Shori"],
  "Ngororero|Muhororo|Rugogwe": ["Butinza", "Kibingo", "Murambi", "Nganzo"],
  "Ngororero|Muhororo|Rusororo": [
    "Buhiro",
    "Gapfura",
    "Gisovu",
    "Kagunga",
    "Rongi",
    "Ryabadanga",
  ],
  "Ngororero|Muhororo|Sanza": [
    "Gashyushya",
    "Kansi",
    "Mubuga",
    "Nyaruhondo",
    "Sanza",
  ],

  // Ndaro Sector
  "Ngororero|Ndaro|Bijyojyo": [
    "Bijyojyo",
    "Birima",
    "Cyajongo",
    "Gasave",
    "Kavumu",
    "Kibuga",
    "Runyoni",
    "Rutonde",
  ],
  "Ngororero|Ndaro|Bitabage": [
    "Gasharu",
    "Gituza",
    "Kamuyobora",
    "Kinga",
    "Nganzo",
    "Ngugu",
    "Nyamugari",
    "Rwamikeri",
  ],
  "Ngororero|Ndaro|Kabageshi": [
    "Gasharu",
    "Kabuga",
    "Kandamira",
    "Masoro",
    "Ruhanga",
  ],
  "Ngororero|Ndaro|Kibanda": [
    "Kamina",
    "Kideberi",
    "Kimirehe",
    "Kirombozi",
    "Ruhuha",
    "Rutambiro",
    "Rwamateke",
    "Rwambogo",
  ],
  "Ngororero|Ndaro|Kinyovi": ["Gahunga", "Giseke", "Rugeyo", "Rusebeya"],

  // Ngororero Sector
  "Ngororero|Ngororero|Kaseke": [
    "Cyandago",
    "Gatare",
    "Kabeza",
    "Kabusunzu",
    "Kanyinya",
    "Nyabisindu",
    "Nyamabuye",
    "Nyarubari",
  ],
  "Ngororero|Ngororero|Kazabe": [
    "Butezi",
    "Cyansi",
    "Kazabe",
    "Murambi",
    "Ngororero",
  ],
  "Ngororero|Ngororero|Mugano": [
    "Gashinya",
    "Kabuga",
    "Mana",
    "Manogo",
    "Mpara",
    "Nyabisindu",
    "Nyenyeri",
    "Ruhuha",
  ],
  "Ngororero|Ngororero|Nyange": [
    "Gatare",
    "Gihe",
    "Kabeza",
    "Karama",
    "Mazimeru",
    "Nyakaganzo",
    "Nyange",
    "Turamigina",
  ],
  "Ngororero|Ngororero|Rususa": [
    "Cyumba",
    "Gasarara",
    "Kabagari",
    "Nyarubingo",
    "Rukaragata",
    "Rususa",
  ],
  "Ngororero|Ngororero|Torero": [
    "Gatare",
    "Kanama",
    "Karera",
    "Nyakariba",
    "Nyamabuye",
    "Nyamiyaga",
    "Rwambariro",
  ],

  // Nyange Sector (Ngororero)
  "Ngororero|Nyange|Bambiro": [
    "Bugabe",
    "Butare",
    "Gakoma",
    "Muzi",
    "Nyarushubi",
    "Rwasankuba",
  ],
  "Ngororero|Nyange|Gaseke": [
    "Birambo",
    "Dutwe",
    "Gaseke",
    "Giko",
    "Ngobagoba",
  ],
  "Ngororero|Nyange|Nsibo": [
    "Cyambogo",
    "Kanyinya",
    "Muganza",
    "Murambi",
    "Nyange",
    "Nyarusange",
    "Vungu",
    "Zegenya",
  ],
  "Ngororero|Nyange|Vuganyana": [
    "Kakinyoni",
    "Kamuriza",
    "Karambo",
    "Kazenga",
    "Mbobo",
    "Ngorore",
    "Nyagatama",
    "Nyamyungo",
  ],

  // Sovu Sector
  "Ngororero|Sovu|Birembo": [
    "Kabayengo",
    "Mahembe",
    "Muyange",
    "Nshano",
    "Ruseke",
  ],
  "Ngororero|Sovu|Kagano": [
    "Gitabage",
    "Karambo",
    "Ndagarago",
    "Nyamuza",
    "Rusenge",
  ],
  "Ngororero|Sovu|Kanyana": [
    "Bitaba",
    "Gahombo",
    "Gashihe",
    "Mugobati",
    "Ruganda",
    "Rusebeya",
  ],
  "Ngororero|Sovu|Musenyi": [
    "Gihonga",
    "Gisakavu",
    "Gisiza",
    "Kabuga",
    "Rubindi",
  ],
  "Ngororero|Sovu|Nyabipfura": [
    "Butenga",
    "Gatare",
    "Migendezo",
    "Nyirabwina",
    "Sanzare",
  ],
  "Ngororero|Sovu|Rutovu": [
    "Gasiza",
    "Kanyirajana",
    "Kigusa",
    "Ngaza",
    "Ngugu",
    "Rukeri",
  ],

  // ============================================================
  // NORTH PROVINCE - Musanze District
  // ============================================================

  // Busogo Sector
  "Musanze|Busogo|Gisesero": ["Gahanga", "Jabiro", "Kabaya", "Nengo"],
  "Musanze|Busogo|Kavumu": [
    "Gatovu",
    "Karema",
    "Karuriza",
    "Mutaboneka",
    "Rugeshi",
  ],
  "Musanze|Busogo|Nyagisozi": [
    "Cyasure",
    "Gora",
    "Kabwenge",
    "Kirezi",
    "Rurembo",
  ],
  "Musanze|Busogo|Sahara": ["Nyarubuye", "Nyiragaju", "Rubaya", "Ryamukutsi"],

  // Cyuve Sector
  "Musanze|Cyuve|Bukinanyana": [
    "Bubandu",
    "Mubwiza",
    "Murambi",
    "Mwidagaduro",
    "Mwirongi",
    "Rugeshi",
  ],
  "Musanze|Cyuve|Buruba": [
    "Bazizana",
    "Kabahama",
    "Kamenantare",
    "Ruhindinka",
    "Rutemba",
    "Ruvumu",
  ],
  "Musanze|Cyuve|Cyanya": [
    "Kabaya",
    "Karugabanya",
    "Kayange",
    "Kibande",
    "Mubari",
    "Mubuga",
    "Mugarama",
    "Rebero",
    "Ruhehe",
  ],
  "Musanze|Cyuve|Kabeza": [
    "Bucuzi",
    "Gashangiro",
    "Kareba",
    "Karinzi",
    "Karunyura",
    "Kungo",
  ],
  "Musanze|Cyuve|Migeshi": [
    "Buremu",
    "Gakenke",
    "Kabaya",
    "Kamanga",
    "Kiviriza",
    "Mugari",
    "Nyaruyaga",
    "Rabika",
  ],
  "Musanze|Cyuve|Rwebeya": [
    "Marantima",
    "Mubuga",
    "Nganzo",
    "Nyarubande",
    "Nyiraruhengeri",
  ],

  // Gacaca Sector
  "Musanze|Gacaca|Gakoro": [
    "Butunda",
    "Cyiri",
    "Gahama",
    "Murora",
    "Murundo",
    "Nkomero",
  ],
  "Musanze|Gacaca|Gasakuza": [
    "Gasenyi",
    "Gataba",
    "Karushenyi",
    "Nyamugari",
    "Ruhasa",
    "Rurambo",
  ],
  "Musanze|Gacaca|Kabirizi": [
    "Gitovu",
    "Kabushanda",
    "Kanama",
    "Karama",
    "Mata",
    "Mukungwa",
    "Rungu",
  ],
  "Musanze|Gacaca|Karwasa": [
    "Burengo",
    "Kabukende",
    "Karambi",
    "Kavumu",
    "Sarazi",
  ],

  // Gashaki Sector
  "Musanze|Gashaki|Kigabiro": [
    "Birwa",
    "Butate",
    "Buzoza",
    "Kavumu",
    "Musekera",
    "Shanga",
  ],
  "Musanze|Gashaki|Kivumu": [
    "Burango",
    "Kamatete",
    "Makara",
    "Nyakariba",
    "Ruhehe",
  ],
  "Musanze|Gashaki|Mbwe": [
    "Budiho",
    "Gatete",
    "Kamato",
    "Kanzo",
    "Ngambi",
    "Raro",
  ],
  "Musanze|Gashaki|Muharuro": [
    "Bugabo",
    "Karuganda",
    "Kibinyogote",
    "Mucaca",
    "Murandi",
  ],

  // Gataraga Sector
  "Musanze|Gataraga|Mudakama": [
    "Gakuku",
    "Kagongo",
    "Kararo",
    "Mikingo",
    "Rubaka",
  ],
  "Musanze|Gataraga|Murago": [
    "Karurambi",
    "Manjari",
    "Rukingo",
    "Rusambu",
    "Rwinzovu",
  ],
  "Musanze|Gataraga|Rubindi": [
    "Butakanyundo",
    "Gacondo",
    "Gataraga",
    "Kabaya",
    "Kaberege",
  ],
  "Musanze|Gataraga|Rungu": [
    "Gahira",
    "Gatondori",
    "Gatovu",
    "Kampande",
    "Nyarubande",
  ],

  // Kimonyi Sector
  "Musanze|Kimonyi|Birira": [
    "Gakoro",
    "Kabagoyi",
    "Kadahenda",
    "Mbugayera",
    "Rurembo",
  ],
  "Musanze|Kimonyi|Buramira": [
    "Kabaya",
    "Kagwene",
    "Kamugeni",
    "Nyiramuyenzi",
    "Ruhinga",
  ],
  "Musanze|Kimonyi|Kivumu": [
    "Masoro",
    "Muregeya",
    "Musezero",
    "Ndorahe",
    "Nyamugari",
  ],
  "Musanze|Kimonyi|Mbizi": ["Buhuma", "Bushubi", "Gatumo", "Rugondo"],

  // Kinigi Sector
  "Musanze|Kinigi|Bisoke": [
    "Bunyenyeri",
    "Kamata",
    "Karambi",
    "Kazi",
    "Kumazi",
    "Shonero",
    "Susa",
  ],
  "Musanze|Kinigi|Kaguhu": [
    "Kabeza",
    "Kaniga",
    "Impano",
    "Musingi",
    "Myase",
    "Nyarusizi",
    "Nyundo",
    "Rugeshi",
    "Ruginga",
    "Rurembo",
  ],
  "Musanze|Kinigi|Kampanga": [
    "Kamakara",
    "Muhe",
    "Nyarubande",
    "Nyejoro",
    "Rubara",
    "Rugi",
    "Rutindo",
  ],
  "Musanze|Kinigi|Nyabigoma": [
    "Cyabirego",
    "Gahura",
    "Gasizi",
    "Kabatwa",
    "Karyasenge",
    "Mitobo",
    "Nyakagezi",
    "Nyakigina",
    "Rebero",
  ],
  "Musanze|Kinigi|Nyonirima": [
    "Bazizana",
    "Butorwa I",
    "Butorwa II",
    "Gahisi",
    "Gasura",
    "Kansoro",
    "Kanyampereri",
    "Nyagisenyi",
  ],

  // Muhoza Sector
  "Musanze|Muhoza|Cyabararika": [
    "Buhuye",
    "Bwuzuri",
    "Gasanze",
    "Gatare",
    "Gatorwa",
    "Kabogobogo",
    "Yorodani",
  ],
  "Musanze|Muhoza|Kigombe": [
    "Kavumu",
    "Kiryi",
    "Mugara",
    "Nduruma",
    "Nyamagumba",
    "Nyamuremure",
    "Rukereza",
  ],
  "Musanze|Muhoza|Mpenge": [
    "Gikwege",
    "Giramahoro",
    "Mpenge",
    "Rukoro",
    "Rusagara",
  ],
  "Musanze|Muhoza|Ruhengeri": [
    "Buhoro",
    "Burera",
    "Bushozi",
    "Byimana",
    "Kabaya",
    "Muhe",
    "Susa",
  ],

  // Muko Sector
  "Musanze|Muko|Cyivugiza": [
    "Gakoro",
    "Kabudundu",
    "Kamutara",
    "Karebero",
    "Karwabigwi",
    "Nyagahondo",
    "Nyakanama",
    "Nyiramuko",
    "Sangano",
    "Susa",
  ],
  "Musanze|Muko|Cyogo": [
    "Kabere",
    "Kadahenda",
    "Karabiro",
    "Karuyege",
    "Nyagasambu",
    "Rubanga",
  ],
  "Musanze|Muko|Mburabuturo": [
    "Bugese",
    "Kabindi",
    "Kigasa",
    "Musenyi",
    "Mwanganzara",
    "Ngabane",
    "Ntindo",
  ],
  "Musanze|Muko|Songa": [
    "Buhano",
    "Butare",
    "Kamaheke",
    "Karambo",
    "Kavumu",
    "Kibuye",
    "Mubago",
  ],

  // Musanze Sector
  "Musanze|Musanze|Cyabagarura": [
    "Bitare",
    "Bukane",
    "Gaturo",
    "Gikeri",
    "Kabaya",
    "Kageyo",
    "Kanyabirayi",
    "Kiroba",
    "Rugeyo",
    "Ruvumu",
  ],
  "Musanze|Musanze|Garuka": [
    "Cyanturo",
    "Gacinyiro",
    "Gapfuro",
    "Kanganwa",
    "Kanyaminaba",
  ],
  "Musanze|Musanze|Kabazungu": [
    "Bihinga",
    "Kidendezi",
    "Mufukuro",
    "Nyabageni",
    "Rucumu",
    "Rwunga",
  ],
  "Musanze|Musanze|Nyarubuye": [
    "Bannyisuka",
    "Kareba",
    "Kavumbu",
    "Murenzi",
    "Nturo",
    "Tero",
  ],
  "Musanze|Musanze|Rwambogo": [
    "Buhunge",
    "Gakoro",
    "Kirerema",
    "Nyarubande",
    "Runyangwe",
    "Rwunga",
  ],

  // Nkotsi Sector
  "Musanze|Nkotsi|Bikara": [
    "Barizo",
    "Kabaya",
    "Karambi",
    "Kindiki",
    "Kinkware",
    "Kiruhura",
    "Nyakinama",
    "Rubindi",
  ],
  "Musanze|Nkotsi|Gashinga": ["Buhanga", "Gitaraga", "Kabasaza", "Musebeya"],
  "Musanze|Nkotsi|Mubago": [
    "Bugugu",
    "Buhamo",
    "Musembe",
    "Nyagahondo",
    "Nyarubingo",
  ],
  "Musanze|Nkotsi|Rugeshi": [
    "Bigabiro",
    "Gahanga",
    "Gasebeya",
    "Karambo",
    "Mucyamo",
    "Mutuzo",
  ],
  "Musanze|Nkotsi|Ruyumba": [
    "Cyivugiza",
    "Gasiza",
    "Kamusheshe",
    "Murindi",
    "Nyakigezi",
  ],

  // Nyange Sector (Musanze)
  "Musanze|Nyange|Cyivugiza": [
    "Gasoroza",
    "Kagano",
    "Kageshi",
    "Mugwati",
    "Muhe",
    "Nyabitare",
    "Rugarama",
    "Rusenge",
    "Terimbere",
  ],
  "Musanze|Nyange|Kabeza": [
    "Gahama",
    "Kansoro",
    "Kibingo",
    "Ntamiziro",
    "Nyarubuye",
    "Riboneye",
    "Rwebeya",
  ],
  "Musanze|Nyange|Kamwumba": [
    "Kabaya",
    "Kamajaga",
    "Kamicaca",
    "Musenyi",
    "Ntarama",
    "Rugari",
  ],
  "Musanze|Nyange|Muhabura": [
    "Bazizana",
    "Bihinga",
    "Bukingo",
    "Buramba",
    "Jite",
    "Micaca",
    "Nkogote",
    "Ntarama",
    "Ntebe",
    "Rugwiro",
  ],
  "Musanze|Nyange|Ninda": [
    "Garuka",
    "Gisigwa",
    "Kabagorozi",
    "Kabara",
    "Kabari",
    "Kareba",
    "Nkiriza",
    "Nyabutaka",
    "Nyakagezi",
    "Nyamiyaga",
    "Nyarubande",
  ],

  // Remera Sector (Musanze)
  "Musanze|Remera|Gasongero": [
    "Bukara",
    "Gitega",
    "Mugogo",
    "Nyakibande",
    "Rususa",
  ],
  "Musanze|Remera|Kamisave": [
    "Kabara",
    "Kamurera",
    "Mikamo",
    "Mukinga",
    "Rugari",
    "Ryampunga",
  ],
  "Musanze|Remera|Murandi": [
    "Buhogo",
    "Kabagora",
    "Karuruma",
    "Muganda",
    "Nyirabisekuro",
    "Nyundo",
  ],
  "Musanze|Remera|Murwa": [
    "Giseke",
    "Gitwa",
    "Kabashima",
    "Kamanga",
    "Mwiyandiro",
    "Ngenzi",
  ],
  "Musanze|Remera|Rurambo": [
    "Bitsibo",
    "Gatare",
    "Kabusozo",
    "Kintashya",
    "Mugeshi",
    "Nyanza",
  ],

  // Rwaza Sector
  "Musanze|Rwaza|Bumara": [
    "Gisorora",
    "Kabuye",
    "Kavumu",
    "Muheta",
    "Nyakarambi II",
  ],
  "Musanze|Rwaza|Kabushinge": [
    "Busana",
    "Gihango",
    "Kabuga",
    "Murambi",
    "Nyagisozi",
    "Nyarugando",
    "Ramba",
    "Rwamigimbu",
  ],
  "Musanze|Rwaza|Musezero": [
    "Kamabuye",
    "Kansenda",
    "Kibingo",
    "Kiganda",
    "Mataba",
    "Mutara",
    "Nyakarambi I",
  ],
  "Musanze|Rwaza|Nturo": [
    "Gakenke",
    "Mugogo",
    "Rubabi",
    "Rugari",
    "Rugogwe",
    "Ruvumu",
  ],
  "Musanze|Rwaza|Nyarubuye": [
    "Buhama",
    "Bukoro",
    "Kanama",
    "Murambi",
    "Ngege",
    "Rusaki",
    "Sayo",
  ],

  // Shingiro Sector
  "Musanze|Shingiro|Gakingo": [
    "Burengo",
    "Bwamazi",
    "Gasura",
    "Kabeza",
    "Kadahenda",
    "Karwesero",
    "Mutuzo",
    "Ryambungira",
  ],
  "Musanze|Shingiro|Kibuguzo": [
    "Bikereri",
    "Byimana",
    "Cyimbazi",
    "Mutuzo",
    "Nyundo",
    "Rwinuma",
  ],
  "Musanze|Shingiro|Mudende": [
    "Budasubira",
    "Nyamiyaga",
    "Nyarutembe",
    "Rubagara",
    "Rutagara",
    "Vubiro",
  ],
  "Musanze|Shingiro|Mugari": [
    "Kabagabo",
    "Kabeza",
    "Kimanzi",
    "Nyakagezi",
    "Rebero",
    "Terimbere",
  ],

  // ============================================================
  // NORTH PROVINCE - Burera District
  // ============================================================

  // Bungwe Sector
  "Burera|Bungwe|Bungwe": [
    "Bungwe",
    "Gakeri",
    "Gatenga",
    "Kinihira",
    "Nyabyondo",
    "Rweru",
    "Zaneza",
  ],
  "Burera|Bungwe|Bushenya": [
    "Buhinga",
    "Bushenya",
    "Gifumba",
    "Mbuga",
    "Ryamayaya",
  ],
  "Burera|Bungwe|Mudugari": [
    "Buzaniro",
    "Kivumo",
    "Mubuga",
    "Rubayo",
    "Sangabuzi",
    "Vunga",
  ],
  "Burera|Bungwe|Tumba": [
    "Byorera",
    "Karwema",
    "Mubuga",
    "Murambo",
    "Mutungo",
    "Nama",
    "Nyarukore",
    "Tumba",
  ],

  // Butaro Sector
  "Burera|Butaro|Gatsibo": [
    "Gafumba",
    "Gahuye",
    "Gasebeya",
    "Gatare",
    "Gatovu",
    "Kadehero",
    "Kagano",
    "Kaniga",
    "Kanyoni",
    "Kindoyi",
    "Murambi",
    "Rubonobono",
    "Rwabutama",
    "Rweru",
  ],
  "Burera|Butaro|Mubuga": [
    "Biyove",
    "Bugeme",
    "Gacyamo",
    "Kirwa",
    "Mulindi",
    "Murambi",
    "Musenyi",
    "Nyanamo",
    "Rupangu",
    "Ryakagundu",
    "Ryanturege",
  ],
  "Burera|Butaro|Muhotora": [
    "Bukaragata",
    "Cyahera",
    "Gahunge",
    "Kabere",
    "Karambi",
    "Kibande",
    "Kindege",
    "Murambo",
    "Murwa",
    "Rugandu",
  ],
  "Burera|Butaro|Nyamicucu": [
    "Burambira",
    "Gacereri",
    "Gahira",
    "Gari",
    "Gasiza",
    "Gitovu",
    "Karingorera",
    "Kibingo",
    "Kiringa",
    "Murwa",
    "Musama",
    "Nkururo",
    "Nyamiyaga",
    "Rubaya",
    "Rugeshi",
    "Rwemikore",
  ],
  "Burera|Butaro|Rusumo": [
    "Budogoro",
    "Butaro",
    "Buyanga",
    "Cyasenge",
    "Gitanda",
    "Kabahura",
    "Kabaya",
    "Kabingo",
    "Kamonyi",
    "Kanyesogo",
    "Mugari",
    "Mugera",
    "Mukeri",
    "Musongati",
    "Nyamiyaga",
    "Runaba",
  ],

  // Cyanika Sector (Burera)
  "Burera|Cyanika|Gasiza": [
    "Bahimba",
    "Gahirikiro",
    "Gashunguru",
    "Kabona",
    "Karisimbi",
    "Kaziguro",
    "Nyamiyaga",
    "Rwankongi",
  ],
  "Burera|Cyanika|Gisovu": [
    "Gisovu",
    "Hanika",
    "Kamegeri",
    "Mataba",
    "Ruhimbi",
    "Rusenyi",
    "Rutango",
    "Samiro",
  ],
  "Burera|Cyanika|Kabyiniro": [
    "Butete",
    "Kabadari",
    "Mbonabose",
    "Mugarama",
    "Mugeshi",
    "Nkiriza",
    "Nyagisenyi",
    "Zindiro",
  ],
  "Burera|Cyanika|Kagitega": [
    "Gasebeya",
    "Kabaya",
    "Kagerero",
    "Karambo",
    "Kidaho",
    "Munini",
    "Ntarama",
    "Sirwa",
  ],
  "Burera|Cyanika|Kamanyana": [
    "Gasiza",
    "Gasovu",
    "Kabira",
    "Kavunda",
    "Kibaya",
    "Majyambere",
    "Nyarutosho",
    "Runyenkanda",
    "Ryabiteyi",
  ],
  "Burera|Cyanika|Nyagahinga": [
    "Bisura",
    "Gahama",
    "Gahonga",
    "Gakenke",
    "Kabande",
    "Kabyimana",
    "Kanyabaranzi",
    "Kebero",
    "Mashango",
    "Musave",
    "Ruko",
  ],

  // Cyeru Sector
  "Burera|Cyeru|Butare": [
    "Butare",
    "Gatare",
    "Kamata",
    "Kamonyi",
    "Musama",
    "Nyaruyove",
    "Ryandahagaze",
  ],
  "Burera|Cyeru|Ndongozi": [
    "Kabagenza",
    "Ntazi",
    "Nterura",
    "Nyagisozi",
    "Nyamusanze",
    "Rujanja",
    "Ryaruhirima",
  ],
  "Burera|Cyeru|Ruyange": [
    "Bitagara",
    "Burabwa",
    "Gatagara-jite",
    "Kabaya",
    "Ngambi",
    "Rihiro",
    "Rugarama",
    "Runyenyeri",
    "Susa",
  ],

  // Gahunga Sector
  "Burera|Gahunga|Buramba": [
    "Buramba",
    "Gafatangwe",
    "Gasenyi",
    "Kagoma",
    "Karuheshyi",
    "Murambi",
    "Musanzu",
  ],
  "Burera|Gahunga|Gisizi": [
    "Gisizi",
    "Kabagabo",
    "Kanaba",
    "Kigote",
    "Nyagasozi",
    "Ruri",
  ],
  "Burera|Gahunga|Kidakama": [
    "Bahenga",
    "Kabarima",
    "Kabindi",
    "Kajevuba",
    "Kangoma",
    "Kanyendara",
    "Kidakama",
    "Mubuga",
    "Nangimbibi",
    "Rusenyi",
    "Songa",
  ],
  "Burera|Gahunga|Nyangwe": [
    "Bihanga",
    "Gasagara",
    "Gikoro",
    "Kamatanda",
    "Mubibi",
    "Ntenyo",
    "Nyangwe",
    "Remera",
  ],
  "Burera|Gahunga|Rwasa": [
    "Gitagata",
    "Kabanga",
    "Kangoboka",
    "Kanyiramusengo",
    "Mirigari",
    "Mutara",
    "Nyangezi",
  ],

  // Gatebe Sector
  "Burera|Gatebe|Gabiro": [
    "Gatebe",
    "Ginga",
    "Kabuga",
    "Kagano",
    "Kajerijeri",
    "Nyakabungo",
    "Rugarama",
    "Ryaruyumbu",
    "Zihare",
  ],
  "Burera|Gatebe|Musenda": [
    "Bikumba",
    "Cyankaranka",
    "Kabayoboke",
    "Kabuga",
    "Muremure",
    "Nyamahunge",
    "Rushaki",
    "Sabukima",
    "Sunzu",
  ],
  "Burera|Gatebe|Rwambogo": ["Cyili", "Mubuga", "Murambo", "Ruhinga", "Rutete"],
  "Burera|Gatebe|Rwasa": [
    "Karambi",
    "Kiyogera",
    "Murambo",
    "Nganzo",
    "Rugarama",
    "Rutovu",
  ],

  // Gitovu Sector
  "Burera|Gitovu|Mariba": [
    "Buhembe",
    "Cyogo",
    "Kiboga",
    "Mariba",
    "Musekera",
    "Mwungura",
    "Rusuzuma",
  ],
  "Burera|Gitovu|Musasa": [
    "Butanga",
    "Gashiru",
    "Gicura",
    "Kamusaba",
    "Kibumbiro",
    "Murore",
    "Mutara",
    "Ruhombo",
    "Shyamba",
    "Sina",
  ],
  "Burera|Gitovu|Runoga": [
    "Gitwe",
    "Kiraro",
    "Mubuga",
    "Musekera",
    "Mutungu",
    "Siganiro",
  ],

  // Kagogo Sector
  "Burera|Kagogo|Kabaya": ["Bihanga", "Butare", "Kanaba", "Murambi", "Rukenke"],
  "Burera|Kagogo|Kayenzi": [
    "Gatare",
    "Kaguriro",
    "Kiyira",
    "Mubaya",
    "Ngobori",
    "Rukoro",
    "Rusisiro",
    "Rwitongo",
  ],
  "Burera|Kagogo|Kiringa": [
    "Gisanze",
    "Karambi",
    "Kariba",
    "Karombero",
    "Kigote",
    "Kirigari",
    "Musangabo",
    "Nyamuha",
    "Rusenyi",
    "Rwabageni",
    "Ryangarama",
  ],
  "Burera|Kagogo|Nyamabuye": [
    "Gitare",
    "Kabana",
    "Kabashotsi",
    "Kikubo",
    "Mfashe",
    "Musarara",
    "Nyamabuye",
    "Nyarubuye",
    "Nyarugina",
  ],

  // Kinoni Sector
  "Burera|Kinoni|Gafuka": [
    "Basumba",
    "Bugeyo",
    "Buharo",
    "Kabeza",
    "Kanoni",
    "Ntwana",
    "Nyagafunzo",
  ],
  "Burera|Kinoni|Nkenke": ["Birwa", "Kigina", "Kigugu", "Nyagatoki", "Sunzu"],
  "Burera|Kinoni|Nkumba": [
    "Cyanya",
    "Cyivugiza",
    "Kabaguma",
    "Karambo",
    "Mbaya",
    "Mubuga",
    "Mutabo",
  ],
  "Burera|Kinoni|Ntaruka": [
    "Cyamabuye",
    "Gikoro",
    "Kabaya",
    "Karuganda",
    "Nyabagenzi",
    "Nyarubuye",
    "Nyarurembo",
    "Ryamakoro",
    "Shenyi",
  ],

  // Kinyababa Sector
  "Burera|Kinyababa|Bugamba": [
    "Cyogo",
    "Gacaca",
    "Gako",
    "Gatare",
    "Kabingo",
    "Kirwa",
    "Matyazo",
    "Ndabizi",
    "Rukore",
  ],
  "Burera|Kinyababa|Kaganda": [
    "Gisirwe",
    "Kiraro",
    "Mariko",
    "Murambo",
    "Ruhinga",
    "Rusebeya",
    "Rwahondo",
  ],
  "Burera|Kinyababa|Musasa": [
    "Gitoma",
    "Kabarore",
    "Kanyaminyinya",
    "Murambo",
    "Rukaya",
  ],
  "Burera|Kinyababa|Rutovu": [
    "Gisiriri",
    "Gitenge",
    "Karambo",
    "Kavumu",
    "Musaga",
    "Nyabizi I",
    "Nyabizi II",
    "Nyabizi III",
    "Rubayu",
    "Ryatamba",
    "Shaga",
  ],

  // Kivuye Sector
  "Burera|Kivuye|Bukwashuri": [
    "Buhita",
    "Gitovu",
    "Murambo",
    "Nyakira",
    "Nyamisare",
    "Nyarutovu",
  ],
  "Burera|Kivuye|Gashanje": [
    "Bitukura",
    "Burango",
    "Gafumba",
    "Gashiru",
    "Karambo",
    "Nyakabungo",
    "Rugarambiro",
  ],
  "Burera|Kivuye|Murwa": [
    "Gasiza",
    "Gatare",
    "Kabaya",
    "Muhambo",
    "Rubara",
    "Rucyamo",
    "Rusasa",
    "Vumage",
  ],
  "Burera|Kivuye|Nyirataba": [
    "Buganza",
    "Bukumbi",
    "Kabasha",
    "Kanyenzugi",
    "Kivumo",
    "Mushunga",
    "Shanja",
  ],

  // Nemba Sector (Burera)
  "Burera|Nemba|Kivumu": [
    "Gashushura",
    "Kigeyo",
    "Mugano",
    "Nyamusanze",
    "Songorero",
  ],
  "Burera|Nemba|Nyamugari": [
    "Cyabami",
    "Kagihanga",
    "Karyango",
    "Muhondo",
    "Nyagahondo",
    "Nyiraruhuha",
    "Ryaruhirima",
    "Shorezo",
  ],
  "Burera|Nemba|Rubona": [
    "Bugarigari",
    "Bukenyeye",
    "Butunda",
    "Cyabarenge",
    "Kadehero",
    "Kanyaru",
    "Murandamo",
    "Ngongwe",
    "Nyantweri",
    "Rebero",
  ],
  "Burera|Nemba|Rushara": [
    "Bishingwe",
    "Bugondo",
    "Cyave",
    "Kagesera",
    "Mugomero",
    "Nyabitare",
  ],

  // Rugarama Sector (Burera)
  "Burera|Rugarama|Cyahi": [
    "Busura",
    "Gakore",
    "Hanika",
    "Karutwe",
    "Nguri",
    "Nyabiho",
    "Rubeja",
    "Ruganda",
    "Tatiro",
  ],
  "Burera|Rugarama|Gafumba": [
    "Bambiro",
    "Basumba",
    "Gacyogo",
    "Gahunga",
    "Kabaya",
    "Kanyangezi",
    "Muturirwa",
    "Nyarwondo",
    "Rugarama",
    "Rutamba",
  ],
  "Burera|Rugarama|Karangara": [
    "Gahama",
    "Gasiza",
    "Kabaya",
    "Kanyamugezi",
    "Maya",
    "Muhabura",
    "Rugwiro",
    "Rukiko",
    "Sasa",
  ],
  "Burera|Rugarama|Rurembo": [
    "Birwa",
    "Gashore",
    "Mpinga",
    "Nyakiriba",
    "Rwambeho",
    "Rwinkuba",
  ],

  // Rugengabari Sector
  "Burera|Rugengabari|Kilibata": [
    "Bushima",
    "Cyogo",
    "Murungu",
    "Musheke",
    "Remera",
  ],
  "Burera|Rugengabari|Mucaca": [
    "Burago",
    "Burande",
    "Gahinga",
    "Kamonyi",
    "Karubamba",
    "Mugina",
    "Nkoto",
    "Nyabikungu",
    "Rihiro",
  ],
  "Burera|Rugengabari|Nyanamo": [
    "Bwenjeli",
    "Kabira",
    "Kabukoko",
    "Kabuyenge",
    "Kamonyi",
    "Kiziba",
    "Murambo",
  ],
  "Burera|Rugengabari|Rukandabyuma": [
    "Gatenga",
    "Kinyefurwe",
    "Mubuga",
    "Murambo",
    "Ngoma",
    "Nyansyo",
    "Remya",
    "Rugandu",
    "Seta",
  ],

  // Ruhunde Sector
  "Burera|Ruhunde|Gaseke": [
    "Gahe",
    "Gatare",
    "Kanyoni",
    "Kintobo",
    "Mukaka",
    "Murambo",
    "Rugaragara",
    "Rukiniro",
    "Rukwavu",
  ],
  "Burera|Ruhunde|Gatare": [
    "Gashinge",
    "Gashishori",
    "Gatete",
    "Gitwe",
    "Nganzo",
    "Ruganda",
    "Rukingu",
    "Terimbere",
  ],
  "Burera|Ruhunde|Gitovu": [
    "Cyasuri",
    "Genda",
    "Kaberano",
    "Kamonyi",
    "Muremure",
    "Mweru",
    "Ngoma",
    "Tetero",
  ],
  "Burera|Ruhunde|Rusekera": [
    "Bugambanyoni",
    "Gasura",
    "Gatokezo",
    "Matyazo",
    "Rubyiniro",
    "Rusenge",
    "Tarasi",
  ],

  // Rusarabuye Sector
  "Burera|Rusarabuye|Kabona": [
    "Bucyaba",
    "Busutamo",
    "Buzamuye",
    "Gahinga",
    "Gasongati",
    "Gikore",
    "Karambo",
    "Muharuro",
    "Munanira",
    "Murambo",
    "Musebeya",
    "Ntagara",
    "Rutuku",
  ],
  "Burera|Rusarabuye|Ndago": [
    "Burehe",
    "Gacaca",
    "Gaseke",
    "Gitovu",
    "Kajerijeri",
    "Karorero",
    "Kirambo",
    "Ndago",
    "Nyarungu",
  ],
  "Burera|Rusarabuye|Ruhanga": [
    "Bisayu I",
    "Bisayu II",
    "Bumba",
    "Kamukondo",
    "Kanigo",
    "Karuhanga",
    "Kibuye",
    "Ngundu",
    "Ruhanga",
    "Ruhurura I",
    "Ruhurura II",
    "Rutoro",
  ],

  // Rwerere Sector
  "Burera|Rwerere|Gacundura": [
    "Burindwa",
    "Gacundura",
    "Kanigo",
    "Karegamazi",
    "Moma",
    "Rugaragara",
    "Rugarambiro",
    "Sarambwe",
  ],
  "Burera|Rwerere|Gashoro": [
    "Bisaga",
    "Cyapa",
    "Gashoro",
    "Kibuye",
    "Ngonya",
    "Rugezi",
    "Rwerere",
  ],
  "Burera|Rwerere|Ruconsho": [
    "Buhore",
    "Gakenke",
    "Kamatengu",
    "Kinkware",
    "Mugera",
    "Ngoma",
    "Ruconsho",
  ],
  "Burera|Rwerere|Rugari": [
    "Gacyamu",
    "Gatovu",
    "Mucaca",
    "Murambo",
    "Mushubi",
    "Tangata",
  ],
  // ============================================================
  // NORTH PROVINCE - Gakenke District
  // ============================================================

  // Busengo Sector
  "Gakenke|Busengo|Birambo": ["Birambo", "Gitwa", "Kirwa", "Nyarubande"],
  "Gakenke|Busengo|Butereri": [
    "Buhuga",
    "Butereri",
    "Gasakuza",
    "Kirwa",
    "Rubaga",
    "Rugendabari",
    "Rwinkuba",
  ],
  "Gakenke|Busengo|Byibuhiro": [
    "Gatoke",
    "Kamina",
    "Karambi",
    "Nyagasozi",
    "Ruboza",
  ],
  "Gakenke|Busengo|Kamina": [
    "Bunyangezi",
    "Kajereri",
    "Kamina",
    "Mwendo",
    "Nyarubuye",
    "Rwankuba",
  ],
  "Gakenke|Busengo|Kirabo": [
    "Gasaso",
    "Kirabo",
    "Munyinya",
    "Ngezi",
    "Rusebeya",
    "Wimfizi",
  ],
  "Gakenke|Busengo|Mwumba": [
    "Kabuga",
    "Kamonyi",
    "Karaba",
    "Mugunga",
    "Rutenga",
  ],
  "Gakenke|Busengo|Ruhanga": [
    "Bukinga",
    "Gashirwe",
    "Kabaya",
    "Kabugiri",
    "Rurangara",
  ],

  // Coko Sector
  "Gakenke|Coko|Kiruku": [
    "Buhuri",
    "Bukamba",
    "Bushagashi",
    "Gatare",
    "Mucumazo",
    "Ntarabana",
    "Nyamasuka",
    "Rubuguma",
  ],
  "Gakenke|Coko|Mbirima": [
    "Akanduga",
    "Burengo",
    "Bushyama",
    "Matovu",
    "Mbogo",
    "Murambi",
    "Rwahi",
    "Shyunga",
  ],
  "Gakenke|Coko|Nyange": [
    "Buhara",
    "Gaseke",
    "Karambo",
    "Karoli",
    "Musasa",
    "Ntobwe",
    "Vumandi",
  ],
  "Gakenke|Coko|Nyanza": ["Baramba", "Gikamba", "Gitaba", "Kavumu", "Tumba"],

  // Cyabingo Sector
  "Gakenke|Cyabingo|Muhaza": [
    "Buraza",
    "Busoga",
    "Karombero",
    "Muhaza",
    "Mushirarungu",
    "Ntaraga",
    "Rutaramiro",
  ],
  "Gakenke|Cyabingo|Muhororo": [
    "Butaraga",
    "Gatoki",
    "Gatorero",
    "Kabungwe",
    "Karenge",
    "Muhororo",
    "Musebeya",
    "Tongoburo",
  ],
  "Gakenke|Cyabingo|Muramba": [
    "Bukuba",
    "Gahama",
    "Gatare",
    "Musebeya",
    "Rugaragara",
    "Rwobe",
  ],
  "Gakenke|Cyabingo|Mutanda": [
    "Cyabingo",
    "Gishubi",
    "Kambare",
    "Kanyamukenke",
    "Mucaca",
    "Mutanda",
  ],
  "Gakenke|Cyabingo|Rukore": [
    "Kigote",
    "Muramba",
    "Murehe",
    "Nyabisika",
    "Nyamugali",
    "Rugendabare",
    "Rukore",
  ],

  // Gakenke Sector
  "Gakenke|Gakenke|Buheta": [
    "Buyagiro",
    "Gatwa",
    "Gihemba",
    "Gikerera",
    "Karambi",
    "Karorero",
    "Mucuro",
    "Murambi",
    "Ndora",
    "Rusebeya",
  ],
  "Gakenke|Gakenke|Kagoma": [
    "Bukanka",
    "Cyandago",
    "Gitenga",
    "Kamatare",
    "Murama",
    "Murambi",
    "Musave",
    "Ntobwe",
    "Rurambi",
    "Rusuri",
  ],
  "Gakenke|Gakenke|Nganzo": [
    "Bwimba",
    "Gahondo",
    "Gashigwe",
    "Gishyinguro",
    "Kaniga",
    "Kanyiramanyana",
    "Karambi",
    "Karehe",
    "Karuganda",
    "Mbizi",
    "Mbogo",
    "Muyira",
    "Ryabazungu",
  ],
  "Gakenke|Gakenke|Rusagara": [
    "Akarugamba",
    "Busingiryi",
    "Kabaya",
    "Kageyo",
    "Kakinungu",
    "Kivumu",
    "Mazinga",
    "Murambi",
    "Museke",
    "Nyamabuye",
    "Ruberano",
    "Sitwe",
    "Umujyi Wa Gakenke",
  ],

  // Gashenyi Sector
  "Gakenke|Gashenyi|Nyacyina": [
    "Bwiyando",
    "Gashinge",
    "Kadehero",
    "Masoro",
    "Mukira",
    "Nyamure",
    "Rugarama",
    "Rugendabari",
    "Ruhore",
  ],
  "Gakenke|Gashenyi|Rukura": [
    "Gahihi",
    "Gikoro",
    "Kara",
    "Kirambo",
    "Murandi",
    "Nyamataha",
  ],
  "Gakenke|Gashenyi|Rutabo": [
    "Buhira",
    "Buturuba",
    "Gasanzwe",
    "Kabwika",
    "Kamurambo",
    "Kanwa",
    "Rubuga",
  ],
  "Gakenke|Gashenyi|Rutenderi": [
    "Gaseke",
    "Gatwa",
    "Gitaba",
    "Kabere",
    "Kabugomba",
    "Kibara",
    "Murambo",
  ],
  "Gakenke|Gashenyi|Taba": [
    "Busaro",
    "Bushita",
    "Gasharu",
    "Gihanga",
    "Kangomba",
    "Kanteko",
    "Murambi",
    "Mwisha",
    "Rutenderi",
  ],

  // Janja Sector
  "Gakenke|Janja|Gakindo": [
    "Bukerera",
    "Bunyironko",
    "Kabusoro",
    "Kibonwa",
    "Rubona",
    "Rurumbya",
  ],
  "Gakenke|Janja|Gashyamba": [
    "Burega",
    "Gatongo",
    "Gitovu",
    "Nyabikenke",
    "Rwampali",
  ],
  "Gakenke|Janja|Gatwa": [
    "Buhanga",
    "Gitega",
    "Kinoko",
    "Murambi",
    "Mwanza",
    "Nyabushishiri",
    "Nyagisozi",
  ],
  "Gakenke|Janja|Karukungu": [
    "Buhimbi",
    "Cyifuzo",
    "Gitaba",
    "Karama",
    "Mugandu",
    "Rugeshi",
    "Rusasa",
    "Rutake",
  ],

  // Kamubuga Sector
  "Gakenke|Kamubuga|Kamubuga": [
    "Gasebeya",
    "Gashishi",
    "Gitwe",
    "Kabuye",
    "Kanshenge",
    "Kanyirantege",
    "Marira",
    "Nyarungu",
    "Raro",
    "Rugari",
    "Ruhehe",
    "Runeka",
  ],
  "Gakenke|Kamubuga|Kidomo": [
    "Bucyaba",
    "Bugogo",
    "Kidomo",
    "Kintobo",
    "Njugi",
    "Nyamusongati",
    "Rugeshi",
    "Rutagara",
  ],
  "Gakenke|Kamubuga|Mbatabata": [
    "Buhinda",
    "Gatare",
    "Horero",
    "Kabyaza",
    "Karingorera",
    "Mbatabata",
    "Mwasha",
    "Ryabirere",
  ],
  "Gakenke|Kamubuga|Rukore": [
    "Kabutwa",
    "Karangara",
    "Kinyababa",
    "Rungu",
    "Rusasa",
    "Rusumo",
    "Rwata",
  ],

  // Karambo Sector (Gakenke)
  "Gakenke|Karambo|Kanyanza": [
    "Gatembe",
    "Kabuhunu",
    "Kabutare",
    "Karambi",
    "Karenge",
    "Marembo",
    "Nyiramisabike",
  ],
  "Gakenke|Karambo|Karambo": [
    "Bataga",
    "Bumbeja",
    "Bushumba",
    "Cyumba",
    "Gasovu",
    "Gatare",
    "Gatorero",
    "Gishingo",
    "Kigarama",
    "Mugamba",
    "Nyiramuhimba",
    "Rwamiko",
    "Ryarurimbura",
  ],
  "Gakenke|Karambo|Kirebe": [
    "Bukondo",
    "Bukunga",
    "Bukweto",
    "Kabuye",
    "Kavumu",
    "Mubuga",
    "Mwiyanike",
    "Nyabigugu",
  ],

  // Kivuruga Sector
  "Gakenke|Kivuruga|Cyintare": ["Bigogwe", "Buhuga", "Cyintare", "Nyarubuye"],
  "Gakenke|Kivuruga|Gasiza": [
    "Bushoka",
    "Kabuhoma",
    "Kamwumba",
    "Nturo",
    "Nyarungu",
  ],
  "Gakenke|Kivuruga|Rugimbu": [
    "Gasave",
    "Karuhunge",
    "Mugali",
    "Rurambo",
    "Rutamba",
    "Rwamabare",
  ],
  "Gakenke|Kivuruga|Ruhinga": [
    "Buranga",
    "Kamomo",
    "Kavumu",
    "Kintarure",
    "Munyege",
    "Rugeshi",
    "Rwakirari",
  ],
  "Gakenke|Kivuruga|Sereri": [
    "Buhayo",
    "Kabara",
    "Kivuruga",
    "Masoro",
    "Musekera",
    "Ngarama",
  ],

  // Mataba Sector (Gakenke)
  "Gakenke|Mataba|Buyange": [
    "Gabiro",
    "Gashingiro",
    "Kabeza",
    "Kanamo",
    "Karambi",
    "Mubuga",
    "Nyamiyaga",
    "Rugendabari",
    "Ryarugema",
  ],
  "Gakenke|Mataba|Gikombe": [
    "Bugari",
    "Bweramana",
    "Gashyushya",
    "Gatovu",
    "Muhororo",
    "Munini",
    "Muyaga",
    "Nyangoma",
    "Ruganda",
    "Ruhanga",
  ],
  "Gakenke|Mataba|Nyundo": [
    "Gihita",
    "Gitaba",
    "Kabuyora",
    "Kagando",
    "Karambi",
    "Mataba",
    "Mwanza",
    "Nkurazo",
  ],

  // Minazi Sector
  "Gakenke|Minazi|Gasiho": [
    "Gahombo",
    "Gahunda",
    "Gasangwa",
    "Gihinga",
    "Kabarima",
    "Kigeyo",
    "Mbogo",
  ],
  "Gakenke|Minazi|Munyana": [
    "Gihororo",
    "Gitwa",
    "Kanka",
    "Kivuba",
    "Nyabitare",
  ],
  "Gakenke|Minazi|Murambi": [
    "Gisovu",
    "Kabuga",
    "Musave",
    "Nyanza",
    "Nyarubuye",
  ],
  "Gakenke|Minazi|Raba": [
    "Bukonde",
    "Gaharo",
    "Gitaragwe",
    "Munihi",
    "Mutara",
    "Ndegamire",
    "Sarabuye",
  ],

  // Mugunga Sector
  "Gakenke|Mugunga|Gahinga": [
    "Cyinama",
    "Giheta",
    "Nyagahondo",
    "Nyakagezi",
    "Rwimpiri",
  ],
  "Gakenke|Mugunga|Munyana": [
    "Cyarubayi",
    "Karambi",
    "Muhororo",
    "Nturo",
    "Rwezamenyo",
  ],
  "Gakenke|Mugunga|Mutego": [
    "Kamasanze",
    "Kamunyana",
    "Karambo",
    "Nganzo",
    "Rutaraga",
  ],
  "Gakenke|Mugunga|Nkomane": [
    "Kabuga",
    "Kanaba",
    "Nemba",
    "Nyagasozi",
    "Rusebeya",
  ],
  "Gakenke|Mugunga|Rutabo": [
    "Gacemeri",
    "Gasovu",
    "Gatonde",
    "Kabuhoro",
    "Muhororo",
  ],
  "Gakenke|Mugunga|Rutenderi": ["Kiraro", "Nyakazenga", "Nyundo"],
  "Gakenke|Mugunga|Rwamambe": [
    "Biraro",
    "Bushoka",
    "Gashubi",
    "Kabiganda",
    "Kanyinya",
  ],

  // Muhondo Sector
  "Gakenke|Muhondo|Busake": ["Busake", "Gikikira", "Kibirizi", "Nyakabanda"],
  "Gakenke|Muhondo|Bwenda": [
    "Gahama",
    "Gatare",
    "Gitaba",
    "Kimanama",
    "Nketsi",
  ],
  "Gakenke|Muhondo|Gasiza": [
    "Gahabwa",
    "Gahinga",
    "Gahondo",
    "Gasiza",
    "Kabeza",
  ],
  "Gakenke|Muhondo|Gihinga": ["Base", "Gihinga", "Karehe", "Samuduha"],
  "Gakenke|Muhondo|Huro": ["Cura", "Gitwa", "Huro", "Kabuga", "Rubona"],
  "Gakenke|Muhondo|Musagara": ["Akara", "Cyenda", "Giteme", "Karobagire"],
  "Gakenke|Muhondo|Musenyi": ["Buhinya", "Gakuyu", "Kigali", "Musenyi"],
  "Gakenke|Muhondo|Ruganda": [
    "Gisozi",
    "Kinyonzo",
    "Mubuga",
    "Ranzi",
    "Ruganda",
  ],
  "Gakenke|Muhondo|Rwinkuba": ["Cyimbogo", "Kanyana", "Ruhorobero"],

  // Muyongwe Sector
  "Gakenke|Muyongwe|Bumba": [
    "Bumba",
    "Buzu",
    "Gikoro",
    "Gitovu",
    "Gitwe",
    "Mataba",
    "Shiru",
  ],
  "Gakenke|Muyongwe|Gisiza": [
    "Gitanda",
    "Kabingo",
    "Kiyebe",
    "Muramba",
    "Ruhoko",
    "Sanzare",
  ],
  "Gakenke|Muyongwe|Karyango": ["Gikombe", "Kibingo", "Mahaha", "Mugera"],
  "Gakenke|Muyongwe|Nganzo": [
    "Muhororo",
    "Nganzo",
    "Ngoma",
    "Nyarubuye",
    "Vugangoma",
  ],
  "Gakenke|Muyongwe|Va": ["Bukwera", "Businde", "Gikombe", "Mutoyi", "Ranzi"],

  // Muzo Sector
  "Gakenke|Muzo|Kabatezi": [
    "Curugusi",
    "Gasave",
    "Gitabi",
    "Kabatezi",
    "Kasheshe",
    "Runyinya",
    "Rusororo",
  ],
  "Gakenke|Muzo|Kiryamo": [
    "Akamagaju",
    "Gahondo",
    "Munyinya",
    "Murambi",
    "Rugarama",
    "Rugege",
    "Sezuku",
  ],
  "Gakenke|Muzo|Mubuga": [
    "Butambwe",
    "Kanini",
    "Kavuza",
    "Mubuga",
    "Mwirika",
    "Mwurire",
  ],
  "Gakenke|Muzo|Mwiyando": [
    "Gitabi",
    "Gitoke",
    "Kagano",
    "Muguguri",
    "Nyagasozi",
    "Rubayo",
    "Ruhondo",
  ],
  "Gakenke|Muzo|Rwa": [
    "Bitaba",
    "Cyinturo",
    "Gacaca",
    "Gihororo",
    "Kabere",
    "Mafubo",
    "Nyagahondo",
    "Nyarubande",
  ],

  // Nemba Sector (Gakenke)
  "Gakenke|Nemba|Buranga": [
    "Buranga",
    "Burego",
    "Butare",
    "Kanyansyo",
    "Muganwa",
    "Mukaka",
    "Rukoji",
  ],
  "Gakenke|Nemba|Gahinga": ["Bitare", "Bukurura", "Kabaya", "Kilimbi"],
  "Gakenke|Nemba|Gisozi": [
    "Gisagara",
    "Kabushara",
    "Kamatete",
    "Kanama",
    "Kanunga",
    "Kanzoka",
    "Karukara",
    "Kirehe",
    "Mushubi",
    "Nyamyumba",
  ],
  "Gakenke|Nemba|Mucaca": [
    "Cyahafi",
    "Gatare",
    "Kabingo",
    "Kabuye",
    "Kamuvunyi",
    "Kiruhura",
    "Kiryamo",
    "Munyege",
    "Musange",
    "Ntakabavu",
    "Nyamiyaga",
  ],

  // Ruli Sector
  "Gakenke|Ruli|Busoro": [
    "Congoli",
    "Cyoganyoni",
    "Gitaba",
    "Kabare",
    "Kibirizi",
    "Nkoto",
    "Rugaragara",
  ],
  "Gakenke|Ruli|Gikingo": [
    "Bushoka",
    "Gatwa",
    "Kabingo",
    "Karango",
    "Nyamugari",
    "Rumasa",
  ],
  "Gakenke|Ruli|Jango": [
    "Gatagara",
    "Gihura",
    "Gitonde",
    "Kinyonzo",
    "Mubuga",
    "Murehe",
  ],
  "Gakenke|Ruli|Ruli": [
    "Bariza",
    "Gahondo",
    "Gataba",
    "Mugambazi",
    "Ngayake",
    "Nyakarambi",
  ],
  "Gakenke|Ruli|Rwesero": [
    "Gatare",
    "Gisizi",
    "Mabago",
    "Mugwato",
    "Nyarunyinya",
  ],

  // Rusasa Sector
  "Gakenke|Rusasa|Gataba": [
    "Bumonyo A",
    "Gahama",
    "Gataba",
    "Kebero",
    "Kibaya",
  ],
  "Gakenke|Rusasa|Kamonyi": [
    "Burinda",
    "Gakindo",
    "Gapfura",
    "Gitwe",
    "Kidomo",
    "Nyagahama",
    "Rurambi",
  ],
  "Gakenke|Rusasa|Murambi": ["Buharabuye", "Karuhunge", "Kirehe", "Nyange"],
  "Gakenke|Rusasa|Nyundo": ["Bukingo", "Bumonyo B", "Gisovu", "Nyundo", "Tane"],
  "Gakenke|Rusasa|Rumbi": ["Bukiza", "Buyora", "Bwanamo", "Ninda"],
  "Gakenke|Rusasa|Rurembo": [
    "Bushoka",
    "Mazinga",
    "Murori",
    "Nyakabungo",
    "Rugamba",
  ],

  // Rushashi Sector
  "Gakenke|Rushashi|Burimba": ["Kabuye", "Kara", "Kivumu"],
  "Gakenke|Rushashi|Busanane": ["Gisenyi", "Gisiza", "Kanzuki", "Nyakagezi"],
  "Gakenke|Rushashi|Joma": [
    "Kineza",
    "Mataba",
    "Mwifuzo",
    "Nyagasozi",
    "Rugarama",
  ],
  "Gakenke|Rushashi|Kageyo": [
    "Kabeza",
    "Kabona",
    "Karambi",
    "Murambi",
    "Nganzo",
  ],
  "Gakenke|Rushashi|Mbogo": [
    "Bushoka",
    "Buzoza",
    "Gisanze",
    "Gitongo",
    "Nyabitare",
  ],
  "Gakenke|Rushashi|Razi": [
    "Gahinga",
    "Gikongoro",
    "Kirwa",
    "Nkoto",
    "Nyangoyi",
  ],
  "Gakenke|Rushashi|Rwankuba": [
    "Giheta",
    "Karushashi",
    "Ngambi",
    "Ruganda",
    "Rwamabega",
  ],
  "Gakenke|Rushashi|Shyombwe": ["Gatare", "Gatwa", "Gihororo", "Murara"],

  // ============================================================
  // NORTH PROVINCE - Rulindo District
  // ============================================================

  // Base Sector
  "Rulindo|Base|Cyohoha": [
    "Bukangano",
    "Buramba",
    "Gihemba",
    "Gitwa",
    "Kabingo",
    "Kabuga",
    "Musenyi",
    "Mushongi",
    "Nyangoyi",
    "Rubanda",
  ],
  "Rulindo|Base|Gitare": [
    "Bushyiga",
    "Gatete",
    "Gihora",
    "Gisiza",
    "Kirwa",
    "Mugenda I",
    "Mugenda II",
    "Nyamugali",
    "Rugaragara",
    "Rugerero",
  ],
  "Rulindo|Base|Rwamahwa": [
    "Base",
    "Cyondo",
    "Gitovu",
    "Kabahama",
    "Kabeza",
    "Karambi",
    "Kiruli",
    "Mutima",
  ],

  // Burega Sector
  "Rulindo|Burega|Butangampundu": [
    "Gacyamo",
    "Gashinge",
    "Karambi",
    "Karugaju",
    "Kerera",
    "Kibiraro",
    "Kigabiro",
    "Kigarama",
    "Kisigiro",
    "Mayaga",
    "Muduha",
    "Muhondo",
    "Nyamiyaga",
    "Runyinya",
  ],
  "Rulindo|Burega|Karengeri": [
    "Bugoboka",
    "Byerwa",
    "Gasare",
    "Gasharu",
    "Gashinge",
    "Gatete",
    "Kantabo",
    "Kanunga",
    "Kizenga",
    "Kiziba",
    "Mataba",
    "Mitabi",
    "Mukarange",
    "Rwamiko",
  ],
  "Rulindo|Burega|Taba": [
    "Bugarama",
    "Cyinzuzi",
    "Gasango",
    "Kiboha",
    "Kivomo",
    "Mwenene",
    "Mwite",
    "Ngange",
    "Nyagisozi",
    "Rubara",
    "Rusine",
    "Ryinzovu",
  ],

  // Bushoki Sector
  "Rulindo|Bushoki|Gasiza": [
    "Budaha",
    "Buhande",
    "Gitwa",
    "Karambi",
    "Remera",
    "Ruhanga",
    "Rulindo",
  ],
  "Rulindo|Bushoki|Giko": [
    "Buramira",
    "Cyiri",
    "Gashiru",
    "Karambo",
    "Kigamba",
    "Kivomo",
    "Ngarama",
    "Rugote",
  ],
  "Rulindo|Bushoki|Kayenzi": [
    "Gitaba",
    "Muduha",
    "Murambo",
    "Rebero",
    "Rwanzu",
  ],
  "Rulindo|Bushoki|Mukoto": [
    "Buvumo",
    "Buyogoma",
    "Gatare",
    "Marembo",
    "Muko",
    "Mukoto",
    "Rusave",
  ],
  "Rulindo|Bushoki|Nyirangarama": [
    "Bubiro",
    "Byimana",
    "Gatenga",
    "Gifuba",
    "Karambi",
    "Nyenyeri",
    "Nyirangarama",
    "Remera",
    "Tare",
    "Terambere",
  ],

  // Buyoga Sector
  "Rulindo|Buyoga|Busoro": [
    "Gashana",
    "Gatwa",
    "Karambo",
    "Kibanda",
    "Rugarama",
  ],
  "Rulindo|Buyoga|Butare": [
    "Gasave",
    "Giko",
    "Kankanga",
    "Karambi",
    "Ryanyirakayobe",
  ],
  "Rulindo|Buyoga|Gahororo": [
    "Bunyana",
    "Gatare",
    "Gatenderi",
    "Gipfundo",
    "Gitabura",
    "Shagasha",
  ],
  "Rulindo|Buyoga|Gitumba": [
    "Gitaba",
    "Munini",
    "Nyarubuye",
    "Remera",
    "Rutabo",
  ],
  "Rulindo|Buyoga|Karama": [
    "Cyasenge",
    "Kajeneni",
    "Karambi",
    "Karambo",
    "Kavumo",
    "Kigarama",
  ],
  "Rulindo|Buyoga|Mwumba": [
    "Gakoma",
    "Mataba",
    "Murambo",
    "Nyamwiza",
    "Nyarubuye",
  ],
  "Rulindo|Buyoga|Ndarage": [
    "Gahondo",
    "Gikingo",
    "Kagozi",
    "Karambi",
    "Kimagali",
  ],

  // Cyinzuzi Sector
  "Rulindo|Cyinzuzi|Budakiranya": [
    "Gatagara",
    "Gihinga",
    "Kamatongo",
    "Kanyoni",
    "Kavumu",
    "Kigarama",
    "Nyakabanga",
    "Rugaragara",
  ],
  "Rulindo|Cyinzuzi|Migendezo": [
    "Cyanya",
    "Gitabage",
    "Karambo",
    "Marembo",
    "Ngabitsinze",
    "Nyamugali",
    "Remera",
    "Rusagara",
  ],
  "Rulindo|Cyinzuzi|Rudogo": [
    "Gasekabuye",
    "Gaseke",
    "Gasizi",
    "Gihuke",
    "Kirambo",
    "Munini",
    "Munoga",
    "Musenyi",
  ],

  // Cyungo Sector
  "Rulindo|Cyungo|Burehe": [
    "Gitandi",
    "Karambo",
    "Karengeri",
    "Kibande",
    "Kibogora",
    "Nyagatovu",
    "Sove",
  ],
  "Rulindo|Cyungo|Marembo": [
    "Buyaga",
    "Gahinga",
    "Kibuye",
    "Kidomo",
    "Murambo",
    "Nganzo",
    "Rugaragara",
    "Rusayu",
  ],
  "Rulindo|Cyungo|Rwili": [
    "Kabanda",
    "Karambi",
    "Kirwa",
    "Kivumu",
    "Nturo",
    "Nyabisasa",
    "Sakara",
  ],

  // Kinihira Sector (Rulindo)
  "Rulindo|Kinihira|Butunzi": [
    "Akamiyove",
    "Barayi",
    "Bunahi",
    "Gisekuru",
    "Kinihira",
    "Ndorandi",
  ],
  "Rulindo|Kinihira|Karegamazi": [
    "Buhita",
    "Bwishya",
    "Gatembe",
    "Magezi",
    "Mutoyi",
    "Ntunguru",
  ],
  "Rulindo|Kinihira|Marembo": [
    "Buhunde",
    "Cyogo",
    "Gatare",
    "Kigali",
    "Kiyebe",
  ],
  "Rulindo|Kinihira|Rebero": ["Kabuga", "Karambi", "Kirwa", "Ndusu", "Rugundu"],

  // Kisaro Sector
  "Rulindo|Kisaro|Gitatsa": ["Kabere", "Ndago", "Ruberano", "Rwili"],
  "Rulindo|Kisaro|Kamushenyi": [
    "Gakenke",
    "Gatete",
    "Gatovu",
    "Kabeza",
    "Karambi",
    "Songa",
    "Wamahoro",
  ],
  "Rulindo|Kisaro|Kigarama": [
    "Gaseke",
    "Gasharu",
    "Nyantabo",
    "Runyinya",
    "Rwintare",
  ],
  "Rulindo|Kisaro|Mubuga": [
    "Gako",
    "Kibuye",
    "Kirenge",
    "Murambi",
    "Nyakarekare",
    "Rutabo",
  ],
  "Rulindo|Kisaro|Murama": [
    "Akamanama",
    "Gishinge",
    "Karambi",
    "Kibingwe",
    "Mugomero",
    "Ryarubuguza",
  ],
  "Rulindo|Kisaro|Sayo": [
    "Cyasuri",
    "Kibanda",
    "Nyamiyaga",
    "Rugarama",
    "Rusongati",
    "Rusumo",
  ],

  // Masoro Sector
  "Rulindo|Masoro|Kabuga": [
    "Gisiza",
    "Kanunga",
    "Karambi",
    "Kigarama",
    "Nyakibande",
    "Nyakizu",
    "Rubaya",
  ],
  "Rulindo|Masoro|Kigarama": ["Gacyamo", "Marenge", "Nyakabungo", "Rukurazo"],
  "Rulindo|Masoro|Kivugiza": ["Gasenga", "Musega", "Nyarurembo", "Rebero"],
  "Rulindo|Masoro|Nyamyumba": [
    "Kabeza",
    "Kabuga",
    "Kigomwa",
    "Marembo",
    "Rusenyi",
  ],
  "Rulindo|Masoro|Shengampuli": [
    "Agasharu",
    "Amataba",
    "Nyabinyana",
    "Rusine",
    "Umubuga",
    "Umutagata",
  ],

  // Mbogo Sector
  "Rulindo|Mbogo|Bukoro": [
    "Buhira",
    "Bukoro",
    "Gasama",
    "Gihonga",
    "Kalindi",
    "Kibamba",
    "Kibaya",
    "Kinini Ya Mbogo",
    "Ruhanya",
    "Rwambogo",
  ],
  "Rulindo|Mbogo|Mushari": [
    "Bukongi",
    "Buraro",
    "Buyanja",
    "Gitaba",
    "Nkurura",
    "Nyakabuye",
    "Rwambogo",
  ],
  "Rulindo|Mbogo|Ngiramazi": [
    "Gasovu",
    "Gikombe",
    "Gisha",
    "Kibungo",
    "Muhora",
    "Nyakabembe",
    "Yaramba",
  ],
  "Rulindo|Mbogo|Rurenge": [
    "Gakoma",
    "Gicumbi",
    "Gitaba",
    "Karehe",
    "Munini",
    "Ruhondo",
    "Rurenge",
    "Rutonde",
  ],

  // Murambi Sector (Rulindo)
  "Rulindo|Murambi|Bubangu": [
    "Gashubi",
    "Karambo",
    "Karwa",
    "Mayange",
    "Nyagisozi",
    "Rebero",
    "Ruhunga",
  ],
  "Rulindo|Murambi|Gatwa": [
    "Agatare",
    "Akarambi",
    "Amataba",
    "Gisiza",
    "Kabeza",
    "Karambo",
    "Kigarama",
  ],
  "Rulindo|Murambi|Mugambazi": [
    "Amahoro",
    "Buliza",
    "Gahama",
    "Gashinge",
    "Kigarama",
    "Nyarurembo",
    "Ruri",
  ],
  "Rulindo|Murambi|Mvuzo": [
    "Iraro",
    "Kabeza",
    "Kabuga",
    "Munyinya",
    "Mutabo",
    "Ntyaba",
    "Rurama",
  ],

  // Ngoma Sector (Rulindo)
  "Rulindo|Ngoma|Kabuga": [
    "Gatete",
    "Kagarama",
    "Kirambo",
    "Kiruli",
    "Nyabuko",
    "Rubona",
  ],
  "Rulindo|Ngoma|Karambo": [
    "Butare",
    "Jyambere",
    "Kagwa",
    "Karambi",
    "Marebe",
    "Nyakagezi",
  ],
  "Rulindo|Ngoma|Mugote": [
    "Cyabasigi",
    "Kiboha",
    "Kigina",
    "Mwishya",
    "Nyakibyeyi",
    "Riryi",
    "Rukoma",
    "Sakara",
  ],
  "Rulindo|Ngoma|Munyarwanda": [
    "Busizi",
    "Gaseke",
    "Kirungu",
    "Muyange",
    "Ngaru",
    "Nyaruvumu",
    "Rushayu",
    "Rushubi",
  ],

  // Ntarabana Sector
  "Rulindo|Ntarabana|Kajevuba": [
    "Bikamba",
    "Cyamutara",
    "Gitambi",
    "Kazi",
    "Nyakambu",
    "Nyarubuye",
    "Rukore",
    "Rusasa",
  ],
  "Rulindo|Ntarabana|Kiyanza": [
    "Gatobotobo",
    "Kabirizi",
    "Kivubwe",
    "Kiyanza I",
    "Nombe",
    "Nyagisozi",
    "Nyamurema",
    "Nyarurama",
  ],
  "Rulindo|Ntarabana|Mahaza": [
    "Burambi",
    "Gitwa",
    "Kamuhororo",
    "Karera",
    "Kayenzi",
    "Kibeho",
    "Rusekabuye",
  ],

  // Rukozo Sector
  "Rulindo|Rukozo|Buraro": [
    "Kabgayi",
    "Kabingo",
    "Kamiyove",
    "Kivomo",
    "Murwa",
    "Nyenyeri",
    "Rukingu",
    "Shyondwe",
  ],
  "Rulindo|Rukozo|Bwimo": [
    "Bushyana",
    "Gatiba",
    "Gatwa",
    "Kadendegeri",
    "Kavumo",
    "Mwana",
  ],
  "Rulindo|Rukozo|Mberuka": [
    "Gahwazi",
    "Gakubo",
    "Kabera",
    "Mataba",
    "Mutungo",
  ],
  "Rulindo|Rukozo|Mbuye": [
    "Kibare",
    "Mujebe",
    "Musave",
    "Nyarusebeya",
    "Ruhanga",
  ],

  // Rusiga Sector
  "Rulindo|Rusiga|Gako": [
    "Gifumba",
    "Kabunigu",
    "Kabuye",
    "Nkanga",
    "Ntakara",
    "Rwintare",
  ],
  "Rulindo|Rusiga|Kirenge": ["Kigarama", "Kinini-rusiga", "Ntaruka", "Rebero"],
  "Rulindo|Rusiga|Taba": [
    "Bitare",
    "Gahondo",
    "Karambi",
    "Karenge",
    "Kingazi",
    "Nyakarama",
  ],

  // Shyorongi Sector
  "Rulindo|Shyorongi|Bugaragara": [
    "Gatimba",
    "Gatwa",
    "Gisiza",
    "Kabaraza",
    "Kigarama",
    "Kiziranyenzi",
    "Nyakaruri",
    "Nyarushinya",
  ],
  "Rulindo|Shyorongi|Kijabagwe": [
    "Gaseke",
    "Kabagabaga",
    "Kabakene",
    "Nyamugari",
    "Rimwe",
    "Rugendabari",
  ],
  "Rulindo|Shyorongi|Muvumu": [
    "Cyikera",
    "Kagunda",
    "Karama",
    "Kavoma",
    "Kirurumo",
    "Kivili",
    "Mukumba",
    "Muvumu",
    "Nyabubare",
    "Ruhanga",
  ],
  "Rulindo|Shyorongi|Rubona": [
    "Bwimo",
    "Gishyita",
    "Kigali",
    "Ngona",
    "Nyabitare",
    "Nyarunyinya",
    "Nyarusange",
    "Rwahi",
  ],
  "Rulindo|Shyorongi|Rutonde": [
    "Bugarura",
    "Mwagiro",
    "Ngendo",
    "Nyabisindu",
    "Nyabyondo",
    "Nyamirembe",
    "Rutonde",
    "Rweya",
  ],

  // Tumba Sector (Rulindo)
  "Rulindo|Tumba|Barari": [
    "Gaseke",
    "Gashoro",
    "Karambi",
    "Kigarama",
    "Rukore",
  ],
  "Rulindo|Tumba|Gahabwa": [
    "Kabuga",
    "Kagusa",
    "Mafene",
    "Munyinya",
    "Rushaki",
  ],
  "Rulindo|Tumba|Misezero": [
    "Kanaba",
    "Karambi",
    "Kavumu",
    "Marembo",
    "Misezero",
    "Rurambo",
  ],
  "Rulindo|Tumba|Nyirabirori": [
    "Bukinga",
    "Gatare",
    "Gatsinde",
    "Gihanga",
    "Murambi",
    "Rugando",
    "Rusura",
  ],
  "Rulindo|Tumba|Taba": [
    "Kamuragi",
    "Mwili",
    "Nkinda",
    "Nyirambuga",
    "Nyirataba",
    "Ruvumba",
  ],

  // ============================================================
  // NORTH PROVINCE - Gicumbi District
  // ============================================================

  // Bukure Sector
  "Gicumbi|Bukure|Karenge": [
    "Gasharu",
    "Kabuga",
    "Kagarama",
    "Karenge",
    "Muguruka",
    "Nyarutovu",
    "Rebero",
  ],
  "Gicumbi|Bukure|Kigabiro": [
    "Gabiro",
    "Kanyogote",
    "Rugogwe",
    "Rurama",
    "Rwarenga",
  ],
  "Gicumbi|Bukure|Kivumu": [
    "Butare",
    "Karambo",
    "Karushya",
    "Kivugiza",
    "Kivumu",
    "Ruyange",
  ],
  "Gicumbi|Bukure|Rwesero": [
    "Gicaca",
    "Karagari",
    "Mugorore",
    "Ntarama",
    "Nyarubira",
  ],

  // Bwisige Sector
  "Gicumbi|Bwisige|Bwisige": [
    "Kabuye",
    "Kavuruga",
    "Kidandali",
    "Ndoha",
    "Nyakabungo",
    "Nyarubuye",
    "Nyarwina",
    "Rutoma",
    "Rwarurema",
  ],
  "Gicumbi|Bwisige|Gihuke": [
    "Cyamukanya",
    "Kumana",
    "Kumunini",
    "Kuwindenge",
    "Muneke",
    "Murehe",
    "Nyagakizi",
    "Nyakagera",
    "Nyamugari",
    "Rurenge",
  ],
  "Gicumbi|Bwisige|Mukono": [
    "Akavuza",
    "Murambi",
    "Nyarumba",
    "Nyirantungu",
    "Rwebisheke",
    "Rwondo",
    "Ryakirayi",
  ],
  "Gicumbi|Bwisige|Nyabushingitwa": [
    "Gahondo",
    "Musayo",
    "Ndayabana",
    "Nyagatoma",
    "Ruhuha",
    "Warufu",
  ],

  // Byumba Sector
  "Gicumbi|Byumba|Gacurabwenge": [
    "Gacurabwenge",
    "Gasharu",
    "Gashirwe",
    "Rubyiniro",
    "Ruyaga",
    "Rwasama",
  ],
  "Gicumbi|Byumba|Gisuna": [
    "Bereshi",
    "Gataba",
    "Gisuna",
    "Kinihira I",
    "Kinihira II",
    "Rebero",
    "Ruhashya",
    "Rwiri",
  ],
  "Gicumbi|Byumba|Kibali": ["Gakenke", "Mugorore", "Rugarama", "Ruzo"],
  "Gicumbi|Byumba|Kivugiza": ["Kabingo", "Karambi", "Kivugiza", "Mugandu"],
  "Gicumbi|Byumba|Murama": ["Gacaca", "Rukereza", "Rurambi"],
  "Gicumbi|Byumba|Ngondore": ["Bukamba", "Gitovu", "Karambo", "Kimirimo"],
  "Gicumbi|Byumba|Nyakabungo": ["Gacyamo", "Kabuga", "Kanunga", "Rugaragara"],
  "Gicumbi|Byumba|Nyamabuye": [
    "Gasiza",
    "Gateke",
    "Kumana",
    "Mugomero",
    "Nyiragasuruba",
    "Rwabukoko",
    "Umurara",
  ],
  "Gicumbi|Byumba|Nyarutarama": [
    "Kagarama",
    "Mukeri",
    "Muriza",
    "Nyamiyaga",
    "Nyamugali",
    "Nyande",
    "Nyarubande",
    "Rugandu",
    "Rugarama",
    "Rwamuhuba",
  ],

  // Cyumba Sector
  "Gicumbi|Cyumba|Gasunzu": ["Mubuga", "Mugera", "Ryamuromba", "Zihare"],
  "Gicumbi|Cyumba|Muhambo": ["Kiliba", "Nyamabare", "Rugerero"],
  "Gicumbi|Cyumba|Nyakabungo": [
    "Burambira",
    "Gashija",
    "Gatobotobo",
    "Kabare",
    "Kigombe",
    "Remera",
    "Ryaruhumba",
  ],
  "Gicumbi|Cyumba|Nyambare": ["Burambira", "Gipandi", "Remera", "Rusebeya"],
  "Gicumbi|Cyumba|Nyaruka": ["Burindi", "Humura", "Maya", "Murore", "Rusambya"],
  "Gicumbi|Cyumba|Rwankonjo": [
    "Gatuna",
    "Kagera",
    "Keyebe",
    "Kivuruga",
    "Rukizi",
  ],

  // Giti Sector
  "Gicumbi|Giti|Gatobotobo": [
    "Kababito",
    "Kabacuzi",
    "Kagahumbi",
    "Matyazo",
    "Nyamirambo",
    "Rugarama",
  ],
  "Gicumbi|Giti|Murehe": [
    "Bisika",
    "Bushiranyota",
    "Butare",
    "Cyamabano",
    "Gatare",
    "Kabeza",
    "Kigabiro",
  ],
  "Gicumbi|Giti|Tanda": [
    "Gasharu",
    "Mashyoza",
    "Nganwa",
    "Nyakabungo",
    "Ruzizi",
    "Tanda",
  ],

  // Kageyo Sector (Gicumbi)
  "Gicumbi|Kageyo|Gihembe": [
    "Gitaba",
    "Karihira",
    "Munini",
    "Muyange",
    "Nyaruvumu",
    "Nyirabadugu",
  ],
  "Gicumbi|Kageyo|Horezo": ["Kigoma", "Musetsa", "Nyirangoga", "Rukongi"],
  "Gicumbi|Kageyo|Nyamiyaga": [
    "Gatiba",
    "Gicumbi",
    "Maya",
    "Mukenke",
    "Murama",
  ],
  "Gicumbi|Kageyo|Kabuga": [
    "Gatare",
    "Gatete",
    "Kabare",
    "Kageyo",
    "Mugomero",
    "Musura",
    "Mutobo",
    "Rukomo",
  ],
  "Gicumbi|Kageyo|Muhondo": ["Kagwa", "Kamanyundo", "Kamwumba", "Mwange"],

  // Kaniga Sector
  "Gicumbi|Kaniga|Bugomba": [
    "Kabungo",
    "Kajevuba",
    "Nyaruhanga",
    "Rugarama",
    "Rugari",
    "Ryakabanda",
  ],
  "Gicumbi|Kaniga|Gatoma": [
    "Gashiru",
    "Kamabare",
    "Nyakagera",
    "Nyakara",
    "Nyakibande",
    "Rugarama",
  ],
  "Gicumbi|Kaniga|Mulindi": [
    "Centre Mulindi",
    "Gisunzu",
    "Kagorogoro",
    "Kigwene",
    "Nyakabungo",
    "Rugenda",
    "Ruhita",
    "Rukizi",
    "Runyinya",
  ],
  "Gicumbi|Kaniga|Nyarwambu": [
    "Cyasaku",
    "Kabeza",
    "Kanyaruyonga",
    "Kinnyogo",
    "Mushunga",
    "Nyamabare",
  ],
  "Gicumbi|Kaniga|Rukurura": [
    "Kabare",
    "Kamushure",
    "Karambo",
    "Ngabira",
    "Nyagatare",
  ],

  // Manyagiro Sector
  "Gicumbi|Manyagiro|Kabuga": [
    "Gabiro",
    "Kigarama",
    "Mugera",
    "Murehe",
    "Mutara",
    "Rubindi",
  ],
  "Gicumbi|Manyagiro|Nyiragifumba": [
    "Gacyamo",
    "Kiyovu",
    "Murambo",
    "Rurambi",
    "Rwamazi",
  ],
  "Gicumbi|Manyagiro|Nyiravugiza": [
    "Bugibwa",
    "Kajevuba",
    "Rurembo",
    "Rusebeya",
  ],
  "Gicumbi|Manyagiro|Remera": [
    "Busa",
    "Bushinga",
    "Gasiza",
    "Gitaba",
    "Kabeza",
    "Rugasa",
    "Sangano",
    "Shyigura",
  ],
  "Gicumbi|Manyagiro|Rusekera": [
    "Gakubo",
    "Kavure",
    "Kiyovu",
    "Nyamyumba",
    "Rebero",
  ],
  "Gicumbi|Manyagiro|Ryaruyumba": [
    "Gatonde",
    "Gatungo",
    "Muturirwa",
    "Nyantarure",
    "Nyarukombe",
    "Rugasa",
    "Rusabira",
  ],

  // Miyove Sector
  "Gicumbi|Miyove|Gakenke": [
    "Gisiza",
    "Karwanira",
    "Kirwa",
    "Kivomo",
    "Museke",
    "Nyarurambi",
    "Rugandu",
  ],
  "Gicumbi|Miyove|Miyove": [
    "Kamonyi",
    "Karambo",
    "Mpinga",
    "Mukaka",
    "Murambo",
    "Murehe",
    "Nyamiyaga",
    "Nyarubuye",
    "Rebero",
    "Remera",
  ],
  "Gicumbi|Miyove|Mubuga": [
    "Gitsimbura",
    "Kabuga",
    "Kacyiru",
    "Kagote",
    "Kaje",
    "Kirwa",
    "Kivumu",
    "Mubuga",
    "Murambo",
    "Rutovu",
    "Tetero",
  ],

  // Mukarange Sector (Gicumbi)
  "Gicumbi|Mukarange|Cyamuganga": [
    "Burambira",
    "Ndarama",
    "Nyakabungo",
    "Rugarama",
  ],
  "Gicumbi|Mukarange|Gatenga": [
    "Ibereshi",
    "Kagunga",
    "Kiyorwa",
    "Mugina",
    "Nyacyoroma",
    "Nyange",
  ],
  "Gicumbi|Mukarange|Kiruhura": ["Burembo", "Gacwamba", "Kariba", "Nyamutoko"],
  "Gicumbi|Mukarange|Mutarama": [
    "Gikore",
    "Kaziba",
    "Mafumirwa",
    "Murara",
    "Rugeshi",
  ],
  "Gicumbi|Mukarange|Rugerero": [
    "Gakizi",
    "Kagarama",
    "Kinnyogo",
    "Munyege",
    "Rurembo",
    "Rushasha",
    "Ruziku",
  ],
  "Gicumbi|Mukarange|Rusambya": ["Kabungo", "Kagane", "Nyagakizi", "Rusambya"],

  // Muko Sector (Gicumbi)
  "Gicumbi|Muko|Cyamuhinda": [
    "Gicuregenya",
    "Ntonyanga",
    "Rugaragara",
    "Rukazire",
    "Rwamitembe",
  ],
  "Gicumbi|Muko|Kigoma": [
    "Cyerere",
    "Gatobotobo",
    "Karambi",
    "Karumuli",
    "Ryarwoga",
  ],
  "Gicumbi|Muko|Mwendo": ["Gikumba", "Kabuye", "Kagogo", "Kirengo"],
  "Gicumbi|Muko|Ngange": ["Gasharu", "Kabare", "Kimpongo", "Mayora", "Rudogo"],
  "Gicumbi|Muko|Rebero": [
    "Gasizi",
    "Karundi",
    "Kirara",
    "Kirwanirwa",
    "Mayogi",
    "Nyampundu",
    "Ryagashaka",
  ],
  // Mutete Sector
  "Gicumbi|Mutete|Gaseke": [
    "Gasharu",
    "Gihira",
    "Irasaniro",
    "Ngando",
    "Nyamabuye",
    "Nyamiryango",
    "Nyamugari",
    "Runyinya",
  ],
  "Gicumbi|Mutete|Kabeza": [
    "Busabira",
    "Kabasega",
    "Kagarama",
    "Merezo",
    "Minanire",
    "Nyagasozi",
    "Rusebeya",
  ],
  "Gicumbi|Mutete|Musenyi": [
    "Gataba",
    "Karambi",
    "Kimisugi",
    "Muhororo",
    "Rukondo",
    "Rurama",
    "Rutongo",
  ],
  "Gicumbi|Mutete|Mutandi": [
    "Gatare",
    "Gihangara",
    "Kamaganga",
    "Karama",
    "Karambi",
    "Kariku",
    "Muhengeri",
    "Nyarubande",
  ],
  "Gicumbi|Mutete|Nyarubuye": [
    "Gitega",
    "Kajwejwe",
    "Kavumu",
    "Mataba",
    "Nkenzi",
    "Rugarama",
    "Ruhondo",
    "Rusumo",
  ],

  // Nyamiyaga Sector (Gicumbi)
  "Gicumbi|Nyamiyaga|Gahumuliza": ["Majyambere", "Maya", "Ruhango"],
  "Gicumbi|Nyamiyaga|Jamba": ["Byimana", "Kamabuye", "Kumuremure", "Rugarama"],
  "Gicumbi|Nyamiyaga|Kabeza": ["Karambo", "Mataba", "Mugorore", "Rugari"],
  "Gicumbi|Nyamiyaga|Kabuga": ["Kabeza", "Kaduha", "Mubuga", "Nyarubuye"],
  "Gicumbi|Nyamiyaga|Karambo": ["Gaseke", "Gatare", "Kinyinya", "Murama"],
  "Gicumbi|Nyamiyaga|Kiziba": ["Gasave", "Karambi", "Nyirakagamba", "Rwingwe"],
  "Gicumbi|Nyamiyaga|Mataba": ["Mataba", "Miyange", "Rugarama", "Ruyaga"],

  // Nyankenke Sector
  "Gicumbi|Nyankenke|Butare": [
    "Gikombe",
    "Kabere",
    "Rwambeho",
    "Rwirute",
    "Ryabishanga",
  ],
  "Gicumbi|Nyankenke|Kigogo": [
    "Gakoma",
    "Gasake",
    "Gatare",
    "Kiyovu",
    "Ntabangira",
    "Rusayu",
  ],
  "Gicumbi|Nyankenke|Kinishya": [
    "Gashiru",
    "Kabuga",
    "Nyagafunzo",
    "Nyirantarengwa",
    "Rwata",
  ],
  "Gicumbi|Nyankenke|Rusasa": [
    "Birumba",
    "Mashyiga",
    "Nyangezi",
    "Rembero",
    "Ruhoho",
  ],
  "Gicumbi|Nyankenke|Rutete": [
    "Kabingo",
    "Kageje",
    "Nyamugali",
    "Ruhinga",
    "Ryanterura",
    "Shokero",
  ],
  "Gicumbi|Nyankenke|Rwagihura": [
    "Gacaca",
    "Kabahura",
    "Kagogo",
    "Mwendo",
    "Rwagihura",
  ],
  "Gicumbi|Nyankenke|Yaramba": [
    "Cyankaranka",
    "Mwenyi",
    "Nturo",
    "Nyarubuye",
    "Nyirakazo",
  ],

  // Rubaya Sector
  "Gicumbi|Rubaya|Gihanga": [
    "Gomba",
    "Kirimbi",
    "Nkurura",
    "Runaba",
    "Rusambya",
  ],
  "Gicumbi|Rubaya|Gishambashayo": ["Gashiru", "Karambo"],
  "Gicumbi|Rubaya|Gishari": ["Kabaya", "Kagugo", "Mugote", "Nyakesha"],
  "Gicumbi|Rubaya|Muguramo": ["Centre Rubaya", "Gasheke", "Mabare", "Ngange"],
  "Gicumbi|Rubaya|Nyamiyaga": ["Kabeza", "Kiriba", "Mariba"],

  // Rukomo Sector (Gicumbi)
  "Gicumbi|Rukomo|Cyeya": [
    "Birambo",
    "Bisika",
    "Bwuhira",
    "Gatare",
    "Kanombe",
    "Rwambungo",
  ],
  "Gicumbi|Rukomo|Cyuru": [
    "Bukamba",
    "Kabuga",
    "Karengo",
    "Kimiko",
    "Muhama",
    "Nyamutezi",
    "Sabiro",
  ],
  "Gicumbi|Rukomo|Gisiza": [
    "Gitaba",
    "Karambi",
    "Nyarubuye",
    "Rushubi",
    "Rusumo",
  ],
  "Gicumbi|Rukomo|Kinyami": [
    "Gahondo",
    "Gasharara",
    "Kariba",
    "Kivugiza",
    "Meshero",
    "Rukomo",
    "Ryarubanza",
  ],
  "Gicumbi|Rukomo|Mabare": [
    "Cyingoma",
    "Kanyiramana",
    "Kararama",
    "Kayungwe",
    "Mburamazi",
    "Murambo",
    "Ryandinda",
  ],
  "Gicumbi|Rukomo|Munyinya": [
    "Kabeza",
    "Kabuga",
    "Mataba",
    "Munyinya",
    "Nyankokoma",
    "Rwamushumba",
  ],

  // Rushaki Sector
  "Gicumbi|Rushaki|Gitega": [
    "Bugwe",
    "Gisiza",
    "Gitega",
    "Kabo",
    "Karambi",
    "Karambo",
    "Rubyiro",
    "Ryaruganzu",
  ],
  "Gicumbi|Rushaki|Kamutora": [
    "Gashinge",
    "Kabuga",
    "Kamutora",
    "Karwoga",
    "Mabare",
    "Nkamba",
    "Nyamyumba",
    "Remera",
  ],
  "Gicumbi|Rushaki|Karurama": [
    "C. Rushaki",
    "Gatoki",
    "Izinga",
    "Mbuga",
    "Ngabira",
    "Nyaruhanga",
    "Rumuri",
    "Rwaranda",
  ],

  // Rutare Sector
  "Gicumbi|Rutare|Bikumba": [
    "Karugeyo",
    "Kintaganirwa",
    "Marembo",
    "Matyazo",
    "Nyabisindu",
  ],
  "Gicumbi|Rutare|Gasharu": [
    "Buyegero",
    "Kabagabo",
    "Kabusunzu",
    "Kagarama",
    "Rwimbogo",
    "Yogi",
  ],
  "Gicumbi|Rutare|Gatwaro": ["Bureranyana", "Gashinya", "Kabira", "Kanaba"],
  "Gicumbi|Rutare|Kigabiro": [
    "Kabuye",
    "Munini",
    "Nyakabingo",
    "Nyakavunga",
    "Rugarama",
  ],
  "Gicumbi|Rutare|Munanira": [
    "Bushokanyambo",
    "Gasharu",
    "Kirwa",
    "Mataba",
    "Ruti",
  ],
  "Gicumbi|Rutare|Nkoto": [
    "Bariza",
    "Bwangamwanda",
    "Murehe",
    "Nyagatoma",
    "Nyansenge",
  ],

  // Ruvune Sector
  "Gicumbi|Ruvune|Cyandaro": [
    "Karambo",
    "Kigarama",
    "Mushesho",
    "Nyankokoma",
    "Rugarama",
  ],
  "Gicumbi|Ruvune|Gasambya": [
    "Karambi",
    "Kirara",
    "Mataba",
    "Nyamirama",
    "Ruhete",
    "Ryasunzu",
  ],
  "Gicumbi|Ruvune|Gashirira": [
    "Kagasha",
    "Nyarubuye",
    "Nyarurama",
    "Nyarwina",
    "Remera",
    "Rugerero",
  ],
  "Gicumbi|Ruvune|Kabare": ["Buyanja", "Murehe", "Nyarusange"],
  "Gicumbi|Ruvune|Rebero": [
    "Bitoma",
    "Burambo",
    "Gatare",
    "Kirwa",
    "Mwanza",
    "Rwaburegeya",
    "Rwamiko",
    "Sunzu",
  ],
  "Gicumbi|Ruvune|Ruhondo": [
    "Gatoki",
    "Karambo",
    "Kirwa",
    "Mugorore",
    "Nyagakizi",
    "Nyakaju",
    "Rwinyana",
  ],

  // Rwamiko Sector (Gicumbi)
  "Gicumbi|Rwamiko|Cyeru": [
    "Bugarura",
    "Gabiro",
    "Kamurenzi",
    "Karika",
    "Mukuyu",
    "Murambi",
    "Nyagasozi",
    "Rugarama",
  ],
  "Gicumbi|Rwamiko|Kigabiro": [
    "Cyiri",
    "Kabira",
    "Kanyove",
    "Karangara",
    "Mutambiko",
    "Rubuye",
  ],
  "Gicumbi|Rwamiko|Nyagahinga": [
    "Kabusunzu",
    "Kibiraro",
    "Kigaga",
    "Ntaremba",
    "Rugarama",
  ],

  // Shangasha Sector
  "Gicumbi|Shangasha|Bushara": ["Bushara", "Gasura", "Gatare", "Nganzo"],
  "Gicumbi|Shangasha|Kitazigurwa": [
    "Gacyamo",
    "Iharama",
    "Mubuga",
    "Ntomvu",
    "Rugarama",
  ],
  "Gicumbi|Shangasha|Nyabishambi": [
    "Gasiza",
    "Kagali",
    "Karambo",
    "Matyazo",
    "Murambo",
    "Rukiniro",
    "Rutete",
  ],
  "Gicumbi|Shangasha|Nyabubare": [
    "Bikumba",
    "Irembo",
    "Karuhanga",
    "Nyakabingo",
    "Nyamiyaga",
  ],
  "Gicumbi|Shangasha|Shangasha": [
    "Ituze",
    "Kabeza",
    "Kajyanjyali",
    "Rugali",
    "Runaba",
    "Ryamatebura",
  ],

  // ============================================================
  // EAST PROVINCE - Rwamagana District
  // ============================================================

  // Fumbwe Sector
  "Rwamagana|Fumbwe|Mununu": [
    "Cyingara",
    "Janjagiro",
    "Kabeza",
    "Kabuga",
    "Ndinda",
    "Nyirabiteri",
  ],
  "Rwamagana|Fumbwe|Nyagasambu": [
    "Mataba",
    "Rambura",
    "Rebero",
    "Rugarama",
    "Rugenge",
  ],
  "Rwamagana|Fumbwe|Nyakagunga": ["Akabeza", "Kibaza", "Kirehe", "Rugarama"],
  "Rwamagana|Fumbwe|Nyamirama": [
    "Agatare",
    "Akagarama",
    "Bigarama",
    "Cyarutabana",
    "Amakwandi",
    "Ntungamo",
    "Shenga",
  ],
  "Rwamagana|Fumbwe|Nyarubuye": [
    "Gihima",
    "Gitwe",
    "Kabirizi",
    "Kivugiza",
    "Murambi",
    "Rurembo",
  ],
  "Rwamagana|Fumbwe|Sasabirago": [
    "Birembo",
    "Byimana",
    "Irukwaya",
    "Karambo",
    "Munini",
  ],

  // Gahengeri Sector
  "Rwamagana|Gahengeri|Gihumuza": [
    "Cyanga",
    "Gatare",
    "Kabeza",
    "Kajevuba",
    "Nyirabujari",
    "Rebero",
  ],
  "Rwamagana|Gahengeri|Kagezi": [
    "Akabuga",
    "Kabonero",
    "Rwarugaju",
    "Samatare",
  ],
  "Rwamagana|Gahengeri|Kanyangese": [
    "Agakari",
    "Gatenderi",
    "Ruhita",
    "Umunini",
  ],
  "Rwamagana|Gahengeri|Kibare": [
    "Iramiro",
    "Kabuye",
    "Kanserege",
    "Karutimbo",
    "Kinyovi",
    "Rurambi",
  ],
  "Rwamagana|Gahengeri|Mutamwa": [
    "Agasharu",
    "Kamugasa",
    "Nyabagaza",
    "Nyirarwirungu",
    "Rubonobono",
    "Rugagi",
    "Ryasenteteri",
  ],
  "Rwamagana|Gahengeri|Rugarama": [
    "Amatafari",
    "Byimana",
    "Mataba",
    "Nyakiri",
    "Nyarucyamo",
    "Rebero",
  ],
  "Rwamagana|Gahengeri|Runyinya": [
    "Akamasasa",
    "Cyeru",
    "Gacunshu",
    "Kabarore",
    "Karambo",
    "Kiyovu",
    "Ruyumba",
    "Ryamuzuka",
  ],
  "Rwamagana|Gahengeri|Rweri": [
    "Kabigondo",
    "Kamurindi",
    "Akinteko",
    "Kiruruma",
    "Mataba",
    "Nyamugari",
  ],

  // Gishali Sector
  "Rwamagana|Gishali|Binunga": ["Busharu", "Nyakivomo", "Rurindimura"],
  "Rwamagana|Gishali|Bwinsanga": [
    "Akanogo",
    "Mugusha",
    "Nyakabungo",
    "Shaburondo",
  ],
  "Rwamagana|Gishali|Cyinyana": ["Nyagacyamo", "Nyakagarama", "Ururembo"],
  "Rwamagana|Gishali|Gati": ["Agatare", "Nyamabuye", "Umunanira", "Uruhuha"],
  "Rwamagana|Gishali|Kavumu": ["Akabuga", "Ingeyo", "Kibonde", "Uruyenzi"],
  "Rwamagana|Gishali|Ruhimbi": [
    "Abakina",
    "Byimana",
    "Cyiri",
    "Rwagahaya",
    "Umunini",
  ],
  "Rwamagana|Gishali|Ruhunda": ["Mpungwe", "Nyagahinga", "Nyagakombe"],

  // Karenge Sector (Rwamagana)
  "Rwamagana|Karenge|Bicaca": [
    "Bicaca",
    "Cyanyirampazi",
    "Cyarugaju",
    "Kabeza",
    "Kajevuba",
    "Karuyenzi",
    "Runzenze",
  ],
  "Rwamagana|Karenge|Byimana": ["Byimana", "Karambo", "Kiyaya", "Rukori"],
  "Rwamagana|Karenge|Kabasore": [
    "Ipide",
    "Kabasore",
    "Migamba",
    "Nyagatovu",
    "Ruvomo",
  ],
  "Rwamagana|Karenge|Kangamba": [
    "Byimana",
    "Kagese",
    "Kangamba",
    "Kimarambasa",
    "Nkongi",
  ],
  "Rwamagana|Karenge|Karenge": ["Bwiza", "Karenge", "Ntebe", "Rebero"],
  "Rwamagana|Karenge|Nyabubare": [
    "Feri",
    "Kanyangese",
    "Nyabubare",
    "Rwinka",
    "Ryamugabo",
  ],
  "Rwamagana|Karenge|Nyamatete": [
    "Cyerwa",
    "Mutabo",
    "Ndengo",
    "Nyagasenyi",
    "Nyakabuye",
    "Nyamatete",
  ],

  // Kigabiro Sector (Rwamagana)
  "Rwamagana|Kigabiro|Bwiza": [
    "Gitega",
    "Kagerero",
    "Munini",
    "Nyakabande",
    "Rutaka",
    "Rutonde",
    "Rweza",
  ],
  "Rwamagana|Kigabiro|Cyanya": [
    "Bigabiro",
    "Biraro",
    "Busanza",
    "Cyahafi",
    "Kabeza",
    "Kabuye",
    "Kamata",
    "Karuhayi",
    "Karutimbo",
    "Rurembo",
  ],
  "Rwamagana|Kigabiro|Nyagasenyi": [
    "Gahonogo",
    "Kavura",
    "Kayenzi",
    "Kigega",
    "Kirehe",
    "Ramba",
    "Rusave",
    "Umuganura",
  ],
  "Rwamagana|Kigabiro|Sibagire": [
    "Bacyoro",
    "Bugugu",
    "Cyimpima",
    "Gasharu",
    "Kabuga",
    "Kamanga",
    "Miyange",
  ],
  "Rwamagana|Kigabiro|Sovu": [
    "Cyaruhogo",
    "Gatare",
    "Kiruhura",
    "Nyabishunzi",
    "Rugobagoba",
    "Rushangara",
  ],

  // Muhazi Sector
  "Rwamagana|Muhazi|Byeza": ["Gatobotobo", "Kabeza", "Nyarukombe"],
  "Rwamagana|Muhazi|Kabare": ["Birembo", "Ubwiza", "Umunini", "Uwimanzi"],
  "Rwamagana|Muhazi|Karambi": ["Gahengeri", "Kayenzi", "Kinunga", "Ragwe"],
  "Rwamagana|Muhazi|Karitutu": [
    "Agatare",
    "Cyeru",
    "Karambo",
    "Kingondo",
    "Nyarugarama",
  ],
  "Rwamagana|Muhazi|Kitazigurwa": ["Byimana", "Gasharu", "Kabirizi", "Karwiru"],
  "Rwamagana|Muhazi|Murambi": ["Gasharu", "Kabusunzu", "Nyendo", "Yabaranda"],
  "Rwamagana|Muhazi|Nsinda": ["Akabeza", "Kibare", "Rubirizi"],
  "Rwamagana|Muhazi|Ntebe": ["Amagaju", "Urugero", "Urugwiro"],
  "Rwamagana|Muhazi|Nyarusange": [
    "Akagarama",
    "Akatorero",
    "Gahondo",
    "Kanywiriri",
    "Kavura",
    "Kidogo",
    "Mpinga",
    "Plage",
    "Umubuga",
  ],

  // Munyaga Sector
  "Rwamagana|Munyaga|Kaduha": [
    "Gishike",
    "Kababero",
    "Kabare",
    "Kamamana",
    "Kangabo",
    "Kigabiro",
    "Rwakigara",
    "Rwimbogo",
  ],
  "Rwamagana|Munyaga|Nkungu": [
    "Kabuye",
    "Kiryango",
    "Mataba",
    "Nyagakombe",
    "Rudashya",
    "Rushangara",
  ],
  "Rwamagana|Munyaga|Rweru": [
    "Birayi",
    "Gatare",
    "Kabingo",
    "Kanyegera",
    "Mubuga",
  ],
  "Rwamagana|Munyaga|Zinga": ["Cyinganzwa", "Kabazeyi", "Karambo", "Rwisange"],

  // Munyiginya Sector
  "Rwamagana|Munyiginya|Binunga": [
    "Irebero",
    "Isangano",
    "Kabeza",
    "Umuhumuro",
    "Urugwiza",
  ],
  "Rwamagana|Munyiginya|Bwana": [
    "Kabuye",
    "Kiruhura",
    "Rutembo",
    "Rwagahigi",
    "Rwamugurusu",
    "Rweza",
    "Umurinzi",
  ],
  "Rwamagana|Munyiginya|Cyarukamba": ["Kabenda", "Kagarama", "Ndago", "Rweza"],
  "Rwamagana|Munyiginya|Cyimbazi": [
    "Agatare",
    "Akabuye",
    "Ntunga",
    "Nyagakombe",
  ],
  "Rwamagana|Munyiginya|Nkomangwa": [
    "Bakannyi",
    "Kabuye",
    "Karubisha",
    "Nyagahanga",
    "Ryamirenge",
  ],
  "Rwamagana|Munyiginya|Nyarubuye": [
    "Babasha",
    "Buyanja",
    "Kabeza",
    "Kimara",
    "Kiyovu",
    "Mazinga",
    "Nkindi",
  ],

  // Musha Sector (Rwamagana)
  "Rwamagana|Musha|Akabare": [
    "Akabare",
    "Binunga",
    "Budahigwa",
    "Duha",
    "Gashikiri",
    "Rugabano",
    "Rukombe",
  ],
  "Rwamagana|Musha|Budahanda": ["Karambo", "Nyantoki", "Rwabiyange"],
  "Rwamagana|Musha|Kagarama": [
    "Kagarama",
    "Kiruhura",
    "Muhogoto",
    "Nyagacyamo",
    "Nyamigano",
  ],
  "Rwamagana|Musha|Musha": [
    "Gatika",
    "Kadasumbwa",
    "Karifuru",
    "Nyakiriba",
    "Rugarama",
  ],
  "Rwamagana|Musha|Nyabisindu": [
    "Agashuhe",
    "Busanza",
    "Bwiza",
    "Nyabisindu",
    "Rujumbura",
    "Rwamivu",
    "Umunini",
  ],
  "Rwamagana|Musha|Nyakabanda": ["Bitsibo", "Ruhita", "Rutoma"],

  // Muyumbu Sector
  "Rwamagana|Muyumbu|Akinyambo": [
    "Akubugingo",
    "Kampigika",
    "Rugarama",
    "Ryabaheshwa",
  ],
  "Rwamagana|Muyumbu|Bujyujyu": [
    "Gatare",
    "Gishaka",
    "Kabeza",
    "Kagona",
    "Karama",
    "Rebero",
    "Rubaza",
    "Rusave",
    "Yeruzalemu",
  ],
  "Rwamagana|Muyumbu|Murehe": [
    "Bitega",
    "Kajororo",
    "Kayigi",
    "Miyove",
    "Murehe",
    "Ruvomo",
  ],
  "Rwamagana|Muyumbu|Ntebe": [
    "Gakomeye",
    "Gasave",
    "Gisenyi",
    "Kabagabo",
    "Kajevuba",
    "Kanyinya",
    "Nyarubambo",
    "Samuramba",
  ],
  "Rwamagana|Muyumbu|Nyarukombe": [
    "Gatuza",
    "Gitaraga",
    "Gituza",
    "Kinunga",
    "Marembo",
    "Mugogo",
    "Mumena",
    "Rubona",
  ],

  // Mwulire Sector
  "Rwamagana|Mwulire|Bicumbi": [
    "Bicumbi",
    "Gasharu",
    "Karama",
    "Manene",
    "Nyagihanga",
    "Rwimbogo",
    "Sabusaro",
  ],
  "Rwamagana|Mwulire|Bushenyi": [
    "Byange",
    "Kabahima",
    "Kangaruye",
    "Rebero",
    "Rubiha",
    "Ruseke",
  ],
  "Rwamagana|Mwulire|Mwulire": [
    "Cyome",
    "Gisanza",
    "Akagarama",
    "Kigabiro",
    "Mpinga",
    "Munini I",
    "Munini II",
    "Rebero",
  ],
  "Rwamagana|Mwulire|Ntunga": [
    "Cyimbazi",
    "Kabacuzi",
    "Kadasumbwa",
    "Karuzigura",
    "Kiyovu",
    "Nkira",
    "Ntunga",
    "Rugarama",
    "Rugenge",
  ],

  // Nyakaliro Sector
  "Rwamagana|Nyakaliro|Bihembe": [
    "Bihembe",
    "Busimbuzi",
    "Butare",
    "Kabere",
    "Kanyangese",
    "Mubumbwe",
    "Ngarama",
    "Rusheshe",
  ],
  "Rwamagana|Nyakaliro|Gatare": [
    "Gatare",
    "Karogo",
    "Kigina",
    "Runzenze",
    "Samuduha",
  ],
  "Rwamagana|Nyakaliro|Gishore": [
    "Gishore",
    "Kagarama",
    "Matyazo",
    "Nyirabuhene",
    "Rugende",
    "Ruhanika",
    "Rusagara",
    "Rusave",
    "Rususa",
  ],
  "Rwamagana|Nyakaliro|Munini": [
    "Akamasatura",
    "Munini",
    "Nyakagarama",
    "Nyarurembo",
    "Nyarutovu",
    "Nyiramitemeri",
    "Rwamibungo",
    "Rwankacari",
  ],
  "Rwamagana|Nyakaliro|Rwimbogo": [
    "Cyaruhinda",
    "Kamashaza",
    "Kasemanyana",
    "Kimicanga",
    "Nduba",
    "Nduhuye",
    "Rwimbogo",
    "Ryarurindo",
  ],

  // Nzige Sector
  "Rwamagana|Nzige|Akanzu": [
    "Akanzige",
    "Akanzu",
    "Cyahafi",
    "Cyerwa",
    "Gikoni",
    "Gitanu",
    "Kiyovu",
    "Nyarugenge",
  ],
  "Rwamagana|Nzige|Kigarama": [
    "Gisenyi",
    "Kajevuba",
    "Kamabuye",
    "Karukannyi",
    "Mikoni",
    "Mubuga",
    "Nyarutovu",
    "Rugunga",
  ],
  "Rwamagana|Nzige|Murama": [
    "Agasharu",
    "Gatoki",
    "Kabeza",
    "Kamakuka",
    "Kibabara",
    "Ndinda",
    "Nyarusange",
  ],
  "Rwamagana|Nzige|Rugarama": [
    "Bicaca",
    "Bitega",
    "Kayibanda",
    "Nyabugogo",
    "Ruvomo",
    "Rwagatsama",
  ],

  // Rubona Sector (Rwamagana)
  "Rwamagana|Rubona|Byinza": [
    "Bidudu",
    "Gitwa",
    "Kabayange I",
    "Kabayange II",
    "Mumahoro",
    "Munini",
    "Umumeyu",
    "Uwadesa",
  ],
  "Rwamagana|Rubona|Kabatasi": [
    "Agasharu",
    "Gitaraga",
    "Kabuye",
    "Kibabara",
    "Kiboha",
    "Midahandwa",
    "Mitari",
    "Nyagatare",
    "Rusenyi",
    "Umurehe",
  ],
  "Rwamagana|Rubona|Kabuye": ["Agatare", "Cyamuyango", "Rubumba", "Rutare"],
  "Rwamagana|Rubona|Karambi": [
    "Bigaga",
    "Byobo",
    "Karambi",
    "Mataba",
    "Rugarama",
  ],
  "Rwamagana|Rubona|Mabare": [
    "Amarimba",
    "Bitare",
    "Gasharu",
    "Nyamabuye",
    "Rubirizi",
    "Rusanza",
    "Umubuga",
    "Urugwiro",
  ],
  "Rwamagana|Rubona|Nawe": ["Cyiri", "Gaseke", "Rudashya"],

  // ============================================================
  // EAST PROVINCE - Nyagatare District
  // ============================================================

  // Gatunda Sector
  "Nyagatare|Gatunda|Cyagaju": [
    "Hanganyundo",
    "Iramiro",
    "Isangano",
    "Kabeza",
    "Kibisabo",
  ],
  "Nyagatare|Gatunda|Kabeza": [
    "Huriro",
    "Kabeza",
    "Muvumba",
    "Muyenzi",
    "Nyamirambo",
    "Rebero",
  ],
  "Nyagatare|Gatunda|Nyamikamba": [
    "Byimana",
    "Gikunyu",
    "Gitega",
    "Gitovu",
    "Kaburimbo",
    "Kibuye",
    "Nyamikamba",
    "Rwebare",
    "Ryabuvara",
    "Ryarukabura",
  ],
  "Nyagatare|Gatunda|Nyamirembe": [
    "Byimana",
    "Huriro",
    "Kajevuba",
    "Kirindimure",
    "Mabare",
  ],
  "Nyagatare|Gatunda|Nyangara": [
    "Bugarama",
    "Kabeza",
    "Mugomero",
    "Muhambo",
    "Mutumba",
    "Rwimbogo",
    "Ryanyabugwende",
  ],
  "Nyagatare|Gatunda|Nyarurema": [
    "Bubare",
    "Buguma",
    "Butimba",
    "Kabeza",
    "Muhabura",
    "Nyarurema",
    "Shabana",
  ],
  "Nyagatare|Gatunda|Rwensheke": [
    "Kabuye",
    "Kamate",
    "Nyiraburunga",
    "Rwensheke",
  ],

  // Karama Sector (Nyagatare)
  "Nyagatare|Karama|Bushara": [
    "Bushara Centre",
    "Ihuriro",
    "Isangano",
    "Kadendegeri",
    "Meshero",
    "Rurembo",
    "Uruyenzi",
  ],
  "Nyagatare|Karama|Cyenkwanzi": [
    "Cyenkwanzi Centre",
    "Kabeza",
    "Kiyovu",
    "Rurembo",
  ],
  "Nyagatare|Karama|Gikagati": [
    "Bigega",
    "Gataba",
    "Gikagati Centre",
    "Gishenyi",
    "Kanunga",
    "Nyabitare",
    "Nyakibande",
    "Rurembo",
    "Rutegamatwi",
  ],
  "Nyagatare|Karama|Gikundamvura": [
    "Fene",
    "Gikundamvura I",
    "Gikundamvura II",
    "Irebero",
    "Isangano",
    "Kukibuye",
    "Kukimpundu",
    "Musenyi",
    "Nyabitare",
    "Nyagasharara",
    "Umutara",
    "Urugwiro",
  ],
  "Nyagatare|Karama|Kabuga": [
    "Gakukuru",
    "Kabeza",
    "Kabuga",
    "Kizunguruko",
    "Nyakibande",
    "Nyamirama",
    "Rukamba",
    "Rwebishirira",
    "Rwubuzizi",
  ],
  "Nyagatare|Karama|Ndego": [
    "Gakirage",
    "Kababanda",
    "Kanyami",
    "Matereza",
    "Mishasha",
    "Murambi",
    "Mutete",
    "Ndego Centre",
    "Rubanda",
    "Rusoroza",
    "Rutoma",
  ],
  "Nyagatare|Karama|Nyakiga": [
    "Humure",
    "Kabeza",
    "Kanunga",
    "Karama Centre",
    "Kavumu",
    "Kentarama",
    "Mabare",
  ],

  // Karangazi Sector
  "Nyagatare|Karangazi|Kamate": [
    "Bugarama",
    "Buhongoro",
    "Kamate",
    "Kigazi",
    "Muzehe",
  ],
  "Nyagatare|Karangazi|Karama": ["Karama", "Makomo", "Rundiro"],
  "Nyagatare|Karangazi|Kizirakome": ["Kageyo", "Kahi", "Kizirakome", "Rurebe"],
  "Nyagatare|Karangazi|Mbare": [
    "Kabirizi",
    "Kajumo",
    "Karohoza",
    "Mbare",
    "Rwarucura",
    "Ryabega",
  ],
  "Nyagatare|Karangazi|Musenyi": [
    "Bwanga",
    "Gacungiro",
    "Kabeza",
    "Musenyi I",
    "Musenyi II",
    "Rugarama",
    "Ruziranyenzi",
  ],
  "Nyagatare|Karangazi|Ndama": ["Akayange", "Ndama", "Rwabiharamba"],
  "Nyagatare|Karangazi|Nyagashanga": ["Bidudu", "Bwera", "Kabare", "Ruhita"],
  "Nyagatare|Karangazi|Nyamirama": [
    "Kayange I",
    "Kayange II",
    "Nkoma I",
    "Nkoma II",
    "Nyamirama I",
    "Nyamirama II",
  ],
  "Nyagatare|Karangazi|Rubagabaga": ["Iraba", "Nkuna", "Nyarutovu", "Rebero"],
  "Nyagatare|Karangazi|Rwenyemera": [
    "Bwera",
    "Imishongi",
    "Kayishunika",
    "Kizirakome",
    "Rwenyana",
    "Rwenyemera",
    "Rwimirama",
  ],
  "Nyagatare|Karangazi|Rwisirabo": [
    "Gakoma",
    "Humure",
    "Karangazi",
    "Rubona",
    "Rukundo",
  ],

  // Katabagemu Sector
  "Nyagatare|Katabagemu|Bayigaburire": [
    "Agasasa",
    "Bingaro",
    "Byimana",
    "Gikandura",
    "Igikorosi",
    "Kibuye",
    "Nyagahandagaza",
  ],
  "Nyagatare|Katabagemu|Kaduha": [
    "Kaduha I",
    "Kaduha II",
    "Kanyinya",
    "Nyabiyonza",
    "Urumuri",
  ],
  "Nyagatare|Katabagemu|Kanyeganyege": [
    "Kabaya",
    "Kabeza",
    "Kanyeganyege",
    "Rebero",
  ],
  "Nyagatare|Katabagemu|Katabagemu": [
    "Gashenyi",
    "Kagogo",
    "Kajevuba",
    "Kigarama",
    "Nyabwunyu",
    "Umunanira",
  ],
  "Nyagatare|Katabagemu|Kigarama": [
    "Kanguka",
    "Kibuye",
    "Kigarama",
    "Rebero",
    "Shirimpumu",
  ],
  "Nyagatare|Katabagemu|Nyakigando": [
    "Byimana",
    "Kabeza",
    "Kamutara",
    "Ntoma",
    "Nyakigando I",
    "Nyakigando II",
    "Rebero",
  ],
  "Nyagatare|Katabagemu|Rubira": [
    "Igitego",
    "Isangano",
    "Kanyesunzu",
    "Rubira",
  ],
  "Nyagatare|Katabagemu|Rugazi": [
    "Akabira",
    "Burera",
    "Ishyirahamwe",
    "Rwagisangangabo",
  ],
  "Nyagatare|Katabagemu|Rutoma": [
    "Buyugi",
    "Kabeza",
    "Mahoro",
    "Rutoma",
    "Ryaruganzu",
  ],

  // Kiyombe Sector
  "Nyagatare|Kiyombe|Gataba": [
    "Cyemiyaga",
    "Gahama",
    "Gicuba",
    "Kwiperu",
    "Nyakabungo",
    "Nyamiyaga",
    "Ruhonwa",
    "Ruhuha",
    "Rutete",
    "Rwabashanja",
    "Rwakikunengwa",
    "Rwebare",
  ],
  "Nyagatare|Kiyombe|Gitenga": [
    "Gitenga",
    "Izinga",
    "Kabingo",
    "Kibuye",
    "Muhambo",
    "Mukasha",
    "Nyabubare",
    "Rwagakuba",
  ],
  "Nyagatare|Kiyombe|Kabungo": [
    "Bitare",
    "Cyondo",
    "Gatoki",
    "Gorora",
    "Kindege",
    "Manombe",
    "Mataba",
    "Murambi",
    "Nyakabungo",
    "Rugarama",
    "Rwamiko",
    "Rwamushe",
  ],
  "Nyagatare|Kiyombe|Karambo": [
    "Bureka",
    "Butehe",
    "Kakagaju",
    "Karujanga",
    "Kinoga",
    "Kitaburimbi",
    "Nkana",
    "Nyakabungo",
    "Rugarama",
    "Rwakashande",
    "Rwemisavu",
    "Rwengugwe",
  ],
  "Nyagatare|Kiyombe|Karujumba": [
    "Gishoro",
    "Kabare",
    "Kagorogoro",
    "Kajevuba",
    "Karujumba Centre",
    "Katoma",
    "Kenzizi",
    "Mushesha",
    "Mweneno",
    "Ngangare",
    "Nyabwongoroka",
    "Nyange",
    "Rukongoro",
  ],
  "Nyagatare|Kiyombe|Tovu": [
    "Cyerero",
    "Gashuro",
    "Gasyata",
    "Gatyazo",
    "Nyagatete",
    "Nyakigera",
    "Nyamirima",
    "Nyaruziba",
    "Rugarama",
    "Rutungo",
  ],

  // Matimba Sector
  "Nyagatare|Matimba|Bwera": ["Bwera", "Ntoma", "Rugaga"],
  "Nyagatare|Matimba|Byimana": [
    "Byimana I",
    "Byimana II",
    "Byimana III",
    "Kabuga I",
    "Kabuga II",
  ],
  "Nyagatare|Matimba|Cyembogo": ["Byimana", "Kabeza", "Kamahoro", "Kiyovu"],
  "Nyagatare|Matimba|Kagitumba": [
    "Gishara",
    "Kagera",
    "Kagitumba",
    "Kamabuye",
    "Munini",
    "Musenyi",
    "Muvumba",
    "Nziranziza",
  ],
  "Nyagatare|Matimba|Kanyonza": [
    "Gakoma",
    "Musebeya",
    "Musha",
    "Nyampeke",
    "Rukundo",
  ],
  "Nyagatare|Matimba|Matimba": [
    "Umudugudu Wa I",
    "Umudugudu Wa II",
    "Umudugudu Wa III",
    "Umudugudu Wa IV",
    "Umudugudu Wa V",
    "Umudugudu Wa VI",
    "Umudugudu Wa VII",
  ],
  "Nyagatare|Matimba|Nyabwishongwezi": [
    "Nyabwishongwezi I",
    "Nyabwishongwezi II",
    "Nyabwishongwezi III",
  ],
  "Nyagatare|Matimba|Rwentanga": [
    "Kagezi I",
    "Kagezi II",
    "Mitayayo I",
    "Mitayayo II",
    "Rwentanga",
  ],
  // Mimuri Sector
  "Nyagatare|Mimuri|Bibare": [
    "Bibare",
    "Karukwanzi",
    "Nyakagenge",
    "Nyamafura",
    "Nyaruziba",
    "Rwimirama",
    "Urugano",
    "Urutambi",
  ],
  "Nyagatare|Mimuri|Gakoma": [
    "Gakoma",
    "Gisenyi",
    "Kanyinya",
    "Kumusaraba",
    "Nyagahandagaza",
    "Nyarwina",
    "Rusororo",
  ],
  "Nyagatare|Mimuri|Mahoro": [
    "Cyabwana",
    "Gitwe",
    "Iterambere",
    "Kabeza",
    "Mizero",
    "Nyabugogo",
    "Nyagahita",
    "Rebero",
    "Rubumba",
    "Shenga",
  ],
  "Nyagatare|Mimuri|Mimuri": [
    "Byimana",
    "Indahemuka",
    "Isangano",
    "Karukwanzi",
    "Rebero",
    "Rwimirama",
  ],
  "Nyagatare|Mimuri|Rugari": [
    "Amahoro",
    "Isangano",
    "Nteko",
    "Rebero",
    "Ubumwe",
    "Urumuri",
  ],

  // Mukama Sector
  "Nyagatare|Mukama|Bufunda": [
    "Bitabo",
    "Bufunda",
    "Kibihanga",
    "Nyakajeje",
    "Rebero",
  ],
  "Nyagatare|Mukama|Gatete": [
    "Gatete I",
    "Gatete II",
    "Hunga",
    "Kazinga",
    "Rutete",
    "Ryandahuka",
  ],
  "Nyagatare|Mukama|Gihengeri": [
    "Butare",
    "Butwaro",
    "Gashahi",
    "Gihengeri",
    "Gishoro",
    "Kabongoya I",
    "Kabongoya II",
    "Kigarama",
    "Nyarubuye",
  ],
  "Nyagatare|Mukama|Gishororo": [
    "Akinyambo",
    "Byumba",
    "Kabeza",
    "Kabukunzi",
    "Kisaro",
  ],
  "Nyagatare|Mukama|Kagina": [
    "Cyabahurura",
    "Kagonga",
    "Kireranyana",
    "Ngoma",
    "Nyagatare",
    "Nyakagarama",
    "Nyakarama",
  ],
  "Nyagatare|Mukama|Rugarama": [
    "Bukire",
    "Byimana",
    "Kibondo",
    "Kireranyana",
    "Nyacyonga",
    "Nyakagarama",
    "Sipure",
  ],

  // Musheri Sector
  "Nyagatare|Musheri|Kibirizi": [
    "Kabungo",
    "Kibirizi",
    "Nyamenge",
    "Nyamisange",
  ],
  "Nyagatare|Musheri|Kijojo": ["Kagwegwe", "Kanyinya", "Kijojo", "Rwakabungo"],
  "Nyagatare|Musheri|Musheri": ["Gakiri", "Kiyaza", "Mugari", "Musheri"],
  "Nyagatare|Musheri|Ntoma": [
    "Bikonoka",
    "Murisanga",
    "Ntoma",
    "Rukundo",
    "Rutarama",
  ],
  "Nyagatare|Musheri|Nyagatabire": [
    "Gikunyu",
    "Mushorerwa",
    "Nyagatabire",
    "Rugarama",
  ],
  "Nyagatare|Musheri|Nyamiyonga": [
    "Cyenombe",
    "Isangano",
    "Nyamiyonga",
    "Shirimpumu",
  ],
  "Nyagatare|Musheri|Rugarama I": ["Humure", "Karambi", "Karuca", "Nyabyihura"],
  "Nyagatare|Musheri|Rugarama II": [
    "Kibitaka",
    "Rebero",
    "Rwenyana",
    "Umunini",
  ],

  // Nyagatare Sector
  "Nyagatare|Nyagatare|Barija": ["Barija A", "Barija B", "Burumba", "Kinihira"],
  "Nyagatare|Nyagatare|Bushoga": [
    "Bushoga",
    "Cyabahanga",
    "Cyonyo",
    "Ruhuha I",
    "Ruhuha II",
    "Ryinkuyu",
  ],
  "Nyagatare|Nyagatare|Cyabayaga": [
    "Akamonyi",
    "Bihinga",
    "Cyabayaga",
    "Nyakabuye",
    "Urugero",
  ],
  "Nyagatare|Nyagatare|Gakirage": [
    "Gakirage",
    "Kiboga I",
    "Kiboga II",
    "Mihingo",
    "Nkongi",
    "Urumuri",
  ],
  "Nyagatare|Nyagatare|Kamagiri": ["Kamagiri", "Karungi", "Nkerenke"],
  "Nyagatare|Nyagatare|Nsheke": ["Kabare", "Nsheke", "Nyegeza"],
  "Nyagatare|Nyagatare|Nyagatare": [
    "Mirama I",
    "Mirama II",
    "Nyagatare I",
    "Nyagatare II",
    "Nyagatare III",
  ],
  "Nyagatare|Nyagatare|Rutaraka": [
    "Gihorobwa",
    "Mugari",
    "Nkonji",
    "Rutaraka",
    "Ryabega",
  ],
  "Nyagatare|Nyagatare|Ryabega": ["Marongero", "Rugendo", "Ryabega"],

  // Rukomo Sector (Nyagatare)
  "Nyagatare|Rukomo|Gahurura": [
    "Amahoro",
    "Busasamana",
    "Isangano",
    "Nomero I",
    "Rambura",
    "Ruyonza",
    "Ubumwe",
    "Urugwiro",
    "Urukundo",
    "Urumuri",
  ],
  "Nyagatare|Rukomo|Gashenyi": [
    "Agasasa",
    "Bukamba",
    "Gashenyi",
    "Gisenyi",
    "Huriro",
    "Isangano",
    "Kiyovu",
    "Murore",
    "Nyamirambo",
    "Rebero",
    "Rukomo",
    "Rurembo",
  ],
  "Nyagatare|Rukomo|Nyakagarama": [
    "Akamashama",
    "Akamasheka",
    "Amahoro",
    "Amizero",
    "Gashenyi",
    "Gashura",
    "Isangano",
    "Karugondo",
    "Kayenzi",
    "Musenyi",
    "Nyakagarama",
    "Nyamworoma",
  ],
  "Nyagatare|Rukomo|Rukomo II": [
    "Amahoro",
    "Berwa",
    "Isangano",
    "Kabeza",
    "Mwurirwa",
    "Nyange",
    "Nyarubuye",
    "Nyarurama",
    "Rebero",
    "Rugabano",
  ],
  "Nyagatare|Rukomo|Rurenge": [
    "Akajuka",
    "Benishyaka",
    "Biryogo",
    "Kabeza",
    "Kabusunzu",
    "Nyabwunyu",
    "Nyamirambo",
    "Rurenge",
    "Rushashi",
    "Rwiju",
  ],

  // Rwempasha Sector
  "Nyagatare|Rwempasha|Cyenjonjo": ["Cyenjonjo I", "Cyenjonjo II", "Rutare II"],
  "Nyagatare|Rwempasha|Gasinga": ["Gasinga", "Nyendo", "Rwibishorogoto"],
  "Nyagatare|Rwempasha|Kabare": ["Gituro", "Kabare", "Ururimbi"],
  "Nyagatare|Rwempasha|Kazaza": ["Gakindo", "Kazaza", "Rukiri"],
  "Nyagatare|Rwempasha|Mishenyi": ["Gicwamba", "Kinungu", "Mishenyi"],
  "Nyagatare|Rwempasha|Rugarama": ["Bubare", "Rugarama"],
  "Nyagatare|Rwempasha|Rukorota": ["Bukonji", "Rukorota"],
  "Nyagatare|Rwempasha|Rutare": ["Mashaka", "Nshuli", "Rutare"],
  "Nyagatare|Rwempasha|Rwempasha": [
    "Nyarubare",
    "Rwahi",
    "Rwempasha",
    "Uwinkiko",
  ],
  "Nyagatare|Rwempasha|Ryeru": ["Bweya", "Ryeru"],

  // Rwimiyaga Sector
  "Nyagatare|Rwimiyaga|Gacundezi": [
    "Bugaragara",
    "Gacundezi I",
    "Gacundezi II",
    "Rukundo I",
    "Rukundo II",
    "Rukundo III",
  ],
  "Nyagatare|Rwimiyaga|Kabeza": [
    "Gatovu",
    "Kabeza",
    "Kabeza Centre",
    "Kavumu",
    "Rugarama",
    "Rukiri I",
    "Rukiri II",
  ],
  "Nyagatare|Rwimiyaga|Kirebe": ["Gatebe I", "Gatebe II", "Kirebe", "Rukindo"],
  "Nyagatare|Rwimiyaga|Ntoma": [
    "Gashwenu",
    "Kibuye",
    "Kimaramu",
    "Nyampire",
    "Rwembogo",
  ],
  "Nyagatare|Rwimiyaga|Nyarupfubire": [
    "Kamagiri",
    "Nyakagando I",
    "Nyakagando II",
    "Nyarupfubire I",
    "Nyarupfubire II",
    "Rwimiyaga I",
    "Rwimiyaga II",
  ],
  "Nyagatare|Rwimiyaga|Nyendo": ["Isangano", "Nyamirama", "Rebero", "Remera"],
  "Nyagatare|Rwimiyaga|Rutungu": [
    "Bwera",
    "Cyamunyana",
    "Gakagati I",
    "Gakagati II",
    "Rubira",
  ],
  "Nyagatare|Rwimiyaga|Rwimiyaga": [
    "Byimana",
    "Gakoma",
    "Kizungu",
    "Mahoro",
    "Muyange",
    "Rebero",
    "Rwinyange",
  ],

  // Tabagwe Sector
  "Nyagatare|Tabagwe|Gishuro": [
    "Gatoma",
    "Kaborogota",
    "Kayanja",
    "Nyagatare",
    "Nyasine",
  ],
  "Nyagatare|Tabagwe|Gitengure": [
    "Bitibyoma",
    "Gitengure",
    "Kayigiro",
    "Nshuri",
    "Nyagasigati",
  ],
  "Nyagatare|Tabagwe|Nkoma": [
    "Agafaru",
    "Ibare",
    "Kabeza",
    "Kaduha",
    "Kigando",
    "Mutozo",
    "Nkoma",
    "Rugabano",
    "Runyinya",
  ],
  "Nyagatare|Tabagwe|Nyabitekeri": [
    "Kabeza",
    "Kabirizi",
    "Kamate",
    "Kangoma",
    "Kiyovu",
    "Munini",
  ],
  "Nyagatare|Tabagwe|Nyagatoma": [
    "Agafaro",
    "Agasongero",
    "Akajevuba",
    "Kabusunzu",
    "Mutungisa",
    "Runyeri",
  ],
  "Nyagatare|Tabagwe|Shonga": [
    "Gikoba",
    "Nyakanoni",
    "Nyakigando",
    "Rwubuzizi",
    "Shonga",
  ],
  "Nyagatare|Tabagwe|Tabagwe": [
    "Gakamba",
    "Gasheshe",
    "Kagarama",
    "Nyenyeri",
    "Tabagwe",
  ],

  // ============================================================
  // EAST PROVINCE - Gatsibo District
  // ============================================================

  // Gasange Sector
  "Gatsibo|Gasange|Kigabiro": [
    "Kabuye",
    "Kigabiro",
    "Maya",
    "Munini",
    "Rugarama",
  ],
  "Gatsibo|Gasange|Kimana": ["Byahi", "Kagarama", "Kimana", "Rugarama"],
  "Gatsibo|Gasange|Teme": ["Buburankwi", "Giheta", "Kinunga", "Teme"],
  "Gatsibo|Gasange|Viro": ["Gahara I", "Gahara II", "Kagogo", "Viro"],

  // Gatsibo Sector
  "Gatsibo|Gatsibo|Gatsibo": [
    "Gatare",
    "Gatsibo",
    "Hanika",
    "Mukwiza",
    "Munini",
    "Nyakagarama",
    "Nyamuduha",
    "Nyarukoni",
    "Rwimbogo",
  ],
  "Gatsibo|Gatsibo|Manishya": [
    "Manishya",
    "Nyagahandagaza",
    "Nyaruhanga",
    "Nyarukoni",
    "Rugarama",
  ],
  "Gatsibo|Gatsibo|Mugera": [
    "Kabuga",
    "Kamasapfu",
    "Karambo I",
    "Kavumu",
    "Kayisha",
    "Kiraritsi",
    "Mugera",
    "Nyarukoni I",
    "Rurama",
  ],
  "Gatsibo|Gatsibo|Nyabicwamba": [
    "Agakenyeri",
    "Agakomeye",
    "Agatoma",
    "Gatungu",
    "Kabashenda",
    "Kaduha",
    "Kigarama",
    "Nyabiheke",
    "Nyamuduha",
    "Rucumbo",
    "Rutovu",
    "Ryabakame",
    "Ryebare",
  ],
  "Gatsibo|Gatsibo|Nyagahanga": [
    "Gitega",
    "Karama",
    "Kizinga",
    "Mangarama",
    "Nyagahanga",
    "Nyakibande",
    "Rugarama",
    "Rusenge",
  ],

  // Gitoki Sector
  "Gatsibo|Gitoki|Bukomane": [
    "Bukomane",
    "Muburembo",
    "Gakiri",
    "Gisaka",
    "Kigomero",
    "Mungaju",
    "Nyakayaga",
    "Rurema",
    "Rwagitima",
    "Ryarukaza",
  ],
  "Gatsibo|Gitoki|Cyabusheshe": [
    "Binunga",
    "Cyabusheshe",
    "Cyoto",
    "Kigabiro",
    "Kivuba",
    "Nyarunazi",
    "Rushashi",
  ],
  "Gatsibo|Gitoki|Karubungo": [
    "Gisharara",
    "Isangano",
    "Kagugu",
    "Kamuhenda",
    "Karubungo",
    "Kinyange",
    "Nyagacyamo",
    "Nyarugarama",
    "Rugarama",
    "Rwamuhinga",
    "Sata",
  ],
  "Gatsibo|Gitoki|Mpondwa": [
    "Akibiraro",
    "Akuruganda",
    "Bukira",
    "Bwiza",
    "Gahama",
    "Nyakabungo",
    "Nyaruhanga",
    "Ryabugenge",
    "Tsima",
  ],
  "Gatsibo|Gitoki|Nyamirama": [
    "Gahabo",
    "Kagarama",
    "Kinteko",
    "Ishaba",
    "Minago",
    "Mwanama",
    "Nyabikenke",
    "Nyamuraza",
    "Nyarukombe",
    "Rukiri",
    "Rwinsanga",
  ],
  "Gatsibo|Gitoki|Rubira": [
    "Gakiri",
    "Gikuyu",
    "Kavumu",
    "Nyakabota",
    "Nyakagarama",
    "Nyamengo",
    "Rugarama",
    "Rurehe",
    "Rwintama",
  ],

  // Kabarore Sector
  "Gatsibo|Kabarore|Kabarore": [
    "Bihinga",
    "Kabarore I",
    "Kabarore II",
    "Kabingo",
  ],
  "Gatsibo|Kabarore|Kabeza": [
    "Gatoki (Ryanjeru)",
    "Kabeza",
    "Mishenyi",
    "Gatoki",
  ],
  "Gatsibo|Kabarore|Karenge": ["Karenge", "Mutarama", "Nyarubuye"],
  "Gatsibo|Kabarore|Marimba": [
    "Kabare",
    "Kanteri",
    "Marimba",
    "Nyarwanya",
    "Rebero",
    "Rutenderi",
    "Rwimbogo",
  ],
  "Gatsibo|Kabarore|Nyabikiri": ["Kabeza", "Ngarama", "Nyabikiri"],
  "Gatsibo|Kabarore|Simbwa": ["Kibondo I", "Kibondo II", "Ruhuha", "Simbwa"],

  // Kageyo Sector (Gatsibo)
  "Gatsibo|Kageyo|Busetsa": [
    "Busetsa",
    "Cyabuhimbiri",
    "Cyatoko",
    "Gitebwe",
    "Kaninga",
    "Kayenzi",
    "Kivugiza",
    "Nyarubuye",
    "Nyarusange",
    "Rugarama",
    "Rwikubo",
    "Tsima",
  ],
  "Gatsibo|Kageyo|Gituza": [
    "Bugarama",
    "Gisiza",
    "Kabacuzi",
    "Kigara",
    "Mpama",
    "Nyakabare",
    "Rwabihumbi",
  ],
  "Gatsibo|Kageyo|Kintu": [
    "Gakeri",
    "Jabiro",
    "Kigando",
    "Kirara",
    "Nyakabungo",
    "Rutoma",
    "Ryabushogoro",
  ],
  "Gatsibo|Kageyo|Nyagisozi": [
    "Agatare",
    "Kageyo",
    "Kashango",
    "Kinyana",
    "Nyabukobero",
    "Nyagisozi",
    "Rukira",
  ],

  // Kiramuruzi Sector
  "Gatsibo|Kiramuruzi|Akabuga": [
    "Akagarama",
    "Akarambo",
    "Amataba",
    "Bushenyi",
    "Businde",
    "Kiramuruzi",
    "Kiyogori",
    "Nduba",
    "Ubuhoro",
  ],
  "Gatsibo|Kiramuruzi|Gakenke": [
    "Akabingo",
    "Akamasine",
    "Akurusizi",
    "Bwunyu",
    "Gatugunda",
    "Gipangu",
    "Kayita",
    "Nyakagarama",
    "Nyamarebe",
    "Rwagashyaba",
    "Umurehe",
  ],
  "Gatsibo|Kiramuruzi|Gakoni": [
    "Karuhura",
    "Kiyovu",
    "Kumana",
    "Kumunini",
    "Kumwiga",
    "Rwajembe",
  ],
  "Gatsibo|Kiramuruzi|Nyabisindu": [
    "Akabare",
    "Akabuga",
    "Akantunga",
    "Bushenyi",
    "Gahoko",
    "Gasave",
    "Gitunginka",
    "Itaba",
    "Karaba",
    "Nyagasambu",
    "Nyagashenyi",
    "Nyarusambu",
    "Rugenge",
  ],

  // Kiziguro Sector
  "Gatsibo|Kiziguro|Agakomeye": [
    "Agatovu",
    "Akabingo",
    "Akingondo",
    "Bishenyi",
    "Bwiza",
    "Isangano",
    "Ishanti",
    "Munanira",
    "Muringa",
    "Nyungwe",
    "Ubutatu",
  ],
  "Gatsibo|Kiziguro|Mbogo": [
    "Akabuye",
    "Akavumu",
    "Nyakabungo",
    "Nyakagarama",
    "Rebero",
    "Ryabihura",
    "Ryamuhuzi",
  ],
  "Gatsibo|Kiziguro|Ndatemwa": [
    "Akabagendo",
    "Akamamesa",
    "Akarambo",
    "Bidudu",
    "Gakunyu",
    "Gihinga",
    "Gorora",
    "Kabukungu",
    "Kanyonyomba",
    "Kigarama",
    "Kinunga",
    "Mataba",
    "Mishunzi",
    "Murehe",
    "Nyagashenyi",
    "Rubungo",
    "Rukungu",
    "Ryarugema",
  ],
  "Gatsibo|Kiziguro|Rubona": [
    "Agatare",
    "Akagarama",
    "Amarende",
    "Bwiza",
    "Cyarutabira",
    "Ihema",
    "Iramba",
    "Kigabiro",
    "Kigoroba",
    "Kinimba",
    "Nyagasambu",
    "Nyarurembo",
    "Rubaya",
    "Rubira",
    "Ryakabucye",
    "Ryanyiranyana",
    "Tubindi",
  ],

  // Muhura Sector
  "Gatsibo|Muhura|Bibare": [
    "Agasharu",
    "Akabuga",
    "Akagasaro",
    "Cyahafi",
    "Cyarugira",
    "Cyaruhagazi",
    "Gasigati",
    "Kinyaga",
    "Maryohe",
    "Mugogo",
    "Musasa",
    "Rutoma",
    "Rwangendo",
  ],
  "Gatsibo|Muhura|Gakorokombe": [
    "Agahama",
    "Agasharu",
    "Biniga",
    "Kinihira",
    "Nyarubuye",
    "Umunini",
    "Urubiri",
    "Urugarama",
    "Uwakibungo",
  ],
  "Gatsibo|Muhura|Mamfu": [
    "Agatagara",
    "Akabirizi",
    "Akamamana",
    "Akamatamu",
    "Akarengo",
    "Kamugenge",
    "Kaziga",
    "Ruhinga",
    "Rwanama",
    "Umunanira",
  ],
  "Gatsibo|Muhura|Rumuli": [
    "Gihembe",
    "Juga",
    "Kabeza",
    "Karama",
    "Kigarama",
    "Ntungamo",
    "Nyange",
    "Rwasama",
    "Rweza",
    "Umurambi",
  ],
  "Gatsibo|Muhura|Taba": [
    "Cyoga I",
    "Cyoga II",
    "Gahanga",
    "Gatare",
    "Kanyinya",
    "Karenge",
    "Matyazo",
    "Mayora",
    "Mwambaro",
    "Nshoro",
    "Rugarama",
    "Ruhenda",
    "Rususa",
    "Rwangendo",
    "Taba",
  ],

  // Murambi Sector (Gatsibo)
  "Gatsibo|Murambi|Murambi": [
    "Agacyamo",
    "Agasharu",
    "Agatagara",
    "Akamashya",
    "Byimana",
    "Kabarondo",
    "Kabuga",
    "Kigote",
    "Kimironko",
    "Kiniga",
    "Mataba",
    "Ryampunga",
    "Urugarama",
  ],
  "Gatsibo|Murambi|Nyamiyaga": [
    "Bweranyange",
    "Kabeza",
    "Kagenge",
    "Kiniga",
    "Runyinya",
  ],
  "Gatsibo|Murambi|Rwankuba": [
    "Akarambo",
    "Akayenzi",
    "Ikinyaga",
    "Impanzi",
    "Nyagasambu",
    "Nyagatovu",
    "Umwiga",
    "Urugarama",
  ],
  "Gatsibo|Murambi|Rwimitereri": [
    "Bushenyi",
    "Bweya",
    "Byimana",
    "Kibumba",
    "Kigote",
    "Kimondo",
    "Kinunga",
    "Nyakabanda",
    "Rugarama",
  ],

  // Ngarama Sector
  "Gatsibo|Ngarama|Bugamba": [
    "Akagerero",
    "Cyamuganga",
    "Kajevuba",
    "Kinihira",
    "Kinyinya",
  ],
  "Gatsibo|Ngarama|Karambi": [
    "Cyankondo",
    "Kamuri",
    "Karambi",
    "Kimbugu",
    "Mishenyi",
    "Ruhuha",
    "Rurama",
    "Rushenyi",
    "Ruziranyenzi",
    "Rwagakara",
  ],
  "Gatsibo|Ngarama|Kigasha": [
    "Akabuga",
    "Akabuye",
    "Akagarama",
    "Akajevuba",
    "Byimana",
    "Cyabahima",
    "Cyahafi",
    "Gikundamvura",
    "Ikirongo",
    "Iperu",
    "Kinunga",
    "Kiyovu",
    "Kizunguruko",
    "Mbogo",
    "Nyagisa",
    "Nyantojo",
    "Rukombe",
    "Rurama",
    "Ruyonza",
    "Rwangingo",
  ],
  "Gatsibo|Ngarama|Ngarama": [
    "Amahoro",
    "Gatungo",
    "Ibare",
    "Intsinzi",
    "Kabeho",
    "Kiyovu",
    "Rugarama",
    "Urukundo",
  ],
  "Gatsibo|Ngarama|Nyarubungo": [
    "Burambira",
    "Kintarama",
    "Kivumu",
    "Murama",
    "Rugarama",
    "Ruhengeri",
    "Rutovu",
    "Rwiri",
  ],

  // Nyagihanga Sector
  "Gatsibo|Nyagihanga|Gitinda": [
    "Gatungo",
    "Isangano",
    "Kibimbiri",
    "Kintarama",
    "Kirehe",
    "Kiziba",
    "Nyabukingi",
    "Rushenyi",
    "Twegerane",
  ],
  "Gatsibo|Nyagihanga|Kibare": [
    "Bitaba",
    "Bushashari",
    "Bwicaro",
    "Gashure",
    "Gatyazo",
    "Kagera",
    "Kigarama",
    "Kukabare",
    "Murambi",
    "Rugaragara",
  ],
  "Gatsibo|Nyagihanga|Mayange": [
    "Kabuye",
    "Kajevuba",
    "Kamatamu",
    "Mpangare I",
    "Mpangare II",
    "Neke",
    "Nyarubuye",
    "Rweza",
  ],
  "Gatsibo|Nyagihanga|Murambi": [
    "Gishikiri",
    "Kabeza",
    "Kagarama",
    "Kanyinya",
    "Mubirembo",
    "Munanira",
    "Rukoma",
    "Rusenge",
    "Umugamba",
  ],
  "Gatsibo|Nyagihanga|Nyagitabire": [
    "Byimana",
    "Kabudogo",
    "Kamiseke",
    "Kamurara",
    "Kibatsi",
    "Kuwingeri",
    "Mataba",
    "Mpashani",
    "Nyamikamba",
    "Par-chance",
    "Rwintare",
  ],
  "Gatsibo|Nyagihanga|Nyamirama": [
    "Burembo",
    "Butumba",
    "Cyanyanoga",
    "Kabuga",
    "Nyakabungo",
    "Nyamiyaga",
    "Rugarama",
    "Rugogwe",
  ],
  // Remera Sector (Gatsibo)
  "Gatsibo|Remera|Bushobora": [
    "Abanyangeyo",
    "Agasenga",
    "Akagarama I",
    "Akagarama II",
    "Akamabuye",
    "Akankusi",
    "Gumino",
    "Nyagatabire",
    "Rwagitima",
  ],
  "Gatsibo|Remera|Butiruka": ["Akabuga", "Gasabo", "Icyerekezo", "Urushenyi"],
  "Gatsibo|Remera|Kigabiro": [
    "Akabuga",
    "Amataba",
    "Byimana",
    "Kanyinya",
    "Kigabiro",
    "Runyinya",
    "Rwamusaro",
    "Rwikubo",
    "Ryarutsinzi",
  ],
  "Gatsibo|Remera|Nyagakombe": [
    "Akababito",
    "Karufuri",
    "Nyakanga",
    "Nyamarebe",
    "Nyaruhoko",
  ],
  "Gatsibo|Remera|Rurenge": [
    "Akagarama",
    "Butinza",
    "Kagunga",
    "Kibenga",
    "Nyagasozi",
    "Rubare",
    "Rugarama",
    "Rurenge",
  ],
  "Gatsibo|Remera|Rwarenga": [
    "Cyeru",
    "Kabuye",
    "Kagasha",
    "Kigarama",
    "Nyamugari",
    "Nyarubuye",
    "Rushenyi",
    "Umunini",
  ],

  // Rugarama Sector (Gatsibo)
  "Gatsibo|Rugarama|Bugarama": ["Akenene", "Kabare", "Nyagasiga", "Rebero"],
  "Gatsibo|Rugarama|Gihuta": [
    "Agatare",
    "Gashenyi I",
    "Gashenyi II",
    "Ibare",
    "Ntende I",
    "Ntende II",
    "Nyagahanga",
  ],
  "Gatsibo|Rugarama|Kanyangese": [
    "Agakiri",
    "Akazinga",
    "Amahoro",
    "Cyampirita",
    "Kabeza",
    "Kanyangese",
    "Munini",
    "Nyabubare",
    "Nyakariro",
    "Rebero",
    "Remera",
    "Rugarama",
    "Rugazi",
    "Rwagitima",
    "Rwunyu",
    "Tetero",
  ],
  "Gatsibo|Rugarama|Matare": [
    "Agakenyeri",
    "Akabare",
    "Bujumo",
    "Gitsimba I",
    "Gitsimba II",
    "Kabana",
    "Matare",
    "Nyagatare",
    "Nyarusambu",
    "Rebero",
    "Rwankuba",
  ],
  "Gatsibo|Rugarama|Matunguru": [
    "Akabasanza",
    "Gatovu",
    "Kabeza",
    "Ngoma",
    "Nyabagendwa",
    "Nyamata",
    "Nyamirambo",
    "Nyenyeri",
    "Rambura",
    "Rushenyi",
    "Tungiro",
  ],
  "Gatsibo|Rugarama|Remera": [
    "Akajevuba",
    "Gikoma",
    "Kanyiranzage",
    "Miko",
    "Rwamivu",
  ],

  // Rwimbogo Sector (Gatsibo)
  "Gatsibo|Rwimbogo|Kiburara": [
    "Isangano",
    "Kiburara",
    "Nyacyonga",
    "Rebero",
    "Rubirizi",
    "Rugando",
  ],
  "Gatsibo|Rwimbogo|Munini": [
    "Gikobwa",
    "Humure",
    "Kabeza",
    "Marembo",
    "Munini",
    "Nyamwiza",
    "Rweza",
    "Rwinyana",
  ],
  "Gatsibo|Rwimbogo|Nyamatete": [
    "Akajevuba",
    "Gashenyi",
    "Gihunika",
    "Gitega",
    "Kabeza",
    "Kagugu",
    "Kidugudu",
    "Kiyovu",
    "Nyamatete",
    "Rutembo",
    "Rwimbogo",
    "Rwiminazi",
    "Umurego",
  ],
  "Gatsibo|Rwimbogo|Rwikiniro": [
    "Akamahoro",
    "Byimana",
    "Isangano",
    "Kabusunzu",
    "Karambi",
    "Kinunga",
    "Ndama I",
    "Ndama II",
    "Nyamabuye",
    "Rukomo",
    "Rwikiniro I",
    "Rwikiniro II",
  ],

  // ============================================================
  // EAST PROVINCE - Kayonza District
  // ============================================================

  // Gahini Sector
  "Kayonza|Gahini|Juru": [
    "Gisenga",
    "Juru",
    "Kamudongo",
    "Kimana",
    "Kwisoko",
    "Mikinga",
    "Miyaga",
    "Musimbi",
    "Nyabombe",
    "Nyabugogo",
    "Nyakabungo",
    "Rubariro",
  ],
  "Kayonza|Gahini|Kahi": ["Akabare", "Nyamiyaga", "Rukore", "Tsima", "Uruhuha"],
  "Kayonza|Gahini|Kiyenzi": [
    "Kabuye",
    "Kinyinya",
    "Kiyenzi",
    "Nyagahandagaza",
    "Nyirampaca",
  ],
  "Kayonza|Gahini|Urugarama": [
    "Akabahizi",
    "Akabeza",
    "Akumuyenzi",
    "Akimpara",
    "Buyanja",
    "Ibiza",
    "Myatano",
    "Nyagitabire",
    "Rwinkuba",
    "Umwiga",
    "Urugarama",
    "Videwo",
  ],

  // Kabare Sector
  "Kayonza|Kabare|Cyarubare": [
    "Kabeza",
    "Kacyiru",
    "Kanyetonga",
    "Kibimba",
    "Kiburara",
    "Mahumbezi",
    "Nyagakonji",
    "Rukagati",
    "Rwabarema",
    "Rwakavuna",
    "Umunini",
    "Umuremampango",
    "Umuyenzi",
  ],
  "Kayonza|Kabare|Gitara": [
    "Gahombya",
    "Kagumiro",
    "Kajevuba",
    "Kazeneza",
    "Mubuga",
    "Rugunga",
  ],
  "Kayonza|Kabare|Kirehe": [
    "Duterimbere",
    "Gahama",
    "Gikombe",
    "Kabatinya",
    "Kabuhome",
    "Kanyirabuki",
    "Matahiro",
    "Nyabiyenzi",
    "Rompuwe",
    "Rushenyi",
    "Rwagatera",
  ],
  "Kayonza|Kabare|Rubimba": [
    "Bara",
    "Buhabwa",
    "Kabarungu",
    "Kabeza",
    "Kamuhabura",
    "Nyarusange",
    "Rwamushoma",
  ],
  "Kayonza|Kabare|Rubumba": [
    "Bwatampama",
    "Gakenyeri",
    "Gakoma",
    "Gishyoza",
    "Kibimba",
    "Kibuye",
    "Ntungamo",
    "Nyabugogo",
  ],

  // Kabarondo Sector
  "Kayonza|Kabarondo|Cyabajwa": [
    "Busindu",
    "Cyabajwa",
    "Kabarondo",
    "Murenge",
    "Nkuba I",
    "Nkuba II",
    "Rugwagwa",
    "Rutagara",
  ],
  "Kayonza|Kabarondo|Cyinzovu": [
    "Agashikiri",
    "Akinyenyeri",
    "Bitoma",
    "Cyinzovu",
    "Gihuke",
    "Munini",
    "Nyabisenga",
    "Nyakabungo",
    "Rugarama",
    "Rugazi",
    "Rurenge",
    "Rwakigeri",
  ],
  "Kayonza|Kabarondo|Kabura": [
    "Agasharu",
    "Agatare",
    "Akagarama",
    "Gashonyi",
    "Gisoro",
    "Kabeza",
    "Kabuye",
    "Kanyegenyege",
    "Murambi",
    "Nyabikenke I",
    "Nyabikenke II",
    "Rubira",
  ],
  "Kayonza|Kabarondo|Rusera": [
    "Butobagire",
    "Rurama",
    "Rusera",
    "Rutagara Centre",
    "Umucyo",
  ],

  // Mukarange Sector (Kayonza)
  "Kayonza|Mukarange|Bwiza": [
    "Abemeramahoro",
    "Abisunganye",
    "Amizero",
    "Karambarara",
    "Kinyemera",
  ],
  "Kayonza|Mukarange|Kayonza": [
    "Akabuga",
    "Buhonde",
    "Cyeru",
    "Gakurazo",
    "Gasogororo",
    "Gatebe",
    "Kabungo",
    "Kayonza Centre",
    "Kivugiza",
    "Miyange",
    "Munazi",
  ],
  "Kayonza|Mukarange|Mburabuturo": [
    "Akabuga",
    "Akarugangare",
    "Bwingeyo",
    "Gihima",
    "Kinunga",
    "Mburabuturo",
  ],
  "Kayonza|Mukarange|Nyagatovu": [
    "Akabeza",
    "Akamarara",
    "Akamayange",
    "Akanyinya",
    "Gatagara",
    "Iragwe",
    "Irebero",
    "Nyagatovu",
  ],
  "Kayonza|Mukarange|Rugendabari": [
    "Gikumba",
    "Kanyamasha",
    "Karambo I",
    "Karambo II",
    "Nyakagarama",
    "Rugendabari",
    "Rutare",
  ],

  // Murama Sector (Kayonza)
  "Kayonza|Murama|Bunyentongo": [
    "Bweramvura",
    "Gahengeri",
    "Gisunzu",
    "Kabeza",
    "Kagarama",
    "Mpilindi",
    "Nyamabuye",
    "Shyanda",
  ],
  "Kayonza|Murama|Muko": ["Gihazo", "Karama", "Ngoma", "Rebezo", "Rugarama"],
  "Kayonza|Murama|Murama": [
    "Bubindi",
    "Kajevuba",
    "Murama",
    "Rusaro",
    "Rwabugengeri",
  ],
  "Kayonza|Murama|Nyakanazi": [
    "Busasamana",
    "Nyagahinga",
    "Nyakanazi",
    "Rugazi",
    "Rurenge",
  ],
  "Kayonza|Murama|Rusave": [
    "Bicumbi",
    "Bwinyana",
    "Byimana",
    "Gasutamo",
    "Kinyinya",
    "Seresi",
  ],

  // Murundi Sector (Kayonza)
  "Kayonza|Murundi|Buhabwa": [
    "Buhabwa",
    "Cyamburara",
    "Gakoma",
    "Miyaga",
    "Mucucu",
    "Murundi",
  ],
  "Kayonza|Murundi|Karambi": [
    "Akamina",
    "Bugarura",
    "Gafunzo",
    "Kabana",
    "Kabuga",
    "Karambi",
    "Kiyovu",
    "Ngumeri I",
    "Ngumeri II",
    "Nyagashanga",
    "Nyamirama",
    "Rugunga",
    "Rukoyoyo",
    "Rumuri",
    "Rushenyi",
    "Rwasama",
    "Rwinsheke I",
    "Rwinsheke II",
  ],
  "Kayonza|Murundi|Murundi": [
    "Kayongo",
    "Kibari",
    "Kinyana",
    "Macuba",
    "Nyanga",
    "Rucaca",
  ],
  "Kayonza|Murundi|Ryamanyoni": [
    "Akanyerezo",
    "Cyandorimana",
    "Kabingo",
    "Kaneke",
    "Kanyegera",
    "Ngarama",
    "Nyabugando",
    "Rwakabanda",
    "Rwinyambo",
    "Ryakirenzi I",
    "Ryakirenzi II",
    "Ryamanyoni",
    "Ubwiza",
  ],

  // Mwiri Sector
  "Kayonza|Mwiri|Kageyo": [
    "Gisunzu",
    "Kiyonza",
    "Ndago",
    "Rugeyo",
    "Rwisirabo I",
    "Rwisirabo II",
    "Sebasengo",
  ],
  "Kayonza|Mwiri|Migera": [
    "Agahiza",
    "Murori",
    "Mwiri",
    "Nyakagarama",
    "Umutekano",
  ],
  "Kayonza|Mwiri|Nyamugari": [
    "Gasarabwayi",
    "Kabeza",
    "Kabukeye",
    "Kigarama",
    "Ruhoroba",
    "Rwazana",
    "Ryamutumo",
  ],
  "Kayonza|Mwiri|Nyawera": [
    "Gitega",
    "Muhozi",
    "Murehe",
    "Nyakabungo",
    "Ryakibanda",
  ],

  // Ndego Sector
  "Kayonza|Ndego|Byimana": [
    "Busasamana",
    "Irebero",
    "Kabeza",
    "Kururembo",
    "Nyakabingo",
    "Nyamata",
  ],
  "Kayonza|Ndego|Isangano": [
    "Gafunzo",
    "Gashonga",
    "Kabusunzu",
    "Kagese",
    "Kagoma",
    "Kamahoro",
    "Kanyinya",
    "Kibare",
  ],
  "Kayonza|Ndego|Karambi": [
    "Gasenyi",
    "Ihema",
    "Kagasa",
    "Kamabuye",
    "Kumunini",
    "Murambi",
    "Musenyi",
    "Remera",
  ],
  "Kayonza|Ndego|Kiyovu": [
    "Gasabo",
    "Humure",
    "Iramiro",
    "Mwurire",
    "Nyamugali",
  ],

  // Nyamirama Sector (Kayonza)
  "Kayonza|Nyamirama|Gikaya": [
    "Gasharu",
    "Gasogi",
    "Gasura",
    "Kabuye",
    "Kamonyi",
    "Karambi",
    "Kinkoronko",
    "Kiyanja",
  ],
  "Kayonza|Nyamirama|Musumba": [
    "Karama",
    "Kiyovu",
    "Musenyi",
    "Nyabisindu",
    "Nyagasambu",
    "Nyarunazi",
    "Rusera",
  ],
  "Kayonza|Nyamirama|Rurambi": [
    "Amashinge",
    "Bwiza",
    "Kabeza",
    "Kabuya I",
    "Kabuya II",
    "Kabuye",
    "Ntintyi",
    "Rugarama",
    "Ruvumu",
    "Shirinyota",
  ],
  "Kayonza|Nyamirama|Shyogo": [
    "Agasharu",
    "Gatoki",
    "Kacyiru",
    "Nyacyonga",
    "Nyakagarama",
    "Rugagi",
    "Rwangabarezi",
    "Rwinyana",
  ],

  // Rukara Sector
  "Kayonza|Rukara|Kawangire": [
    "Butimba I",
    "Butimba II",
    "Gakenyeri",
    "Gitega",
    "Karama",
    "Kidogo",
    "Kinunga",
    "Rwempasha",
  ],
  "Kayonza|Rukara|Rukara": [
    "Butimba",
    "Buyonza",
    "Gitarama",
    "Ibiza",
    "Kabuga",
    "Kamajigija",
    "Karambo I",
    "Karambo II",
    "Karubamba",
    "Kinunga I",
    "Kinunga II",
    "Mitungo",
    "Mumuri",
    "Munyinya",
    "Muzizi",
    "Nyagaharabuge",
    "Nyirarukara",
    "Uruyenzi",
  ],
  "Kayonza|Rukara|Rwimishinya": [
    "Akabare I",
    "Akabare II",
    "Karagari I",
    "Karagari II",
    "Kigwene I",
    "Kigwene II",
    "Kinunga I",
    "Kinunga II",
    "Mirambi I",
    "Mirambi II",
    "Mirambi III",
    "Nyarutunga I",
    "Nyarutunga II",
  ],

  // Ruramira Sector
  "Kayonza|Ruramira|Bugambira": [
    "Agasharu",
    "Agatare",
    "Amashya",
    "Buhoro",
    "Murambi",
  ],
  "Kayonza|Ruramira|Nkamba": [
    "Akabarima",
    "Akarambo",
    "Cyabitana",
    "Gitega",
    "Nyagacyamu",
    "Sabununga",
    "Umubuga",
  ],
  "Kayonza|Ruramira|Ruyonza": [
    "Gisenga",
    "Gitoki",
    "Gitwa",
    "Kabeza",
    "Kacyiru",
    "Rukoma",
  ],
  "Kayonza|Ruramira|Umubuga": [
    "Agasharu",
    "Akarugina",
    "Amazinga",
    "Gitesannyi",
    "Kabukara",
    "Kabuye",
    "Kajembe",
    "Kamukire",
  ],

  // Rwinkwavu Sector
  "Kayonza|Rwinkwavu|Gihinga": [
    "Akajevuba",
    "Akayebe",
    "Gihinga",
    "Karuhambo",
    "Migera",
    "Nyamimuri",
    "Rubirizi",
    "Rugunga",
    "Rusera",
    "Uburembo",
  ],
  "Kayonza|Rwinkwavu|Mbarara": [
    "Gacaca",
    "Gahushyi",
    "Kingogo",
    "Mbarara I",
    "Mbarara II",
    "Mutembo",
  ],
  "Kayonza|Rwinkwavu|Mukoyoyo": [
    "Bishenyi",
    "Busasamana",
    "Bwiza",
    "Dusabane",
    "Kazeneza",
    "Kiyovu",
    "Mahumbezi",
    "Mutembo",
    "Nyamabuye",
    "Nyankora",
    "Nyarwashama I",
    "Nyarwashama II",
    "Rebero",
    "Twibanire",
    "Twiyunge",
    "Vungiro",
  ],
  "Kayonza|Rwinkwavu|Nkondo": [
    "Burigade",
    "Byimana",
    "Gasabo",
    "Gisozi",
    "Kinihira",
    "Matinza",
    "Muganza",
    "Nkondo I",
    "Nkondo II",
    "Nyabihare",
    "Rebero",
    "Rurama",
    "Rwinkwavu",
    "Seka",
  ],

  // ============================================================
  // EAST PROVINCE - Kirehe District
  // ============================================================

  // Gahara Sector
  "Kirehe|Gahara|Butezi": [
    "Cyamabuye",
    "Cyasusa I",
    "Cyasusa II",
    "Irama Centre",
    "Kabeza",
    "Kijumbura I",
    "Kijumbura II",
    "Kijumbura III",
    "Kivogera",
    "Rwabarimba",
    "Rwabiyombe",
    "Rwamabenga",
    "Rwamuzima",
    "Samuko",
    "Umubano I",
    "Umubano II",
  ],
  "Kirehe|Gahara|Muhamba": [
    "Bukorasi",
    "Cyobaharaye",
    "Gacaca",
    "Gasaka",
    "Gasasa",
    "Kabeza",
    "Muhero",
    "Murama",
    "Muyange",
    "Ntaruka",
    "Nyabitare",
    "Rusisiro",
  ],
  "Kirehe|Gahara|Murehe": [
    "Cyasemakamba",
    "Cyumbati",
    "Isangano",
    "Mugogo",
    "Murama I",
    "Murama II",
    "Nyakarambi",
    "Nyamahuna",
    "Nyamirondogoro",
    "Nyamugari",
    "Nyankurazo",
    "Nyombe",
    "Village Dagaza",
  ],
  "Kirehe|Gahara|Nyagasenyi": [
    "Cyabihama I",
    "Cyabihama II",
    "Gakurungo",
    "Gasarabwayi",
    "Gashongora",
    "Iribagiza",
    "Kabagera",
    "Kagarama",
    "Mugatare",
    "Nyakabimba",
    "Nyamisagara",
    "Rugando",
    "Rugina",
    "Rusave",
    "Rwabaseka",
    "Rwambanda",
  ],
  "Kirehe|Gahara|Nyakagezi": [
    "Kivogo",
    "Muguruka I",
    "Muguruka II",
    "Mukundanya",
    "Nyagasozi",
    "Rubira",
    "Rubumba",
    "Rurama",
    "Susuruka",
  ],
  "Kirehe|Gahara|Rubimba": [
    "Agatangaza",
    "Byimana",
    "Kanteyamanga",
    "Kinyonzo I",
    "Kinyonzo II",
    "Nyagasozi",
    "Nyakarambi",
    "Rubira",
    "Rununga",
    "Rwakajonge",
    "Rwamaranga I",
    "Rwamaranga II",
    "Rwamurema",
    "Umubogora",
  ],

  // Gatore Sector
  "Kirehe|Gatore|Curazo": [
    "Gatega",
    "Kigarama",
    "Mugeruko",
    "Nyarwogo",
    "Rugari",
    "Runyinya",
    "Rutoma",
  ],
  "Kirehe|Gatore|Cyunuzi": [
    "Cyunuzi I",
    "Cyunuzi II",
    "Gakuyo",
    "Kabeza",
    "Kabungo",
    "Nyagashyanga",
    "Rurenge",
  ],
  "Kirehe|Gatore|Muganza": [
    "Kamomo",
    "Karenge",
    "Ntungamo",
    "Nyarusange",
    "Rebero",
    "Rwabigaro",
  ],
  "Kirehe|Gatore|Nyamiryango": [
    "Bwiza",
    "Gashanga",
    "Gasharu",
    "Karambi",
    "Nyagitongo",
    "Rubuye",
    "Rwanyabigaba",
  ],
  "Kirehe|Gatore|Rwabutazi": [
    "Bitoma I",
    "Bitoma II",
    "Muyange",
    "Rugina",
    "Rurembo I",
    "Samuko",
    "Rurembo II",
  ],
  "Kirehe|Gatore|Rwantonde": [
    "Cyiha",
    "Karehero",
    "Karembo",
    "Kavomo",
    "Kigarama",
    "Mitoyi",
    "Mumeya",
    "Rubona",
    "Rusenyi",
    "Rutare",
  ],

  // Kigarama Sector (Kirehe)
  "Kirehe|Kigarama|Cyanya": [
    "Cyanya",
    "Gakoni",
    "Kabimba I",
    "Kabimba II",
    "Kigende",
    "Nyakavogo",
    "Nyamikoni",
    "Nyamirambo I",
    "Nyamirambo II",
    "Nyarutovu",
    "Rubare",
  ],
  "Kirehe|Kigarama|Kigarama": [
    "Gahindu",
    "Humure",
    "Kigarama",
    "Kiravunga",
    "Nyakazinga",
    "Nyamiyaga",
    "Nyarutojo",
    "Rugari",
    "Rurenge",
    "Samuko",
  ],
  "Kirehe|Kigarama|Kiremera": [
    "Bweranka I",
    "Bweranka II",
    "Cyanika",
    "Irama",
    "Kagane",
    "Kagorogoro",
    "Kaguriro",
    "Karenge I",
    "Karenge II",
    "Kayirarye",
    "Kimesho",
    "Kiremera",
    "Nyaryenge",
    "Rwesinge",
    "Umunezero",
  ],
  "Kirehe|Kigarama|Nyakerera": [
    "Gasenyi",
    "Gatari",
    "Kabare",
    "Kabuga",
    "Kiyovu",
    "Nyabubare",
    "Ruhandagazi",
    "Rukiri",
    "Ryamukaza",
  ],
  "Kirehe|Kigarama|Nyankurazo": [
    "Kabeza",
    "Kivu",
    "Marembo",
    "Nshungerezi",
    "Nyagahanga",
    "Nyakabungo",
    "Nyakigera",
    "Nyakwisi",
    "Rama",
    "Ruhuha",
    "Rusumo",
  ],

  // Kigina Sector
  "Kirehe|Kigina|Gatarama": [
    "Efemu",
    "Gitaba",
    "Kabimba",
    "Kabugwe",
    "Kanogo",
    "Kanyabihara",
    "Nyakizu",
    "Ruhama",
  ],
  "Kirehe|Kigina|Rugarama": [
    "Isangano",
    "Kabeza",
    "Kagega",
    "Kimeya",
    "Kubwinteko",
    "Kabuga",
    "Kundengo",
    "Byimana",
    "Muganza",
    "Nyagisozi",
    "Rugando",
    "Rugarama",
    "Rujambara",
    "Rwakanyambo",
  ],
  "Kirehe|Kigina|Ruhanga": [
    "Buhwaga",
    "Kavuzo",
    "Ku Murenge",
    "Nyagasozi",
    "Nyakarambi I",
    "Nyakarambi II",
    "Nyakibande",
    "Rebezo",
    "Rubare",
    "Rwagasare I",
    "Rwagasare II",
    "Rwakarinda",
    "Rwamabare",
    "Rwamakara",
    "Rwanyamutara",
  ],
  "Kirehe|Kigina|Rwanteru": [
    "Bugarura",
    "Gasarasi",
    "Mugisenyi I",
    "Mugisenyi II",
    "Nyakayaga",
    "Rusororo",
    "Rwanteru I",
    "Rwanteru II",
  ],

  // Kirehe Sector
  "Kirehe|Kirehe|Gahama": [
    "Byimana",
    "Kabeza",
    "Kaziba",
    "Kiyovu",
    "Muhweza",
    "Murugarama",
    "Ntungamo",
    "Nyakatsi",
    "Nyamazi",
    "Rebero",
  ],
  "Kirehe|Kirehe|Kirehe": [
    "Agatwa",
    "Byimana",
    "Kamasaro",
    "Kirehe",
    "Mirambi",
    "Runyinya",
  ],
  "Kirehe|Kirehe|Nyabigega": [
    "Bugarura",
    "Duterimbere",
    "Gahuzamiryango",
    "Kabeza",
    "Kamuhoza",
    "Mushirarungu",
    "Nyarurembo",
    "Rurenge",
    "Twizerane",
    "Vatikani",
  ],
  "Kirehe|Kirehe|Nyabikokora": [
    "Bwiza",
    "Byimana",
    "Kaduha",
    "Karenge",
    "Kiyovu",
    "Kwihanika",
    "Kwirebero",
    "Mumpinga",
    "Nyarurembo",
    "Nyarusange",
    "Rugenge",
    "Rugero",
    "Rurama",
    "Rusamaza",
    "Rutonde",
  ],

  // Mahama Sector
  "Kirehe|Mahama|Kamombo": [
    "Amahoro",
    "Bwiza",
    "Byimana",
    "Kabuga",
    "Kamabuye",
    "Kamato",
    "Kamombo",
    "Kigongi",
    "Kigufi",
    "Rumuri",
    "Terimbere",
    "Umubano",
  ],
  "Kirehe|Mahama|Mwoga": [
    "Buhaga",
    "Cyanika",
    "Gisanze",
    "Isangano",
    "Kwisha",
    "Mwoga",
    "Nyarusange",
  ],
  "Kirehe|Mahama|Saruhembe": [
    "Gisenyi",
    "Kanombe",
    "Karebezo",
    "Muride",
    "Nyagahanga",
    "Nyamiyumbo",
    "Rushonga",
    "Saruhembe",
  ],
  // Mpanga Sector
  "Kirehe|Mpanga|Bwiyorere": [
    "Bihembe",
    "Cyimparage",
    "Gisenyi",
    "Kacyiru",
    "Kamarashavu",
    "Kangarame",
    "Nyagasenyi",
    "Nyakabande",
    "Ruhama",
  ],
  "Kirehe|Mpanga|Kankobwa": [
    "Kankobwa",
    "Murundi",
    "Nyamiyaga",
    "Remera",
    "Rusha",
  ],
  "Kirehe|Mpanga|Mushongi": [
    "Gitoma",
    "Kayanga",
    "Mishenyi",
    "Mushongi",
    "Ngugu I",
    "Ngugu II",
  ],
  "Kirehe|Mpanga|Nasho": [
    "Agasasa",
    "Busasamana I",
    "Busasamana II",
    "Ibanda",
    "Mutwe",
    "Nyabubare I",
    "Nyabubare II",
    "Nyawera I",
    "Nyawera II",
    "Pilote",
  ],
  "Kirehe|Mpanga|Nyakabungo": [
    "Cyamuhabura",
    "Gikushya",
    "Gitega",
    "Isenga",
    "Kabuga",
    "Nyagatovu",
    "Nyakabungo",
    "Rudandi",
    "Rushenyi",
  ],
  "Kirehe|Mpanga|Rubaya": [
    "Akinzuki",
    "Byimana",
    "Gacenshero",
    "Kabeza",
    "Mumpinga",
    "Murambi",
    "Rubaya",
    "Rukonji",
    "Rushonga",
  ],

  // Musaza Sector
  "Kirehe|Musaza|Gasarabwayi": [
    "Gasarabwayi",
    "Gicuma",
    "Kanyosha",
    "Nyakariba I",
    "Nyakariba II",
    "Nyakiriba",
    "Rukumba",
    "Rwinyundo",
  ],
  "Kirehe|Musaza|Kabuga": [
    "Gikenke",
    "Kabuga",
    "Kagasa",
    "Kambwire",
    "Kimeya",
    "Nyamugari",
    "Rubuye I",
    "Rubuye II",
    "Rugango",
    "Rwamurema",
  ],
  "Kirehe|Musaza|Mubuga": [
    "Kanogo",
    "Kanombe",
    "Kiyovu",
    "Mubuga",
    "Runyinya",
    "Rwamuhazi",
    "Ryabega",
    "Ryarugazi",
  ],
  "Kirehe|Musaza|Musaza": [
    "Gatwe I",
    "Gatwe II",
    "Kanyinya I",
    "Kanyinya II",
    "Musaza",
    "Muyoka",
    "Nyakariba",
  ],
  "Kirehe|Musaza|Nganda": [
    "Gacuba I",
    "Gacuba II",
    "Kamagare",
    "Kaziba",
    "Murura",
    "Nganda",
    "Nganda Ville I",
    "Nganda Ville II",
    "Nyamiyaga",
    "Ruseke",
    "Rwabugagara",
    "Rwamushongore",
  ],

  // Mushikiri Sector
  "Kirehe|Mushikiri|Bisagara": [
    "Bingaro",
    "Bisagara",
    "Isangano",
    "Kampara",
    "Nkoyoyo",
    "Nyabubare",
    "Nyakabande",
    "Ruturamigina",
    "Umunini",
    "Umutuzo",
    "Umuyange",
  ],
  "Kirehe|Mushikiri|Cyamigurwa": [
    "Bwiza",
    "Impara",
    "Isangano",
    "Kamasare",
    "Karenge",
    "Kigarama",
    "Nyamabuye",
    "Rusenyi",
  ],
  "Kirehe|Mushikiri|Rugarama": [
    "Birengero",
    "Bugarura",
    "Cyanjuna",
    "Cyanyamisa",
    "Gahushyi",
    "Kacyiru",
    "Kamarashavu",
    "Kamunyana",
    "Karambi",
    "Nyagatugunda",
    "Nyagitongo",
    "Rutare",
    "Rwamunana",
    "Ryogire",
    "Tomi",
  ],
  "Kirehe|Mushikiri|Rwanyamuhanga": [
    "Bweramana",
    "Cyaka",
    "Cyeru",
    "Humure",
    "Mugina",
    "Munini",
    "Nterere",
    "Nyagateme",
    "Nyaruhanga",
    "Rubimba",
    "Rutare",
    "Rutoma",
    "Sake",
  ],
  "Kirehe|Mushikiri|Rwayikona": [
    "Barisuka",
    "Birembo",
    "Isangano",
    "Kabeza",
    "Kabuga",
    "Nyakabande",
    "Nyungwe",
    "Rukira",
    "Rusumo",
    "Rwahenge",
    "Rwakabandama",
    "Rwayikona",
    "Tonero",
  ],

  // Nasho Sector
  "Kirehe|Nasho|Cyambwe": [
    "Gicaca",
    "Kagamba",
    "Kagese I",
    "Nyakazinga",
    "Rugwiro",
    "Rukono",
    "Rushoka",
    "Rwinyange",
  ],
  "Kirehe|Nasho|Kagese": [
    "Gatunguru",
    "Kagese II",
    "Kanamira",
    "Kibimba",
    "Mitsindo",
    "Murehe",
    "Nyabimuri",
  ],
  "Kirehe|Nasho|Ntaruka": [
    "Gashasha",
    "Kabusunzu",
    "Karenge II",
    "Nyabihara",
    "Nyagasozi",
    "Nyamurindira",
    "Ruhema",
    "Ruseke",
    "Rwamuhigi",
  ],
  "Kirehe|Nasho|Rubirizi": [
    "Kabigembe I",
    "Kabigembe II",
    "Kadamu",
    "Karenge I",
    "Masizi",
    "Mulindi",
    "Nyabiyenzi",
    "Rwandarushya I",
    "Rwandarushya II",
  ],
  "Kirehe|Nasho|Rugoma": [
    "Gashiru",
    "Gatarama",
    "Gatare",
    "Kabigembe",
    "Kageyo",
    "Karama",
    "Karubare",
    "Rebezo",
    "Rugoma",
  ],

  // Nyamugari Sector
  "Kirehe|Nyamugari|Bukora": [
    "Bukinanyana",
    "Bukora",
    "Busasamana",
    "Bweramana",
    "Kabuga",
    "Maranyundo",
    "Mudahunga",
    "Mumararungu",
    "Mushirarungu",
    "Mwima",
    "Nyabiyenzi",
    "Remanyundo",
  ],
  "Kirehe|Nyamugari|Kagasa": [
    "Bwiza",
    "Ituze",
    "Kagasa",
    "Kamabuye",
    "Kameya",
    "Mataba",
    "Nyabayama",
    "Nyakariba",
    "Nyamirama",
    "Nyarurembo",
    "Rebero",
    "Urugwiro",
  ],
  "Kirehe|Nyamugari|Kazizi": [
    "Amahoro",
    "Byimana",
    "Gahomvu",
    "Gasabo",
    "Gasetsa",
    "Gashanga",
    "Jyambere",
    "Kabwayi",
    "Mucyo",
    "Nyenyeri",
    "Tetero",
    "Ururembo",
  ],
  "Kirehe|Nyamugari|Kiyanzi": [
    "Kabungeri",
    "Kabuye",
    "Kacyiru",
    "Kagera",
    "Kamarashavu",
    "Karambi",
    "Karehe",
    "Karembo",
    "Kinamba",
    "Matare",
    "Mitako",
    "Murambi",
    "Muyinza",
    "Nyarwamura",
    "Remera",
    "Rusumo",
  ],
  "Kirehe|Nyamugari|Nyamugari": [
    "Amahoro",
    "Gasenyi",
    "Ihuriro",
    "Isangano",
    "Kabeza",
    "Kamugarura",
    "Kimigisha",
    "Munini",
    "Muramba",
    "Nyagahama",
    "Nyamugari Centre",
    "Rama",
    "Rebero",
    "Rurembo",
    "Rusozi",
    "Ubumwe",
    "Umubano",
    "Umunezero",
  ],

  // Nyarubuye Sector
  "Kirehe|Nyarubuye|Mareba": [
    "Burembo",
    "Kaziba I",
    "Kaziba II",
    "Nyacyonga I",
    "Nyacyonga II",
    "Nyamateke",
    "Rurenge I",
    "Rurenge II",
  ],
  "Kirehe|Nyarubuye|Nyabitare": [
    "Bicumbi",
    "Kazizi",
    "Kazizi II",
    "Mpanguhe",
    "Ndabarekuye",
    "Nyabayama",
    "Nyabitare",
    "Nyamisagara",
    "Nyamugari",
    "Rugarama",
    "Rwamagana",
  ],
  "Kirehe|Nyarubuye|Nyarutunga": [
    "Bugarura",
    "Kagabiro",
    "Kagorogoro",
    "Nkakwa",
    "Nyakanazi",
    "Nyarubuye I",
    "Nyarubuye II",
    "Nyarutunga",
    "Remera",
    "Rubare",
    "Rutunga",
  ],

  // ============================================================
  // EAST PROVINCE - Ngoma District
  // ============================================================

  // Gashanda Sector
  "Ngoma|Gashanda|Cyerwa": [
    "Cyerwa",
    "Gako",
    "Mizibiri",
    "Muyange",
    "Nyamugali",
    "Ruyema I",
    "Ruyema II",
  ],
  "Ngoma|Gashanda|Giseri": [
    "Kibimba",
    "Murambi",
    "Nyagitabire",
    "Rubambantare",
    "Rwambohero",
    "Rwanyamigono",
  ],
  "Ngoma|Gashanda|Munege": ["Gakuto", "Kanege", "Nyagasenga", "Rugarama"],
  "Ngoma|Gashanda|Mutsindo": [
    "Cyanama",
    "Gisenyi",
    "Kanyinya",
    "Kirundo",
    "Nyakarambo",
    "Nyamasare",
    "Rwakavuna",
    "Rwinkuba",
    "Ryangiriye",
  ],

  // Jarama Sector
  "Ngoma|Jarama|Ihanika": [
    "Irebero",
    "Kabonero",
    "Kamapfizi",
    "Kivugiza",
    "Nyamugari",
    "Umuka",
  ],
  "Ngoma|Jarama|Jarama": [
    "Abiyunze",
    "Akabeza",
    "Dufatanye",
    "Duterimbere",
    "Irarire",
    "Twizerane",
    "Ubumwe",
  ],
  "Ngoma|Jarama|Karenge": [
    "Akabuga",
    "Akagoma",
    "Akajevuba",
    "Gisoko",
    "Kanombe",
    "Karenge",
    "Kavumu",
    "Korandebe",
    "Nyamirambo",
    "Nyarurembo",
    "Rusenyi",
    "Shirinyota",
  ],
  "Ngoma|Jarama|Kibimba": [
    "Akabira",
    "Akaziba",
    "Cyahafi",
    "Ibabiri",
    "Murama",
    "Uruhuha",
    "Urukomo",
  ],
  "Ngoma|Jarama|Kigoma": [
    "Icyurusambu",
    "Iramiro",
    "Kigoma",
    "Meraneza",
    "Mubaha",
    "Ramba",
    "Remera",
    "Vunga",
  ],

  // Karembo Sector
  "Ngoma|Karembo|Akaziba": [
    "Impinga",
    "Kwiperu",
    "Kukabeza",
    "Ngara",
    "Nyagasozi",
    "Rubumba",
    "Rukizi",
    "Rurenge",
    "Rwamuhimbura",
    "Umusebeya",
    "Umuyange",
  ],
  "Ngoma|Karembo|Karaba": [
    "Kigobe",
    "Mungoro",
    "Rusumbantwari",
    "Umurehe",
    "Urutare",
  ],
  "Ngoma|Karembo|Nyamirambo": [
    "Gashekasheke I",
    "Gashekasheke II",
    "Gitaraga",
    "Kanama",
    "Karibu",
    "Kivugangoma I",
    "Kivugangoma II",
    "Mumahoro",
    "Murambi",
    "Rwakayango",
  ],

  // Kazo Sector
  "Ngoma|Kazo|Birenga": [
    "Gahondo",
    "Karisizo",
    "Murindwa",
    "Murusenyi",
    "Nyakagezi",
  ],
  "Ngoma|Kazo|Gahurire": ["Itambiro", "Rebero", "Rugenge", "Umuyange"],
  "Ngoma|Kazo|Karama": ["Kabimba", "Kagusa", "Karenge", "Mpandu", "Rango"],
  "Ngoma|Kazo|Kinyonzo": ["Amabumba", "Kibimba", "Rugarama", "Tunduti"],
  "Ngoma|Kazo|Umukamba": ["Akabaya", "Kagarama", "Kazo", "Umukamba"],

  // Kibungo Sector
  "Ngoma|Kibungo|Cyasemakamba": [
    "Amarembo",
    "Bwiza",
    "Gatoro",
    "Kabeza",
    "Kiruhura",
    "Rubimba",
  ],
  "Ngoma|Kibungo|Gahima": [
    "Gasoro",
    "Karenge",
    "Kazeneza",
    "Nyamigina",
    "Rutovu",
    "Rwamihuro",
  ],
  "Ngoma|Kibungo|Gatonde": [
    "Karungu",
    "Misange",
    "Nyagakizi",
    "Nyagatovu",
    "Nyakabungo",
    "Rubona",
  ],
  "Ngoma|Kibungo|Karenge": [
    "Amahoro",
    "Gatare",
    "Ihuriro",
    "Isangano",
    "Kabeza",
    "Musamvu",
    "Ubumwe",
  ],
  "Ngoma|Kibungo|Mahango": [
    "Gisaka",
    "Kabimba",
    "Kacyiru",
    "Karambi",
    "Rebezo",
    "Ruhinga",
  ],

  // Mugesera Sector
  "Ngoma|Mugesera|Akabungo": [
    "Agakindo",
    "Akabingo",
    "Kinihira",
    "Nyamirambo",
    "Rugarama",
    "Rurenge",
    "Rwinkwavu",
  ],
  "Ngoma|Mugesera|Mugatare": [
    "Icocorero",
    "Ikibinge",
    "Isangano",
    "Kampara",
    "Kumunini",
    "Kumuyange",
    "Mumurenge",
    "Rwamenyo",
  ],
  "Ngoma|Mugesera|Ntanga": [
    "Akabande",
    "Akabeza",
    "Akinteko",
    "Ikiyovu",
    "Murambi",
    "Rugaju",
    "Urukoki",
  ],
  "Ngoma|Mugesera|Nyamugari": [
    "Gisenyi",
    "Gishandaro",
    "Kimanama",
    "Nyamabuye",
    "Rwarutare",
    "Ubuhanira",
  ],
  "Ngoma|Mugesera|Nyange": [
    "Agatare",
    "Gomezo",
    "Ntarama",
    "Nunga",
    "Rugazi",
    "Rusave",
    "Rwamibari",
  ],

  // Murama Sector (Ngoma)
  "Ngoma|Murama|Gitaraga": [
    "Gitaraga",
    "Kizenga",
    "Ntara",
    "Nyagahura",
    "Nyakabanga",
    "Rukizi",
    "Tonero",
  ],
  "Ngoma|Murama|Kigabiro": [
    "Cyeru",
    "Kaboza",
    "Kigabiro",
    "Murutare",
    "Mutara",
    "Nyagasozi",
  ],
  "Ngoma|Murama|Mvumba": [
    "Gitesanyi",
    "Kibimba",
    "Kiyagara",
    "Mvumba",
    "Nyakagezi",
    "Nyarwanya",
    "Rugarama",
  ],
  "Ngoma|Murama|Rurenge": [
    "Gashanda",
    "Gasibya",
    "Gatoma",
    "Gitaba",
    "Kabeza",
    "Kambuto",
    "Kanyinya",
    "Kaziba",
    "Kurutare",
    "Muguruka",
    "Murambi",
    "Ruvuzi",
    "Ruzinga",
  ],
  "Ngoma|Murama|Sakara": [
    "Agatonde",
    "Kabahushi",
    "Kakahi",
    "Kavumu",
    "Kukarenge",
    "Mukibara",
    "Nyagataba",
    "Nyamirembe",
    "Rwabuconco",
    "Sagatare",
    "Urubare",
  ],

  // Mutenderi Sector
  "Ngoma|Mutenderi|Karwema": ["Cyanamo", "Gitesanyi", "Meraneza", "Musenyi"],
  "Ngoma|Mutenderi|Kibare": [
    "Kabombo",
    "Mutukura",
    "Ndarage",
    "Rwakaza",
    "Rwankamba",
  ],
  "Ngoma|Mutenderi|Mutenderi": [
    "Agatonde",
    "Akarimbu",
    "Cyanyunga",
    "Kibaya",
    "Tonero",
  ],
  "Ngoma|Mutenderi|Muzingira": [
    "Gatonde",
    "Rusave",
    "Rwakandari",
    "Shyagashya",
    "Umuyange",
  ],
  "Ngoma|Mutenderi|Nyagasozi": ["Nyagasozi", "Nyamirindi", "Nyamugari"],

  // Remera Sector (Ngoma)
  "Ngoma|Remera|Bugera": [
    "Gasebeya",
    "Gatare",
    "Gisunzu",
    "Kabeza",
    "Kiyovu",
    "Kumukiza",
    "Munini I",
    "Munini II",
    "Nkenke",
    "Rubumba",
    "Rwesero",
  ],
  "Ngoma|Remera|Kinunga": [
    "Kabeza",
    "Kamvumba",
    "Kigaga",
    "Murambi",
    "Nyarugenge",
    "Urusagara",
  ],
  "Ngoma|Remera|Ndekwe": [
    "Gikomero",
    "Icyakabiri",
    "Rugando",
    "Ruhuha",
    "Rukore",
    "Rwamutabazi",
  ],
  "Ngoma|Remera|Nyamagana": [
    "Bukiranzuki",
    "Kabuye",
    "Kaguruka",
    "Kinanira",
    "Nyakabingo",
    "Rebero",
    "Rubimba",
    "Ruhama",
    "Ryinteko",
    "Tonero",
  ],

  // Rukira Sector
  "Ngoma|Rukira|Buliba": [
    "Dagaza",
    "Gatare",
    "Kabeza",
    "Kanzenze",
    "Kibande",
    "Kibimba",
    "Rugaragara",
    "Rurama",
    "Rwakimanzi",
    "Rwavuguta",
    "Sangano",
  ],
  "Ngoma|Rukira|Kibatsi": [
    "Agatare",
    "Bweranka",
    "Gahushyi",
    "Gituku",
    "Kagarama",
    "Kibimba",
    "Korandebe",
    "Munezero",
    "Nyamabuye",
    "Rubagabaga",
    "Rusenyi",
    "Rwanyineka",
    "Terimbere",
  ],
  "Ngoma|Rukira|Nyaruvumu": [
    "Amahoro",
    "Cyamahehe",
    "Gafunzo",
    "Gatare",
    "Isangano",
    "Nyagataba",
    "Rugenge",
    "Terimbere",
  ],
  "Ngoma|Rukira|Nyinya": [
    "Cyabayagara",
    "Kabimba",
    "Karuruma",
    "Kibimba",
    "Mirambi",
    "Rugarama",
    "Ruhama",
    "Rwagakobe",
    "Rwagishanga",
    "Rwamukobwa",
  ],

  // Rukumberi Sector
  "Ngoma|Rukumberi|Gituza": ["Gitesanyi", "Gituza", "Mfune", "Ruyenzi"],
  "Ngoma|Rukumberi|Ntovi": [
    "Iyantende",
    "Kigese",
    "Mugwato",
    "Ntovi",
    "Rukumberi",
    "Rwamibabi",
  ],
  "Ngoma|Rukumberi|Rubago": [
    "Akabungo",
    "Kavumve",
    "Nyagakizi",
    "Nyagitabire",
    "Rubago",
  ],
  "Ngoma|Rukumberi|Rubona": [
    "Kagarama",
    "Maswa I",
    "Maswa II",
    "Rugenda I",
    "Rugenda II",
    "Ruyenzi I",
  ],
  "Ngoma|Rukumberi|Rwintashya": [
    "Bare",
    "Karokora",
    "Rwimpongo I",
    "Rwimpongo II",
    "Shyembe",
  ],

  // Rurenge Sector (Ngoma)
  "Ngoma|Rurenge|Akagarama": [
    "Kuwimana",
    "Mukibimba",
    "Rwanyamuhinda",
    "Umurambi",
    "Rugazi",
    "Uruyenzi",
  ],
  "Ngoma|Rurenge|Muhurire": [
    "Agatonero",
    "Gashinya",
    "Gisunzu",
    "Gitobe",
    "Nyamata",
  ],
  "Ngoma|Rurenge|Musya": [
    "Inteko",
    "Kabimba",
    "Kamugundu",
    "Karama",
    "Runazi",
    "Rwasaburo",
  ],
  "Ngoma|Rurenge|Rugese": [
    "Kajevuba",
    "Kamwiru",
    "Kiyanja",
    "Kumunini",
    "Nyamigende",
    "Rugarika",
    "Rwakanuma",
  ],
  "Ngoma|Rurenge|Rujambara": [
    "Akarambaraye",
    "Kabeza",
    "Mashyoza",
    "Mbonwa",
    "Nyabagaza",
    "Urusagara",
  ],
  "Ngoma|Rurenge|Rwikubo": [
    "Akabakanda",
    "Amashya",
    "Kabashumba",
    "Kigarama",
    "Kivugangoma",
    "Ruhuha",
    "Rwaromba",
  ],

  // Sake Sector
  "Ngoma|Sake|Gafunzo": [
    "Cyanika",
    "Gatare",
    "Icyizanye",
    "Isovu",
    "Kiriko",
    "Kumurenge",
    "Mabuga I",
    "Mabuga II",
    "Nyakagezi",
    "Rwanyabiranga",
    "Rwumba",
  ],
  "Ngoma|Sake|Kibonde": [
    "Kabare",
    "Karenge",
    "Kidakama",
    "Murama",
    "Nkingi",
    "Nyagasani",
    "Umucyo",
  ],
  "Ngoma|Sake|Nkanga": [
    "Agatare",
    "Akabira",
    "Bukokoza",
    "Gisera",
    "Iryarurengo",
    "Kanazi",
    "Mizibiri",
  ],
  "Ngoma|Sake|Rukoma": [
    "Akagoma",
    "Irebero",
    "Isangano",
    "Muminoga",
    "Musenyi",
    "Nyagasozi",
    "Nyakariba",
    "Nyarurembo",
    "Umukoni",
  ],

  // Zaza Sector
  "Ngoma|Zaza|Nyagasozi": [
    "Agatare",
    "Akabeza",
    "Akabuga",
    "Igifurere",
    "Ikiyovu",
    "Rebero",
    "Isanganiro",
    "Rubati",
    "Rwanshuro",
    "Rwimbirwa",
    "Sugira",
  ],
  "Ngoma|Zaza|Nyagatugunda": [
    "Akanyinya",
    "Amahoro",
    "Cyerwa",
    "Cyizihira",
    "Itonero",
    "Jyambere",
    "Kabonero",
    "Kirira",
    "Kizenga",
    "Kumuyange",
    "Nyagatugunda",
    "Nyakabanda",
    "Nyakabande",
    "Nyarurembo",
    "Rebero",
    "Rugarama",
    "Rushubi",
    "Rwezibamba",
  ],
  "Ngoma|Zaza|Ruhembe": [
    "Agasave",
    "Ituze",
    "Kabeza",
    "Kacyiru",
    "Karenge",
    "Kumunini",
    "Makoma",
    "Mpembwe",
    "Nyagahinga",
    "Nyaruteja",
    "Rugarama",
    "Rushubi",
    "Urutare",
  ],
  "Ngoma|Zaza|Ruhinga": [
    "Agataba",
    "Akabungo",
    "Busasamana",
    "Gasebeya",
    "Isangano",
    "Kagarama",
    "Nyagahandagazi",
    "Nyakariba",
    "Rwakagina",
    "Sangaza",
    "Ubumwe",
    "Umukoma",
    "Umuvugangoma",
  ],

  // ============================================================
  // EAST PROVINCE - Bugesera District
  // ============================================================

  // Gashora Sector
  "Bugesera|Gashora|Biryogo": [
    "Bidudu",
    "Biryogo",
    "Buhoro",
    "Gihanama",
    "Kagarama",
    "Kanyonyomba",
    "Karutete",
    "Kivugiza",
    "Rugunga",
  ],
  "Bugesera|Gashora|Kabuye": [
    "Bidudu",
    "Kabuye",
    "Karizinge",
    "Rwagasiga",
    "Rweteto",
  ],
  "Bugesera|Gashora|Kagomasi": [
    "Akagako",
    "Kagomasi",
    "Kiruhura",
    "Kuruganda",
    "Runzenze",
    "Rushubi",
  ],
  "Bugesera|Gashora|Mwendo": [
    "Gaharwa",
    "Gisenyi",
    "Kayovu",
    "Ruhanga",
    "Ruhanura",
    "Rutanga",
  ],
  "Bugesera|Gashora|Ramiro": [
    "Dihiro",
    "Kagasa I",
    "Kagasa II",
    "Karusine I",
    "Karusine II",
    "Migina",
    "Munyinya",
    "Rweru I",
    "Rweru II",
  ],

  // Juru Sector
  "Bugesera|Juru|Juru": [
    "Ayabakiza",
    "Bisagara",
    "Nyamigende",
    "Rugarama",
    "Rwamakara",
    "Twabagarama",
  ],
  "Bugesera|Juru|Kabukuba": [
    "Gikana",
    "Gikurazo",
    "Kabukuba",
    "Kamatongo",
    "Majanja",
    "Mbuye",
    "Rushubi",
  ],
  "Bugesera|Juru|Mugorore": [
    "Cyirabo",
    "Gatora",
    "Kajevuba",
    "Mugorore",
    "Murambi",
    "Rebero",
    "Rwamurama",
    "Tabarari",
  ],
  "Bugesera|Juru|Musovu": [
    "Bitega",
    "Cyabasonga",
    "Cyingaju",
    "Kabeza",
    "Nyaruhuru",
  ],
  "Bugesera|Juru|Rwinume": [
    "Gisororo",
    "Kabeza",
    "Katarara",
    "Kinihira",
    "Rwimpyisi",
    "Uwimpunga",
  ],

  // Kamabuye Sector
  "Bugesera|Kamabuye|Biharagu": [
    "Akanigo",
    "Biharagu",
    "Kanyonyera",
    "Munazi",
    "Muyigi",
    "Nyarurama",
    "Rubugu",
  ],
  "Bugesera|Kamabuye|Burenge": [
    "Akabazeyi",
    "Kagenge",
    "Murambo",
    "Nyabyondo",
    "Nyakariba",
    "Rebero",
    "Senga",
  ],
  "Bugesera|Kamabuye|Kampeka": [
    "Byimana",
    "Kampeka",
    "Mabuye",
    "Masangano",
    "Mbuganzeri",
    "Mparo",
    "Ndama",
    "Pamba I",
    "Pamba II",
  ],
  "Bugesera|Kamabuye|Nyakayaga": [
    "Akaje",
    "Fatinkanda",
    "Murago",
    "Murambi",
    "Ntungamo I",
    "Ntungamo II",
    "Nyakayaga",
  ],
  "Bugesera|Kamabuye|Tunda": [
    "Cyogamuyaga",
    "Mububa I",
    "Mububaya II",
    "Rubirizi",
    "Rusibya",
    "Tunda",
    "Twuruziramire",
    "Uwibiraro I",
    "Uwibiraro II",
    "Uwumusave",
  ],

  // Mareba Sector
  "Bugesera|Mareba|Bushenyi": [
    "Bigaga",
    "Bukumba",
    "Cyantwari",
    "Gasagara",
    "Gitega",
    "Kabeza",
    "Kagese",
    "Kagogo",
    "Kamasonga",
    "Mareba",
    "Muyange",
    "Rukoyoyo",
    "Runyonza",
    "Rususa",
  ],
  "Bugesera|Mareba|Gakomeye": [
    "Gatanga",
    "Gitwa",
    "Kabere",
    "Kajevuba",
    "Kamudeberi",
    "Kamunana",
    "Kanka",
    "Kaziranyenzi",
    "Rwintare",
  ],
  "Bugesera|Mareba|Nyamigina": [
    "Gafunzo",
    "Kabeza",
    "Kabingo",
    "Kabuye",
    "Karwana",
    "Ngugu",
    "Nyamigisha",
    "Ruhina",
    "Rusenyi",
    "Ruyenzi",
  ],
  "Bugesera|Mareba|Rango": [
    "Gatare",
    "Gatinza",
    "Gihoko",
    "Kabuga",
    "Kagarama",
    "Matinza",
    "Mbuga",
    "Rango",
    "Rusagara",
    "Rwabikwano",
  ],
  "Bugesera|Mareba|Rugarama": [
    "Gasagara",
    "Gatare",
    "Kayonza",
    "Keza",
    "Kururama",
    "Muyenzi",
    "Ruduha",
    "Rugarama",
    "Rutaka",
  ],

  // Mayange Sector
  "Bugesera|Mayange|Gakamba": [
    "Gacucu",
    "Gakamba",
    "Gisenyi",
    "Kamugenzi",
    "Karambo",
    "Kavumu",
    "Rukora",
  ],
  "Bugesera|Mayange|Kagenge": [
    "Biryogo",
    "Gakindo",
    "Gitaramuka",
    "Karama",
    "Kiruhura",
    "Remera",
    "Rukindo",
    "Taba",
    "Tetero",
  ],
  "Bugesera|Mayange|Kibenga": [
    "Gahwiji I",
    "Gahwiji II",
    "Kindonyi",
    "Murambi",
    "Ruhorobero",
    "Rwakaramira",
    "Rwarusaku",
  ],
  "Bugesera|Mayange|Kibirizi": [
    "Gacyamo",
    "Gahinga",
    "Gisenyi",
    "Gitera",
    "Kibirizi",
    "Rugazi",
    "Rwakibirizi",
  ],
  "Bugesera|Mayange|Mbyo": [
    "Cyaruhiririra",
    "Kabyo",
    "Rugarama",
    "Rwimikoni I",
    "Rwimikoni II",
  ],

  // Musenyi Sector (Bugesera)
  "Bugesera|Musenyi|Gicaca": [
    "Bidudu",
    "Cyanika",
    "Cyarubazi",
    "Gatare",
    "Gihari",
    "Kagusa",
    "Kamahango",
    "Kavumu",
    "Kidudu",
    "Migina",
    "Ngarama",
    "Remera",
    "Rusagara",
  ],
  "Bugesera|Musenyi|Musenyi": [
    "Bidudu",
    "Bishinge",
    "Bizenga",
    "Cyeru",
    "Gakomeye",
    "Gakurazo",
    "Kigarama",
    "Kijuri",
    "Kiringa",
    "Muhanga",
    "Nunga",
    "Nyagasagara",
    "Rugando",
    "Rugeyo",
  ],
  "Bugesera|Musenyi|Nyagihunika": [
    "Gatoki",
    "Gitagata",
    "Kigusa",
    "Kiruhura",
    "Mbonwa",
    "Nyakajuri",
    "Rugarama",
    "Rushubi",
    "Rwankeri",
  ],
  "Bugesera|Musenyi|Rulindo": [
    "Kabeza",
    "Kabuye",
    "Kagunga",
    "Kanyamata",
    "Karambo",
    "Karubanzangabo",
    "Kinyovi",
    "Nyamuri",
    "Rulindo",
    "Runyonza",
  ],

  // Mwogo Sector
  "Bugesera|Mwogo|Bitaba": [
    "Bitaba",
    "Gatwe",
    "Gisasa",
    "Misatsi",
    "Rebero",
    "Rukoronko",
  ],
  "Bugesera|Mwogo|Kagasa": [
    "Gatare",
    "Gisenyi",
    "Karutabana",
    "Ngando",
    "Rubumba",
    "Rwintenderi",
  ],
  "Bugesera|Mwogo|Rugunga": [
    "Kagerero",
    "Nyamabuye",
    "Nyarukombe",
    "Rugazi",
    "Rukira",
    "Rukore",
    "Rusagara",
  ],
  "Bugesera|Mwogo|Rurenge": [
    "Gatoki",
    "Gitaraga",
    "Kaboshya",
    "Kaziramire",
    "Rurenge",
    "Rwabashenyi",
  ],

  // Ngeruka Sector
  "Bugesera|Ngeruka|Gihembe": [
    "Buhara",
    "Kabaya",
    "Kabuye",
    "Kadebu",
    "Kagasa",
    "Karambo",
    "Kirasaniro",
    "Kururama",
    "Nyakariba",
    "Nyarubande",
    "Rusagara",
    "Rutare",
    "Ruzinge",
    "Shitwe",
  ],
  "Bugesera|Ngeruka|Murama": [
    "Agashyamba",
    "Bishenyi",
    "Fatinkanda",
    "Gakurazo",
    "Gatanga",
    "Ikoni",
    "Kagege",
    "Kankuriyingoma",
    "Kigandu",
    "Kinamba",
    "Murama",
    "Muyange",
    "Nyakagarama",
    "Rusamaza",
    "Rwabisheshe",
    "Shami",
  ],
  "Bugesera|Ngeruka|Ngeruka": [
    "Binyonzwe",
    "Kamajeri",
    "Kamasonga",
    "Karugondo",
    "Kivugiza",
    "Muyange",
    "Ngeruka",
  ],
  "Bugesera|Ngeruka|Nyakayenzi": [
    "Heru",
    "Kabuye",
    "Karama",
    "Kavumu",
    "Kibaya",
    "Kibungo",
    "Kimiduha",
    "Murambi",
    "Nyakayenzi",
    "Twimpara",
  ],
  "Bugesera|Ngeruka|Rutonde": [
    "Akajuri",
    "Kabare",
    "Kabumbwe",
    "Kagano",
    "Kamugera",
    "Kamugore",
    "Kigarama",
    "Rubirizi",
    "Rugazi",
    "Runyonza",
    "Rusibya",
  ],

  // Ntarama Sector
  "Bugesera|Ntarama|Cyugaro": [
    "Gatoro",
    "Kayenzi",
    "Kidudu",
    "Kingabo",
    "Rubomborana",
    "Rugarama",
    "Rugunga",
  ],
  "Bugesera|Ntarama|Kanzenze": [
    "Cyeru",
    "Gasagara",
    "Kabaha",
    "Kabeza",
    "Karumuna",
    "Kurugenge",
    "Nyamabuye",
    "Rwangara",
  ],
  "Bugesera|Ntarama|Kibungo": [
    "Kagoma I",
    "Kagoma II",
    "Kiganwa",
    "Nganwa",
    "Nyarunazi",
    "Ruhengeri",
    "Rusekera",
  ],
  // Nyamata Sector
  "Bugesera|Nyamata|Kanazi": [
    "Bihari",
    "Cyeru",
    "Gitovu",
    "Kagirazina",
    "Musagara",
    "Nyarugati I",
    "Nyarugati II",
    "Rugando",
    "Sumbure",
  ],
  "Bugesera|Nyamata|Kayumba": [
    "Gatare",
    "Karambi",
    "Kayenzi",
    "Murambi",
    "Nyagatovu",
    "Nyakwibereka",
    "Nyiramatuntu",
    "Rwanza",
  ],
  "Bugesera|Nyamata|Maranyundo": [
    "Gahembe",
    "Gisunzu",
    "Mukoma",
    "Muyange",
    "Rugarama",
    "Rusagara",
  ],
  "Bugesera|Nyamata|Murama": [
    "Bishweshwe",
    "Gataraga",
    "Gatare",
    "Kasebigege",
    "Kivugiza",
    "Kiyogoma",
    "Mwesa",
    "Rucucu",
    "Ruhanga",
    "Rutobotobo",
    "Rutukura",
  ],
  "Bugesera|Nyamata|Nyamata y'Umujyi": [
    "Gasenga I",
    "Gasenga II",
    "Gatare I",
    "Gatare II",
    "Gatare III",
    "Nyabivumu",
    "Nyamata I",
    "Nyamata II",
    "Rugarama I",
    "Rugarama II",
    "Rugarama III",
    "Rwakibirizi I",
    "Rwakibirizi II",
  ],

  // Nyarugenge Sector (Bugesera)
  "Bugesera|Nyarugenge|Gihinga": [
    "Mabanga",
    "Mwoshya",
    "Ntungamo",
    "Nyabuhoro",
    "Nyagasozi",
    "Nyarubande",
    "Rwabusoro",
  ],
  "Bugesera|Nyarugenge|Kabuye": [
    "Cyahafi",
    "Gateko",
    "Gatoki",
    "Karubagazi",
    "Nyakabingo",
    "Nyakabuye",
    "Nyarusambu",
  ],
  "Bugesera|Nyarugenge|Murambi": [
    "Cundaminega",
    "Cyeru",
    "Kadogori",
    "Kanombe",
    "Kayitanga",
    "Nyagakombe",
    "Rugandara",
    "Rurama",
    "Rushorezo",
  ],
  "Bugesera|Nyarugenge|Ngenda": [
    "Bushonyi",
    "Kamabare",
    "Kamugera",
    "Kiyovu",
    "Muyange",
    "Nyagisenyi",
    "Rubona",
    "Rugasa",
    "Rwashangwe",
    "Tubumba",
  ],
  "Bugesera|Nyarugenge|Rugando": [
    "Bushenyi",
    "Gako",
    "Kamahirwe",
    "Nsoro",
    "Rebero",
    "Rugero",
  ],

  // Rilima Sector
  "Bugesera|Rilima|Kabeza": [
    "Bidenge",
    "Biraro",
    "Bwiza",
    "Gako",
    "Gasarwe",
    "Gasave",
    "Gitega",
    "Kabeza",
    "Kagarama",
    "Karambi",
    "Karambo",
    "Karirisi",
    "Marembo",
    "Nyamisagara",
  ],
  "Bugesera|Rilima|Karera": [
    "Gakurazo",
    "Gatare",
    "Kamahoro",
    "Mutarama",
    "Ruyenzi",
    "Rwankomati",
    "Rwavuningoma",
    "Rwimirama",
  ],
  "Bugesera|Rilima|Kimaranzara": [
    "Akintwari",
    "Akumunezero",
    "Amizero",
    "Buhoro",
    "Byimana",
    "Gasabo",
    "Gihushi",
    "Akabahaya",
    "Kidogo",
    "Kimaranzara",
    "Kivumu",
  ],
  "Bugesera|Rilima|Ntarama": [
    "Akabeza",
    "Gasave",
    "Gaseke",
    "Gasenyi",
    "Gitovu",
    "Kagugu",
    "Kamashya",
    "Kavumu",
    "Ntarama",
    "Nyamure",
    "Rurambo",
    "Saruduha",
  ],
  "Bugesera|Rilima|Nyabagendwa": [
    "Cyoma",
    "Gicaca",
    "Kamabuye",
    "Karama",
    "Mataba",
    "Mubuga",
    "Mukoma",
    "Murambi",
    "Nyabagendwa",
    "Nyamizi",
    "Rwibikara",
  ],

  // Ruhuha Sector
  "Bugesera|Ruhuha|Bihari": [
    "Bihari",
    "Busasamana",
    "Masenga I",
    "Masenga II",
    "Mukoma",
    "Nyagafunzo",
    "Rugarama",
    "Rwanzunga",
  ],
  "Bugesera|Ruhuha|Gatanga": [
    "Butereri",
    "Kayigi",
    "Kibaza",
    "Nyaburiba",
    "Nyakagarama",
    "Rwanika",
  ],
  "Bugesera|Ruhuha|Gikundamvura": [
    "Gikundamvura",
    "Kanombe",
    "Kazabagarura",
    "Kiyovu",
    "Rukurazo",
    "Rusenyi",
  ],
  "Bugesera|Ruhuha|Kindama": [
    "Gatare",
    "Gatovu",
    "Kagasera",
    "Kamweru",
    "Kibaza",
    "Kindama",
    "Rebero",
    "Ruramba",
    "Rutare",
    "Saruduha",
  ],
  "Bugesera|Ruhuha|Ruhuha": [
    "Kimikamba",
    "Mubano",
    "Nyabaranga",
    "Ruhuha I",
    "Ruhuha II",
  ],

  // Rweru Sector
  "Bugesera|Rweru|Batima": [
    "Agahonnyo",
    "Batima",
    "Gasororo",
    "Gikoma",
    "Ihara",
    "Kamudusi",
    "Mbuganzeri",
    "Rubira",
    "Ruhehe",
    "Twinyange",
  ],
  "Bugesera|Rweru|Kintambwe": [
    "Gakindo",
    "Gasenyi",
    "Maburane",
    "Mugina",
    "Nyiragiseke",
    "Nyirakanemba",
    "Nyirarubomboza",
    "Nzangwa",
    "Ubukoroco",
  ],
  "Bugesera|Rweru|Mazane": ["Gasasa", "Rukira", "Rusenyi"],
  "Bugesera|Rweru|Nemba": [
    "Kigina",
    "Kimpara",
    "Kimvubu",
    "Muyoboro",
    "Nemba",
    "Nyakabingo",
    "Rutete",
    "Rwibinyogote",
    "Rwiminazi",
  ],
  "Bugesera|Rweru|Nkanga": [
    "Agashoro",
    "Kivusha",
    "Mujwiri",
    "Mushyoroti",
    "Nkanga",
    "Ruzo",
  ],
  "Bugesera|Rweru|Sharita": ["Karizinge", "Sharita"],

  // Shyara Sector
  "Bugesera|Shyara|Kabagugu": ["Kabagugu", "Kinteko", "Ngaruye", "Rwamanyoni"],
  "Bugesera|Shyara|Kamabuye": ["Gakoni", "Nyabaguma", "Rubwirwa"],
  "Bugesera|Shyara|Nziranziza": ["Gahosha", "Kagarama", "Nziranziza", "Ruli"],
};

// ============================================================
// HELPER FUNCTIONS FOR LOCATION DATA
// ============================================================

const getVillagesForCell = (cell: string): string[] => {
  const allVillageKeys = Object.keys(ALL_VILLAGES);
  const matchedVillages: string[] = [];

  for (const key of allVillageKeys) {
    const parts = key.split("|");
    if (parts.length >= 3 && parts[2] === cell) {
      matchedVillages.push(...ALL_VILLAGES[key]);
    }
  }
  return matchedVillages.length > 0 ? matchedVillages : [];
};

const getCellsForSector = (sector: string): string[] => {
  return ALL_CELLS[sector] || [];
};

const getSectorsForDistrict = (district: string): string[] => {
  return ALL_SECTORS[district] || [];
};

// ============================================================
// TRANSLATIONS
// ============================================================

const getTranslations = (lang: string) => {
  const translations: Record<string, any> = {
    en: {
      popularHomes: "Student Houses Available",
      room: "Room",
      apartment: "Apartment",
      months: "months",
      where: "Location",
      searchDestinations: "Search universities or locations in Rwanda",
      search: "Search",
      favorites: "Saved",
      removeFavorite: "Remove from saved",
      addFavorite: "Add to saved",
      searchProperties: "Search houses...",
      noResults: "No houses found matching your criteria.",
      price: "Price",
      perMonth: "/ month",
      amenities: "Amenities",
      university: "University",
      district: "District",
      sector: "Sector",
      cell: "Cell",
      village: "Village",
      rooms: "Rooms",
      bathrooms: "Bathrooms",
      viewDetails: "View Details",
      owner: "Owner",
      contact: "Contact",
      bookingStatus: "Status",
      statusAvailable: "Available",
      statusBooked: "Booked",
      statusPending: "Pending",
      province: "Province",
      minutesFromCampus: "Minutes from Campus",
      features: "Features",
      yearBuilt: "Year Built",
      priceRWF: "Price in RWF",
      advancedSearch: "Advanced Search",
      filters: "Filters",
      orderNow: "Order Now",
      login: "Log in",
      signup: "Sign up",
      selectLocation: "Select Location",
      guests: "Students",
      apply: "Apply",
      clear: "Clear",
      prev: "Previous",
      next: "Next",
      resetFilters: "Reset Filters",
      selectSector: "Select Sector",
      selectCell: "Select Cell",
      selectVillage: "Select Village",
      sectorLabel: "Sector",
      cellLabel2: "Cell",
      villageLabel2: "Village",
      searchByUniversity: "Search by University",
      allDistricts: "All Districts",
      allSectors: "All Sectors",
      allCells: "All Cells",
      allVillages: "All Villages",
      selectDistrict: "Select District",
      clickToSelect: "Click to select",
      monthlyRent: "Monthly Rent",
      serviceFee: "Service Fee",
      totalAmount: "Total Amount to Pay",
      paymentInfo: "Payment Information",
      momoPaymentInstructions: "Please pay using the USSD code below:",
      momoCode: "*182*8*1*6377827*",
      uploadPaymentProof: "Upload your payment confirmation screenshot",
      chooseFile: "Choose File",
      confirmBooking: "Confirm Booking",
      submitting: "Submitting...",
      bookingSuccess: "Booking confirmed successfully!",
      bookingFailed: "Failed to confirm booking",
      pleaseFillAllFields: "Please fill in all required fields",
      personalInfo: "Personal Information",
      payment: "Payment",
      fullName: "Full Name",
      idNumber: "ID Number",
      studentId: "Student ID",
      purpose: "Purpose of Stay",
      specialRequests: "Special Requests",
      paymentMethod: "Payment Method",
      momo: "MOMO",
      momoNumber: "MOMO Number",
      uploadScreenshot: "Upload Payment Screenshot",
      required: "This field is required",
      invalidEmail: "Please enter a valid email",
      invalidPhone: "Please enter a valid phone number",
      email: "Email",
      phoneNumber: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      loginSuccess: "Login successful!",
      loginFailed: "Login failed. Please try again.",
      registerSuccess: "Registration successful!",
      registerFailed: "Registration failed. Please try again.",
      welcomeBack: "Welcome back",
      accountCreated: "Account created! Welcome",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      tryAgain: "Try Again",
      done: "Done",
      previous: "Previous",
      bookThisHouse: "Book This House",
      propertyType: "Property Type",
      location: "in",
      from: "from",
      perMonthShort: "/month",
      loginRequired: "Login Required",
      loginToOrder: "Please login to order this house",
      loginNow: "Login",
      registerNow: "Register",
      or: "or",
      houseDetails: "House Details",
      priceInRWF: "Price in RWF",
      code: "Village Code",
      priceCategories: "Price Categories",
      categoryLow: "Low (0 - 80,000 RWF)",
      categoryMedium: "Medium (80,001 - 130,000 RWF)",
      categoryHigh: "High (130,001+ RWF)",
      allHouses: "All Houses",
      students: "Students",
      dialNow: "Dial Now",
      ussdCode: "USSD Code",
      paymentComplete: "Payment Complete",
      viewOnDashboard: "View on Dashboard",
      paymentApproval: "Payment Approval",
      paymentPending:
        "Your payment is being processed. You'll be notified once approved.",
      viewDashboard: "Go to Dashboard",
      landlordInfo: "Landlord Information",
      landlordName: "Landlord Name",
      landlordPhone: "Landlord Phone",
      landlordEmail: "Landlord Email",
      paymentAmount: "Payment Amount",
      successTitle: "Payment Submitted Successfully!",
      successMessage:
        "Your payment has been recorded. Our team will verify it and you'll be notified.",
      bookingDetails: "Booking Details",
      checkIn: "Check-in Date",
      checkOut: "Check-out Date",
      payWithMomo: "Pay with MOMO",
      passwordWeak: "Weak",
      passwordModerate: "Moderate",
      passwordStrong: "Strong",
      close: "Close",
      cancel: "Cancel",
      loading: "Loading houses...",
      description: "Description",
      hostInfo: "Host Information",
      responseTime: "Response Time",
      viewFullImage: "View Full Image",
    },
    fr: {
      popularHomes: "Maisons étudiantes disponibles",
      room: "Chambre",
      apartment: "Appartement",
      months: "mois",
      where: "Emplacement",
      searchDestinations: "Rechercher des universités ou lieux au Rwanda",
      search: "Rechercher",
      favorites: "Favoris",
      removeFavorite: "Retirer des favoris",
      addFavorite: "Ajouter aux favoris",
      searchProperties: "Rechercher des maisons...",
      noResults: "Aucune maison trouvée correspondant à vos critères.",
      price: "Prix",
      perMonth: "/ mois",
      amenities: "Équipements",
      university: "Université",
      district: "District",
      sector: "Secteur",
      cell: "Cellule",
      village: "Village",
      rooms: "Chambres",
      bathrooms: "Salles de bain",
      viewDetails: "Voir les détails",
      owner: "Propriétaire",
      contact: "Contact",
      bookingStatus: "Statut",
      statusAvailable: "Disponible",
      statusBooked: "Réservé",
      statusPending: "En attente",
      province: "Province",
      minutesFromCampus: "Minutes du campus",
      features: "Caractéristiques",
      yearBuilt: "Année de construction",
      priceRWF: "Prix en RWF",
      advancedSearch: "Recherche avancée",
      filters: "Filtres",
      orderNow: "Commander maintenant",
      login: "Se connecter",
      signup: "S'inscrire",
      selectLocation: "Choisir un emplacement",
      guests: "Étudiants",
      apply: "Appliquer",
      clear: "Effacer",
      prev: "Précédent",
      next: "Suivant",
      resetFilters: "Réinitialiser les filtres",
      selectSector: "Sélectionner le Secteur",
      selectCell: "Sélectionner la Cellule",
      selectVillage: "Sélectionner le Village",
      sectorLabel: "Secteur",
      cellLabel2: "Cellule",
      villageLabel2: "Village",
      searchByUniversity: "Rechercher par Université",
      allDistricts: "Tous les Districts",
      allSectors: "Tous les Secteurs",
      allCells: "Toutes les Cellules",
      allVillages: "Tous les Villages",
      selectDistrict: "Sélectionner le District",
      clickToSelect: "Cliquer pour sélectionner",
      monthlyRent: "Loyer Mensuel",
      serviceFee: "Frais de Service",
      totalAmount: "Montant Total à Payer",
      paymentInfo: "Informations de Paiement",
      momoPaymentInstructions:
        "Veuillez payer en utilisant le code USSD ci-dessous :",
      momoCode: "*182*8*1*6377827*",
      uploadPaymentProof:
        "Téléchargez votre capture de confirmation de paiement",
      chooseFile: "Choisir un Fichier",
      confirmBooking: "Confirmer la Réservation",
      submitting: "Soumission...",
      bookingSuccess: "Réservation confirmée avec succès !",
      bookingFailed: "Échec de la confirmation de la réservation",
      pleaseFillAllFields: "Veuillez remplir tous les champs requis",
      personalInfo: "Informations Personnelles",
      payment: "Paiement",
      fullName: "Nom Complet",
      idNumber: "Numéro d'Identité",
      studentId: "ID Étudiant",
      purpose: "Motif du Séjour",
      specialRequests: "Demandes Spéciales",
      paymentMethod: "Méthode de Paiement",
      momo: "MOMO",
      momoNumber: "Numéro MOMO",
      uploadScreenshot: "Télécharger la Capture de Paiement",
      required: "Ce champ est requis",
      invalidEmail: "Veuillez entrer un email valide",
      invalidPhone: "Veuillez entrer un numéro de téléphone valide",
      email: "E-mail",
      phoneNumber: "Téléphone",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      loginSuccess: "Connexion réussie !",
      loginFailed: "Échec de la connexion. Veuillez réessayer.",
      registerSuccess: "Inscription réussie !",
      registerFailed: "Échec de l'inscription. Veuillez réessayer.",
      welcomeBack: "Bon retour",
      accountCreated: "Compte créé ! Bienvenue",
      alreadyHaveAccount: "Vous avez déjà un compte ?",
      dontHaveAccount: "Vous n'avez pas de compte ?",
      tryAgain: "Réessayer",
      done: "Terminé",
      previous: "Précédent",
      bookThisHouse: "Réserver Cette Maison",
      propertyType: "Type de propriété",
      location: "à",
      from: "à partir de",
      perMonthShort: "/mois",
      loginRequired: "Connexion requise",
      loginToOrder: "Veuillez vous connecter pour commander cette maison",
      loginNow: "Se connecter",
      registerNow: "S'inscrire",
      or: "ou",
      houseDetails: "Détails de la maison",
      priceInRWF: "Prix en RWF",
      code: "Code du village",
      priceCategories: "Catégories de Prix",
      categoryLow: "Bas (0 - 80,000 RWF)",
      categoryMedium: "Moyen (80,001 - 130,000 RWF)",
      categoryHigh: "Élevé (130,001+ RWF)",
      allHouses: "Toutes les Maisons",
      students: "Étudiants",
      dialNow: "Composer Maintenant",
      ussdCode: "Code USSD",
      paymentComplete: "Paiement Terminé",
      viewOnDashboard: "Voir sur le Tableau de Bord",
      paymentApproval: "Approbation du Paiement",
      paymentPending:
        "Votre paiement est en cours de traitement. Vous serez notifié une fois approuvé.",
      viewDashboard: "Aller au Tableau de Bord",
      landlordInfo: "Informations du Propriétaire",
      landlordName: "Nom du Propriétaire",
      landlordPhone: "Téléphone du Propriétaire",
      landlordEmail: "Email du Propriétaire",
      paymentAmount: "Montant du Paiement",
      successTitle: "Paiement Soumis avec Succès !",
      successMessage:
        "Votre paiement a été enregistré. Notre équipe le vérifiera et vous serez notifié.",
      bookingDetails: "Détails de la Réservation",
      checkIn: "Date d'arrivée",
      checkOut: "Date de départ",
      payWithMomo: "Payer avec MOMO",
      passwordWeak: "Faible",
      passwordModerate: "Modéré",
      passwordStrong: "Fort",
      close: "Fermer",
      cancel: "Annuler",
      loading: "Chargement des maisons...",
      description: "Description",
      hostInfo: "Informations sur l'Hôte",
      responseTime: "Temps de réponse",
      viewFullImage: "Voir l'image en plein écran",
    },
    rw: {
      popularHomes: "Amazu y'abanyeshuri ariboneka",
      room: "Icyumba",
      apartment: "Aparitama",
      months: "amezi",
      where: "Aho gihe",
      searchDestinations: "Shakisha kaminuza cyangwa aho gihe mu Rwanda",
      search: "Shakisha",
      favorites: "Ibyakiriwe",
      removeFavorite: "Kuraho kubyakiriwe",
      addFavorite: "Ongeraho kubyakiriwe",
      searchProperties: "Shakisha amazu...",
      noResults: "Nta mazu yabonetse.",
      price: "Igiciro",
      perMonth: "/ ukwezi",
      amenities: "Ibikoresho",
      university: "Kaminuza",
      district: "Akarere",
      sector: "Umurenge",
      cell: "Akagari",
      village: "Umudugudu",
      rooms: "Ibyumba",
      bathrooms: "Ahabagirirwa",
      viewDetails: "Reba ibindi",
      owner: "Nyiri nzu",
      contact: "Numero",
      bookingStatus: "Ihagaze",
      statusAvailable: "Irahari",
      statusBooked: "Yakozweho icyemezo",
      statusPending: "Irateganijwe",
      province: "Intara",
      minutesFromCampus: "Iminota uva kuri kaminuza",
      features: "Ibiranga",
      yearBuilt: "Umwaka wubatswe",
      priceRWF: "Igiciro mu Rwanda",
      advancedSearch: "Ubushakashatsi buhanitse",
      filters: "Imyunyu",
      orderNow: "Tegura Nono",
      login: "Kwinjira",
      signup: "Kwiyandikisha",
      selectLocation: "Hitamo aho gihe",
      guests: "Abanyeshuri",
      apply: "Kora",
      clear: "Kuraho",
      prev: "Ibibanziriza",
      next: "Ibikurikira",
      resetFilters: "Kuraho iyo myunyu",
      selectSector: "Hitamo Umurenge",
      selectCell: "Hitamo Akagari",
      selectVillage: "Hitamo Umudugudu",
      sectorLabel: "Umurenge",
      cellLabel2: "Akagari",
      villageLabel2: "Umudugudu",
      searchByUniversity: "Shakisha ukurikije Kaminuza",
      allDistricts: "Uturere Twose",
      allSectors: "Imirenge Yose",
      allCells: "Utugari Twose",
      allVillages: "Imidugudu Yose",
      selectDistrict: "Hitamo Akarere",
      clickToSelect: "Kanda kugirango uhitemo",
      monthlyRent: "Igiciro cy'Ukwezi",
      serviceFee: "Amahera ya Serivisi",
      totalAmount: "Igiciro Cyose",
      paymentInfo: "Amakuru y'Ubwishyu",
      momoPaymentInstructions: "Kwishyura ukoresheje kode ya USSD ikurikira:",
      momoCode: "*182*8*1*6377827*",
      uploadPaymentProof: "Ongeraho ishusho y'ubwishyu",
      chooseFile: "Hitamo Dosive",
      confirmBooking: "Emeza Booking",
      submitting: "Biremereza...",
      bookingSuccess: "Booking yemejwe neza!",
      bookingFailed: "Kurema booking birananiranye",
      pleaseFillAllFields: "Uzuzuze amakuru yose asabwa",
      personalInfo: "Amakuru yawe",
      payment: "Ubwishyu",
      fullName: "Izina Ryose",
      idNumber: "Nomero y'Indangamuntu",
      studentId: "ID y'Umunyeshuri",
      purpose: "Impamvu yo Gutura",
      specialRequests: "Ibisabwa Bidasanzwe",
      paymentMethod: "Uburyo bwo Kwishyura",
      momo: "MOMO",
      momoNumber: "Nomero ya MOMO",
      uploadScreenshot: "Ongeraho Ishusho y'Ubwishyu",
      required: "Iri soma rirakenewe",
      invalidEmail: "Injiza imeri ikwiye",
      invalidPhone: "Injiza numero ya telefoni ikwiye",
      email: "Imeli",
      phoneNumber: "Telefone",
      password: "Ijambo ryibanga",
      confirmPassword: "Emeza ijambo ryibanga",
      loginSuccess: "Kwinjira byakunze!",
      loginFailed: "Kwinjira byananiranye. Ongera ugerageze.",
      registerSuccess: "Kwiyandikisha byakunze!",
      registerFailed: "Kwiyandikisha byananiranye. Ongera ugerageze.",
      welcomeBack: "Murakaza neza",
      accountCreated: "Konti yashizweho! Murakaza neza",
      alreadyHaveAccount: "Ufite konti?",
      dontHaveAccount: "Nta konti ufite?",
      tryAgain: "Ongera ugerageze",
      done: "Byakozwe",
      previous: "Ibibanziriza",
      bookThisHouse: "Tegura Iyi Nzu",
      propertyType: "Ubwoko bw'azu",
      location: "i",
      from: "kuva",
      perMonthShort: "/ukwezi",
      loginRequired: "Kwinjira birakenewe",
      loginToOrder: "Nyamuneka winjire mbere yo gutegura iyi nzu",
      loginNow: "Kwinjira",
      registerNow: "Iyandikisha",
      or: "cyangwa",
      houseDetails: "Ibisobanuro by'azu",
      priceInRWF: "Igiciro mu Rwanda",
      code: "Kode y'umudugudu",
      priceCategories: "Ibikorwa by'Igiciro",
      categoryLow: "Hasi (0 - 80,000 RWF)",
      categoryMedium: "Hagati (80,001 - 130,000 RWF)",
      categoryHigh: "Hejuru (130,001+ RWF)",
      allHouses: "Amazu Yose",
      students: "Abanyeshuri",
      dialNow: "Kanda Nono",
      ussdCode: "Kode ya USSD",
      paymentComplete: "Ubwishyu Burangiye",
      viewOnDashboard: "Reba kuri Dashboard",
      paymentApproval: "Kwemeza Ubwishyu",
      paymentPending:
        "Ubwishyu bwawe burimo gutunganywa. Uzamenyeshwa iyo bwemejwe.",
      viewDashboard: "Jya kuri Dashboard",
      landlordInfo: "Amakuru y'Umutambyi",
      landlordName: "Izina ry'Umutambyi",
      landlordPhone: "Numero y'Umutambyi",
      landlordEmail: "Imeri y'Umutambyi",
      paymentAmount: "Igiciro cy'Ubwishyu",
      successTitle: "Ubwishyu Bwoherejwe Neza!",
      successMessage:
        "Ubwishyu bwawe bwabonetse. Itsinda ryacu rizaribona kandi uzamenyeshwa.",
      bookingDetails: "Amakuru ya Booking",
      checkIn: "Itariki yo Kwinjira",
      checkOut: "Itariki yo Gusohoka",
      payWithMomo: "Kwishyura na MOMO",
      passwordWeak: "Icyatsi",
      passwordModerate: "Hagati",
      passwordStrong: "Gikomeye",
      close: "Funga",
      cancel: "Hagarika",
      loading: "Amazu arakoreshwa...",
      description: "Ibisobanuro",
      hostInfo: "Amakuru y'Umutambyi",
      responseTime: "Igihe cyo Gusubiza",
      viewFullImage: "Reba Ishusho Yose",
    },
  };
  return translations[lang as keyof typeof translations] || translations.en;
};

// ============================================================
// API DATA TYPES
// ============================================================

interface ApiHouse {
  _id: string;
  houseId: string;
  name: string;
  description: string;
  images: Array<{
    public_id: string;
    url: string;
    secure_url: string;
    _id: string;
  }>;
  location: {
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
    coordinates: {
      lat: number | null;
      lng: number | null;
    };
  };
  university: string;
  pricePerMonth: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  status: "available" | "booked" | "pending";
  rating: number;
  totalReviews: number;
  host: {
    name: string;
    email: string;
    phone: string;
    responseRate: number;
    responseTime: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

const formatCurrency = (amount: number): string => {
  return `RWF ${amount.toLocaleString()}`;
};

const calculateServiceFee = (monthlyRent: number): number => {
  return Math.round(monthlyRent * 0.05);
};

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^(\+250|0)?[7-9][0-9]{8}$/.test(phone.replace(/\s/g, ""));
};

// ============================================================
// PRICE CATEGORIES
// ============================================================

type PriceCategory = "all" | "low" | "medium" | "high";

interface PriceCategoryOption {
  id: PriceCategory;
  label: string;
  range: string;
  icon: React.ReactNode;
  color: string;
  min: number;
  max: number;
}

const getPriceCategories = (t: any): PriceCategoryOption[] => {
  return [
    {
      id: "all",
      label: t.allHouses || "All Houses",
      range: "All",
      icon: <HomeIcon />,
      color: "from-gray-400 to-gray-500",
      min: 0,
      max: Infinity,
    },
    {
      id: "low",
      label: t.categoryLow || "Low (0 - 80,000 RWF)",
      range: "0 - 80,000 RWF",
      icon: <AttachMoneyIcon />,
      color: "from-green-400 to-emerald-500",
      min: 0,
      max: 80000,
    },
    {
      id: "medium",
      label: t.categoryMedium || "Medium (80,001 - 130,000 RWF)",
      range: "80,001 - 130,000 RWF",
      icon: <AttachMoneyIcon />,
      color: "from-yellow-400 to-amber-500",
      min: 80001,
      max: 130000,
    },
    {
      id: "high",
      label: t.categoryHigh || "High (130,001+ RWF)",
      range: "130,001+ RWF",
      icon: <AttachMoneyIcon />,
      color: "from-red-400 to-rose-500",
      min: 130001,
      max: Infinity,
    },
  ];
};

// ============================================================
// BOOKING DATA INTERFACE
// ============================================================

interface BookingData {
  step1: {
    fullName: string;
    email: string;
    phone: string;
    idNumber: string;
    university: string;
    studentId: string;
    purpose: string;
  };
  step2: {
    checkIn: string;
    checkOut: string;
    months: number;
    guests: number;
    specialRequests: string;
  };
  step3: {
    paymentMethod: "momo";
    momoNumber: string;
    screenshot: File | null;
    screenshotPreview: string;
    screenshotFile: File | null;
  };
}

// ============================================================
// REUSABLE SELECTION MODAL
// ============================================================

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  title: string;
  icon: React.ReactNode;
  items: string[];
  searchPlaceholder: string;
  selectedValue: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title,
  icon,
  items,
  searchPlaceholder,
  selectedValue,
  searchQuery,
  setSearchQuery,
}) => {
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            className="fixed inset-2 sm:inset-4 z-[201] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
              <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold flex items-center gap-2">
                  {icon}
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-0.5 sm:p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                <div className="relative mb-3">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
                    autoFocus
                  />
                </div>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          onSelect(item);
                          onClose();
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                          selectedValue === item
                            ? "bg-[#FF385C]/10 border border-[#FF385C]"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {icon}
                        <span className="truncate flex-1">{item}</span>
                        {selectedValue === item && (
                          <CheckCircleIcon className="w-4 h-4 text-[#FF385C]" />
                        )}
                      </button>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm py-4">
                      No items found
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// LOGIN REGISTER MODAL (Same as Hero.tsx)
// ============================================================

interface LoginRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultMode?: "login" | "register";
}

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultMode = "login",
}) => {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isLoginEmailValid, setIsLoginEmailValid] = useState<boolean | null>(
    null,
  );
  const [isLoginPasswordValid, setIsLoginPasswordValid] = useState<
    boolean | null
  >(null);
  const [isRegisterEmailValid, setIsRegisterEmailValid] = useState<
    boolean | null
  >(null);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "moderate" | "strong" | null
  >(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<
    boolean | null
  >(null);
  const t = getTranslations(getLanguageFromCookies());

  const handleLoginEmailChange = (email: string) => {
    setLoginEmail(email);
    setIsLoginEmailValid(email.length > 0 ? validateEmail(email) : null);
    setLoginError("");
    setErrorMessage("");
  };

  const handleLoginPasswordChange = (password: string) => {
    setLoginPassword(password);
    setIsLoginPasswordValid(password.length >= 6);
    setLoginError("");
    setErrorMessage("");
  };

  const handleRegisterNameChange = (name: string) => {
    setRegisterName(name);
    setIsNameValid(name.trim().length >= 2);
    setRegisterError("");
    setErrorMessage("");
  };

  const handleRegisterEmailChange = (email: string) => {
    setRegisterEmail(email);
    setIsRegisterEmailValid(email.length > 0 ? validateEmail(email) : null);
    setRegisterError("");
    setErrorMessage("");
  };

  const handlePhoneChange = (phone: string) => {
    setRegisterPhone(phone);
    setIsPhoneValid(phone.length > 0 ? validatePhone(phone) : null);
    setRegisterError("");
    setErrorMessage("");
  };

  const checkPasswordStrength = (
    password: string,
  ): "weak" | "moderate" | "strong" | null => {
    if (!password || password.length === 0) return null;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    if (score <= 2) return "weak";
    if (score <= 4) return "moderate";
    return "strong";
  };

  const getPasswordStrengthText = (strength: string | null): string => {
    if (!strength) return "";
    const map: Record<string, string> = {
      weak: t.passwordWeak || "Weak",
      moderate: t.passwordModerate || "Moderate",
      strong: t.passwordStrong || "Strong",
    };
    return map[strength] || strength;
  };

  const getPasswordStrengthColor = (strength: string | null): string => {
    if (!strength) return "";
    const map: Record<string, string> = {
      weak: "#ef4444",
      moderate: "#f59e0b",
      strong: "#22c55e",
    };
    return map[strength] || "";
  };

  const handlePasswordChange = (password: string) => {
    setRegisterPassword(password);
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);
    setRegisterError("");
    setErrorMessage("");
    if (registerConfirmPassword.length > 0) {
      setIsConfirmPasswordValid(password === registerConfirmPassword);
    }
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setRegisterConfirmPassword(confirmPassword);
    setIsConfirmPasswordValid(
      confirmPassword.length > 0 && confirmPassword === registerPassword,
    );
    setRegisterError("");
    setErrorMessage("");
  };

  const isLoginFormValid = (): boolean => {
    return (
      loginEmail.length > 0 &&
      validateEmail(loginEmail) &&
      loginPassword.length >= 6
    );
  };

  const isRegisterFormValid = (): boolean => {
    return (
      registerName.trim().length >= 2 &&
      registerEmail.length > 0 &&
      validateEmail(registerEmail) &&
      registerPhone.length > 0 &&
      validatePhone(registerPhone) &&
      registerPassword.length >= 6 &&
      registerPassword === registerConfirmPassword &&
      registerConfirmPassword.length > 0 &&
      passwordStrength !== null &&
      passwordStrength !== "weak"
    );
  };

  const resetFormState = () => {
    setLoginEmail("");
    setLoginPassword("");
    setLoginError("");
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPhone("");
    setRegisterPassword("");
    setRegisterConfirmPassword("");
    setRegisterError("");
    setIsLoginEmailValid(null);
    setIsLoginPasswordValid(null);
    setIsRegisterEmailValid(null);
    setIsPhoneValid(null);
    setIsNameValid(null);
    setIsConfirmPasswordValid(null);
    setPasswordStrength(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSuccess(null);
    setErrorMessage("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setErrorMessage("");
    if (!loginEmail || !validateEmail(loginEmail)) {
      setLoginError(t.invalidEmail || "Please enter a valid email address");
      return;
    }
    if (!loginPassword || loginPassword.length < 6) {
      setLoginError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setLoginError("");
    try {
      const response = await API.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      if (response.data.success) {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setSuccess(true);
        toast.success(`✅ ${t.welcomeBack || "Welcome back"}, ${user.name}!`);
        onSuccess();
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setSuccess(false);
        setErrorMessage(response.data.message || "Invalid email or password");
        toast.error(`❌ ${response.data.message || "Login failed"}`);
      }
    } catch (error: any) {
      setSuccess(false);
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setErrorMessage("");
    if (!registerName || registerName.length < 2) {
      setRegisterError("Full name is required (min 2 characters)");
      return;
    }
    if (!registerEmail || !validateEmail(registerEmail)) {
      setRegisterError("Please enter a valid email address");
      return;
    }
    if (!registerPhone || !validatePhone(registerPhone)) {
      setRegisterError("Please enter a valid Rwandan phone number");
      return;
    }
    if (!registerPassword || registerPassword.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }
    if (passwordStrength === "weak") {
      setRegisterError("Please choose a stronger password");
      return;
    }
    setLoading(true);
    setRegisterError("");
    try {
      const response = await API.post("/auth/register", {
        name: registerName,
        email: registerEmail,
        phone: registerPhone,
        password: registerPassword,
      });
      if (response.data.success) {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setSuccess(true);
        toast.success(
          `✅ ${t.accountCreated || "Account created!"}, ${user.name}!`,
        );
        onSuccess();
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setSuccess(false);
        setErrorMessage(response.data.message || "Registration failed");
        toast.error(`❌ ${response.data.message || "Registration failed"}`);
      }
    } catch (error: any) {
      setSuccess(false);
      const errorMsg =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setMode("login");
    setLoginError("");
    setRegisterError("");
    setSuccess(null);
    setErrorMessage("");
  };
  const switchToRegister = () => {
    setMode("register");
    setLoginError("");
    setRegisterError("");
    setSuccess(null);
    setErrorMessage("");
  };

  useEffect(() => {
    if (!isOpen) {
      const timeoutId = window.setTimeout(resetFormState, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const renderSuccessFail = () => {
    if (success === null) return null;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl z-50 p-6"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${success ? "bg-green-100" : "bg-red-100"}`}
          >
            {success ? (
              <CheckCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
            ) : (
              <CancelIcon className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
            )}
          </motion.div>
          <h3
            className={`text-lg sm:text-xl font-bold ${success ? "text-green-600" : "text-red-600"}`}
          >
            {success
              ? mode === "login"
                ? `✅ ${t.loginSuccess || "Login Successful!"}`
                : `✅ ${t.registerSuccess || "Registration Successful!"}`
              : mode === "login"
                ? `❌ ${t.loginFailed || "Login Failed"}`
                : `❌ ${t.registerFailed || "Registration Failed"}`}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {success
              ? mode === "login"
                ? `${t.welcomeBack || "Welcome back!"} Redirecting...`
                : `${t.accountCreated || "Account created!"} Redirecting...`
              : errorMessage || "Please try again."}
          </p>
          {!success && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSuccess(null)}
              className="mt-4 px-6 py-2 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
            >
              {t.tryAgain || "Try Again"}
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 30 },
  };
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden">
              {renderSuccessFail()}
              <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                <div className="flex items-center gap-2">
                  {mode === "login" ? (
                    <LoginIcon className="text-[#FF385C] w-5 h-5" />
                  ) : (
                    <PersonAddIcon className="text-[#FF385C] w-5 h-5" />
                  )}
                  <h2 className="text-xl font-semibold text-gray-900">
                    {mode === "login" ? t.login : t.signup}
                  </h2>
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                >
                  <CloseIcon className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                  <button
                    onClick={switchToLogin}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === "login" ? "bg-white text-[#FF385C] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={switchToRegister}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === "register" ? "bg-white text-[#FF385C] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {t.signup}
                  </button>
                </div>
                {mode === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.email || "Email"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${isLoginEmailValid === true ? "border-green-500" : isLoginEmailValid === false ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <EmailIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isLoginEmailValid === true ? "text-green-500" : isLoginEmailValid === false ? "text-red-500" : "text-gray-400"}`}
                        />
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) =>
                            handleLoginEmailChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="you@example.com"
                          disabled={loading}
                          autoComplete="email"
                        />
                        {isLoginEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isLoginEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {isLoginEmailValid === false && (
                        <p className="text-xs text-red-500 mt-1">
                          {t.invalidEmail || "Please enter a valid email"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.password || "Password"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${isLoginPasswordValid === true ? "border-green-500" : isLoginPasswordValid === false ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <LockIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isLoginPasswordValid === true ? "text-green-500" : isLoginPasswordValid === false ? "text-red-500" : "text-gray-400"}`}
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={loginPassword}
                          onChange={(e) =>
                            handleLoginPasswordChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                          disabled={loading}
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon className="w-5 h-5" />
                          ) : (
                            <VisibilityIcon className="w-5 h-5" />
                          )}
                        </button>
                        {isLoginPasswordValid === true && (
                          <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isLoginPasswordValid === false &&
                          loginPassword.length > 0 && (
                            <CancelIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                          )}
                      </div>
                      {isLoginPasswordValid === false &&
                        loginPassword.length > 0 && (
                          <p className="text-xs text-red-500 mt-1">
                            Password must be at least 6 characters
                          </p>
                        )}
                    </div>
                    {loginError && (
                      <p className="text-sm text-red-500">{loginError}</p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading || !isLoginFormValid()}
                      className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${loading || !isLoginFormValid() ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF385C] hover:bg-[#E31C5F]"}`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                          Logging in...
                        </div>
                      ) : (
                        t.login || "Log in"
                      )}
                    </motion.button>
                    <p className="text-center text-sm text-gray-500">
                      {t.dontHaveAccount || "Don't have an account?"}{" "}
                      <button
                        type="button"
                        onClick={switchToRegister}
                        className="text-[#FF385C] font-medium hover:underline"
                      >
                        {t.signup || "Sign up"}
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.fullName || "Full Name"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${isNameValid === true ? "border-green-500" : isNameValid === false ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <PersonIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isNameValid === true ? "text-green-500" : isNameValid === false ? "text-red-500" : "text-gray-400"}`}
                        />
                        <input
                          type="text"
                          value={registerName}
                          onChange={(e) =>
                            handleRegisterNameChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="John Doe"
                          disabled={loading}
                          autoComplete="name"
                        />
                        {isNameValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isNameValid === false && registerName.length > 0 && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {isNameValid === false && registerName.length > 0 && (
                        <p className="text-xs text-red-500 mt-1">
                          Name must be at least 2 characters
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.email || "Email"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${isRegisterEmailValid === true ? "border-green-500" : isRegisterEmailValid === false ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <EmailIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isRegisterEmailValid === true ? "text-green-500" : isRegisterEmailValid === false ? "text-red-500" : "text-gray-400"}`}
                        />
                        <input
                          type="email"
                          value={registerEmail}
                          onChange={(e) =>
                            handleRegisterEmailChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="you@example.com"
                          disabled={loading}
                          autoComplete="email"
                        />
                        {isRegisterEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isRegisterEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {isRegisterEmailValid === false && (
                        <p className="text-xs text-red-500 mt-1">
                          {t.invalidEmail || "Please enter a valid email"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.phoneNumber || "Phone Number"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${isPhoneValid === true ? "border-green-500" : isPhoneValid === false ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <PhoneIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isPhoneValid === true ? "text-green-500" : isPhoneValid === false ? "text-red-500" : "text-gray-400"}`}
                        />
                        <input
                          type="tel"
                          value={registerPhone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="0788123456"
                          disabled={loading}
                          autoComplete="tel"
                        />
                        {isPhoneValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isPhoneValid === false && registerPhone.length > 0 && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {isPhoneValid === false && registerPhone.length > 0 && (
                        <p className="text-xs text-red-500 mt-1">
                          {t.invalidPhone ||
                            "Please enter a valid phone number"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.password || "Password"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-lg border border-gray-300 bg-white focus-within:border-[#FF385C] transition-colors">
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={registerPassword}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                          disabled={loading}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon className="w-5 h-5" />
                          ) : (
                            <VisibilityIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {passwordStrength && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width:
                                    passwordStrength === "weak"
                                      ? "33%"
                                      : passwordStrength === "moderate"
                                        ? "66%"
                                        : "100%",
                                  backgroundColor:
                                    getPasswordStrengthColor(passwordStrength),
                                }}
                                initial={{ width: 0 }}
                                animate={{
                                  width:
                                    passwordStrength === "weak"
                                      ? "33%"
                                      : passwordStrength === "moderate"
                                        ? "66%"
                                        : "100%",
                                }}
                              />
                            </div>
                            <span
                              className="text-xs font-medium"
                              style={{
                                color:
                                  getPasswordStrengthColor(passwordStrength),
                              }}
                            >
                              {getPasswordStrengthText(passwordStrength)}
                            </span>
                          </div>
                          {passwordStrength === "weak" && (
                            <p className="text-xs text-red-500 mt-1">
                              Password is too weak. Use at least 8 characters
                              with uppercase, lowercase, numbers, and special
                              characters.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.confirmPassword || "Confirm Password"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-lg border ${isConfirmPasswordValid === true ? "border-green-500" : isConfirmPasswordValid === false ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors`}
                      >
                        <LockIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isConfirmPasswordValid === true ? "text-green-500" : isConfirmPasswordValid === false ? "text-red-500" : "text-gray-400"}`}
                        />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={registerConfirmPassword}
                          onChange={(e) =>
                            handleConfirmPasswordChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                          disabled={loading}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon className="w-5 h-5" />
                          ) : (
                            <VisibilityIcon className="w-5 h-5" />
                          )}
                        </button>
                        {isConfirmPasswordValid === true && (
                          <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isConfirmPasswordValid === false &&
                          registerConfirmPassword.length > 0 && (
                            <CancelIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                          )}
                      </div>
                      {isConfirmPasswordValid === false &&
                        registerConfirmPassword.length > 0 && (
                          <p className="text-xs text-red-500 mt-1">
                            Passwords do not match
                          </p>
                        )}
                    </div>
                    {registerError && (
                      <p className="text-sm text-red-500">{registerError}</p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading || !isRegisterFormValid()}
                      className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${loading || !isRegisterFormValid() ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF385C] hover:bg-[#E31C5F]"}`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                          Creating account...
                        </div>
                      ) : (
                        t.signup || "Sign up"
                      )}
                    </motion.button>
                    <p className="text-center text-sm text-gray-500">
                      {t.alreadyHaveAccount || "Already have an account?"}{" "}
                      <button
                        type="button"
                        onClick={switchToLogin}
                        className="text-[#FF385C] font-medium hover:underline"
                      >
                        {t.login || "Log in"}
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// MAIN HouseOnRent COMPONENT
// ============================================================

interface HouseOnRentProps {
  onSearch?: (params: any) => void;
}

export const HouseOnRent: React.FC<HouseOnRentProps> = ({ onSearch }) => {
  const [language, setLanguage] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const t = getTranslations(language);

  // ===== Auth State =====
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  const [isLoginRegisterOpen, setIsLoginRegisterOpen] = useState(false);
  const [loginRegisterMode, setLoginRegisterMode] = useState<
    "login" | "register"
  >("login");

  // ===== Houses State =====
  const [houses, setHouses] = useState<ApiHouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ===== Price Categories =====
  const priceCategories = getPriceCategories(t);
  const [selectedPriceCategory, setSelectedPriceCategory] =
    useState<PriceCategory>("all");

  // ===== Search/Filter State =====
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCell, setSelectedCell] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [maxMinutesFromCampus, setMaxMinutesFromCampus] = useState<number>(30);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [sortOption, setSortOption] = useState<string>("");
  const [filteredHouses, setFilteredHouses] = useState<ApiHouse[]>([]);

  // ===== Modal States =====
  const [isUniversityModalOpen, setIsUniversityModalOpen] = useState(false);
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const [isSectorModalOpen, setIsSectorModalOpen] = useState(false);
  const [isCellModalOpen, setIsCellModalOpen] = useState(false);
  const [isVillageModalOpen, setIsVillageModalOpen] = useState(false);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedHouse, setSelectedHouse] = useState<ApiHouse | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // ===== Booking State =====
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [processingMessage, setProcessingMessage] = useState("");

  // ===== Store pending house for after login =====
  const [pendingHouse, setPendingHouse] = useState<ApiHouse | null>(null);
  // ===== Track if booking was just completed =====
  const [bookingJustCompleted, setBookingJustCompleted] = useState(false);
  // ===== Track pending booking ID for payment verification =====
  const [pendingBookingId, setPendingBookingId] = useState<string | null>(null);

  const [bookingData, setBookingData] = useState<BookingData>({
    step1: {
      fullName: "",
      email: "",
      phone: "",
      idNumber: "",
      university: "",
      studentId: "",
      purpose: "",
    },
    step2: {
      checkIn: "",
      checkOut: "",
      months: 1,
      guests: 1,
      specialRequests: "",
    },
    step3: {
      paymentMethod: "momo",
      momoNumber: "",
      screenshot: null,
      screenshotPreview: "",
      screenshotFile: null,
    },
  });

  // ============================================================
  // FETCH HOUSES FROM API - LIMITED TO 27
  // ============================================================

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await API.get("/houses?limit=27", {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.data.success) {
          let housesData = response.data.data;

          housesData = housesData.slice(0, 27);

          if (language !== "en") {
            const translatedHouses = [];

            for (const house of housesData) {
              try {
                const translatedHouse = {
                  ...house,
                  name: await translateContent(house.name, language),
                  description: await translateContent(
                    house.description,
                    language,
                  ),
                  university: await translateContent(
                    house.university,
                    language,
                  ),
                  location: {
                    ...house.location,
                    province: await translateContent(
                      house.location.province,
                      language,
                    ),
                    district: await translateContent(
                      house.location.district,
                      language,
                    ),
                    sector: await translateContent(
                      house.location.sector,
                      language,
                    ),
                    cell: await translateContent(house.location.cell, language),
                    village: await translateContent(
                      house.location.village,
                      language,
                    ),
                  },
                  amenities: await Promise.all(
                    house.amenities.map((amenity: string) =>
                      translateContent(amenity, language),
                    ),
                  ),
                  host: house.host || {
                    name: "",
                    email: "",
                    phone: "",
                    responseRate: 0,
                    responseTime: "",
                  },
                };
                translatedHouses.push(translatedHouse);
              } catch (err) {
                translatedHouses.push({
                  ...house,
                  host: house.host || {
                    name: "",
                    email: "",
                    phone: "",
                    responseRate: 0,
                    responseTime: "",
                  },
                });
              }
            }
            housesData = translatedHouses;
          } else {
            housesData = housesData.map((house: ApiHouse) => ({
              ...house,
              host: house.host || {
                name: "",
                email: "",
                phone: "",
                responseRate: 0,
                responseTime: "",
              },
            }));
          }

          setHouses(housesData);
          setFilteredHouses(housesData);
        } else {
          setError("Failed to fetch houses");
          toast.error("Failed to load houses. Please try again.");
        }
      } catch (err) {
        setError("Failed to load houses. Please check your connection.");
        toast.error("Failed to load houses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, [language]);

  // ===== Booking Validation =====
  const isBookingStep1Valid = (): boolean => {
    const { fullName, email, phone } = bookingData.step1;
    return (
      fullName.trim().length >= 2 &&
      validateEmail(email) &&
      validatePhone(phone)
    );
  };

  const isBookingStep2Valid = (): boolean => {
    const { checkIn, checkOut, months, guests } = bookingData.step2;
    return (
      checkIn.length > 0 && checkOut.length > 0 && months > 0 && guests > 0
    );
  };

  const isBookingStep3Valid = (): boolean => {
    const { momoNumber, screenshotPreview } = bookingData.step3;
    return validatePhone(momoNumber) && screenshotPreview.length > 0;
  };

  // ===== Check login status =====
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ===== Listen for language changes =====
  useEffect(() => {
    const handleCookieChange = () => {
      const newLang = getLanguageFromCookies();
      if (newLang !== language) {
        setLanguage(newLang);
      }
    };
    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [language]);

  // ============================================================
  // UPDATE HOUSE STATUS TO BOOKED - OPTIMIZED WITH TIMEOUT
  // ============================================================
  const updateHouseStatusToBooked = async (
    houseId: string,
  ): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await API.put(
        `/houses/${houseId}/status`,
        {
          status: "booked",
        },
        {
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (response.data.success) {
        setHouses((prevHouses) =>
          prevHouses.map((h) =>
            h._id === houseId ? { ...h, status: "booked" } : h,
          ),
        );

        setFilteredHouses((prevHouses) =>
          prevHouses.map((h) =>
            h._id === houseId ? { ...h, status: "booked" } : h,
          ),
        );

        if (selectedHouse?._id === houseId) {
          setSelectedHouse((prev) =>
            prev ? { ...prev, status: "booked" } : null,
          );
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating house status:", error);
      return false;
    }
  };

  // ============================================================
  // OPTIMIZED: Only update the specific house, not all houses
  // ============================================================
  const updateSingleHouseStatus = (houseId: string, status: string) => {
    setHouses((prevHouses) =>
      prevHouses.map((h) => (h._id === houseId ? { ...h, status: status } : h)),
    );
    setFilteredHouses((prevHouses) =>
      prevHouses.map((h) => (h._id === houseId ? { ...h, status: status } : h)),
    );
    if (selectedHouse?._id === houseId) {
      setSelectedHouse((prev) =>
        prev ? { ...prev, status: status as any } : null,
      );
    }
  };

  // ============================================================
  // POLL PAYMENT STATUS - WITH OPTIMIZED POLLING
  // ============================================================
  useEffect(() => {
    if (!pendingBookingId || !selectedHouse?._id) return;

    let pollInterval: NodeJS.Timeout;
    let attempts = 0;
    const maxAttempts = 12;

    const checkPaymentStatus = async () => {
      try {
        attempts++;

        const response = await API.get(
          `/bookings/${pendingBookingId}/payment-status`,
        );

        if (response.data.success) {
          const { isVerified } = response.data.data;

          if (isVerified) {
            toast.success("✅ Payment verified successfully!");
            clearInterval(pollInterval);
            setPendingBookingId(null);
            setBookingJustCompleted(false);
            setIsProcessingModalOpen(false);
            setIsSuccessModalOpen(true);
          }

          if (attempts >= maxAttempts) {
            clearInterval(pollInterval);
            setPendingBookingId(null);
            setIsProcessingModalOpen(false);
            toast.warning(
              "Payment verification is taking longer. Your booking is confirmed.",
            );
            setIsSuccessModalOpen(true);
          }
        }
      } catch (error) {
        // Silent fail
      }
    };

    pollInterval = setInterval(checkPaymentStatus, 5000);
    checkPaymentStatus();

    return () => {
      clearInterval(pollInterval);
    };
  }, [pendingBookingId, selectedHouse?._id]);

  // ===== Filter houses =====
  useEffect(() => {
    let filtered = [...houses];

    if (selectedPriceCategory !== "all") {
      const category = priceCategories.find(
        (c) => c.id === selectedPriceCategory,
      );
      if (category) {
        filtered = filtered.filter(
          (h) =>
            h.pricePerMonth >= category.min && h.pricePerMonth <= category.max,
        );
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(query) ||
          h.description?.toLowerCase().includes(query) ||
          h.university.toLowerCase().includes(query) ||
          h.location.district.toLowerCase().includes(query) ||
          h.location.sector.toLowerCase().includes(query) ||
          h.location.cell.toLowerCase().includes(query) ||
          h.location.village.toLowerCase().includes(query) ||
          h.location.province.toLowerCase().includes(query) ||
          h.houseId?.includes(query),
      );
    }

    if (selectedUniversity) {
      filtered = filtered.filter((h) => h.university === selectedUniversity);
    }

    if (selectedDistrict) {
      filtered = filtered.filter(
        (h) => h.location.district === selectedDistrict,
      );
    }

    if (selectedSector) {
      filtered = filtered.filter((h) => h.location.sector === selectedSector);
    }

    if (selectedCell) {
      filtered = filtered.filter((h) => h.location.cell === selectedCell);
    }

    if (selectedVillage) {
      filtered = filtered.filter((h) => h.location.village === selectedVillage);
    }

    if (minPrice > 0) {
      filtered = filtered.filter((h) => h.pricePerMonth >= minPrice);
    }
    if (maxPrice < 200000) {
      filtered = filtered.filter((h) => h.pricePerMonth <= maxPrice);
    }

    if (sortOption === "priceLowHigh") {
      filtered.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
    } else if (sortOption === "priceHighLow") {
      filtered.sort((a, b) => b.pricePerMonth - a.pricePerMonth);
    } else if (sortOption === "ratingHighLow") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredHouses(filtered.slice(0, 27));
  }, [
    selectedPriceCategory,
    priceCategories,
    houses,
    searchQuery,
    selectedUniversity,
    selectedDistrict,
    selectedSector,
    selectedCell,
    selectedVillage,
    maxMinutesFromCampus,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  // ===== Reset to page 1 when filters change =====
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPriceCategory,
    searchQuery,
    selectedUniversity,
    selectedDistrict,
    selectedSector,
    selectedCell,
    selectedVillage,
    maxMinutesFromCampus,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  // ===== Save favorites =====
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ===== Body scroll lock =====
  useEffect(() => {
    const isAnyModalOpen =
      isPropertyModalOpen ||
      isImageModalOpen ||
      isBookingModalOpen ||
      isLoginRegisterOpen ||
      isUniversityModalOpen ||
      isDistrictModalOpen ||
      isSectorModalOpen ||
      isCellModalOpen ||
      isVillageModalOpen ||
      isSuccessModalOpen ||
      isProcessingModalOpen;

    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    isPropertyModalOpen,
    isImageModalOpen,
    isBookingModalOpen,
    isLoginRegisterOpen,
    isUniversityModalOpen,
    isDistrictModalOpen,
    isSectorModalOpen,
    isCellModalOpen,
    isVillageModalOpen,
    isSuccessModalOpen,
    isProcessingModalOpen,
  ]);

  // ===== Booking Handlers =====
  const handleStep1Change = (field: string, value: string) => {
    setBookingData({
      ...bookingData,
      step1: { ...bookingData.step1, [field]: value },
    });
  };

  const handleStep2Change = (field: string, value: any) => {
    setBookingData({
      ...bookingData,
      step2: { ...bookingData.step2, [field]: value },
    });
  };

  const handleStep3Change = (field: string, value: any) => {
    setBookingData({
      ...bookingData,
      step3: { ...bookingData.step3, [field]: value },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result as string;
      setBookingData({
        ...bookingData,
        step3: {
          ...bookingData.step3,
          screenshot: file,
          screenshotFile: file,
          screenshotPreview: preview,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const nextStep = () => {
    if (currentStep === 1 && !isBookingStep1Valid()) {
      toast.warning(
        t.pleaseFillAllFields || "Please fill in all required fields",
      );
      return;
    }
    if (currentStep === 2 && !isBookingStep2Valid()) {
      toast.warning(
        t.pleaseFillAllFields || "Please fill in all required fields",
      );
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // ============================================================
  // UPDATED: Handle Submit Booking - Matches Booking Model
  // ============================================================
  const handleSubmitBooking = async () => {
    if (currentStep !== 3) return;

    if (!isBookingStep3Valid()) {
      toast.warning(
        t.pleaseFillAllFields || "Please fill in all required fields",
      );
      return;
    }

    setSubmitting(true);
    setBookingJustCompleted(false);

    // Show processing modal immediately
    setIsProcessingModalOpen(true);
    setProcessingMessage("📤 Submitting your booking...");

    try {
      const serviceFee = calculateServiceFee(selectedHouse?.pricePerMonth || 0);

      const formData = new FormData();

      // === Guest Information ===
      formData.append("fullName", bookingData.step1.fullName.trim());
      formData.append("email", bookingData.step1.email.trim().toLowerCase());
      formData.append("phone", bookingData.step1.phone.trim());
      formData.append("idNumber", bookingData.step1.idNumber?.trim() || "");
      formData.append("university", bookingData.step1.university?.trim() || "");
      formData.append("studentId", bookingData.step1.studentId?.trim() || "");
      formData.append("purpose", bookingData.step1.purpose?.trim() || "");

      // === House Information ===
      formData.append("houseId", selectedHouse?._id || "");
      formData.append("houseName", selectedHouse?.name || "");
      formData.append("houseType", "House");
      formData.append("district", selectedHouse?.location.district || "");
      formData.append("sector", selectedHouse?.location.sector || "");
      formData.append("cell", selectedHouse?.location.cell || "");
      formData.append("village", selectedHouse?.location.village || "");

      const hostName = selectedHouse?.host?.name || "Not specified";
      const hostPhone = selectedHouse?.host?.phone || "Not specified";
      const hostEmail = selectedHouse?.host?.email || "Not specified";

      formData.append("ownerName", hostName);
      formData.append("ownerContact", hostPhone);
      formData.append("ownerEmail", hostEmail);

      // === Booking Details ===
      formData.append("checkIn", bookingData.step2.checkIn);
      formData.append("checkOut", bookingData.step2.checkOut);
      formData.append("months", String(bookingData.step2.months));
      formData.append("guests", String(bookingData.step2.guests));
      formData.append(
        "specialRequests",
        bookingData.step2.specialRequests?.trim() || "",
      );

      // === Payment ===
      formData.append("monthlyRent", String(selectedHouse?.pricePerMonth || 0));
      formData.append("serviceFee", String(serviceFee));
      formData.append("totalAmount", String(serviceFee));
      formData.append(
        "paymentMethod",
        bookingData.step3.paymentMethod || "momo",
      );
      formData.append("momoNumber", bookingData.step3.momoNumber?.trim() || "");

      // === Payment Status (Default values) ===
      formData.append("paymentStatus", "pending");
      formData.append("status", "pending");

      // === Payment Screenshot (if uploaded) ===
      if (bookingData.step3.screenshotFile) {
        formData.append("paymentScreenshot", bookingData.step3.screenshotFile);
      }

      setProcessingMessage("⏳ Processing your booking...");

      const houseId = selectedHouse?._id;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const bookingResponse = await API.post("/bookings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      setProcessingMessage("✅ Booking confirmed! Updating house status...");

      if (houseId) {
        await updateHouseStatusToBooked(houseId);
        updateSingleHouseStatus(houseId, "booked");
      }

      if (bookingResponse.data.success) {
        const bookingId = bookingResponse.data.data._id;
        setPendingBookingId(bookingId);

        setBookingJustCompleted(true);
        setIsBookingModalOpen(false);
        setCurrentStep(1);
        resetBookingData();

        setProcessingMessage("✅ Booking successful! Verifying payment...");

        toast.success("✅ Booking confirmed! House is now booked.");
      } else {
        throw new Error(
          bookingResponse.data.message || "Failed to create booking",
        );
      }
    } catch (error: any) {
      setIsProcessingModalOpen(false);

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to confirm booking";
      toast.error(
        `❌ ${t.bookingFailed || "Failed to confirm booking"}: ${errorMsg}`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetBookingData = () => {
    setBookingData({
      step1: {
        fullName: "",
        email: "",
        phone: "",
        idNumber: "",
        university: "",
        studentId: "",
        purpose: "",
      },
      step2: {
        checkIn: "",
        checkOut: "",
        months: 1,
        guests: 1,
        specialRequests: "",
      },
      step3: {
        paymentMethod: "momo",
        momoNumber: "",
        screenshot: null,
        screenshotPreview: "",
        screenshotFile: null,
      },
    });
  };

  // ===== Handle Book Now Click =====
  const handleBookNow = (house: ApiHouse) => {
    if (house.status === "booked") {
      toast.warning("This house is already booked!");
      return;
    }

    if (isLoggedIn) {
      setSelectedHouse(house);
      setCurrentStep(1);
      resetBookingData();
      setIsBookingModalOpen(true);
    } else {
      setPendingHouse(house);
      setSelectedHouse(house);
      setIsPropertyModalOpen(false);
      setLoginRegisterMode("login");
      setIsLoginRegisterOpen(true);
    }
  };

  // ===== Handle Login Success =====
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginRegisterOpen(false);

    if (pendingHouse) {
      setTimeout(() => {
        setSelectedHouse(pendingHouse);
        setCurrentStep(1);
        resetBookingData();
        setIsBookingModalOpen(true);
        setPendingHouse(null);
      }, 300);
    }
  };

  // ===== Handle Success Modal Close =====
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);

    if (bookingJustCompleted && selectedHouse) {
      setTimeout(() => {
        setIsPropertyModalOpen(true);
        setBookingJustCompleted(false);
      }, 300);
    }
  };

  // ===== UI Handlers =====
  const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);
  const paginatedHouses = filteredHouses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = () => {
    const searchParams = {
      university: selectedUniversity,
      district: selectedDistrict,
      sector: selectedSector,
      cell: selectedCell,
      village: selectedVillage,
      maxMinutes: maxMinutesFromCampus,
      minPrice,
      maxPrice,
      sort: sortOption,
      priceCategory: selectedPriceCategory,
    };

    if (onSearch) {
      onSearch(searchParams);
    }

    toast.info(
      `🔍 ${t.search}: ${selectedUniversity || selectedDistrict || selectedSector || selectedCell || selectedVillage || "All locations in Rwanda"}`,
    );
    setIsUniversityModalOpen(false);
    setIsDistrictModalOpen(false);
    setIsSectorModalOpen(false);
    setIsCellModalOpen(false);
    setIsVillageModalOpen(false);
    setIsAdvancedSearchOpen(false);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedPriceCategory("all");
    setSelectedUniversity("");
    setSelectedDistrict("");
    setSelectedSector("");
    setSelectedCell("");
    setSelectedVillage("");
    setMaxMinutesFromCampus(30);
    setMinPrice(0);
    setMaxPrice(200000);
    setSortOption("");
    setCurrentPage(1);
    toast.info("🧹 All filters cleared");
  };

  const toggleFavorite = (houseId: string) => {
    setFavorites((prev) => {
      if (prev.includes(houseId)) {
        toast.info(`💔 ${t.removeFavorite}`);
        return prev.filter((id) => id !== houseId);
      } else {
        toast.success(`❤️ ${t.addFavorite}`);
        return [...prev, houseId];
      }
    });
  };

  const openHouseModal = (house: ApiHouse) => {
    setSelectedHouse(house);
    setCurrentImageIndex(0);
    setIsPropertyModalOpen(true);
  };

  const closeHouseModal = () => {
    setIsPropertyModalOpen(false);
    if (!bookingJustCompleted) {
      setSelectedHouse(null);
    }
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const getTranslatedType = (type: string) => {
    if (type === "Room") return t.room;
    if (type === "Apartment") return t.apartment;
    if (type === "House") return "House";
    return type;
  };

  const getLocationInfo = (house: ApiHouse) => {
    let location = `${house.location.village}, ${house.location.cell}, ${house.location.sector}, ${house.location.district} (${house.location.province})`;
    if (house.houseId) {
      location += ` • Code: ${house.houseId}`;
    }
    return location;
  };

  const getUniversityColor = (university: string) => {
    const colors: { [key: string]: string } = {
      "UR - CST (Science & Tech)": "bg-blue-100 text-blue-800",
      "UR - CBE (Business & Econ)": "bg-yellow-100 text-yellow-800",
      "UR - CMHS (Health Sciences)": "bg-red-100 text-red-800",
      "IPRC Kigali": "bg-orange-100 text-orange-800",
      "University of Kigali (UoK)": "bg-cyan-100 text-cyan-800",
      "Kigali Independent Univ. (ULK)": "bg-amber-100 text-amber-800",
      "Adventist Univ. (AUCA)": "bg-lime-100 text-lime-800",
      "Carnegie Mellon (CMU-Africa)": "bg-cyan-100 text-cyan-800",
      "African Leadership Univ. (ALU)": "bg-indigo-100 text-indigo-800",
      "JKUAT - Rwanda Campus": "bg-blue-100 text-blue-800",
      "Mount Kigali University": "bg-purple-100 text-purple-800",
      "UR - Huye Campus": "bg-purple-100 text-purple-800",
      "IPRC Huye": "bg-pink-100 text-pink-800",
      "Catholic Institute (ICK)": "bg-rose-100 text-rose-800",
      "University of Gitwe": "bg-emerald-100 text-emerald-800",
      "Catholic University of Rwanda": "bg-rose-100 text-rose-800",
      "ILPD (Law Institute)": "bg-amber-100 text-amber-800",
      "UR - CAVM (Agriculture)": "bg-green-100 text-green-800",
      "IPRC Musanze": "bg-orange-100 text-orange-800",
      "INES-Ruhengeri": "bg-blue-100 text-blue-800",
      "Univ. of Global Health Equity": "bg-sky-100 text-sky-800",
      "Univ. of Tech & Arts (UTAB)": "bg-violet-100 text-violet-800",
      "IPRC Tumba": "bg-fuchsia-100 text-fuchsia-800",
      "UR - CE (Education)": "bg-indigo-100 text-indigo-800",
      "UR - Nyagatare Campus": "bg-teal-100 text-teal-800",
      "IPRC Ngoma": "bg-rose-100 text-rose-800",
      "RICA (Conservation Agric.)": "bg-lime-100 text-lime-800",
      "Rwanda Military Academy": "bg-stone-100 text-stone-800",
      "IPRC Karongi": "bg-rose-100 text-rose-800",
      "IPRC Rusizi": "bg-teal-100 text-teal-800",
      "UTB (Tourism & Business)": "bg-slate-100 text-slate-800",
      "Kibogora Polytechnic": "bg-emerald-100 text-emerald-800",
    };
    return colors[university] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "booked":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return t.statusAvailable;
      case "booked":
        return t.statusBooked;
      case "pending":
        return t.statusPending;
      default:
        return status;
    }
  };

  // Unique values for filters
  const uniqueUniversities = [...new Set(houses.map((h) => h.university))];

  const getSectorsForDistrict = (district: string): string[] => {
    if (!district) return [];
    return ALL_SECTORS[district] || [];
  };

  const getCellsForSector = (sector: string): string[] => {
    if (!sector) return [];
    return ALL_CELLS[sector] || [];
  };

  const getVillagesForCell = (cell: string): string[] => {
    if (!cell) return [];
    return ALL_VILLAGES[cell] || [];
  };

  const getCategoryCount = (categoryId: PriceCategory) => {
    if (categoryId === "all") return houses.length;
    const category = priceCategories.find((c) => c.id === categoryId);
    if (!category) return 0;
    return houses.filter(
      (h) => h.pricePerMonth >= category.min && h.pricePerMonth <= category.max,
    ).length;
  };

  const getServiceFee = (): number => {
    return calculateServiceFee(selectedHouse?.pricePerMonth || 0);
  };

  const getUssdCode = (): string => {
    const fee = getServiceFee();
    return `*182*8*1*6377827*${fee}#`;
  };

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 30 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full mb-4 rounded-2xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">{t.loading || "Loading houses..."}</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full mb-4 rounded-2xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Login/Register Modal */}
      <LoginRegisterModal
        isOpen={isLoginRegisterOpen}
        onClose={() => {
          setIsLoginRegisterOpen(false);
          setPendingHouse(null);
        }}
        onSuccess={handleLoginSuccess}
        defaultMode={loginRegisterMode}
      />

      {/* Selection Modals */}
      <SelectionModal
        isOpen={isUniversityModalOpen}
        onClose={() => setIsUniversityModalOpen(false)}
        onSelect={(value) => {
          setSelectedUniversity(value);
          setSearchQuery(value);
          setSelectedDistrict("");
          setSelectedSector("");
          setSelectedCell("");
          setSelectedVillage("");
          setCurrentPage(1);
          handleSearch();
        }}
        title={t.university}
        icon={<SchoolIcon className="w-5 h-5 text-[#FF385C]" />}
        items={uniqueUniversities}
        searchPlaceholder={t.searchByUniversity || "Search universities..."}
        selectedValue={selectedUniversity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <SelectionModal
        isOpen={isDistrictModalOpen}
        onClose={() => setIsDistrictModalOpen(false)}
        onSelect={(value) => {
          setSelectedDistrict(value);
          setSelectedSector("");
          setSelectedCell("");
          setSelectedVillage("");
          setSearchQuery(value);
          setCurrentPage(1);
          handleSearch();
        }}
        title={t.district}
        icon={<LocationCityIcon className="w-5 h-5 text-[#FF385C]" />}
        items={ALL_DISTRICTS}
        searchPlaceholder={t.searchDestinations || "Search districts..."}
        selectedValue={selectedDistrict}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <SelectionModal
        isOpen={isSectorModalOpen}
        onClose={() => setIsSectorModalOpen(false)}
        onSelect={(value) => {
          setSelectedSector(value);
          setSelectedCell("");
          setSelectedVillage("");
          setSearchQuery(value);
          setCurrentPage(1);
          handleSearch();
        }}
        title={t.sector}
        icon={<ApartmentIcon className="w-5 h-5 text-[#FF385C]" />}
        items={getSectorsForDistrict(selectedDistrict)}
        searchPlaceholder={t.selectSector || "Search sectors..."}
        selectedValue={selectedSector}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <SelectionModal
        isOpen={isCellModalOpen}
        onClose={() => setIsCellModalOpen(false)}
        onSelect={(value) => {
          setSelectedCell(value);
          setSelectedVillage("");
          setSearchQuery(value);
          setCurrentPage(1);
          handleSearch();
        }}
        title={t.cell}
        icon={<DomainIcon className="w-5 h-5 text-[#FF385C]" />}
        items={getCellsForSector(selectedSector)}
        searchPlaceholder={t.selectCell || "Search cells..."}
        selectedValue={selectedCell}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <SelectionModal
        isOpen={isVillageModalOpen}
        onClose={() => setIsVillageModalOpen(false)}
        onSelect={(value) => {
          setSelectedVillage(value);
          setSearchQuery(value);
          setCurrentPage(1);
          handleSearch();
        }}
        title={t.village}
        icon={<HomeIcon className="w-5 h-5 text-[#FF385C]" />}
        items={getVillagesForCell(selectedCell)}
        searchPlaceholder={t.selectVillage || "Search villages..."}
        selectedValue={selectedVillage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && selectedHouse && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[500]"
              onClick={handleSuccessModalClose}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-2 sm:inset-4 z-[501] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="relative">
                  <button
                    onClick={handleSuccessModalClose}
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-12 h-12 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t.bookingSubmitted || "Booking Submitted Successfully!"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.waitingForPaymentVerification ||
                      "Your booking has been submitted. We're waiting for payment verification."}
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {t.paymentAmount || "Payment Amount"}:{" "}
                      <span className="text-[#FF385C] font-bold">
                        {formatCurrency(getServiceFee())}
                      </span>
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {t.paymentStatus || "Payment Status"}:{" "}
                      <span className="text-yellow-600 font-medium">
                        ⏳ {t.statusPending || "Pending Verification"}
                      </span>
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      {t.houseStatus || "House Status"}:{" "}
                      <span className="text-red-600 font-medium">
                        🏠 {t.statusBooked || "Booked"}
                      </span>
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    {t.paymentPendingMessage ||
                      "Your payment is being verified. You'll be notified once confirmed. Check your dashboard for updates."}
                  </p>

                  <button
                    onClick={handleSuccessModalClose}
                    className="w-full mt-2 bg-[#FF385C] text-white py-2.5 rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
                  >
                    {t.viewHouseDetails || "View House Details"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================
        PROCESSING MODAL - Shows during booking submission
        ============================================================ */}
      <AnimatePresence>
        {isProcessingModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[450]"
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-2 sm:inset-4 z-[451] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl p-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#FF385C]/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Processing Your Booking
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {processingMessage ||
                      "Please wait while we process your booking..."}
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className="text-sm font-medium text-[#FF385C]">
                        {processingMessage?.includes("✅")
                          ? "Completed"
                          : "Processing..."}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#FF385C] h-2 rounded-full transition-all duration-500"
                        style={{
                          width: processingMessage?.includes("✅")
                            ? "100%"
                            : "60%",
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      This may take a moment depending on your network speed
                    </p>
                  </div>

                  <div className="flex gap-2 justify-center">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <div
                        className={`w-2 h-2 rounded-full ${processingMessage?.includes("📤") ? "bg-blue-500" : processingMessage?.includes("⏳") ? "bg-yellow-500" : processingMessage?.includes("✅") ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      Submitting
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <div
                        className={`w-2 h-2 rounded-full ${processingMessage?.includes("⏳") ? "bg-yellow-500" : processingMessage?.includes("✅") ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      Processing
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <div
                        className={`w-2 h-2 rounded-full ${processingMessage?.includes("✅") ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      Complete
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Rest of your UI - Keep everything else exactly as you had it */}
      <div className="w-full mb-4 rounded-2xl">
        {/* ===== PROJECT HEADER ===== */}
        <div className="bg-gradient-to-b from-white to-gray-50 py-8 md:py-12 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
                {language === "rw"
                  ? "GUKORA URUBUGA ABANYESHURI BA KAMINUZA BAZAJA BAJYAHO BAKABONA AMAZU YO GUKONDESHA KUBURYO BUBOREHEYE"
                  : language === "fr"
                    ? "Plateforme de location de maisons pour étudiants près des universités au Rwanda"
                    : "Student housing rental platform near universities in Rwanda"}
              </p>
            </div>
          </div>
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="relative z-20 -mt-6 px-2 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 md:p-5"
            >
              <div className="flex flex-wrap gap-2">
                {/* University Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      setIsUniversityModalOpen(true);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.university || "University"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <SchoolIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedUniversity ||
                        t.clickToSelect ||
                        "Click to select"}
                    </div>
                  </button>
                </div>

                {/* District Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      setIsDistrictModalOpen(true);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.district || "District"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <LocationCityIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedDistrict ||
                        t.selectDistrict ||
                        "Select District"}
                    </div>
                  </button>
                </div>

                {/* Sector Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      if (!selectedDistrict) {
                        toast.info("Please select a district first");
                        setIsDistrictModalOpen(true);
                        return;
                      }
                      setIsSectorModalOpen(true);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.sectorLabel || "Sector"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <ApartmentIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedSector || t.selectSector || "Select Sector"}
                    </div>
                  </button>
                </div>

                {/* Cell Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      if (!selectedSector) {
                        toast.info("Please select a sector first");
                        setIsSectorModalOpen(true);
                        return;
                      }
                      setIsCellModalOpen(true);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.cellLabel2 || "Cell"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <DomainIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedCell || t.selectCell || "Select Cell"}
                    </div>
                  </button>
                </div>

                {/* Village Button */}
                <div className="flex-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      if (!selectedCell) {
                        toast.info("Please select a cell first");
                        setIsCellModalOpen(true);
                        return;
                      }
                      setIsVillageModalOpen(true);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.villageLabel2 || "Village"}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 truncate flex items-center gap-1">
                      <HomeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                      {selectedVillage || t.selectVillage || "Select Village"}
                    </div>
                  </button>
                </div>

                <div className="flex gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                    className="bg-[#FF385C] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#FF385C]/30 text-xs sm:text-sm"
                  >
                    <SearchIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{t.search}</span>
                  </motion.button>
                  <button
                    onClick={() =>
                      setIsAdvancedSearchOpen(!isAdvancedSearchOpen)
                    }
                    className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <FilterListIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Advanced Search */}
              <AnimatePresence>
                {isAdvancedSearchOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-200 mt-3 pt-3 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                      <div>
                        <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                          {t.university}
                        </label>
                        <select
                          value={selectedUniversity}
                          onChange={(e) => {
                            setSelectedUniversity(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                        >
                          <option value="">All Universities</option>
                          {uniqueUniversities.map((uni) => (
                            <option key={uni} value={uni}>
                              {uni}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                          {t.district}
                        </label>
                        <select
                          value={selectedDistrict}
                          onChange={(e) => {
                            setSelectedDistrict(e.target.value);
                            setSelectedSector("");
                            setSelectedCell("");
                            setSelectedVillage("");
                            setCurrentPage(1);
                          }}
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                        >
                          <option value="">All Districts</option>
                          {ALL_DISTRICTS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                          {t.sector}
                        </label>
                        <select
                          value={selectedSector}
                          onChange={(e) => {
                            setSelectedSector(e.target.value);
                            setSelectedCell("");
                            setSelectedVillage("");
                            setCurrentPage(1);
                          }}
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                          disabled={!selectedDistrict}
                        >
                          <option value="">All Sectors</option>
                          {getSectorsForDistrict(selectedDistrict).map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                          {t.cell}
                        </label>
                        <select
                          value={selectedCell}
                          onChange={(e) => {
                            setSelectedCell(e.target.value);
                            setSelectedVillage("");
                            setCurrentPage(1);
                          }}
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                          disabled={!selectedSector}
                        >
                          <option value="">All Cells</option>
                          {getCellsForSector(selectedSector).map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                          {t.village}
                        </label>
                        <select
                          value={selectedVillage}
                          onChange={(e) => {
                            setSelectedVillage(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-full mt-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                          disabled={!selectedCell}
                        >
                          <option value="">All Villages</option>
                          {getVillagesForCell(selectedCell).map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] sm:text-xs font-medium text-gray-500">
                          {t.minutesFromCampus}
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="range"
                            min="0"
                            max="60"
                            value={maxMinutesFromCampus}
                            onChange={(e) =>
                              setMaxMinutesFromCampus(parseInt(e.target.value))
                            }
                            className="flex-1 accent-[#FF385C]"
                          />
                          <span className="text-xs sm:text-sm font-medium text-gray-700 min-w-[30px]">
                            {maxMinutesFromCampus}m
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end gap-2">
                        <button
                          onClick={clearAllFilters}
                          className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                        >
                          <ClearIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden xs:inline">
                            {t.resetFilters}
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* ===== PRICE CATEGORIES + HOUSES GRID ===== */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-6 sm:mt-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Left side: Houses Grid */}
            <div className="flex-1 min-w-0">
              <div className="relative mb-4 sm:mb-6">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder={t.searchProperties || "Search houses..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF385C] bg-white/80 backdrop-blur-sm"
                />
              </div>

              <div>
                <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                      {filteredHouses.length} {t.popularHomes}
                    </h2>
                    {selectedUniversity && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        <SchoolIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                        {selectedUniversity}
                      </p>
                    )}
                    {selectedDistrict && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        <LocationCityIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                        {t.district}: {selectedDistrict}
                      </p>
                    )}
                    {selectedSector && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {t.sectorLabel}: {selectedSector}
                      </p>
                    )}
                    {selectedCell && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {t.cellLabel2}: {selectedCell}
                      </p>
                    )}
                    {selectedVillage && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {t.villageLabel2}: {selectedVillage}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-gray-500">
                      <BookmarkIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      {favorites.length} {t.favorites}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                  {paginatedHouses.map((house) => (
                    <motion.div
                      key={house._id}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="group cursor-pointer"
                      onClick={() => openHouseModal(house)}
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={
                              house.images[0]?.url ||
                              house.images[0]?.secure_url ||
                              "https://via.placeholder.com/600x400?text=No+Image"
                            }
                            alt={house.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(house._id);
                              }}
                              className="bg-white rounded-full p-1 sm:p-1.5 shadow-lg hover:scale-110 transition-transform"
                            >
                              {favorites.includes(house._id) ? (
                                <FavoriteIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                              ) : (
                                <FavoriteBorderIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                              )}
                            </button>
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs">
                            {getTranslatedType("House")}
                          </div>
                          <div className="absolute top-2 left-2">
                            <span
                              className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs font-medium ${getUniversityColor(house.university)}`}
                            >
                              {house.university}
                            </span>
                          </div>
                          {house.houseId && (
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px]">
                              Code: {house.houseId}
                            </div>
                          )}
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                            <span
                              className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${getStatusColor(house.status)} shadow-lg`}
                            >
                              {getStatusText(house.status)}
                            </span>
                          </div>
                        </div>
                        <div className="p-2 sm:p-3 md:p-4">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-1">
                                {house.name}
                              </h3>
                              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                                <LocationOnIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-0.5" />
                                {house.location.village},{" "}
                                {house.location.sector}
                              </p>
                              <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                                <span className="text-[10px] sm:text-xs text-gray-500">
                                  {house.bedrooms} {t.rooms}
                                </span>
                                <span className="text-[10px] sm:text-xs text-gray-300">
                                  •
                                </span>
                                <span className="text-[10px] sm:text-xs text-gray-500">
                                  {house.bathrooms} {t.bathrooms}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end flex-shrink-0 ml-1 sm:ml-2">
                              <div className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-medium text-gray-700">
                                <StarIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                                {house.rating || 0}
                              </div>
                              <p className="text-[10px] sm:text-xs font-semibold text-[#FF385C]">
                                {house.pricePerMonth.toLocaleString()} RWF
                              </p>
                            </div>
                          </div>
                          <div className="mt-1">
                            <span
                              className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs font-medium ${getStatusColor(house.status)}`}
                            >
                              {getStatusText(house.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 md:mt-10"
                  >
                    <button
                      onClick={() => {
                        if (currentPage > 1) goToPage(currentPage - 1);
                      }}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                      }`}
                    >
                      <ArrowBackIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">{t.prev}</span>
                    </button>

                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => {
                          if (
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1 ||
                            (page === 2 && currentPage > 3) ||
                            (page === totalPages - 1 &&
                              currentPage < totalPages - 2)
                          ) {
                            return (
                              <motion.button
                                key={page}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => goToPage(page)}
                                className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-all ${
                                  currentPage === page
                                    ? "bg-[#FF385C] text-white shadow-lg shadow-[#FF385C]/30"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {page}
                              </motion.button>
                            );
                          }
                          if (page === 2 && currentPage > 3) {
                            return (
                              <span
                                key="ellipsis-start"
                                className="w-6 h-6 flex items-center justify-center text-gray-400"
                              >
                                …
                              </span>
                            );
                          }
                          if (
                            page === totalPages - 1 &&
                            currentPage < totalPages - 2
                          ) {
                            return (
                              <span
                                key="ellipsis-end"
                                className="w-6 h-6 flex items-center justify-center text-gray-400"
                              >
                                …
                              </span>
                            );
                          }
                          return null;
                        },
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (currentPage < totalPages) goToPage(currentPage + 1);
                      }}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                      }`}
                    >
                      <span className="hidden xs:inline">{t.next}</span>
                      <ArrowForwardIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </motion.div>
                )}

                {filteredHouses.length === 0 && (
                  <div className="text-center py-8 sm:py-10 md:py-12">
                    <p className="text-gray-500 text-sm sm:text-base">
                      {t.noResults}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Price Categories */}
            <div className="lg:w-64 xl:w-72 flex-shrink-0">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AttachMoneyIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF385C]" />
                    {t.priceCategories}
                  </h3>
                  <div className="space-y-1.5">
                    {priceCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedPriceCategory(category.id);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
                          selectedPriceCategory === category.id
                            ? "bg-[#FF385C]/10 border-2 border-[#FF385C] shadow-sm"
                            : "hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white flex-shrink-0`}
                        >
                          {React.cloneElement(
                            category.icon as React.ReactElement,
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {category.label}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {category.range} • {getCategoryCount(category.id)}
                          </p>
                        </div>
                        {selectedPriceCategory === category.id && (
                          <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF385C] flex-shrink-0" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
          PROPERTY DETAIL MODAL
          ============================================================ */}
        <AnimatePresence>
          {isPropertyModalOpen && selectedHouse && (
            <>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300]"
                onClick={closeHouseModal}
              />
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-2 sm:inset-4 z-[301] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
                  <div className="relative">
                    <div className="relative h-56 sm:h-40 md:h-50 lg:h-60 overflow-hidden bg-gray-900">
                      <img
                        src={
                          selectedHouse.images[currentImageIndex]?.url ||
                          selectedHouse.images[currentImageIndex]?.secure_url ||
                          "https://via.placeholder.com/600x400?text=No+Image"
                        }
                        alt={`${selectedHouse.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                        {currentImageIndex + 1} / {selectedHouse.images.length}
                      </div>
                      {selectedHouse.images.length > 1 && (
                        <>
                          <button
                            onClick={() => {
                              setCurrentImageIndex((prev) =>
                                prev === 0
                                  ? selectedHouse.images.length - 1
                                  : prev - 1,
                              );
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all hover:scale-110"
                          >
                            <ArrowBackIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setCurrentImageIndex((prev) =>
                                prev === selectedHouse.images.length - 1
                                  ? 0
                                  : prev + 1,
                              );
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all hover:scale-110"
                          >
                            <ArrowForwardIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </>
                      )}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {selectedHouse.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                              idx === currentImageIndex
                                ? "bg-white scale-125"
                                : "bg-white/50 hover:bg-white/80"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => openImageModal(currentImageIndex)}
                      className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs flex items-center gap-1 transition-colors"
                    >
                      <VisibilityIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">
                        {t.viewFullImage || "Full Screen"}
                      </span>
                    </button>
                    <div className="absolute top-4 left-3 flex flex-wrap gap-1">
                      <span
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium ${getUniversityColor(selectedHouse.university)}`}
                      >
                        <SchoolIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-1" />
                        <span className="hidden xs:inline">
                          {selectedHouse.university}
                        </span>
                      </span>
                      <span
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium ${getStatusColor(selectedHouse.status)}`}
                      >
                        {getStatusText(selectedHouse.status)}
                      </span>
                    </div>
                    <button
                      onClick={closeHouseModal}
                      className="absolute top-3 right-3 bg-white/90 p-1.5 sm:p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedHouse._id)}
                      className="absolute top-3 right-12 sm:right-14 bg-white/90 p-1.5 sm:p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      {favorites.includes(selectedHouse._id) ? (
                        <FavoriteIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF385C]" />
                      ) : (
                        <FavoriteBorderIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                      )}
                    </button>
                  </div>

                  <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-280px)] sm:max-h-[calc(90vh-300px)]">
                    <div className="flex flex-col md:flex-row items-start justify-between mb-3 sm:mb-4 gap-2">
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                          {selectedHouse.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                          <LocationOnIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5" />
                          {getLocationInfo(selectedHouse)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                          {selectedHouse.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5 sm:gap-1 text-base sm:text-lg font-medium text-gray-700 flex-shrink-0">
                        <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                        {selectedHouse.rating || 0}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] sm:text-xs font-medium">
                        <CalendarTodayIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline mr-0.5" />
                        {new Date(selectedHouse.createdAt).getFullYear()}
                      </span>
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-50 text-green-700 rounded-full text-[10px] sm:text-xs font-medium">
                        <AttachMoneyIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline mr-0.5" />
                        {selectedHouse.pricePerMonth.toLocaleString()} RWF
                      </span>
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-orange-50 text-orange-700 rounded-full text-[10px] sm:text-xs font-medium">
                        {getTranslatedType("House")}
                      </span>
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs font-medium">
                        <PersonIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline mr-0.5" />
                        {selectedHouse.maxGuests} guests
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          {t.province}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {selectedHouse.location.province}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          {t.district}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {selectedHouse.location.district}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          {t.sector}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {selectedHouse.location.sector}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          {t.cell}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {selectedHouse.location.cell}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3 col-span-2">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          {t.village}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {selectedHouse.location.village}
                        </p>
                        {selectedHouse.houseId && (
                          <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                            Code: {selectedHouse.houseId}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          {t.rooms}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          <BedIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5" />
                          {selectedHouse.bedrooms}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          {t.bathrooms}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          <BathroomIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5" />
                          {selectedHouse.bathrooms}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          Max Guests
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          <PersonIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-0.5" />
                          {selectedHouse.maxGuests}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                      <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1.5 sm:mb-2">
                        {t.amenities}
                      </h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedHouse.amenities?.map((amenity) => {
                          let icon = (
                            <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF385C]" />
                          );
                          if (amenity === "Wifi" || amenity === "WiFi")
                            icon = (
                              <WifiIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                            );
                          if (amenity === "water")
                            icon = (
                              <KitchenIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                            );
                          if (amenity === "Parking")
                            icon = (
                              <LocalParkingIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                            );
                          if (amenity === "Security" || amenity === "AC")
                            icon = (
                              <SecurityIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                            );
                          return (
                            <span
                              key={amenity}
                              className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 rounded-full text-[10px] sm:text-xs text-gray-700"
                            >
                              {icon}
                              {amenity}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                      <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1.5 sm:mb-2">
                        {t.owner || "Host Information"}
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mt-1">
                          {t.responseTime || "Response Time"}:{" "}
                          {selectedHouse.host.responseTime || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {t.price} ({t.priceInRWF})
                          </p>
                          <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900">
                            {selectedHouse.pricePerMonth.toLocaleString()} RWF
                            <span className="text-xs sm:text-sm font-normal text-gray-500">
                              {" "}
                              {t.perMonth}
                            </span>
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                            {t.serviceFee}:{" "}
                            {formatCurrency(
                              calculateServiceFee(selectedHouse.pricePerMonth),
                            )}
                          </p>
                        </div>
                        {selectedHouse.status === "available" && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              closeHouseModal();
                              handleBookNow(selectedHouse);
                            }}
                            className="w-full sm:w-auto bg-[#FF385C] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
                          >
                            <LoginIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                            {t.bookNow || "Book Now"}
                          </motion.button>
                        )}
                        {selectedHouse.status === "booked" && (
                          <div className="w-full sm:w-auto bg-gray-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base cursor-not-allowed">
                            <CancelIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                            Already Booked
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ============================================================
          IMAGE MODAL
          ============================================================ */}
        <AnimatePresence>
          {isImageModalOpen && selectedHouse && (
            <>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[400]"
                onClick={closeImageModal}
              />
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-[401] flex items-center justify-center p-2 sm:p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative max-w-5xl max-h-[90vh] w-full">
                  <button
                    onClick={closeImageModal}
                    className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                  >
                    <CloseIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </button>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={
                        selectedHouse.images[currentImageIndex]?.url ||
                        selectedHouse.images[currentImageIndex]?.secure_url ||
                        "https://via.placeholder.com/600x400?text=No+Image"
                      }
                      alt={selectedHouse.name}
                      className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    />
                    {selectedHouse.images.length > 1 && (
                      <>
                        <button
                          onClick={() => {
                            setCurrentImageIndex((prev) =>
                              prev === 0
                                ? selectedHouse.images.length - 1
                                : prev - 1,
                            );
                          }}
                          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors"
                        >
                          <ArrowBackIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentImageIndex((prev) =>
                              prev === selectedHouse.images.length - 1
                                ? 0
                                : prev + 1,
                            );
                          }}
                          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors"
                        >
                          <ArrowForwardIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                        </button>
                      </>
                    )}
                    <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex flex-wrap items-center justify-center gap-1 sm:gap-3 text-[10px] sm:text-sm">
                      <span className="font-medium">{selectedHouse.name}</span>
                      <span className="text-gray-400 hidden xs:inline">|</span>
                      <span className="text-gray-300 hidden xs:inline">
                        {selectedHouse.location.village}
                      </span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-300">
                        {currentImageIndex + 1} / {selectedHouse.images.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ============================================================
          BOOKING MODAL
          ============================================================ */}
        <AnimatePresence>
          {isBookingModalOpen && selectedHouse && (
            <>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                onClick={() => {
                  if (!submitting) {
                    setIsBookingModalOpen(false);
                    setCurrentStep(1);
                    resetBookingData();
                  }
                }}
              />
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-2 sm:inset-4 z-[101] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl shadow-2xl bg-white relative">
                  <div className="sticky top-0 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 rounded-t-xl sm:rounded-t-2xl z-10">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF385C]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <h2 className="text-sm sm:text-base md:text-xl font-semibold text-gray-900">
                        {t.bookThisHouse || "Book This House"}
                      </h2>
                    </div>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (!submitting) {
                          setIsBookingModalOpen(false);
                          setCurrentStep(1);
                          resetBookingData();
                        }
                      }}
                      className="p-0.5 sm:p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                      disabled={submitting}
                    >
                      <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>

                  {/* Progress Steps */}
                  <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div
                            className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full text-[10px] sm:text-xs md:text-sm font-medium ${
                              currentStep >= step
                                ? "bg-[#FF385C] text-white"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {step}
                          </div>
                          <span className="ml-0.5 sm:ml-1 md:ml-2 text-[8px] sm:text-[10px] md:text-sm font-medium text-gray-600 hidden xs:inline">
                            {step === 1 && t.personalInfo}
                            {step === 2 && t.bookingDetails}
                            {step === 3 && t.payment}
                          </span>
                          {step < 3 && (
                            <div
                              className={`w-4 sm:w-6 md:w-12 h-0.5 mx-0.5 sm:mx-1 md:mx-2 ${
                                currentStep > step
                                  ? "bg-[#FF385C]"
                                  : "bg-gray-200"
                              }`}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-2 sm:space-y-3 md:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.fullName || "Full Name"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={bookingData.step1.fullName}
                                onChange={(e) =>
                                  handleStep1Change("fullName", e.target.value)
                                }
                                className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                  bookingData.step1.fullName.length > 0 &&
                                  bookingData.step1.fullName.length < 2
                                    ? "border-red-500"
                                    : bookingData.step1.fullName.length >= 2
                                      ? "border-green-500"
                                      : "border-gray-300"
                                }`}
                                placeholder="John Doe"
                              />
                              {bookingData.step1.fullName.length >= 2 && (
                                <CheckCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                              )}
                              {bookingData.step1.fullName.length > 0 &&
                                bookingData.step1.fullName.length < 2 && (
                                  <CancelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                                )}
                            </div>
                            {bookingData.step1.fullName.length > 0 &&
                              bookingData.step1.fullName.length < 2 && (
                                <p className="text-xs text-red-500 mt-1">
                                  Name must be at least 2 characters
                                </p>
                              )}
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.email || "Email"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                value={bookingData.step1.email}
                                onChange={(e) =>
                                  handleStep1Change("email", e.target.value)
                                }
                                className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                  bookingData.step1.email.length > 0 &&
                                  !validateEmail(bookingData.step1.email)
                                    ? "border-red-500"
                                    : bookingData.step1.email.length > 0 &&
                                        validateEmail(bookingData.step1.email)
                                      ? "border-green-500"
                                      : "border-gray-300"
                                }`}
                                placeholder="john@example.com"
                              />
                              {bookingData.step1.email.length > 0 &&
                                validateEmail(bookingData.step1.email) && (
                                  <CheckCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                                )}
                              {bookingData.step1.email.length > 0 &&
                                !validateEmail(bookingData.step1.email) && (
                                  <CancelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                                )}
                            </div>
                            {bookingData.step1.email.length > 0 &&
                              !validateEmail(bookingData.step1.email) && (
                                <p className="text-xs text-red-500 mt-1">
                                  {t.invalidEmail ||
                                    "Please enter a valid email"}
                                </p>
                              )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.phoneNumber || "Phone Number"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                value={bookingData.step1.phone}
                                onChange={(e) =>
                                  handleStep1Change("phone", e.target.value)
                                }
                                className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                  bookingData.step1.phone.length > 0 &&
                                  !validatePhone(bookingData.step1.phone)
                                    ? "border-red-500"
                                    : bookingData.step1.phone.length > 0 &&
                                        validatePhone(bookingData.step1.phone)
                                      ? "border-green-500"
                                      : "border-gray-300"
                                }`}
                                placeholder="+250788123456"
                              />
                              {bookingData.step1.phone.length > 0 &&
                                validatePhone(bookingData.step1.phone) && (
                                  <CheckCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                                )}
                              {bookingData.step1.phone.length > 0 &&
                                !validatePhone(bookingData.step1.phone) && (
                                  <CancelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                                )}
                            </div>
                            {bookingData.step1.phone.length > 0 &&
                              !validatePhone(bookingData.step1.phone) && (
                                <p className="text-xs text-red-500 mt-1">
                                  {t.invalidPhone ||
                                    "Please enter a valid phone number"}
                                </p>
                              )}
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.idNumber || "ID Number"}
                            </label>
                            <input
                              type="text"
                              value={bookingData.step1.idNumber}
                              onChange={(e) =>
                                handleStep1Change("idNumber", e.target.value)
                              }
                              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none"
                              placeholder="ID123456"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.university || "University"}
                            </label>
                            <input
                              type="text"
                              value={bookingData.step1.university}
                              onChange={(e) =>
                                handleStep1Change("university", e.target.value)
                              }
                              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none"
                              placeholder={t.university || "University"}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.studentId || "Student ID"}
                            </label>
                            <input
                              type="text"
                              value={bookingData.step1.studentId}
                              onChange={(e) =>
                                handleStep1Change("studentId", e.target.value)
                              }
                              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none"
                              placeholder="STU12345"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.purpose || "Purpose of Stay"}
                          </label>
                          <textarea
                            value={bookingData.step1.purpose}
                            onChange={(e) =>
                              handleStep1Change("purpose", e.target.value)
                            }
                            rows={2}
                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none"
                            placeholder="Study, internship, research..."
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Booking Details */}
                    {currentStep === 2 && (
                      <div className="space-y-2 sm:space-y-3 md:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.checkIn || "Check-in Date"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              value={bookingData.step2.checkIn}
                              onChange={(e) =>
                                handleStep2Change("checkIn", e.target.value)
                              }
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                bookingData.step2.checkIn.length > 0
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.checkOut || "Check-out Date"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              value={bookingData.step2.checkOut}
                              onChange={(e) => {
                                const checkOut = e.target.value;
                                const months =
                                  bookingData.step2.checkIn && checkOut
                                    ? Math.ceil(
                                        (new Date(checkOut).getTime() -
                                          new Date(
                                            bookingData.step2.checkIn,
                                          ).getTime()) /
                                          (1000 * 60 * 60 * 24 * 30),
                                      )
                                    : 1;
                                setBookingData({
                                  ...bookingData,
                                  step2: {
                                    ...bookingData.step2,
                                    checkOut,
                                    months: months > 0 ? months : 1,
                                  },
                                });
                              }}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                bookingData.step2.checkOut.length > 0
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.months || "Months"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              value={bookingData.step2.months}
                              onChange={(e) =>
                                handleStep2Change(
                                  "months",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              min="1"
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                bookingData.step2.months > 0
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                              {t.guests || "Guests"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              value={bookingData.step2.guests}
                              onChange={(e) =>
                                handleStep2Change(
                                  "guests",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              min="1"
                              max={selectedHouse.maxGuests || 10}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                bookingData.step2.guests > 0
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.specialRequests || "Special Requests"}
                          </label>
                          <textarea
                            value={bookingData.step2.specialRequests}
                            onChange={(e) =>
                              handleStep2Change(
                                "specialRequests",
                                e.target.value,
                              )
                            }
                            rows={2}
                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none"
                            placeholder="Any special requests..."
                          />
                        </div>

                        {/* Summary */}
                        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4">
                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                            <span className="font-medium">
                              {t.monthlyRent || "Monthly Rent"}:
                            </span>{" "}
                            {formatCurrency(selectedHouse.pricePerMonth)}
                          </p>
                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                            <span className="font-medium">
                              {t.months || "Months"}:
                            </span>{" "}
                            {bookingData.step2.months}
                          </p>
                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                            <span className="font-medium">
                              {t.serviceFee || "Service Fee"}:
                            </span>{" "}
                            {formatCurrency(getServiceFee())}
                          </p>
                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 font-semibold text-[#FF385C]">
                            <span className="font-medium">
                              {t.totalAmount || "Total Amount to Pay"}:
                            </span>{" "}
                            {formatCurrency(getServiceFee())}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Payment */}
                    {currentStep === 3 && (
                      <div className="space-y-2 sm:space-y-3 md:space-y-4">
                        <div>
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            {t.paymentMethod || "Payment Method"}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="p-2 sm:p-3 md:p-4 border-2 rounded-lg text-center transition-all bg-[#FF385C]/5 border-[#FF385C]">
                            <svg
                              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto text-[#FF385C] mb-0.5 sm:mb-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                            </svg>
                            <p className="text-xs sm:text-sm md:text-base font-medium">
                              {t.momo || "MOMO"}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                              {t.payWithMomo || "Pay with MOMO"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.momoNumber || "MOMO Number"}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              value={bookingData.step3.momoNumber || ""}
                              onChange={(e) =>
                                handleStep3Change("momoNumber", e.target.value)
                              }
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
                                bookingData.step3.momoNumber.length > 0 &&
                                !validatePhone(bookingData.step3.momoNumber)
                                  ? "border-red-500"
                                  : bookingData.step3.momoNumber.length > 0 &&
                                      validatePhone(
                                        bookingData.step3.momoNumber,
                                      )
                                    ? "border-green-500"
                                    : "border-gray-300"
                              }`}
                              placeholder="0788123456"
                            />
                            {bookingData.step3.momoNumber.length > 0 &&
                              validatePhone(bookingData.step3.momoNumber) && (
                                <CheckCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                              )}
                            {bookingData.step3.momoNumber.length > 0 &&
                              !validatePhone(bookingData.step3.momoNumber) && (
                                <CancelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                              )}
                          </div>
                          {bookingData.step3.momoNumber.length > 0 &&
                            !validatePhone(bookingData.step3.momoNumber) && (
                              <p className="text-xs text-red-500 mt-1">
                                {t.invalidPhone ||
                                  "Please enter a valid phone number"}
                              </p>
                            )}
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 sm:p-3 md:p-4">
                          <p className="text-[10px] sm:text-xs md:text-sm font-medium text-yellow-800">
                            {t.paymentInfo || "Payment Information"}
                          </p>
                          <p className="text-[10px] sm:text-xs md:text-sm text-yellow-700 mt-0.5 sm:mt-1">
                            {t.momoPaymentInstructions ||
                              "Please pay using the USSD code below:"}
                          </p>
                          <div className="mt-1 sm:mt-2 p-1.5 sm:p-2 md:p-3 bg-white rounded border border-yellow-200">
                            <div className="text-center">
                              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-0.5 sm:mb-1">
                                {t.totalAmount || "Total Amount to Pay"}
                              </p>
                              <p className="font-bold text-[#FF385C] text-sm sm:text-base md:text-lg">
                                {formatCurrency(getServiceFee())}
                              </p>
                              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-0.5 sm:mb-1 mt-1 sm:mt-2">
                                {t.ussdCode || "USSD Code"}
                              </p>
                              <p className="font-mono text-base sm:text-lg md:text-xl font-bold text-[#FF385C]">
                                {getUssdCode()}
                              </p>
                              <a
                                href={`tel:${getUssdCode().replace(/\*/g, "%2A").replace(/#/g, "%23")}`}
                                className="inline-block mt-1 sm:mt-2 px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 bg-[#FF385C] text-white rounded-lg text-[10px] sm:text-xs md:text-sm font-medium hover:bg-[#E31C5F] transition-colors"
                              >
                                📞 {t.dialNow || "Dial Now"}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">
                            {t.uploadPaymentProof ||
                              "Upload Payment Screenshot"}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="payment-screenshot"
                            />
                            <label
                              htmlFor="payment-screenshot"
                              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border rounded-lg transition-colors cursor-pointer text-[10px] sm:text-xs md:text-sm flex items-center gap-0.5 sm:gap-1 md:gap-2 ${
                                bookingData.step3.screenshotPreview
                                  ? "border-green-500 bg-green-50 text-green-700"
                                  : "border-gray-300 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              <svg
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {bookingData.step3.screenshotPreview
                                ? "Change File"
                                : t.chooseFile || "Choose File"}
                            </label>
                            {bookingData.step3.screenshotPreview && (
                              <div className="relative">
                                <img
                                  src={bookingData.step3.screenshotPreview}
                                  alt="Payment Screenshot"
                                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg border border-green-500"
                                />
                                <button
                                  onClick={() => {
                                    setBookingData({
                                      ...bookingData,
                                      step3: {
                                        ...bookingData.step3,
                                        screenshot: null,
                                        screenshotFile: null,
                                        screenshotPreview: "",
                                      },
                                    });
                                  }}
                                  className="absolute -top-1 sm:-top-1.5 md:-top-2 -right-1 sm:-right-1.5 md:-right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                >
                                  <CancelIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                          {!bookingData.step3.screenshotPreview && (
                            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-red-500">
                              Please upload a payment confirmation screenshot
                            </p>
                          )}
                          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">
                            {t.uploadPaymentProof ||
                              "Upload your payment confirmation screenshot"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 pt-2 sm:pt-3 md:pt-4 border-t border-gray-200">
                      {currentStep > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={prevStep}
                          disabled={submitting}
                          className="px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-[10px] sm:text-xs md:text-sm"
                        >
                          {t.previous || "Previous"}
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={
                          currentStep === 3 ? handleSubmitBooking : nextStep
                        }
                        disabled={
                          submitting ||
                          (currentStep === 1 && !isBookingStep1Valid()) ||
                          (currentStep === 2 && !isBookingStep2Valid()) ||
                          (currentStep === 3 && !isBookingStep3Valid())
                        }
                        className={`flex-1 px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm ${
                          submitting ||
                          (currentStep === 1 && !isBookingStep1Valid()) ||
                          (currentStep === 2 && !isBookingStep2Valid()) ||
                          (currentStep === 3 && !isBookingStep3Valid())
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#FF385C] hover:bg-[#E31C5F]"
                        }`}
                      >
                        {submitting ? (
                          <>
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {t.submitting || "Submitting..."}
                          </>
                        ) : currentStep === 3 ? (
                          <>
                            <CheckCircleIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                            {t.confirmBooking || "Confirm Booking"}
                          </>
                        ) : (
                          t.next || "Next"
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// ============================================================
// EXPORT ALL
// ============================================================

export {
  ALL_DISTRICTS,
  ALL_SECTORS,
  ALL_CELLS,
  ALL_VILLAGES,
  getVillagesForCell,
  getCellsForSector,
  getSectorsForDistrict,
  getTranslations,
  getLanguageFromCookies,
  formatCurrency,
  calculateServiceFee,
  validateEmail,
  validatePhone,
  getPriceCategories,
  LoginRegisterModal,
  SelectionModal,
};
