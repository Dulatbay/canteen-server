const express = require('express')
const app = express()
const PORT = 5050
const cors = require('cors')

app.use(cors())

const cards = {
    "85440BDE": {
        name: "Ruslan Ibodullaev",
        account: 1000,
        id: "230107160",
        enabled: true,
        tariff: true
    },
    "45518BDD": {
        name: "Erzhan Amangeldin",
        account: 1000,
        id: "230107137",
        enabled: true,
        tariff: true
    },
    "15E2EFDD": {
        name: "Akhan Dulatbay",
        account: 1000,
        id: "230107171",
        enabled: true,
        tariff: false
    },
    "753883DD": {
        name: "Yersin Kaldybek",
        account: 1000,
        id: "230107041",
        enabled: true,
        tariff: false
    },
    "850CE2DD": {
        name: "Amirkhan Abdykarimov",
        account: 1000,
        id: "230107111",
        enabled: true,
        tariff: false
    },
    "57424F4E": {
        name: "Aisana Sembek",
        account: 1000,
        id: "230107118",
        enabled: true,
        tariff: false
    },
    "1A0BB364": {
        name: "Almasova Karakat",
        account: 1000,
        id: "220107134",
        enabled: true,
        tariff: false
    },
    "5518ECDD": {
        name: "Arslan Marat",
        account: 1000,
        id: "230107185",
        enabled: true,
        tariff: false
    },
    "B5453ADE": {
        name: "Bekzhan Kerimbek",
        account: 1000,
        id: "230107141",
        enabled: false,
        tariff: false
    },
};

const transactions = []


app.get('/read/:id', function (req, res) {
    const {id} = req.params
    if ((cards[id] && cards[id].enabled) && ((cards[id].account - 500 >= 0) || cards[id].tariff)) {
        console.log(cards[id].name)
        cards[id].account -= 500
        transactions.push({
            time: new Date(),
            location: 'Canteen 1 floor',
            initiator: cards[id].name,
            id: cards[id].id,
            resource: cards[id].tariff ? "Tariff" : "500tg"
        })
        res.status(200).send()
    } else {
        res.status(400).send()
    }
})

app.post('/account/:id', function (req, res) {
    const {id} = req.params;
    const {res: resourcesToAdd} = req.query; // Получаем значение ресурсов из запроса

    // Поиск айди по полю ID
    const foundId = Object.keys(cards).find(key => cards[key].id === id);

    if (foundId && cards[foundId].enabled) {
        // Проверяем, существует ли аккаунт с найденным ID и активен ли он

        // Проверяем, является ли значение resourcesToAdd числом и положительным
        if (!isNaN(resourcesToAdd) && parseFloat(resourcesToAdd) > 0) {
            cards[foundId].account += parseFloat(resourcesToAdd); // Добавляем ресурсы к аккаунту
            res.status(200).json({message: `Added ${resourcesToAdd} resources to account ${id}`});
        } else {
            res.status(400).json({message: 'Invalid resources value'});
        }
    } else {
        res.status(404).send({message: 'Account not found or disabled'});
    }
});

app.get('/transactions', function(req, res) {
    res.status(200).json(transactions);
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

