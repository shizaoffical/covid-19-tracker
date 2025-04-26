import { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material';
import './App.css';
import Infobox from './pages/Infobox';
import Map from './pages/Map';
import TableData from './pages/TableData';
import { SortData } from './pages/Sortdata'
import LineGraph from './pages/LineGraph';

function App() {
  const [countries, setCountries] = useState([]);
  const [Country, setCountry] = useState("worldwide");
  const [CountryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

    //  whole world cassese
         useEffect(() => {
           fetch("https://disease.sh/v3/covid-19/all")
           .then((respones) => respones.json())
             .then((data) => {
                    setCountryInfo(data)
            })
         }, [])



    //  useEffect  hook
  useEffect(() => {
   const getCountriesData =  async () => {
     await fetch("https://disease.sh/v3/covid-19/countries")
     .then((respones) => respones.json())
     .then((data) => {
      const countriess = data.map((countryes) => ({
           name:countryes.country,
           value:countryes.countryInfo.iso2}))
              const sortedData = SortData(data)
           setTableData(sortedData);
           setCountries(countriess);
          //  console.log(data);
     }) 
   }
    getCountriesData();
  },[])
      // worldwide onchange function
    const onCountryChange = async(event) => {
      const countryCode = event.target.value;
      const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/countries": 
      `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      await fetch(url)
      .then((respones) => respones.json())
      .then((data) => {
         setCountry(countryCode);
        setCountryInfo(data);
        console.log(data);
      })
    }

  return (
  <div className="App">
    {/* app__right */}
     <div className='app__left'>
        <div className='app__header'>
          <h1>Covid-19 Tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant="outlined"  onChange={onCountryChange} value={Country} >
              <MenuItem value="worldwide">worldwide</MenuItem>
                {countries.map((country) => (<MenuItem value={country.value}>{country.name}</MenuItem>))}
            </Select>
          </FormControl>
        </div>
       <div className='app__stats'>
           <Infobox title="Coronaviuus casse" casses={CountryInfo.todayCases}  total={CountryInfo.cases}/>
           <Infobox title="Current Recovered" casses={CountryInfo.todayRecovered} total={CountryInfo.recovered}/>
           <Infobox title="Current Deaths" casses={CountryInfo.todayDeaths} total={CountryInfo.deaths}/>
        </div>
         <Map/>
    </div>
                            {/* app right */}
      <div className="app__right">
         <Card>
           <CardContent>
             <h3>lives casses in country</h3>
                <TableData allCountriesCases={tableData}/>
             <h3>worldwide new casses</h3>
             {/* graph */}
             <LineGraph/>
           </CardContent>
         </Card>
      </div>
  </div>

   
  );
}

export default App;
