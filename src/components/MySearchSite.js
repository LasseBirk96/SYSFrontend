import React from 'react';

import "../Css-files/wrapper.css"

class MySearchSite extends React.Component {

  constructor(props) {
    super(props)
    
    //Her sætter vi basis eller default states for diverse variabler.
    this.state = {
      query: '',
      loadingData: true,
      hideSuggestions: false,
      data: []
    }

    //Vi binder her metoden til værdien "onSearch", dette kan virke forvirrende, men hvis man ikke gør dette, så kan metoden ikke bruges i render
    this.onSearch = this.onSearch.bind(this)
   
    //Her loader vi vores data og holder det lokalt, dette hjælper med performance
    this.loadInitialData()
  }

    //"async" betyder at vi bruger en anden thread til at køre koden, det gør at vi ikke stopper resten af componentet i at rende.
  async loadInitialData() {
    //"await" fortæller vores variable at den får en "promise" om noget data, den skal altså forvente at noget data kommer
    const response = await fetch('https://dgpcoding.com/SYS/api/flight/allairports')
    const json = await response.json()
    
    //Her bliver vores tomme array "data" sat til at være = "const json", altså vores array bliver fyldt op med data.
    //En anden måde at sige det på er at vores array bliver overskrevet
    this.setState({ isLoading: false, data: json })
  }

  //Denne metode bliver brugt til vores knap i render, her kan man se at den retunerer staten på vores query, altså værdien af det som bliver tastet ind i søgefeltet
  onSearch() {
    console.log("Dit søgeord er:", this.state.query)
  }
  
  //Denne metoder tjekker om længden af værdien som bliver indtastet i søgefeltet er 0, hvis det er 0, så sender den et tomt array tilbage
  filterByQuery(query) {
    if (query.length === 0) {
      return []
    }
    
    //Denne metode tager hvert objekt som bliver retuneret fra api'et, og finder de værdier som man vil have udfra objektets egne værdier
    const matches = [
      (element) => element.name,
      (element) => element.city,
      (element) => element.code,
    ]

    //Denne metoder sørger for at alle quiries bliver læst som små bogstaver, dette gør det mere "easy to use for idiots :)"
    const queryValue = query.toLowerCase()
    
    //Her bliver vores "data array" filtered med de værdier som vi gav oppe i "matches" arrayet. 
    //Vi siger ret simpelt at for hver "match" i "matches", så sæt værdien til lowercase, og hvis query værdien matcher 
    //et element i "matches arrayet" eller har bogstaver som indgår i rigtig rækkefølge, så returner det
    return this.state.data.filter(element => {
      for (let match of matches) {
        const comparableValue = match(element).toLowerCase()
        
        if (queryValue === comparableValue || comparableValue.includes(queryValue)) {
          return true
        }
      }
      return false
    })
  }

  //Render er det som vores component bliver læst som, deraf "render". 
  render() {
    const { query, isLoading, hideSuggestions } = this.state
    
    if (isLoading) {
      return <p>Initializing</p>
    }
    
    const filteredData = this.filterByQuery(query)
    
    return (
      <div className='wrapper'>
        
        <div>
          <input className="searcher" value={ query } onFocus={ () => this.setState({ hideSuggestions: false })} onChange={ (event) => this.setState({ query: event.target.value }) } type='text' placeholder='Food or destination'/>
          <div>
            <ul className="table">
              
              { !hideSuggestions && filteredData.map(entry => {
               // Dette kode sørger for at fjerne valgmulighederne i drowndown tabellen. "hideSuggestions" er en boolean,
                //og hvis "ikke hideSuggestions", som man kan se ovenover, så map dataen
                return (
                  //Key skal altid være på "entry.id", da det er sådan unikke entries kommer frem i tabellen. 
                  <li className="tableContent" key={ entry.id } onClick={ () => this.setState({ hideSuggestions: true, query: entry.name }) }>
                      { entry.name}
                  </li>
                )
              }) }
            </ul>
          </div>
        </div>
        <button className="searchButton" type="button" onClick={ this.onSearch } >Search</button>
      </div>
    )
  }
}

  export default MySearchSite;