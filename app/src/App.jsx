import styled from "styled-components";
import { useState, useEffect } from "react";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9000"

const App = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filterData, setFilterData] = useState(null)
  const [searchBtn, setSearchBtn] = useState("all")

  useEffect(() => {
    const fetchData = async() =>{
      setLoading(true)
      try {
        const response = await fetch(BASE_URL) 
        const json = await response.json();
        setData(json)
        setFilterData(json)
        setLoading(false)
      } catch (error) {
        setError("Unable to fetch data")
      }
  }
  fetchData();
  }, [])
  if(error) return  <div>{error}</div>
  if(loading) return  <div>loading....</div>

  const searchFood = (e) =>{
    const searchValu = e.target.value;
    // console.log(searchValu)
    if (searchValu === "") {
      setFilterData(null)
    }
    const filterValue = data?.filter((food)=>{
      return food.name.toLowerCase().includes(searchValu.toLowerCase())
    })
    setFilterData(filterValue)
  }

  const filterFood = (type) =>{
    if (type === "all") {
      setFilterData(data)
      setSearchBtn("all")
      return;
    }
    const filterValue = data?.filter((food)=>{
      return food.type.toLowerCase().includes(type.toLowerCase())
    })
    setFilterData(filterValue)
    setSearchBtn(type)
  }

  const filterBtns = [
    {
      name:"All",
      type: "all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    }
  ]
  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="logo.svg" alt="logo" />
        </div>
        <div className="search">
          <input onChange={searchFood} type="text" placeholder="Search Food..." />
        </div>
      </TopContainer>
      <FilterSection>
        {
          filterBtns.map((value)=>
          <Button 
           $isSelected = {searchBtn === value.type}
           key={value.name} onClick={()=>filterFood(value.type)}>
            {value.name}
          </Button>
          )
        }
      </FilterSection>
      <SearchResult data={filterData}/>
    </Container>
  );
};

export default App;

const Container = styled.div`
`;
const TopContainer = styled.div`
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  min-height: 120px;
  margin: 0 auto;
  .search{
    input{
      background-color: transparent;
      border: 1px solid #FF0909;
      color: #ffffff;
      height: 40px;
      padding: 0 10px;
      border-radius: 5px;
      font-size: 16px;
      &::placeholder{
        color: #ffffff;
      }
    }
  }
  @media (0 < width < 600px) {
      flex-direction: column;
      gap: 20px;
    }
`;
const FilterSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 30px;
`
export const Button = styled.button`
padding: 6px 12px;
background-color: ${({$isSelected})=> $isSelected ? " #e81717" : " #FF4343"  };
outline:1px solid ${({$isSelected})=> $isSelected ? " #ffffff" : " #FF4343"  };
border-radius: 5px;
border: none;
color: #ffffff;
cursor: pointer;

&:hover{
  background-color: #e81717;
}
`   
