document.addEventListener('DOMContentLoaded', () => {
    /**
     * @param {number} min The lower bound for the number generation.
     * @param {number} max The upper bound for the number generation.
     * @returns A number for a flashcard.
     */
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * @returns A flashcard.
     */
    function generateFlashCard() {
        const rangeLower = parseInt(document.getElementById('rangeLower').value);
        const rangeUpper = parseInt(document.getElementById('rangeUpper').value);

        if (isNaN(rangeLower) || isNaN(rangeUpper)) {
            return;
        }

        const isArmenianToRussian = document.getElementById('switchLanguages').checked;
        const isShowNumber = document.getElementById('showNumber').checked;

        const randomNumber = getRandomNumber(rangeLower, rangeUpper);
        const numberToShow = isShowNumber ? `${randomNumber}<br><br>` : '';
        const frontText = `${numberToShow}${isArmenianToRussian ? armenianNumeral(randomNumber) : russianNumeral(randomNumber)}`;
        const backText = isArmenianToRussian
            ? `${russianNumeral(randomNumber)}<br><br>(${armenianTranscription(randomNumber)})`
            : `${armenianNumeral(randomNumber)}<br><br>(${russianTranscription(randomNumber)})`;

        const flashcardContainer = document.getElementById('flashcardContainer');
        flashcardContainer.innerHTML = '';

        const flashcard = document.createElement('div');
        flashcard.classList.add('flashcard');
        flashcard.title = 'Нажмите на карточку, чтобы увидеть ответ на другом языке';
        flashcard.innerHTML = `<div class="front">${frontText}</div><div class="back">${backText}</div>`;
        flashcard.addEventListener('click', function () {
            flashcard.classList.toggle('show-back');
            isToggled = !isToggled;
            if (isToggled) {
                generateFlashCard();
            }
        });

        flashcardContainer.appendChild(flashcard);
    }

    /**
     * @param {number} number A number for which a representation is needed.
     * @param {object} numerals An object containing string representations for number parts in a certain language.
     * @returns A string representation for a given number in a language which numerals were passed as a second argument.
     */
    function convert(number, numerals) {
        if (number === 0) {
            return numerals.zero;
        }

        var numeral = '';

        if (number >= 1000) {
            numeral += numerals.thousands[Math.floor(number / 1000)];
            number %= 1000;
        }

        if (number >= 100) {
            if (numeral !== '') {
                numeral += ' ';
            }
            numeral += numerals.hundreds[Math.floor(number / 100)];
            number %= 100;
        }

        if (number >= 20) {
            if (numeral !== '') {
                numeral += ' ';
            }
            numeral += numerals.tens[Math.floor(number / 10)];
            number %= 10;
        }

        if (number >= 10 && number <= 19) {
            if (numeral !== '') {
                numeral += ' ';
            }
            numeral += numerals.teens[number - 10];
            return numeral;
        }

        if (number > 0) {
            if (numeral !== '') {
                numeral += ' ';
            }
            numeral += numerals.units[number];
        }
        return numeral;
    }

    /**
     * @param {number} number A number for which a string representation in Armenian language is needed.
     * @returns An Armenian string representation of a given number.
     */
    function armenianNumeral(number) {
        const numerals = {
            zero: 'զրո',
            units: ['', 'մեկ', 'երկու', 'երեք', 'չորս', 'հինգ', 'վեց', 'յոթ', 'ութ', 'ինը'],
            teens: ['տասը', 'տասնմեկ', 'տասներկու', 'տասներեք', 'տասնչորս', 'տասնհինգ', 'տասնվեց', 'տասնյոթ', 'տասնութ', 'տասնինը'],
            tens: ['', '', 'քսան', 'երեսուն', 'քառասուն', 'հիսուն', 'վաթսուն', 'յոթանասուն', 'ութանասուն', 'իննսուն'],
            hundreds: ['', 'հարյուր', 'երկու հարյուր', 'երեք հարյուր', 'չորս հարյուր', 'հինգ հարյուր', 'վեց հարյուր', 'յոթ հարյուր', 'ութ հարյուր', 'ինը հարյուր'],
            thousands: ['', 'հազար', 'երկու հազար', 'երեք հազար', 'չորս հազար', 'հինգ հազար', 'վեց հազար', 'յոթ հազար', 'ութ հազար', 'ինը հազար']
        };
        return convert(number, numerals);
    }

    /**
     * @param {number} number A number for which a string representation in Russian language is needed.
     * @returns A Russian string representation of a given number.
     */
    function russianNumeral(number) {
        const numerals = {
            zero: 'ноль',
            units: ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
            teens: ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'],
            tens: ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
            hundreds: ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
            thousands: ['', 'тысяча', 'две тысячи', 'три тысячи', 'четыре тысячи', 'пять тысяч', 'шесть тысяч', 'семь тысяч', 'восемь тысяч', 'девять тысяч']
        };
        return convert(number, numerals);
    }

    /**
     * @param {number} number A number which is needed to transcribe.
     * @returns A Russian transcription of an Armenian representation of a given number.
     */
    function russianTranscription(number) {
        const numerals = {
            zero: 'дзэро',
            units: ['', 'мек', 'йерку', 'йерек', 'чорс', 'хинг', 'вец', 'йот', 'ут', 'инэ'],
            teens: ['тасэ', 'таснмек', 'таснерку', 'таснерек', 'таснчорс', 'таснхинг', 'таснвец', 'таснйот', 'таснут', 'таснинэ'],
            tens: ['', '', 'ксан', 'йересун', 'карасун', 'хисун', 'ватсун', 'йотанасун', 'утсун', 'иннсун'],
            hundreds: ['', 'харюр', 'йерку харюр', 'йерек харюр', 'чорс харюр', 'хинг харюр', 'вец харюр', 'йот харюр', 'ут харюр', 'инэ харюр'],
            thousands: ['', 'хазар', 'йерку хазар', 'йерек хазар', 'чорс хазар', 'хинг хазар', 'вец хазар', 'йот хазар', 'ут хазар', 'инэ хазар']
        };
        return convert(number, numerals);
    }

    /**
     * @param {number} number A number which is needed to transcribe.
     * @returns An Armenian transcription of a Russian representation of a given number.
     */
    function armenianTranscription(number) {
        const numerals = {
            zero: 'նոլ',
            units: ['', 'օդին', 'դվա', 'տրի', 'չետըրե', 'պյատ', 'շեստ', 'սեմ', 'վոսեմ', 'դեվյատ'],
            teens: ['դեսյատ', 'օդիննադծատ', 'դվենադծատ', 'տրինադծատ', 'չետըռնադծատ', 'պյատնադծատ', 'շեստնադծատ', 'սեմնադծատ', 'վոսեմնադծատ', 'դեվյատնադծատ'],
            tens: ['', '', 'դվադծատ', 'տրիդծատ', 'սոռոկ', 'պյատդեսյատ', 'շեստդեսյատ', 'սեմդեսյատ', 'վոսեմդեսյատ', 'դեվյանոստո'],
            hundreds: ['', 'ստո', 'դվեստի', 'տրիստա', 'չետըրեստա', 'պյատսոտ', 'շեստսոտ', 'սեմսոտ', 'վոսեմսոտ', 'դեվյատսոտ'],
            thousands: ['', 'տըսյաչա', 'դվե տըսյաչի', 'տրի տըսյաչի', 'չետըրե տըսյաչի', 'պյատ տըսյաչ', 'շեստ տըսյաչ', 'սեմ տըսյաչ', 'վոսեմ տըսյաչ', 'դեվյատ տըսյաչ']
        };
        return convert(number, numerals);
    }

    // See regenerateFlashCard.
    let isToggled = true;

    function regenerateFlashCard() {
        // To prevent from generating a new card
        // without showing the back side.
        isToggled = true;
        generateFlashCard();
    };

    document.getElementById('rangeLower').addEventListener('input', (event) => {
        if (event.target.value === '') {
            alert('Значение верхней границы не может быть пустым.\nЗначение будет установлено равным 0.')
            event.target.value = 0;
        }
        // To prevent from inputing leading zeroes.
        event.target.value = parseInt(event.target.value);
        const rangeUpper = parseInt(document.getElementById('rangeUpper').value);
        if (parseInt(event.target.value) > rangeUpper) {
            alert(`Значение нижней границы не может быть больше значения верхней границы.\nЗначение будет установлено равным значению верхней границы ${rangeUpper}.`)
            event.target.value = rangeUpper;
        }
        regenerateFlashCard();
    });

    document.getElementById('rangeUpper').addEventListener('input', (event) => {
        if (event.target.value === '') {
            alert('Значение верхней границы не может быть пустым.\nЗначение будет установлено равным 9999.')
            event.target.value = 9999;
        }
        // To prevent from inputing leading zeroes.
        event.target.value = parseInt(event.target.value);
        if (parseInt(event.target.value) > 9999) {
            alert('Значение верхней границы не может быть больше 9999.\nЗначение будет установлено равным 9999.')
            event.target.value = 9999;
        }
        const rangeLower = parseInt(document.getElementById('rangeLower').value);
        if (parseInt(event.target.value) < rangeLower) {
            alert(`Значение верхней границы не может быть меньше значения нижней границы.\nЗначение будет установлено равным нижней границе ${rangeLower}.`)
            event.target.value = rangeLower;
        }
        regenerateFlashCard();
    });

    document.getElementById('switchLanguages').addEventListener('change', regenerateFlashCard);
    document.getElementById('showNumber').addEventListener('change', regenerateFlashCard);

    // Generate initial flashcard
    generateFlashCard();
});
