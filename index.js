const axios = require('axios')
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static('build'));

let menuList = [];

let fetchDate;

const compare = (a, b, index) => {
    return a[index] === b[index] ? 0 : (a[index] < b[index]) ? -1 : 1;
}


const getUrls = async (url) => {
        await axios.get(url).then(res =>
            menuList = menuList.concat(res.data));
    }

const run = async () => {
    await console.log("fetching..")
    fetchDate = new Date().toDateString();
    let urls = ['https://www.unica.fi/modules/json/json/Index?costNumber=1920&language=fi', //ASSARIN ULLAKKO,
        'https://www.unica.fi/modules/json/json/Index?costNumber=1970&language=fi', //MACCIAVELLI
        'https://www.unica.fi/modules/json/json/Index?costNumber=1995&language=fi', //GALILEI
        'https://www.unica.fi/modules/json/json/Index?costNumber=1900&language=fi', //KISÄLLI
        'https://www.unica.fi/modules/json/json/Index?costNumber=190001&language=fi', //KAIVOMESTARI
        'https://www.unica.fi/modules/json/json/Index?costNumber=2000&language=fi',//LINUS
        'https://www.unica.fi/modules/json/json/Index?costNumber=1985&language=fi', //DELICA
        'https://www.unica.fi/modules/json/json/Index?costNumber=198501&language=fi', //DELI PHARMA
        'https://www.unica.fi/modules/json/json/Index?costNumber=1980&language=fi', //DENTAL
        'https://www.unica.fi/modules/json/json/Index?costNumber=1965&language=fi', //SIGYN
        'https://www.unica.fi/modules/json/json/Index?costNumber=196501&language=fi', //MUUSA
        'https://www.unica.fi/modules/json/json/Index?costNumber=1910&language=fi', //TOTTISALMI
        'https://www.unica.fi/modules/json/json/Index?costNumber=1950&language=fi' //RUOKAKELLO
    ];
    await urls.forEach(getUrls);
}

run().then();

app.get('/', (req, res) => {
    menuList.sort((a, b) => {
        return compare(a, b, "RestaurantName")
    });
    console.log(fetchDate);
    if(fetchDate !== new Date().toDateString()){
        run().then(() => {
            res.json(menuList);
        });
    }else{
        res.json(menuList)
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("server running");
})




