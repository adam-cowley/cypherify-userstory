const nlp = require('compromise');

const Label = require('./Label');

function toVariable(text) {
    return text.toLowerCase().replace(' ', '_');
}

function toLabel(text) {
    return text.split(' ').map(fragment => {
        return fragment[0].toUpperCase() + fragment.substr(1);
    }).join('');
}

function getNounInfo(noun) {
    const pattern = /{([a-z0-9_,\s]+)}/i
    const match = noun.match(pattern);
    let props = [];

    if (match) {
        noun = noun.replace(match[0], '').trim();
        props = match[1].split(',').map(a => a.trim());
    }

    const label = toLabel(noun);
    const variable = toVariable(noun);

    return new Label(variable, label, props);
}


function convert(story) {
    const res = nlp(story);
    const relationship = res.verbs().data()
    .map(verb => {
        return verb.text.trim() == 'would like' || verb.text.trim() == '' ? false : verb.conjugations.PastTense.toUpperCase();
    }).filter(a => {return !!a});

    const nouns = res.nouns().data();

    const source = getNounInfo(nouns[0].singular);
    const destination = getNounInfo(nouns[1].singular);

    return `${source.toString()}-[:${relationship}]->${destination.toString()}`;
}

module.exports = convert;
