var datetimeInput = document.getElementById("datetime-string")
var nowBtn = document.getElementById("now")

var copyDatetime = document.getElementById("copy-datetime")
var copyIso = document.getElementById("copy-iso")

function removeParenthesisForUtc(s) {
    return s.toString().replace('(UTC)', 'UTC');
}

function changeIsoInputColorBack() {
    document.getElementById("iso-datetime").style.backgroundColor = 'beige';
}

function changeIsoInputColor() {
    document.getElementById("iso-datetime").style.backgroundColor = 'blue';
    setTimeout(changeIsoInputColorBack, 100)
}

function updateIsoDatetime() {
    let input = datetimeInput.value
    if (!isNaN(Number(input))) {
        input = parseInt(input)
    }
    input = removeParenthesisForUtc(input.toString());
    if (!isNaN(Number(input))) {
        input = parseInt(input)
    }
    const isoTime = new Date(input).toISOString();
    document.getElementById("iso-datetime").value = isoTime
    changeIsoInputColor()
}

function updateNow() {
    datetimeInput.value = new Date().toISOString()
}

function copy(input) {
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

datetimeInput.addEventListener('input', updateIsoDatetime)
nowBtn.addEventListener('click', e => {
    updateNow()
    updateIsoDatetime()
})
copyDatetime.addEventListener('click', (e) => {
    copy(e.target.previousSibling.previousSibling)
})
copyIso.addEventListener('click', (e) => {
    copy(e.target.previousSibling.previousSibling)
})

const urlParams = new URLSearchParams(window.location.search);
const dateQuerystring = urlParams.get('date') || '';
// + in URL is interpret to space
datetimeInput.value = dateQuerystring.replace(/ (\d\d\d\d)/, '+$1');
updateIsoDatetime();