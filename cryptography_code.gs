function encryptString(str) {
    var encrypted = '';
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        if (isHiragana(char)) {
            encrypted += encryptHiragana(char);
        } else if (isKatakana(char)) {
            if (isKatakanaWithDakuten(char)) {
                encrypted += encryptKatakanaWithDakuten(char);
            } else {
                encrypted += encryptKatakana(char);
            }
        } else if (isDigit(char)) {
            encrypted += encryptDigit(char);
        } else if (isLowercaseAlphabet(char)) {
            encrypted += encryptLowercaseAlphabet(char);
        } else if (isUppercaseAlphabet(char)) {
            encrypted += encryptUppercaseAlphabet(char);
        } else if (isKanji(char)) {
            encrypted += encryptKanji(char);
        } else {
            encrypted += char; // その他の文字はそのまま
        }
    }
    return encrypted;
}


// ひらがなの暗号化
function encryptHiragana(char) {
    // ひらがなの暗号化ロジックを実装
    var vowels = { 'あ': '9', 'い': '5', 'う': '1', 'え': '0', 'お': '2' };
    var consonants = {
        'か': 'tr', 'さ': '/2', 'た': 'aG', 'な': 'cl', 'は': ':w',
        'ま': 'Js', 'や': 'k1', 'ら': 'oO', 'わ': '{]'
    };
    var morseCodeMapping = {
        'が': '--.', 'ぎ': '..-.', 'ぐ': '....', 'げ': '--..', 'ご': '-.-.',
        'ざ': '-..-', 'じ': '-.--', 'ず': '---.', 'ぜ': '...-', 'ぞ': '.---',
        'だ': '-..', 'ぢ': '..--', 'づ': '....-', 'で': '-...', 'ど': '-.-',
        'ば': '--..-', 'び': '.-.-', 'ぶ': '..-..', 'べ': '.--.', 'ぼ': '----',
        'ぱ': '.--..', 'ぴ': '--.-', 'ぷ': '-.-..', 'ぺ': '-...-', 'ぽ': '-.--.'
    };

    if (morseCodeMapping[char]) {
        return morseCodeMapping[char]; // 濁点付きひらがなの場合
    } else if (vowels[char]) {
        return vowels[char]; // 母音のみの場合
    } else {
        var consonant = char.substring(0, 1);
        var vowel = char.substring(1);
        return consonants[consonant] + vowels[vowel]; // 子音と母音を組み合わせる
    }
}

function isHiragana(char) {
    return (char >= '\u3040' && char <= '\u309F');
}

// カタカナの暗号化（濁点なし）
function encryptKatakana(char) {
    // ここにカタカナの暗号化ロジックを実装
    var vowels = { 'ア': '9', 'イ': '5', 'ウ': '1', 'エ': '0', 'オ': '2' };
    var consonants = {
        'カ': 'tr', 'サ': '/2', 'タ': 'aG', 'ナ': 'cl', 'ハ': ':w',
        'マ': 'Js', 'ヤ': 'k1', 'ラ': 'oO', 'ワ': '{]'
    };

    var consonant = char.substring(0, 1);
    var vowel = char.substring(1);
    return consonants[consonant] + vowels[vowel]; // 子音と母音を合わせる
}

function isKatakana(char) {
    return (char >= '\u30A0' && char <= '\u30FF');
}
// カタカナの暗号化（濁点あり）
function encryptKatakanaWithDakuten(char) {
    // 濁点付きカタカナのモールス信号変換
    var morseCodeMapping = {
        // ここにモールス信号のマッピングを実装
        'ガ': '--.', 'ギ': '..-.', 'グ': '....', 'ゲ': '--..', 'ゴ': '-.-.',
        'ザ': '-..-', 'ジ': '-.--', 'ズ': '---.', 'ゼ': '...-', 'ゾ': '.---',
        'ダ': '-..', 'ヂ': '..--', 'ヅ': '....-', 'デ': '-...', 'ド': '-.-',
        'バ': '--..-', 'ビ': '.-.-', 'ブ': '..-..', 'ベ': '.--.', 'ボ': '----',
        'パ': '.--..', 'ピ': '--.-', 'プ': '-.-..', 'ペ': '-...-', 'ポ': '-.--.'
    };
    return morseCodeMapping[char] || char;
}
function isKatakana(char) {
    return (char >= '\u30A0' && char <= '\u30FF');
}
function isKatakanaWithDakuten(char) {
    return 'ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ'.indexOf(char) !== -1;
}


// 数字の暗号化
function encryptDigit(char) {
    // 数字の暗号化ロジックを実装
    var digitMapping = {
        '0': 'OI', '1': 'V+', '2': '>*', '3': '!=', '4': '~z', '5': '/h',
        '6': 'GQ', '7': '|=', '8': 'd#', '9': ';-', 
        '０': 'OI', '１': 'V+', '２': '>*', '３': '!=', '４': '~z', '５': '/h',
        '６': 'GQ', '７': '|=', '８': 'd#', '９': ';-'
    };

    return digitMapping[char] || char; // マッピングされている数字の場合は変換、そうでなければそのまま
}

function isDigit(char) {
  return (char >= '0' && char <= '9') || (char >= '０' && char <= '９');
}


// 小文字アルファベットの暗号化
function encryptLowercaseAlphabet(char) {
    // 小文字アルファベットの暗号化ロジックを実装
    var alphabetMapping = {
        'a': '1A', 'b': '2B', 'c': '3C', 'd': '4D', 'e': '5E',
        'f': '6F', 'g': '7G', 'h': '8H', 'i': '9I', 'j': '0J',
        'k': '!K', 'l': '@L', 'm': '#M', 'n': '$N', 'o': '%O',
        'p': '^P', 'q': '&Q', 'r': '*R', 's': '(S', 't': ')T',
        'u': '-U', 'v': '+V', 'w': '=W', 'x': '|X', 'y': '[Y',
        'z': ']Z'
    };

    return alphabetMapping[char] || char; // マッピングされているアルファベットの場合は変換、そうでなければそのまま
}

function isLowercaseAlphabet(char) {
    return char >= 'a' && char <= 'z';
}


// 大文字アルファベットの暗号化
function encryptUppercaseAlphabet(char) {
    // 大文字アルファベットの暗号化ロジックを実装
    var alphabetMapping = {
        'A': 'Lm', 'B': 'Xn', 'C': 'Yp', 'D': 'Oq', 'E': 'Kr',
        'F': 'Us', 'G': 'Tv', 'H': 'Fw', 'I': 'Hz', 'J': 'Ix',
        'K': 'Jy', 'L': 'Bz', 'M': 'C0', 'N': 'D1', 'O': 'E2',
        'P': 'G3', 'Q': 'H4', 'R': 'I5', 'S': 'J6', 'T': 'K7',
        'U': 'M8', 'V': 'N9', 'W': 'A!', 'X': 'R#', 'Y': 'S$',
        'Z': 'T%'
    };

    return alphabetMapping[char] || char; // マッピングされているアルファベットの場合は変換、そうでなければそのまま
}

function isUppercaseAlphabet(char) {
    return char >= 'A' && char <= 'Z';
}


// 漢字の暗号化
function encryptKanji(char) {
    return char.charCodeAt(0).toString(16); // 漢字のUnicodeコードポイントを16進数に変換
}

function isKanji(char) {
    return (char >= '\u4E00' && char <= '\u9FAF') ||
           (char >= '\u3400' && char <= '\u4DBF') ||
           (char >= '\uF900' && char <= '\uFAFF') ||
           (char >= '\u20000' && char <= '\u2A6DF');
}
