
function seatApiCall(year,round) {
    fetch(`https://ergast.com/api/f1/${year}/${round}/driverStandings.json`)
        .then((res) => res.json())
        .then((responseData) => seatParse(responseData))
}

function seatParse(data, type) {
    console.log(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)

    console.log(data)

    for (i of data.MRData.StandingsTable.StandingsLists[0].DriverStandings) {

        if (i.type == type || type == undefined) {

            let racerPosition = i.position
            let racerName = i.Driver.givenName + i.Driver.familyName
            let racerCar = i.Constructors[0].name

            let clone = myTemplate.content.cloneNode(true); 
            let td = clone.querySelectorAll('td') 

            td[0].textContent = racerPosition
            td[1].textContent = racerName
            td[2].textContent = racerCar

            tableBody.appendChild(clone);
        }
    }
}

const myForm = document.getElementById('form')

myForm.addEventListener('submit', (event)=> {
    event.preventDefault()
    tableBody.innerHTML = ''
    const myForm = document.getElementById('form')
    formData = new FormData(myForm)
    var season = formData.get("year")
    var round = formData.get("round")
    seatApiCall(season, round)
})

// function dataRetriever(eventType) {
//     console.log('hi')
// }

// dataRetriever('concert')



seatApiCall()