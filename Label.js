const uuid = require('uuid');
const faker = require('faker');

class Label {
    constructor(variable, label, properties = []) {
        this.variable = variable;
        this.label = label;
        this.properties = properties;
    }

    fakeProperty(key) {
        if (key.indexOf('_id') > -1 || key == 'id') {
            return uuid.v4();
        }

        switch (key) {
            case 'first_name':
                return faker.name.firstName();

            case 'last_name':
                return faker.name.lastName();

        }

        return false;
    }

    fakeProperties() {
        let output = ['{'];

        this.properties.forEach(key => {
            output.push(key);
            output.push(':');
            output.push( JSON.stringify( this.fakeProperty(key) ) );
            output.push(',');
        });

        return output.splice(0, output.length-1).join('');
    }

    toString() {
        const output =  [
            '(',
            this.variable,
            ':',
            this.label
        ];

        if (this.properties.length) {
            output.push(' ');
            output.push(this.fakeProperties());
        }

        output.push(')');

        return output.join('');
    }
}

module.exports = Label;