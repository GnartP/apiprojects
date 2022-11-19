// https://reqbin.com/code/javascript/ricgaie0/javascript-fetch-api-example
// https://wiki.guildwars2.com/wiki/API:Main

const apiKey = '5FAE19DC-87DC-114C-88D1-3B06ADD9BD3C7D305AF3-268F-44FC-BBC7-4E46188C1C1B'
const apiBaseURL = 'https://api.guildwars2.com/v2';
const apiEndpoint = '/account/bank';
const apiNameEndpoint = '/items';
const apiParam = new URLSearchParams();
const apiURL = `${apiBaseURL}${apiEndpoint}`;
const apiNameURL = `${apiBaseURL}${apiNameEndpoint}?`;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function getAccountInfo(){
    const response = await fetch(apiURL, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
        .then((response) => { return response.json() })
        .then((data) => {
        
            //Join ids into CSV
            let arrOfIds = []
            data.forEach((obj) => {
                if (obj) {
                    arrOfIds.push({
                        id: obj.id,
                        count: obj.count
                    })
                }
            })
            //const listOfIds = {arrOfId.join(','), }
            //fetch from item dndpoint with idCSV as parameter
            getItemNames(arrOfIds);
            //log names for ids
            
        });
}
async function getItemNames(arrOfObj){
    let idArr = [];
    arrOfObj.forEach((obj) => {
        idArr.push(obj.id);
    })

    apiParam.append('ids', idArr.join(','));
    const response = await fetch (apiNameURL + apiParam, { 
        headers: {
            Authorization: `Bearer ${apiKey}`
    }
})
    .then((response) => {return response.json() })
    .then((data) => {
        let arrOfNames = [];
        data.forEach((obj) => {
            arrOfNames.push(obj.name)
        })
        console.log(arrOfNames);

        let idNamesObj = {};
        for(let i = 0; i < arrOfNames.length; i++) {
            idNamesObj[idArr[i]] = arrOfNames[i];
        }

        arrOfObj.forEach((obj) => {
            obj['name'] = idNamesObj[obj.id]
        })

        arrOfObj.forEach((obj) => {
            console.log(obj);
        })
    })
}

console.log(getAccountInfo());

// HIT THE API --> RESPONSE CLASS OBJECT --> GETTING THE JSON RESPONSE VALUE --> ACCESS BY CALLING IT DATA