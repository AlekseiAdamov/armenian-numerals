document.addEventListener("DOMContentLoaded", () => {
    // See regenerateFlashCard.
    let isToggled = true;

    /**
     * @param {number} number A number for which a representation is needed.
     * @param {object} numerals An object containing string representations
     *                          for number parts in a certain language.
     * @returns A string representation for a given number in a language
     *          which numerals were passed as a second argument.
     */
    const convert = (number, numerals) => {
        if (number === 0) {
            return numerals.zero;
        }

        const denominators = {
            "hundreds": 100,
            "teensEnd": 19,
            "teensStart": 10,
            "tens": 20,
            "thousands": 1000
        };

        let remainder = number;

        let numeral = "";

        if (remainder >= denominators.thousands) {
            numeral += numerals.thousands[Math.floor(remainder / denominators.thousands)];
            remainder %= denominators.thousands;
        }

        if (remainder >= denominators.hundreds) {
            if (numeral !== "") {
                numeral += " ";
            }
            numeral += numerals.hundreds[Math.floor(remainder / denominators.hundreds)];
            remainder %= denominators.hundreds;
        }

        if (remainder >= denominators.tens) {
            if (numeral !== "") {
                numeral += " ";
            }
            numeral += numerals.tens[Math.floor(remainder / denominators.teensStart)];
            remainder %= denominators.teensStart;
        }

        if (remainder >= denominators.teensStart && remainder <= denominators.teensEnd) {
            if (numeral !== "") {
                numeral += " ";
            }
            numeral += numerals.teens[remainder - denominators.teensStart];
            return numeral;
        }

        if (remainder > 0) {
            if (numeral !== "") {
                numeral += " ";
            }
            numeral += numerals.units[remainder];
        }
        return numeral;
    };

    /**
     * @param {number} number A number for which a string representation
     *                        in Armenian language is needed.
     * @returns An Armenian string representation of a given number.
     */
    const armenianNumeral = (number) => {
        const numerals = {
            "hundreds": [
                "",
                "հարյուր",
                "երկու հարյուր",
                "երեք հարյուր",
                "չորս հարյուր",
                "հինգ հարյուր",
                "վեց հարյուր",
                "յոթ հարյուր",
                "ութ հարյուր",
                "ինը հարյուր"
            ],
            "teens": [
                "տասը",
                "տասնմեկ",
                "տասներկու",
                "տասներեք",
                "տասնչորս",
                "տասնհինգ",
                "տասնվեց",
                "տասնյոթ",
                "տասնութ",
                "տասնինը"
            ],
            "tens": [
                "",
                "",
                "քսան",
                "երեսուն",
                "քառասուն",
                "հիսուն",
                "վաթսուն",
                "յոթանասուն",
                "ութսուն",
                "իննսուն"
            ],
            "thousands": [
                "",
                "հազար",
                "երկու հազար",
                "երեք հազար",
                "չորս հազար",
                "հինգ հազար",
                "վեց հազար",
                "յոթ հազար",
                "ութ հազար",
                "ինը հազար"
            ],
            "units": [
                "",
                "մեկ",
                "երկու",
                "երեք",
                "չորս",
                "հինգ",
                "վեց",
                "յոթ",
                "ութ",
                "ինը"
            ],
            "zero": "զրո"
        };
        return convert(number, numerals);
    };

    /**
     * @param {number} number A number for which a string representation
     *                        in Russian language is needed.
     * @returns A Russian string representation of a given number.
     */
    const russianNumeral = (number) => {
        const numerals = {
            "hundreds": [
                "",
                "сто",
                "двести",
                "триста",
                "четыреста",
                "пятьсот",
                "шестьсот",
                "семьсот",
                "восемьсот",
                "девятьсот"
            ],
            "teens": [
                "десять",
                "одиннадцать",
                "двенадцать",
                "тринадцать",
                "четырнадцать",
                "пятнадцать",
                "шестнадцать",
                "семнадцать",
                "восемнадцать",
                "девятнадцать"
            ],
            "tens": [
                "",
                "",
                "двадцать",
                "тридцать",
                "сорок",
                "пятьдесят",
                "шестьдесят",
                "семьдесят",
                "восемьдесят",
                "девяносто"
            ],
            "thousands": [
                "",
                "тысяча",
                "две тысячи",
                "три тысячи",
                "четыре тысячи",
                "пять тысяч",
                "шесть тысяч",
                "семь тысяч",
                "восемь тысяч",
                "девять тысяч"
            ],
            "units": [
                "",
                "один",
                "два",
                "три",
                "четыре",
                "пять",
                "шесть",
                "семь",
                "восемь",
                "девять"
            ],
            "zero": "ноль"
        };
        return convert(number, numerals);
    };

    /**
     * @param {number} number A number which is needed to transcribe.
     * @returns A Russian transcription of an Armenian
     *          representation of a given number.
     */
    const russianTranscription = (number) => {
        const numerals = {
            "hundreds": [
                "",
                "харюр",
                "йерку харюр",
                "йерек харюр",
                "чорс харюр",
                "хинг харюр",
                "вец харюр",
                "йот харюр",
                "ут харюр",
                "инэ харюр"
            ],
            "teens": [
                "тасэ",
                "таснмек",
                "таснерку",
                "таснерек",
                "таснчорс",
                "таснхинг",
                "таснвец",
                "таснйот",
                "таснут",
                "таснинэ"
            ],
            "tens": [
                "",
                "",
                "ксан",
                "йересун",
                "карасун",
                "хисун",
                "ватсун",
                "йотанасун",
                "утсун",
                "иннсун"
            ],
            "thousands": [
                "",
                "хазар",
                "йерку хазар",
                "йерек хазар",
                "чорс хазар",
                "хинг хазар",
                "вец хазар",
                "йот хазар",
                "ут хазар",
                "инэ хазар"
            ],
            "units": [
                "",
                "мек",
                "йерку",
                "йерек",
                "чорс",
                "хинг",
                "вец",
                "йот",
                "ут",
                "инэ"
            ],
            "zero": "дзэро"
        };
        return convert(number, numerals);
    };

    /**
     * @param {number} number A number which is needed to transcribe.
     * @returns An Armenian transcription of a Russian
     *          representation of a given number.
     */
    const armenianTranscription = (number) => {
        const numerals = {
            "hundreds": ["",
                "ստո",
                "դվեստի",
                "տրիստա",
                "չետըրեստա",
                "պյատսոտ",
                "շեստսոտ",
                "սեմսոտ",
                "վոսեմսոտ",
                "դեվյատսոտ"],
            "teens": ["դեսյատ",
                "օդիննադծատ",
                "դվենադծատ",
                "տրինադծատ",
                "չետըռնադծատ",
                "պյատնադծատ",
                "շեստնադծատ",
                "սեմնադծատ",
                "վոսեմնադծատ",
                "դեվյատնադծատ"],
            "tens": ["",
                "",
                "դվադծատ",
                "տրիդծատ",
                "սոռոկ",
                "պյատդեսյատ",
                "շեստդեսյատ",
                "սեմդեսյատ",
                "վոսեմդեսյատ",
                "դեվյանոստո"],
            "thousands": ["",
                "տըսյաչա",
                "դվե տըսյաչի",
                "տրի տըսյաչի",
                "չետըրե տըսյաչի",
                "պյատ տըսյաչ",
                "շեստ տըսյաչ",
                "սեմ տըսյաչ",
                "վոսեմ տըսյաչ",
                "դեվյատ տըսյաչ"],
            "units": ["",
                "օդին",
                "դվա",
                "տրի",
                "չետըրե",
                "պյատ",
                "շեստ",
                "սեմ",
                "վոսեմ",
                "դեվյատ"],
            "zero": "նոլ"
        };
        return convert(number, numerals);
    };

    /**
     * @param {number} min The lower bound for the number generation.
     * @param {number} max The upper bound for the number generation.
     * @returns A number for a flashcard.
     */
    const getRandomNumber = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

    /**
     * @returns A flashcard.
     */
    const generateFlashCard = () => {
        const rangeLower = parseInt(document.getElementById("rangeLower").value, 10);
        const rangeUpper = parseInt(document.getElementById("rangeUpper").value, 10);

        if (isNaN(rangeLower) || isNaN(rangeUpper)) {
            return;
        }

        const isArmenianToRussian = document.getElementById("switchLanguages").checked;
        const isShowNumber = document.getElementById("showNumber").checked;

        const randomNumber = getRandomNumber(rangeLower, rangeUpper);
        let numberToShow = "";
        if (isShowNumber) {
            numberToShow = `${randomNumber}<br><br>`;
        }

        let numeral = "";
        if (isArmenianToRussian) {
            numeral = armenianNumeral(randomNumber);
        } else {
            numeral = russianNumeral(randomNumber);
        }

        const frontText = `${numberToShow}${numeral}`;

        let backText = "";
        if (isArmenianToRussian) {
            backText = `${russianNumeral(randomNumber)}<br><br>(${armenianTranscription(randomNumber)})`;
        } else {
            backText = `${armenianNumeral(randomNumber)}<br><br>(${russianTranscription(randomNumber)})`;
        }

        const flashcardContainer = document.getElementById("flashcardContainer");
        flashcardContainer.innerHTML = "";

        const flashcard = document.createElement("div");
        flashcard.classList.add("flashcard");
        flashcard.title = "Нажмите на карточку, чтобы увидеть ответ на другом языке";
        flashcard.innerHTML = `<div class="front">${frontText}</div><div class="back">${backText}</div>`;
        flashcard.addEventListener("click", () => {
            flashcard.classList.toggle("show-back");
            isToggled = !isToggled;
            if (isToggled) {
                generateFlashCard();
            }
        });

        flashcardContainer.appendChild(flashcard);
    };

    const regenerateFlashCard = () => {
        // To prevent from generating a new card without showing the back side.
        isToggled = true;
        generateFlashCard();
    };

    document.getElementById("rangeLower").addEventListener("input", (event) => {
        if (event.target.value === "") {
            alert("Значение верхней границы не может быть пустым.\nЗначение будет установлено равным 0.");
            event.target.value = 0;
        }
        // To prevent from inputing leading zeroes.
        event.target.value = parseInt(event.target.value, 10);
        const rangeUpper = parseInt(document.getElementById("rangeUpper").value, 10);
        if (parseInt(event.target.value, 10) > rangeUpper) {
            // eslint-disable-next-line max-len
            alert(`Значение нижней границы не может быть больше значения верхней границы.\nЗначение будет установлено равным значению верхней границы ${rangeUpper}.`);
            event.target.value = rangeUpper;
        }
        regenerateFlashCard();
    });

    document.getElementById("rangeUpper").addEventListener("input", (event) => {
        if (event.target.value === "") {
            alert("Значение верхней границы не может быть пустым.\nЗначение будет установлено равным 9999.");
            event.target.value = 9999;
        }
        // To prevent from inputing leading zeroes.
        event.target.value = parseInt(event.target.value, 10);
        const maxAllowedNumber = 9999;
        if (parseInt(event.target.value, 10) > maxAllowedNumber) {
            // eslint-disable-next-line max-len
            alert("Значение верхней границы не может быть больше 9999.\nЗначение будет установлено равным 9999.");
            event.target.value = 9999;
        }
        const rangeLower = parseInt(document.getElementById("rangeLower").value, 10);
        if (parseInt(event.target.value, 10) < rangeLower) {
            // eslint-disable-next-line max-len
            alert(`Значение верхней границы не может быть меньше значения нижней границы.\nЗначение будет установлено равным нижней границе ${rangeLower}.`);
            event.target.value = rangeLower;
        }
        regenerateFlashCard();
    });

    document.getElementById("switchLanguages").addEventListener("change", regenerateFlashCard);
    document.getElementById("showNumber").addEventListener("change", regenerateFlashCard);

    // Generate initial flashcard
    generateFlashCard();
});
