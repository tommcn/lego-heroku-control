
var unique = [1, 2]
stations = [1, 1, 2, 1, 1, 2]

getMiddle(stations, 2)

if ( !(unique.length != 2 || (getNumber(stations, unique[0]) == 1 && getNumber(stations, unique[1]) > 1) || (getNumber(stations, unique[0]) > 1 && getNumber(stations, unique[1]) == 1)))
{
    console.log("======================================================")
    console.log("Loop completed, stations colors are: ")
    console.log(stations)
    if (getNumber(stations, unique[0]) == 2)
    {
        var primaryColor = unique[0];
        var secondaryColor = unique[1];
    } else {
        var primaryColor = unique[1];
        var secondaryColor = unique[0];
    }
    var secondaryStations = getNumber(stations, secondaryColor)
    console.log("Reset Station is color: ", primaryColor);
    console.log("Normal Stations are color: ", secondaryColor);
    console.log("There are " , secondaryStations , " secondary stations")
    console.log("======================================================");
}

function getNumber(list, value) {
    var num = 0;
    for (var i = 0; i < list.length; i++)
    {
        if (list[i] == value)
        {
            num++;
        }
    }
    return num;
}


function getMiddle (list, val) {
    middle = []
    start = -1
    end = -1
    for (var i = 0; i < list.length; i++)
    {
        if (list[i] == val)
        {
            if (start == -1)
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

