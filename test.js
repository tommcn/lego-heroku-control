const test = require('ava');
const browserEnv = require('browser-env');




const log = function (str) {
    const element = document.getElementById("console");
    element.innerHTML += `${str}<br />`;
    element.scrollTop = element.scrollHeight;
}

function getMiddle (list, val) {
    var middle = []
    var start = -1
    var end = -1
    for (var i = 0; i < list.length; i++)
    {
        if (list[i] === val)
        {
            if (start === -1)
            {
                start = i
            } else {
                end = i
            }
        }
    }
    list = list.slice(start + 1, end)
    return list
}


test('Log once', t => {
    browserEnv();
    const elem = document.createElement('div');
    elem.setAttribute("id", "console")
    document.body.appendChild(elem);
    log("test")

	t.is(document.querySelector('div').innerHTML, 'test<br>');
});

test('Log twice', t => {
    browserEnv();
    const elem = document.createElement('div');
    elem.setAttribute("id", "console")
    document.body.appendChild(elem);
    log("test")
    log("test2")

	t.is(document.querySelector('div').innerHTML, 'test<br>test2<br>');
});

test('Get middle', t => {
    var list = [2, 2, 1, 2, 2, 2, 2, 1, 2]
    var middle = getMiddle(list, 1)
    t.deepEqual(middle, [2, 2, 2, 2])
});

test('Get middle 2', t => {
    var list = [6, 6, 6, 6, 6, 6, 5, 6, 5]
    var middle = getMiddle(list, 5)
    t.deepEqual(middle, [6])
});
